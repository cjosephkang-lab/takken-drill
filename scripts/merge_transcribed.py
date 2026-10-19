"""build/transcribe/<試験ID>.json（公式PDFのページ画像から書き写した問題文）を取り込む（2026-10-19、過去問10年分化）。

- 問題文 → src/data/restoredQuestions.json（既存の r4 / r3_12 は触らない。書き込み前に .bak を残す）
- 正解 → 標準出力に ANSWER_OVERRIDES の行を出す（build-data.py へは人が貼る）
- 論点タグ → src/data/topicTags.ts の questionTopics に追記する行を標準出力に出す

使い方: python3 scripts/merge_transcribed.py h29 h30 r1 r2_10 r2_12 r3_10
"""
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RESTORED = ROOT / 'src' / 'data' / 'restoredQuestions.json'
TOPICS_TS = ROOT / 'src' / 'data' / 'topicTags.ts'


def main(exam_ids):
    restored = json.loads(RESTORED.read_text(encoding='utf-8'))
    topic_ids = set()
    for line in TOPICS_TS.read_text(encoding='utf-8').splitlines():
        if line.strip().startswith('{ id: "'):
            topic_ids.add(line.split('"')[1])
    shutil.copy(RESTORED, RESTORED.with_suffix('.json.bak'))
    topic_lines, answer_lines = [], []
    for exam_id in exam_ids:
        if exam_id in ('r4', 'r3_12'):
            sys.exit(f'{exam_id} は既存の復元データ。上書きしない。')
        data = json.loads((ROOT / 'build' / 'transcribe' / f'{exam_id}.json').read_text(encoding='utf-8'))
        qs = data['questions']
        missing = [n for n in range(1, 51) if str(n) not in qs]
        if missing:
            sys.exit(f'{exam_id}: 問題が欠けている {missing}')
        if len(data['answers']) != 50:
            sys.exit(f'{exam_id}: 正解が50個でない')
        law = json.loads((ROOT / 'build' / 'transcribe' / f'{exam_id}_lawcheck.json').read_text(encoding='utf-8'))
        judged = set(law['exclude']) | set(law['keep'])
        if judged != {str(n) for n in range(1, 51)}:
            sys.exit(f'{exam_id}: 法改正の判定が50問そろっていない')
        restored[exam_id] = {}
        for n in range(1, 51):
            entry = {
                'text': qs[str(n)]['text'],
                'fullyRestored': qs[str(n)]['fullyRestored'],
                'unreadableCount': qs[str(n)]['unreadableCount'],
            }
            if str(n) in law['exclude']:
                entry['excludedReason'] = law['exclude'][str(n)]
            restored[exam_id][str(n)] = entry
        for n in range(1, 51):
            if str(n) in law['exclude']:
                continue  # 載せない問題には論点タグも付けない
            t = qs[str(n)].get('topic')
            if t not in topic_ids:
                sys.exit(f'{exam_id}-{n:02d}: 論点タグ {t!r} が topics に無い')
            topic_lines.append(f'  "{exam_id}-{n:02d}": "{t}",')
        answer_lines.append(f"    '{exam_id}': {json.dumps(data['answers'])},")
        unreadable = sum(qs[str(n)]['unreadableCount'] for n in range(1, 51))
        print(f'{exam_id}: 50問 / 判読不能 {unreadable} 箇所', file=sys.stderr)
    RESTORED.write_text(json.dumps(restored, ensure_ascii=False, indent=2), encoding='utf-8')  # 既存の書式（末尾改行なし）に合わせる
    print('# ANSWER_OVERRIDES')
    print('\n'.join(answer_lines))
    print('# questionTopics')
    print('\n'.join(topic_lines))


if __name__ == '__main__':
    main(sys.argv[1:])
