"""学習メモの数字を照合するための、宅建の頻出数字の正解表。

メモに書いた数字が正しいかを機械的に検査するために使う。
「営業保証金の取戻し」を5年と書いた誤りを、次から自動で拾うのが目的
（2026-09-07に手作業で発見。docs/note-review/2026-09-07.md）。

判定は「そのトピックの語がメモに出ているとき、期待する数字も出ているか」
「よくある間違いの数字が混ざっていないか」の2点だけを見る。
法律の解釈が正しいかまでは判定できない。そこは人が読む。

出典は各項目に記載。条文と予備校の公開解説で確認したものだけを載せる。
"""

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Fact:
    """1つの論点についての、正しい数字とよくある間違い。"""

    topic: str
    # このどれかがメモに出てきたら、この論点について書いていると判定する
    triggers: tuple[str, ...]
    # 正しい数字（表記ゆれを含めて列挙）
    correct: tuple[str, ...]
    # この論点でよく混同される数字。出てきたら警告する
    confusable: tuple[str, ...] = field(default_factory=tuple)
    note: str = ""
    source: str = ""


FACTS: tuple[Fact, ...] = (
    Fact(
        topic="営業保証金の取戻し・公告",
        triggers=("取戻", "取り戻", "公告"),
        correct=("6か月", "6ヶ月", "6カ月", "六月", "10年"),
        confusable=("5年", "３年", "3年"),
        note="原則6か月以上の公告。公告不要は取戻し事由から10年経過。"
             "5年は免許の有効期間・欠格期間で、取戻しとは無関係。",
        source="https://takken-success.info/takken-gyoho/article-30/",
    ),
    Fact(
        topic="営業保証金の額",
        triggers=("営業保証金", "供託"),
        correct=("1000万", "1,000万", "500万"),
        note="主たる事務所1000万円・従たる事務所1か所につき500万円。",
        source="https://takken-success.info/takkengyoho/e-13/",
    ),
    Fact(
        topic="弁済業務保証金分担金の額",
        triggers=("分担金", "保証協会"),
        correct=("60万", "30万"),
        note="主たる事務所60万円・従たる事務所1か所につき30万円。",
        source="https://saitama.zennichi.or.jp/column/guarantee-association/",
    ),
    Fact(
        topic="クーリングオフ",
        triggers=("クーリングオフ", "クーリング・オフ"),
        correct=("8日",),
        confusable=("7日", "10日", "14日"),
        note="告げられた日から起算して8日以内に書面を発する（発信主義）。",
        source="https://takken-success.info/takkengyoho/e-21/",
    ),
    Fact(
        topic="国土利用計画法の事後届出",
        triggers=("事後届出", "国土利用計画法", "国土法"),
        correct=("2週間", "2000", "2,000", "5000", "5,000", "10000", "1ha"),
        note="契約締結日から2週間以内。市街化区域2000㎡・市街化調整区域5000㎡"
             "・都市計画区域外10000㎡以上。",
        source="https://takken-success.info/horeiseigen/d-25/",
    ),
    Fact(
        topic="建築基準法の道路",
        triggers=("2項道路", "接道", "道路の幅"),
        correct=("4m", "4メートル", "2m", "1.8m"),
        note="原則幅員4m以上。2項道路は4m未満で特定行政庁の指定。"
             "1.8m未満は建築審査会の同意が必要。接道義務は2m以上。",
        source="https://news.build-app.jp/article/36460/",
    ),
    Fact(
        topic="書類の保存期間",
        triggers=("従業者名簿", "帳簿", "保存期間"),
        correct=("10年", "5年", "7年"),
        note="従業者名簿10年・帳簿5年（新築住宅は10年）"
             "・犯収法の確認記録と取引記録は7年。",
        source="https://takken-success.info/takkengyoho/e-24/",
    ),
    Fact(
        topic="媒介契約の期間・報告義務",
        triggers=("専任媒介", "専属専任", "媒介契約"),
        correct=("3か月", "3ヶ月", "3カ月", "2週間", "1週間", "5日", "7日"),
        note="専任・専属専任の有効期間は3か月以内。業務報告は専任2週間に1回以上"
             "・専属専任1週間に1回以上。指定流通機構への登録は専任7日以内"
             "・専属専任5日以内（休業日を除く）。",
        source="https://takken-success.info/takkengyoho/e-17/",
    ),
    Fact(
        topic="手付金等の保全措置",
        triggers=("保全措置", "手付金等"),
        correct=("5%", "5％", "10%", "10％", "1000万", "1,000万"),
        note="未完成物件は代金の5%超または1000万円超で保全措置が必要。"
             "完成物件は10%超または1000万円超。",
        source="https://takken-success.info/takkengyoho/e-22/",
    ),
    Fact(
        topic="手付の額の制限",
        triggers=("手付の額", "手付金の上限", "2割"),
        correct=("2割", "20%", "20％"),
        note="自ら売主の場合、手付は代金の2割を超えて受領できない。",
        source="https://takken-success.info/takkengyoho/e-20/",
    ),
    Fact(
        topic="報酬額の制限",
        triggers=("報酬", "速算"),
        correct=("3%", "3％", "6万", "4%", "4％", "2万", "5%", "5％"),
        note="速算式は400万円超が代金×3%+6万円、200万超400万以下が4%+2万円、"
             "200万以下が5%。",
        source="https://takken-success.info/takkengyoho/e-19/",
    ),
    Fact(
        topic="宅建士の登録・免許",
        triggers=("宅建士証", "登録", "免許の有効期間"),
        correct=("5年",),
        note="宅建士証と免許の有効期間はどちらも5年。"
             "欠格期間も5年（免許取消しから5年間は免許を受けられない）。",
        source="https://takken-success.info/takkengyoho/e-11/",
    ),
    Fact(
        topic="住宅瑕疵担保履行法の基準日・届出",
        triggers=("瑕疵担保", "基準日", "資力確保"),
        correct=("3月31日", "3週間", "10年"),
        note="基準日は毎年3月31日、届出は基準日から3週間以内。"
             "新築住宅の瑕疵担保責任は引渡しから10年。",
        source="https://takken-success.info/takkengyoho/e-25/",
    ),
    Fact(
        topic="開発許可の面積",
        triggers=("開発許可", "開発行為"),
        correct=("1000", "1,000", "3000", "3,000", "1ha", "10000"),
        note="市街化区域1000㎡以上（三大都市圏の一定区域は500㎡）、"
             "非線引き区域・準都市計画区域3000㎡以上、都市計画区域外1ha以上。",
        source="https://takken-success.info/horeiseigen/d-3/",
    ),
    Fact(
        topic="宅地造成規制法の規模",
        triggers=("宅地造成", "盛土", "切土"),
        correct=("2m", "1m", "500", "3000", "2メートル", "1メートル"),
        note="切土2m超・盛土1m超・切盛土合わせて2m超・面積500㎡超などで許可。",
        source="https://takken-success.info/horeiseigen/d-21/",
    ),
)


def check_note(text: str) -> list[dict]:
    """メモ1件を照合し、気になる点を返す。

    返すのは「注意」であって「誤り」の断定ではない。
    論点の語が出ているのに期待する数字がない、あるいは
    混同されやすい数字が混ざっている場合に挙げる。
    """
    findings = []
    for fact in FACTS:
        if not any(trigger in text for trigger in fact.triggers):
            continue

        hit_correct = [n for n in fact.correct if n in text]
        hit_confusable = [n for n in fact.confusable if n in text]

        if hit_confusable and not hit_correct:
            findings.append({
                "level": "warn",
                "topic": fact.topic,
                "message": f"「{'・'.join(hit_confusable)}」が出てくるが、"
                           f"この論点の数字は {'・'.join(fact.correct[:3])}。",
                "note": fact.note,
                "source": fact.source,
            })
        elif hit_confusable:
            findings.append({
                "level": "check",
                "topic": fact.topic,
                "message": f"正しい数字（{'・'.join(hit_correct)}）と紛らわしい数字"
                           f"（{'・'.join(hit_confusable)}）が両方ある。別の論点の話なら問題ない。",
                "note": fact.note,
                "source": fact.source,
            })
    return findings
