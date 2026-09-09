#!/bin/bash
# 宅建ドリルの日次コーチを毎朝生成する。launchd から呼ばれる。
#
# daily-coach.py が Firestore の実績を読んでレポートを docs/coach/ に書く。
# gcloud のトークンが切れていると失敗するので、その時はログに残して静かに終わる
# （毎朝ダイアログを出すより、次に手で叩いた時に気づく方がよい）。

set -uo pipefail

REPO="/Users/changju1109/AICompany/takken-drill"
TODAY="$(date '+%Y-%m-%d')"
YESTERDAY="$(date -v-1d '+%Y-%m-%d')"
LOG_DIR="${REPO}/docs/coach/logs"
LOG_FILE="${LOG_DIR}/${TODAY}.log"

mkdir -p "$LOG_DIR"

{
  echo "=== 宅建コーチ ${TODAY} $(date '+%H:%M:%S') ==="
  cd "$REPO" || exit 1
  python3 scripts/daily-coach.py
  echo "exit=$?"
  # 夜間AIバッチ: 誤答の原因推定・混同ペア・メモ照合・根拠の採点を Firestore insights/{uid} に書く。
  # 法改正候補（--only lawchanges）は250問ぶんの呼び出しになるので毎朝は走らせない。
  echo "=== AI insights $(date '+%H:%M:%S') ==="
  python3 scripts/ai-insights.py --push
  echo "insights exit=$?"
  # 学習ログ。朝7時に走るので、書き出すのは昨日ぶん（今日はまだ解いていない）。
  # 発信素材の入力になる。以前はアプリのボタン→Gmail→手で保存していた。
  echo "=== 学習ログ $(date '+%H:%M:%S') ==="
  python3 scripts/study-log.py --date "$YESTERDAY"
  echo "studylog exit=$?"
} >>"$LOG_FILE" 2>&1

# 生成できたらデスクトップ通知で今日の1行を出す。
REPORT="${REPO}/docs/coach/${TODAY}.md"
if [ -f "$REPORT" ]; then
  PACE="$(grep -m1 '未着手' "$REPORT" | sed 's/\*//g')"
  osascript -e "display notification \"${PACE}\" with title \"宅建コーチ ${TODAY}\"" 2>/dev/null || true
fi
