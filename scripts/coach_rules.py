"""予備校・有名講師の公開情報に基づく指導方針。日次コーチの判定ルール。

数値・方針の出典は各ルールに明記する。推測で書いた助言は入れない。
教材本文は転載せず、そこに書かれた方針を判定条件に翻訳して使う。

出典（2026-09-07 時点）:
- 棚田行政書士「大量記憶法」（YouTube「不動産大学」登録者20万人超・
  TAC出版『棚田式』シリーズ） https://takken11.com/memory/
  （0日→半日→1日→2日→…→7日と最初の1週間を毎日詰め、7日到達後に週1回へ。
    エビングハウスの忘却曲線が根拠。問題集のチェックボックスは4つ＝4回解く）
- 伊藤塾「宅建の模試は受けるべき？」
  https://column.itojuku.co.jp/takken/method/moshi/
  （模試は最低1回・多くても3回 / 9月に受ける / 点数より間違えた原因の分析）
- 伊藤塾「宅建の合格点」 https://column.itojuku.co.jp/takken/basic/goukakuten/
  （過去10年 最低33点〜最高38点・平均35.5点）
- アガルート「宅建試験の直前対策」
  https://www.agaroot.jp/takken/column/chokuzen/
  （苦手分野をトコトン潰す / 模試4回以上は勉強を邪魔する
    / 直前期に新しい教材を買わない / 他人と比較しない）
- アガルート「時間配分・解く順番」
  https://www.agaroot.jp/takken/column/time-allocation/
  （業法35分→権利35分→法令16分→税5分→免除9分→マークと見直し20分。
    1問2分以内。マークは全50問解き終えてから一括。分からない問題は見直しで）
- 伊藤塾「勉強スケジュールの組み方」
  https://column.itojuku.co.jp/takken/method/benkyou-sukejuuru/
  （8月中にインプットを終え9月には過去問学習 /
    何度も間違える問題をピックアップし直前期にそれだけ繰り返す）
- 伊藤塾「法令上の制限の攻略法」
  https://column.itojuku.co.jp/takken/method/houreijounoseigen/
  （法令8問の内訳 / 1法令を学ぶたびにその分野の過去問を解く / 捨て科目にしない）
- 資格の大原「宅建士は過去問を使う学習が効率的」
  https://www.o-hara.jp/course/takken/tak_column_3
  （分野別で理解度を確認してから年度別へ /
    正解した問題も「なぜ正解か」を説明できるまで）
"""

# ---- 科目別の目標正答率 ----
# 安全圏38点は得点率8割。宅建業法は9割以上（20問中18問）が講師の推奨。
# 権利関係は7〜8割が必要とされるが、他科目で30点取れる前提なら
# 8点（57%）で合計38点に届くため、深追いしない方針を採る。
# 出典: 伊藤塾「合格点」・LETOS「目標合格点数」
TARGET_ACCURACY = {
    "宅建業法": 0.90,
    "権利関係": 0.57,
    "法令上の制限": 0.75,
    "税・価格評定": 0.67,
    "免除科目": 0.80,
}

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

# ---- 本試験の時間配分（アガルート） ----
# 業法から始めるのは、権利関係を先にやるとペースが崩れるため。
# マークは全問解き終えてから一括で塗る（目線の往復を減らしミスを防ぐ）。
EXAM_ORDER = [
    ("宅建業法", "問26-45", 35),
    ("権利関係", "問1-14", 35),
    ("法令上の制限", "問15-22", 16),
    ("税・価格評定", "問23-25", 5),
    ("免除科目", "問46-50", 9),
]
EXAM_REVIEW_MINUTES = 20  # マークと見直し

# ---- 模試の回数（伊藤塾・アガルート） ----
MOCK_COUNT_MIN = 1
MOCK_COUNT_MAX = 3

# ---- 復習の判定 ----
# 「何度も間違える問題をピックアップして直前期に繰り返す」（伊藤塾）を、
# lapses（間違えた回数）で機械的に判定する。
REPEATED_MISTAKE_LAPSES = 2

# 棚田式の問題集はチェックボックスが4つ＝同じ問題を4回解く前提。
# アプリの習得判定（3連続正解）とは別に、通算4回を目安として見る。
TANADA_TARGET_ATTEMPTS = 4

# 直前期に入る残日数。ここから先は新規より弱点潰しを優先する。
# アガルート「苦手分野をトコトン潰すことに時間を使うべき」。
FINAL_PHASE_DAYS = 30


def verdict_for(predicted: float, days_left: int) -> tuple[str, str]:
    """予想点と残日数から、信号と一行の判定を返す。

    合格ラインは伊藤塾の過去10年データ（最低33 / 平均35.5 / 安全圏38）。
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


def accuracy_gap(category: str, accuracy: float) -> float:
    """目標正答率にどれだけ足りないか（ポイント）。届いていれば負。"""
    return TARGET_ACCURACY.get(category, 0.7) - accuracy


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


def exam_day_plan() -> list[str]:
    """本試験当日の解く順番と時間配分（アガルート）。"""
    lines = []
    clock = 13 * 60  # 13:00開始
    for name, span, minutes in EXAM_ORDER:
        start = f"{clock // 60}:{clock % 60:02d}"
        clock += minutes
        end = f"{clock // 60}:{clock % 60:02d}"
        lines.append(f"{start}-{end} {name}（{span}）{minutes}分")
    start = f"{clock // 60}:{clock % 60:02d}"
    lines.append(f"{start}-15:00 マークと見直し {EXAM_REVIEW_MINUTES}分")
    return lines
