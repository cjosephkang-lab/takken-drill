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

def run_pdftotext(pdf: Path) -> str:
    return subprocess.check_output(['pdftotext', '-layout', str(pdf), '-'], text=True, errors='replace')

def clean_text(text: str) -> str:
    text = text.replace('\r\n', '\n').replace('\r', '\n')
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
    text = re.sub(r'[\[\(（]?\s*(?:FH|RL|A|i|I)?\s*(?:問|間)[ 　]*(\d{1,2})\s*[】\]]', r'【問 \1】', text)
    text = re.sub(r'【問\s*(\d{1,2})】', r'【問 \1】', text)
    return text

def parse_questions(text: str, exam_id: str):
    text = normalize_question_markers(clean_text(text))
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
        block = re.split(r'◆合格判定基準|◆試験問題の正解番号|受[ 　]*験[ 　]*番[ 　]*号', block)[0].strip()
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
                '公式PDFの正解番号表では、この問題の正解は全ての選択肢として扱われています。'
                if len(ans) == 4 else
                ('公式PDFの正解番号表では、この問題の正解は ' + ' / '.join(map(str, ans)) + ' です。'
                 + ' 詳細な理由づけは公式PDFには掲載されていないため、問題文と正解番号表を根拠として確認してください。')
            ),
            'aiExplanation': '',
        })

OUT.parent.mkdir(parents=True, exist_ok=True)
content = "export type TakkenQuestion = {\n"
content += "  id: string;\n  examId: string;\n  year: string;\n  label: string;\n  number: number;\n  category: string;\n  sourceUrl: string;\n  externalExplanationName: string;\n  externalExplanationUrl: string;\n  questionText: string;\n  correctChoices: number[];\n  isAllCorrect: boolean;\n  officialExplanation: string;\n  aiExplanation: string;\n};\n\n"
content += "export type TakkenExam = {\n  id: string;\n  year: string;\n  label: string;\n  sourceUrl: string;\n  passScore: number;\n  questionCount: number;\n  extractedCount: number;\n};\n\n"
content += "export const takkenExams: TakkenExam[] = " + json.dumps(exam_summaries, ensure_ascii=False, indent=2) + ";\n\n"
content += "export const takkenQuestions: TakkenQuestion[] = " + json.dumps(all_questions, ensure_ascii=False, indent=2) + ";\n"
OUT.write_text(content, encoding='utf-8')
print(json.dumps({'exams': exam_summaries, 'questions': len(all_questions)}, ensure_ascii=False, indent=2))
