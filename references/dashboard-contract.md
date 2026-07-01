# Dashboard Contract

## Paths

- Dashboard root: `~/kiei-dashboard`
- Queue: `~/kiei-dashboard/queue.json`
- Feedback: `~/.n8n-files/fb-feedback.json`
- Feedback collect logs: `~/.n8n-files/feedback-collect-requests.jsonl`
- Last collect result: `~/.n8n-files/feedback-collect-last-result.json`

## Local API

Server default: `http://127.0.0.1:8787`

- `GET /queue.json`: read queue as a static file.
- `GET /api/fb-feedback`: read saved feedback with derived ratios.
- `POST /api/fb-feedback`: save one feedback item.
- `POST /api/post-update`: update queue fields for one post, including `status`.
- `POST /api/feedback-collect`: start the built-in Codex/Chrome collect job.
- `GET /api/feedback-collect-status?request_id=...&id=...`: inspect collect status.

There is no `/api/queue` endpoint.

## Feedback POST Schema

```json
{
  "id": "d15",
  "collect_request_id": "desktop-chrome-refresh-YYYY-MM-DD-HHMM-jst",
  "sentiment": "positive|neutral|mixed|negative",
  "metrics": {
    "views": 0,
    "reach": 0,
    "non_follower_reach": 0,
    "interactions": 0,
    "reactions": 0,
    "comments": 0,
    "meaningful_comments": 0,
    "shares": 0,
    "saves": 0,
    "link_clicks": 0,
    "profile_visits": 0
  },
  "previous_metrics": {
    "views": 0,
    "reach": 0,
    "non_follower_reach": 0,
    "interactions": 0,
    "reactions": 0,
    "comments": 0,
    "meaningful_comments": 0,
    "shares": 0,
    "saves": 0,
    "link_clicks": 0,
    "profile_visits": 0
  },
  "audience_tag": "",
  "churn_signal": "",
  "top_comments": "",
  "notes": "",
  "learning": "",
  "next_action": ""
}
```

## Platform Notes

Facebook per-post insights usually expose:
- `閲覧数`
- `閲覧者`
- follower/non-follower percentage
- age/country breakdown
- `インタラクション`, `リアクション`, `コメント`, `シェア`, `保存`, `リンククリック`

Threads profile/post pages usually expose visible display counts and public replies/reactions. If unique reach or follower split is not visible, leave those metrics at `0`.
