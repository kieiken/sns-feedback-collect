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

## 繁體中文（台灣）

`sns-feedback-collect` 是為了讓 Codex 更容易處理 SNS投稿90日計畫的「反響取得」而設計的 Skill。它會讀取 Facebook 與 Threads 的公開反應，把資料保存到本機儀表板，並依 Hao 式基準判斷是否需要調整。

### 目的

- 每次都用同一套流程蒐集貼文反應
- 讓已保存的反應能夠回頭比較
- 快速判斷現在該維持方向，還是要修正文案或導流

### 用途

- `取得反響`
- `查看最新反響`
- `依 Hao skill 判斷是否需要調整`
- `更新 FB 反響`
- `記錄 Threads 反應`

這個 Skill 不是拿來直接發文的，而是用在貼文之後的計測與診斷。

### 使用方式

1. 在 Codex Desktop 啟用這個 Skill
2. 用 `~/.codex/skills/sns-feedback-collect/scripts/summarize_feedback.js` 整理既有反響
3. 用 Chrome 開 Facebook 或 Threads，讀取畫面上看得見的數值
4. 儲存到 `~/.n8n-files/fb-feedback.json`
5. 用 `~/kiei-dashboard/tracking.test.js` 檢查資料一致性

### Chrome 外掛

安裝 Codex 的 Chrome 外掛之後，Codex 就能讀取已登入的 Chrome，讓反響取得更容易自動化。  
這樣就不必每次手動抄數字，可以直接把每篇貼文的反應存進本機記錄。

## 参照

- [SKILL.md](./SKILL.md)
- [反響取得の保存契約](./references/dashboard-contract.md)
- [Hao式の判断メモ](./references/hao-evaluation.md)
