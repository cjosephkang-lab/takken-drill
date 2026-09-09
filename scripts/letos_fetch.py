"""宅建レトスの解説ページを取得し、<article> 内の本文テキストだけを取り出す。

ai-insights.py がメモ照合・根拠採点・法改正候補の「根拠」として使う。
本文は build/letos-cache/<問題ID>.txt にキャッシュし（build/ は gitignore 済み）、
Firestore にもレポートにも保存しない。保存するのは出典URLとページタイトルだけ。

取得のマナー:
- User-Agent を付ける
- 連続取得の間隔は1秒以上あける
- 一度取ったページは取り直さない（キャッシュ優先）
"""

import html
import re
import time
import urllib.request
from pathlib import Path

USER_AGENT = "takken-drill ai-insights (personal study tool; contact: cjoseph.kang@techbull.co.jp)"
MIN_INTERVAL_SEC = 1.0

# 解説ページ末尾には「令和7年（2025年）：宅建試験・過去問」以降に
# 同年度の全問へのナビゲーションが並ぶ。根拠としては不要なので切り落とす。
NAV_MARKER = re.compile(r"^令和\d+年（\d{4}年）：宅建試験・過去問\s*$", re.M)

_last_fetch_at = 0.0


def extract_article(raw_html: str) -> tuple[str, str]:
    """HTML から (ページタイトル, article 本文テキスト) を返す。

    <article> が無いページは本文を空文字で返す（呼び出し側で unclear 扱い）。
    """
    title_match = re.search(r"<title>(.*?)</title>", raw_html, re.S)
    title = html.unescape(title_match.group(1)).strip() if title_match else ""
    # サイト名のサフィックス（" - ４ヶ月で宅建合格できる…"）は落とす。
    title = re.split(r"\s+-\s+", title, maxsplit=1)[0].strip()

    article_match = re.search(r"<article\b.*?</article>", raw_html, re.S)
    if not article_match:
        return title, ""
    article = article_match.group(0)
    article = re.sub(r"<(script|style)\b.*?</\1>", "", article, flags=re.S)
    article = re.sub(r"<!--.*?-->", "", article, flags=re.S)
    article = re.sub(r"<br\s*/?>|</p>|</div>|</li>|</h\d>|</tr>|</section>", "\n", article)
    article = re.sub(r"<[^>]+>", "", article)
    article = html.unescape(article)
    article = re.sub(r"[ \t　]+", " ", article)
    article = re.sub(r"\n\s*\n+", "\n", article).strip()

    nav = NAV_MARKER.search(article)
    if nav:
        article = article[: nav.start()].rstrip()
    return title, article


def _cache_path(cache_dir: Path, question_id: str) -> Path:
    return cache_dir / f"{question_id}.txt"


def read_cached(cache_dir: Path, question_id: str) -> tuple[str, str] | None:
    """キャッシュがあれば (タイトル, 本文)。1行目がタイトル、空行を挟んで本文。"""
    path = _cache_path(cache_dir, question_id)
    if not path.exists():
        return None
    text = path.read_text(encoding="utf-8")
    title, _, body = text.partition("\n\n")
    return title.strip(), body.strip()


def fetch_explanation(
    question_id: str, url: str, cache_dir: Path, *, allow_network: bool = True
) -> tuple[str, str] | None:
    """解説ページの (タイトル, 本文) を返す。キャッシュ優先。

    allow_network=False（dry-run）でキャッシュが無いときは None。
    取得に失敗したときも None（呼び出し側で skip する）。
    """
    global _last_fetch_at
    cached = read_cached(cache_dir, question_id)
    if cached is not None:
        return cached
    if not allow_network or not url:
        return None

    wait = MIN_INTERVAL_SEC - (time.monotonic() - _last_fetch_at)
    if wait > 0:
        time.sleep(wait)
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            raw = response.read().decode("utf-8", "replace")
    except Exception:  # noqa: BLE001 - 取れなかった問題は skip するだけ
        _last_fetch_at = time.monotonic()
        return None
    _last_fetch_at = time.monotonic()

    title, body = extract_article(raw)
    cache_dir.mkdir(parents=True, exist_ok=True)
    _cache_path(cache_dir, question_id).write_text(
        f"{title}\n\n{body}", encoding="utf-8"
    )
    return title, body
