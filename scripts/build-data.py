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

def topic_hint(category: str, text: str) -> str:
    if category == '宅建業法':
        takken_rules = [
            ('重要事項', '35条書面では、説明・交付の相手方、説明時期、宅建士の記名、説明事項を確認します。'),
            ('35条', '35条書面では、契約前の重要事項説明と書面交付の要否を分けます。'),
            ('37条', '37条書面では、契約成立後に交付する書面と記載事項を35条書面と混同しないことが重要です。'),
            ('報酬', '報酬計算では、売買・交換・貸借の別、消費税、代理か媒介かを分けて計算します。'),
            ('媒介', '媒介契約では、契約類型、指定流通機構への登録、業務報告、価額意見の根拠を確認します。'),
            ('免許', '免許では、免許権者、欠格事由、免許換え、届出・廃業等の期限を確認します。'),
            ('宅地建物取引士', '宅建士では、登録、変更登録、移転、宅建士証、事務禁止処分を整理します。'),
            ('宅建士', '宅建士では、登録、変更登録、移転、宅建士証、事務禁止処分を整理します。'),
            ('保証協会', '保証協会では、弁済業務保証金分担金、還付、納付期限、営業保証金との違いを確認します。'),
            ('営業保証金', '営業保証金では、供託、届出、還付、追加供託、保証協会との違いを確認します。'),
            ('手付', '8種制限では、手付金等の保全、手付解除、損害賠償予定額の制限を確認します。'),
            ('クーリング', 'クーリングオフでは、場所、告知書面、申込み・契約の別、期間経過を確認します。'),
            ('広告', '広告規制では、誇大広告、広告開始時期、取引態様の明示を確認します。'),
            ('監督', '監督処分では、指示処分、業務停止、免許取消し、処分権者を整理します。'),
            ('住宅瑕疵', '住宅瑕疵担保履行法では、資力確保措置、届出、対象となる新築住宅を確認します。'),
        ]
        for keyword, hint in takken_rules:
            if keyword in text:
                return hint
        return '宅建業法は、誰が誰に対して、いつ、どの書面や説明を行うかを整理するのが重要です。'

    if category == '免除科目':
        exemption_rules = [
            ('住宅金融', '住宅金融支援機構では、直接融資と証券化支援、業務範囲を押さえます。'),
            ('景品表示', '景品表示法では、不当表示の類型と広告表示のルールを確認します。'),
            ('統計', '統計問題は年度データの暗記要素が強いため、最新資料の数値確認が必要です。'),
            ('土地', '土地の問題は、地形・地質・災害リスクに関する基礎知識を確認します。'),
            ('建物', '建物の問題は、構造、材料、劣化、耐震・防火の基本知識を確認します。'),
        ]
        for keyword, hint in exemption_rules:
            if keyword in text:
                return hint
        return '免除科目は暗記比重が高いため、正解肢だけでなく頻出数値・用語も確認します。'

    rules = [
        ('登記', '不動産物権変動は、当事者関係か第三者対抗関係かをまず分け、登記の要否を確認します。'),
        ('解除', '契約解除では、解除前の第三者と解除後の第三者で処理が変わる点が頻出です。'),
        ('取消', '取消しでは、取消前後の第三者、善意・無過失、登記の要否を分けて考えます。'),
        ('強迫', '強迫は詐欺より保護が厚く、取消しと第三者保護の違いが問われやすい論点です。'),
        ('詐欺', '詐欺では、相手方・第三者の善意無過失、取消しの効果を整理します。'),
        ('代理', '代理では、代理権の有無、表見代理、本人の追認、相手方の善意無過失を確認します。'),
        ('相続', '相続では、法定相続分、遺産分割、遺留分、相続放棄の時期を混同しないことが重要です。'),
        ('借地', '借地借家法では、存続期間、更新、対抗要件、正当事由の有無を確認します。'),
        ('借家', '借家では、対抗要件、更新、解約申入れ、定期建物賃貸借の要件を確認します。'),
        ('区分所有', '区分所有法では、集会決議の要件、共用部分、規約、管理者の権限を押さえます。'),
        ('都市計画', '都市計画法では、区域区分、用途地域、開発許可の要否と例外を先に判定します。'),
        ('開発許可', '開発許可は、区域・面積・目的・例外の順に確認すると判断しやすくなります。'),
        ('建築基準', '建築基準法では、用途制限、道路、建ぺい率、容積率、高さ制限を分けて確認します。'),
        ('農地', '農地法では、権利移動か転用か、許可権者、届出で足りる区域かを確認します。'),
        ('国土利用', '国土利用計画法では、事後届出の対象面積、届出期限、当事者を確認します。'),
        ('登録免許', '税の問題では、課税対象、税率・軽減措置、非課税や特例の要件を切り分けます。'),
        ('固定資産', '固定資産税では、納税義務者、課税標準、住宅用地特例、縦覧・審査を確認します。'),
    ]
    for keyword, hint in rules:
        if keyword in text:
            return hint

    fallback = {
        '権利関係': '権利関係は、当事者、第三者、時系列、対抗要件を図にして整理すると正誤判断しやすくなります。',
        '法令上の制限': '法令上の制限は、区域・面積・許可権者・例外の順に確認すると失点を減らせます。',
        '税・価格評定': '税・価格評定は、課税主体、納税義務者、特例要件、評価基準を分けて確認します。',
        '宅建業法': '宅建業法は、誰が誰に対して、いつ、どの書面や説明を行うかを整理するのが重要です。',
        '免除科目': '免除科目は暗記比重が高いため、正解肢だけでなく頻出数値・用語も確認します。',
    }
    return fallback.get(category, '正解肢の根拠となる要件と、誤り肢がずらしている条件を分けて確認します。')

def make_ai_explanation(category: str, number: int, ans: list[int], is_all_correct: bool, text: str) -> str:
    answer_label = '全ての選択肢が正解扱い' if is_all_correct else ' / '.join(map(str, ans))
    hint = topic_hint(category, text)
    if is_all_correct:
        return f'AI補足: この問は公式正解番号表で全員正解扱いです。通常の正誤判断よりも、問題文の論点確認に使ってください。{hint}'
    return f'AI補足: この問の正解は {answer_label} です。{hint} 迷った場合は、正解肢だけでなく、他の肢が「時期」「相手方」「許可・届出」「例外」のどこをずらしているかを確認してください。'

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
            'aiExplanation': make_ai_explanation(category_for(n), n, ans, len(ans) == 4, q['text']),
        })

OUT.parent.mkdir(parents=True, exist_ok=True)
content = "export type TakkenQuestion = {\n"
content += "  id: string;\n  examId: string;\n  year: string;\n  label: string;\n  number: number;\n  category: string;\n  sourceUrl: string;\n  externalExplanationName: string;\n  externalExplanationUrl: string;\n  questionText: string;\n  correctChoices: number[];\n  isAllCorrect: boolean;\n  officialExplanation: string;\n  aiExplanation: string;\n};\n\n"
content += "export type TakkenExam = {\n  id: string;\n  year: string;\n  label: string;\n  sourceUrl: string;\n  passScore: number;\n  questionCount: number;\n  extractedCount: number;\n};\n\n"
content += "export const takkenExams: TakkenExam[] = " + json.dumps(exam_summaries, ensure_ascii=False, indent=2) + ";\n\n"
content += "export const takkenQuestions: TakkenQuestion[] = " + json.dumps(all_questions, ensure_ascii=False, indent=2) + ";\n"
OUT.write_text(content, encoding='utf-8')
print(json.dumps({'exams': exam_summaries, 'questions': len(all_questions)}, ensure_ascii=False, indent=2))
