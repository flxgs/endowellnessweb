# ENDO Wellness Web

Next.js app for the ENDO wellness club site.

## App setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Telegram webhook bot (Vercel-compatible)

This repo includes a Vercel-compatible Telegram bot endpoint at:

`/api/telegram/webhook`

The bot no longer relies on local git state or long polling. It uses OpenAI + GitHub APIs.

### Commands

- `/web <instruction>`: generates code edits and opens a PR.
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
- `WEB_BOT_ENABLE_DIRECT_MAIN_PUSH` (default: `false`)

### Configure Telegram webhook

After deploying to Vercel, set webhook to:

```bash
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<your-domain>/api/telegram/webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>
```

### Get chat IDs safely

1. User sends `/start` to the bot.
2. Open:
`https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates`
3. Read `message.chat.id` and add it to `TELEGRAM_ALLOWED_CHAT_IDS`.

### Security guidance

- Keep `TELEGRAM_ALLOWED_CHAT_IDS` strict.
- Keep `WEB_BOT_ENABLE_DIRECT_MAIN_PUSH=false` unless absolutely required.
- Rotate tokens if they were exposed in logs/chat history.
