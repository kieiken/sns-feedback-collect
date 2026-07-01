---
name: sns-feedback-collect
description: Collect, save, and diagnose reactions for the local SNS投稿90日計画 dashboard. Use when the user asks to 反響取得, FB反響, Threads反応, SNS投稿90日計画の計測, 最新反響, Haoスキルにもとづく調整判断, or review whether recent SNS results require content-plan changes.
---

# SNS Feedback Collect

## Overview

Collect visible Facebook/Threads reaction metrics for the local 90-day SNS dashboard, save them to the dashboard feedback store, and judge whether content changes are warranted using Hao social-post evaluation rules.

Core local files:
- Dashboard root: `~/kiei-dashboard`
- Queue: `~/kiei-dashboard/queue.json`
- Feedback store: `~/.n8n-files/fb-feedback.json`
- Dashboard URL: `http://127.0.0.1:8787/`

## Workflow

1. **Orient locally**
   - Read `queue.json` and `fb-feedback.json`.
   - Run `node scripts/summarize_feedback.js` from this skill, or pass `--queue` / `--feedback` if paths differ.
   - Identify social posts with `status: posted` and any visible platform posts not yet marked `posted`.

2. **Collect live data only when needed**
   - Use the user's logged-in Chrome profile in read-only mode.
   - Do not post, reply, like, share, follow, DM, edit, delete, upload, or change permissions.
   - For Facebook, open `https://www.facebook.com/kiei.KK`, find the target post by body excerpt/date, then open `インサイトを見る`.
   - For Threads, open `https://www.threads.com/@kenkiei?hl=ja`, find the target post by body excerpt/date, and read visible views/replies/reactions. Do not infer hidden unique reach.

3. **Save metrics**
   - Prefer the dashboard API when the local server is running:
     - GET/POST feedback: `http://127.0.0.1:8787/api/fb-feedback`
     - Static queue: `http://127.0.0.1:8787/queue.json`
   - If the server is down, start it with `~/kiei-dashboard/launch-dashboard.sh`.
   - Use the POST schema in `references/dashboard-contract.md`.
   - Preserve previous metrics when updating a post so the dashboard can show deltas.

4. **Synchronize posted state if needed**
   - If the platform visibly shows a published post but `queue.json` still says `approved`, `ready`, or `scheduled`, update only that post to `status: posted`.
   - Use `/api/post-update` for a simple status sync. If exact `posted_at` is known and matters, patch only the relevant JSON fields.
   - Do not change post copy, comments, platform, or future schedule unless the user explicitly asks.

5. **Diagnose with Hao rules**
   - Read `references/hao-evaluation.md` before giving adjustment recommendations.
   - Never call a post successful or failed before 48-72h plateau. For 1-24h data, report trajectory only.
   - Treat saves, shares, and meaningful comments as stronger signals than reactions.

6. **Verify**
   - Validate JSON with `node -e "JSON.parse(require('fs').readFileSync('...','utf8'))"`.
   - Run `~/kiei-dashboard/tracking.test.js` when feedback schema or dashboard data changed.
   - Summarize exactly what was saved, what could not be read, and what is still too early to judge.

## Data Rules

- Use `0` for metrics that are visibly absent or unavailable; do not invent values.
- If Facebook shows only a follower/non-follower percentage, record the percentage in `notes`/`churn_signal`; leave `non_follower_reach` as `0` unless an absolute count is visible.
- For Threads, use `metrics.views` for visible display count. Leave `reach` as `0` if unique reach is not exposed.
- `meaningful_comments` means comments with actual content, not the user's own link/口火 comments or short reactions.
- `strong_reaction_rate` is based on `shares + saves + meaningful_comments`, not likes/reactions.

## Common Commands

```bash
node ~/.codex/skills/sns-feedback-collect/scripts/summarize_feedback.js
node ~/kiei-dashboard/tracking.test.js
curl -sS http://127.0.0.1:8787/api/fb-feedback
```

## References

- `references/dashboard-contract.md`: local paths, API endpoints, and POST schema.
- `references/hao-evaluation.md`: concise Hao social-post rules for judging whether to adjust.
