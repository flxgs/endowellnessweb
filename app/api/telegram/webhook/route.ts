import { after } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 180;

type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
};

type TelegramMessage = {
  message_id: number;
  chat: {
    id: number;
    type: string;
  };
  from?: {
    id: number;
    username?: string;
    first_name?: string;
  };
  text?: string;
};

type OpenAIProposal = {
  summary: string;
  commitMessage: string;
  changes: ChangeEntry[];
};

type ChangeEntry = {
  path: string;
  operation: "upsert" | "delete";
  content?: string;
};

type GitHubConfig = {
  token: string;
  owner: string;
  repo: string;
  mainBranch: string;
};

type BotConfig = {
  telegramToken: string;
  telegramAllowedChatIds: Set<string>;
  telegramWebhookSecret: string | null;
  openaiApiKey: string;
  openaiModel: string;
  github: GitHubConfig;
  allowDirectMainPush: boolean;
  allowlistPath: string;
};

type AllowlistState = {
  ids: Set<string>;
  sha: string | null;
};

const MAX_SNAPSHOT_CHARS = 140_000;
const MAX_SNAPSHOT_FILES = 45;
const MAX_FILE_SIZE_BYTES = 20_000;
const HTTP_TIMEOUT_MS = 20_000;
const OPENAI_TIMEOUT_MS = 45_000;

const SKIP_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".pdf",
  ".zip",
  ".mp4",
  ".mov",
  ".woff",
  ".woff2",
  ".lock",
]);

function getEnv(name: string, required = true): string {
  const value = process.env[name]?.trim() || "";
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getBotConfig(): BotConfig {
  const telegramToken = getEnv("TELEGRAM_BOT_TOKEN");
  const openaiApiKey = getEnv("OPENAI_API_KEY");
  const telegramAllowedChatIdsRaw = getEnv("TELEGRAM_ALLOWED_CHAT_IDS");
  const openaiModel = getEnv("OPENAI_MODEL", false) || "gpt-5.3-codex";
  const telegramWebhookSecret = getEnv("TELEGRAM_WEBHOOK_SECRET", false) || null;
  const allowDirectMainPush = getEnv("WEB_BOT_ENABLE_DIRECT_MAIN_PUSH", false) === "true";
  const allowlistPath = getEnv("GITHUB_ALLOWLIST_PATH", false) || ".bot/allowlist.json";

  const githubToken = getEnv("GITHUB_TOKEN");
  const githubOwner = getEnv("GITHUB_REPO_OWNER");
  const githubRepo = getEnv("GITHUB_REPO_NAME");
  const githubMainBranch = getEnv("GITHUB_MAIN_BRANCH", false) || "main";

  const telegramAllowedChatIds = new Set(
    telegramAllowedChatIdsRaw
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  );

  if (telegramAllowedChatIds.size === 0) {
    throw new Error("TELEGRAM_ALLOWED_CHAT_IDS is empty.");
  }

  return {
    telegramToken,
    telegramAllowedChatIds,
    telegramWebhookSecret,
    openaiApiKey,
    openaiModel,
    allowDirectMainPush,
    allowlistPath,
    github: {
      token: githubToken,
      owner: githubOwner,
      repo: githubRepo,
      mainBranch: githubMainBranch,
    },
  };
}

function isValidChatId(value: string): boolean {
  return /^-?\d+$/.test(value.trim());
}

function normalizeCommand(raw: string): string {
  return raw.split("@")[0]?.toLowerCase() || "";
}

function parseCommand(text: string): { command: string; arg: string } {
  const trimmed = text.trim();
  if (!trimmed) return { command: "", arg: "" };
  const match = trimmed.match(/^(\S+)(?:\s+([\s\S]*))?$/);
  if (!match) return { command: "", arg: "" };
  return {
    command: normalizeCommand(match[1]),
    arg: (match[2] || "").trim(),
  };
}

function shorten(value: string, max = 1100): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 3)}...`;
}

function sanitizeBranchPart(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function normalizePath(input: string): string {
  const cleaned = input
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .replace(/^\/+/, "")
    .trim();
  if (!cleaned) throw new Error("Change path cannot be empty.");
  if (cleaned.includes("..")) throw new Error(`Unsafe path: ${input}`);
  return cleaned;
}

function encodeGitHubContentPath(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function decodeBase64(content: string): string {
  return Buffer.from(content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  timeoutMs: number,
  label: string,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, {
      ...(init || {}),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`${label} timed out after ${Math.round(timeoutMs / 1000)}s`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function telegramApi(
  cfg: BotConfig,
  method: string,
  payload: Record<string, unknown>,
): Promise<unknown> {
  const res = await fetchWithTimeout(
    `https://api.telegram.org/bot${cfg.telegramToken}/${method}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    HTTP_TIMEOUT_MS,
    `Telegram ${method}`,
  );

  const data = (await res.json()) as { ok: boolean; result?: unknown; description?: string };
  if (!data.ok) {
    throw new Error(`Telegram ${method} failed: ${data.description || "unknown error"}`);
  }
  return data.result;
}

async function sendTelegramMessage(cfg: BotConfig, chatId: number, text: string): Promise<void> {
  await telegramApi(cfg, "sendMessage", {
    chat_id: chatId,
    text: shorten(text, 3900),
    disable_web_page_preview: true,
  });
}

async function githubApi<T>(
  cfg: GitHubConfig,
  endpoint: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetchWithTimeout(
    `https://api.github.com${endpoint}`,
    {
      ...init,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${cfg.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    },
    HTTP_TIMEOUT_MS,
    `GitHub ${endpoint}`,
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GitHub API ${res.status} on ${endpoint}: ${errorText}`);
  }

  return (await res.json()) as T;
}

async function getBranchHeadSha(cfg: GitHubConfig, branch: string): Promise<string> {
  const ref = await githubApi<{ object: { sha: string } }>(
    cfg,
    `/repos/${cfg.owner}/${cfg.repo}/git/ref/heads/${branch}`,
  );
  return ref.object.sha;
}

async function getCommitTreeSha(cfg: GitHubConfig, commitSha: string): Promise<string> {
  const commit = await githubApi<{ tree: { sha: string } }>(
    cfg,
    `/repos/${cfg.owner}/${cfg.repo}/git/commits/${commitSha}`,
  );
  return commit.tree.sha;
}

async function createBlob(cfg: GitHubConfig, content: string): Promise<string> {
  const blob = await githubApi<{ sha: string }>(cfg, `/repos/${cfg.owner}/${cfg.repo}/git/blobs`, {
    method: "POST",
    body: JSON.stringify({
      content,
      encoding: "utf-8",
    }),
  });
  return blob.sha;
}

async function createTree(
  cfg: GitHubConfig,
  baseTreeSha: string,
  entries: Array<{ path: string; mode?: string; type?: string; sha: string | null }>,
): Promise<string> {
  const tree = await githubApi<{ sha: string }>(cfg, `/repos/${cfg.owner}/${cfg.repo}/git/trees`, {
    method: "POST",
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: entries,
    }),
  });
  return tree.sha;
}

async function createCommit(
  cfg: GitHubConfig,
  message: string,
  treeSha: string,
  parentSha: string,
): Promise<string> {
  const commit = await githubApi<{ sha: string }>(cfg, `/repos/${cfg.owner}/${cfg.repo}/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message,
      tree: treeSha,
      parents: [parentSha],
    }),
  });
  return commit.sha;
}

async function createBranch(cfg: GitHubConfig, branchName: string, sha: string): Promise<void> {
  await githubApi(
    cfg,
    `/repos/${cfg.owner}/${cfg.repo}/git/refs`,
    {
      method: "POST",
      body: JSON.stringify({
        ref: `refs/heads/${branchName}`,
        sha,
      }),
    },
  );
}

async function updateBranch(cfg: GitHubConfig, branchName: string, sha: string): Promise<void> {
  await githubApi(
    cfg,
    `/repos/${cfg.owner}/${cfg.repo}/git/refs/heads/${branchName}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        sha,
        force: false,
      }),
    },
  );
}

async function createPullRequest(
  cfg: GitHubConfig,
  branchName: string,
  title: string,
  body: string,
): Promise<{ html_url: string; number: number }> {
  return githubApi<{ html_url: string; number: number }>(
    cfg,
    `/repos/${cfg.owner}/${cfg.repo}/pulls`,
    {
      method: "POST",
      body: JSON.stringify({
        title,
        head: branchName,
        base: cfg.mainBranch,
        body,
      }),
    },
  );
}

function parseAllowlistContent(content: string): Set<string> {
  if (!content.trim()) return new Set<string>();

  const parsed = JSON.parse(content) as unknown;
  const list = Array.isArray(parsed)
    ? parsed
    : parsed && typeof parsed === "object" && Array.isArray((parsed as { allowedChatIds?: unknown }).allowedChatIds)
      ? (parsed as { allowedChatIds: unknown[] }).allowedChatIds
      : [];

  return new Set(
    list
      .map((entry) => String(entry).trim())
      .filter(Boolean)
      .filter(isValidChatId),
  );
}

function serializeAllowlistContent(ids: Set<string>, actorChatId: string): string {
  return (
    JSON.stringify(
      {
        allowedChatIds: [...ids].sort((a, b) => a.localeCompare(b)),
        updatedAt: new Date().toISOString(),
        updatedBy: actorChatId,
      },
      null,
      2,
    ) + "\n"
  );
}

async function readAllowlist(cfg: BotConfig): Promise<AllowlistState> {
  const encodedPath = encodeGitHubContentPath(cfg.allowlistPath);
  const endpoint =
    `/repos/${cfg.github.owner}/${cfg.github.repo}/contents/` +
    `${encodedPath}?ref=${encodeURIComponent(cfg.github.mainBranch)}`;

  const res = await fetchWithTimeout(
    `https://api.github.com${endpoint}`,
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${cfg.github.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
    HTTP_TIMEOUT_MS,
    "GitHub allowlist read",
  );

  if (res.status === 404) {
    return { ids: new Set<string>(), sha: null };
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed reading allowlist file: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { content: string; encoding: string; sha: string };
  if (data.encoding !== "base64") {
    throw new Error(`Unsupported allowlist encoding: ${data.encoding}`);
  }

  const decoded = decodeBase64(data.content);
  return { ids: parseAllowlistContent(decoded), sha: data.sha };
}

async function writeAllowlist(
  cfg: BotConfig,
  ids: Set<string>,
  previousSha: string | null,
  actorChatId: string,
  actionLabel: string,
): Promise<void> {
  const content = serializeAllowlistContent(ids, actorChatId);
  const endpoint =
    `/repos/${cfg.github.owner}/${cfg.github.repo}/contents/` + encodeGitHubContentPath(cfg.allowlistPath);

  const body: Record<string, unknown> = {
    message: `bot: ${actionLabel} allowlist`,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch: cfg.github.mainBranch,
  };
  if (previousSha) {
    body.sha = previousSha;
  }

  const res = await fetchWithTimeout(
    `https://api.github.com${endpoint}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${cfg.github.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
    HTTP_TIMEOUT_MS,
    "GitHub allowlist write",
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed writing allowlist file: ${res.status} ${text}`);
  }
}

function pickTreeEntries(
  tree: Array<{ path: string; type: string; sha: string; size?: number }>,
): Array<{ path: string; sha: string; size: number }> {
  const preferredPrefixes = ["app/", "lib/", "scripts/", "public/", "package.json", "README.md"];

  const rank = (path: string): number => {
    const idx = preferredPrefixes.findIndex((prefix) => path.startsWith(prefix));
    return idx === -1 ? 999 : idx;
  };

  return tree
    .filter((entry) => entry.type === "blob")
    .filter((entry) => !!entry.path && !!entry.sha)
    .map((entry) => ({
      path: entry.path,
      sha: entry.sha,
      size: entry.size || 0,
    }))
    .filter((entry) => entry.size <= MAX_FILE_SIZE_BYTES)
    .filter((entry) => !SKIP_EXTENSIONS.has(`.${entry.path.split(".").pop()?.toLowerCase() || ""}`))
    .sort((a, b) => {
      const rankDiff = rank(a.path) - rank(b.path);
      if (rankDiff !== 0) return rankDiff;
      return a.path.localeCompare(b.path);
    })
    .slice(0, MAX_SNAPSHOT_FILES);
}

async function buildRepoSnapshot(cfg: GitHubConfig): Promise<string> {
  const treeData = await githubApi<{ tree: Array<{ path: string; type: string; sha: string; size?: number }> }>(
    cfg,
    `/repos/${cfg.owner}/${cfg.repo}/git/trees/${cfg.mainBranch}?recursive=1`,
  );

  const entries = pickTreeEntries(treeData.tree || []);
  let totalChars = 0;
  const chunks: string[] = [];

  for (const entry of entries) {
    if (totalChars > MAX_SNAPSHOT_CHARS) break;

    const blobData = await githubApi<{ content: string; encoding: string }>(
      cfg,
      `/repos/${cfg.owner}/${cfg.repo}/git/blobs/${entry.sha}`,
    );

    if (blobData.encoding !== "base64") {
      continue;
    }

    const decoded = decodeBase64(blobData.content);
    const block = `\n--- FILE: ${entry.path} ---\n${decoded}\n`;
    if (totalChars + block.length > MAX_SNAPSHOT_CHARS) break;
    chunks.push(block);
    totalChars += block.length;
  }

  return chunks.join("\n");
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object found in model output.");
  }
  return JSON.parse(candidate.slice(start, end + 1));
}

function validateProposal(value: unknown): OpenAIProposal {
  if (!value || typeof value !== "object") {
    throw new Error("Proposal is not an object.");
  }

  const obj = value as Record<string, unknown>;
  const summary = String(obj.summary || "").trim();
  const commitMessage = String(obj.commitMessage || "").trim();
  const rawChanges = Array.isArray(obj.changes) ? obj.changes : [];

  if (!summary) throw new Error("Proposal summary is missing.");
  if (!commitMessage) throw new Error("Proposal commitMessage is missing.");
  if (rawChanges.length === 0) throw new Error("Proposal has no file changes.");

  const changes: ChangeEntry[] = rawChanges.map((change, index) => {
    if (!change || typeof change !== "object") {
      throw new Error(`Invalid change entry at index ${index}.`);
    }
    const c = change as Record<string, unknown>;
    const path = normalizePath(String(c.path || ""));
    const operationRaw = String(c.operation || "");
    const operation = operationRaw === "delete" ? "delete" : "upsert";
    const content = typeof c.content === "string" ? c.content : undefined;
    if (operation === "upsert" && typeof content !== "string") {
      throw new Error(`Missing content for upsert at ${path}.`);
    }
    return { path, operation, content };
  });

  return { summary, commitMessage, changes };
}

async function generateProposal(
  cfg: BotConfig,
  instruction: string,
  snapshot: string,
): Promise<OpenAIProposal> {
  const systemPrompt = [
    "You are a coding assistant producing repository edits.",
    "Return STRICT JSON only. No markdown.",
    'JSON format: {"summary":string,"commitMessage":string,"changes":[{"path":string,"operation":"upsert"|"delete","content"?:string}]}',
    "Rules:",
    "- For operation=upsert include full final file content in content.",
    "- For operation=delete omit content.",
    "- Only include files you intend to change.",
    "- Keep commitMessage concise and imperative.",
  ].join("\n");

  const userPrompt = [
    `Repository: ${cfg.github.owner}/${cfg.github.repo}`,
    `Base branch: ${cfg.github.mainBranch}`,
    `Instruction: ${instruction}`,
    "",
    "Repository snapshot:",
    snapshot,
  ].join("\n");

  const response = await fetchWithTimeout(
    "https://api.openai.com/v1/responses",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cfg.openaiApiKey}`,
      },
      body: JSON.stringify({
        model: cfg.openaiModel,
        input: [
          { role: "system", content: [{ type: "input_text", text: systemPrompt }] },
          { role: "user", content: [{ type: "input_text", text: userPrompt }] },
        ],
        reasoning: { effort: "medium" },
      }),
    },
    OPENAI_TIMEOUT_MS,
    "OpenAI proposal generation",
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI API ${response.status}: ${text}`);
  }

  const data = (await response.json()) as { output_text?: string };
  const outputText = data.output_text || "";
  if (!outputText.trim()) {
    throw new Error("OpenAI returned empty output.");
  }

  const parsed = extractJson(outputText);
  return validateProposal(parsed);
}

async function commitChangeSet(
  github: GitHubConfig,
  baseSha: string,
  commitMessage: string,
  changes: ChangeEntry[],
): Promise<string> {
  const baseTreeSha = await getCommitTreeSha(github, baseSha);
  const treeEntries: Array<{ path: string; mode?: string; type?: string; sha: string | null }> = [];

  for (const change of changes) {
    if (change.operation === "delete") {
      treeEntries.push({
        path: change.path,
        mode: "100644",
        type: "blob",
        sha: null,
      });
      continue;
    }

    const blobSha = await createBlob(github, change.content || "");
    treeEntries.push({
      path: change.path,
      mode: "100644",
      type: "blob",
      sha: blobSha,
    });
  }

  const treeSha = await createTree(github, baseTreeSha, treeEntries);
  return createCommit(github, commitMessage, treeSha, baseSha);
}

async function handleWebCommand(cfg: BotConfig, chatId: number, instruction: string): Promise<void> {
  if (!instruction.trim()) {
    await sendTelegramMessage(cfg, chatId, "Usage: /web <instruction>");
    return;
  }

  await sendTelegramMessage(cfg, chatId, "Step 1/4: Reading repository snapshot...");
  const snapshot = await buildRepoSnapshot(cfg.github);
  await sendTelegramMessage(cfg, chatId, "Step 2/4: Generating proposed code changes...");
  const proposal = await generateProposal(cfg, instruction, snapshot);
  await sendTelegramMessage(cfg, chatId, "Step 3/4: Creating commit and branch...");
  const baseSha = await getBranchHeadSha(cfg.github, cfg.github.mainBranch);
  const commitSha = await commitChangeSet(cfg.github, baseSha, proposal.commitMessage, proposal.changes);

  const branchSuffix = sanitizeBranchPart(instruction) || "change";
  const branchName = `webbot/${new Date().toISOString().replace(/[:.]/g, "-")}-${branchSuffix}`;

  await createBranch(cfg.github, branchName, commitSha);
  await sendTelegramMessage(cfg, chatId, "Step 4/4: Opening pull request...");
  const pr = await createPullRequest(
    cfg.github,
    branchName,
    proposal.commitMessage,
    `Automated change from Telegram command.\n\nSummary:\n${proposal.summary}`,
  );

  await sendTelegramMessage(
    cfg,
    chatId,
    [
      `PR created: #${pr.number}`,
      pr.html_url,
      "",
      `Summary: ${proposal.summary}`,
      `Commit: ${proposal.commitMessage}`,
    ].join("\n"),
  );
}

async function handleWebMainCommand(cfg: BotConfig, chatId: number, instruction: string): Promise<void> {
  if (!cfg.allowDirectMainPush) {
    await sendTelegramMessage(
      cfg,
      chatId,
      "Direct main push is disabled. Set WEB_BOT_ENABLE_DIRECT_MAIN_PUSH=true to enable /web-main.",
    );
    return;
  }

  if (!instruction.trim()) {
    await sendTelegramMessage(cfg, chatId, "Usage: /web-main <instruction>");
    return;
  }

  await sendTelegramMessage(cfg, chatId, "Step 1/3: Reading repository snapshot...");
  const snapshot = await buildRepoSnapshot(cfg.github);
  await sendTelegramMessage(cfg, chatId, "Step 2/3: Generating and committing changes to main...");
  const proposal = await generateProposal(cfg, instruction, snapshot);
  const baseSha = await getBranchHeadSha(cfg.github, cfg.github.mainBranch);
  const commitSha = await commitChangeSet(cfg.github, baseSha, proposal.commitMessage, proposal.changes);
  await updateBranch(cfg.github, cfg.github.mainBranch, commitSha);
  await sendTelegramMessage(cfg, chatId, "Step 3/3: Push to main completed, sending summary...");

  await sendTelegramMessage(
    cfg,
    chatId,
    [
      `Direct push completed on ${cfg.github.mainBranch}: ${commitSha.slice(0, 8)}`,
      `Summary: ${proposal.summary}`,
      `Commit: ${proposal.commitMessage}`,
    ].join("\n"),
  );
}

async function handleAllowCommand(
  cfg: BotConfig,
  chatId: number,
  actorChatId: string,
  targetChatIdRaw: string,
  allowlist: AllowlistState,
): Promise<void> {
  const target = targetChatIdRaw.trim();
  if (!target || !isValidChatId(target)) {
    await sendTelegramMessage(cfg, chatId, "Usage: /allow <numeric_chat_id>");
    return;
  }

  if (cfg.telegramAllowedChatIds.has(target) || allowlist.ids.has(target)) {
    await sendTelegramMessage(cfg, chatId, `Chat ID ${target} is already allowlisted.`);
    return;
  }

  const nextIds = new Set(allowlist.ids);
  nextIds.add(target);
  await writeAllowlist(cfg, nextIds, allowlist.sha, actorChatId, `allow ${target}`);
  await sendTelegramMessage(
    cfg,
    chatId,
    `Added ${target} to dynamic allowlist. They can now run bot commands.`,
  );
}

async function handleRemoveIdCommand(
  cfg: BotConfig,
  chatId: number,
  actorChatId: string,
  targetChatIdRaw: string,
  allowlist: AllowlistState,
): Promise<void> {
  const target = targetChatIdRaw.trim();
  if (!target || !isValidChatId(target)) {
    await sendTelegramMessage(cfg, chatId, "Usage: /removeid <numeric_chat_id>");
    return;
  }

  if (cfg.telegramAllowedChatIds.has(target)) {
    await sendTelegramMessage(
      cfg,
      chatId,
      `Chat ID ${target} is in TELEGRAM_ALLOWED_CHAT_IDS env and cannot be removed with /removeid.`,
    );
    return;
  }

  if (!allowlist.ids.has(target)) {
    await sendTelegramMessage(cfg, chatId, `Chat ID ${target} is not in dynamic allowlist.`);
    return;
  }

  const nextIds = new Set(allowlist.ids);
  nextIds.delete(target);
  await writeAllowlist(cfg, nextIds, allowlist.sha, actorChatId, `remove ${target}`);
  await sendTelegramMessage(cfg, chatId, `Removed ${target} from dynamic allowlist.`);
}

async function handleAllowlistCommand(
  cfg: BotConfig,
  chatId: number,
  allowlist: AllowlistState,
): Promise<void> {
  const seedIds = [...cfg.telegramAllowedChatIds].sort((a, b) => a.localeCompare(b));
  const dynamicIds = [...allowlist.ids].sort((a, b) => a.localeCompare(b));
  const combined = [...new Set([...seedIds, ...dynamicIds])];

  await sendTelegramMessage(
    cfg,
    chatId,
    [
      `Allowlisted chat IDs (${combined.length} total):`,
      combined.length ? combined.join(", ") : "(none)",
      "",
      `Seed/admin IDs from env: ${seedIds.length}`,
      `Dynamic IDs from ${cfg.allowlistPath}: ${dynamicIds.length}`,
    ].join("\n"),
  );
}

function helpText(cfg: BotConfig): string {
  return [
    "Commands:",
    "/web <instruction> - Generate code change and open a PR.",
    "/allow <chat_id> - Admin-only: add dynamic allowlist entry.",
    "/removeid <chat_id> - Admin-only: remove dynamic allowlist entry.",
    "/allowlist - Admin-only: list allowlisted chat IDs.",
    "/whoami - Return your Telegram chat ID.",
    "/status - Show bot mode.",
    "/help - Show commands.",
    cfg.allowDirectMainPush
      ? "/web-main <instruction> - High-risk direct push to main."
      : "/web-main <instruction> - Disabled (WEB_BOT_ENABLE_DIRECT_MAIN_PUSH=false).",
    "Note: /approve and /reject are not used in webhook mode.",
  ].join("\n");
}

async function processUpdate(cfg: BotConfig, update: TelegramUpdate): Promise<void> {
  const message = update.message;
  if (!message || typeof message.text !== "string") return;

  const chatId = message.chat.id;
  const chatIdStr = String(chatId);
  const { command, arg } = parseCommand(message.text);
  if (!command) return;

  if (command === "/whoami" || command === "/id") {
    await sendTelegramMessage(
      cfg,
      chatId,
      [
        `Your chat ID is: ${chatId}`,
        "Send this number to an admin and ask them to run /allow <your_id>.",
      ].join("\n"),
    );
    return;
  }

  const allowlist = await readAllowlist(cfg);
  const isAdmin = cfg.telegramAllowedChatIds.has(chatIdStr);
  const isAllowed = isAdmin || allowlist.ids.has(chatIdStr);

  if (!isAllowed) {
    await sendTelegramMessage(
      cfg,
      chatId,
      "Unauthorized chat. Use /whoami and ask an admin to run /allow <your_id>.",
    );
    return;
  }

  if (command === "/start" || command === "/help") {
    await sendTelegramMessage(cfg, chatId, helpText(cfg));
    return;
  }

  if (command === "/status") {
    await sendTelegramMessage(
      cfg,
      chatId,
      [
        "Bot is online in webhook mode.",
        `Repo: ${cfg.github.owner}/${cfg.github.repo}`,
        `Base branch: ${cfg.github.mainBranch}`,
        `Direct main push: ${cfg.allowDirectMainPush ? "enabled" : "disabled"}`,
        `Admin mode: ${isAdmin ? "yes" : "no"}`,
      ].join("\n"),
    );
    return;
  }

  if (command === "/allow") {
    if (!isAdmin) {
      await sendTelegramMessage(cfg, chatId, "Only admin IDs can run /allow.");
      return;
    }
    await handleAllowCommand(cfg, chatId, chatIdStr, arg, allowlist);
    return;
  }

  if (command === "/removeid" || command === "/unallow" || command === "/denyid") {
    if (!isAdmin) {
      await sendTelegramMessage(cfg, chatId, "Only admin IDs can run /removeid.");
      return;
    }
    await handleRemoveIdCommand(cfg, chatId, chatIdStr, arg, allowlist);
    return;
  }

  if (command === "/allowlist") {
    if (!isAdmin) {
      await sendTelegramMessage(cfg, chatId, "Only admin IDs can run /allowlist.");
      return;
    }
    await handleAllowlistCommand(cfg, chatId, allowlist);
    return;
  }

  if (command === "/approve" || command === "/reject") {
    await sendTelegramMessage(
      cfg,
      chatId,
      "Webhook mode is stateless: use /web for PR flow or /web-main (if enabled) for direct main push.",
    );
    return;
  }

  if (command === "/web") {
    await handleWebCommand(cfg, chatId, arg);
    return;
  }

  if (command === "/web-main" || command === "/webmain") {
    await handleWebMainCommand(cfg, chatId, arg);
    return;
  }

  await sendTelegramMessage(cfg, chatId, `Unknown command.\n\n${helpText(cfg)}`);
}

export async function POST(request: Request): Promise<Response> {
  let cfg: BotConfig;
  try {
    cfg = getBotConfig();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }

  if (cfg.telegramWebhookSecret) {
    const secretHeader = request.headers.get("x-telegram-bot-api-secret-token");
    if (secretHeader !== cfg.telegramWebhookSecret) {
      return Response.json({ ok: false, error: "Invalid webhook secret." }, { status: 401 });
    }
  }

  let update: TelegramUpdate;
  try {
    update = (await request.json()) as TelegramUpdate;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  after(async () => {
    try {
      await processUpdate(cfg, update);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      // eslint-disable-next-line no-console
      console.error(`Webhook processing error: ${msg}`);
      if (update.message?.chat?.id) {
        try {
          await sendTelegramMessage(cfg, update.message.chat.id, `Request failed:\n${shorten(msg, 1200)}`);
        } catch {
          // ignore error while reporting error
        }
      }
    }
  });

  return Response.json({ ok: true });
}
