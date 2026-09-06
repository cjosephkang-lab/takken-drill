"""予備校の無料コラムに基づく指導方針。日次コーチの判定ルール。

数値・方針の出典は各ルールに明記する。推測で書いた助言は入れない。
コラム本文は転載せず、そこに書かれた方針を判定条件に翻訳して使う。

出典（2026-09-06 時点）:
- 伊藤塾「宅建の模試は受けるべき？」
  https://column.itojuku.co.jp/takken/method/moshi/
  （模試は最低1回・多くても3回 / 9月に受ける / 点数より間違えた原因の分析
    / 分野別の正答率で優先順位を決める / 低得点でも弱点補強に活かせばよい）
- アガルート「宅建試験の直前対策」
  https://www.agaroot.jp/takken/column/chokuzen/
  （苦手分野をトコトン潰す / 模試4回以上は勉強を邪魔する
    / 直前期に新しい教材を買わない / 他人と比較しない）
- 伊藤塾「宅建の勉強スケジュールの組み方」
  https://column.itojuku.co.jp/takken/method/benkyou-sukejuuru/
  （8月中にインプットを終え9月には過去問学習に入る
    / 何度も間違える問題をピックアップし直前期にそれだけ繰り返す）
- 伊藤塾「法令上の制限の攻略法」
  https://column.itojuku.co.jp/takken/method/houreijounoseigen/
  （法令上の制限8問の内訳 / 1法令を学ぶたびにその分野の過去問を解く
    / 捨て科目にはしない）
"""

# 法令上の制限の内訳。伊藤塾「法令上の制限の攻略法」より。
# 都市計画法と建築基準法が難しく各2問、その他4法は易しく合計4問。
# 易しい方が配点が高いので、そちらを先に片づける。
HOUREI_BREAKDOWN = [
    ("nochiho", "農地法", 1, "易"),
    ("kokudo-riyo", "国土利用計画法", 1, "易"),
    ("kukaku-seiri", "土地区画整理法", 1, "易"),
    ("moridokisei", "宅地造成及び特定盛土等規制法", 1, "易"),
    ("toshikeikaku-naiyo", "都市計画法（都市計画の内容・区域区分）", 1, "難"),
    ("toshikeikaku-kaihatsu", "都市計画法（開発許可）", 1, "難"),
    ("kenchikukijun-youto", "建築基準法（用途制限・容積率建蔽率）", 1, "難"),
    ("kenchikukijun-tantai", "建築基準法（単体規定・集団規定総論）", 1, "難"),
]

# 模試の回数。伊藤塾は最低1回・多くても3回、アガルートは4回以上を明確に否定。
MOCK_COUNT_MIN = 1
MOCK_COUNT_MAX = 3

# 「何度も間違える問題」の閾値。伊藤塾のスケジュール記事が言う
# 「何度も間違える問題をピックアップして直前期に繰り返す」を、
# lapses（間違えた回数）で機械的に判定する。
REPEATED_MISTAKE_LAPSES = 2

# 直前期に入る残日数。ここから先は新規より弱点潰しを優先する。
# アガルート「苦手分野をトコトン潰すことに時間を使うべき」。
FINAL_PHASE_DAYS = 30


def verdict_for(predicted: float, days_left: int) -> tuple[str, str]:
    """予想点と残日数から、信号と一行の判定を返す。

    合格ラインは studyGuide.ts の passLine（最低33 / 平均35.5 / 安全圏38）。
    残日数が少ないほど同じ点数でも厳しく見る。
    """
    if predicted >= 38:
        return "green", f"安全圏。残り{days_left}日はこの水準を維持する"
    if predicted >= 33:
        if days_left >= FINAL_PHASE_DAYS:
            return "green", f"合格ライン上。残り{days_left}日で上積みできる"
        return "yellow", f"合格ラインぎりぎり。残り{days_left}日で+5点を狙う"
    if predicted >= 25:
        return "yellow", f"あと{33 - predicted:.0f}点。残り{days_left}日で届く"
    return "red", f"あと{33 - predicted:.0f}点。残り{days_left}日、着手を最優先"


def next_topic_advice(topic_stats: dict) -> list[tuple[str, str]]:
    """法令上の制限のうち、まだ着手していない論点を易しい順に返す。

    伊藤塾「1法令を学ぶたびにその分野の過去問を解く」に沿って、
    論点をまとめてではなく1つずつ潰す順で出す。
    """
    pending = []
    for topic_id, label, marks, level in HOUREI_BREAKDOWN:
        touched = topic_stats.get(topic_id, {}).get("touched", 0)
        if touched == 0:
            pending.append((label, f"本番{marks}問・{level}しい論点"))
    return pending
