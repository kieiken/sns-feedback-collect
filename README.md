# SNS Feedback Collect

`sns-feedback-collect` は、SNS投稿90日計画の「反響取得」を Codex で扱いやすくするための Skill です。Facebook と Threads の公開反応を読み取り、ローカルのダッシュボードへ保存し、Hao 式の基準で「調整が必要か」を判断します。

## 目的

- 投稿の反響を、毎回同じ手順で集める
- 保存済みの反響を、あとから比較しやすくする
- まだ様子見なのか、書き方や導線を直すべきかを素早く見極める

## 用途

- `反響を取得して`
- `最新の反響を見て`
- `Haoスキルをもとに調整が必要か判断して`
- `FB反響を更新して`
- `Threadsの反応を記録して`

この Skill は、`social-post` のように発文そのものを作るためのものではなく、投稿後の計測と診断に使います。

## 使い方

1. Codex Desktop でこの Skill を有効にする
2. `~/.codex/skills/sns-feedback-collect/scripts/summarize_feedback.js` で既存の反響を要約する
3. Chrome で Facebook または Threads を開き、見える範囲の数値を取得する
4. `~/.n8n-files/fb-feedback.json` に保存する
5. `~/kiei-dashboard/tracking.test.js` で整合性を確認する

## Chrome プラグインについて

Codex の Chrome プラグインを入れると、Codex がログイン済み Chrome を読めるようになり、反響の取得を自動で進められます。  
そのため、手で画面を見ながらメモするよりも、投稿ごとの反応をローカルの記録へそのまま残しやすくなります。

## 参照

- [SKILL.md](./SKILL.md)
- [反響取得の保存契約](./references/dashboard-contract.md)
- [Hao式の判断メモ](./references/hao-evaluation.md)
