#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";

const execFile = promisify(execFileCallback);

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.3-codex";
const REPO_PATH = process.env.CODEX_REPO_PATH || process.cwd();
const CHECK_COMMAND = process.env.WEB_BOT_CHECK_COMMAND || "./node_modules/.bin/tsc --noEmit";
const AUTO_SWITCH_BACK = process.env.WEB_BOT_AUTO_SWITCH_BACK !== "false";
const ENABLE_DIRECT_MAIN_PUSH = process.env.WEB_BOT_ENABLE_DIRECT_MAIN_PUSH === "true";
const MAIN_BRANCH = process.env.TELEGRAM_MAIN_BRANCH || "main";
const MAIN_REMOTE = process.env.TELEGRAM_MAIN_REMOTE || "origin";
const SYNC_MAIN_BEFORE_PUSH = process.env.WEB_BOT_SYNC_MAIN_BEFORE_PUSH === "true";
const TELEGRAM_POLL_TIMEOUT_SECONDS = Number.parseInt(
  process.env.TELEGRAM_POLL_TIMEOUT_SECONDS || "20",
  10,
);

const allowedChats = new Set(
  (process.env.TELEGRAM_ALLOWED_CHAT_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

const stateDir = path.join(REPO_PATH, ".bot-state");
const stateFile = path.join(stateDir, "webbot-state.json");

function nowIso() {
  return new Date().toISOString();
}

function sanitizeBranchPart(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function shorten(text, max = 1200) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3)}...`;
}

async function loadState() {
  try {
    const raw = await fs.readFile(stateFile, "utf8");
    const parsed = JSON.parse(raw);
    return {
      offset: parsed.offset || 0,
      pendingByChat: parsed.pendingByChat || {},
    };
  } catch {
    return { offset: 0, pendingByChat: {} };
  }
}

async function saveState(state) {
  await fs.mkdir(stateDir, { recursive: true });
  await fs.writeFile(stateFile, JSON.stringify(state, null, 2), "utf8");
}

async function runGit(args, opts = {}) {
  const { stdout, stderr } = await execFile("git", args, {
    cwd: REPO_PATH,
    maxBuffer: 10 * 1024 * 1024,
    ...opts,
  });
  return { stdout: stdout.trim(), stderr: stderr.trim() };
}

async function runShell(command) {
  const { stdout, stderr } = await execFile("/bin/zsh", ["-lc", command], {
    cwd: REPO_PATH,
    maxBuffer: 10 * 1024 * 1024,
  });
  return { stdout: stdout.trim(), stderr: stderr.trim() };
}

async function ensureCleanWorktree() {
  const { stdout } = await runGit(["status", "--porcelain"]);
  return stdout.trim().length === 0;
}

async function currentBranch() {
  const { stdout } = await runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
  return stdout.trim();
}

async function readRepoSnapshot() {
  const { stdout: fileListRaw } = await runGit(["ls-files"]);
  const files = fileListRaw
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean)
    .filter((f) => !f.startsWith(".next/"))
    .filter((f) => !f.startsWith("node_modules/"))
    .filter((f) => !f.startsWith(".bot-state/"));

  let total = 0;
  const maxChars = 160_000;
  const chunks = [];

  for (const rel of files) {
    const abs = path.join(REPO_PATH, rel);
    const ext = path.extname(rel).toLowerCase();
    if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".lock"].includes(ext)) {
      continue;
    }

    try {
      const content = await fs.readFile(abs, "utf8");
      const block = `\n--- FILE: ${rel} ---\n${content}\n`;
      if (total + block.length > maxChars) break;
      chunks.push(block);
      total += block.length;
    } catch {
      // Skip unreadable/binary files.
    }
  }

  return chunks.join("\n");
}

function extractJson(text) {
  const fencedMatch = text.match(/```json\s*([\s\S]*?)```/i);
  if (fencedMatch) {
    return JSON.parse(fencedMatch[1]);
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model output.");
  }
  return JSON.parse(text.slice(start, end + 1));
}

async function createPatchProposal(instruction) {
  const snapshot = await readRepoSnapshot();

  const systemPrompt = [
    "You are a coding assistant producing a patch for a git repository.",
    "Return STRICT JSON with keys: summary, commitMessage, diff.",
    "diff must be a valid unified diff from repository root using --- a/path and +++ b/path headers.",
    "Only include file changes relevant to the request.",
    "Do not include markdown fences.",
  ].join(" ");

  const userPrompt = [
    `Repository path: ${REPO_PATH}`,
    `User instruction: ${instruction}`,
    "",
    "Repository snapshot:",
    snapshot,
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: [{ type: "input_text", text: systemPrompt }] },
        { role: "user", content: [{ type: "input_text", text: userPrompt }] },
      ],
      reasoning: { effort: "medium" },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errText}`);
  }

  const json = await response.json();
  const text = json.output_text || "";
  if (!text.trim()) {
    throw new Error("Model returned empty output.");
  }

  const parsed = extractJson(text);
  if (!parsed.summary || !parsed.commitMessage || !parsed.diff) {
    throw new Error("Model output JSON missing required fields.");
  }

  return {
    summary: String(parsed.summary),
    commitMessage: String(parsed.commitMessage),
    diff: String(parsed.diff),
  };
}

async function telegramApi(method, payload) {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.ok) {
    throw new Error(`Telegram API ${method} failed: ${JSON.stringify(data)}`);
  }
  return data.result;
}

async function sendMessage(chatId, text) {
  await telegramApi("sendMessage", {
    chat_id: chatId,
    text: shorten(text, 3900),
    disable_web_page_preview: true,
  });
}

function isAuthorized(chatId) {
  if (allowedChats.size === 0) return false;
  return allowedChats.has(String(chatId));
}

function helpText() {
  return [
    "Commands:",
    "/web <instruction> - Generate a patch proposal on a new branch.",
    "/web-main <instruction> - Apply, commit, and push directly to main (disabled by default).",
    "/approve - Apply + commit the pending proposal.",
    "/reject - Discard pending proposal (branch stays available).",
    "/status - Show pending task status.",
    "/help - Show this message.",
  ].join("\n");
}

async function handleWeb(chatId, instruction, state) {
  if (!instruction.trim()) {
    await sendMessage(chatId, "Usage: /web <instruction>");
    return;
  }

  if (!OPENAI_API_KEY) {
    await sendMessage(chatId, "Missing OPENAI_API_KEY in environment.");
    return;
  }

  if (state.pendingByChat[String(chatId)]) {
    await sendMessage(chatId, "You already have a pending proposal. Use /approve or /reject first.");
    return;
  }

  const clean = await ensureCleanWorktree();
  if (!clean) {
    await sendMessage(
      chatId,
      "Worktree is not clean. Commit or stash changes first, then retry /web.",
    );
    return;
  }

  const baseBranch = await currentBranch();
  const slug = sanitizeBranchPart(instruction) || "change";
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const branchName = `webbot/${stamp}-${slug}`;

  await runGit(["switch", "-c", branchName]);
  await sendMessage(chatId, `Created branch ${branchName}. Generating patch proposal...`);

  try {
    const proposal = await createPatchProposal(instruction);
    state.pendingByChat[String(chatId)] = {
      instruction,
      summary: proposal.summary,
      commitMessage: proposal.commitMessage,
      diff: proposal.diff,
      baseBranch,
      branchName,
      createdAt: nowIso(),
    };
    await saveState(state);

    await sendMessage(
      chatId,
      [
        `Proposal ready on branch ${branchName}.`,
        "",
        `Summary: ${proposal.summary}`,
        "",
        `Commit message: ${proposal.commitMessage}`,
        "",
        "Reply /approve to apply and commit, or /reject to discard.",
      ].join("\n"),
    );
  } catch (error) {
    if (AUTO_SWITCH_BACK) {
      try {
        await runGit(["switch", baseBranch]);
      } catch {
        // ignore switch-back failures here
      }
    }
    const msg = error instanceof Error ? error.message : String(error);
    await sendMessage(chatId, `Failed to generate patch: ${shorten(msg, 900)}`);
  }
}

async function handleApprove(chatId, state) {
  const pending = state.pendingByChat[String(chatId)];
  if (!pending) {
    await sendMessage(chatId, "No pending proposal. Use /web first.");
    return;
  }

  const activeBranch = await currentBranch();
  if (activeBranch !== pending.branchName) {
    await runGit(["switch", pending.branchName]);
  }

  const patchPath = path.join(stateDir, `${String(chatId)}.patch`);
  await fs.mkdir(stateDir, { recursive: true });
  await fs.writeFile(patchPath, pending.diff, "utf8");

  try {
    await runGit(["apply", "--whitespace=fix", patchPath]);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    await sendMessage(chatId, `Patch apply failed. Keeping branch for manual fix.\n${shorten(msg, 1200)}`);
    return;
  }

  try {
    await runShell(CHECK_COMMAND);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    await sendMessage(
      chatId,
      `Checks failed (${CHECK_COMMAND}). Keeping branch uncommitted for review.\n${shorten(msg, 1200)}`,
    );
    return;
  }

  const { stdout: statusAfter } = await runGit(["status", "--porcelain"]);
  if (!statusAfter.trim()) {
    delete state.pendingByChat[String(chatId)];
    await saveState(state);
    await sendMessage(chatId, "Patch applied with no file changes. Nothing to commit.");
    return;
  }

  await runGit(["add", "-A"]);
  await runGit(["commit", "-m", pending.commitMessage]);

  const { stdout: commitSha } = await runGit(["rev-parse", "--short", "HEAD"]);

  if (AUTO_SWITCH_BACK) {
    await runGit(["switch", pending.baseBranch]);
  }

  delete state.pendingByChat[String(chatId)];
  await saveState(state);

  await sendMessage(
    chatId,
    [
      `Committed on ${pending.branchName}: ${commitSha}`,
      `Message: ${pending.commitMessage}`,
      AUTO_SWITCH_BACK ? `Switched back to ${pending.baseBranch}.` : "Stayed on task branch.",
    ].join("\n"),
  );
}

async function handleReject(chatId, state) {
  const pending = state.pendingByChat[String(chatId)];
  if (!pending) {
    await sendMessage(chatId, "No pending proposal.");
    return;
  }

  if (AUTO_SWITCH_BACK) {
    try {
      await runGit(["switch", pending.baseBranch]);
    } catch {
      // ignore branch switch errors on reject
    }
  }

  delete state.pendingByChat[String(chatId)];
  await saveState(state);
  await sendMessage(
    chatId,
    `Rejected pending proposal. Branch ${pending.branchName} is kept for manual inspection.`,
  );
}

async function handleStatus(chatId, state) {
  const pending = state.pendingByChat[String(chatId)];
  if (!pending) {
    await sendMessage(chatId, "No pending proposal.");
    return;
  }

  await sendMessage(
    chatId,
    [
      `Pending proposal on ${pending.branchName}`,
      `Base branch: ${pending.baseBranch}`,
      `Created: ${pending.createdAt}`,
      `Instruction: ${pending.instruction}`,
      "",
      `Summary: ${pending.summary}`,
    ].join("\n"),
  );
}

async function handleWebMain(chatId, instruction, state) {
  if (!ENABLE_DIRECT_MAIN_PUSH) {
    await sendMessage(
      chatId,
      "Direct push mode is disabled. Set WEB_BOT_ENABLE_DIRECT_MAIN_PUSH=true to allow /web-main.",
    );
    return;
  }

  if (!instruction.trim()) {
    await sendMessage(chatId, "Usage: /web-main <instruction>");
    return;
  }

  if (!OPENAI_API_KEY) {
    await sendMessage(chatId, "Missing OPENAI_API_KEY in environment.");
    return;
  }

  if (state.pendingByChat[String(chatId)]) {
    await sendMessage(chatId, "You already have a pending proposal. Use /approve or /reject first.");
    return;
  }

  const clean = await ensureCleanWorktree();
  if (!clean) {
    await sendMessage(
      chatId,
      "Worktree is not clean. Commit or stash changes first, then retry /web-main.",
    );
    return;
  }

  const startBranch = await currentBranch();
  if (startBranch !== MAIN_BRANCH) {
    await runGit(["switch", MAIN_BRANCH]);
  }

  if (SYNC_MAIN_BEFORE_PUSH) {
    try {
      await runGit(["pull", "--ff-only", MAIN_REMOTE, MAIN_BRANCH]);
    } catch (error) {
      if (AUTO_SWITCH_BACK && startBranch !== MAIN_BRANCH) {
        try {
          await runGit(["switch", startBranch]);
        } catch {
          // ignore switch-back errors
        }
      }
      const msg = error instanceof Error ? error.message : String(error);
      await sendMessage(chatId, `Failed to sync ${MAIN_BRANCH} before push.\n${shorten(msg, 1200)}`);
      return;
    }
  }

  await sendMessage(chatId, `Running direct-main mode on ${MAIN_BRANCH}. Generating patch...`);

  let proposal;
  try {
    proposal = await createPatchProposal(instruction);
  } catch (error) {
    if (AUTO_SWITCH_BACK && startBranch !== MAIN_BRANCH) {
      try {
        await runGit(["switch", startBranch]);
      } catch {
        // ignore switch-back errors
      }
    }
    const msg = error instanceof Error ? error.message : String(error);
    await sendMessage(chatId, `Failed to generate patch: ${shorten(msg, 900)}`);
    return;
  }

  const patchPath = path.join(stateDir, `${String(chatId)}-direct-main.patch`);
  await fs.mkdir(stateDir, { recursive: true });
  await fs.writeFile(patchPath, proposal.diff, "utf8");

  try {
    await runGit(["apply", "--whitespace=fix", patchPath]);
  } catch (error) {
    if (AUTO_SWITCH_BACK && startBranch !== MAIN_BRANCH) {
      try {
        await runGit(["switch", startBranch]);
      } catch {
        // ignore switch-back errors
      }
    }
    const msg = error instanceof Error ? error.message : String(error);
    await sendMessage(
      chatId,
      `Patch apply failed on ${MAIN_BRANCH}. No push performed.\n${shorten(msg, 1200)}`,
    );
    return;
  }

  try {
    await runShell(CHECK_COMMAND);
  } catch (error) {
    if (AUTO_SWITCH_BACK && startBranch !== MAIN_BRANCH) {
      try {
        await runGit(["switch", startBranch]);
      } catch {
        // ignore switch-back errors
      }
    }
    const msg = error instanceof Error ? error.message : String(error);
    await sendMessage(
      chatId,
      `Checks failed (${CHECK_COMMAND}) on ${MAIN_BRANCH}. Push aborted.\n${shorten(msg, 1200)}`,
    );
    return;
  }

  const { stdout: statusAfter } = await runGit(["status", "--porcelain"]);
  if (!statusAfter.trim()) {
    if (AUTO_SWITCH_BACK && startBranch !== MAIN_BRANCH) {
      await runGit(["switch", startBranch]);
    }
    await sendMessage(chatId, "No file changes after patch. Nothing pushed.");
    return;
  }

  await runGit(["add", "-A"]);
  await runGit(["commit", "-m", proposal.commitMessage]);

  let pushError = null;
  try {
    await runGit(["push", MAIN_REMOTE, MAIN_BRANCH]);
  } catch (error) {
    pushError = error instanceof Error ? error.message : String(error);
  }

  const { stdout: commitSha } = await runGit(["rev-parse", "--short", "HEAD"]);

  if (AUTO_SWITCH_BACK && startBranch !== MAIN_BRANCH) {
    await runGit(["switch", startBranch]);
  }

  if (pushError) {
    await sendMessage(
      chatId,
      [
        `Committed locally on ${MAIN_BRANCH} (${commitSha}) but push failed.`,
        `Commit message: ${proposal.commitMessage}`,
        "",
        shorten(pushError, 1200),
      ].join("\n"),
    );
    return;
  }

  await sendMessage(
    chatId,
    [
      `Direct push completed to ${MAIN_REMOTE}/${MAIN_BRANCH}: ${commitSha}`,
      `Commit message: ${proposal.commitMessage}`,
      `Summary: ${proposal.summary}`,
    ].join("\n"),
  );
}

async function processMessage(update, state) {
  const message = update.message;
  if (!message || typeof message.text !== "string") return;

  const chatId = message.chat.id;
  if (!isAuthorized(chatId)) {
    await sendMessage(chatId, "Unauthorized chat.");
    return;
  }

  const text = message.text.trim();
  const [command, ...rest] = text.split(" ");
  const arg = rest.join(" ").trim();

  if (command === "/start" || command === "/help") {
    await sendMessage(chatId, helpText());
    return;
  }

  if (command === "/web") {
    await handleWeb(chatId, arg, state);
    return;
  }

  if (command === "/web-main" || command === "/webmain") {
    await handleWebMain(chatId, arg, state);
    return;
  }

  if (command === "/approve") {
    await handleApprove(chatId, state);
    return;
  }

  if (command === "/reject") {
    await handleReject(chatId, state);
    return;
  }

  if (command === "/status") {
    await handleStatus(chatId, state);
    return;
  }

  await sendMessage(chatId, "Unknown command.\n\n" + helpText());
}

async function pollLoop() {
  if (typeof fetch !== "function") {
    throw new Error("Node.js 18+ is required (global fetch is missing).");
  }

  if (!BOT_TOKEN) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN");
  }

  if (allowedChats.size === 0) {
    throw new Error("Missing TELEGRAM_ALLOWED_CHAT_IDS (comma-separated chat IDs)");
  }

  const state = await loadState();
  // Start from latest updates on first boot to avoid replaying old messages.
  if (!state.offset) {
    const bootstrap = await telegramApi("getUpdates", { timeout: 1, limit: 1 });
    if (bootstrap.length > 0) {
      state.offset = bootstrap[bootstrap.length - 1].update_id + 1;
      await saveState(state);
    }
  }

  while (true) {
    try {
      const updates = await telegramApi("getUpdates", {
        offset: state.offset,
        timeout: TELEGRAM_POLL_TIMEOUT_SECONDS,
      });

      for (const update of updates) {
        state.offset = update.update_id + 1;
        await processMessage(update, state);
      }

      await saveState(state);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      // Keep process alive on transient network/API errors.
      console.error(`[${nowIso()}] Poll error: ${msg}`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
}

pollLoop().catch((error) => {
  const msg = error instanceof Error ? error.message : String(error);
  console.error(`Fatal: ${msg}`);
  process.exit(1);
});
