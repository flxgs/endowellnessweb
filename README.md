# ENDO Wellness Web

Next.js app for the ENDO wellness club site.

## App setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Localization (next-intl)

This app uses `next-intl` with locale-based routing (`/en/*`, `/es/*`).

- Routing config: `i18n/routing.ts`
- Request config: `i18n/request.ts`
- Proxy: `proxy.ts`
- Messages: `messages/en.json`, `messages/es.json`

Required team rule:

- Every new user-facing string must be added as a translation key in both locale files.
- Do not ship new hardcoded UI strings in components.

Validation:

```bash
npm run i18n:check
```

Build also enforces this check (`npm run build` runs `i18n:check` first).

Detailed workflow: `docs/i18n.md`.

## Telegram webhook bot (Vercel-compatible)

This repo includes a Vercel-compatible Telegram bot endpoint at:

`/api/telegram/webhook`

The bot no longer relies on local git state or long polling. It uses OpenAI + GitHub APIs.
It evaluates the repository from GitHub (`GITHUB_REPO_OWNER` / `GITHUB_REPO_NAME` / `GITHUB_MAIN_BRANCH`), not local uncommitted files.

### Commands

- `/web <instruction>`: generates code edits and opens a PR.
- `/whoami`: replies with your Telegram chat ID (for allowlist onboarding).
- `/allow <chat_id>`: admin-only, add chat ID directly from Telegram.
- `/removeid <chat_id>`: admin-only, remove dynamic allowlist chat ID.
- `/allowlist`: admin-only, print current allowlisted IDs.
- `/web-main <instruction>`: optional high-risk direct push to `main` (disabled by default).
- `/status`: shows current bot mode and repo target.
- `/help`: shows commands.

### Required Vercel environment variables

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_ALLOWED_CHAT_IDS` (comma-separated chat IDs)
- `TELEGRAM_WEBHOOK_SECRET`
- `OPENAI_API_KEY`
- `GITHUB_TOKEN` (repo write access)
- `GITHUB_REPO_OWNER`
- `GITHUB_REPO_NAME`

Use `.env.bot.example` as the reference.

### Optional Vercel environment variables

- `OPENAI_MODEL` (default: `gpt-5.3-codex`)
- `GITHUB_MAIN_BRANCH` (default: `main`)
- `GITHUB_ALLOWLIST_PATH` (default: `.bot/allowlist.json`)
- `WEB_BOT_ENABLE_DIRECT_MAIN_PUSH` (default: `false`)

### Configure Telegram webhook

After deploying to Vercel, set webhook to:

```bash
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<your-domain>/api/telegram/webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>
```

### Get chat IDs safely

1. User sends `/start` to the bot.
2. User runs `/whoami` and copies their chat ID.
3. Admin runs `/allow <chat_id>` in Telegram.

Alternative:
`https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates` and read `message.chat.id`.

### Security guidance

- Keep `TELEGRAM_ALLOWED_CHAT_IDS` strict.
- Keep `WEB_BOT_ENABLE_DIRECT_MAIN_PUSH=false` unless absolutely required.
- Rotate tokens if they were exposed in logs/chat history.
