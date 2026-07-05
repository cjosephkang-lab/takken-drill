import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / 'source-pdfs'
OUT = ROOT / 'src' / 'data' / 'questions.ts'
TEXT_DIR = ROOT / 'build' / 'text'
TEXT_DIR.mkdir(parents=True, exist_ok=True)

EXAMS = [
    {
        'id': 'r7', 'year': '令和7年度', 'label': '2025 / 令和7年度',
        'pdf': 'R7_question_answer.pdf',
        'url': 'https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf',
        'mode': 'text', 'passScore': 33,
        'explanationBaseUrl': 'https://takken-success.info/2025kakomon/r07-',
    },
    {
        'id': 'r6', 'year': '令和6年度', 'label': '2024 / 令和6年度',
        'pdf': 'R6_question_answer.pdf',
        'url': 'https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf',
        'mode': 'text', 'passScore': 37,
        'explanationBaseUrl': 'https://takken-success.info/2024kakomon/r06-',
    },
    {
        'id': 'r5', 'year': '令和5年度', 'label': '2023 / 令和5年度',
        'pdf': 'R5_question_answer.pdf',
        'url': 'https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf',
        'mode': 'text', 'passScore': 36,
        'explanationBaseUrl': 'https://takken-success.info/2023kakomon/r05-',
    },
    {
        'id': 'r4', 'year': '令和4年度', 'label': '2022 / 令和4年度',
        'pdf': 'R4_question_answer.pdf',
        'url': 'https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf',
        'mode': 'ocr', 'passScore': 36,
        'explanationBaseUrl': 'https://takken-success.info/2022kakomon/r04-',
    },
    {
        'id': 'r3_12', 'year': '令和3年度12月', 'label': '2021 / 令和3年度12月',
        'pdf': 'R3_12_question_answer.pdf',
        'url': 'https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf',
        'mode': 'ocr', 'passScore': 34,
        'explanationBaseUrl': 'https://takken-success.info/2021-12kakomon/r032-',
    },
]

ANSWER_OVERRIDES = {
    'r7': [3,3,3,4,4,1,1,2,1,3,3,3,3,1,4,4,2,2,2,4,4,4,1,2,1,4,1,2,2,3,4,2,3,3,1,4,4,3,4,3,1,2,4,2,4,2,3,2,1,1],
    'r6': [1,4,3,4,2,4,1,1,2,4,3,3,1,3,4,1,2,2,3,2,1,4,2,2,3,3,4,2,4,4,1,3,3,3,2,4,3,4,4,2,1,2,4,1,2,1,4,1,2,3],
    'r5': [1,1,2,4,4,3,3,3,2,3,4,3,2,2,4,1,3,1,1,4,2,1,1,4,4,3,4,3,2,1,4,4,1,3,4,3,3,2,2,4,2,3,4,1,4,2,2,1,2,3],
    'r4': [3,3,4,1,2,3,4,3,1,2,3,1,1,2,3,2,3,3,4,1,4,3,3,2,2,2,1,1,3,3,1,1,2,4,4,1,2,4,4,2,2,2,2,4,3,1,4,'ALL',2,4],
    'r3_12': [4,3,2,4,3,1,4,2,3,1,3,2,2,2,4,3,3,2,1,1,4,1,2,1,2,3,4,1,3,3,2,1,2,1,4,4,2,3,3,2,1,3,1,[2,3],4,1,4,4,2,4],
}

CATEGORY = [
    (1, 14, '権利関係'),
    (15, 22, '法令上の制限'),
    (23, 25, '税・価格評定'),
    (26, 45, '宅建業法'),
    (46, 50, '免除科目'),
]

OCR_KANJI_FIXES = [
    ('瑕 疵 担保', '瑕疵担保'),
    ('瑕 疵', '瑕疵'),
    ('瑕疵 担保', '瑕疵担保'),
    ('宅地建惣', '宅地建物'),
    ('宅地玩取引', '宅地建物取引'),
    ('宅地駐は建物', '宅地又は建物'),
    ('和宅地', '宅地'),
    ('取引上の登録', '取引士の登録'),
    ('取引十', '取引士'),
    ('取引土', '取引士'),
    ('取引寺', '取引士'),
    ('撮導担保', '瑕疵担保'),
    ('明導担保', '瑕疵担保'),
    ('直久担保', '瑕疵担保'),
    ('下六担保', '瑕疵担保'),
    ('下獲担保', '瑕疵担保'),
    ('下導担保', '瑕疵担保'),
    ('下獲が', '瑕疵が'),
    ('表導担保', '瑕疵担保'),
    ('表六揚保次任', '瑕疵担保責任'),
    ('保険有約', '保険契約'),
    ('資任', '責任'),
    ('均任', '責任'),
    ('次任', '責任'),
    ('措胃', '措置'),
    ('放ずる', '講ずる'),
    ('現定', '規定'),
    ('人貸借', '賃貸借'),
    ('表示きれて', '表示されて'),
    ('閲覧に供き', '閲覧に供さ'),
    ('供さされる', '供される'),
    ('前金の刑', '罰金の刑'),
    ('消除きれ', '消除され'),
    ('差づく', '基づく'),
    ('告げばられた', '告げられた'),
    ('当謎', '当該'),
    ('近有隣', '近隣'),
    ('直起距離', '直線距離'),
    ('当設旧跡', '当該旧跡'),
    ('未において', '末において'),
    ('信和', '令和'),
    ('土地販書', '土地白書'),
    ('花沿岩', '花崗岩'),
    ('免んる', '免れる'),
    ('璧厚', '壁厚'),
    ('耐岩', '耐震'),
    ('補強政良', '補強改良'),
    ('奇量', '重量'),
    ('閉物', '建物'),
    ('名徳', '名簿'),
    ('名稚', '名簿'),
    ('逢する', '達する'),
    ('に係るる', 'に係るものである'),
    ('婚敵歴', '婚姻歴'),
    ('賀かなければ', '置かなければ'),
    ('封ら', '執ら'),
    ('天り', '張り'),
    ('委内所', '案内所'),
    ('超算', '起算'),
    ('避日', '翌日'),
    ('直反', '違反'),
    ('間集広告', '募集広告'),
    ('問集広告', '募集広告'),
    ('耐月診断', '耐震診断'),
    ('粘果', '結果'),
    ('当恋', '当該'),
    ('人権', '債権'),
    ('供託双は', '供託又は'),
    ('十水', '雨水'),
    ('賠交', '瑕疵'),
    ('不喘合', '不適合'),
    ('宅地寺物', '宅地建物'),
    ('取引玉者', '取引業者'),
    ('和宅地填物', '宅地建物'),
    ('就作する', '就任する'),
    ('と県に移転', '乙県に移転'),
    ('内県知事', '丙県知事'),
    ('成県知事', '戊県知事'),
    ('経包する', '経過する'),
    ('億地権', '借地権'),
    ('減失', '滅失'),
    ('宅地玩取引寺', '宅地建物取引士'),
    ('資格計険', '資格試験'),
    ('宅地域物', '宅地建物'),
    ('宅地道物', '宅地建物'),
    ('宅地始物', '宅地建物'),
    ('宅地壮物', '宅地建物'),
    ('宅地針物', '宅地建物'),
    ('信則', '罰則'),
    ('記名押印をきせる', '記名押印させる'),
    ('就作', '就任'),
    ('劣るあものの', '劣るものの'),
    ('礎式構造', '組積式構造'),
    ('いずれや正解', 'いずれも正解'),
    ('設間文', '設問文'),
    ('間44', '問44'),
]

def run_pdftotext(pdf: Path) -> str:
    return subprocess.check_output(['pdftotext', '-layout', str(pdf), '-'], text=True, errors='replace')

def fix_ocr_kanji(text: str) -> str:
    for old, new in OCR_KANJI_FIXES:
        text = text.replace(old, new)
    text = re.sub(r'宅地[填針閉値寺旬始玉各培鑑才釘道域辻道始壮針]物', '宅地建物', text)
    return text

def clean_text(text: str) -> str:
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    text = fix_ocr_kanji(text)
    text = re.sub(r'\n\s*[-ー―]?[ 　]*\d+[ 　]*[-ー―]?\s*\n', '\n', text)
    text = re.sub(r'AB\.indd.*\n', '', text)
    text = re.sub(r'Syntax Warning:.*\n', '', text)
    text = re.sub(r'[ 　]{2,}', ' ', text)
    text = re.sub(r'[ \t]+\n', '\n', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def format_display_text(text: str) -> str:
    text = clean_text(text)
    text = re.sub(r'【問\s*(\d{1,2})】\s*', r'【問 \1】 ', text)
    text = re.sub(r'\n+', '\n', text)
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    chunks = []
    current = ''

    for line in lines:
        is_question = line.startswith('【問')
        is_choice = re.match(r'^[1-4]\s+', line) is not None
        is_marker = line.startswith('（') or line.startswith('(')

        if is_question or is_choice or is_marker:
            if current:
                chunks.append(current.strip())
            current = line
        else:
            current = f'{current}{line}' if current else line

    if current:
        chunks.append(current.strip())

    return '\n\n'.join(chunks)

def category_for(n: int) -> str:
    for start, end, label in CATEGORY:
        if start <= n <= end:
            return label
    return 'その他'

def normalize_question_markers(text: str) -> str:
    # Keep clean markers from text PDFs, and repair common OCR variants from official scanned PDFs.
    text = text.replace('【間', '【問').replace('[問', '【問').replace('〔問', '【問')
    # 二重の閉じ括弧を修正
    text = text.replace(']】', '】').replace('）】', '】').replace(')】', '】')
    # 括弧の不一致を修正
    text = re.sub(r'[【\[\(（]?\s*問\s*(\d{1,2})\s*[】\]\)）]', r'【問 \1】', text)
    text = re.sub(r'[【\[\(（]\s*問\s*(\d{1,2})\s*[】\]\)）]?', r'【問 \1】', text)
    # 様々なOCRの問マーク誤認識（[FH 1】, [fl 46】, RL 10】, (i 6】 など）を統一する
    text = re.sub(
        r'[\[\(（【]?\s*(?:FH|RL|FM|FA|Hl|Fl|Fi|fl|ft|A|i|I|[\[\(（]?\s*[A-Z]\s*[\]\)）]?)\s*[ 　]*(?:問|間|fl|Fl|f1|F1|ft|I|i|h|H)?[ 　]*(\d{1,2})\s*[】\]\)）]',
        r'【問 \1】',
        text
    )
    text = re.sub(r'【+問\s*(\d{1,2})】', r'【問 \1】', text)
    return text

def remove_exemption_notice(text: str) -> str:
    # The official PDFs include an instruction that contains question markers
    # such as "【問 46】から【問 50】まで"; it is not a question block.
    return re.sub(
        r'以下の\s*【問\s*46】から\s*【問\s*50】までについては、\s*'
        r'登録講習修了者としての受験申込みを\s*'
        r'受理された方は、免除となりますので、解答しないでください。',
        '',
        text,
    )

def parse_questions(text: str, exam_id: str):
    text = normalize_question_markers(clean_text(text))
    text = remove_exemption_notice(text)
    matches = list(re.finditer(r'【問\s*(\d{1,2})】', text))
    items = []
    seen = set()
    for idx, m in enumerate(matches):
        n = int(m.group(1))
        if n < 1 or n > 50 or n in seen:
            continue
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(text)
        block = clean_text(text[m.start():end])
        # Remove answer table and back matter if it was captured after Q50.
        block = re.split(
            r'◆合格判定基準|◆試験問題の正解番号|受[ 　]*験[ 　]*番[ 　]*号|正解番号表|合否判定基準|ー[ 　]*95[ 　]*一',
            block
        )[0].strip()
        block = re.sub(r'【\s*$', '', block).strip()
        block = format_display_text(block)
        if len(block) < 40:
            continue
        items.append({'number': n, 'text': block})
        seen.add(n)
    return items

def fallback_by_pages(exam_id: str, text: str):
    # OCR marker repair is imperfect. For missing years, still create all answerable cards,
    # attaching the nearest raw OCR excerpt if available and always linking to the official PDF.
    parsed = {q['number']: q['text'] for q in parse_questions(text, exam_id)}
    fallback = []
    for n in range(1, 51):
        body = parsed.get(n)
        if not body:
            body = f'公式PDFの問{n}を確認して解答してください。OCR抽出でこの問題文を安定取得できなかったため、原本PDF確認を前提にしています。'
        else:
            body = format_display_text(body)
        fallback.append({'number': n, 'text': body})
    return fallback

def answer_to_list(value):
    if value == 'ALL':
        return [1,2,3,4]
    if isinstance(value, list):
        return value
    return [value]

all_questions = []
exam_summaries = []
for exam in EXAMS:
    pdf = PDF_DIR / exam['pdf']
    if exam['mode'] == 'ocr':
        text_path = ROOT / 'build' / 'ocr' / f"{pdf.stem}.txt"
        text = text_path.read_text(encoding='utf-8')
        questions = fallback_by_pages(exam['id'], text)
    else:
        text = run_pdftotext(pdf)
        (TEXT_DIR / f"{exam['id']}.txt").write_text(text, encoding='utf-8')
        parsed = parse_questions(text, exam['id'])
        by_num = {q['number']: q for q in parsed}
        questions = []
        for n in range(1, 51):
            if n in by_num:
                questions.append({
                    **by_num[n],
                    'text': format_display_text(by_num[n]['text']),
                })
            else:
                questions.append({'number': n, 'text': f'公式PDFの問{n}を確認して解答してください。'})
    answers = ANSWER_OVERRIDES[exam['id']]
    extracted_count = sum(1 for q in questions if not q['text'].startswith('公式PDFの問'))
    exam_summaries.append({
        'id': exam['id'], 'year': exam['year'], 'label': exam['label'], 'sourceUrl': exam['url'],
        'passScore': exam['passScore'], 'questionCount': 50, 'extractedCount': extracted_count,
    })
    for q in questions:
        n = q['number']
        ans = answer_to_list(answers[n - 1])
        all_questions.append({
            'id': f"{exam['id']}-{n:02d}",
            'examId': exam['id'],
            'year': exam['year'],
            'label': exam['label'],
            'number': n,
            'category': category_for(n),
            'sourceUrl': exam['url'],
            'externalExplanationName': '宅建レトス',
            'externalExplanationUrl': f"{exam['explanationBaseUrl']}{n}/",
            'questionText': q['text'],
            'correctChoices': ans,
            'isAllCorrect': len(ans) == 4,
            'officialExplanation': (
                '公式PDFの正解番号表: 全ての選択肢を正解扱い。'
                if len(ans) == 4 else
                ('公式PDFの正解番号表: 正解 ' + ' / '.join(map(str, ans)))
            ),
        })

OUT.parent.mkdir(parents=True, exist_ok=True)
content = "export type TakkenQuestion = {\n"
content += "  id: string;\n  examId: string;\n  year: string;\n  label: string;\n  number: number;\n  category: string;\n  sourceUrl: string;\n  externalExplanationName: string;\n  externalExplanationUrl: string;\n  questionText: string;\n  correctChoices: number[];\n  isAllCorrect: boolean;\n  officialExplanation: string;\n};\n\n"
content += "export type TakkenExam = {\n  id: string;\n  year: string;\n  label: string;\n  sourceUrl: string;\n  passScore: number;\n  questionCount: number;\n  extractedCount: number;\n};\n\n"
content += "export const takkenExams: TakkenExam[] = " + json.dumps(exam_summaries, ensure_ascii=False, indent=2) + ";\n\n"
content += "export const takkenQuestions: TakkenQuestion[] = " + json.dumps(all_questions, ensure_ascii=False, indent=2) + ";\n"
OUT.write_text(content, encoding='utf-8')
print(json.dumps({'exams': exam_summaries, 'questions': len(all_questions)}, ensure_ascii=False, indent=2))
