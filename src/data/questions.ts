export type TakkenQuestion = {
  id: string;
  examId: string;
  year: string;
  label: string;
  number: number;
  category: string;
  sourceUrl: string;
  externalExplanationName: string;
  externalExplanationUrl: string;
  questionText: string;
  correctChoices: number[];
  isAllCorrect: boolean;
  officialExplanation: string;
};

export type TakkenExam = {
  id: string;
  year: string;
  label: string;
  sourceUrl: string;
  passScore: number;
  questionCount: number;
  extractedCount: number;
};

export const takkenExams: TakkenExam[] = [
  {
    "id": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "passScore": 33,
    "questionCount": 50,
    "extractedCount": 47
  },
  {
    "id": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "passScore": 37,
    "questionCount": 50,
    "extractedCount": 48
  },
  {
    "id": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "passScore": 36,
    "questionCount": 50,
    "extractedCount": 46
  },
  {
    "id": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "passScore": 36,
    "questionCount": 50,
    "extractedCount": 41
  },
  {
    "id": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "passScore": 34,
    "questionCount": 50,
    "extractedCount": 42
  },
  {
    "id": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "passScore": 34,
    "questionCount": 50,
    "extractedCount": 42
  },
  {
    "id": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "passScore": 36,
    "questionCount": 50,
    "extractedCount": 45
  },
  {
    "id": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "passScore": 38,
    "questionCount": 50,
    "extractedCount": 43
  },
  {
    "id": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "passScore": 35,
    "questionCount": 50,
    "extractedCount": 38
  },
  {
    "id": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "passScore": 37,
    "questionCount": 50,
    "extractedCount": 36
  },
  {
    "id": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "passScore": 35,
    "questionCount": 50,
    "extractedCount": 38
  }
];

export const takkenQuestions: TakkenQuestion[] = [
  {
    "id": "r7-01",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-1/",
    "questionText": "【問 1】 所有者ＡがＢに甲土地を売却し、その後にＢがＣに甲土地を売却した場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。なお、この問において、Ｃは背信的悪意者ではないものとする。\n\n1 甲土地の所有権登記がＡの名義のままであったとしても、Ｂは、Ｃに甲土地を売却した後は、Ａに対して自己に甲土地の所有権移転登記をするよう請求することはできない。\n\n2 Ｃは、甲土地の所有権移転登記を備えなければ、Ａに対して自己が所有者であることを主張することができない。\n\n3 ＡＢ間の売買契約が、ＢＣ間の売買契約締結よりも前にＡにより解除されていた場合、又は、 ＢＣ間の売買契約締結後にＡにより解除された場合のいずれの場合であっても、 Ｃは、甲土地の所有権移転登記を備えれば、Ａに対して自己の所有権を主張することができる。\n\n4 ＡＢ間の売買契約が、ＢＣ間の売買契約よりも前にＢの強迫を理由として取り消されていた場合、又は、ＢＣ間の売買契約締結後にＢの強迫を理由として取り消された場合のいずれの場合であっても、Ｃは、Ｂの強迫につき善意でかつ過失がなければ、Ａに対して自己の所有権を主張することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-02",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-2/",
    "questionText": "【問 2】 個人であるＡが、①賃貸人Ｂと賃借人Ｃとの間の期間を 2 年とする居住用甲建物の賃貸借契約に基づくＣの一切の債務の連帯保証契約をＢと締結した場合、②売主Ｄと買主Ｅとの間の居住用乙建物の売買契約に基づく代金支払債務の保証契約をＤと締結した場合、に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 ①の連帯保証契約は書面によってしなければ無効であるのに対し、②の保証契約は書面によらず、口頭で契約を締結しても有効である。\n\n2 ①のＢがＡに対して連帯保証債務の履行を請求してきた場合には、ＡはまずＣに請求するように主張できるのに対し、 ②のＤがＡに対して保証債務の履行を請求してきた場合には、ＡはまずＥに請求するように主張することはできない。\n\n3 ①の連帯保証契約は保証の限度額である極度額を定めなければ無効であるのに対し、②の保証契約は極度額を定める必要はない。\n\n4 ①も②もＡが主たる債務者Ｃ及びＥの委託を受けて保証した場合において、Ａが債権者Ｂ及びＤに対して主たる債務の履行状況に関する情報を提供するよう請求したときは、①のＢは、これらの情報を、遅滞なく、Ａに提供しなければならないのに対し、②のＤは、守秘義務を理由にこれらの情報の提供を拒否することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-03",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-3/",
    "questionText": "【問 3】 意思表示に関する次の記述のうち、民法の規定によれば、誤っているものはいくつあるか。ア 表意者が真意でないことを知ってした意思表示は無効であるが、相手方がその意思表示が表意者の真意ではないことを知らなければ、知らないことにつき過失があっても、当該意思表示は有効となる。イ 相手方と通じてした虚偽の意思表示は無効であり、第三者がその虚偽表示につき善意であっても、過失があれば、当該第三者にその無効を対抗することができる。ウ 意思表示は、当該意思表示に対応する意思を欠く錯誤に基づくものであって、その錯誤が法律行為の目的及び取引上の社会通念に照らして重要なものであるときは、 無効であるが、その錯誤につき善意でかつ過失がない第三者には、その無効を対抗することができない。エ 詐欺による意思表示は取り消すことができるが、その詐欺につき善意でかつ過失がない取消し前の第三者には、その取消しを対抗することができない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-04",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-4/",
    "questionText": "【問 4】 ＡがＢから弁済の期限の定めなく金 1,000 万円を借り入れる金銭消費貸借契約（以下この問において「本件契約」という。）における次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 Ａは、本件契約におけるＡの債務を担保するために、Ａが所有する不動産に対し、Ｂのために、抵当権を設定することはできるが、質権を設定することはできない。\n\n2 Ａが本件契約に基づく債務の弁済を怠ったときに、ＢがＡから預かっている動産を占有している場合には、Ｂは当該動産の返還時期が到来しても弁済を受けるまでその動産に関して留置権を行使することができる。\n\n3 Ａが本件契約に基づく債務の弁済を怠った場合には、ＢはＡの総財産に対して先取特権を行使することができる。\n\n4 Ａが、期限が到来しているＢの悪意による不法行為に基づく金 1,000 万円の損害賠償請求債権をＢに対して有している場合、Ａは本件契約に基づく返還債務をＢに対する当該損害賠償請求債権で相殺することができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-05",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 5,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-5/",
    "questionText": "【問 5】 Ａの子がＢであり、 Ｂの子がＣであり、 ＣがＡの直系卑属である場合において、民法の規定によれば、次のアからエまでの記述のうち、Ａが死亡した際にＣがＢを代襲してＡの相続人となるときを全て掲げたものはどれか。ア Ａが死亡する以前にＢが死亡したときイ Ｂが相続に関するＡの遺言書を偽造して相続権を失ったときウ ＢがＡによって相続人から廃除されて相続権を失ったときエ Ｂが相続放棄をしたとき\n\n1 ア、エ\n\n2 イ、ウ\n\n3 ア、ウ、エ\n\n4 ア、イ、ウ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-06",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-6/",
    "questionText": "【問 6】 Ａが所有している甲土地についての物権変動に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 Ｂが甲土地をＡに無断でＣに売却し、 その後、 ＢがＡから甲土地を購入した場合、 Ｃは、Ｂから甲土地を購入した時点に遡って甲土地の所有権を取得する。\n\n2 Ｄが甲土地につき、Ａに無断でＤへの虚偽の所有権の移転の登記をした上で、甲土地をＥに売却してその旨の登記をした場合において、 その後、 ＡがＦに甲土地を売却したときは、Ｆは、Ｅに対し、甲土地の所有権を主張することができる。\n\n3 Ｇが甲土地の所有権を時効取得した場合、Ｇはその後にＡを単独相続したＨに対して、登記を備えていなくても、甲土地の所有権を主張することができる。\n\n4 Ａが甲土地上の立木の所有権を留保して甲土地をＪに売却し、その後、ＪがＫに甲土地及びその上の立木を売却した場合には、Ａは、Ｋに対し、立木の所有権の留保につき登記又は明認方法を備えない限り、立木の所有権を主張することができない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-07",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 7,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-7/",
    "questionText": "【問 7】 Ａは自己の所有する甲建物を事務所としてＢに賃貸し（以下この問において「本件契約」という。）、その後、本件契約の期間中に甲建物の屋根に雨漏りが生じたため、ＣがＢから甲建物の屋根の修理を請け負い、Ｃによる修理が完了した。この場合における次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 ＢがＣに修理代金を支払わないまま無資力となり、賃料を滞納して本件契約が解除されたことにより甲建物はＡに明け渡された。この場合、ＣはＡに対して、事務管理に基づいて修理費用相当額の支払を求めることはできない。\n\n2 ＢがＣに修理代金を支払ったとしても、本件契約において、Ａの負担に属するとされる甲建物の屋根の修理費用について直ちに償還請求することができる旨の特約がない限り、契約終了時でなければ、ＢはＡに対して償還を求めることはできない。\n\n3 ＢがＣに修理代金を支払わない場合、Ｃは、Ｂが占有する甲建物につき、当然に不動産工事の先取特権を行使することができる。\n\n4 ＢがＣに修理代金を支払わないまま無資力となり、賃料を滞納して本件契約が解除されたことにより甲建物はＡに明け渡された。本件契約において、ＢがＡに権利金を支払わないことの代償として、甲建物の修理費用をＢの負担とする旨の特約が存し、当該屋根の修理費用と権利金が相応していたときであっても、ＣはＡに対して、不当利得に基づいて修理費用相当額の支払を求めることができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-08",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 8,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-8/",
    "questionText": "【問 8】 Ａ、Ｂ及びＣがそれぞれ 3 分の 1 の持分の割合で甲土地を共有している場合に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。なお、甲土地を分割しない旨の契約は存在しないものとする。\n\n1 甲土地につき無権利のＤが、自己への虚偽の所有権移転登記をした場合には、Ａは、単独で、Ｄに対し、その所有権移転登記の抹消を求めることができる。\n\n2 Ａが甲土地についての自己の持分を放棄した場合には、その持分は国庫に帰属する。\n\n3 Ａが死亡し、Ｅ及びＦが相続した場合には、Ｂ及びＣは、Ａの遺産についての遺産分割がされる前であっても、Ｅ及びＦに対して共有物分割の訴えを提起することができる。\n\n4 ＡがＢ及びＣに無断で甲土地を占有している場合であっても、Ｂは、Ａに対し、当然には自己に甲土地を明け渡すように求めることができない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-09",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-9/",
    "questionText": "【問 9】 連帯債務者の一人について生じた次の事由のうち、民法の規定によれば、他の連帯債務者に対して効力が生じないものとして正しいものはどれか。なお、この問において、連帯債務者の一人について生じた事由が他の連帯債務者に対して効力が生じる旨の別段の意思表示はないものとする。\n\n1 債権者がした連帯債務者の一人に対する履行の請求\n\n2 連帯債務者の一人と債権者との間の混同\n\n3 連帯債務者の一人が債権者に対して債権を有する場合において、その連帯債務者がした相殺の援用\n\n4 連帯債務者の一人と債権者との間の更改",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-10",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-10/",
    "questionText": "【問 10】 Ａを売主、Ｂを買主とする甲土地の売買契約による甲土地の引渡し後に、目的物の品質に関して契約の内容に適合しない土壌汚染が見つかった場合の売主の担保の責任（以下この問において「契約不適合責任」という。）に基づく損害賠償に関する次の記述のうち、民法の規定、宅地建物取引業法の規定及び判例によれば、誤っているものはどれか。\n\n1 Ｂは、甲土地の引渡しの日から 11 年が経過した時点で甲土地の土壌汚染を発見し、発見した時点から 1 年以内にＡに通知した。Ａが当該土壌汚染があることを重大な過失なく知らなかった場合、Ａが宅地建物取引業者であるか否かにかかわらず、Ｂは損害賠償を請求することはできない。\n\n2 甲土地の引渡しの日から 3 年以内に契約不適合の通知をしなければ売主は契約不適合責任を負わない旨の特約があり、Ｂが引渡しの日から 4 年が経過した時点で土壌汚染を発見して直ちにＡに通知した。Ａが当該土壌汚染があることを重大な過失なく知らなかった場合、Ａが宅地建物取引業者であるか否かにかかわらず、Ｂは損害賠償を請求することはできない。\n\n3 甲土地の引渡しの日から 1 年以内に契約不適合の通知をしなければ売主は契約不適合責任を負わない旨の特約があり、Ａは甲土地に土壌汚染があることを売買契約締結時点で知っていて告げていなかった。Ｂが引渡しの日から 3 年が経過した時点で当該土壌汚染を発見して直ちにＡに通知した場合、Ａが宅地建物取引業者であるか否かによって、Ｂが損害賠償を請求できるか否かの結論が異なる。\n\n4 売主は契約不適合責任を一切負わない旨の特約があり、Ｂは引渡しの日から 1 年が経過した時点で土壌汚染を発見して直ちにＡに通知した。Ａが当該土壌汚染があることを重大な過失なく知らなかった場合、Ａが宅地建物取引業者であるか否かによって、Ｂが損害賠償を請求できるか否かの結論が異なる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-11",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-11/",
    "questionText": "【問 11】 ＡがＢとの間で、Ａ所有の甲土地につき建物の所有を目的として一時使用目的ではない賃貸借契約（以下この問において「本件契約」という。）を締結する場合に関する次の記述のうち、借地借家法の規定及び判例によれば、正しいものはどれか。\n\n1 甲土地にＢが賃借権の登記をしなくても、Ｂの配偶者であるＣを所有者として登記されている建物が甲土地上に存在する場合には、甲土地がＡからＤに売却されても、ＢはＤに対して甲土地に賃借権を有していることを主張できる。\n\n2 本件契約の存続期間が 50 年であり、契約の更新及び建物の築造による存続期間の延長がない旨を定める場合、一定期間地代を減額せず、その期間は地代の減額請求ができない旨の特約を有効に定めることができる。\n\n3 本件契約が専らＢの事業の用に供する建物の所有を目的とし、存続期間が 50 年である場合、契約の更新及び建物の築造による存続期間の延長がない旨、並びにＢが借地借家法第13 条の規定による建物の買取りの請求をしない旨の特約を書面で有効に定めることができる。\n\n4 本件契約が公正証書によって行われていれば、専らＢの居住の用に供する建物の所有を目的とし、存続期間を 20 年と定めていても、Ａは正当事由があれば、20 年が経過した時点で遅滞なく異議を述べて更新を拒絶することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-12",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-12/",
    "questionText": "【問 12】 Ａを賃貸人、Ｂを賃借人とする甲建物の賃貸借契約（定期建物賃貸借契約及び一時使用目的の建物の賃貸借契約を除く。以下この問において「本件契約」という。）に関する次の記述のうち、民法及び借地借家法の規定によれば、正しいものはどれか。\n\n1 本件契約が期間の定めがないものである場合において、Ａ又はＢから相手方に対して解約の申入れをしたときは、当該申入れの日から 6 か月を経過することによって、本件契約は終了する。\n\n2 本件契約が期間を 2 年とするものである場合において、Ａ及びＢのいずれも期間の満了の1 年前から 6 か月前までの間に相手方に対して更新をしない旨の通知をしなかったときは、本件契約は、期間を 2 年として、従前の契約と同一の条件で更新されたものとみなされる。\n\n3 ＡＢ間において、造作買取請求権は行使しない旨の特約があった場合、この特約は有効である。\n\n4 本件契約が借地借家法第 39 条に規定する取壊し予定の建物の賃貸借であり、甲建物を取り壊すこととなる時に本件契約が終了する旨の特約を定める場合、本件契約は、公正証書によってしなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-13",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 13,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-13/",
    "questionText": "【問 13】 建物の区分所有等に関する法律に関する次の記述のうち、誤っているものはどれか。\n\n1 共用部分は、原則として区分所有者全員の共有に属するが、規約で別段の定めをすることを妨げず、管理者であっても、規約に特別の定めがあるときは、共用部分を所有することができる。\n\n2 共用部分の持分の割合について、各共有者の共用部分の持分は、規約で別段の定めをしない限り、その有する専有部分の床面積の割合による。\n\n3 集会の議事については、議長は、書面又は電磁的記録により、議事録を作成しなければならず、当該議事録には議事の経過の要領及びその結果を記載し、又は記録しなければならないとされているが、当該議事録が書面で作成されているときは、議長及び集会に出席した区分所有者全員がこれに署名しなければならない。\n\n4 区分所有者が、建物の保存に有害な行為その他建物の管理又は使用に関し区分所有者の共同の利益に反する行為をした場合又はその行為をするおそれがある場合には、他の区分所有者の全員又は管理組合法人は、区分所有者の共同の利益のため、その行為を停止し、その行為の結果を除去し、又はその行為を予防するため必要な措置を執ることを請求することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-14",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 14,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-14/",
    "questionText": "【問 14】 不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、誤っているものはどれか。\n\n1 登記官は、一筆の土地の一部が別の地目となったときであっても、職権でその土地の分筆の登記をすることができない。\n\n2 登記事項証明書の交付の請求は、請求情報を電子情報処理組織を使用して登記所に提供する方法によりすることができる。\n\n3 権利に関する登記の申請は、法令に別段の定めがある場合を除き、登記権利者及び登記義務者が共同してしなければならない。\n\n4 建物の合併の登記は、表題部所有者又は所有権の登記名義人以外の者は、申請することができない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-15",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-15/",
    "questionText": "【問 15】 都市計画法に関する次の記述のうち、誤っているものはどれか。\n\n1 風致地区は、都市の風致を維持するため定める地区であり、当該地区内における建築物の建築について、政令の定める基準に従い、地方公共団体の条例で、都市の風致を維持するため必要な規制をすることができる。\n\n2 特定街区は、 市街地の整備改善を図るため街区の整備又は造成が行われる地区について、その街区内における建築物の容積率並びに建築物の高さの最高限度及び壁面の位置の制限を定める街区である。\n\n3 近隣商業地域は、近隣の住宅地の住民に対する日用品の供給を行うことを主たる内容とする商業その他の業務の利便を増進するため定める地域である。\n\n4 生産緑地地区は、農業の利便の増進を図りつつ、これと調和した低層住宅に係る良好な住居の環境を保護するため定める地区である。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-16",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、正しいものはどれか。ただし、この問において条例による特別の定めはないものとし、「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 市街化調整区域のうち開発許可を受けた開発区域以外の区域において行う、学校教育法に規定する学校の新築については、都道府県知事の許可が不要である。\n\n2 開発行為とは、主として建築物の建築又は特定工作物の建設の用に供する目的で行う土地の区画形質の変更をいい、ゴルフコースの建設は開発行為にはあたらない。\n\n3 区域区分が定められていない都市計画区域において、商業施設の建築の用に供する目的で行う 4,000 m2 の開発行為は都道府県知事の許可が不要である。\n\n4 自己の居住の用に供する住宅の建築を目的として行う開発行為以外の開発行為にあっては、原則として開発区域内に建築基準法に規定する災害危険区域内の土地を含んではならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-17",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-17/",
    "questionText": "【問 17】 建築基準法に関する次の記述のうち、誤っているものはどれか。\n\n1 建築主は、建築確認が必要な建築物を建築しようとする場合は、当該建築物の計画を建築基準法令の規定に適合させるだけでなく、建築基準法令の規定以外の宅地造成及び特定盛土等規制法などの建築基準関係規定にも適合するものであることについて確認を受ける必要がある。\n\n2 建築主は、 2 階建ての木造住宅を新築しようとする場合は、当該工事に着手する前に、その計画が建築基準関係規定に適合するものであることについて、確認を受け、確認済証の交付を受ける措置が必要となるが、当該住宅の大規模の修繕をしようとする場合には、当該措置は不要である。\n\n3 延べ面積が 1,000 m2 を超える木造建築物は、その外壁及び軒裏で延焼のおそれのある部分を防火構造としなければならない。\n\n4 高さ 1 m 以下の階段の部分には、手すりを設けなくてもよい。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-18",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-18/",
    "questionText": "【問 18】 次の記述のうち、建築基準法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 都市再生特別地区内においては、建築物の容積率、建蔽率及び建築面積は当該地区に関する都市計画において定められた内容に適合するものでなければならないが、その高さは法第56 条の高さの制限に関する規定に適合させる必要がある。\n\n2 2 階建てかつ床面積 1,000 m2 の飲食店は、第一種低層住居専用地域、第二種低層住居専用地域、第一種中高層住居専用地域、工業専用地域及び田園住居地域に建築することができない。\n\n3 特定行政庁による認可を受けて公告された建築協定は、その後、当該協定の土地の所有者等の全員で合意したときに限り、その公告のあった日以後において当該建築協定区域内の土地の所有者等となった者に対しても効力が及ぶこととなる。\n\n4 建築物のエネルギー消費性能の向上のため必要な外壁等に関する工事を行う場合、公益性が高いことから特定行政庁の許可を受けることなく、法第 52 条の規定による容積率の限度を超えることができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-19",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 19,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-19/",
    "questionText": "【問 19】 宅地造成及び特定盛土等規制法に関する次の記述のうち、誤っているものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市及び中核市にあってはその長をいうものとし、地方自治法に基づく施行時特例市に係る経過措置については考慮しないものとする。\n\n1 工事主は、特定盛土等規制区域内において行われる特定盛土等又は土石の堆積に関する政令で定める規模の工事の許可の申請をするときは、あらかじめ、主務省令で定めるところにより、 特定盛土等又は土石の堆積に関する工事の施行に係る土地の周辺地域の住民に対し、説明会の開催その他の当該特定盛土等又は土石の堆積に関する工事の内容を周知させるため必要な措置を講じなければならない。\n\n2 宅地造成等工事規制区域内の土地の工事主又は工事施行者は、宅地造成等に伴う災害が生じないよう、その土地を常時安全な状態に維持するように努めなければならない。\n\n3 都道府県知事は、宅地造成等工事規制区域内の土地について、宅地造成等に伴う災害の防止のために必要があると認める場合においては、その土地の所有者、管理者、占有者、工事主又は工事施行者に対して、擁壁等の設置等の必要な措置をとることを勧告することができる。\n\n4 宅地造成等工事規制区域内において行われる宅地造成等に関する工事の許可を受けた工事主は、当該許可に係る土地の見やすい場所に、主務省令で定めるところにより、氏名又は名称その他の主務省令で定める事項を記載した標識を掲げなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-20",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 20,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-20/",
    "questionText": "【問 20】 土地区画整理法に関する次の記述のうち、誤っているものはどれか。\n\n1 個人施行者は、その者以外に換地計画に係る区域内の宅地を所有する者（当該宅地の所有権について施行者に対抗することができない者を除く。）がある場合においては、換地計画について認可を申請しようとするときは、これらの者の同意を得なければならない。\n\n2 国又は地方公共団体の所有する土地以外であって道路の用に供している土地については、土地区画整理事業の施行により当該道路に代わるべき道路が設置され、その結果、当該道路が廃止される場合等においては、換地計画において、当該土地について換地を定めないことができる。\n\n3 従前の宅地の所有者及びその宅地について使用収益権を有する者が、仮換地について使用又は収益を開始することができる日を別に定められたため、従前の宅地について使用し、又は収益することができなくなったことにより損失を受けた場合においては、施行者は、その損失を受けた者に対して、通常生ずべき損失を補償しなければならない。\n\n4 仮換地の指定があった日後、土地区画整理事業の施行による施行地区内の土地及び建物の変動に係る登記がされるまでの間は、登記の申請人が確定日付のある書類によりその指定前に登記原因が生じたことを証明した場合を除き、施行地区内の土地及び建物に関しては他の登記をすることができない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-21",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-21/",
    "questionText": "【問 21】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、誤っているものはどれか。\n\n1 市街化区域外にある農地の転用の申請に係る事業が住宅の用に供される土地の造成だけを目的としている場合、申請に係る農地の全てを住宅の用に供することが確実と認められないときには、法第 4 条第 1 項又は法第 5 条第 1 項の許可を受けることができない。\n\n2 仮設工作物を設置するため、市街化区域外にある農地の所有権を取得しようとする場合には、法第 5 条第 1 項の許可を受けることができない。\n\n3 農地の賃貸借は、その登記がなくても、農地の引渡しがあったときは、これをもってその後その農地について所有権を取得した第三者に対抗することができる。\n\n4 法人の代表者が、その法人の業務に関し、法第 4 条第 1 項又は法第 5 条第 1 項の規定に違反して農地の転用をした場合には、その代表者が罰せられるほか、その法人も 300 万円以下の罰金刑が科せられる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-22",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-22/",
    "questionText": "【問 22】 国土利用計画法第 23 条の届出（以下この問において「事後届出」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 市街化区域内においてＡが所有する面積 3,500 m2 の土地について、Ｂが 2,000 m2、Ｃが1,500 m2 とそれぞれ分割して購入した場合、Ｂ及びＣはともに事後届出を行わなければならない。\n\n2 都市計画区域外においてＤが所有する面積 12,000 m2 の土地について、Ｅが担保権の実行による競売を通じて所有権を取得した場合、Ｅは事後届出を行わなければならない。\n\n3 Ｆが、自ら所有する市街化調整区域内の 7,000 m2 の土地について、宅地建物取引業者Ｇと売買契約を締結した場合には、Ｇは契約を締結した日から 1 か月以内に事後届出を行う必要がある。\n\n4 市街化区域内に所在する一団の土地である甲土地（面積 1,200 m2）と乙土地（面積 1,300 m2）について、甲土地については売買によって所有権を取得し、乙土地については対価の授受を伴わず賃借権の設定を受けたＨは、事後届出を行う必要はない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-23",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-23/",
    "questionText": "【問 23】 土地の売買による所有権の移転登記等に係る登録免許税の税率の軽減措置に関する次の記述のうち、正しいものはどれか。\n\n1 この税率の軽減措置は、地目が雑種地となっている土地の売買による所有権の移転登記についても適用される。\n\n2 この税率の軽減措置の適用対象となる土地は、その価額が 1,000 万円未満のものに限られる。\n\n3 この税率の軽減措置は、法人が土地の売買による所有権の移転登記を受ける場合には適用されない。\n\n4 この税率の軽減措置の適用対象となる土地は、その面積が 1,000 m2 未満のものに限られる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-25",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-25/",
    "questionText": "【問 25】 不動産の鑑定評価に関する次の記述のうち、不動産鑑定評価基準によれば、誤っているものはどれか。\n\n1 価格形成要因のうち個別的要因とは、一般経済社会における不動産のあり方及びその価格の水準に影響を与える要因をいい、自然的要因、社会的要因、経済的要因及び行政的要因に大別される。\n\n2 収益還元法は、賃貸用不動産又は賃貸以外の事業の用に供する不動産の価格を求める場合に特に有効な手段であり、自用の不動産であっても賃貸を想定することにより適用される。\n\n3 原価法における減価修正の方法としては、耐用年数に基づく方法と、観察減価法の 2 つの方法があり、これらは併用するものとする。\n\n4 対象建築物に関する工事が完了していない場合でも、当該工事の完了を前提として鑑定評価を行うことがある。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-26",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 26,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-26/",
    "questionText": "【問 26】 宅地建物取引業者Ａ（消費税課税事業者）及び宅地建物取引業者Ｂ（消費税課税事業者） が受領した報酬に関するアからウの記述のうち、 宅地建物取引業法の規定によれば、 誤っているものを全て掲げたものは 1 から 4 のうちどれか。 なお、 代理、 媒介に当たり、広告の依頼は行われていないものとする。ア Ａが単独で貸主と借主の双方から店舗用建物の貸借の媒介の依頼を受け、 1 か月の借賃24 万円（消費税等相当額を含まない。）、権利金 1,400 万円（権利設定の対価として支払われるもので、返還されないものをいい、消費税等相当額を含まない。）の賃貸借契約を成立させ、依頼者の双方からそれぞれ 52 万 8,000 円を報酬として受領したことは、宅地建物取引業法に違反する。イ 現に長期間にわたって居住の用、事業の用その他の用途に供されておらず、かつ将来にわたり居住の用、 事業の用その他の用途に供される見込みがない宅地（ 1 か月の借賃 5 万円。消費税等相当額を含まない。）について、Ａは貸主から代理を依頼され、Ｂは借主から代理を依頼され、賃貸借契約が成立したので、Ａは貸主から 4 万円を、Ｂは、代理の依頼を受けるに当たって、報酬が借賃の 1.1 か月分を超えることについて借主から承諾を得たうえで、借主から 7 万円を報酬として受領したことは、宅地建物取引業法に違反しない。ウ Ａは売主から媒介の依頼を、Ｂは買主から媒介の依頼を、それぞれ受けて、代金 200 万円（消費税等相当額を含み、土地代金は 90 万円である。）の土地付建物の売買契約を成立させた場合に、依頼者と宅地建物取引業者との間であらかじめ報酬の額を定めていなかったときは、売主はＡに対して少なくとも 10 万 4,500 円、買主はＢに対して少なくとも 10 万 4,500円を支払わなければならない。\n\n1 ア、イ\n\n2 イ、ウ\n\n3 ア、ウ\n\n4 ア、イ、ウ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-27",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 27,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-27/",
    "questionText": "【問 27】 宅地建物取引業者が行う宅地建物取引業法第 35 条に規定する重要事項の説明及び重要事項説明書の交付に関する次の記述のうち、正しいものはどれか。ただし、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 宅地建物取引業者は、区分所有建物の売買の媒介を行う場合に、当該一棟の建物及びその敷地の管理が法人に委託されているときは、その委託を受けている法人の商号又は名称及び主たる事務所の所在地を説明しなければならない。\n\n2 宅地建物取引業者は、自身が売主となる場合に、重要事項説明書の交付に当たり、専任の宅地建物取引士をして当該書面に記名させなければならず、また、買主にも当該書面に記名させなければならない。\n\n3 宅地建物取引業者は、重要事項を説明する際には、宅地建物取引業者の事務所において行わなければならない。\n\n4 宅地建物取引業者は、自身が売主となる場合であっても、買主に対して、天災その他不可抗力による損害の負担に関する定めがあるときは、その内容を説明しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-28",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-28/",
    "questionText": "【問 28】 宅地建物取引業者の業務に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはいくつあるか。ア 自ら売主として販売する宅地又は建物の広告に取引態様の別を明示しなかった場合は、罰則の対象とはならないが監督処分の対象となり、宅地又は建物の規模について著しく事実に相違する表示をした場合は、罰則の対象にも監督処分の対象にもなる。イ 自ら売主として土地付建物の売買契約を締結しようとする場合、当該土地上に建てようとする建物が建築確認申請前であっても、 広告することはできるが、 建築確認を受けるまで、契約を締結することはできない。ウ 宅地建物取引業者は、自ら売主として、宅地建物取引業者である買主との間で、自ら所有しない造成前の宅地の売買契約を締結するためには、法第 41 条の規定による手付金等の保全措置を講じ、かつ、売主である宅地建物取引業者が当該宅地を取得する契約を締結しなければならない。エ 宅地建物取引業者は、宅地の売買の専属専任媒介契約を締結した場合、当該媒介契約締結の日から 5 日以内（休業日を除く。）に、当該宅地について指定流通機構に所定の事項を登録しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-29",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 29,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-29/",
    "questionText": "【問 29】 宅地建物取引業者Ａが宅地建物取引業法第 37 条の規定により交付すべき書面（以下この問において「37 条書面」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 Ａが媒介により事業用宅地の賃貸借契約を成立させた場合、37 条書面を交付しなければならないが、契約の当事者Ｂが宅地建物取引業者であるときは、交付する必要はない。\n\n2 Ａが自ら売主としてＣと既存の建物の売買契約を締結した場合、建物の構造耐力上主要な部分等の状況について当事者の双方が確認した事項を 37 条書面に記載しなければならない。\n\n3 ＡがＤを売主としＥを買主とする宅地の売買契約を媒介した場合、天災その他不可抗力による損害の負担に関する定めがないときは、定めがない旨を 37 条書面に記載しなければならない。\n\n4 Ａが自ら売主としてＦと建物の売買契約を締結した場合、代金についての金銭の貸借のあっせんに関する定めがある場合における当該あっせんに係る金銭の貸借が成立しないときの措置については、37 条書面に記載する必要はない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-30",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-30/",
    "questionText": "【問 30】 いずれも宅地建物取引業者であるＡ社、Ｂ社及びＣ社（以下この問において「売主ら」という。）が、分譲マンションを共同で建築、販売することとなり、建築確認を受けた後、工事完了前にその一室を 5,000 万円で宅地建物取引業者ではない個人である買主に売却しようとする場合に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）に違反するものはいくつあるか。ア 売主らは、共同する全社が各個に重要事項説明を実施すると、かえって買主を混乱させると考え、買主の了解を得た上で、Ａ社 1 社を幹事社とし、Ａ社の宅地建物取引士が単独で重要事項説明書に記名のうえ、買主に交付し説明を行った。イ 売主らは、Ａ社の事務所において買主から買受けの申込みを受け、売買契約を締結したが、売主らは当該売買契約には法第 37 条の 2 の規定に基づくいわゆるクーリング・オフの適用はないと判断し、クーリング・オフについて買主に告げる書面の交付は行わなかった。ウ 売主らは、当該物件については、重要事項説明の時点では共用部分に関する規約が案であるので、買主の了解を得た上で、契約締結後に決定した規約を交付することとし、重要事項説明書への記載は省略した。エ 売主らは買主から手付金 500 万円を受領することとしたが、手付金の保全措置を講じる必要はないと判断し、手付金保全措置の概要について重要事項説明書への記載は省略した。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-31",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 31,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-31/",
    "questionText": "【問 31】 次の記述のうち、宅地建物取引業法により禁止されている行為が含まれているものはいくつあるか。ア 宅地建物取引士が、マンション販売の勧誘を電話で行うにあたり、まず、契約締結について勧誘する目的である旨を告げたうえで、自分の名前は名乗らず、自身の勤務する宅地建物取引業者の名称及び免許番号を伝えたうえで勧誘を行った。イ 宅地建物取引業者が、賃貸マンションの媒介で入居申込者から申込みを受け付けたところ、当該マンションのオーナーからの審査回答待ちとなった。その後、入居申込者が、申込みを撤回したい旨電話で伝えたところ、当該宅地建物取引業者の従業員から声を荒げ「撤回をするなら、 とりあえず事務所まで来てくれないと困る」 と怒鳴られ、 面会を強要された。申込者はその言動に不安を覚えたため、事務所に赴いて、申込みの撤回を申し出たところ、申込みの撤回が了承された。ウ 宅地建物取引業者が、一時的にアルバイトを雇って、マンション販売の広告チラシの配布を行わせることとしたほか、契約書の作成業務も補助的に行わせるため、従業者証明書をその者に発行し、それらの業務を行わせた。ただし、そのアルバイトはマンション販売の広告チラシの配布の際には、従業者証明書を携帯していなかった。エ マンションの販売の勧誘における説明において、宅地建物取引士は、日当たりのよいマンションの購入希望者に対して、「マンション南側の月極駐車場は出来たばかりであり、将来にわたりそこにマンションなどの高層の建物が建つ予定は全くない」と説明し、購入希望者から購入申込みを受け付けた。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-32",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 32,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-32/",
    "questionText": "【問 32】 宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者ではないＢとの間でマンション（代金 4,000 万円）の売買契約を締結した場合に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定に違反しないものはどれか。\n\n1 Ａは、建築工事完了前のマンションの売買契約を締結する際にＢから手付金 200 万円を受領し、さらに建築工事中に 200 万円を中間金として受領した後、当該手付金と中間金について法第 41 条に定める保全措置を講じた。\n\n2 Ａは、建築工事完了後のマンションの売買契約を締結する際に、法第 41 条の 2 に定める保全措置を講じることなくＢから手付金 400 万円を受領した。\n\n3 Ａは、建築工事完了前のマンションの売買契約を締結する際にＢから手付金 500 万円を受領したが、Ｂに債務不履行がないにもかかわらず当該手付金 500 万円を返還して、契約を一方的に解除した。\n\n4 Ａは、建築工事完了後のマンションの売買契約を締結する際に、当事者の債務の不履行を理由とする契約の解除に伴う損害賠償の予定額を 1,000 万円とする特約を定めた。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-33",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-33/",
    "questionText": "【問 33】 宅地建物取引業者Ａが行う業務に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはいくつあるか。なお、この問において「37 条書面」とは、同法第 37 条の規定により交付すべき書面をいうものとする。ア 建物の賃貸借の媒介をするＡは、当該建物の引渡しの時期について、重要事項説明書に記載して説明する必要はないが、37 条書面には記載しなければならない。イ Ａは、自ら売主として建物を売却する場合、重要事項説明書に記載しなければならない契約の解除に関する事項については、契約に定めがなくても 37 条書面に全て記載しなければならない。ウ Ａは、売主を代理して、抵当権が登記されている建物を売却する場合、買主に交付する37 条書面だけでなく、売主に交付する 37 条書面についても、当該抵当権の内容を記載しなければならない。エ 建物の賃貸借の媒介をするＡは、37 条書面を交付するに当たり、宅地建物取引士をして、その内容を説明させなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-35",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 35,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-35/",
    "questionText": "【問 35】 宅地建物取引業者Ａ（甲県知事免許）の営業保証金に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。なお、Ａは宅地建物取引業保証協会の社員ではないものとする。\n\n1 免許の有効期間満了の際、Ａが営業保証金を取り戻そうとする場合には、供託した営業保証金につき還付を受ける権利を有する者に対し、 6 か月を下らない一定期間内に申し出るべき旨を官報に公告しなければならない。\n\n2 Ａが営業保証金を供託する場合において、金銭と有価証券を併用して供託することができるが、従たる事務所を設置したときの営業保証金については、金銭のみをもって供託しなければならない。\n\n3 Ａは、事業の開始後新たに乙県に従たる事務所を設置したときは、従たる事務所の最寄りの供託所に営業保証金を供託し、その供託物受入の記載のある供託書の写しを添付して、その旨を甲県知事に届け出なければならない。\n\n4 Ａの設置した支店においてＡと宅地建物取引業に関する取引をした者は、その取引により生じた債権に関し、500 万円を限度としてその債権の弁済を受ける権利を有する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-36",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-36/",
    "questionText": "【問 36】 宅地建物取引業者Ａの業務に関する次の記述のうち、宅地建物取引業法の規定によれば、禁止されているものはいくつあるか。ア Ａの従業者は、電話によりＢに投資用マンションの購入の勧誘を行った際、Ｂから「Ａから購入する意思は一切無いので、今後電話を含め勧誘はしないでほしい。」と告げられたが、その翌日、Ｂに対し、再度の勧誘を行った。イ 建物の購入希望者から「契約の締結についてしばらく考えさせてほしい。」という申し出があったので、Ａの従業者は、他に買い手がいないにもかかわらず、「他に買い手がいるので、今日中しか契約の締結はできない。」と当該購入希望者に告げた。ウ Ａの従業者は、建物の購入希望者に対して、長時間にわたり契約の締結をするための勧誘を行い、当該購入希望者を困惑させた。エ 建物の売買を媒介しているＡの従業者は、手持ち資金がない購入希望者に対して「手付金は当社が貸し付けるので後から返してくれれば構わない。」と告げて、契約の締結を誘引したが、契約には至らなかった。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-37",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-37/",
    "questionText": "【問 37】 宅地建物取引業者が行う宅地建物取引業法第 35 条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 建物の貸借の媒介を行う場合、当該建物が都市計画法の準防火地域内にあり、建築基準法第 61 条第 1 項に基づく建物の構造に係る制限があるときは、その概要を説明しなければならない。\n\n2 マンションの分譲を行う場合、建物の区分所有等に関する法律第 2 条第 3 項に規定する専用部分の用途その他の利用の制限に関する規約の定めが案の段階であるときは、説明する必要はない。\n\n3 建物の貸借の媒介を行う場合、借賃以外に授受される金銭の額、授受の目的及び保管方法を説明しなければならない。\n\n4 鉄筋コンクリート造の既存の共同住宅の販売を行う場合、宅地建物取引業法第 34 条の 2第 1 項第 4 号に規定する建物状況調査を 1 年 6 か月前に実施したときは、建物状況調査を実施したこと、その結果の概要について説明しなくてはならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-38",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-38/",
    "questionText": "【問 38】 宅地建物取引業者Ａが行う業務に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはいくつあるか。ア Ａは、宅地又は建物の売買に関する広告をする際に取引態様の別を明示した場合、当該広告を見た者から売買に関する注文を受けたときは、改めて取引態様の別を明示する必要はない。イ Ａは、宅地の売買に関する広告をするに当たり、当該宅地の形質について、実際のものよりも著しく優良であると人を誤認させる表示をした場合、当該宅地に関する注文がなく、売買が成立しなかったときであっても、監督処分及び罰則の対象となる。ウ Ａは、 複数の区画がある宅地の売買について、 数回に分けて広告をする予定でいる場合、最初に行う広告に取引態様の別を明示すれば足り、それ以降は明示する必要はない。エ Ａは、建物の貸借の媒介において、依頼者の依頼によらない広告をした場合、国土交通大臣の定める報酬限度額となる媒介報酬のほか、当該広告の料金に相当する額を受領できる。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-39",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-39/",
    "questionText": "【問 39】 宅地建物取引業者Ａが、ＢからＢ所有の中古住宅の売却について媒介の依頼を受けた場合における次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 ＡがＢとの間で専属専任媒介契約を締結し、Ｂから「売り出し中であることを秘密にしておきたいので指定流通機構への登録はしないでほしい」旨の申出があった場合、Ａは、そのことを理由に登録をしなかったとしても法に違反しない。\n\n2 Ａは、Ｂとの間で有効期間を 1 か月とする専属専任媒介契約を締結する際、「Ｂが媒介契約を更新する旨を申し出ない場合は、有効期間満了により自動更新するものとする」旨の特約は有効である。\n\n3 ＡがＢと一般媒介契約を締結したときは、法第 34 条の 2 第 1 項の規定に基づき交付すべき書面に、宅地建物取引士をして記名させなければならない。\n\n4 ＡがＢとの間で専属専任媒介契約を締結した場合、Ａは、当該中古住宅の取引の申込みの受付に関する状況を指定流通機構に登録しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-40",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 40,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-40/",
    "questionText": "【問 40】 宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者Ｂの媒介により、宅地建物取引業者ではない買主Ｃとの間で宅地の売買契約を締結した場合、宅地建物取引業法第37 条の 2 の規定に基づくいわゆるクーリング・オフに関する次の記述のうち、正しいものはいくつあるか。ア Ｃは、Ｂの事務所で買受けの申込みを行い、その 3 日後に、Ｃの自宅近くの喫茶店で売買契約を締結した場合、クーリング・オフによる契約の解除はできない。イ ＡとＣの間で、クーリング・オフによる契約の解除に関し、Ｃは契約の解除の書面をクーリング・オフの告知の日から起算して 8 日以内にＡに到達させなければ契約を解除することができない旨の特約を定めた場合、当該特約は無効である。ウ Ｃは、Ｂからの提案によりＣの自宅で買受けの申込みを行ったが、クーリング・オフについては告げられず、その 10 日後に、Ａの事務所で売買契約を締結した場合、クーリング・オフによる契約の解除はできない。エ クーリング・オフについてＣに告げる書面には、Ａの商号又は名称及び住所並びに免許証番号を記載しなければならないが、Ｂの商号又は名称及び住所並びに免許証番号の記載は必要ない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-41",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 41,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-41/",
    "questionText": "【問 41】 宅地建物取引業の免許（以下この問において「免許」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者Ａ（甲県知事免許）が免許を受けてから 1 年以内に事業を開始しないときは、甲県知事は免許を取り消さなければならない。\n\n2 宅地建物取引業者Ｂ（甲県知事免許）が株主総会の決議により解散した場合、Ｂを代表する役員であった者は、その旨を当該解散の日から 60 日以内に甲県知事に届け出なければならない。\n\n3 宅地建物取引業者ではないＣが甲県に本店を、乙県に支店をそれぞれ有する場合で、乙県の支店のみで新たに宅地建物取引業を営もうとするときは、Ｃは乙県知事の免許を受けなければならない。\n\n4 宅地建物取引業者Ｄ（甲県知事免許）は、甲県の事務所を廃止し、乙県内で新たに事務所を設置して宅地建物取引業を営もうとする場合、甲県知事へ廃業の届出を行うとともに、乙県知事への免許換えの申請を行わなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-42",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-42/",
    "questionText": "【問 42】 宅地建物取引士に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。なお、この問において、宅地建物取引士は、事務の禁止の処分を受けていないものとする。ア 二つ以上の都道府県において宅地建物取引士資格試験に合格した者は、当該試験を行った都道府県のうち試験日が遅い都道府県知事の登録以外を受けることができない。イ 宅地建物取引士は、その登録している勤務先の名称に変更があった場合、登録を受けている都道府県知事に、変更の登録の申請とあわせて、宅地建物取引士証の書換え交付を申請しなければならない。ウ 宅地建物取引士は、宅地建物取引士証が効力を失ったときは、速やかに、宅地建物取引士証をその交付を受けた都道府県知事に返納しなければならない。エ 宅地建物取引士は、登録を受けている都道府県知事の管轄する都道府県以外の都道府県に所在する宅地建物取引業者の事務所の業務に従事しているときは、登録の移転の申請をすることができる。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-43",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 43,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-43/",
    "questionText": "【問 43】 宅地建物取引業者が行う宅地建物取引業法第 35 条に規定する重要事項の説明に関する次の記述のうち、正しいものはいくつあるか。なお、説明の相手方は宅地建物取引業者ではないものとする。ア 自らを委託者とする宅地又は建物に係る信託の受益権の売主となる場合、相手方に金融商品取引法第 2 条第 10 項に規定する目論見書を交付し、宅地建物取引業法第 35 条第 3 項の規定に基づき説明すべき事項のすべてが当該目論見書に記載されているときは、重要事項説明書の交付及び説明を省略することができる。イ 建物の貸借の媒介を行う場合、当該建物が建築工事の完了前のものであるときは、その完了時における当該建物の主要構造部、内装及び外装の構造又は仕上げ並びに設備の設置及び構造について説明しなければならない。ウ 建物の貸借の媒介を行う場合、 敷金その他いかなる名義をもって授受されるかを問わず、契約終了時において精算することとされている金銭の精算に関する事項を説明しなければならない。エ 宅地の売買の媒介を行う場合、当該宅地が津波防災地域づくりに関する法律第 21 条第 1項により指定された津波防護施設区域内にあるときは、同法第 23 条第 1 項の規定による制限の概要について説明しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-44",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-44/",
    "questionText": "【問 44】 宅地建物取引業者は、犯罪による収益の移転防止に関する法律第 2 条第 2 項の特定事業者に該当するが、宅地建物取引業者Ａの行為に関する次の記述のうち、同法に違反するものはどれか。\n\n1 Ａは、土地付建物の売買を行うに際して、当該売買契約の相手方である買主が自然人であったので、氏名、住居、生年月日、取引を行う目的及び職業について、確認した。\n\n2 Ａは、価額が 5,000 万円の土地付建物の売買を行ったとき、直ちに、一定の方法により、当該売買契約の相手方である買主の確認記録を検索するための事項、当該取引の期日及び内容その他の事項に関する記録を作成して保存していたが、当該取引の行われた日から 5 年経過したので、当年度末に当該記録を廃棄した。\n\n3 Ａは、土地付建物の売買契約の相手方である買主から収受した代金について犯罪により得た収益であるとの疑いがあったので、速やかに、所定の事項を行政庁に届け出た。\n\n4 Ａは、 取引時確認、 取引記録等の保存、 疑わしい取引の届出等の措置を的確に行うため、顧客と実際に接する営業担当者に対する教育訓練を実施した。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-45",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-45/",
    "questionText": "【問 45】 特定住宅瑕疵担保責任の履行の確保等に関する法律に基づく住宅販売瑕疵担保保証金（以下この問において「保証金」という。）の供託又は住宅販売瑕疵担保責任保険契約（以下この問において「保険契約」という。）の締結に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者は、基準日から 3 週間を経過する日までの間において、当該基準日前15 年間に自ら売主となる売買契約に基づき宅地建物取引業者ではない買主に引き渡した新築住宅（保険契約に係る新築住宅を除く。）について、保証金の供託をしていなければならない。\n\n2 宅地建物取引業者は、自ら売主となる売買契約に基づき新築住宅を引き渡す場合だけでなく、新築住宅の売買の媒介をする場合においても、保証金の供託又は保険契約の締結をしなければならない。\n\n3 保険契約を締結している宅地建物取引業者は、新築住宅を引き渡した時から 10 年間、構造耐力上主要な部分の瑕疵によって生じた損害についてのみ当該保険契約に係る保険金を請求することができる。\n\n4 保険契約を締結している宅地建物取引業者及び当該業者が売主となっている新築住宅の買主は、指定住宅紛争処理機関に特別住宅紛争処理の申請をすることにより、当該新築住宅の売買契約に関する宅地建物取引業者と買主との間の紛争について、あっせん、調停又は仲裁を受けることができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r7-46",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 機構は、災害により住宅が滅失した場合におけるその住宅に代わるべき住宅の建設又は購入に係る貸付金について、一定の元金返済の据置期間を設けることができる。\n\n2 機構は、証券化支援事業（買取型）において、債務者又は債務者の親族が居住する住宅のみならず、賃貸住宅の建設又は購入に必要な資金の貸付けに係る金融機関の貸付債権についても譲受けの対象としている。\n\n3 機構は、高齢者が自ら居住する住宅に対して行うバリアフリー工事に係る貸付けについて、貸付金の償還を高齢者の死亡時に一括して行うという制度を設けている。\n\n4 機構は、市街地の土地の合理的な利用に寄与する一定の建築物の建設に必要な資金の貸付けを業務として行っている。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r7-47",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 47,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-47/",
    "questionText": "【問 47】 宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。\n\n1 団地（一団の宅地又は建物をいう。）と駅との間の道路距離は、取引する区画のうち駅から最も近い区画（マンション及びアパートにあっては、駅から最も近い建物の出入口）を起点として算出した数値又は駅から最も遠い区画（マンション及びアパートにあっては、駅から最も遠い建物の出入口）を起点として算出した数値のいずれかを表示しなければならない。\n\n2 新築分譲マンションを販売するに当たり、 住戸により管理費の額が異なる場合であって、その全ての住宅の管理費を表示することが困難であるときは、最高額のみで表示することができる。\n\n3 物件の近くに新設される予定の駅等又はバスの停留所については、当該路線の運行主体が公表していれば、現に利用できるものではなくても新設予定時期を明示して表示することができる。\n\n4 道路距離 80 m につき 1 分間を要するものとして、賃貸物件から最寄りの駅までの徒歩による所要時間を算出したところ 15 分 50 秒であった。この場合、当該所要時間を 15 分と表示してよい。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r7-49",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 川沿いの低地に堆積している川が運んだ土砂は、重い構造物を支持できる。\n\n2 砂州や砂丘には、粒径のそろった砂が堆積しており、地下水位が浅い箇所では、液状化しやすくなる。\n\n3 丘陵地は、山地ほど斜面の勾配がきつくなく、山地に比べ斜面崩壊は生じ難いといえる。\n\n4 台地は低地より古い時代に形成された地盤であり、一般に構造物を支持できる強度を有している。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r7-50",
    "examId": "r7",
    "year": "令和7年度",
    "label": "2025 / 令和7年度",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2025kakomon/r07-50/",
    "questionText": "【問 50】 建物の構造と材料に関する次の記述のうち、最も不適当なものはどれか。\n\n1 鋼材の素材の鋼は、鉄や炭素などの成分を含んでおり、炭素量が多いものほど、軟質で強度が小さい。\n\n2 鋼材は、熱に弱く、さびやすいので、耐火や防錆の処理を施す必要がある。\n\n3 鋼材は、強度が高く、粘りがあり、比較的小さな断面部材で荷重に耐えることができる。\n\n4 鋼材の素材の鋼の密度は、木材やコンクリートに比べて大きい。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-01",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-1/",
    "questionText": "【問 1】 法律行為に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 営業を許された未成年者が、その営業に関する意思表示をした時に意思能力を有しなかった場合は、その法律行為は無効である。\n\n2 公の秩序に反する法律行為であっても、当事者が納得して合意した場合には、その法律行為は有効である。\n\n3 詐欺による意思表示は取り消すことによって初めから無効であったとみなされるのに対し、強迫による意思表示は取り消すまでもなく無効である。\n\n4 他人が所有している土地を目的物にした売買契約は無効であるが、当該他人がその売買契約を追認した場合にはその売買契約は有効となる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-02",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-2/",
    "questionText": "【問 2】 委任契約・準委任契約に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 売主が、売買契約の付随義務として、買主に対して、マンション専有部分内の防火戸の操作方法につき説明義務を負う場合、業務において密接な関係にある売主から委託を受け、売主と一体となって当該マンションの販売に関する一切の事務を行っていた宅地建物取引業者も、買主に対して、防火戸の操作方法について説明する信義則上の義務を負うことがある。\n\n2 受任者は、委任者の許諾を得たとき、又はやむを得ない事由があるときでなければ、復受任者を選任することができない。\n\n3 委任契約で本人が死亡しても代理権が消滅しない旨を合意して代理人に代理権を与えた場合、本人が死亡しても代理権は消滅しない。\n\n4 委任は、当事者の一方が仕事を完成することを相手方に約し、相手方がその仕事の結果に対しその報酬を支払うことを約さなければ、その効力を生じない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-03",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-3/",
    "questionText": "【問 3】 甲土地につき、Ａ、Ｂ、Ｃ、Ｄの 4 人がそれぞれ 4 分の 1 の共有持分を有していて、Ａ、Ｂ、ＣのいずれもＤの所在を知ることができない場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。なお、Ｄの共有持分は、相続財産には属していないものとする。\n\n1 甲土地に、その形状又は効用の著しい変更を伴う変更を加える場合には、共有者の過半数の同意が必要であり、本件ではＡ、Ｂ、Ｃ 3 人の同意が必要となる。\n\n2 甲土地の所有権の登記名義人となっている者が所有者ではないＥである場合、持分に基づいてＥに対して登記の抹消を求めるためには、所在が判明しているＡ、Ｂ、Ｃのうち 2 人の同意が必要である。\n\n3 Ａ、Ｂ、Ｃ 3 人の同意があれば、甲土地を資材置場として賃借したいＦとの間で期間を 3年とする賃貸借契約を締結することができる。\n\n4 Ａが裁判所に請求して、裁判所がＤの持分をＡに取得させる旨の決定をした場合、Ｄは、その決定から 3 年以内に限り、Ａが取得したＤの共有持分の時価相当額をＡに対して支払うよう請求することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-04",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-4/",
    "questionText": "【問 4】 Ａを売主、Ｂを買主として甲土地の売買契約（以下この問において「本件契約」という。）が締結された直後にＡが死亡し、ＣがＡを単独相続した場合における次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 売買代金を受領したＣが甲土地の引渡しを拒絶する意思を明確に表示したとしても、Ｂは、Ｃに対して相当の期間を定めた催告をしなければ、本件契約を解除することができない。\n\n2 Ｂが期日までに売買代金を支払わない場合であっても、本件契約の解除権はＡの一身に専属した権利であるため、Ｃは本件契約を解除することはできない。\n\n3 Ｂは、売買代金が支払い済みだったとしても、甲土地の所有権登記を備えなければ、Ｃに対して甲土地の引渡しを請求することはできない。\n\n4 本件契約が、Ａの詐欺により締結されたものである場合、ＢはＣに対して、本件契約の取消しを主張することができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-05",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 5,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-5/",
    "questionText": "【問 5】 履行遅滞に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 不法行為の加害者は、不法行為に基づく損害賠償債務について、履行の請求を受けた時から遅滞の責任を負う。\n\n2 善意の受益者は、その不当利得返還債務について、履行の請求を受けた時から遅滞の責任を負う。\n\n3 請負人の報酬債権に対して、注文者がこれと同時履行の関係にある目的物の瑕疵修補に代わる損害賠償債権を自働債権とする相殺の意思表示をした場合、注文者は、請負人に対する相殺後の報酬残債務について、当該残債務の履行の請求を受けた時から遅滞の責任を負う。\n\n4 債務の履行について不確定期限があるときは、債務者は、その期限の到来したことを知った後に履行の請求を受けた時から遅滞の責任を負う。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-06",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-6/",
    "questionText": "【問 6】 Ａの所有する甲土地にＢを地上権者とする地上権（以下この問において「本件地上権」という。）が設定され、その旨の登記がされた後に、甲土地にＣを抵当権者とする抵当権が設定され、その旨の登記がされた場合における次の記述のうち、民法の規定によれば、正しいものはいくつあるか。ア ＢがＡとの売買契約に基づき、甲土地の所有権を取得したときは、本件地上権は消滅する。イ Ａが死亡してＢがＡを単独相続し、甲土地の所有権を取得したときは、本件地上権は消滅する。ウ ＢがＡとの代物弁済契約に基づき、甲土地の所有権を取得したときは、本件地上権は消滅する。エ ＢがＡとの贈与契約に基づき、甲土地の所有権を取得したときは、本件地上権は消滅する。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-07",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 7,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-7/",
    "questionText": "【問 7】 Ａを貸主、Ｂを借主として甲建物の賃貸借契約（以下この問において「本件契約」という。）が締結され、Ｂが甲建物の引渡しを受けた場合における次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 ＣがＢに対し甲建物をＡから買受けたとの虚偽の話をしたので、これを信じたＢが甲建物の占有を任意にＣに移転した場合、ＡはＣに対して、占有回収の訴えにより甲建物の返還を請求することはできない。\n\n2 Ｂが、Ａの甲建物への立ち入りを建物入り口を閉ざして拒んだときは、Ａは甲建物の間接占有が侵奪されたものとして、Ｂに対して、占有回収の訴えにより甲建物の返還を請求することができる。\n\n3 Ｂが死亡して、ＤがＢを単独相続した場合、Ｄは相続開始を知るまでは、Ｂによる甲建物の占有を承継しない。\n\n4 ＡとＢのいずれもが死亡した場合、本件契約は当然に終了する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-08",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 8,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-8/",
    "questionText": "【問 8】 次の記述のうち、民法の条文として規定されていないものはどれか。\n\n1 隔地者間の契約は、承諾の通知を発した時に成立する。\n\n2 無効な行為に基づく債務の履行として給付を受けた者は、相手方を原状に復させる義務を負う。\n\n3 代理人が自己又は第三者の利益を図る目的で代理権の範囲内の行為をした場合において、相手方がその目的を知り、又は知ることができたときは、その行為は、代理権を有しない者がした行為とみなす。\n\n4 未成年者が法律行為をするには、その法定代理人の同意を得なければならない。ただし、単に権利を得、又は義務を免れる法律行為については、この限りでない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-09",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-9/",
    "questionText": "【問 9】 承諾に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 第三者が債務者との間で、債務者の債務につき免責的債務引受契約をする場合、債権者の承諾は不要である。\n\n2 第三者が債務者との間で、債務者の債務につき併存的債務引受契約をした場合、債権者が第三者に承諾をした時点で、その効力が生ずる。\n\n3 第三者が債権者との間で、債務者の債務につき併存的債務引受契約をした場合、債務者が第三者に承諾をした時点で、その効力が生ずる。\n\n4 賃借人が賃貸借契約の目的物を第三者に転貸する場合、賃貸人の承諾は不要である。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-10",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-10/",
    "questionText": "【問 10】 売買契約の目的物が品質に関して契約の内容に適合しない場合において、当該契約不適合が売主及び買主のいずれの責めにも帰することができない事由によるものであるとき、履行の追完請求権、代金の減額請求権、損害賠償請求権及び契約の解除権のうち、民法の規定によれば、買主が行使することができない権利のみを掲げたものとして正しいものは次の記述のうちどれか。なお、上記帰責性以外の点について、権利の行使を妨げる事情はないものとする。\n\n1 履行の追完請求権、損害賠償請求権、契約の解除権\n\n2 代金の減額請求権、損害賠償請求権、契約の解除権\n\n3 履行の追完請求権、代金の減額請求権\n\n4 損害賠償請求権",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-11",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-11/",
    "questionText": "【問 11】 建物の所有を目的とする土地の賃貸借契約（一時使用目的の借地契約を除く。）に関する次の記述のうち、借地借家法の規定によれば、正しいものはどれか。\n\n1 専ら事業の用に供する建物（居住の用に供するものを除く。）の所有を目的とし、存続期間を 20 年として借地権を設定する場合、建物買取請求権の規定は適用されず、また、その契約は、公正証書による等書面によってしなければならない。\n\n2 居住の用に供する建物の所有を目的として借地権を設定する場合において、借地権を消滅させる目的で、その設定後 30 年を経過した日に借地権の目的である土地の上の建物を借地権設定者に相当の対価で譲渡する旨の特約を定めても、この特約は無効である。\n\n3 借地権を設定する場合において、存続期間を定めなかったときは、その期間は 30 年となる。\n\n4 当事者が借地権の設定後に最初に借地契約を更新する場合において、存続期間を定めなかったときは、その期間は更新の日から 10 年となる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-12",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-12/",
    "questionText": "【問 12】 賃貸人Ａと賃借人Ｂとが、居住目的で期間を 3 年として、借地借家法第 38 条の定期建物賃貸借契約（以下この問において「契約①」という。）を締結した場合と、定期建物賃貸借契約でも一時使用目的の賃貸借契約でもない普通建物賃貸借契約（以下この問において「契約②」という。）を締結した場合とに関する次の記述のうち、借地借家法の規定によれば、正しいものはどれか。\n\n1 Ｂが建物の引渡しを受けた後にＡが建物をＣに売却して建物所有者がＣに変わった場合、Ｂは、契約①の場合ではＣに対して賃借人であることを主張できるが、契約②の場合ではＣに対して賃借人であることを主張できない。\n\n2 契約期間中は賃料の改定を行わない旨の特約を契約において定めていても、契約期間中に賃料が不相当になったと考えるに至ったＢは、契約①の場合も契約②の場合も、借地借家法第 32 条に基づく賃料減額請求をすることができる。\n\n3 Ｂが契約期間中に相続人なしで死亡した場合において、婚姻はしていないが事実上夫婦と同様の関係にあった同居者Ｄがあるときは、契約①の場合も契約②の場合も、Ａに反対の意思表示をしないＤは、建物の賃貸借契約に関し、Ｂの権利義務を承継する。\n\n4 契約①の場合、公正証書によって契約をするときに限り契約の更新がないことを有効に定めることができ、契約②の場合、書面で契約し、かつ、Ａに正当な理由がない限り、Ａは契約の更新を拒絶することができなくなる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-13",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 13,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-13/",
    "questionText": "【問 13】 建物の区分所有等に関する法律に関する次の記述のうち、誤っているものはどれか。\n\n1 各共有者の共用部分の持分は、規約に別段の定めがない限り、共有者数で等分することとされている。\n\n2 規約及び集会の決議は、区分所有者の特定承継人に対しても、その効力を生ずる。\n\n3 管理者は、集会において、毎年 1 回一定の時期に、その事務に関する報告をしなければならない。\n\n4 集会の招集の通知は、区分所有者が管理者に対して通知を受けるべき場所を通知しなかったときは区分所有者の所有する専有部分が所在する場所にあててすれば足りる。この場合には、集会の招集の通知は、通常それが到達すべき時に到達したものとみなされる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-14",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 14,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-14/",
    "questionText": "【問 14】 不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、誤っているものはどれか。\n\n1 買戻しの特約に関する登記がされている場合において、契約の日から 10 年を経過したときは、登記権利者は、単独で当該登記の抹消を申請することができる。\n\n2 不動産の収用による所有権の移転の登記は、起業者が単独で申請することができる。\n\n3 相続人ではない者に対する遺贈による所有権の移転の登記は、登記権利者が単独で申請することができる。\n\n4 登記名義人の住所についての変更の登記は、登記名義人が単独で申請することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-15",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-15/",
    "questionText": "【問 15】 都市計画法に関する次の記述のうち、誤っているものはどれか。\n\n1 都市計画区域外においても、特に必要があるときは、都市施設に関する都市計画を定めることができる。\n\n2 準都市計画区域については、用途地域が定められている土地の区域であっても、市街地開発事業に関する都市計画を定めることができない。\n\n3 用途地域の一つである準住居地域は、道路の沿道としての地域の特性にふさわしい業務の利便の増進を図りつつ、これと調和した住居の環境を保護するために定める地域である。\n\n4 地区計画は、用途地域が定められている土地の区域についてのみ都市計画に定められるものであり、また、地区計画に関する都市計画を定めるに当たっては、地区整備計画を都市計画に定めなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-16",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-16/",
    "questionText": "【問 16】 都市計画法（以下この問において「法」という。）に関する次の記述のうち、正しいものはどれか。ただし、この問において条例による特別の定めはないものとし、「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 市街化区域内において行う、医療法に規定する病院を建築するための 1,000 m2 の開発行為については、法第 29 条に基づく都道府県知事の許可を得る必要がある。\n\n2 市街化区域内において行う、開発行為を伴わない建築物の建築で、当該建築物の床面積が1,000 m2 以上のものについては、法第 29 条に基づく都道府県知事の許可を得る必要がある。\n\n3 市街化調整区域内において行う、都市計画事業の施行のための開発行為については、法第29 条に基づく都道府県知事の許可を得る必要がある。\n\n4 法第 29 条に基づく許可を受けた者は、当該許可に係る土地についての一定の事項を開発登録簿に登録しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-17",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-17/",
    "questionText": "【問 17】 建築基準法に関する次の記述のうち、誤っているものはどれか。なお、建築副主事の確認にあっては、建築基準法に定める大規模建築物以外の建築物に限るものとする。\n\n1 高さ 25 m の建築物には、周囲の状況によって安全上支障がない場合を除き、有効に避雷設備を設けなければならない。\n\n2 特定行政庁は、建築基準法の規定に違反した建築物（国、都道府県又は建築主事を置く市町村の建築物を除く。）の所有者に対して、緊急の必要があり、仮に当該建築物の使用禁止又は使用制限の命令をする場合であっても、意見書の提出先等を記載した通知書の交付等の手続をとらなければならない。\n\n3 防火地域内に存在する共同住宅（その用途に供する部分の床面積の合計が 300 m2）を増築する場合、その増築に係る部分の床面積の合計が 10 m2 以内であっても、建築主事、建築副主事又は指定確認検査機関の確認を受ける必要がある。\n\n4 劇場の用途に供する建築物を映画館（その用途に供する部分の床面積の合計が 500 m2）に用途変更する場合、建築主事、建築副主事又は指定確認検査機関の確認を受ける必要はない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-18",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-18/",
    "questionText": "【問 18】 次の記述のうち、建築基準法の規定によれば、正しいものはどれか。\n\n1 客席部分の床面積の合計が 300 m2 の映画館については、第二種住居地域内において建築することはできないが、準住居地域内においては建築することができる。\n\n2 特定用途誘導地区内において、都市計画で建築物の高さの最高限度が定められていたとしても、特定行政庁が用途上又は構造上やむを得ないと認めて許可したものについては、当該最高限度を超えてよい。\n\n3 計画しようとする建築物の天空率が、道路斜線制限、隣地斜線制限又は北側斜線制限に適合する建築物の天空率未満であれば、これらの制限は適用されない。\n\n4 都市計画で建蔽率の限度が 80 ％ に指定されている区域かつ防火地域内にある耐火建築物について、建蔽率の限度を超えるためには、特定行政庁による許可を得る必要がある。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-19",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 19,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-19/",
    "questionText": "【問 19】 宅地造成及び特定盛土等規制法に関する次の記述のうち、誤っているものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市及び中核市にあってはその長をいうものとし、地方自治法に基づく施行時特例市に係る経過措置については考慮しないものとする。\n\n1 都道府県知事は、基礎調査のために他人の占有する土地に立ち入って測量又は調査を行う必要があるときは、その必要の限度において、当該土地に、自ら立ち入り、又はその命じた者若しくは委任した者に立ち入らせることができ、当該土地の占有者は、正当な理由がない限り、その立入りを拒み、又は妨げてはならない。\n\n2 都道府県知事は、宅地造成等工事規制区域内の土地について、宅地造成等に伴う災害を防止するために必要があると認める場合には、その土地の所有者に対して、擁壁等の設置等の措置をとることを勧告することができる。\n\n3 工事主は、宅地造成等工事規制区域において行われる宅地造成等に関する工事について、工事着手後 2 週間以内に、宅地造成等に関する工事の施行に係る土地の周辺地域の住民に対し、説明会の開催その他の当該宅地造成等に関する工事の内容を周知させるため必要な措置を講じなければならない。\n\n4 特定盛土等規制区域内において行われる特定盛土等又は土石の堆積に関する工事については、工事主は、当該工事に着手する日の 30 日前までに、主務省令で定めるところにより、当該工事の計画を都道府県知事に届け出なければならない。ただし、特定盛土等又は土石の堆積に伴う災害の発生のおそれがないと認められるものとして政令で定める工事については、この限りでない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-20",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 20,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-20/",
    "questionText": "【問 20】 土地区画整理法に関する次の記述のうち、誤っているものはどれか。なお、この問において、同法第 136 条の 3 による大都市等の特例及び条例で定める事務処理の特例は考慮しないものとする。\n\n1 仮換地が指定された場合においては、従前の宅地について権原に基づき使用し、又は収益することができる者は、仮換地の指定の効力発生の日から換地処分の公告がある日まで、仮換地又は仮換地について仮に使用し、若しくは収益することができる権利の目的となるべき宅地若しくはその部分について、従前の宅地について有する権利の内容である使用又は収益と同じ使用又は収益をすることができる。\n\n2 市町村施行の土地区画整理事業において、市町村は、換地処分をした場合においては、その旨を公告しなければならない。\n\n3 換地計画において定められた保留地は、換地処分の公告があった日の翌日において、施行者が取得する。\n\n4 施行者は、仮換地を指定した場合において、特別の事情があるときは、その仮換地について使用又は収益を開始することができる日を仮換地の指定の効力発生の日と別に定めることができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-21",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-21/",
    "questionText": "【問 21】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、誤っているものはどれか。\n\n1 法第 3 条第 1 項の許可があったときは所有権が移転する旨の停止条件付売買契約を原因とする所有権移転の仮登記の申請を行う場合にも、農業委員会の許可が必要である。\n\n2 法第 5 条第 1 項の許可申請書の提出において、法ではその申請に係る権利の設定又は移転に関し民事調停法により調停が成立した場合など一定の場合を除き、当事者は連署した申請書を提出しなければならないとされている。\n\n3 法では、農地の賃貸借で期間の定めがあるものについては、一定の場合を除き、期間満了の 1 年前から 6 か月前までの間に更新拒絶の通知をしないと従前の賃貸借と同一の条件で更に賃貸借したものとみなされる。\n\n4 法では、農地の賃貸借の当事者は、当該賃貸借の合意による解約が民事調停法による農事調停によって行われる場合など一定の場合を除き、知事の許可を受けなければ、当該賃貸借について、解除、解約の申入れ、合意解約、更新拒絶の通知をしてはならないとされている。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-22",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-22/",
    "questionText": "【問 22】 国土利用計画法（以下この問において「法」という。）第 23 条の届出（以下この問において「事後届出」という。）及び法第 27 条の 7 の監視区域内の届出（以下この問において「事前届出」という。）に関する次の記述のうち、正しいものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市にあってはその長をいうものとする。\n\n1 Ａが所有する市街化区域以外の都市計画区域内の 4,000 m2 の土地について、宅地建物取引業者Ｂが地上権の設定を受ける契約を締結した場合、Ｂは事後届出を行わなければならない。\n\n2 宅地建物取引業者Ｃが所有する市街化区域内の 3,000 m2 の土地と宅地建物取引業者Ｄが所有する都市計画区域外に所在する 12,000 m2 の土地を金銭の授受を伴わずに交換する契約を締結した場合、Ｃ及びＤはともに事後届出を行う必要はない。\n\n3 事前届出又は事後届出が必要な土地について、売買契約を締結したにもかかわらず所定の期間内に当該届出をしなかった者は都道府県知事からの勧告を受けることがあるが、罰則の適用を受けることはない。\n\n4 監視区域に指定された市街化区域内に所在する土地 2,500 m2 について売買契約を締結しようとする当事者は、契約締結の少なくとも 6 週間前までに事前届出を行わなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-23",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-23/",
    "questionText": "【問 23】 住宅借入金等を有する場合の所得税額の特別控除（以下この問において「住宅ローン控除」という。）に関する次の記述のうち、正しいものはどれか。なお、以下の居住用家屋は、令和 5 年に建築基準法第 6 条第 1 項の確認（建築確認）を受けたものとする。\n\n1 令和 6 年中に居住用家屋を居住の用に供した場合において、その前年において居住用財産を譲渡した場合の軽減税率の特例の適用を受けているときであっても、令和 6 年分以後の所得税について住宅ローン控除の適用を受けることができる。\n\n2 令和 6 年中に居住用家屋を居住の用に供した場合において、その前年において居住用財産の買換え等の場合の譲渡損失の損益通算の適用を受けているときであっても、令和 6 年分以後の所得税について住宅ローン控除の適用を受けることができる。\n\n3 令和 5 年中に居住用家屋の敷地の用に供するための土地を取得した場合において、令和 6年中に居住用家屋を新築して居住の用に供したときは、令和 5 年分の所得税について住宅ローン控除の適用を受けることができる。\n\n4 令和 6 年中に居住用家屋を居住の用に供した場合において、その居住用家屋の取得に係る住宅借入金等の償還期間等が契約において 3 年とされているときは、令和 6 年以後 3 年間の所得税について住宅ローン控除の適用を受けることができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-25",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-25/",
    "questionText": "【問 25】 不動産の鑑定評価に関する次の記述のうち、不動産鑑定評価基準によれば、誤っているものはどれか。\n\n1 同一需給圏とは、一般に対象不動産と代替関係が成立して、その価格の形成について相互に影響を及ぼすような関係にある他の不動産の存する圏域をいう。\n\n2 対象不動産について、依頼目的に応じ対象不動産に係る価格形成要因のうち地域要因又は個別的要因について想定上の条件を設定する場合がある。\n\n3 不動産の価格は、その不動産の効用が最高度に発揮される可能性に最も富む使用を前提として把握される価格を標準として形成されるが、これを適合の原則という。\n\n4 収益還元法は、対象不動産が将来生み出すであろうと期待される純収益の現在価値の総和を求めることにより対象不動産の試算価格を求める手法であり、賃貸用不動産又は賃貸以外の事業の用に供する不動産の価格を求める場合に特に有効である。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-26",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 26,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-26/",
    "questionText": "【問 26】 宅地建物取引業法第 35 条に規定する重要事項の説明に関する次の記述のうち、正しいものはいくつあるか。なお、説明の相手方は宅地建物取引業者ではないものとする。ア ガス配管設備等に関して、住宅の売買後においても宅地内のガスの配管設備等の所有権が家庭用プロパンガス販売会社にあるものとする場合には、その旨を説明しなければならない。イ 重要事項の説明を行う宅地建物取引士は専任の宅地建物取引士でなくてもよいが、書面に記名する宅地建物取引士は専任の宅地建物取引士でなければならない。ウ 区分所有建物である事務所ビルの一室の売買の媒介を行う場合、当該 1 棟の建物及びその敷地の管理が委託されているときは、その委託を受けている者の氏名（法人にあっては、その商号又は名称）及び住所（法人にあっては、その主たる事務所の所在地）を説明しなければならない。エ 区分所有建物である中古マンションの一室の売買の媒介を行う場合、当該 1 棟の建物の計画的な維持修繕のための費用の積立てを行う旨の規約の定めがあるときは、その内容及び既に積み立てられている額について説明しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-27",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 27,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-27/",
    "questionText": "【問 27】 宅地建物取引業者Ａに関する次の記述のうち、正しいものはどれか。なお、Ａは宅地建物取引業保証協会の社員ではないものとする。\n\n1 Ａが主たる事務所を移転したことにより、その最寄りの供託所が変更した場合において、金銭のみをもって営業保証金を供託しているときは、遅滞なく営業保証金を移転後の主たる事務所の最寄りの供託所に新たに供託しなければならない。\n\n2 Ａの従業員が運転する車両で現地案内を受けた者が、Ａの従業員の過失による交通事故でケガをした場合に取得する損害賠償請求権は、Ａが供託した営業保証金の還付の対象債権となる。\n\n3 Ａは、金銭と有価証券を併用して供託することができ、有価証券のみで供託する場合の当該有価証券の価額は、国債証券の場合はその額面金額の 100 分の 90、地方債証券の場合はその額面金額の 100 分の 80 である。\n\n4 Ａは甲県内にある主たる事務所とは別に、乙県内に新たに従たる事務所を設置したときは、営業保証金を主たる事務所の最寄りの供託所に供託しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-28",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-28/",
    "questionText": "【問 28】 宅地建物取引業者Ａ（消費税課税事業者）及び宅地建物取引業者Ｂ（消費税免税事業者）が受領した報酬に関するアからウの記述のうち、宅地建物取引業法の規定に違反しないものの組合せは 1 から 4 のうちどれか。なお、代理、媒介に当たり、広告の依頼は行われていないものとする。ア 居住用建物（ 1 か月の借賃 12 万円。消費税等相当額を含まない。）について、Ａは貸主から代理を依頼され、Ｂは借主から媒介を依頼され、Ａは貸主から 6.7 万円、Ｂは借主から6.5 万円を報酬として受領した。なお、Ｂは、媒介の依頼を受けるに当たって、報酬について借主から特段の承諾を得ていない。イ Ｂは、事業用建物について、貸主と借主双方から媒介を依頼され、借賃 1 か月分 10 万円（消費税等相当額を含まない。）、権利金 90 万円（権利設定の対価として支払われる金銭であって返還されないもので、消費税等相当額を含まない。）の賃貸借契約を成立させ、貸主と借主からそれぞれ 5 万円を報酬として受領した。ウ Ａは、土地付建物について、売主と買主双方から媒介を依頼され、代金 3,500 万円（消費税等相当額を含み、土地代金は 2,400 万円である。）の売買契約を成立させ、売主と買主からそれぞれ 110 万円を報酬として受領したほか、売主の特別の依頼に基づき行った遠隔地への現地調査に要した実費の費用について、売主が事前に負担を承諾していたので、売主から9 万円を受領した。\n\n1 ア、イ\n\n2 イ、ウ\n\n3 ア、ウ\n\n4 ア、イ、ウ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-29",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 29,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-29/",
    "questionText": "【問 29】 宅地建物取引士に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 宅地建物取引士資格試験に合格した者は、宅地又は建物の取引に関する実務の経験期間が2 年に満たない場合であっても、試験に合格した日から 1 年以内に登録を受けようとするときには、都道府県知事が指定する講習を受講することにより、宅地建物取引士の登録を受けることができる。\n\n2 宅地建物取引士証は、更新を受けることなくその有効期間が経過した場合、その効力を失うが、当該宅地建物取引士証を都道府県知事に返納する必要はない。\n\n3 宅地建物取引士は、他人に自己の名義の使用を許し、当該他人がその名義で宅地建物取引士である旨の表示をしたときは、法第 68 条の規定に基づく処分の対象となるが、当該他人が宅地建物取引士の登録を受けた者であるときはこの限りでない。\n\n4 宅地建物取引業者は、その事務所唯一の専任の宅地建物取引士が宅地建物取引士証の有効期間の経過により効力を失い宅地建物取引士でなくなったときは、 2 週間以内に法第 31 条の 3 第 1 項の規定に適合させるため必要な措置を執らなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-30",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-30/",
    "questionText": "【問 30】 宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者ではない個人Ｂとの間で宅地の売買契約を締結し、手付金を支払ったＢが、宅地建物取引業法第 37 条の 2 の規定に基づくいわゆるクーリング・オフにより、当該売買契約を契約締結の日の翌日に解除しようとしている。この場合に関する次の記述のうち、誤っているものはどれか。\n\n1 Ａがクーリング・オフについて告げるときに交付すべき書面には、Ａの商号又は名称及び住所並びに免許証番号の記載は必要であるが、Ａの宅地建物取引士の記名は必要ない。\n\n2 Ｂが、自らの申出により、Ｂの勤務する会社の事務所において、宅地の買受けの申込み及びＡとの売買契約の締結をした場合、Ｂは、クーリング・オフによる当該売買契約の解除を行うことができない。\n\n3 Ｂが、自らの申出により、喫茶店において、宅地の買受けの申込み及びＡとの売買契約の締結をした場合、Ｂは、クーリング・オフによる当該売買契約の解除を行うことができる。\n\n4 Ｂは、自らの申出により、Ｂが融資を受ける銀行（宅地建物取引業者ではない。）において、宅地の買受けの申込み及びＡとの売買契約の締結をした場合、クーリング・オフによる当該売買契約の解除を行うことができない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-31",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 31,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-31/",
    "questionText": "【問 31】 次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 国土交通大臣又は都道府県知事は、その免許を受けた宅地建物取引業者が法第 65 条第 1項の規定による指示に従わない場合、その業務の全部又は一部の停止を命ずることができ、業務の停止の処分に違反した場合、免許を取り消さなければならない。\n\n2 国土交通大臣又は都道府県知事は、その免許を受けた宅地建物取引業者の事務所の所在地を確知できないときは、その事実を公告し、その公告の日から 2 週間を経過しても当該宅地建物取引業者から申出がないときは、免許を取り消すことができる。\n\n3 国土交通大臣又は都道府県知事は、法第 66 条の規定による免許の取消しの処分をしようとするときは、聴聞を行わなければならないが、当該聴聞は、公開することが相当と認められる場合を除き、公開されない。\n\n4 国土交通大臣又は都道府県知事は、法第 66 条の規定による免許の取消しの処分をしたときはその旨を公告しなければならないが、法第 65 条第 2 項の規定による業務の停止の処分をしたときはその旨の公告はしなくともよい。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-32",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 32,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-32/",
    "questionText": "【問 32】 宅地建物取引業者Ａが、ＢからＢ所有の中古住宅の売却の依頼を受け、Ｂと専任媒介契約（専属専任媒介契約ではないものとする。）を締結した。この場合における次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 Ａは当該中古住宅の売買契約が成立しても、当該中古住宅の引渡しが完了していなければ、売買契約が成立した旨を指定流通機構に通知する必要はない。\n\n2 Ｂが宅地建物取引業者である場合は、当該契約が国土交通大臣が定める標準媒介契約約款に基づくものであるか否かの別を、法第 34 条の 2 第 1 項に規定する書面に記載する必要はない。\n\n3 Ａに対して当該中古住宅について買受けの申込みがなかった場合でも、ＡはＢに対して、当該契約に係る業務の処理状況を 2 週間に 1 回以上報告しなければならないが、その報告は必ずしも書面で行う必要はない。\n\n4 Ｂが当該中古住宅について、法第 34 条の 2 第 1 項第 4 号に規定する建物状況調査を実施する者のあっせんを希望しなかった場合は、Ａは同項に規定する書面に同調査を実施する者のあっせんに関する事項を記載する必要はない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-33",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-33/",
    "questionText": "【問 33】 宅地建物取引業者がその業務に関して行う広告に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、誤っているものはどれか。\n\n1 宅地の販売に関する広告をインターネットで行った場合において、当該宅地の売買契約が成立した後も継続して広告を掲載していた場合、当該広告を掲載し続けることは法第 32 条の規定に違反する。\n\n2 建物の所有者と賃貸借契約を締結し、当該建物を自らが貸主となって貸借（転貸）するための広告をする場合においては、自らが契約の当事者となって貸借を成立させる旨を当該広告に明示しなくても、法第 34 条の規定に違反しない。\n\n3 造成工事に必要とされる法令に基づく許可等の処分があった宅地について、工事完了前に当該宅地の販売に関する広告をするときは、法令に基づく許可等の処分があったことを明示すれば、取引態様の別について明示する必要はない。\n\n4 複数の区画がある分譲地の売買について、数回に分けて広告をする場合は、最初に行う広告だけではなく、次回以降の広告の都度取引態様の別を明示しなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-34",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 34,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-34/",
    "questionText": "【問 34】 宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者ではない個人Ｂとの間で、土地付建物を 4,000 万円で売却する売買契約（所有権の登記は当該土地付建物の引渡し時に行うものとする。）を締結する場合における宅地建物取引業法（以下この問において「法」という。）第 41 条又は第 41 条の 2 の規定に基づく手付金等の保全措置（以下この問において「保全措置」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 Ａが、保全措置を講じずにＢから手付金 100 万円を受領する場合、その旨を、法第 35 条の規定に基づく重要事項説明書に記載する必要があるが、法第 37 条の規定により交付する書面に記載する必要はない。\n\n2 当該建物が建築工事の完了後の建物である場合、ＡがＢから手付金 100 万円を受領する際には保全措置は不要であるが、その後、当該土地付建物を引き渡す前に中間金 400 万円を受領するためには、手付金 100 万円と合わせて保全措置を講じた後でなければ、その中間金を受領することができない。\n\n3 当該建物が建築工事の完了前の建物である場合において、Ａは、保全措置を講じずに、Ｂから手付金 300 万円を受領することができる。\n\n4 当該土地付建物の引渡し前に、ＢはＡに対して 2,000 万円を中間金として支払う契約になっていたが、Ａがその中間金について保全措置を講じていないときは、Ｂはこの中間金の支払いを拒むことができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-35",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 35,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-35/",
    "questionText": "【問 35】 宅地建物取引業者Ａが宅地建物取引業法第 37 条の規定により交付すべき書面（以下この問において「37 条書面」という。）に記載すべき事項を電磁的方法により提供すること（以下この問において「37 条書面の電磁的方法による提供」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 Ａが自ら売主として締結する宅地の売買契約において、37 条書面の電磁的方法による提供を行う場合、当該契約の相手方に対し、あらかじめ、電磁的方法による提供に用いる電磁的方法の種類及び内容を宅地建物取引士に説明させなければならない。\n\n2 Ａが媒介業者として関与する建物賃貸借契約において、37 条書面の電磁的方法による提供を行う場合、その方法は 37 条書面の交付に係る宅地建物取引士が明示されるものでなければならない。\n\n3 Ａが自ら売主として締結する宅地の売買契約において、契約の相手方から 37 条書面の電磁的方法による提供を行うことについて書面により承諾を得た場合は、その後に当該契約の相手方から書面で電磁的方法による提供を受けない旨の申出があったときでも、37 条書面の電磁的方法による提供をすることができる。\n\n4 Ａが媒介業者として関与する宅地の売買契約において、37 条書面の電磁的方法による提供を行う場合であっても、提供後速やかに 37 条書面を交付しなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-36",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-36/",
    "questionText": "【問 36】 営業保証金及び宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。\n\n1 宅地建物取引業者で保証協会に加入しようとする者は、その加入しようとする日までに、政令で定める額の弁済業務保証金分担金を当該保証協会に納付しなければならない。\n\n2 保証協会の社員と宅地建物取引業に関し取引をした者（宅地建物取引業者に該当する者を除く。）は、その取引により生じた債権に関し、当該社員が社員ではないとしたならばその者が供託すべき営業保証金の額に相当する額の範囲内で弁済を受ける権利を有する。\n\n3 宅地建物取引業者は、保証協会の社員の地位を失ったときは、保証協会が弁済業務保証金の還付請求権者に対し、一定期間内に宅地建物取引業法第 64 条の 8 第 2 項の規定による認証を受けるため申し出るべき旨の公告をした後でなければ、弁済業務保証金分担金の返還を受けることができない。\n\n4 宅地建物取引業者は、一部の事務所を廃止し営業保証金を取り戻そうとする場合には、供託した営業保証金につき還付を請求する権利を有する者に対し、公告をすることなく営業保証金を取り戻すことができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-37",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-37/",
    "questionText": "【問 37】 宅地建物取引業者が行う宅地建物取引業法第 35 条に規定する重要事項説明に関する次の記述のうち、正しいものはいくつあるか。なお、説明の相手方は宅地建物取引業者ではないものとする。ア 建物の貸借の媒介を行う場合、水防法施行規則第 11 条第 1 号の規定により市町村の長が提供する水害ハザードマップに当該建物の位置が含まれているときは、その所在地を示して説明しなければならない。イ 既存住宅の売買を行う場合、宅地建物取引業法第 34 条の 2 第 1 項第 4 号に規定する建物状況調査の実施後、 1 年を経過していないものについては、建物状況調査の実施の有無、実施している場合の結果の概要について説明しなければならない。ウ 宅地の売買を行う場合、宅地の造成に関する工事の完了前のものであるときは、完了時における当該宅地に接する道路の構造及び幅員を説明しなければならない。エ 建物の貸借の媒介を行う場合、私道に関する負担の有無や内容を事前に調査し、説明しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r6-38",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-38/",
    "questionText": "【問 38】 宅地建物取引業の免許（以下この問において「免許」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者Ａが、免許の更新の申請をした場合において、従前の免許の有効期間の満了の日までに、その申請について処分がなされないときは、従前の免許は、有効期間の満了後その効力を失う。\n\n2 宅地建物取引業者Ｂが宅地建物取引業者Ｃに自己の名義をもって宅地建物取引業を営ませる行為は、Ｂが名義の使用を書面で指示している場合であれば、宅地建物取引業法に違反しない。\n\n3 宅地建物取引業者Ｄ（甲県知事免許）は、国土交通大臣に免許換えの申請をし、その免許を受けなければ、乙県所在の宅地の売買の媒介をすることはできない。\n\n4 宅地建物取引業者Ｅ（丙県知事免許）の免許の更新に当たって、丙県知事は宅地建物取引業法第 3 条の 2 に基づき条件を付すことができ、Ｅが免許の更新に当たって付された条件に違反したときは、丙県知事はＥの免許を取り消すことができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-39",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-39/",
    "questionText": "【問 39】 宅地建物取引業法第 50 条第 2 項の届出をすべき場所に関する次の記述のうち、誤っているものはどれか。なお、これらの場所では、宅地若しくは建物の売買若しくは交換の契約（予約を含む。）若しくは宅地若しくは建物の売買、交換若しくは貸借の代理若しくは媒介の契約を締結し、又はこれらの契約の申込みを受けるものとする。\n\n1 届出をすべき場所として、継続的に業務を行うことができる施設を有する場合で事務所以外のものが定められているが、当該場所には 1 名以上の成年者である専任の宅地建物取引士を置かなければならない。\n\n2 届出をすべき場所として、宅地建物取引業者が 10 区画以上の一団の宅地又は 10 戸以上の一団の建物の分譲（以下この問において「一団の宅地建物の分譲」という。）をする場合に設置する案内所が定められているが、当該案内所が土地に定着する建物内に設けられる場合、クーリング・オフ制度の適用が除外される。\n\n3 届出をすべき場所として、他の宅地建物取引業者が行う一団の宅地建物の分譲の代理又は媒介をする場合に設置する案内所が定められており、この場合は、代理又は媒介を行う宅地建物取引業者が届出をするが、売主業者自身も当該案内所で売買契約の申込みを受ける場合は、売主業者も届出をする。\n\n4 届出をすべき場所として、宅地建物取引業者が業務に関し展示会その他これに類する催しを実施する場所が定められているが、その催しを開始する 10 日前までに、実施場所を管轄する都道府県知事に届け出なければならず、免許を受けた国土交通大臣又は都道府県知事に届け出る必要はない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-40",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 40,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-40/",
    "questionText": "【問 40】 宅地建物取引業者が媒介により既存建物の貸借の契約を成立させた場合、宅地建物取引業法第 37 条の規定により当該貸借の契約当事者に対して交付すべき書面に必ず記載しなければならない事項の組合せとして正しいものは次の 1 から 4 のうちどれか。ア 当該建物に係る租税その他の公課の負担イ 敷金や共益費など借賃以外の金銭の授受に関する定めがあるときは、その額並びに当該金銭の授受の時期及び目的ウ 損害賠償額の予定又は違約金に関する定めがあるときは、その内容エ 建物の構造耐力上主要な部分又は雨水の侵入を防止する部分として国土交通省令で定めるものの状況\n\n1 ア、イ\n\n2 イ、ウ\n\n3 ウ、エ\n\n4 ア、エ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-41",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 41,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-41/",
    "questionText": "【問 41】 宅地建物取引業者が行う宅地建物取引業法第 35 条に規定する重要事項の説明に関する次の記述のうち、正しいものはいくつあるか。なお、説明の相手方は宅地建物取引業者ではないものとする。ア 中古マンションの一室の売買の媒介を行う場合、抵当権が設定されていても、契約日までにその登記が抹消される予定であるときは、当該抵当権の内容について説明しなくてもよい。イ 宅地の貸借の媒介を行う場合、借地権の存続期間を 50 年とする賃貸借契約において、当該契約終了時における当該宅地の上の建物の取壊しに関する事項を定めようとするときは、その内容を説明しなければならない。ウ 建物の貸借の媒介を行う場合、当該建物が住宅の品質確保の促進等に関する法律第 5 条第1 項に規定する住宅性能評価を受けた新築住宅であるときは、その旨を説明しなければならない。エ 宅地の売買の媒介を行う場合、当該宅地が急傾斜地の崩壊による災害の防止に関する法律第 3 条の規定に基づく急傾斜地崩壊危険区域内にあることは説明しなければならないが、当該区域内における行為の制限の概要については説明しなくてもよい。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-42",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-42/",
    "questionText": "【問 42】 次の記述のうち、宅地建物取引業法の規定及び「宅地建物取引業者による人の死の告知に関するガイドライン」によれば、誤っているものはどれか。\n\n1 宅地建物取引業者は、宅地建物取引業に係る契約の締結の勧誘をするに際し、宅地建物取引業者の相手方等に対し、利益を生ずることが確実であると誤解させるべき断定的判断を提供する行為をしてはならない。\n\n2 宅地建物取引業者は、宅地又は建物の売買の契約の締結の勧誘をするに際し、宅地建物取引業者の相手方等に対し、宅地又は建物の引渡しの時期について故意に不実のことを告げた場合であっても、契約が成立したときに宅地建物取引業法第 37 条の規定により交付すべき書面に当該事項を正確に記載すればよい。\n\n3 「宅地建物取引業者による人の死の告知に関するガイドライン」によれば、売買取引の対象となる居住用不動産において、自然死や日常生活の中での不慮の死が発生した場合であっても、過去に人が死亡し、長期間にわたって人知れず放置されたこと等に伴ういわゆる特殊清掃や大規模リフォーム等が行われていなければ、宅地建物取引業者は、原則として、買主に対してこれを告げなくてもよい。\n\n4 「宅地建物取引業者による人の死の告知に関するガイドライン」によれば、賃貸借取引の対象となる居住用不動産において、自然死や日常生活の中での不慮の死以外の死が発生した場合であっても、特段の事情がない限り、当該死が発覚してから概ね 3 年間を経過した後は、宅地建物取引業者は、原則として、借主に対してこれを告げなくてもよい。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-43",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 43,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-43/",
    "questionText": "【問 43】 宅地建物取引士の登録及び宅地建物取引士証に関する次の記述のうち、誤っているものはどれか。\n\n1 宅地建物取引士の登録を受けている者は、宅地建物取引士証の交付を受けていない場合でも、その住所に変更があれば、登録を受けている都道府県知事に変更の登録を申請しなければならない。\n\n2 宅地建物取引士は、宅地建物取引士の信用又は品位を害するような行為をしてはならず、この行為には宅地建物取引士としての職務に必ずしも直接関係しない行為や私的な行為も含まれる。\n\n3 宅地建物取引士は、取引の関係者から請求があったときは、宅地建物取引士証を提示しなければならないが、その際、個人情報保護の観点から宅地建物取引士証の住所欄にシールを貼った上で提示することが認められている。\n\n4 宅地建物取引士証に記載される宅地建物取引士の氏名については現姓を用いなければならず、旧姓を併記することは認められていない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-44",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-44/",
    "questionText": "【問 44】 宅地建物取引業者Ａが宅地建物取引業法第 37 条の規定により交付すべき書面（以下この問において「37 条書面」という。）に関する次の記述のうち、宅地建物取引業法の規定に違反しないものはどれか。\n\n1 Ａは、建築工事完了前の建物の売買契約を媒介したときに、37 条書面に記載する当該建物を特定するために必要な表示について、宅地建物取引業法第 35 条の規定に基づく重要事項の説明において使用した図書を交付することによって行った。\n\n2 Ａは、貸主Ｂと借主Ｃとの間で締結された建物の賃貸借契約を媒介したときに、借賃の額、支払時期及び支払方法について定められていたが、ＢとＣの承諾を得たので、37 条書面に記載しなかった。\n\n3 Ａは、宅地建物取引業者Ｄと宅地建物取引業者Ｅとの間で締結された宅地の売買契約を媒介したときに、37 条書面に当該宅地の引渡しの時期を記載しなかった。\n\n4 Ａが建物の売買契約を買主として締結した場合に、売主Ｆに承諾を得たので、37 条書面をＦに交付しなかった。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-45",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-45/",
    "questionText": "【問 45】 特定住宅瑕疵担保責任の履行の確保等に関する法律に基づく住宅販売瑕疵担保保証金（以下この問において「保証金」という。）の供託又は住宅販売瑕疵担保責任保険契約（以下この問において「保険契約」という。）の締結に関する次の記述のうち、正しいものはどれか。\n\n1 自ら売主として宅地建物取引業者ではない買主に引き渡した新築住宅の戸数が、基準日前10 年間に 10 戸あるが、当該基準日前 1 年間は 0 戸である場合、当該売主である宅地建物取引業者は、当該基準日に係る保証金の供託又は保険契約の締結の状況について届出を行う必要はない。\n\n2 自ら売主として新築住宅を宅地建物取引業者ではない買主に引き渡した宅地建物取引業者は、基準日に係る保証金の供託及び保険契約の締結の状況について届出をしなければ、当該基準日の翌日から起算して 50 日を経過した日以後においては、新たに自ら売主となる新築住宅の売買契約を締結してはならない。\n\n3 保険契約は、新築住宅の引渡し時から有効でなければならないが、買主が当該住宅の引渡し時から 10 年以内に当該住宅を転売した場合、当該保険契約は解除される。\n\n4 自ら売主として宅地建物取引業者ではない買主に新築住宅を引き渡した宅地建物取引業者が、保証金を供託する場合、当該住宅の床面積が 25 m2 以下であるときは、新築住宅の合計戸数の算定に当たって、 3 戸をもって 1 戸と数えることになる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-46",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 証券化支援業務（買取型）において、機構による譲受けの対象となる住宅の購入に必要な資金の貸付けに係る金融機関の貸付債権には、当該住宅の購入に付随する当該住宅の改良に必要な資金は含まれない。\n\n2 機構は、地震に対する安全性の向上を主たる目的とする住宅の改良に必要な資金の貸付けを業務として行っている。\n\n3 機構は、民間金融機関による住宅資金の供給を支援するため、民間金融機関が貸し付けた住宅ローンについて、住宅融資保険を引き受けている。\n\n4 機構は、住宅のエネルギー消費性能（建築物のエネルギー消費性能の向上等に関する法律第 2 条第 1 項第 2 号に規定するエネルギー消費性能をいう。）の向上を主たる目的とする住宅の改良に必要な資金の貸付けを業務として行っている。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r6-47",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 47,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-47/",
    "questionText": "【問 47】 宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。\n\n1 新築分譲住宅の予告広告（価格が確定していないため、直ちに取引することができない物件について、取引開始時期をあらかじめ告知する広告）を新聞折込チラシを用いて行った場合は、本広告を新聞折込チラシ以外の媒体を用いて行ってはならない。\n\n2 土地取引において、当該土地上に廃屋が存在するとき、実際の土地を見れば廃屋が存在することは明らかであるため、廃屋が存在する旨を明示する必要はない。\n\n3 交通の利便性について、電車、バス等の交通機関の所要時間を表示する場合は、朝の通勤ラッシュ時の所要時間ではなく、平常時の所要時間を明示しなければならない。\n\n4 居住の用に供されたことはないが建築後 1 年以上経過した一戸建て住宅について、新築である旨を表示することはできない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r6-49",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 30 度以上の角度をなす斜面を背後に控える宅地は、崖面への保護対策を講じるか、擁壁を設けるなどの必要がある。\n\n2 高さ 2 m 以下の擁壁であれば、水抜き孔を有しなくても、地震による被害が生じることはない。\n\n3 重力式擁壁は、擁壁の自重により、背面からの土圧に抵抗するコンクリート構造物である。\n\n4 工場跡地や埋立地などでは、重金属や揮発性有機化合物などによる土壌汚染が問題となることがある。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r6-50",
    "examId": "r6",
    "year": "令和6年度",
    "label": "2024 / 令和6年度",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2024kakomon/r06-50/",
    "questionText": "【問 50】 建物の構造に関する次の記述のうち、最も不適当なものはどれか。\n\n1 ラーメン構造は、柱を鉛直方向、梁を水平方向に配置し、接合部を強く固めた構造である。\n\n2 ブレース構造は、柱や梁などで構成された四角形の対角線上に部材を入れた構造である。\n\n3 ブレース構造は、骨組全てに用いることが多く、ラーメン構造など他の構造と併用することはない。\n\n4 壁式構造は、板状の壁と床を箱形に組み、建物とする構造で、原則として、柱や梁は用いない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-01",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-1/",
    "questionText": "【問 1】 次の 1 から 4 までの記述のうち、民法の規定、判例及び下記判決文によれば、誤っているものはどれか。\n\n（判決文）遺産は、相続人が数人あるときは、相続開始から遺産分割までの間、共同相続人の共有に属するものであるから、この間に遺産である賃貸不動産を使用管理した結果生ずる金銭債権たる賃料債権は、遺産とは別個の財産というべきであって、各共同相続人がその相続分に応じて分割単独債権として確定的に取得するものと解するのが相当である。\n\n1 遺産である不動産から、相続開始から遺産分割までの間に生じた賃料債権は、遺産である不動産が遺産分割によって複数の相続人のうちの一人に帰属することとなった場合、当該不動産が帰属することになった相続人が相続開始時にさかのぼって取得する。\n\n2 相続人が数人あるときは、相続財産は、その共有に属し、各共同相続人は、その相続分に応じて被相続人の権利義務を承継する。\n\n3 遺産分割の効力は、相続開始の時にさかのぼって生ずる。ただし、第三者の権利を害することはできない。\n\n4 遺産である不動産が遺産分割によって複数の相続人のうちの一人に帰属することとなった場合、当該不動産から遺産分割後に生じた賃料債権は、遺産分割によって当該不動産が帰属した相続人が取得する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r5-02",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-2/",
    "questionText": "【問 2】 相隣関係に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 土地の所有者は、境界標の調査又は境界に関する測量等の一定の目的のために必要な範囲内で隣地を使用することができる場合であっても、住家については、その家の居住者の承諾がなければ、当該住家に立ち入ることはできない。\n\n2 土地の所有者は、隣地の竹木の枝が境界線を越える場合、その竹木の所有者にその枝を切除させることができるが、その枝を切除するよう催告したにもかかわらず相当の期間内に切除しなかったときであっても、自らその枝を切り取ることはできない。\n\n3 相隣者の一人は、相隣者間で共有する障壁の高さを増すときは、他方の相隣者の承諾を得なければならない。\n\n4 他の土地に囲まれて公道に通じない土地の所有者は、公道に出るためにその土地を囲んでいる他の土地を自由に選んで通行することができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r5-03",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-3/",
    "questionText": "【問 3】 Ａを注文者、Ｂを請負人として、Ａ所有の建物に対して独立性を有さずその構成部分となる増築部分の工事請負契約を締結し、Ｂは 3 か月間で増築工事を終了させた。この場合に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。なお、この問において「契約不適合」とは品質に関して契約の内容に適合しないことをいい、当該請負契約には契約不適合責任に関する特約は定められていなかったものとする。\n\n1 ＡがＢに請負代金を支払っていなくても、Ａは増築部分の所有権を取得する。\n\n2 Ｂが材料を提供して増築した部分に契約不適合がある場合、Ａは工事が終了した日から 1年以内にその旨をＢに通知しなければ、契約不適合を理由とした修補をＢに対して請求することはできない。\n\n3 Ｂが材料を提供して増築した部分に契約不適合があり、Ｂは不適合があることを知りながらそのことをＡに告げずに工事を終了し、Ａが工事終了日から 3 年後に契約不適合を知った場合、ＡはＢに対して、消滅時効が完成するまでは契約不適合を理由とした修補を請求することができる。\n\n4 増築した部分にＡが提供した材料の性質によって契約不適合が生じ、Ｂが材料が不適当であることを知らずに工事を終了した場合、ＡはＢに対して、Ａが提供した材料によって生じた契約不適合を理由とした修補を請求することはできない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-04",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-4/",
    "questionText": "【問 4】 ＡがＢに対して貸金債権である甲債権を、ＢがＡに対して貸金債権である乙債権をそれぞれ有している場合において、民法の規定及び判例によれば、次のアからエまでの記述のうち、Ａが一方的な意思表示により甲債権と乙債権とを対当額にて相殺できないものを全て掲げたものは、次の 1 から 4 のうちどれか。なお、いずれの債権も相殺を禁止し又は制限する旨の意思表示はされていないものとする。ア 弁済期の定めのない甲債権と、弁済期到来前に、ＡがＢに対して期限の利益を放棄する旨の意思表示をした乙債権イ 弁済期が到来している甲債権と、弁済期の定めのない乙債権ウ 弁済期の定めのない甲債権と、弁済期が到来している乙債権エ 弁済期が到来していない甲債権と、弁済期が到来している乙債権\n\n1 ア、イ、ウ\n\n2 イ、ウ\n\n3 ウ、エ\n\n4 エ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-05",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 5,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-5/",
    "questionText": "【問 5】 従来の住所又は居所を去った者（以下この問において「不在者」という。）の財産の管理に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。なお、この問において「管理人」とは、不在者の財産の管理人をいうものとする。\n\n1 不在者が管理人を置かなかったときは、当該不在者の生死が 7 年間明らかでない場合に限り、家庭裁判所は、利害関係人又は検察官の請求により、その財産の管理について必要な処分を命ずることができる。\n\n2 不在者が管理人を置いた場合において、その不在者の生死が明らかでないときは、家庭裁判所は、利害関係人又は検察官から請求があったとしても管理人を改任することはできない。\n\n3 家庭裁判所により選任された管理人は、不在者を被告とする建物収去土地明渡請求を認容した第一審判決に対して控訴を提起するには、家庭裁判所の許可が必要である。\n\n4 家庭裁判所により選任された管理人は、保存行為として不在者の自宅を修理することができるほか、家庭裁判所の許可を得てこれを売却することができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-06",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-6/",
    "questionText": "【問 6】 Ａ所有の甲土地について、Ｂが所有の意思をもって平穏にかつ公然と時効取得に必要な期間占有を継続した場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはいくつあるか。ア ＡがＣに対して甲土地を売却し、Ｃが所有権移転登記を備えた後にＢの取得時効が完成した場合には、Ｂは登記を備えていなくても、甲土地の所有権の時効取得をＣに対抗することができる。イ Ｂの取得時効が完成した後に、ＡがＤに対して甲土地を売却しＤが所有権移転登記を備え、Ｂが、Ｄの登記の日から所有の意思をもって平穏にかつ公然と時効取得に必要な期間占有を継続した場合、所有権移転登記を備えていなくても、甲土地の所有権の時効取得をＤに対抗することができる。ウ Ｂの取得時効完成後、Ｂへの所有権移転登記がなされないままＥがＡを債務者として甲土地にＡから抵当権の設定を受けて抵当権設定登記をした場合において、Ｂがその後引き続き所有の意思をもって平穏にかつ公然と時効取得に必要な期間占有を継続した場合、特段の事情がない限り、再度の時効取得により、Ｂは甲土地の所有権を取得し、Ｅの抵当権は消滅する。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-07",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 7,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-7/",
    "questionText": "【問 7】 甲建物を所有するＡが死亡し、Ａの配偶者Ｂが甲建物の配偶者居住権を、Ａの子Ｃが甲建物の所有権をそれぞれ取得する旨の遺産分割協議が成立した場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 遺産分割協議において、Ｂの配偶者居住権の存続期間が定められなかった場合、配偶者居住権の存続期間は 20 年となる。\n\n2 Ｂが高齢となり、バリアフリーのマンションに転居するための資金が必要になった場合、Ｂは、Ｃの承諾を得ずに甲建物を第三者Ｄに賃貸することができる。\n\n3 Ｃには、Ｂに対し、配偶者居住権の設定の登記を備えさせる義務がある。\n\n4 Ｃは、甲建物の通常の必要費を負担しなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-08",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 8,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-8/",
    "questionText": "【問 8】 未成年者Ａが、法定代理人Ｂの同意を得ずに、Ｃから甲建物を買い受ける契約（以下この問において「本件売買契約」という。）を締結した場合における次の記述のうち、民法の規定によれば、正しいものはどれか。なお、Ａに処分を許された財産はなく、Ａは、営業を許されてはいないものとする。\n\n1 ＡがＢの同意を得ずに制限行為能力を理由として本件売買契約を取り消した場合、Ｂは、自己が本件売買契約の取消しに同意していないことを理由に、Ａの当該取消しの意思表示を取り消すことができる。\n\n2 本件売買契約締結時にＡが未成年者であることにつきＣが善意無過失であった場合、Ｂは、Ａの制限行為能力を理由として、本件売買契約を取り消すことはできない。\n\n3 本件売買契約につき、取消しがなされないままＡが成年に達した場合、本件売買契約についてＢが反対していたとしても、自らが取消権を有すると知ったＡは、本件売買契約を追認することができ、追認後は本件売買契約を取り消すことはできなくなる。\n\n4 本件売買契約につき、Ｂが追認しないまま、Ａが成年に達する前にＢの同意を得ずに甲建物をＤに売却した場合、ＢがＤへの売却について追認していないときでも、Ａは制限行為能力を理由として、本件売買契約を取り消すことはできなくなる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-09",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-9/",
    "questionText": "【問 9】 Ａを貸主、Ｂを借主として甲建物の賃貸借契約が令和 5 年 7 月 1 日に締結された場合の甲建物の修繕に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 甲建物の修繕が必要であることを、Ａが知ったにもかかわらず、Ａが相当の期間内に必要な修繕をしないときは、Ｂは甲建物の修繕をすることができる。\n\n2 甲建物の修繕が必要である場合において、ＢがＡに修繕が必要である旨を通知したにもかかわらず、Ａが必要な修繕を直ちにしないときは、Ｂは甲建物の修繕をすることができる。\n\n3 Ｂの責めに帰すべき事由によって甲建物の修繕が必要となった場合は、Ａは甲建物を修繕する義務を負わない。\n\n4 甲建物の修繕が必要である場合において、急迫の事情があるときは、Ｂは甲建物の修繕をすることができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-10",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-10/",
    "questionText": "【問 10】 債務者Ａが所有する甲土地には、債権者Ｂが一番抵当権（債権額 1,000 万円）、債権者Ｃが二番抵当権（債権額 1,200 万円）、債権者Ｄが三番抵当権（債権額 2,000 万円）をそれぞれ有しているが、ＢがＤの利益のため、Ａの承諾を得て抵当権の順位を放棄した。甲土地の競売に基づく売却代金が 2,400 万円であった場合、Ｂの受ける配当額として、民法の規定によれば、正しいものはどれか。\n\n1 0円\n\n2 200 万円\n\n3 400 万円\n\n4 800 万円",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-11",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-11/",
    "questionText": "【問 11】 ＡがＢとの間で、Ａ所有の甲土地につき建物所有目的で期間を 50 年とする賃貸借契約（以下この問において「本件契約」という。）を締結する場合に関する次の記述のうち、借地借家法の規定及び判例によれば、正しいものはどれか。\n\n1 本件契約に、当初の 10 年間は地代を減額しない旨の特約を定めた場合、その期間内は、ＢはＡに対して地代の減額請求をすることはできない。\n\n2 本件契約が甲土地上で専ら賃貸アパート事業用の建物を所有する目的である場合、契約の更新や建物の築造による存続期間の延長がない旨を定めるためには、公正証書で合意しなければならない。\n\n3 本件契約に建物買取請求権を排除する旨の特約が定められていない場合、本件契約が終了したときは、その終了事由のいかんにかかわらず、ＢはＡに対してＢが甲土地上に所有している建物を時価で買い取るべきことを請求することができる。\n\n4 本件契約がＢの居住のための建物を所有する目的であり契約の更新がない旨を定めていない契約であって、期間満了する場合において甲土地上に建物があり、Ｂが契約の更新を請求したとしても、Ａが遅滞なく異議を述べ、その異議に更新を拒絶する正当な事由があると認められる場合は、本件契約は更新されない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-12",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-12/",
    "questionText": "【問 12】 令和 5 年 7 月 1 日に締結された建物の賃貸借契約（定期建物賃貸借契約及び一時使用目的の建物の賃貸借契約を除く。）に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、正しいものはどれか。\n\n1 期間を 1 年未満とする建物の賃貸借契約は、期間を 1 年とするものとみなされる。\n\n2 当事者間において、一定の期間は建物の賃料を減額しない旨の特約がある場合、現行賃料が不相当になったなどの事情が生じたとしても、この特約は有効である。\n\n3 賃借人が建物の引渡しを受けている場合において、当該建物の賃貸人が当該建物を譲渡するに当たり、当該建物の譲渡人及び譲受人が、賃貸人たる地位を譲渡人に留保する旨及び当該建物の譲受人が譲渡人に賃貸する旨の合意をしたときは、賃貸人たる地位は譲受人に移転しない。\n\n4 現行賃料が定められた時から一定の期間が経過していなければ、賃料増額請求は、認められない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-13",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 13,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-13/",
    "questionText": "【問 13】 建物の区分所有等に関する法律（以下この問において「法」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 集会においては、法で集会の決議につき特別の定数が定められている事項を除き、規約で別段の定めをすれば、あらかじめ通知した事項以外についても決議することができる。\n\n2 集会は、区分所有者の 4 分の 3 以上の同意があるときは、招集の手続を経ないで開くことができる。\n\n3 共用部分の保存行為は、規約に別段の定めがある場合を除いて、各共有者がすることができるため集会の決議を必要としない。\n\n4 一部共用部分に関する事項で区分所有者全員の利害に関係しないものについての区分所有者全員の規約は、当該一部共用部分を共用すべき区分所有者が 8 人である場合、 3 人が反対したときは変更することができない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-14",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 14,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-14/",
    "questionText": "【問 14】 不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、誤っているものはどれか。\n\n1 建物が滅失したときは、表題部所有者又は所有権の登記名義人は、その滅失の日から 1 か月以内に、当該建物の滅失の登記を申請しなければならない。\n\n2 何人も、理由の有無にかかわらず、登記官に対し、手数料を納付して、登記簿の附属書類である申請書を閲覧することができる。\n\n3 共有物分割禁止の定めに係る権利の変更の登記の申請は、当該権利の共有者である全ての登記名義人が共同してしなければならない。\n\n4 区分建物の所有権の保存の登記は、表題部所有者から所有権を取得した者も、申請することができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-15",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-15/",
    "questionText": "【問 15】 都市計画法に関する次の記述のうち、正しいものはどれか。\n\n1 市街化調整区域は、土地利用を整序し、又は環境を保全するための措置を講ずることなく放置すれば、将来における一体の都市としての整備に支障が生じるおそれがある区域とされている。\n\n2 高度利用地区は、土地の合理的かつ健全な高度利用と都市機能の更新とを図るため、都市計画に、建築物の高さの最低限度を定める地区とされている。\n\n3 特定用途制限地域は、用途地域が定められている土地の区域内において、都市計画に、制限すべき特定の建築物等の用途の概要を定める地域とされている。\n\n4 地区計画は、用途地域が定められている土地の区域のほか、一定の場合には、用途地域が定められていない土地の区域にも定めることができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-16",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、正しいものはどれか。ただし、この問において条例による特別の定めはないものとし、「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 開発許可を申請しようとする者は、あらかじめ、開発行為に関係がある公共施設の管理者と協議し、その同意を得なければならない。\n\n2 開発許可を受けた者は、当該許可を受ける際に申請書に記載した事項を変更しようとする場合においては、都道府県知事に届け出なければならないが、当該変更が国土交通省令で定める軽微な変更に当たるときは、届け出なくてよい。\n\n3 開発許可を受けた者は、当該開発行為に関する工事が完了し、都道府県知事から検査済証を交付されたときは、遅滞なく、当該工事が完了した旨を公告しなければならない。\n\n4 市街化調整区域のうち開発許可を受けた開発区域以外の区域内において、自己の居住用の住宅を新築しようとする全ての者は、当該建築が開発行為を伴わない場合であれば、都道府県知事の許可を受けなくてよい。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r5-17",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-17/",
    "questionText": "【問 17】 建築基準法に関する次の記述のうち、誤っているものはどれか。\n\n1 地方公共団体は、条例で、津波、高潮、出水等による危険の著しい区域を災害危険区域として指定し、当該区域内における住居の用に供する建築物の建築を禁止することができる。\n\n2 3 階建て以上の建築物の避難階以外の階を、床面積の合計が 1,500 m2 を超える物品販売業の店舗の売場とする場合には、当該階から避難階又は地上に通ずる 2 以上の直通階段を設けなければならない。\n\n3 建築物が防火地域及び準防火地域にわたる場合、その全部について準防火地域内の建築物に関する規定を適用する。\n\n4 石綿等をあらかじめ添加した建築材料は、石綿等を飛散又は発散させるおそれがないものとして国土交通大臣が定めたもの又は国土交通大臣の認定を受けたものを除き、使用してはならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-18",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-18/",
    "questionText": "【問 18】 次の記述のうち、建築基準法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 法第 53 条第 1 項及び第 2 項の建蔽率制限に係る規定の適用については、準防火地域内にある準耐火建築物であり、かつ、街区の角にある敷地又はこれに準ずる敷地で特定行政庁が指定するものの内にある建築物にあっては同条第 1 項各号に定める数値に 10 分の 2 を加えたものをもって当該各号に定める数値とする。\n\n2 建築物又は敷地を造成するための擁壁は、道路内に、又は道路に突き出して建築し、又は築造してはならず、地盤面下に設ける建築物においても同様である。\n\n3 地方公共団体は、その敷地が袋路状道路にのみ接する建築物であって、延べ面積が 150 m2を超えるものについては、一戸建ての住宅であっても、条例で、その敷地が接しなければならない道路の幅員、その敷地が道路に接する部分の長さその他その敷地又は建築物と道路との関係に関して必要な制限を付加することができる。\n\n4 冬至日において、法第 56 条の 2 第 1 項の規定による日影規制の対象区域内の土地に日影を生じさせるものであっても、対象区域外にある建築物であれば一律に、同項の規定は適用されない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r5-20",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 20,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-20/",
    "questionText": "【問 20】 土地区画整理法に関する次の記述のうち、誤っているものはどれか。\n\n1 換地計画において定められた清算金は、換地処分の公告があった日の翌日において確定する。\n\n2 現に施行されている土地区画整理事業の施行地区となっている区域については、その施行者の同意を得なければ、その施行者以外の者は、土地区画整理事業を施行することができない。\n\n3 施行者は、換地処分の公告があった場合において、施行地区内の土地及び建物について土地区画整理事業の施行により変動があったときは、遅滞なく、その変動に係る登記を申請し、又は嘱託しなければならない。\n\n4 土地区画整理組合は、仮換地を指定しようとする場合においては、あらかじめ、その指定について、土地区画整理審議会の同意を得なければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-21",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-21/",
    "questionText": "【問 21】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、誤っているものはどれか。\n\n1 相続により農地を取得する場合は、法第 3 条第 1 項の許可を要しないが、相続人に該当しない者が特定遺贈により農地を取得する場合は、同項の許可を受ける必要がある。\n\n2 自己の所有する面積 4 アールの農地を農作物の育成又は養畜の事業のための農業用施設に転用する場合は、法第 4 条第 1 項の許可を受ける必要はない。\n\n3 法第 3 条第 1 項又は法第 5 条第 1 項の許可が必要な農地の売買について、これらの許可を受けずに売買契約を締結しても、その所有権の移転の効力は生じない。\n\n4 社会福祉事業を行うことを目的として設立された法人（社会福祉法人）が、農地をその目的に係る業務の運営に必要な施設の用に供すると認められる場合、農地所有適格法人でなくても、農業委員会の許可を得て、農地の所有権を取得することができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-22",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-22/",
    "questionText": "【問 22】 土地を取得する場合における届出に関する次の記述のうち、正しいものはどれか。なお、この問において「事後届出」とは、国土利用計画法第 23 条の届出をいい、「重要土地等調査法」とは、重要施設周辺及び国境離島等における土地等の利用状況の調査及び利用の規制等に関する法律をいうものとする。\n\n1 都市計画区域外において、国から一団の土地である 6,000 m2 と 5,000 m2 の土地を購入した者は、事後届出を行う必要はない。\n\n2 市街化区域を除く都市計画区域内において、Ａが所有する 7,000 m2 の土地をＢが相続により取得した場合、Ｂは事後届出を行う必要がある。\n\n3 市街化区域において、Ｃが所有する 3,000 m2 の土地をＤが購入する契約を締結した場合、Ｃ及びＤは事後届出を行わなければならない。\n\n4 重要土地等調査法の規定による特別注視区域内にある 100 m2 の規模の土地に関する所有権又はその取得を目的とする権利の移転をする契約を締結する場合には、当事者は、一定の事項を、あらかじめ、内閣総理大臣に届け出なければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r5-23",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-23/",
    "questionText": "【問 23】 印紙税に関する次の記述のうち、正しいものはどれか。なお、以下の契約書はいずれも書面により作成されたものとする。\n\n1 売主Ａと買主Ｂが土地の譲渡契約書を 3 通作成し、Ａ、Ｂ及び仲介人Ｃがそれぞれ 1 通ずつ保存する場合、当該契約書 3 通には印紙税が課される。\n\n2 一の契約書に土地の譲渡契約（譲渡金額 5,000 万円）と建物の建築請負契約（請負金額6,000 万円）をそれぞれ区分して記載した場合、印紙税の課税標準となる当該契約書の記載金額は 1 億 1,000 万円である。\n\n3 「Ｄの所有する甲土地（時価 2,000 万円）をＥに贈与する」旨を記載した贈与契約書を作成した場合、印紙税の課税標準となる当該契約書の記載金額は、2,000 万円である。\n\n4 当初作成の「土地を 1 億円で譲渡する」旨を記載した土地譲渡契約書の契約金額を変更するために作成する契約書で、「当初の契約書の契約金額を 1,000 万円減額し、9,000 万円とする」旨を記載した変更契約書について、印紙税の課税標準となる当該変更契約書の記載金額は、1,000 万円である。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r5-24",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 24,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-24/",
    "questionText": "【問 24】 不動産取得税に関する次の記述のうち、正しいものはどれか。\n\n1 不動産取得税の徴収については、特別徴収の方法によることができる。\n\n2 不動産取得税は、目的税である。\n\n3 不動産取得税は、不動産の取得に対し、当該不動産所在の市町村及び特別区において、当該不動産の取得者に課する。\n\n4 不動産取得税は、市町村及び特別区に対して、課することができない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-25",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-25/",
    "questionText": "【問 25】 不動産の鑑定評価に関する次の記述のうち、不動産鑑定評価基準によれば、正しいものはどれか。\n\n1 原価法は、価格時点における対象不動産の収益価格を求め、この収益価格について減価修正を行って対象不動産の比準価格を求める手法である。\n\n2 原価法は、対象不動産が建物又は建物及びその敷地である場合には適用することができるが、対象不動産が土地のみである場合においては、いかなる場合も適用することができない。\n\n3 取引事例比較法における取引事例が、特殊事情のある事例である場合、その具体的な状況が判明し、事情補正できるものであっても採用することは許されない。\n\n4 取引事例比較法は、近隣地域若しくは同一需給圏内の類似地域等において対象不動産と類似の不動産の取引が行われている場合又は同一需給圏内の代替競争不動産の取引が行われている場合に有効である。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-26",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 26,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-26/",
    "questionText": "【問 26】 宅地建物取引業法第 37 条の規定により交付すべき書面に記載すべき事項を電磁的方法により提供すること（以下この問において「37 条書面の電磁的方法による提供」という。）に関する次の記述のうち、正しいものはいくつあるか。ア 宅地建物取引業者が自ら売主として締結する売買契約において、当該契約の相手方から宅地建物取引業法施行令第 3 条の 4 第 1 項に規定する承諾を得なければ、37 条書面の電磁的方法による提供をすることができない。イ 宅地建物取引業者が媒介業者として関与する売買契約について、宅地建物取引業法施行令第 3 条の 4 第 1 項に規定する承諾を取得するための通知の中に宅地建物取引士を明示しておけば、37 条書面の電磁的方法による提供において提供に係る宅地建物取引士を明示する必要はない。ウ 宅地建物取引業者が自ら売主として締結する売買契約において、37 条書面の電磁的方法による提供を行う場合、当該提供されたファイルへの記録を取引の相手方が出力することにより書面を作成できるものでなければならない。エ 宅地建物取引業者が媒介業者として関与する建物賃貸借契約について、37 条書面の電磁的方法による提供を行う場合、当該提供するファイルに記録された記載事項について、改変が行われていないかどうかを確認することができる措置を講じなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-27",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 27,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-27/",
    "questionText": "【問 27】 宅地建物取引業法第 34 条の 2 第 1 項第 4 号に規定する建物状況調査（以下この問において「建物状況調査」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 建物状況調査とは、建物の構造耐力上主要な部分又は雨水の浸入を防止する部分として国土交通省令で定めるものの状況の調査であって、経年変化その他の建物に生じる事象に関する知識及び能力を有する者として国土交通省令で定める者が実施するものをいう。\n\n2 宅地建物取引業者が建物状況調査を実施する者のあっせんを行う場合、建物状況調査を実施する者は建築士法第 2 条第 1 項に規定する建築士であって国土交通大臣が定める講習を修了した者でなければならない。\n\n3 既存住宅の売買の媒介を行う宅地建物取引業者が売主に対して建物状況調査を実施する者のあっせんを行った場合、宅地建物取引業者は売主から報酬とは別にあっせんに係る料金を受領することはできない。\n\n4 既存住宅の貸借の媒介を行う宅地建物取引業者は、宅地建物取引業法第 37 条の規定により交付すべき書面に建物の構造耐力上主要な部分等の状況について当事者の双方が確認した事項を記載しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-28",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-28/",
    "questionText": "【問 28】 宅地建物取引業者Ａの業務に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定に違反するものはいくつあるか。ア Ａの従業員Ｂが、Ｃが所有する戸建住宅の買取りを目的とした訪問勧誘をＣに対して行ったところ、Ｃから「契約の意思がないので今後勧誘に来ないでほしい」と言われたことから、後日、Ａは、別の従業員Ｄに同じ目的で訪問勧誘を行わせて、当該勧誘を継続した。イ Ａの従業員Ｅは、Ｆが所有する戸建住宅の買取りを目的とした電話勧誘をＦに対して行った際に、不実のことと認識しながら「今後 5 年以内にこの一帯は再開発されるので、急いで売却した方がよい。」と説明した。ウ Ａの従業員Ｇは、Ｈが所有する戸建住宅の買取りを目的とした電話勧誘をＨに対して行おうと考え、23 時頃にＨの自宅に電話をかけ、勧誘を行い、Ｈの私生活の平穏を害し、Ｈを困惑させた。エ Ａは、Ｊとの間でＪが所有する戸建住宅を買い取る売買契約を締結し、法第 37 条の規定に基づく書面をＪに交付したが、Ａの宅地建物取引士に、当該書面に記名のみさせ、押印させることを省略した。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-30",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-30/",
    "questionText": "【問 30】 宅地建物取引業者Ａ（甲県知事免許）の営業保証金に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。なお、Ａは宅地建物取引業保証協会の社員ではないものとする。ア Ａが免許を受けた日から 6 か月以内に甲県知事に営業保証金を供託した旨の届出を行わないとき、甲県知事はその届出をすべき旨の催告をしなければならず、当該催告が到達した日から 1 か月以内にＡが届出を行わないときは、その免許を取り消すことができる。イ Ａは、営業保証金を供託したときは、その供託物受入れの記載のある供託書の写しを添付して、その旨を甲県知事に届け出なければならず、当該届出をした後でなければ、その事業を開始することができない。ウ Ａは、営業保証金が還付され、甲県知事から営業保証金が政令で定める額に不足が生じた旨の通知を受け、その不足額を供託したときは、30 日以内に甲県知事にその旨を届け出なければならない。エ Ａが免許失効に伴い営業保証金を取り戻す際、供託した営業保証金につき還付を受ける権利を有する者に対し、 3 か月を下らない一定期間内に申し出るべき旨を公告し、期間内にその申出がなかった場合でなければ、取り戻すことができない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r5-32",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 32,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-32/",
    "questionText": "【問 32】 宅地建物取引業者が行う届出に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。\n\n1 宅地建物取引業者Ａ（甲県知事免許）が、新たに宅地建物取引業を営む支店を甲県内に設置した場合、Ａはその日から 30 日以内にその旨を甲県知事に届け出なければならない。\n\n2 宅地建物取引業者Ｂ（乙県知事免許）が、宅地建物取引業者ではないＣとの合併により消滅した場合、Ｂを代表する役員であった者は、その日から 30 日以内にその旨を乙県知事に届け出なければならない。\n\n3 宅地建物取引業者Ｄ（丙県知事免許）が、本店における専任の宅地建物取引士Ｅの退職に伴い、新たに専任の宅地建物取引士Ｆを本店に置いた場合、Ｄはその日から 30 日以内にその旨を丙県知事に届け出なければならない。\n\n4 宅地建物取引業者Ｇ（丁県知事免許）が、その業務に関し展示会を丁県内で実施する場合、展示会を実施する場所において売買契約の締結（予約を含む。）又は売買契約の申込みの受付を行うときは、Ｇは展示会での業務を開始する日の 5 日前までに展示会を実施する場所について丁県知事に届け出なければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-33",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-33/",
    "questionText": "【問 33】 宅地建物取引業法第 35 条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。\n\n1 甲宅地を所有する宅地建物取引業者Ａが、乙宅地を所有する宅地建物取引業者ではない個人Ｂと、甲宅地と乙宅地の交換契約を締結するに当たって、Ｂに対して、甲宅地に関する重要事項の説明を行う義務はあるが、乙宅地に関する重要事項の説明を行う義務はない。\n\n2 宅地の売買における当該宅地の引渡しの時期について、重要事項説明において説明しなければならない。\n\n3 宅地建物取引業者が売主となる宅地の売買に関し、売主が買主から受領しようとする金銭のうち、買主への所有権移転の登記以後に受領するものに対して、宅地建物取引業法施行規則第 16 条の 4 に定める保全措置を講ずるかどうかについて、重要事項説明書に記載する必要がある。\n\n4 重要事項説明書の電磁的方法による提供については、重要事項説明を受ける者から電磁的方法でよいと口頭で依頼があった場合、改めて電磁的方法で提供することについて承諾を得る必要はない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r5-34",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 34,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-34/",
    "questionText": "【問 34】 宅地建物取引業者Ａ（消費税課税事業者）は貸主Ｂから建物の貸借の媒介の依頼を受け、宅地建物取引業者Ｃ（消費税課税事業者）は借主Ｄから建物の貸借の媒介の依頼を受け、ＢとＤとの間で、 1 か月分の借賃を 12 万円（消費税等相当額を含まない。）とする賃貸借契約（以下この問において「本件契約」という。）を成立させた場合における次の記述のうち、宅地建物取引業法の規定に違反するものはいくつあるか。ア 本件契約が建物を住居として貸借する契約である場合に、Ｃは、媒介の依頼を受けるに当たってＤから承諾を得ないまま、132,000 円の報酬を受領した。イ ＡはＢから事前に特別な広告の依頼があったので、依頼に基づく大手新聞掲載広告料金に相当する額をＢに請求し、受領した。ウ ＣはＤに対し、賃貸借契約書の作成費を、Ｄから限度額まで受領した媒介報酬の他に請求して受領した。エ 本件契約が建物を事務所として貸借する契約である場合に、報酬として、ＡはＢから132,000 円を、ＣはＤから 132,000 円をそれぞれ受領した。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-35",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 35,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-35/",
    "questionText": "【問 35】 宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者ではない買主Ｂから宅地の買受けの申込みを受けた場合における宅地建物取引業法第 37 条の 2 の規定に基づくいわゆるクーリング・オフに関する次の記述のうち、正しいものはどれか。\n\n1 Ａは、仮設テント張りの案内所でＢから買受けの申込みを受けた際、以後の取引について、その取引に係る書類に関してＢから電磁的方法で提供をすることについての承諾を得た場合、クーリング・オフについて電磁的方法で告げることができる。\n\n2 Ａが、仮設テント張りの案内所でＢから買受けの申込みを受けた場合、Ｂは、クーリング・オフについて告げられた日から 8 日以内に電磁的方法により当該申込みの撤回を申し出れば、申込みの撤回を行うことができる。\n\n3 Ａが、Ａの事務所でＢから買受けの申込みを受けた場合、Ｂは、申込みの日から 8 日以内に電磁的方法により当該申込みの撤回を申し出れば、申込みの撤回を行うことができる。\n\n4 Ａが、売却の媒介を依頼している宅地建物取引業者Ｃの事務所でＢから買受けの申込みを受けた場合、Ｂは、申込みの日から 8 日以内に書面により当該申込みの撤回を申し出ても、申込みの撤回を行うことができない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-36",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-36/",
    "questionText": "【問 36】 次の記述のうち、宅地建物取引業者Ａが行う業務に関して宅地建物取引業法の規定に違反するものはいくつあるか。ア 建物の貸借の媒介に際して、賃借の申込みをした者がその撤回を申し出たので、Ａはかかった諸費用を差し引いて預り金を返還した。イ Ａは、売主としてマンションの売買契約を締結するに際して、買主が手付として必要な額を今すぐには用意できないと申し出たので、手付金の分割払いを買主に提案した。ウ Ａは取引のあったつど、その年月日やその取引に係る宅地又は建物の所在及び面積その他必要な記載事項を帳簿に漏らさず記載し、必要に応じて紙面にその内容を表示できる状態で、電子媒体により帳簿の保存を行っている。エ Ａはアンケート調査を装ってその目的がマンションの売買の勧誘であることを告げずに個人宅を訪問し、マンションの売買の勧誘をした。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-37",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-37/",
    "questionText": "【問 37】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者は、非常勤役員には従業者であることを証する証明書を携帯させる必要はない。\n\n2 宅地建物取引業者は、その事務所ごとに従業者名簿を備えなければならないが、取引の関係者から閲覧の請求があった場合であっても、宅地建物取引業法第 45 条に規定する秘密を守る義務を理由に、閲覧を拒むことができる。\n\n3 宅地建物取引業者の従業者は、宅地の買受けの申込みをした者から請求があった場合には、その者が宅地建物取引業者であっても、その者に従業者であることを証する証明書を提示する必要がある。\n\n4 宅地建物取引業者は、従業者名簿を最終の記載をした日から 5 年間保存しなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-38",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-38/",
    "questionText": "【問 38】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。ア 宅地建物取引業者Ａが、自ら所有する複数の建物について、複数人に対し、反復継続して賃貸する行為は、宅地建物取引業に該当しない。イ 宅地建物取引士とは、宅地建物取引士資格試験に合格し、都道府県知事の登録を受けた者をいう。ウ 建設業者Ｂが、建築請負工事の受注を目的として、業として宅地の売買の媒介を行う行為は、宅地建物取引業に該当しない。エ 宅地建物取引士は、宅地又は建物の取引に係る事務に必要な知識及び能力の維持向上に努めなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-39",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-39/",
    "questionText": "【問 39】 宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者ではない個人Ｂとの間で宅地の売買契約を締結する場合における手付金の保全措置に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。なお、当該契約に係る手付金は保全措置が必要なものとする。\n\n1 Ａは、Ｂから手付金を受領した後に、速やかに手付金の保全措置を講じなければならない。\n\n2 Ａは、手付金の保全措置を保証保険契約を締結することにより講ずる場合、保険期間は保証保険契約が成立した時から宅地建物取引業者が受領した手付金に係る宅地の引渡しまでの期間とすればよい。\n\n3 Ａは、手付金の保全措置を保証保険契約を締結することにより講ずる場合、保険事業者との間において保証保険契約を締結すればよく、保険証券をＢに交付する必要はない。\n\n4 Ａは、手付金の保全措置を保証委託契約を締結することにより講ずるときは、保証委託契約に基づいて銀行等が手付金の返還債務を連帯して保証することを約する書面のＢへの交付に代えて、Ｂの承諾を得ることなく電磁的方法により講ずることができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-40",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 40,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-40/",
    "questionText": "【問 40】 宅地建物取引業者Ａが、ＢからＢ所有の中古住宅の売却の依頼を受け、専任媒介契約（専属専任媒介契約ではないものとする。）を締結した場合に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 Ａは、当該中古住宅について購入の申込みがあったときは、遅滞なく、その旨をＢに報告しなければならないが、Ｂの希望条件を満たさない申込みだとＡが判断した場合については報告する必要はない。\n\n2 Ａは、法第 34 条の 2 第 1 項の規定に基づく書面の交付後、速やかに、Ｂに対し、法第 34条の 2 第 1 項第 4 号に規定する建物状況調査を実施する者のあっせんの有無について確認しなければならない。\n\n3 Ａは、当該中古住宅について法で規定されている事項を、契約締結の日から休業日数を含め 7 日以内に指定流通機構へ登録する義務がある。\n\n4 Ａは、Ｂが他の宅地建物取引業者の媒介又は代理によって売買の契約を成立させたときの措置を法第 34 条の 2 第 1 項の規定に基づく書面に記載しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-41",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 41,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-41/",
    "questionText": "【問 41】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 甲県知事は、宅地建物取引士に対して必要な報告を求めることができるが、その対象は、甲県知事登録の宅地建物取引士であって、適正な事務の遂行を確保するために必要な場合に限られる。\n\n2 宅地建物取引業者Ａ（甲県知事免許）で専任の宅地建物取引士として従事しているＢ（甲県知事登録）が、勤務実態のない宅地建物取引業者Ｃ（乙県知事免許）において、自らが専任の宅地建物取引士である旨の表示がされていることを許した場合には、乙県知事は、Ｂに対し、必要な指示をすることができる。\n\n3 宅地建物取引士が不正の手段により宅地建物取引士証の交付を受けた場合においては、その登録をしている都道府県知事は、情状が特に重いときは、当該宅地建物取引士の登録を消除することができる。\n\n4 都道府県知事は、宅地建物取引士に対して登録消除処分を行ったときは、適切な方法で公告しなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-42",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-42/",
    "questionText": "【問 42】 宅地建物取引業法第 35 条に規定する重要事項の説明に関する次の記述のうち、誤っているものはいくつあるか。ア 宅地建物取引士は、重要事項説明をする場合、取引の相手方から請求されなければ、宅地建物取引士証を相手方に提示する必要はない。イ 売主及び買主が宅地建物取引業者ではない場合、当該取引の媒介業者は、売主及び買主に重要事項説明書を交付し、説明を行わなければならない。ウ 宅地の売買について売主となる宅地建物取引業者は、買主が宅地建物取引業者である場合、重要事項説明書を交付しなければならないが、説明を省略することはできる。エ 宅地建物取引業者である売主は、宅地建物取引業者ではない買主に対して、重要事項として代金並びにその支払時期及び方法を説明しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r5-43",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 43,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-43/",
    "questionText": "【問 43】 宅地建物取引業者Ａが媒介により宅地の売買契約を成立させた場合における宅地建物取引業法第 37 条の規定により交付すべき書面（以下この問において「37 条書面」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 Ａは、買主が宅地建物取引業者であるときは、37 条書面に移転登記の申請時期を記載しなくてもよい。\n\n2 Ａは、37 条書面を売買契約成立前に、各当事者に交付しなければならない。\n\n3 Ａは、37 条書面を作成したときは、専任の宅地建物取引士をして 37 条書面に記名させる必要がある。\n\n4 Ａは、天災その他不可抗力による損害の負担に関する定めがあるときは、その内容を 37条書面に記載しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-44",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-44/",
    "questionText": "【問 44】 宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 保証協会の社員は、自らが取り扱った宅地建物取引業に係る取引の相手方から当該取引に関する苦情について解決の申出が保証協会にあり、保証協会から関係する資料の提出を求められたときは、正当な理由がある場合でなければ、これを拒んではならない。\n\n2 保証協会は、社員がその一部の事務所を廃止したことに伴って弁済業務保証金分担金を当該社員に返還しようとするときは、弁済業務保証金の還付請求権者に対し、一定期間内に認証を受けるため申し出るべき旨の公告を行わなければならない。\n\n3 保証協会は、宅地建物取引業者の相手方から、社員である宅地建物取引業者の取り扱った宅地建物取引業に係る取引に関する損害の還付請求を受けたときは、直ちに弁済業務保証金から返還しなければならない。\n\n4 保証協会は、手付金等保管事業について国土交通大臣の承認を受けた場合、社員が自ら売主となって行う宅地又は建物の売買で、宅地の造成又は建築に関する工事の完了前における買主からの手付金等の受領について、当該事業の対象とすることができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r5-45",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-45/",
    "questionText": "【問 45】 宅地建物取引業者Ａが、自ら売主として、宅地建物取引業者ではない買主Ｂに新築住宅を販売する場合に関する次の記述のうち、特定住宅瑕疵担保責任の履行の確保等に関する法律の規定によれば、正しいものはどれか。\n\n1 Ａが信託会社又は金融機関の信託業務の兼営等に関する法律第 1 条第 1 項の認可を受けた金融機関であって、宅地建物取引業を営むものである場合、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務を負わない。\n\n2 Ａは、住宅販売瑕疵担保保証金の供託をする場合、当該住宅の売買契約を締結するまでに、Ｂに対し供託所の所在地等について、必ず書面を交付して説明しなければならず、買主の承諾を得ても書面の交付に代えて電磁的方法により提供することはできない。\n\n3 Ａは、住宅販売瑕疵担保保証金の供託をする場合、当該住宅の最寄りの供託所へ住宅販売瑕疵担保保証金の供託をしなければならない。\n\n4 ＡＢ間の売買契約において、当該住宅の構造耐力上主要な部分に瑕疵があってもＡが瑕疵担保責任を負わない旨の特約があった場合においても、Ａは住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務を負う。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r5-46",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 機構は、子どもを育成する家庭又は高齢者の家庭（単身の世帯を含む。）に適した良好な居住性能及び居住環境を有する賃貸住宅の建設に必要な資金の貸付けを業務として行っている。\n\n2 機構は、証券化支援事業（買取型）において、新築住宅に対する貸付債権のみを買取りの対象としている。\n\n3 機構は、証券化支援事業（買取型）において、ＺＥＨ（ネット・ゼロ・エネルギーハウス）及び省エネルギー性、耐震性、バリアフリー性、耐久性・可変性に優れた住宅を取得する場合に、貸付金の利率を一定期間引き下げる制度を実施している。\n\n4 機構は、マンション管理組合や区分所有者に対するマンション共用部分の改良に必要な資金の貸付けを業務として行っている。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-47",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 47,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-47/",
    "questionText": "【問 47】 宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。\n\n1 実際には取引する意思がない物件であっても実在するものであれば、当該物件を広告に掲載しても不当表示に問われることはない。\n\n2 直線距離で 50 m 以内に街道が存在する場合、物件名に当該街道の名称を用いることができる。\n\n3 物件の近隣に所在するスーパーマーケットを表示する場合は、物件からの自転車による所要時間を明示しておくことで、徒歩による所要時間を明示する必要がなくなる。\n\n4 一棟リノベーションマンションについては、一般消費者に対し、初めて購入の申込みの勧誘を行う場合であっても、「新発売」との表示を行うことはできない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-49",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 自然堤防の後背湿地側の縁は、砂が緩く堆積していて、地下水位も浅いため、地震時に液状化被害が生じやすい地盤である。\n\n2 谷底低地に軟弱層が厚く堆積している所では、地震動が凝縮されて、震動が小さくなる。\n\n3 1923 年の関東地震の際には、東京の谷底低地で多くの水道管や建物が被害を受けた。\n\n4 大都市の近郊の丘陵地では、丘を削り谷部に盛土し造成宅地が造られたが、盛土造成に際しては、地下水位を下げるため排水施設を設け、締め固める等の必要がある。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r5-50",
    "examId": "r5",
    "year": "令和5年度",
    "label": "2023 / 令和5年度",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2025/03/R5_qestion_answer%E3%80%80.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2023kakomon/r05-50/",
    "questionText": "【問 50】 建物の構造と材料に関する次の記述のうち、最も不適当なものはどれか。\n\n1 鉄筋コンクリート構造は、地震や風の力を受けても、躯体の変形は比較的小さく、耐火性にも富んでいる。\n\n2 鉄筋コンクリート構造は、躯体の断面が大きく、材料の質量が大きいので、建物の自重が大きくなる。\n\n3 鉄筋コンクリート構造では、鉄筋とコンクリートを一体化するには、断面が円形の棒鋼である丸鋼の方が表面に突起をつけた棒鋼である異形棒鋼より、優れている。\n\n4 鉄筋コンクリート構造は、コンクリートが固まって所定の強度が得られるまでに日数がかかり、現場での施工も多いので、工事期間が長くなる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-01",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-1/",
    "questionText": "【問 1】 次の1から4までの記述のうち、民法の規定、判例及び下記判決文によれば、正しいものはどれか。\n\n所有者甲から乙が不動産を買い受け、その登記が未了の間に、丙が当該不動産を甲から二重に買い受け、更に丙から転得者丁が買い受けて登記を完了した場合に、たとい丙が背信的悪意者に当たるとしても、丁は、乙に対する関係で丁自身が背信的悪意者と評価されるのでない限り、当該不動産の所有権取得をもって乙に対抗することができるものと解するのが相当である。\n\n1 所有者AからBが不動産を買い受け、その登記が未了の間に、Cが当該不動産をAから二重に買い受けて登記を完了した場合、Cは、自らが背信的悪意者に該当するときであっても、当該不動産の所有権取得をもってBに対抗することができる。\n\n2 所有者AからBが不動産を買い受け、その登記が未了の間に、背信的悪意者ではないCが当該不動産をAから二重に買い受けた場合、先に買い受けたBは登記が未了であっても当該不動産の所有権取得をもってCに対抗することができる。\n\n3 所有者AからBが不動産を買い受け、その登記が未了の間に、背信的悪意者であるCが当該不動産をAから二重に買い受け、更にCから転得者Dが買い受けて登記を完了した場合、DもBに対する関係で背信的悪意者に該当するときには、Dは当該不動産の所有権取得をもってBに対抗することができない。\n\n4 所有者AからBが不動産を買い受け、その登記が未了の間に、Cが当該不動産をAから二重に買い受け登記を完了した場合、Cが背信的悪意者に該当しなくてもBが登記未了であることにつき悪意であるときには、Cは当該不動産の所有権取得をもってBに対抗することができない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-02",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-2/",
    "questionText": "【問 2】 相続に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 被相続人の生前においては、相続人は、家庭裁判所の許可を受けることにより、遺留分を放棄することができる。\n\n2 家庭裁判所への相続放棄の申述は、被相続人の生前には行うことができない。\n\n3 相続人が遺留分の放棄について家庭裁判所の許可を受けると、当該相続人は、被相続人の遺産を相続する権利を失う。\n\n4 相続人が被相続人の兄弟姉妹である場合、当該相続人には遺留分がない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-03",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-3/",
    "questionText": "【問 3】 制限行為能力者に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 成年後見人は、後見監督人がいる場合には、後見監督人の同意を得なければ、成年被後見人の法律行為を取り消すことができない。\n\n2 相続の放棄は相手方のない単独行為であるから、成年後見人が成年被後見人に代わってこれを行っても、利益相反行為となることはない。\n\n3 成年後見人は成年被後見人の法定代理人である一方、保佐人は被保佐人の行為に対する同意権と取消権を有するが、代理権が付与されることはない。\n\n4 令和4年4月1日からは、成年年齢が18歳となったため、18歳の者は、年齢を理由とする後見人の欠格事由に該当しない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r4-04",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-4/",
    "questionText": "【問 4】 A所有の甲土地にBのCに対する債務を担保するためにCの抵当権（以下この問において「本件抵当権」という。）が設定され、その旨の登記がなされた場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 Aから甲土地を買い受けたDが、Cの請求に応じてその代価を弁済したときは、本件抵当権はDのために消滅する。\n\n2 Cに対抗することができない賃貸借により甲土地を競売手続の開始前から使用するEは、甲土地の競売における買受人Fの買受けの時から6か月を経過するまでは、甲土地をFに引き渡すことを要しない。\n\n3 本件抵当権設定登記後に、甲土地上に乙建物が築造された場合、Cが本件抵当権の実行として競売を申し立てるときには、甲土地とともに乙建物の競売も申し立てなければならない。\n\n4 BがAから甲土地を買い受けた場合、Bは抵当不動産の第三取得者として、本件抵当権について、Cに対して抵当権消滅請求をすることができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r4-05",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 5,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-5/",
    "questionText": "【問 5】 期間の計算に関する次の記述のうち、民法の規定によれば、正しいものはどれか。なお、明記された日付は、日曜日、国民の祝日に関する法律に規定する休日その他の休日には当たらないものとする。\n\n1 令和4年10月17日午前10時に、引渡日を契約締結日から1年後とする不動産の売買契約を締結した場合、令和5年10月16日が引渡日である。\n\n2 令和4年8月31日午前10時に、弁済期限を契約締結日から1か月後とする金銭消費貸借契約を締結した場合、令和4年9月30日の終了をもって弁済期限となる。\n\n3 期間の末日が日曜日、国民の祝日に関する法律に規定する休日その他の休日に当たるときは、その日に取引をしない慣習がある場合に限り、期間はその前日に満了する。\n\n4 令和4年5月30日午前10時に、代金の支払期限を契約締結日から1か月後とする動産の売買契約を締結した場合、令和4年7月1日の終了をもって支払期限となる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-06",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-6/",
    "questionText": "【問 6】 Aを貸主、Bを借主として、A所有の甲土地につき、資材置場とする目的で期間を2年として、AB間で、①賃貸借契約を締結した場合と、②使用貸借契約を締結した場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 Aは、甲土地をBに引き渡す前であれば、①では口頭での契約の場合に限り自由に解除できるのに対し、②では書面で契約を締結している場合も自由に解除できる。\n\n2 Bは、①ではAの承諾がなければ甲土地を適法に転貸することはできないが、②ではAの承諾がなくても甲土地を適法に転貸することができる。\n\n3 Bは、①では期間内に解約する権利を留保しているときには期間内に解約の申入れをし解約することができ、②では期間内に解除する権利を留保していなくてもいつでも解除することができる。\n\n4 甲土地について契約の本旨に反するBの使用によって生じた損害がある場合に、Aが損害賠償を請求するときは、①では甲土地の返還を受けた時から5年以内に請求しなければならないのに対し、②では甲土地の返還を受けた時から1年以内に請求しなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-07",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 7,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-7/",
    "questionText": "【問 7】 不在者Aが、家庭裁判所から失踪宣告を受けた。Aを単独相続したBは相続財産である甲土地をCに売却（以下この問において「本件売買契約」という。）して登記も移転したが、その後、生存していたAの請求によって当該失踪宣告が取り消された。本件売買契約当時に、Aの生存について、(ア) Bが善意でCが善意、(イ) Bが悪意でCが善意、(ウ) Bが善意でCが悪意、(エ) Bが悪意でCが悪意、の4つの場合があり得るが、これらのうち、民法の規定及び判例によれば、Cが本件売買契約に基づき取得した甲土地の所有権をAに対抗できる場合を全て掲げたものとして正しいものはどれか。\n\n1 (ア)、(イ)、（ウ）\n\n2 (ア)、(イ)\n\n3 (ア)、（ウ）\n\n4 (ア)",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r4-08",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 8,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-8/",
    "questionText": "【問 8】 AがB所有の甲土地を建物所有目的でなく利用するための権原が、①地上権である場合と②賃借権である場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。なお、AもBも対抗要件を備えているものとする。\n\n1 ①でも②でも、特約がなくても、BはAに対して、甲土地の使用及び収益に必要な修繕をする義務を負う。\n\n2 CがBに無断でAから当該権原を譲り受け、甲土地を使用しているときは、①でも②でも、BはCに対して、甲土地の明渡しを請求することができる。\n\n3 ①では、Aは当該権原を目的とする抵当権を設定することができるが、②では、Aは当該権原を目的とする抵当権を設定することはできない。\n\n4 Dが甲土地を不法占拠してAの土地利用を妨害している場合、①では、Aは当該権原に基づく妨害排除請求権を行使してDの妨害の排除を求めることができるが、②では、AはDの妨害の排除を求めることはできない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-09",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-9/",
    "questionText": "【問 9】 辞任に関する次の記述のうち、民法の規定によれば、正しいものはいくつあるか。\n\nア 委任によって代理権を授与された者は、報酬を受ける約束をしている場合であっても、いつでも委任契約を解除して代理権を消滅させて、代理人を辞することができる。\n\nイ 親権者は、やむを得ない事由があるときは、法務局に届出を行うことによって、親権を辞することができる。\n\nウ 後見人は、正当な事由があるときは、後見監督人の許可を得て、その任務を辞することができる。\n\nエ 遺言執行者は、正当な事由があるときは、相続人の許可を得て、その任務を辞することができる。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r4-10",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-10/",
    "questionText": "【問 10】 AはBに対し、自己所有の甲土地を売却し、代金と引換えにBに甲土地を引き渡したが、その後にCに対しても甲土地を売却し、代金と引換えにCに甲土地の所有権登記を移転した。この場合におけるBによる甲土地の所有権の時効取得に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 Bが甲土地をDに賃貸し、引き渡したときは、Bは甲土地の占有を失うので、甲土地の所有権を時効取得することはできない。\n\n2 Bが、時効の完成前に甲土地の占有をEに奪われたとしても、Eに対して占有回収の訴えを提起して占有を回復した場合には、Eに占有を奪われていた期間も時効期間に算入される。\n\n3 Bが、甲土地の引渡しを受けた時点で所有の意思を有していたとしても、AC間の売買及びCに対する登記の移転を知ったときは、その時点で所有の意思が認められなくなるので、Bは甲土地を時効により取得することはできない。\n\n4 Bが甲土地の所有権を時効取得した場合、Bは登記を備えなければ、その所有権を時効完成時において所有者であったCに対抗することはできない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-11",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-11/",
    "questionText": "【問 11】 建物の所有を目的とする土地の賃貸借契約（定期借地権及び一時使用目的の借地権となる契約を除く。）に関する次の記述のうち、借地借家法の規定及び判例によれば、正しいものはどれか。\n\n1 借地権の存続期間が満了する前に建物の滅失があった場合において、借地権者が借地権の残存期間を超えて存続すべき建物を築造したときは、その建物を築造することにつき借地権設定者の承諾がない場合でも、借地権の期間の延長の効果が生ずる。\n\n2 転借地権が設定されている場合において、転借地上の建物が滅失したときは、転借地権は消滅し、転借地権者（転借人）は建物を再築することができない。\n\n3 借地上の建物が滅失し、借地権設定者の承諾を得て借地権者が新たに建物を築造するに当たり、借地権設定者が存続期間満了の際における借地の返還確保の目的で、残存期間を超えて存続する建物を築造しない旨の特約を借地権者と結んだとしても、この特約は無効である。\n\n4 借地上の建物所有者が借地権設定者に建物買取請求権を適法に行使した場合、買取代金の支払があるまでは建物の引渡しを拒み得るとともに、これに基づく敷地の占有についても、賃料相当額を支払う必要はない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-12",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-12/",
    "questionText": "【問 12】 Aは、B所有の甲建物（床面積 100m2）につき、居住を目的として、期間 2 年、賃料月額 10 万円と定めた賃貸借契約（以下この問において「本件契約」という。）をBと締結してその日に引渡しを受けた。この場合における次の記述のうち、民法及び借地借家法の規定並びに判例によれば、誤っているものはどれか。\n\n1 BはAに対して、本件契約締結前に、契約の更新がなく、期間の満了により賃貸借が終了する旨を記載した賃貸借契約書を交付して説明すれば、本件契約を借地借家法第 38 条に規定する定期建物賃貸借契約として締結することができる。\n\n2 本件契約が借地借家法第 38 条に規定する定期建物賃貸借契約であるか否かにかかわらず、Aは、甲建物の引渡しを受けてから1 年後に甲建物をBから購入したCに対して、賃借人であることを主張できる。\n\n3 本件契約が借地借家法第 38 条に規定する定期建物賃貸借契約である場合、Aの中途解約を禁止する特約があっても、やむを得ない事情によって甲建物を自己の生活の本拠として使用することが困難になったときは、Aは本件契約の解約の申入れをすることができる。\n\n4 AがBに対して敷金を差し入れている場合、本件契約が期間満了で終了するに当たり、Bは甲建物の返還を受けるまでは、Aに対して敷金を返還する必要はない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r4-14",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 14,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-14/",
    "questionText": "【問 14】 不動産の登記に関する次の記述のうち、誤っているものはどれか。\n\n1 所有権の移転の登記の申請をする場合には、申請人は、法令に別段の定めがある場合を除き、その申請情報と併せて登記原因を証する情報を提供しなければならない。\n\n2 所有権の移転の登記の申請をする場合において、当該申請を登記の申請の代理を業とすることができる代理人によってするときは、登記識別情報を提供することができないことにつき正当な理由があるとみなされるため、登記義務者の登記識別情報を提供することを要しない。\n\n3 所有権の移転の登記の申請をする場合において、登記権利者が登記識別情報の通知を希望しない旨の申出をしたときは、当該登記に係る登記識別情報は通知されない。\n\n4 所有権の移転の登記の申請をする場合において、その登記が完了した際に交付される登記完了証を送付の方法により交付することを求めるときは、その旨及び送付先の住所を申請情報の内容としなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-15",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-15/",
    "questionText": "【問 15】 都市計画法に関する次の記述のうち、誤っているものはどれか。\n\n1 市街化区域については、都市計画に、少なくとも用途地域を定めるものとされている。\n\n2 準都市計画区域については、都市計画に、特別用途地区を定めることができる。\n\n3 高度地区については、都市計画に、建築物の容積率の最高限度又は最低限度を定めるものとされている。\n\n4 工業地域は、主として工業の利便を増進するため定める地域とされている。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-16",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、正しいものはどれか。ただし、この問において条例による特別の定めはないものとし、「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 市街化区域内において、市街地再開発事業の施行として行う 1 ha の開発行為を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n2 区域区分が定められていない都市計画区域内において、博物館法に規定する博物館の建築を目的とした8,000 m2 の開発行為を行おうとする者は、都道府県知事の許可を受けなくてよい。\n\n3 自己の業務の用に供する施設の建築の用に供する目的で行う開発行為にあっては、開発区域内に土砂災害警戒区域等における土砂災害防止対策の推進に関する法律に規定する土砂災害警戒区域内の土地を含んではならない。\n\n4 市街化調整区域内における開発行為について、当該開発行為が開発区域の周辺における市街化を促進するおそれがあるかどうかにかかわらず、都道府県知事は、開発審査会の議を経て開発許可をすることができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-17",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-17/",
    "questionText": "【問 17】 建築基準法（以下この問において「法」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 法の改正により、現に存する建築物が改正後の法の規定に適合しなくなった場合には、当該建築物は違反建築物となり、速やかに改正後の法の規定に適合させなければならない。\n\n2 延べ面積が500m2を超える建築物について、大規模な修繕をしようとする場合、都市計画区域外であれば建築確認を受ける必要はない。\n\n3 地方公共団体は、条例で、建築物の敷地、構造又は建築設備に関して安全上、防火上又は衛生上必要な制限を附加することができる。\n\n4 地方公共団体が、条例で、津波、高潮、出水等による危険の著しい区域を災害危険区域として指定した場合には、災害危険区域内における住居の用に供する建築物の建築は一律に禁止されることとなる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-18",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-18/",
    "questionText": "【問 18】 次の記述のうち、建築基準法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 第一種低層住居専用地域内においては、神社、寺院、教会を建築することはできない。\n\n2 その敷地内に一定の空地を有し、かつ、その敷地面積が一定規模以上である建築物で、特定行政庁が交通上、安全上、防火上及び衛生上支障がなく、かつ、その建蔽率、容積率及び各部分の高さについて総合的な配慮がなされていることにより市街地の環境の整備改善に資すると認めて許可したものの建蔽率、容積率又は各部分の高さは、その許可の範囲内において、関係規定による限度を超えるものとすることができる。\n\n3 法第3章の規定が適用されるに至った際、現に建築物が立ち並んでいる幅員 1.8 m 未満の道で、あらかじめ、建築審査会の同意を得て特定行政庁が指定したものは、同章の規定における道路とみなされる。\n\n4 第一種住居地域内においては、建築物の高さは、10 m又は 12 m のうち当該地域に関する都市計画において定められた建築物の高さの限度を超えてはならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-20",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 20,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-20/",
    "questionText": "【問 20】 次の記述のうち、土地区画整理法の規定及び判例によれば、誤っているものはどれか。\n\n1 土地区画整理組合の設立の認可の公告があった日以後、換地処分の公告がある日までは、施行地区内において、土地区画整理事業の施行の障害となるおそれがある建築物の新築を行おうとする者は、土地区画整理組合の許可を受けなければならない。\n\n2 土地区画整理組合は、定款に別段の定めがある場合においては、換地計画に係る区域の全部について工事が完了する以前においても換地処分をすることができる。\n\n3 仮換地を指定したことにより、使用し、又は収益することができる者のなくなった従前の宅地については、当該宅地を使用し、又は収益することができる者のなくなった時から換地処分の公告がある日までは、施行者が当該宅地を管理する。\n\n4 清算金の徴収又は交付に関する権利義務は、換地処分の公告によって換地についての所有権が確定することと併せて、施行者と換地処分時点の換地所有者との間に確定的に発生するものであり、換地処分後に行われた当該換地の所有権の移転に伴い当然に移転する性質を有するものではない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r4-21",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-21/",
    "questionText": "【問 21】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 農地の賃貸借及び使用貸借は、その登記がなくても農地の引渡しがあったときは、これをもってその後にその農地について所有権を取得した第三者に対抗することができる。\n\n2 法第2条第3項の農地所有適格法人の要件を満たしていない株式会社は、耕作目的で農地を借り入れることはできない。\n\n3 法第4条第1項、第5条第1項の違反について原状回復等の措置に係る命令の対象となる者（違反転用者等）には、当該規定に違反した者又はその一般承継人は含まれるが、当該違反に係る土地について工事を請け負った者は含まれない。\n\n4 法の適用については、土地の面積は、登記簿の地積によることとしているが、登記簿の地積が著しく事実と相違する場合及び登記簿の地積がない場合には、実測に基づき農業委員会が認定したところによる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r4-22",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-22/",
    "questionText": "【問 22】 国土利用計画法第23条の届出（以下この問において「事後届出」という。）に関する次の記述のうち、正しいものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市にあってはその長をいうものとする。\n\n1 都市計画区域外において、A市が所有する面積15,000㎡の土地を宅地建物取引業者Bが購入した場合、Bは事後届出を行わなければならない。\n\n2 事後届出において、土地売買等の契約に係る土地の土地に関する権利の移転又は設定の対価の額については届出事項ではない。\n\n3 市街化区域を除く都市計画区域内において、一団の土地である甲土地（C所有、面積3,500㎡）と乙土地（D所有、面積2,500㎡）を宅地建物取引業者が購入した場合、Eは事後届出を行わなければならない。\n\n4 都道府県知事は、土地利用審査会の意見を聴いて、事後届出をした者に対し、当該事後届出に係る土地の利用目的について必要な変更をすべきことを勧告することができ、勧告を受けた者がその勧告に従わない場合、その勧告に反する土地売買等の契約を取り消すことができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-23",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-23/",
    "questionText": "【問 23】 印紙税に関する次の記述のうち、正しいものはどれか。なお、以下の覚書又は契約書はいずれも書面により作成されたものとする。\n\n1 土地を38,000万円で譲渡することを証した覚書を売主Aと買主Bが作成した場合、本契約書を後日作成することを文書上で明らかにしていれば、当該覚書には印紙税が課されない。\n\n2 一の契約書に甲土地の譲渡契約（譲渡金額6,000万円）と、乙建物の譲渡契約（譲渡金額3,000万円）をそれぞれ区分して記載した場合、印紙税の課税標準となる当該契約書の記載金額は、6,000万円である。\n\n3 当初作成した土地の賃貸借契約書において「契約期間は5年とする」旨の記載がされていた契約期間を変更するために、「契約期間は10年とする」旨を記載した覚書を貸主Cと借主Dが作成した場合、当該覚書には印紙税が課される。\n\n4 駐車場経営者と車両所有者Fが、Fの所有する車両を駐車場としての設備のある土地の特定の区画に駐車させる旨の賃貸借契約書を作成した場合、土地の賃借権の設定に関する契約書として印紙税が課される。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-24",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 24,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-24/",
    "questionText": "【問 24】 固定資産税に関する次の記述のうち、正しいものはどれか。\n\n1 固定資産税の徴収については、特別徴収の方法によらなければならない。\n\n2 土地価格等縦覧帳簿及び家屋価格等縦覧帳簿の縦覧期間は、毎年４月１日から、４月20日又は当該年度の最初の納期限の日のいずれか遅い日以後の日までの間である。\n\n3 固定資産税の賦課期日は、市町村の条例で定めることとされている。\n\n4 固定資産税は、固定資産の所有者に課するのが原則であるが、固定資産が賃借されている場合は、当該固定資産の賃借権者に対して課される。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-25",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-25/",
    "questionText": "【問 25】 地価公示法に関する次の記述のうち、誤っているものはどれか。\n\n1 土地鑑定委員会は、標準地の正常な価格を判定したときは、標準地の単位面積当たりの価格のほか、当該標準地の地積及び形状についても官報で公示しなければならない。\n\n2 正常な価格とは、土地について、自由な取引が行われるとした場合におけるその取引（一定の場合を除く。）において通常成立すると認められる価格をいい、当該土地に建物がある場合には、当該建物が存するものとして通常成立すると認められる価格をいう。\n\n3 公示区域内の土地について鑑定評価を行う場合において、当該土地の正常な価格を求めるときは、公示価格を規準とする必要があり、その際には、当該土地とこれに類似する利用価値を有すると認められる1又は2以上の標準地との位置、地積、環境等の土地の客観的価値に作用する諸要因についての比較を行い、その結果に基づき、当該標準地の公示価格と当該土地の価格との間に均衡を保たせる必要がある。\n\n4 公示区域とは、都市計画法第4条第2項に規定する都市計画区域その他の土地取引が相当程度見込まれるものとして国土交通省令で定める区域のうち、国土利用計画法第12条第1項の規定により指定された規制区域を除いた区域をいう。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-26",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 26,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-26/",
    "questionText": "【問 26】 宅地建物取引業法第3条第1項に規定する事務所（以下この問において「事務所」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 事務所とは、契約締結権限を有する者を置き、継続的に業務を行うことができる施設を有する場所を指すものであるが、商業登記簿に登載されていない営業所又は支店は事務所には該当しない。\n\n2 宅地建物取引業を営まず他の兼業業務のみを営んでいる支店は、事務所には該当しない。\n\n3 宅地建物取引業者は、主たる事務所については、免許証、標識及び国土交通大臣が定めた報酬の額を掲げ、従業者名簿及び帳簿を備え付ける義務を負う。\n\n4 宅地建物取引業者は、その事務所ごとに一定の数の成年者である専任の宅地建物取引士を置かなければならないが、既存の事務所がこれを満たさなくなった場合は、30日以内に必要な措置を執らなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-28",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-28/",
    "questionText": "【問 28】 宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者が、宅地建物取引業者ではない個人から媒介業者の仲介なしに土地付建物を購入する場合、買主である宅地建物取引業者は重要事項説明書を作成しなくても宅地建物取引業法違反とはならない。\n\n2 宅地建物取引業者が、重要事項説明書を作成する際、調査不足のため、重要事項説明書に記載された内容が事実と異なるものとなったが、意図的に事実と異なる内容を記載したものではないため、宅地建物取引業法違反とはならない。\n\n3 宅地建物取引業者は、土地売買の媒介を行う場合、宅地建物取引業者ではない売主に対して契約が成立する前までの間に、宅地建物取引士をして重要事項説明書を交付して説明をさせなければならない。\n\n4 宅地又は建物の取引は権利関係や法令上の制限など取引条件に関する事項が複雑で多岐にわたるため、重要事項説明書は、宅地又は建物の取引の専門的知識を有する宅地建物取引士が作成しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r4-30",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-30/",
    "questionText": "【問 30】 次の記述のうち、宅地建物取引業法（以下この問において「法」という。）及び犯罪による収益の移転防止に関する法律の規定によれば、正しいものはいくつあるか。\n\nア 法第35条第2項の規定による割賦販売とは、代金の全部又は一部について、目的物の引渡し後6か月以上の期間にわたり、かつ、2回以上に分割して受領することを条件として販売することをいう。\n\nイ 犯罪による収益の移転防止に関する法律において、宅地建物取引業のうち、宅地若しくは建物の売買契約の締結又はその代理若しくは媒介が特定取引として規定されている。\n\nウ 宅地建物取引業者は、その従業者に対し、その業務を適正に実施させるため、必要な教育を行うよう努めなければならないと法に定められている。\n\nエ 宅地建物取引業者の使用人その他の従業者は、正当な理由がある場合でなければ、宅地建物取引業の業務を補助したことについて知り得た秘密を他に漏らしてはならないと法に定められている。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-31",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 31,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-31/",
    "questionText": "【問 31】 宅地建物取引業者Aが、BからB所有の土地付建物の売却について媒介の依頼を受けた場合における次の記述のうち、宅地建物取引業法 (以下この問において「法」という。) の規定によれば、正しいものはどれか。\n\n1 Aが、Bと一般媒介契約を締結した場合、AがBに対し当該土地付建物の価額について意見を述べるために行った価額の査定に要した費用をBに請求することはできない。\n\n2 Aは、Bとの間で締結した媒介契約が一般媒介契約である場合には、専任媒介契約の場合とは異なり、法第34条の2第1項の規定に基づく書面に、売買すべき価額を記載する必要はない。\n\n3 Aが、Bとの間で締結した専任媒介契約については、Bからの申出により更新することができ、その後の有効期間については、更新の時から 3 か月を超える内容に定めることができる。\n\n4 Aが、当該土地付建物の購入の媒介をCから依頼され、Cとの間で一般媒介契約を締結した場合、Aは、買主であるCに対しては、必ずしも法第 34 条の 2 第 1 項の規定に基づく書面を交付しなくともよい。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r4-33",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-33/",
    "questionText": "【問 33】 宅地建物取引士に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。\n\nア 宅地建物取引士資格試験は未成年者で受験することができるが、宅地建物取引士の登録は成年に達するまでいかなる場合にも受けることができない。\n\nイ 甲県知事登録の宅地建物取引士が、宅地建物取引業者 (県知事免許) の専任の宅地建物取引士に就任するためには、宅地建物取引士の登録を乙県に移転しなければならない。\n\nウ 丙県知事登録の宅地建物取引士が、事務の禁止の処分を受けた場合、丁県に所在する宅地建物取引業者の事務所の業務に従事しようとするときでも、その禁止の期間が満了するまで、宅地建物取引士の登録の移転を丁県知事に申請することができない。\n\nエ 戊県知事登録の宅地建物取引士が、己県へ登録の移転の申請とともに宅地建物取引士証の交付を申請した場合、己県知事が宅地建物取引士証を交付するときは、戊県で交付された宅地建物取引士証の有効期間が経過するまでの期間を有効期間とする宅地建物取引士証を交付しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-35",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 35,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-35/",
    "questionText": "【問 35】 次の記述のうち、宅地建物取引業法 (以下この問において「法」という。) の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者の従業者である宅地建物取引士は、取引の関係者から事務所で従業者証明書の提示を求められたときは、この証明書に代えて従業者名簿又は宅地建物取引士証を提示することで足りる。\n\n2 宅地建物取引業者Aが所有する甲建物を法人Bに売却するに当たり、Bが宅地建物取引業者であるか否かにかかわらず、AはBに対し、宅地建物取引士をして、法第 35 条の規定に基づく書面を交付し説明をさせなければならない。\n\n3 法人Cが所有する乙建物の個人Dへの賃貸を宅地建物取引業者Eが媒介し、当該賃貸借契約が成立したときは、EはDに対し、宅地建物取引士をして、法第 35 条の規定に基づく書面を交付し説明をさせなければならない。\n\n4 宅地建物取引業者Fが所有する丙宅地を法人Gに売却する契約を締結したとき、Gが宅地建物取引業者であるか否かにかかわらず、FはGに対し、法第 37 条の規定に基づく書面を交付しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r4-36",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-36/",
    "questionText": "【問 36】 宅地建物取引業者が行う宅地建物取引業法第 35 条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 建物の売買の媒介を行う場合、当該建物が既存の住宅であるときは当該建物の検査済証 (宅地建物取引業法施行規則第 16 条の 2 の 3 第 2 号に定めるもの) の保存の状況について説明しなければならず、当該検査済証が存在しない場合はその旨を説明しなければならない。\n\n2 宅地の売買の媒介を行う場合、売買代金の額並びにその支払の時期及び方法について説明しなければならない。\n\n3 建物の貸借の媒介を行う場合、当該建物が、水防法施行規則第 11 条第 1 号の規定により市町村 (特別区を含む。) の長が提供する図面にその位置が表示されている場合には、当該図面が存在していることを説明すれば足りる。\n\n4 自ら売主となって建物の売買契約を締結する場合、当該建物の引渡しの時期について説明しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r4-37",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-37/",
    "questionText": "【問 37】 宅地建物取引業者Aがその業務に関して行う広告に関する次の記述のうち、宅地建物取引業法 (以下この問において「法」という。) の規定によれば、正しいものはいくつあるか。\n\nア Aが未完成の建売住宅を販売する場合、建築基準法第 6 条第 1 項に基づく確認を受けた後、同項の変更の確認の申請書を提出している期間においては、変更の確認を受ける予定であることを表示し、かつ、当初の確認内容を合わせて表示すれば、変更の確認の内容を広告することができる。\n\nイ Aが新築住宅の売買に関する広告をインターネットで行った場合、実際のものより著しく優良又は有利であると人を誤認させるような表示を行ったが、当該広告について問合せや申込みがなかったときは、法第 32 条に定める誇大広告等の禁止の規定に違反しない。\n\nウ Aが一団の宅地の販売について、数回に分けて広告をするときは、そのたびごとに広告へ取引態様の別を明示しなければならず、当該広告を見た者から売買に関する注文を受けたときも、改めて取引態様の別を明示しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-38",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-38/",
    "questionText": "【問 38】 宅地建物取引業者が自ら売主となる宅地の売買契約について、買受けの申込みを喫茶店で行った場合における宅地建物取引業法第 37 条の 2 の規定に基づくいわゆるクーリング・オフに関する次の記述のうち、正しいものはどれか。\n\n1 買受けの申込みをした者が、売買契約締結後、当該宅地の引渡しを受けた場合、クーリング・オフによる当該売買契約の解除を行うことができない。\n\n2 買受けの申込みをした者が宅地建物取引業者であった場合、クーリング・オフについて告げられていなくても、申込みを行った日から起算して 8 日を経過するまでは、書面により買受けの申込みの撤回をすることができる。\n\n3 売主業者の申出により、買受けの申込みをした者の勤務先で売買契約を行った場合、クーリング・オフによる当該売買契約の解除を行うことはできない。\n\n4 クーリング・オフによる売買契約の解除がなされた場合において、宅地建物取引業者は、買受けの申込みをした者に対し、速やかに、当該売買契約の締結に際し受領した手付金その他の金銭を返還しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r4-39",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-39/",
    "questionText": "【問 39】 宅地建物取引業保証協会 (以下この問において「保証協会」という。) に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 保証協会は、弁済業務保証金について弁済を受ける権利を有する者から認証申出書の提出があり、認証に係る事務を処理する場合には、各月ごとに、認証申出書に記載された取引が成立した時期の順序に従ってしなければならない。\n\n2 保証協会は、当該保証協会の社員から弁済業務保証金分担金の納付を受けたときは、その納付を受けた額に相当する額の弁済業務保証金を当該社員の主たる事務所の最寄りの供託所に供託しなければならない。\n\n3 保証協会の社員が弁済業務保証金分担金を納付した後に、新たに事務所を設置したときは、その日から 2 週間以内に保証協会に納付すべき弁済業務保証金分担金について、国債証券をもって充てることができる。\n\n4 宅地建物取引業者と宅地の売買契約を締結した買主 (宅地建物取引業者ではない。) は、当該宅地建物取引業者が保証協会の社員となる前にその取引により生じた債権に関し、当該保証協会が供託した弁済業務保証金について弁済を受ける権利を有する。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r4-42",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-42/",
    "questionText": "【問 42】 宅地建物取引業者Aが、BからB所有の宅地の売却を依頼され、Bと専属専任媒介契約（以下この問において「本件媒介契約」という。）を締結した場合に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 AはBに対して、契約の相手方を探索するために行った措置など本件媒介契約に係る業務の処理状況を 2 週間に 1 回以上報告しなければならない。\n\n2 AがBに対し当該宅地の価額又は評価額について意見を述べるときは、その根拠を明らかにしなければならないが、根拠の明示は口頭でも書面を用いてもどちらでもよい。\n\n3 本件媒介契約の有効期間について、あらかじめBからの書面による申出があるときは、3 か月を超える期間を定めることができる。\n\n4 Aは所定の事項を指定流通機構に登録した場合、Bから引渡しの依頼がなければ、その登録を証する書面をBに引き渡さなくてもよい。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-43",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 43,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-43/",
    "questionText": "【問 43】 宅地建物取引業者Aが、自ら売主として行う売買契約に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。なお、買主は宅地建物取引業者ではないものとする。\n\n1 Aが、宅地又は建物の売買契約に際して手付を受領した場合、その手付がいかなる性質のものであっても、Aが契約の履行に着手するまでの間、買主はその手付を放棄して契約の解除をすることができる。\n\n2 Aが、土地付建物の売買契約を締結する場合において、買主との間で、「売主は、売買物件の引渡しの日から 1 年間に限り当該物件の種類又は品質に関して契約の内容に適合しない場合におけるその不適合を担保する責任を負う」とする旨の特約を設けることができる。\n\n3 販売代金 2,500 万円の宅地について、Aが売買契約の締結を行い、損害賠償の額の予定及び違約金の定めをする場合、その合計額を 500 万円と設定することができる。\n\n4 Aが建物の割賦販売を行った場合、当該建物を買主に引き渡し、かつ、代金の額の 10 分の 3 を超える額の支払を受けた後は、担保の目的で当該建物を譲り受けてはならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-44",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-44/",
    "questionText": "【問 44】 宅地建物取引業法（以下この問において「法」という。）第 37 条の規定により交付すべき書面（以下この問において「37 条書面」という。）に関する次の記述のうち、宅地建物取引業者Aが法の規定に違反するものはどれか。\n\n1 Aは、自ら売主として宅地建物取引業者ではないBとの間で宅地の売買契約を締結した。この際、当該買主の代理として宅地建物取引業者Cが関与していたことから、37 条書面をBに加え、Cにも交付した。\n\n2 Aは、その媒介により建物の貸借の契約を成立させ、37 条書面を借主に交付するに当たり、37 条書面に記名した宅地建物取引士が不在であったことから、宅地建物取引士ではないAの従業員に書面を交付させた。\n\n3 Aは、その媒介により借主Dと建物の貸借の契約を成立させた。この際、借賃以外の金銭の授受に関する定めがあるので、その額や当該金銭の授受の時期だけでなく、当該金銭の授受の目的についても 37 条書面に記載し、Dに交付した。\n\n4 Aは、自ら売主として宅地建物取引業者Eの媒介により、宅地建物取引業者Fと宅地の売買契約を締結した。37 条書面については、A、E、Fの三者で内容を確認した上で各自作成し、交付せずにそれぞれ自ら作成した書類を保管した。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r4-45",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-45/",
    "questionText": "【問 45】 特定住宅瑕疵担保責任の履行の確保等に関する法律に基づく住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者は、自ら売主として宅地建物取引業者である買主との間で新築住宅の売買契約を締結し、その住宅を引き渡す場合、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務を負う。\n\n2 住宅販売瑕疵担保責任保険契約は、新築住宅の引渡し時から 10 年以上有効でなければならないが、当該新築住宅の買主の承諾があれば、当該保険契約に係る保険期間を 5 年間に短縮することができる。\n\n3 自ら売主として新築住宅を販売する宅地建物取引業者は、基準日から3 週間を経過する日までの間において、当該基準日前10 年間に自ら売主となる売買契約に基づき宅地建物取引業者ではない買主に引き渡した新築住宅（住宅販売瑕疵担保責任保険契約に係る新築住宅を除く。）について、住宅販売瑕疵担保保証金の供託をしていなければならない。\n\n4 宅地建物取引業者が住宅販売瑕疵担保保証金の供託をし、その額が、基準日において、販売新築住宅の合計戸数を基礎として算定する基準額を超えることとなった場合、宅地建物取引業法の免許を受けた国土交通大臣又は都道府県知事の承認がなくても、その超過額を取り戻すことができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r4-46",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 機構は、住宅の建設又は購入に必要な資金の貸付けに係る金融機関の貸付債権の譲受けを業務として行っているが、当該住宅の建設又は購入に付随する土地又は借地権の取得に必要な資金については、譲受けの対象としていない。\n\n2 機構は、団体信用生命保険業務において、貸付けを受けた者が死亡した場合のみならず、重度障害となった場合においても、支払われる生命保険の保険金を当該貸付けに係る債務の弁済に充当することができる。\n\n3 証券化支援事業（買取型）において、機構による譲受けの対象となる貸付債権の償還方法には、元利均等の方法であるものに加え、元金均等の方法であるものもある。\n\n4 機構は、証券化支援事業（買取型）において、MBS（資産担保証券）を発行することにより、債券市場（投資家）から資金を調達している。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r4-47",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 47,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-47/",
    "questionText": "【問 47】 宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。\n\n1 物件からスーパーマーケット等の商業施設までの徒歩所要時間は、道路距離 80m につき 1 分間を要するものとして算出し、１分未満の端数が生じたときは、端数を切り捨てて表示しなければならない。\n\n2 インターネット上に掲載した賃貸物件の広告について、掲載直前に契約済みとなっていたとしても、消費者からの問合せに対して既に契約済みであり取引できない旨を説明すれば、不当表示に問われることはない。\n\n3 マンションの管理費について、住戸により管理費の額が異なる場合において、その全ての住宅の管理費を示すことが困難であるときは、最高額のみを表示すればよい。\n\n4 建築条件付土地の取引の広告においては、当該条件の内容、当該条件が成就しなかったときの措置の内容だけでなく、そもそも当該取引の対象が土地であることも明らかにして表示しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r4-49",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 台地の上の浅い谷は、豪雨時には一時的に浸水することがあり、注意を要する。\n\n2 低地は、一般に洪水や地震などに対して強く、防災的見地から住宅地として好ましい。\n\n3 埋立地は、平均海面に対し 4〜5m の比高があり護岸が強固であれば、住宅地としても利用が可能である。\n\n4 国土交通省が運営するハザードマップポータルサイトでは、洪水、土砂災害、高潮、津波のリスク情報などを地図や写真に重ねて表示できる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r4-50",
    "examId": "r4",
    "year": "令和4年度",
    "label": "2022 / 令和4年度",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R4-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2022kakomon/r04-50/",
    "questionText": "【問 50】 建築物の構造に関する次の記述のうち、最も不適当なものはどれか。\n\n1 木構造は、主要構造を木質系材料で構成するものであり、在来軸組構法での主要構造は、一般に軸組、小屋組、床組からなる。\n\n2 在来軸組構法の軸組は、通常、水平材である土台、桁、胴差と、垂直材の柱及び耐力壁からなる。\n\n3 小屋組は、屋根の骨組であり、小屋梁、小屋束、母屋、垂木等の部材を組み合わせた和小屋と、陸梁、束、方杖等の部材で形成するトラス構造の洋小屋がある。\n\n4 軸組に仕上げを施した壁には、真壁と大壁があり、真壁のみで構成する洋風構造と、大壁のみで構成する和風構造があるが、これらを併用する場合はない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-01",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-1/",
    "questionText": "【問 1】 次の1から4までの記述のうち、民法の規定、判例及び下記判決文によれば、正しいものはどれか。\n\n（判決文）\n私力の行使は、原則として法の禁止するところであるが、法律に定める手続によつたのでは、権利に対する違法な侵害に対抗して現状を維持することが不可能又は著しく困難であると認められる緊急やむを得ない特別の事情が存する場合においてのみ、その必要の限度を超えない範囲内で、例外的に許されるものと解することを妨げない。\n\n1 権利に対する違法な侵害に対抗して法律に定める手続によらずに自力救済することは、その必要の限度を超えない範囲内であれば、事情のいかんにかかわらず許される。\n\n2 建物賃貸借契約終了後に当該建物内に家財などの残置物がある場合には、賃貸人の権利に対する違法な侵害であり、賃貸人は賃借人の同意の有無にかかわらず、原則として裁判を行わずに当該残置物を建物内から搬出することができる。\n\n3 建物賃貸借契約の賃借人が賃料を 1 年分以上滞納した場合には、賃貸人の権利を著しく侵害するため、原則として裁判を行わずに、賃貸人は賃借人の同意なく当該建物の鍵とシリンダーを交換して建物内に入れないようにすることができる。\n\n4 裁判を行っていては権利に対する違法な侵害に対抗して現状を維持することが不可能又は著しく困難であると認められる緊急やむを得ない特別の事情が存する場合には、その必要の限度を超えない範囲内で例外的に私力の行使が許される。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-02",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-2/",
    "questionText": "【問 2】 相隣関係に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 土地の所有者は、隣地の所有者と共同の費用で、境界標を設けることができる。\n\n2 隣接する土地の境界線上に設けた障壁は、相隣者の共有に属するものと推定される。\n\n3 高地の所有者は、その高地が浸水した場合にこれを乾かすためであっても、公の水流又は下水道に至るまで、低地に水を通過させることはできない。\n\n4 土地の所有者が直接に雨水を隣地に注ぐ構造の屋根を設けた場合、隣地所有者は、その所有権に基づいて妨害排除又は予防の請求をすることができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-03",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-3/",
    "questionText": "【問 3】 成年後見人が、成年被後見人を代理して行う次に掲げる法律行為のうち、民法の規定によれば、家庭裁判所の許可を得なければ代理して行うことができないものはどれか。\n\n1 成年被後見人が所有する乗用車の第三者への売却\n\n2 成年被後見人が所有する成年被後見人の居住の用に供する建物への第三者の抵当権の設定\n\n3 成年被後見人が所有するオフィスビルへの第三者の抵当権の設定\n\n4 成年被後見人が所有する倉庫についての第三者との賃貸借契約の解除",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-04",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-4/",
    "questionText": "【問 4】 いずれも宅地建物取引業者ではない売主Aと買主Bとの間で令和3年7月1日に締結した売買契約に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 BがAに対して手付を交付した場合、Aは、目的物を引き渡すまではいつでも、手付の倍額を現実に提供して売買契約を解除することができる。\n\n2 売買契約の締結と同時に、Aが目的物を買い戻すことができる旨の特約をする場合、買戻しについての期間の合意をしなければ、買戻しの特約自体が無効となる。\n\n3 Bが購入した目的物が第三者Cの所有物であり、Aが売買契約締結時点でそのことを知らなかった場合には、Aは損害を賠償せずに売買契約を解除することができる。\n\n4 目的物の引渡しの時点で目的物が品質に関して契約の内容に適合しないことをAが知っていた場合には、当該不適合に関する請求権が消滅時効にかかっていない限り、BはAの担保責任を追及することができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-05",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 5,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-5/",
    "questionText": "【問 5】 AがBの代理人として行った行為に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。なお、いずれの行為もBの追認はないものとし、令和3年7月 1 日以降になされたものとする。\n\n1 AがBの代理人として第三者の利益を図る目的で代理権の範囲内の行為をした場合、相手方Cがその目的を知っていたとしても、AC間の法律行為の効果はBに帰属する。\n\n2 BがAに代理権を与えていないにもかかわらず代理権を与えた旨をCに表示し、Aが当該代理権の範囲内の行為をした場合、CがAに代理権がないことを知っていたとしても、Bはその責任を負わなければならない。\n\n3 AがBから何ら代理権を与えられていないにもかかわらずBの代理人と詐称してCとの間で法律行為をし、CがAにBの代理権があると信じた場合であっても、原則としてその法律行為の効果はBに帰属しない。\n\n4 BがAに与えた代理権が消滅した後にAが行った代理権の範囲内の行為について、相手方Cが過失によって代理権消滅の事実を知らなかった場合でも、Bはその責任を負わなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-06",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-6/",
    "questionText": "【問 6】 不動産に関する物権変動の対抗要件に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 不動産の所有権がAからB、BからC、CからDと転々譲渡された場合、Aは、Dと対抗関係にある第三者に該当する。\n\n2 土地の賃借人として当該土地上に登記ある建物を所有する者は、当該土地の所有権を新たに取得した者と対抗関係にある第三者に該当する。\n\n3 第三者のなした登記後に時効が完成して不動産の所有権を取得した者は、当該第三者に対して、登記を備えなくても、時効取得をもって対抗することができる。\n\n4 共同相続財産につき、相続人の一人から相続財産に属する不動産につき所有権の全部の譲渡を受けて移転登記を備えた第三者に対して、他の共同相続人は、自己の持分を登記なくして対抗することができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_12-07",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 7,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-7/",
    "questionText": "【問 7】 令和3年7月1日になされた遺言に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 自筆証書によって遺言をする場合、遺言者は、その全文、日付及び氏名を自書して押印しなければならないが、これに添付する相続財産の目録については、遺言者が毎葉に署名押印すれば、自書でないものも認められる。\n\n2 公正証書遺言の作成には、証人 2 人以上の立会いが必要であるが、推定相続人は、未成年者でなくとも、証人となることができない。\n\n3 船舶が遭難した場合、当該船舶中にいて死亡の危急に迫った者は、証人 2 人以上の立会いがあれば、口頭で遺言をすることができる。\n\n4 遺贈義務者が、遺贈の義務を履行するため、受遺者に対し、相当の期間を定めて遺贈の承認をすべき旨の催告をした場合、受遺者がその期間内に意思表示をしないときは、遺贈を放棄したものとみなされる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-08",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 8,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-8/",
    "questionText": "【問 8】 AはBに対して、Aが所有する甲土地を 1,000 万円で売却したい旨の申込みを郵便で令和3年7月1日に発信した (以下この問において「本件申込み」という。) が、本件申込みがBに到達する前にAが死亡した場合における次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 Bが承諾の通知を発する前に、BがAの死亡を知ったとしても、本件申込みは効力を失わない。\n\n2 Aが、本件申込みにおいて、自己が死亡した場合には申込みの効力を失う旨の意思表示をしていたときには、BがAの死亡を知らないとしても本件申込みは効力を失う。\n\n3 本件申込みが効力を失わない場合、本件申込みに承諾をなすべき期間及び撤回をする権利についての記載がなかったときは、Aの相続人は、本件申込みをいつでも撤回することができる。\n\n4 本件申込みが効力を失わない場合、Bが承諾の意思表示を発信した時点で甲土地の売買契約が成立する。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-09",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-9/",
    "questionText": "【問 9】 AがBに対してA所有の甲建物を令和3年7月1日に①売却した場合と②賃貸した場合についての次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 ①と②の契約が解除された場合、①ではBは甲建物を使用収益した利益をAに償還する必要があるのに対し、②では将来に向かって解除の効力が生じるのでAは解除までの期間の賃料をBに返還する必要はない。\n\n2 ①ではBはAの承諾を得ずにCに甲建物を賃貸することができ、②ではBはAの承諾を得なければ甲建物をCに転貸することはできない。\n\n3 甲建物をDが不法占拠している場合、①ではBは甲建物の所有権移転登記を備えていなければ所有権をDに対抗できず、②ではBは甲建物につき賃借権の登記を備えていれば賃借権をDに対抗することができる。\n\n4 ①と②の契約締結後、甲建物の引渡し前に、甲建物がEの放火で全焼した場合、①ではBはAに対する売買代金の支払を拒むことができ、②ではBとAとの間の賃貸借契約は終了する。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-10",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-10/",
    "questionText": "【問 10】 Aは、Bからの借入金の担保として、A所有の甲建物に第一順位の抵当権 (以下この問において「本件抵当権」という。) を設定し、その登記を行った。AC間にCを賃借人とする甲建物の一時使用目的ではない賃貸借契約がある場合に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、正しいものはどれか。\n\n1 本件抵当権設定登記後にAC間の賃貸借契約が締結され、AのBに対する借入金の返済が債務不履行となった場合、Bは抵当権に基づき、AがCに対して有している賃料債権を差し押さえることができる。\n\n2 Cが本件抵当権設定登記より前に賃貸借契約に基づき甲建物の引渡しを受けていたとしても、AC間の賃貸借契約の期間を定めていない場合には、Cの賃借権は甲建物の競売による買受人に対抗することができない。\n\n3 本件抵当権設定登記後にAC間で賃貸借契約を締結し、その後抵当権に基づく競売手続による買受けがなされた場合、買受けから賃貸借契約の期間満了までの期間が 1 年であったときは、Cは甲建物の競売における買受人に対し、期間満了までは甲建物を引き渡す必要はない。\n\n4 Cが本件抵当権設定登記より前に賃貸借契約に基づき甲建物の引渡しを受けていたとしても、Cは、甲建物の競売による買受人に対し、買受人の買受けの時から 1 年を経過した時点で甲建物を買受人に引き渡さなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_12-11",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-11/",
    "questionText": "【問 11】 次の記述のうち、借地借家法の規定及び判例によれば、正しいものはどれか。\n\n1 借地権の存続期間を契約で30 年と定めた場合には、当事者が借地契約を更新する際、その期間を更新の日から 30 年以下に定めることはできない。\n\n2 借地権の存続期間が満了する場合、借地権者が契約の更新を請求したとき、その土地上に建物が存在する限り、借地権設定者は異議を述べることができない。\n\n3 借地権者が借地上の建物にのみ登記をしている場合、当該借地権を第三者に対抗することができるのは、当該建物の敷地の表示として記載されている土地のみである。\n\n4 借地権設定者は、弁済期の到来した最後の 3 年分の地代等について、借地権者がその土地において所有する建物の上に先取特権を有する。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-12",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-12/",
    "questionText": "【問 12】 賃貸人Aと賃借人Bとの間で令和3年7月1日に締結した一時使用目的ではない建物賃貸借契約 (以下この問において「本件契約」という。) の終了に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、正しいものはどれか。\n\n1 本件契約に期間を 2 年とする旨の定めがあり、AもBも更新拒絶の通知をしなかったために本件契約が借地借家法に基づき更新される場合、更新後の期間について特段の合意がなければ、更新後の契約期間は2年となる。\n\n2 本件契約において期間の定めがない場合、借地借家法第 28 条に定める正当事由を備えてAが解約の申入れをしたときには、解約の申入れをした日から 6 月を経過した日に、本件契約は終了する。\n\n3 建物の転貸借がされている場合において、本件契約がB (転貸人) の債務不履行によって解除されて終了するときは、Aが転借人に本件契約の終了を通知した日から6 月を経過することによって、転貸借契約は終了する。\n\n4 BがAの同意を得て建物に付加した造作がある場合であっても、本件契約終了時にAに対して借地借家法第 33 条の規定に基づく造作買取請求権を行使することはできない、という特約は無効である。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-13",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 13,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-13/",
    "questionText": "【問 13】 建物の区分所有等に関する法律に関する次の記述のうち、誤っているものはどれか。\n\n1 区分所有者以外の者であって区分所有者の承諾を得て専有部分を占有する者は、会議の目的たる事項につき利害関係を有する場合には、集会に出席して議決権を行使することはできないが、意見を述べることはできる。\n\n2 最初に建物の専有部分の全部を所有する者は、公正証書により、共用部分 (数個の専有部分に通ずる廊下又は階段室その他構造上区分所有者の全員又はその一部の共用に供されるべき建物の部分) の規約を設定することができる。\n\n3 共用部分は、区分所有者全員の共有に属するが、規約に特別の定めがあるときは、管理者を共用部分の所有者と定めることもできる。\n\n4 管理組合法人を設立する場合は、理事を置かなければならず、理事が数人ある場合において、規約に別段の定めがないときは、管理組合法人の事務は、理事の過半数で決する。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-14",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 14,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-14/",
    "questionText": "【問 14】 不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、誤っているものはどれか。\n\n1 表題登記がない土地の所有権を取得した者は、その所有権の取得の日から1 月以内に、表題登記を申請しなければならない。\n\n2 共用部分である旨の登記がある建物について、合併の登記をすることができる。\n\n3 登記官は、表示に関する登記について申請があった場合において、必要があると認めるときは、当該不動産の表示に関する事項を調査することができる。\n\n4 区分建物である建物を新築した場合において、その所有者について相続その他の一般承継があったときは、相続人その他の一般承継人も、被承継人を表題部所有者とする当該建物についての表題登記を申請することができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-15",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-15/",
    "questionText": "【問 15】 都市計画法に関する次の記述のうち、正しいものはどれか。\n\n1 近隣商業地域は、主として商業その他の業務の利便の増進を図りつつ、これと調和した住居の環境を保護するため定める地域とする。\n\n2 準工業地域は、主として環境の悪化をもたらすおそれのない工業の利便の増進を図りつつ、これと調和した住居の環境を保護するため定める地域とする。\n\n3 第一種低層住居専用地域については、都市計画に特定用途制限地域を定めることができる場合がある。\n\n4 第一種住居地域については、都市計画に高層住居誘導地区を定めることができる場合がある。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-16",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、誤っているものはどれか。ただし、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 開発許可を受けようとする者は、開発行為に関する工事の請負人又は請負契約によらないで自らその工事を施行する者を記載した申請書を都道府県知事に提出しなければならない。\n\n2 開発許可を受けた者は、開発行為に関する国土交通省令で定める軽微な変更をしたときは、遅滞なく、その旨を都道府県知事に届け出なければならない。\n\n3 開発許可を受けた者は、開発行為に関する工事の廃止をしようとするときは、都道府県知事の許可を受けなければならない。\n\n4 開発行為に同意していない土地の所有者は、当該開発行為に関する工事完了の公告前に、当該開発許可を受けた開発区域内において、その権利の行使として自己の土地に建築物を建築することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-17",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-17/",
    "questionText": "【問 17】 建築基準法に関する次の記述のうち、誤っているものはどれか。\n\n1 4階建ての建築物の避難階以外の階を劇場の用途に供し、当該階に客席を有する場合には、当該階から避難階又は地上に通ずる 2 以上の直通階段を設けなければならない。\n\n2 床面積の合計が500m2 の映画館の用途に供する建築物を演芸場に用途変更する場合、建築主事又は指定確認検査機関の確認を受ける必要はない。\n\n3 換気設備を設けていない居室には、換気のための窓その他の開口部を設け、その換気に有効な部分の面積は、その居室の床面積に対して 10 分の 1 以上としなければならない。\n\n4 延べ面積が800m2 の百貨店の階段の部分には、排煙設備を設けなくてもよい。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-18",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-18/",
    "questionText": "【問 18】 次の記述のうち、建築基準法 (以下この問において「法」という。) の規定によれば、正しいものはどれか。\n\n1 法第68条の9第1項の規定に基づく条例の制定の際、現に建築物が立ち並んでいる道は、法上の道路とみなされる。\n\n2 都市計画により、容積率の限度が 10 分の 50 とされている準工業地域内において、建築物の高さは、前面道路の反対側の境界線からの水平距離が 35 m 以下の範囲内においては、当該部分から前面道路の反対側の境界線までの水平距離に、1.5 を乗じて得た値以下でなければならない。\n\n3 第一種住居地域においては、畜舎で、その用途に供する部分の床面積が4,000 m2 のものを建築することができる。\n\n4 建築物の敷地が、法第 53 条第 1 項の規定に基づく建築物の建蔽率に関する制限を受ける地域又は区域の二以上にわたる場合においては、当該建築物の敷地の過半の属する地域又は区域における建蔽率に関する制限が、当該建築物に対して適用される。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-20",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 20,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-20/",
    "questionText": "【問 20】 土地区画整理法 (以下この問において「法」という。) に関する次の記述のうち、誤っているものはどれか。\n\n1 土地区画整理組合が施行する土地区画整理事業に係る施行地区内の宅地について借地権のみを有する者は、その土地区画整理組合の組合員とはならない。\n\n2 法において、「公共施設」とは、道路、公園、広場、河川その他政令で定める公共の用に供する施設をいう。\n\n3 施行者は、換地処分の公告があった場合においては、直ちに、その旨を換地計画に係る区域を管轄する登記所に通知しなければならない。\n\n4 市町村が施行する土地区画整理事業では、事業ごとに、市町村に土地区画整理審議会が設置され、換地計画、仮換地の指定及び減価補償金の交付に関する事項について法に定める権限を行使する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_12-21",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-21/",
    "questionText": "【問 21】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 自己所有の農地に住宅を建設する資金を借り入れるため、当該農地に抵当権の設定をする場合には、法第 3 条第 1 項の許可を受ける必要がある。\n\n2 農地の賃貸借の解除については、農地の所有者が、賃借人に対して一方的に解約の申入れを行う場合には、法第 18 条第 1 項の許可を受ける必要がない。\n\n3 登記簿の地目が宅地となっている場合には、現況が農地であっても法の規制の対象とはならない。\n\n4 市街化区域内の自己所有の農地を駐車場に転用するため、あらかじめ農業委員会に届け出た場合には、法第 4 条第 1 項の許可を受ける必要がない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-22",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-22/",
    "questionText": "【問 22】 国土利用計画法（以下この問において「法」という。）第 23 条の届出（以下この問において「事後届出」という。）及び法第 29 条の届出に関する次の記述のうち、正しいものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市にあってはその長をいうものとする。\n\n1 個人Aが所有する都市計画区域外の 12,000㎡ の土地に、個人Bが地上権の設定を受ける契約を締結した場合、Bは一定の場合を除き事後届出を行う必要がある。\n\n2 法第 28 条に基づく遊休土地に係る通知を受けた者は、その通知があった日から起算して 1 月以内に、その通知に係る遊休土地の利用又は処分に関する計画を、都道府県知事に届け出なければならない。\n\n3 市街化調整区域において、宅地建物取引業者Cが所有する面積 5,000㎡ の土地について、宅地建物取引業者Dが一定の計画に従って、2,000㎡ と 3,000㎡ に分割して順次購入した場合、Dは事後届出を行う必要はない。\n\n4 都道府県知事は、事後届出があった場合において、土地の利用目的に係る必要な勧告を行うことができ、その勧告を受けた者がその勧告に従わないときは、その旨及びその内容を公表しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_12-23",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-23/",
    "questionText": "【問 23】 住宅用家屋の所有権の移転登記に係る登録免許税の税率の軽減措置に関する次の記述のうち、正しいものはどれか。\n\n1 この税率の軽減措置の適用対象となる住宅用家屋は、床面積が 100㎡ 以上で、その住宅用家屋を取得した個人の居住の用に供されるものに限られる。\n\n2 この税率の軽減措置の適用対象となる住宅用家屋は、売買又は競落により取得したものに限られる。\n\n3 この税率の軽減措置は、一定の要件を満たせばその住宅用家屋の敷地の用に供されている土地の所有権の移転登記についても適用される。\n\n4 この税率の軽減措置の適用を受けるためには、登記の申請書に、一定の要件を満たす住宅用家屋であることの都道府県知事の証明書を添付しなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-24",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 24,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-24/",
    "questionText": "【問 24】 固定資産税に関する次の記述のうち、正しいものはどれか。\n\n1 市町村長は、固定資産課税台帳に登録された価格等に重大な錯誤があることを発見した場合においては、直ちに決定された価格等を修正して、これを固定資産課税台帳に登録しなければならない。\n\n2 固定資産税の納税義務者は、その納付すべき当該年度の固定資産税に係る固定資産について、固定資産課税台帳に登録された価格について不服があるときは、公示の日から納税通知書の交付を受けた日後 1 月を経過するまでの間において、文書をもって、固定資産評価審査委員会に審査の申出をすることができる。\n\n3 年度の途中において家屋の売買が行われた場合、売主と買主は、当該年度の固定資産税を、固定資産課税台帳に所有者として登録されている日数で按分して納付しなければならない。\n\n4 住宅用地のうち小規模住宅用地に対して課する固定資産税の課税標準は、当該小規模住宅用地に係る固定資産税の課税標準となるべき価格の 3 分の 1 の額である。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_12-25",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-25/",
    "questionText": "【問 25】 地価公示法に関する次の記述のうち、誤っているものはどれか。\n\n1 地価公示法の目的は、都市及びその周辺の地域等において、標準地を選定し、その正常な価格を公示することにより、一般の土地の取引価格に対して指標を与え、及び公共の利益となる事業の用に供する土地に対する適正な補償金の額の算定等に資し、もって適正な地価の形成に寄与することである。\n\n2 不動産鑑定士は、公示区域内の土地について鑑定評価を行う場合において、当該土地の正常な価格を求めるときは、公示価格と実際の取引価格を規準としなければならない。\n\n3 不動産鑑定士は、土地鑑定委員会の求めに応じて標準地の鑑定評価を行うに当たっては、近傍類地の取引価格から算定される推定の価格、近傍類地の地代等から算定される推定の価格及び同等の効用を有する土地の造成に要する推定の費用の額を勘案しなければならない。\n\n4 関係市町村の長は、土地鑑定委員会が公示した事項のうち、当該市町村が属する都道府県に存する標準地に係る部分を記載した書面等を、当該市町村の事務所において一般の閲覧に供しなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-27",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 27,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-27/",
    "questionText": "【問 27】 宅地建物取引業者Aが、自ら売主として、宅地建物取引業者ではないBとの間で建物の売買契約を締結する場合における次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 AB間で建物の売買契約を締結する場合において、当事者の債務の不履行を理由とする契約の解除に伴う損害賠償の額についての特約を、代金の額の 10 分の2 を超えて定めた場合、当該特約は全体として無効となる。\n\n2 AB間で建築工事完了前の建物の売買契約を締結する場合において、AがBから保全措置が必要となる額の手付金を受領する場合、Aは、事前に、国土交通大臣が指定する指定保管機関と手付金等寄託契約を締結し、かつ、当該契約を証する書面を買主に交付した後でなければ、Bからその手付金を受領することができない。\n\n3 AB間で建物の売買契約を締結する場合において、Aは、あらかじめBの承諾を書面で得た場合に限り、売買代金の額の 10 分の 2 を超える額の手付を受領することができる。\n\n4 AB間で建築工事完了前の建物の売買契約を締結する場合において、売買代金の 10 分の2 の額を手付金として定めた場合、Aが手付金の保全措置を講じていないときは、Bは手付金の支払を拒否することができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-28",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-28/",
    "questionText": "【問 28】 宅地建物取引業者A（甲県知事免許）に関する監督処分及び罰則に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはいくつあるか。\n\nア Aが、不正の手段により甲県知事から免許を受けたとき、甲県知事はAに対して当該免許を取り消さなければならない。\n\nイ Aが、法第 3 条の2 第 1 項の規定により付された条件に違反したときは、甲県知事はAの免許を取り消さなければならない。\n\nウ Aが、事務所の公衆の見やすい場所に国土交通大臣が定めた報酬の額を掲示しなかった場合、Aは甲県知事から指示処分を受けることはあるが、罰則の適用を受けることはない。\n\nエ Aの従業者名簿の作成に当たり、法第 48 条第 3 項の規定により記載しなければならない事項についてAの従業者Bが虚偽の記載をした場合、Bは罰則の適用を受けることはあるが、Aは罰則の適用を受けることはない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_12-29",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 29,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-29/",
    "questionText": "【問 29】 次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。\n\n1 宅地建物取引業の免許の有効期間は 5 年であり、免許の更新の申請は、有効期間満了の日の 90 日前から 30 日前までの間に行わなければならない。\n\n2 宅地建物取引業者から免許の更新の申請があった場合において、有効期間の満了の日までにその申請について処分がなされないときは、従前の免許は、有効期間の満了後もその処分がなされるまでの間は、なお効力を有する。\n\n3 個人である宅地建物取引業者A（甲県知事免許）が死亡した場合、Aの相続人は、Aの死亡の日から 30 日以内に、その旨を甲県知事に届け出なければならない。\n\n4 法人である宅地建物取引業者B（県知事免許）が合併により消滅した場合、Bを代表する役員であった者は、その日から 30 日以内に、その旨を乙県知事に届け出なければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-30",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-30/",
    "questionText": "【問 30】 宅地建物取引業者Aがその業務に関して行う広告に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 Aは、中古の建物の売買において、当該建物の所有者から媒介の依頼を受け、取引態様の別を明示せずに広告を掲載したものの、広告を見た者からの問合せはなく、契約成立には至らなかった場合には、当該広告は法第 34 条の規定に違反するものではない。\n\n2 Aは、自ら売主として、建築基準法第 6 条第 1 項の確認の申請中である新築の分譲マンションについて「建築確認申請済」と明示した上で広告を行った。当該広告は、建築確認を終えたものと誤認させるものではないため、法第 33 条の規定に違反するものではない。\n\n3 Aは、顧客を集めるために売る意思のない条件の良い物件を広告し、実際は他の物件を販売しようとしたが注文がなく、売買が成立しなかった場合であっても、監督処分の対象となる。\n\n4 Aは、免許を受けた都道府県知事から宅地建物取引業の免許の取消しを受けたものの、当該免許の取消し前に建物の売買の広告をしていた場合、当該建物の売買契約を締結する目的の範囲内においては、なお宅地建物取引業者とみなされる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-31",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 31,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-31/",
    "questionText": "【問 31】 宅地建物取引業者A (消費税課税事業者) が貸主Bから建物の貸借の代理の依頼を受け、宅地建物取引業者C (消費税課税事業者) が借主Dから媒介の依頼を受け、BとDとの間で賃貸借契約を成立させた場合における次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはいくつあるか。なお、1 か月分の借賃は8万円とし、借賃及び権利金 (権利設定の対価として支払われる金銭であって返還されないものをいう。) には、消費税等相当額を含まないものとする。\n\nア 建物を住居として貸借する場合、Cは、媒介の依頼を受けるに当たってDから承諾を得ているときを除き、44,000 円を超える報酬をDから受領することはできない。\n\nイ 建物を店舗として貸借する場合、AがBから受領する報酬とCがDから受領する報酬の合計額は 88,000 円を超えてはならない。\n\nウ 建物を店舗として貸借する場合、200 万円の権利金の授受があるときは、A及びCが受領できる報酬の額の合計は、110,000 円を超えてはならない。\n\nエ Aは、Bから媒介報酬の限度額まで受領する他に、Bの依頼によらない通常の広告の料金に相当する額を別途受領することができる。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-32",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 32,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-32/",
    "questionText": "【問 32】 宅地建物取引業法第 35 条の2に規定する供託所等に関する説明についての次の記述のうち、正しいものはどれか。なお、特に断りのない限り、宅地建物取引業者の相手方は宅地建物取引業者ではないものとする。\n\n1 宅地建物取引業者は、宅地建物取引業者の相手方に対して供託所等の説明を行う際に書面を交付することは要求されていないが、重要事項説明書に記載して説明することが望ましい。\n\n2 宅地建物取引業者は、宅地建物取引業者が取引の相手方の場合においても、供託所等に係る説明をしなければならない。\n\n3 宅地建物取引業者は、売買、交換又は貸借の契約に際し、契約成立後、速やかに供託所等に係る説明をしなければならない。\n\n4 宅地建物取引業者は、自らが宅地建物取引業保証協会の社員である場合、営業保証金を供託した主たる事務所の最寄りの供託所及び所在地の説明をしなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_12-33",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-33/",
    "questionText": "【問 33】 宅地建物取引業者Aは、BからB所有の宅地の売却について媒介の依頼を受けた。この場合における次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。なお、この問において「専任媒介契約」とは、専属専任媒介契約ではない専任媒介契約をいう。\n\nア AがBとの間で専任媒介契約を締結した場合、AはBに対して、当該専任媒介契約に係る業務の処理状況を 1 週間に 1 回以上報告しなければならない。\n\nイ AがBとの間で専任媒介契約を締結した場合、Bの要望により当該宅地を指定流通機構に登録しない旨の特約をしているときを除き、Aは、当該専任媒介契約締結日から 7 日以内 (休業日数を含まない。) に、指定流通機構に当該宅地の所在等を登録しなければならない。\n\nウ AがBとの間で一般媒介契約を締結した場合、AはBに対して、遅滞なく、宅地建物取引業法第 34 条の2 第1 項の規定に基づく書面を交付しなければならない。\n\nエ AがBとの間で一般媒介契約を締結した場合、AがBに対し当該宅地の価額又は評価額について意見を述べるときは、その根拠を明らかにしなければならないが、根拠の明示は口頭でも書面を用いてもよい。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-34",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 34,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-34/",
    "questionText": "【問 34】 宅地、建物に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地とは、建物の敷地に供せられる土地をいい、道路、公園、河川、広場及び水路に供せられているものは宅地には当たらない。\n\n2 建物の一部の売買の代理を業として行う行為は、宅地建物取引業に当たらない。\n\n3 建物とは、土地に定着する工作物のうち、屋根及び柱若しくは壁を有するものをいうが、学校、病院、官公庁施設等の公共的な施設は建物には当たらない。\n\n4 宅地とは、現に建物の敷地に供せられている土地をいい、その地目、現況によって宅地に当たるか否かを判断する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_12-36",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-36/",
    "questionText": "【問 36】 宅地建物取引業の免許 (以下この問において「免許」という。) に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 法人である宅地建物取引業者A (甲県知事免許) について破産手続開始の決定があった場合、その日から 30 日以内に、Aを代表する役員Bは、その旨を、甲県知事に届け出なければならない。\n\n2 宅地建物取引業者C (県知事免許) が国土交通大臣に免許換えの申請を行っているときは、Cは、取引の相手方に対し、重要事項説明書及び宅地建物取引業法第 37 条の規定により交付すべき書面を交付することができない。\n\n3 宅地建物取引業者D (丙県知事免許) が、免許の更新の申請を怠り、その有効期間が満了した場合、Dは、遅滞なく、丙県知事に免許証を返納しなければならない。\n\n4 宅地建物取引業者E (丁県知事免許) が引き続いて 1 年以上事業を休止したときは、丁県知事は免許を取り消さなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-38",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-38/",
    "questionText": "【問 38】 次の記述のうち、宅地建物取引業法の規定に違反しないものの組合せとして、正しいものはどれか。なお、この問において「建築確認」とは、建築基準法第 6 条第 1 項の確認をいうものとする。\n\nア 宅地建物取引業者Aは、建築確認の済んでいない建築工事完了前の賃貸住宅の貸主Bから当該住宅の貸借の媒介を依頼され、取引態様を媒介と明示して募集広告を行った。\n\nイ 宅地建物取引業者Cは、建築確認の済んでいない建築工事完了前の賃貸住宅の貸主Dから当該住宅の貸借の代理を依頼され、代理人として借主との間で当該住宅の賃貸借契約を締結した。\n\nウ 宅地建物取引業者は、自己の所有に属しない宅地について、自ら売主として、宅地建物取引業者Gと売買契約の予約を締結した。\n\nエ 宅地建物取引業者は、農地の所有者Iと建物の敷地に供するため農地法第 5 条の許可を条件とする売買契約を締結したので、自ら売主として宅地建物取引業者ではない個人と、I所有の農地の売買契約を締結した。\n\n1 ア、イ\n\n2 ア、エ\n\n3 イ、ウ\n\n4 ウ、エ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-39",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-39/",
    "questionText": "【問 39】 宅地建物取引業保証協会(以下この問において「保証協会」という。) に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。\n\n1 保証協会は、その名称、住所又は事務所の所在地を変更しようとするときは、あらかじめ、その旨を国土交通大臣に届け出なければならない。\n\n2 保証協会は、新たに社員が加入したときは、直ちに、その旨を当該社員である宅地建物取引業者が免許を受けた国土交通大臣又は都道府県知事に報告しなければならない。\n\n3 宅地建物取引業者で保証協会に加入しようとする者は、その加入した日から 1 週間以内に、政令で定める額の弁済業務保証金分担金を当該保証協会に納付しなければならない。\n\n4 保証協会の社員は、自らが取り扱った宅地建物取引業に係る取引の相手方から当該取引に関する苦情について解決の申出が保証協会にあり、保証協会から説明を求められたときは、正当な理由がある場合でなければ、これを拒んではならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-42",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-42/",
    "questionText": "【問 42】 宅地建物取引業者が媒介により既存建物の貸借の契約を成立させた場合に関する次の記述のうち、宅地建物取引業法第 37 条の規定により当該貸借の契約当事者に対して交付すべき書面に記載しなければならない事項はいくつあるか。\n\nア 借賃以外の金銭の授受に関する定めがあるときは、その額並びに当該金銭の授受の時期及び目的\n\nイ 設計図書、点検記録その他の建物の建築及び維持保全の状況に関する書面で、国土交通省令で定めるものの保存の状況\n\nウ 契約の解除に関する定めがあるときは、その内容\n\nエ 天災その他不可抗力による損害の負担に関する定めがあるときは、その内容\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_12-43",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 43,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-43/",
    "questionText": "【問 43】 宅地建物取引業者Aが、自ら売主として、宅地建物取引業者ではない法人B又は宅地建物取引業者ではない個人Cをそれぞれ買主とする土地付建物の売買契約を締結する場合において、宅地建物取引業法第 37 条の 2 の規定に基づくいわゆるクーリング・オフに関する次の記述のうち、誤っているものはどれか。なお、この問において、買主は本件売買契約に係る代金の全部を支払ってはおらず、かつ、土地付建物の引渡しを受けていないものとする。\n\n1 Bは、Aの仮設テント張りの案内所で買受けの申込みをし、その 8 日後にAの事務所で契約を締結したが、その際クーリング・オフについて書面の交付を受けずに告げられた。この場合、クーリング・オフについて告げられた日から8 日後には、Bはクーリング・オフによる契約の解除をすることができない。\n\n2 Bは、Aの仮設テント張りの案内所で買受けの申込みをし、その3 日後にAの事務所でクーリング・オフについて書面の交付を受け、告げられた上で契約を締結した。この書面の中で、クーリング・オフによる契約の解除ができる期間を 14 日間としていた場合、B は、その書面を交付された日から 12 日後であっても契約の解除をすることができる。\n\n3 Cは、Aの仮設テント張りの案内所で買受けの申込みをし、その3 日後にAの事務所でクーリング・オフについて書面の交付を受け、告げられた上で契約を締結した。Cは、その書面を受け取った日から起算して8 日目に、Aに対しクーリング・オフによる契約の解除を行う旨の文書を送付し、その 2 日後にAに到達した。この場合、Aは契約の解除を拒むことができない。\n\n4 Cは、Aの事務所で買受けの申込みをし、その翌日、喫茶店で契約を締結したが、Aはクーリング・オフについて告げる書面をCに交付しなかった。この場合、Cはクーリング・オフによる契約の解除をすることができない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_12-44",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-44/",
    "questionText": "【問 44】 宅地建物取引業者が行う宅地建物取引業法第 35 条に規定する重要事項の説明についての次の記述のうち、正しいものはいくつあるか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\nア 賃貸借契約において、取引対象となる宅地又は建物が、水防法施行規則第 11 条第 1 項の規定により市町村（特別区を含む。）の長が提供する図面に当該宅地又は建物の位置が表示されている場合には、当該図面における当該宅地又は建物の所在地を説明しなければならない。\n\nイ 賃貸借契約において、対象となる建物が既存の住宅であるときは、法第34 条の2第1項第 4 号に規定する建物状況調査を実施しているかどうか、及びこれを実施している場合におけるその結果の概要を説明しなければならない。\n\nウ 建物の売買において、その建物の種類又は品質に関して契約の内容に適合しない場合におけるその不適合を担保すべき責任の履行に関し保証保険契約の締結などの措置を講ずるかどうか、また、講ずる場合はその措置の概要を説明しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      2,
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2 / 3"
  },
  {
    "id": "r3_12-45",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-45/",
    "questionText": "【問 45】 宅地建物取引業者Aが、自ら売主として宅地建物取引業者ではない買主Bに新築住宅を販売する場合における次の記述のうち、特定住宅瑕疵担保責任の履行の確保等に関する法律の規定によれば、正しいものはどれか。\n\n1 Aは、Bの承諾を得た場合には、Bに引き渡した新築住宅について、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行わなくてもよい。\n\n2 Aは、基準日に係る住宅販売瑕疵担保保証金の供託及び住宅販売瑕疵担保責任保険契約の締結の状況について届出をしなければ、当該基準日の翌日から起算して 1 月を経過した日以後においては、新たに自ら売主となる新築住宅の売買契約を締結することができない。\n\n3 Aが住宅販売瑕疵担保責任保険契約を締結する場合、保険金額は 2,000 万円以上でなければならないが、B の承諾を得た場合には、保険金額を 500 万円以上の任意の額とすることができる。\n\n4 Aが住宅販売瑕疵担保責任保険契約を締結した場合、住宅の構造耐力上主要な部分又は雨水の浸入を防止する部分の瑕疵があり、Aが相当の期間を経過してもなお特定住宅販売瑕疵担保責任を履行しないときは、Bは住宅販売瑕疵担保責任保険契約の有効期間内であれば、その瑕疵によって生じた損害について保険金を請求することができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-47",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 47,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-47/",
    "questionText": "【問 47】 宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。\n\n1 新築分譲マンションの販売広告において、近隣のデパート、スーパーマーケット、商店等の商業施設は、将来確実に利用できる施設であっても、現に利用できるものでなければ表示することができない。\n\n2 有名な旧跡から直線距離で 1,100 m の地点に所在する新築分譲マンションの名称に当該旧跡の名称を用いることができる。\n\n3 土地の販売価格については、1 区画当たりの価格並びに 1 m2 当たりの価格及び1区画当たりの土地面積のいずれも表示しなければならない。\n\n4 新築分譲マンションの修繕積立金が住戸により異なる場合、広告スペースの関係で全ての住戸の修繕積立金を示すことが困難であっても、修繕積立金について全住戸の平均額で表示することはできない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_12-49",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 沿岸地域における地震時の津波を免れるためには、巨大な防波堤が必要であるが、それには限度があり、完全に津波の襲来を防ぐことはできない。\n\n2 一般に凝灰岩、頁岩、花崗岩（風化してマサ土化したもの）は、崩壊しにくい。\n\n3 低地は、大部分が水田や宅地として利用され、大都市の大部分もここに立地している。\n\n4 平地に乏しい都市の周辺では、住宅地が丘陵や山林に広がり、土砂崩壊等の災害を引き起こす例も多い。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_12-50",
    "examId": "r3_12",
    "year": "令和3年度12月",
    "label": "2021 / 令和3年度12月",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-12kakomon/r032-50/",
    "questionText": "【問 50】 建物の構造に関する次の記述のうち、最も不適当なものはどれか。\n\n1 組積式構造は、耐震性は劣るものの、熱、音などを遮断する性能が優れている。\n\n2 組積式構造を耐震的な構造にするためには、大きな開口部を造ることを避け、壁厚を大きくする必要がある。\n\n3 補強コンクリートブロック造は、壁式構造の一種であり、コンクリートブロック造を鉄筋コンクリートで耐震的に補強改良したものである。\n\n4 補強コンクリートブロック造は、壁量を多く必要とはせず、住宅等の小規模の建物には使用されていない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_10-01",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-1/",
    "questionText": "【問 1】 次の1から4までの記述のうち、民法の規定、判例及び下記判決文によれば、正しいものはどれか。\n\n（判決文）\n賃貸人は、特別の約定のないかぎり、賃借人から家屋明渡を受けた後に前記の敷金残額を返還すれば足りるものと解すべく、したがつて、家屋明渡債務と敷金返還債務とは同時履行の関係にたつものではないと解するのが相当であり、このことは、賃貸借の終了原因が解除（解約）による場合であつても異なるところはないと解すべきである。\n\n1 賃借人の家屋明渡債務が賃貸人の敷金返還債務に対し先履行の関係に立つと解すべき場合、賃借人は賃貸人に対し敷金返還請求権をもって家屋につき留置権を取得する余地はない。\n\n2 賃貸借の終了に伴う賃借人の家屋明渡債務と賃貸人の敷金返還債務とは、1個の双務契約によって生じた対価的債務の関係にあるものといえる。\n\n3 賃貸借における敷金は、賃貸借の終了時点までに生じた債権を担保するものであって、賃貸人は、賃貸借終了後賃借人の家屋の明渡しまでに生じた債権を敷金から控除することはできない。\n\n4 賃貸借の終了に伴う賃借人の家屋明渡債務と賃貸人の敷金返還債務の間に同時履行の関係を肯定することは、家屋の明渡しまでに賃貸人が取得する一切の債権を担保することを目的とする敷金の性質にも適合する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-02",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-2/",
    "questionText": "【問 2】 債務者A、B、Cの3名が、令和3年7月1日に、内部的な負担部分の割合は等しいものとして合意した上で、債権者Dに対して300万円の連帯債務を負った場合に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 DがAに対して裁判上の請求を行ったとしても、特段の合意がなければ、BとCがDに対して負う債務の消滅時効の完成には影響しない。\n\n2 BがDに対して300万円の債権を有している場合、Bが相殺を援用しない間に300万円の支払の請求を受けたCは、BのDに対する債権で相殺する旨の意思表示をすることができる。\n\n3 DがCに対して債務を免除した場合でも、特段の合意がなければ、DはAに対してもBに対しても、弁済期が到来した300万円全額の支払を請求することができる。\n\n4 AとDとの間に更改があったときは、300万円の債権は、全ての連帯債務者の利益のために消滅する。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-03",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-3/",
    "questionText": "【問 3】 個人として事業を営むAが死亡した場合に関する次の記述のうち、民法の規定によれば、誤っているものはいくつあるか。なお、いずれの契約も令和3年7月1日付けで締結されたものとする。\n\nア AがBとの間でB所有建物の清掃に関する準委任契約を締結していた場合、Aの相続人は、Bとの間で特段の合意をしなくても、当該準委任契約に基づく清掃業務を行う義務を負う。\n\nイ AがA所有の建物について賃借人Cとの間で賃貸借契約を締結している期間中にAが死亡した場合、Aの相続人は、Cに賃貸借契約を継続するか否かを相当の期間を定めて催告し、期間内に返答がなければ賃貸借契約をAの死亡を理由に解除することができる。\n\nウ AがA所有の土地について買主Dとの間で売買契約を締結し、当該土地の引渡しと残代金決済の前にAが死亡した場合、当該売買契約は原始的に履行が不能となって無効となる。\n\nエ AがE所有の建物について貸主Eとの間で使用貸借契約を締結していた場合、Aの相続人は、Eとの間で特段の合意をしなくても、当該使用貸借契約の借主の地位を相続して当該建物を使用することができる。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_10-04",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-4/",
    "questionText": "【問 4】 被相続人Aの配偶者Bが、A所有の建物に相続開始の時に居住していたため、遺産分割協議によって配偶者居住権を取得した場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 遺産分割協議でBの配偶者居住権の存続期間を20年と定めた場合、存続期間が満了した時点で配偶者居住権は消滅し、配偶者居住権の延長や更新はできない。\n\n2 Bは、配偶者居住権の存続期間内であれば、居住している建物の所有者の承諾を得ることなく、第三者に当該建物を賃貸することができる。\n\n3 配偶者居住権の存続期間中にBが死亡した場合、Bの相続人CはBの有していた配偶者居住権を相続する。\n\n4 Bが配偶者居住権に基づいて居住している建物が第三者Dに売却された場合、Bは、配偶者居住権の登記がなくてもDに対抗することができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-06",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-6/",
    "questionText": "【問 6】 売買代金債権（以下この問において「債権」という。）の譲渡（令和3年7月1日に譲渡契約が行われたもの）に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 譲渡制限の意思表示がされた債権が譲渡された場合、当該債権譲渡の効力は妨げられないが、債務者は、その債権の全額に相当する金銭を供託することができる。\n\n2 債権が譲渡された場合、その意思表示の時に債権が現に発生していないときは、譲受人は、その後に発生した債権を取得できない。\n\n3 譲渡制限の意思表示がされた債権の譲受人が、その意思表示がされていたことを知っていたときは、債務者は、その債務の履行を拒むことができ、かつ、譲渡人に対する弁済その他の債務を消滅させる事由をもって譲受人に対抗することができる。\n\n4 債権の譲渡は、譲渡人が債務者に通知し、又は債務者が承諾をしなければ、債務者その他の第三者に対抗することができず、その譲渡の通知又は承諾は、確定日付のある証書によってしなければ、債務者以外の第三者に対抗することができない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-07",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 7,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-7/",
    "questionText": "【問 7】 Aを売主、Bを買主として、A所有の甲自動車を50万円で売却する契約（以下この問において「本件契約」という。）が令和3年7月1日に締結された場合に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 Bが甲自動車の引渡しを受けたが、甲自動車のエンジンに契約の内容に適合しない欠陥があることが判明した場合、BはAに対して、甲自動車の修理を請求することができる。\n\n2 Bが甲自動車の引渡しを受けたが、甲自動車に契約の内容に適合しない修理不能な損傷があることが判明した場合、BはAに対して、売買代金の減額を請求することができる。\n\n3 Bが引渡しを受けた甲自動車が故障を起こしたときは、修理が可能か否かにかかわらず、BはAに対して、修理を請求することなく、本件契約の解除をすることができる。\n\n4 甲自動車について、第三者CがA所有ではなくC所有の自動車であると主張しており、Bが所有権を取得できないおそれがある場合、Aが相当の担保を供したときを除き、BはAに対して、売買代金の支払を拒絶することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-08",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 8,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-8/",
    "questionText": "【問 8】 Aが1人で居住する甲建物の保存に瑕疵があったため、令和3年7月1日に甲建物の壁が崩れて通行人Bがケガをした場合（以下この問において「本件事故」という。）における次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 Aが甲建物をCから賃借している場合、Aは甲建物の保存の瑕疵による損害の発生の防止に必要な注意をしなかったとしても、Bに対して不法行為責任を負わない。\n\n2 Aが甲建物を所有している場合、Aは甲建物の保存の瑕疵による損害の発生の防止に必要な注意をしたとしても、Bに対して不法行為責任を負う。\n\n3 本件事故について、AのBに対する不法行為責任が成立する場合、BのAに対する損害賠償請求権は、B又はBの法定代理人が損害又は加害者を知らないときでも、本件事故の時から20年間行使しないときには時効により消滅する。\n\n4 本件事故について、AのBに対する不法行為責任が成立する場合、BのAに対する損害賠償請求権は、B又はBの法定代理人が損害及び加害者を知った時から5年間行使しないときには時効により消滅する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-09",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-9/",
    "questionText": "【問 9】 Aには死亡した夫Bとの間に子Cがおり、Dには離婚した前妻Eとの間に子F及び子Gがいる。Fの親権はEが有し、Gの親権はDが有している。AとDが婚姻した後にDが令和3年7月1日に死亡した場合における法定相続分として、民法の規定によれば、正しいものはどれか。\n\n1 Aが2分の1、Fが4分の1、Gが4分の1\n\n2 Aが2分の1、Cが6分の1、Fが6分の1、Gが6分の1\n\n3 Aが2分の1、Gが2分の1\n\n4 Aが2分の1、Cが4分の1、Gが4分の1",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-10",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-10/",
    "questionText": "【問 10】 AとBとの間で、Aを売主、Bを買主とする、等価値の美術品甲又は乙のいずれか選択によって定められる美術品の売買契約（以下この問において「本件契約」という。）が令和3年7月1日に締結された場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 本件契約において、給付の目的を甲にするか乙にするかについて、第三者Cを選択権者とする合意がなされた場合、Cが選択をすることができないときは、選択権はBに移転する。\n\n2 本件契約において、給付の目的を甲にするか乙にするかについて、Aを選択権者とする合意がなされた後に、Aの失火により甲が全焼したときは、給付の目的物は乙となる。\n\n3 本件契約において、給付の目的を甲にするか乙にするかについての選択権に関する特段の合意がない場合、Bが選択権者となる。\n\n4 本件契約において、給付の目的を甲にするか乙にするかについて、第三者Dを選択権者とする合意がなされた場合、Dが選択権を行使するときは、AとBの両者に対して意思表示をしなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-11",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-11/",
    "questionText": "【問 11】 Aは、所有している甲土地につき、Bとの間で建物所有を目的とする賃貸借契約（以下この問において「借地契約」という。）を締結する予定であるが、期間が満了した時点で、確実に借地契約が終了するようにしたい。この場合に関する次の記述のうち、借地借家法の規定によれば、誤っているものはどれか。\n\n1 事業の用に供する建物を所有する目的とし、期間を60年と定める場合には、契約の更新や建物の築造による存続期間の延長がない旨を書面で合意すれば、公正証書で合意しなくても、その旨を借地契約に定めることができる。\n\n2 居住の用に供する建物を所有することを目的とする場合には、公正証書によって借地契約を締結するときであっても、期間を20年とし契約の更新や建物の築造による存続期間の延長がない旨を借地契約に定めることはできない。\n\n3 居住の用に供する建物を所有することを目的とする場合には、借地契約を書面で行えば、借地権を消滅させるため、借地権の設定から20年が経過した日に甲土地上の建物の所有権を相当の対価でBからAに移転する旨の特約を有効に定めることができる。\n\n4 借地契約がBの臨時設備の設置その他一時使用のためになされることが明らかである場合には、期間を5年と定め、契約の更新や建物の築造による存続期間の延長がない旨を借地契約に定めることができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-12",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-12/",
    "questionText": "【問 12】 Aを賃貸人、Bを賃借人とする甲建物の賃貸借契約（以下この問において「本件契約」という。）が令和3年7月1日に締結された場合に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、正しいものはどれか。\n\n1 本件契約について期間の定めをしなかった場合、AはBに対して、いつでも解約の申入れをすることができ、本件契約は、解約の申入れの日から3月を経過することによって終了する。\n\n2 甲建物がBに引き渡された後、甲建物の所有権がAからCに移転した場合、本件契約の敷金は、他に特段の合意がない限り、BのAに対する未払賃料債務に充当され、残額がCに承継される。\n\n3 甲建物が適法にBからDに転貸されている場合、AがDに対して本件契約が期間満了によって終了する旨の通知をしたときは、建物の転貸借は、その通知がされた日から3月を経過することによって終了する。\n\n4 本件契約が借地借家法第38条の定期建物賃貸借契約で、期間を5年、契約の更新がない旨を定めた場合、Aは、期間満了の1年前から6月前までの間に、Bに対し賃貸借が終了する旨の通知をしなければ、従前の契約と同一条件で契約を更新したものとみなされる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-14",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 14,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-14/",
    "questionText": "【問 14】 不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、正しいものはどれか。\n\n1 所有権の登記の抹消は、所有権の移転の登記がある場合においても、所有権の登記名義人が単独で申請することができる。\n\n2 登記の申請をする者の委任による代理人の権限は、本人の死亡によって消滅する。\n\n3 法人の合併による権利の移転の登記は、登記権利者が単独で申請することができる。\n\n4 信託の登記は、受託者が単独で申請することができない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-15",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-15/",
    "questionText": "【問 15】 都市計画法に関する次の記述のうち、誤っているものはどれか。\n\n1 地区計画については、都市計画に、当該地区計画の目標を定めるよう努めるものとされている。\n\n2 地区計画については、都市計画に、区域の面積を定めるよう努めるものとされている。\n\n3 地区整備計画においては、市街化区域と市街化調整区域との区分の決定の有無を定めることができる。\n\n4 地区整備計画においては、建築物の建蔽率の最高限度を定めることができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-16",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、正しいものはどれか。ただし、許可を要する開発行為の面積については、条例による定めはないものとし、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 市街化区域において、都市公園法に規定する公園施設である建築物の建築を目的とした5,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n2 首都圏整備法に規定する既成市街地内にある市街化区域において、住宅の建築を目的とした800㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n3 準都市計画区域において、商業施設の建築を目的とした2,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n4 区域区分が定められていない都市計画区域において、土地区画整理事業の施行として行う8,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-17",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-17/",
    "questionText": "【問 17】 建築基準法に関する次の記述のうち、正しいものはどれか。\n\n1 居室の内装の仕上げには、ホルムアルデヒドを発散させる建築材料を使用することが認められていない。\n\n2 4階建ての共同住宅の敷地内には、避難階に設けた屋外への出口から道又は公園、広場その他の空地に通ずる幅員が2m以上の通路を設けなければならない。\n\n3 防火地域又は準防火地域内にある建築物で、外壁が防火構造であるものについては、その外壁を隣地境界線に接して設けることができる。\n\n4 建築主は、3階建ての木造の共同住宅を新築する場合において、特定行政庁が、安全上、防火上及び避難上支障がないと認めたときは、検査済証の交付を受ける前においても、仮に、当該共同住宅を使用することができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_10-18",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-18/",
    "questionText": "【問 18】 次の記述のうち、建築基準法の規定によれば、誤っているものはどれか。\n\n1 都市計画により建蔽率の限度が10分の6と定められている近隣商業地域において、準防火地域内にある耐火建築物で、街区の角にある敷地又はこれに準ずる敷地で特定行政庁が指定するものの内にある建築物については、建蔽率の限度が10分の8となる。\n\n2 市町村は、集落地区計画の区域において、用途地域における用途の制限を補完し、当該区域の特性にふさわしい土地利用の増進等の目的を達成するため必要と認める場合においては、国土交通大臣の承認を得て、当該区域における用途制限を緩和することができる。\n\n3 居住環境向上用途誘導地区内においては、公益上必要な一定の建築物を除き、建築物の建蔽率は、居住環境向上用途誘導地区に関する都市計画において建築物の建蔽率の最高限度が定められたときは、当該最高限度以下でなければならない。\n\n4 都市計画区域内のごみ焼却場の用途に供する建築物について、特定行政庁が建築基準法第51条に規定する都市計画審議会の議を経てその敷地の位置が都市計画上支障がないと認めて許可した場合においては、都市計画においてその敷地の位置が決定しているものでなくても、新築することができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-20",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 20,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-20/",
    "questionText": "【問 20】 土地区画整理法に関する次の記述のうち、誤っているものはどれか。\n\n1 換地計画において参加組合員に対して与えるべきものとして定められた宅地は、換地処分の公告があった日の翌日において、当該宅地の所有者となるべきものとして換地計画において定められた参加組合員が取得する。\n\n2 換地計画において換地を定める場合においては、換地及び従前の宅地の位置、地積、土質、水利、利用状況、環境等が照応するように定めなければならない。\n\n3 土地区画整理組合の設立の認可の公告があった日後、換地処分の公告がある日までは、施行地区内において、土地区画整理事業の施行の障害となるおそれがある土地の形質の変更を行おうとする者は、当該土地区画整理組合の許可を受けなければならない。\n\n4 土地区画整理組合の組合員は、組合員の3分の1以上の連署をもって、その代表者から理由を記載した書面を土地区画整理組合に提出して、理事又は監事の解任を請求することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-21",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-21/",
    "questionText": "【問 21】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、誤っているものはどれか。\n\n1 遺産分割によって農地を取得する場合には、法第3条第1項の許可は不要であるが、農業委員会への届出が必要である。\n\n2 法第3条第1項の許可を受けなければならない場合の売買については、その許可を受けずに農地の売買契約を締結しても、所有権移転の効力は生じない。\n\n3 砂利採取法第16条の認可を受けて市街化調整区域内の農地を砂利採取のために一時的に借り受ける場合には、法第5条第1項の許可は不要である。\n\n4 都道府県が市街化調整区域内の農地を取得して病院を建設する場合には、都道府県知事（法第4条第1項に規定する指定市町村の区域内にあってはその長）との協議が成立すれば、法第5条第1項の許可があったものとみなされる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-22",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-22/",
    "questionText": "【問 22】 国土利用計画法第23条の届出（以下この問において「事後届出」という。）に関する次の記述のうち、正しいものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市にあってはその長をいうものとする。\n\n1 土地売買等の契約を締結した場合には、当事者のうち当該契約による権利取得者は、その契約を締結した日の翌日から起算して3週間以内に、事後届出を行わなければならない。\n\n2 都道府県知事は、事後届出をした者に対し、その届出に係る土地に関する権利の移転若しくは設定後における土地の利用目的又は土地に関する権利の移転若しくは設定の対価の額について、当該土地を含む周辺の地域の適正かつ合理的な土地利用を図るために必要な助言をすることができる。\n\n3 事後届出が必要な土地売買等の契約を締結したにもかかわらず、所定の期間内に当該届出をしなかった者は、都道府県知事からの勧告を受けるが、罰則の適用はない。\n\n4 宅地建物取引業者Aが所有する準都市計画区域内の20,000㎡の土地について、10,000㎡をB市に、10,000㎡を宅地建物取引業者Cに売却する契約を締結した場合、B市は事後届出を行う必要はないが、Cは一定の場合を除き事後届出を行う必要がある。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_10-23",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-23/",
    "questionText": "【問 23】 所得税法に関する次の記述のうち、正しいものはどれか。\n\n1 譲渡所得の特別控除額（50万円）は、譲渡益のうち、まず、資産の取得の日以後5年以内にされた譲渡による所得で政令で定めるものに該当しないものに係る部分の金額から控除し、なお控除しきれない特別控除額がある場合には、それ以外の譲渡による所得に係る部分の金額から控除する。\n\n2 譲渡所得の金額の計算上、資産の譲渡に係る総収入金額から控除する資産の取得費には、その資産の取得時に支出した購入代金や購入手数料の金額は含まれるが、その資産の取得後に支出した設備費及び改良費の額は含まれない。\n\n3 建物の全部の所有を目的とする土地の賃借権の設定の対価として支払を受ける権利金の金額が、その土地の価額の10分の5に相当する金額を超えるときは、不動産所得として課税される。\n\n4 居住者がその取得の日以後5年以内に固定資産を譲渡した場合には、譲渡益から譲渡所得の特別控除額（50万円）を控除した後の譲渡所得の金額の2分の1に相当する金額が課税標準とされる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-24",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 24,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-24/",
    "questionText": "【問 24】 不動産取得税に関する次の記述のうち、正しいものはどれか。\n\n1 平成28年に新築された既存住宅（床面積210㎡）を個人が自己の居住のために取得した場合、当該取得に係る不動産取得税の課税標準の算定については、当該住宅の価格から1,200万円が控除される。\n\n2 家屋が新築された日から3年を経過して、なお、当該家屋について最初の使用又は譲渡が行われない場合においては、当該家屋が新築された日から3年を経過した日において家屋の取得がなされたものとみなし、当該家屋の所有者を取得者とみなして、これに対して不動産取得税を課する。\n\n3 不動産取得税は、不動産の取得があった日の翌日から起算して2か月以内に当該不動産の所在する都道府県に申告納付しなければならない。\n\n4 不動産取得税は、不動産を取得するという比較的担税力のある機会に相当の税負担を求める観点から創設されたものであるが、不動産取得税の税率は4%を超えることができない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-25",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-25/",
    "questionText": "【問 25】 不動産の鑑定評価に関する次の記述のうち、不動産鑑定評価基準によれば、誤っているものはどれか。\n\n1 不動産鑑定士の通常の調査の範囲では、対象不動産の価格への影響の程度を判断するための事実の確認が困難な特定の価格形成要因がある場合、鑑定評価書の利用者の利益を害するおそれがないと判断されるときに限り、当該価格形成要因について調査の範囲に係る条件を設定することができる。\n\n2 対象不動産を価格時点において再調達することを想定した場合において必要とされる適正な原価の総額を再調達原価というが、建設資材、工法等の変遷により、対象不動産の再調達原価を求めることが困難な場合には、対象不動産と同等の有用性を持つものに置き換えて求めた原価を再調達原価とみなすものとする。\n\n3 取引事例等に係る取引が特殊な事情を含み、これが当該取引事例等に係る価格等に影響を及ぼしている場合に、適切に補正することを時点修正という。\n\n4 不動産の鑑定評価によって求める賃料は、一般的には正常賃料又は継続賃料であるが、鑑定評価の依頼目的に対応した条件により限定賃料を求めることができる場合がある。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-26",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 26,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-26/",
    "questionText": "【問 26】 宅地建物取引業者Aが、自ら売主として宅地建物取引業者ではない買主Bに対し建物の売却を行う場合における宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。\n\n1 Aは、Bに対し、専任の宅地建物取引士をして説明をさせなければならない。\n\n2 Aは、Bに対し、代金以外に授受される金銭の額だけでなく、当該金銭の授受の目的についても説明しなければならない。\n\n3 Aは、Bに対し、建物の上に存する登記された権利の種類及び内容だけでなく、移転登記の申請の時期についても説明しなければならない。\n\n4 Aは、Bに対し、売買の対象となる建物の引渡しの時期について説明しなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-28",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-28/",
    "questionText": "【問 28】 宅地建物取引士の登録（以下この問において「登録」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引士A（甲県知事登録）が、乙県に所在する宅地建物取引業者の事務所の業務に従事することとなったときは、Aは甲県知事を経由せずに、直接乙県知事に対して登録の移転を申請しなければならない。\n\n2 甲県知事の登録を受けているが宅地建物取引士証の交付を受けていないBが、宅地建物取引士としてすべき事務を行った場合、情状のいかんを問わず、甲県知事はBの登録を消除しなければならない。\n\n3 宅地建物取引士C（甲県知事登録）は、宅地建物取引業者D社を退職し、宅地建物取引業者E社に再就職したが、CはD社及びE社のいずれにおいても専任の宅地建物取引士ではないので、勤務先の変更の登録を申請しなくてもよい。\n\n4 甲県で宅地建物取引士資格試験を受け、合格したFは、乙県に転勤することとなったとしても、登録は甲県知事に申請しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_10-29",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 29,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-29/",
    "questionText": "【問 29】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者は、その事務所ごとに従業者の氏名、従業者証明書番号その他国土交通省令で定める事項を記載した従業者名簿を備えなければならず、当該名簿を最終の記載をした日から5年間保存しなければならない。\n\n2 宅地建物取引業者は、一団の宅地の分譲を行う案内所において宅地の売買の契約の締結を行わない場合、その案内所には国土交通省令で定める標識を掲示しなくてもよい。\n\n3 宅地建物取引業者が、一団の宅地の分譲を行う案内所において宅地の売買の契約の締結を行う場合、その案内所には国土交通大臣が定めた報酬の額を掲示しなければならない。\n\n4 宅地建物取引業者は、事務所以外の継続的に業務を行うことができる施設を有する場所であっても、契約（予約を含む。）を締結せず、かつ、その申込みを受けない場合、当該場所に専任の宅地建物取引士を置く必要はない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_10-30",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-30/",
    "questionText": "【問 30】 宅地建物取引業者がその業務に関して行う広告に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。\n\nア 宅地の販売広告において、宅地に対する将来の利用の制限について、著しく事実に相違する表示をしてはならない。\n\nイ 建物の貸借の媒介において広告を行った場合には、依頼者の依頼の有無にかかわらず、報酬の限度額を超えて、当該広告の料金に相当する額を受領することができる。\n\nウ 複数の区画がある宅地の売買について、数回に分けて広告するときは、最初に行う広告に取引態様の別を明示すれば足り、それ以降は明示する必要はない。\n\nエ 賃貸マンションの貸借に係る媒介の依頼を受け、媒介契約を締結した場合であっても、当該賃貸マンションが建築確認申請中であるときは広告をすることができない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-31",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 31,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-31/",
    "questionText": "【問 31】 宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。\n\n1 保証協会は、当該保証協会の社員である宅地建物取引業者が社員となる前に当該宅地建物取引業者と宅地建物取引業に関し取引をした者の有するその取引により生じた債権に関し弁済業務保証金の還付が行われることにより弁済業務の円滑な運営に支障を生ずるおそれがあると認めるときは、当該社員に対し、担保の提供を求めることができる。\n\n2 保証協会の社員である宅地建物取引業者は、取引の相手方から宅地建物取引業に係る取引に関する苦情について解決の申出が当該保証協会になされ、その解決のために当該保証協会から資料の提出の求めがあったときは、正当な理由がある場合でなければ、これを拒んではならない。\n\n3 保証協会の社員である宅地建物取引業者は、当該宅地建物取引業者と宅地建物取引業に関し取引をした者の有するその取引により生じた債権に関し弁済業務保証金の還付がなされたときは、その日から2週間以内に還付充当金を保証協会に納付しなければならない。\n\n4 還付充当金の未納により保証協会の社員がその地位を失ったときは、保証協会は、直ちにその旨を当該社員であった宅地建物取引業者が免許を受けた国土交通大臣又は都道府県知事に報告しなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-32",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 32,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-32/",
    "questionText": "【問 32】 宅地建物取引業の免許（以下この問において「免許」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。なお、いずれの場合も、その行為を業として営むものとする。\n\n1 A社が、都市計画法に規定する用途地域外の土地であって、ソーラーパネルを設置するための土地の売買を媒介しようとする場合、免許は必要ない。\n\n2 B社が、土地区画整理事業の換地処分により取得した換地を住宅用地として分譲しようとする場合、免許は必要ない。\n\n3 農業協同組合Cが、組合員が所有する宅地の売却の代理をする場合、免許は必要ない。\n\n4 D社が、地方公共団体が定住促進策としてその所有する土地について住宅を建築しようとする個人に売却する取引の媒介をしようとする場合、免許は必要ない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-33",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-33/",
    "questionText": "【問 33】 宅地建物取引業法第35条に規定する重要事項の説明における水防法施行規則第11条第1号の規定により市町村（特別区を含む。以下この問において同じ。）の長が提供する図面（以下この問において「水害ハザードマップ」という。）に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 宅地建物取引業者は、市町村が、取引の対象となる宅地又は建物の位置を含む水害ハザードマップを作成せず、又は印刷物の配布若しくはホームページ等への掲載等をしていないことを確認できた場合は、重要事項説明書にその旨記載し、重要事項説明の際に提示すべき水害ハザードマップが存在しない旨を説明すればよい。\n\n2 宅地建物取引業者は、市町村が取引の対象となる宅地又は建物の位置を含む「洪水」、「雨水出水（内水）」、「高潮」の水害ハザードマップを作成している場合、重要事項説明の際にいずれか1種類の水害ハザードマップを提示すればよい。\n\n3 宅地建物取引業者は、市町村が取引の対象となる宅地又は建物の位置を含む水害ハザードマップを作成している場合、売買又は交換の媒介のときは重要事項説明の際に水害ハザードマップを提示しなければならないが、貸借の媒介のときはその必要はない。\n\n4 宅地建物取引業者は、市町村が取引の対象となる宅地又は建物の位置を含む水害ハザードマップを作成している場合、重要事項説明書に水害ハザードマップを添付すれば足りる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-34",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 34,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-34/",
    "questionText": "【問 34】 宅地建物取引業法の規定に基づく営業保証金に関する次の記述のうち、正しいものはどれか。\n\n1 国土交通大臣から免許を受けた宅地建物取引業者が、営業保証金を主たる事務所のもよりの供託所に供託した場合、当該供託所から国土交通大臣にその旨が通知されるため、当該宅地建物取引業者は国土交通大臣にその旨を届け出る必要はない。\n\n2 宅地建物取引業者と宅地建物取引業に関し取引をした者は、その取引により生じた債権に関し、当該宅地建物取引業者が供託した営業保証金について、その債権の弁済を受ける権利を有するが、取引をした者が宅地建物取引業者に該当する場合は、その権利を有しない。\n\n3 営業保証金は、金銭による供託のほか、有価証券をもって供託することができるが、金銭と有価証券とを併用して供託することはできない。\n\n4 有価証券を営業保証金に充てる場合における当該有価証券の価額は、国債証券の場合はその額面金額の100分の90、地方債証券の場合はその額面金額の100分の80である。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-35",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 35,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-35/",
    "questionText": "【問 35】 宅地建物取引士の登録（以下この問において「登録」という。）及び宅地建物取引士証に関する次の記述のうち、正しいものはいくつあるか。\n\nア 宅地建物取引士（甲県知事登録）が事務禁止処分を受けた場合、宅地建物取引士証を甲県知事に速やかに提出しなければならず、速やかに提出しなかったときは10万円以下の過料に処せられることがある。\n\nイ 宅地建物取引士（甲県知事登録）が宅地建物取引士としての事務禁止処分を受け、その禁止の期間中に本人の申請により登録が消除された場合は、その者が乙県で宅地建物取引士資格試験に合格したとしても、当該期間が満了していないときは、乙県知事の登録を受けることができない。\n\nウ 宅地建物取引士（甲県知事登録）が甲県から乙県に住所を変更したときは、乙県知事に対し、登録の移転の申請をすることができる。\n\nエ 宅地建物取引士（甲県知事登録）が本籍を変更した場合、遅滞なく、甲県知事に変更の登録を申請しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-36",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-36/",
    "questionText": "【問 36】 宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、同法の規定に少なくとも説明しなければならない事項として掲げられていないものはどれか。\n\n1 建物の貸借の媒介を行う場合における、「都市計画法第29条第1項の規定に基づく制限」\n\n2 建物の貸借の媒介を行う場合における、「当該建物について、石綿の使用の有無の調査の結果が記録されているときは、その内容」\n\n3 建物の貸借の媒介を行う場合における、「台所、浴室、便所その他の当該建物の設備の整備の状況」\n\n4 宅地の貸借の媒介を行う場合における、「敷金その他いかなる名義をもって授受されるかを問わず、契約終了時において精算することとされている金銭の精算に関する事項」",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-37",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-37/",
    "questionText": "【問 37】 宅地建物取引業法第35条の規定に基づく重要事項の説明及び同法第37条の規定により交付すべき書面（以下この問において「37条書面」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者は、媒介により区分所有建物の賃貸借契約を成立させた場合、専有部分の用途その他の利用の制限に関する規約においてペットの飼育が禁止されているときは、その旨を重要事項説明書に記載して説明し、37条書面にも記載しなければならない。\n\n2 宅地建物取引業者は、自ら売主となる土地付建物の売買契約において、宅地建物取引業者ではない買主から保全措置を講ずる必要のない金額の手付金を受領する場合、手付金の保全措置を講じないことを、重要事項説明書に記載して説明し、37条書面にも記載しなければならない。\n\n3 宅地建物取引業者は、媒介により建物の敷地に供せられる土地の売買契約を成立させた場合において、当該売買代金以外の金銭の授受に関する定めがあるときは、その額並びに当該金銭の授受の時期及び目的を37条書面に記載しなければならない。\n\n4 宅地建物取引業者は、自ら売主となる土地付建物の売買契約及び自ら貸主となる土地付建物の賃貸借契約のいずれにおいても、37条書面を作成し、その取引の相手方に交付しなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-38",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-38/",
    "questionText": "【問 38】 宅地建物取引業者Aが、宅地建物取引業者BからB所有の建物の売却を依頼され、Bと一般媒介契約（以下この問において「本件契約」という。）を締結した場合に関する次の記述のうち、宅地建物取引業法の規定に違反しないものはいくつあるか。\n\nア 本件契約を締結する際に、Bから有効期間を6か月としたい旨の申出があったが、AとBが協議して、有効期間を3か月とした。\n\nイ 当該物件に係る買受けの申込みはなかったが、AはBに対し本件契約に係る業務の処理状況の報告を口頭により14日に1回以上の頻度で行った。\n\nウ Aは本件契約を締結した後、所定の事項を遅滞なく指定流通機構に登録したが、その登録を証する書面を、登録してから14日後にBに交付した。\n\nエ 本件契約締結後、1年を経過しても当該物件を売却できなかったため、Bは売却をあきらめ、当該物件を賃貸することにした。そこでBはAと当該物件の貸借に係る一般媒介契約を締結したが、当該契約の有効期間を定めなかった。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_10-39",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-39/",
    "questionText": "【問 39】 宅地建物取引業者Aが、自ら売主として、宅地建物取引業者Bの媒介により、宅地建物取引業者ではないCを買主とするマンションの売買契約を締結した場合における宅地建物取引業法第37条の2の規定に基づくいわゆるクーリング・オフについて告げるときに交付すべき書面（以下この問において「告知書面」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 告知書面には、クーリング・オフによる買受けの申込みの撤回又は売買契約の解除があったときは、Aは、その買受けの申込みの撤回又は売買契約の解除に伴う損害賠償又は違約金の支払を請求することができないことを記載しなければならない。\n\n2 告知書面には、クーリング・オフについて告げられた日から起算して8日を経過するまでの間は、Cが当該マンションの引渡しを受け又は代金の全部を支払った場合を除き、書面によりクーリング・オフによる買受けの申込みの撤回又は売買契約の解除を行うことができることを記載しなければならない。\n\n3 告知書面には、Cがクーリング・オフによる売買契約の解除をするときは、その旨を記載した書面がAに到達した時点で、その効力が発生することを記載しなければならない。\n\n4 告知書面には、A及びBの商号又は名称及び住所並びに免許証番号を記載しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-40",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 40,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-40/",
    "questionText": "【問 40】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者は、その業務に関する帳簿を備え、取引のあったつど、その年月日、その取引に係る宅地又は建物の所在及び面積その他国土交通省令で定める事項を記載しなければならないが、支店及び案内所には備え付ける必要はない。\n\n2 成年である宅地建物取引業者は、宅地建物取引業の業務に関し行った行為について、行為能力の制限を理由に取り消すことができる。\n\n3 宅地建物取引業者は、一団の宅地建物の分譲をする場合における当該宅地又は建物の所在する場所に国土交通省令で定める標識を掲示しなければならない。\n\n4 宅地建物取引業者は、業務上取り扱ったことについて知り得た秘密に関し、税務署の職員から質問検査権の規定に基づき質問を受けたときであっても、回答してはならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-42",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-42/",
    "questionText": "【問 42】 宅地建物取引業者Aが、自ら売主として宅地建物取引業者ではないBを買主とする土地付建物の売買契約（代金3,200万円）を締結する場合に関する次の記述のうち、民法及び宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 割賦販売の契約を締結し、当該土地付建物を引き渡した場合、Aは、Bから800万円の賦払金の支払を受けるまでに、当該土地付建物に係る所有権の移転登記をしなければならない。\n\n2 当該土地付建物の工事の完了前に契約を締結した場合、Aは、宅地建物取引業法第41条に定める手付金等の保全措置を講じなくても手付金100万円、中間金60万円を受領することができる。\n\n3 当事者の債務の不履行を理由とする契約の解除に伴う損害賠償の予定額を400万円とし、かつ、違約金の額を240万円とする特約を定めた場合、当該特約は無効となる。\n\n4 当事者の債務の不履行を理由とする契約の解除に伴う損害賠償の予定額を定めていない場合、債務の不履行による損害賠償の請求額は売買代金の額の10分の2を超えてはならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r3_10-43",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 43,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-43/",
    "questionText": "【問 43】 宅地建物取引業者の業務に関する次の記述のうち、宅地建物取引業法の規定に違反するものはいくつあるか。\n\nア マンションの販売に際して、買主が手付として必要な額を持ち合わせていなかったため、手付を分割受領することにより、契約の締結を誘引した。\n\nイ 宅地の売買に際して、相手方が「契約の締結をするかどうか明日まで考えさせてほしい」と申し出たのに対し、事実を歪めて「明日では契約締結できなくなるので、今日しか待てない」と告げた。\n\nウ マンション販売の勧誘を電話で行った際に、勧誘に先立って電話口で宅地建物取引業者の商号又は名称を名乗らずに勧誘を行った。\n\nエ 建物の貸借の媒介に際して、賃貸借契約の申込みをした者がその撤回を申し出たが、物件案内等に経費がかかったため、預り金を返還しなかった。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_10-45",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-45/",
    "questionText": "【問 45】 宅地建物取引業者Aが、自ら売主として宅地建物取引業者ではない買主Bに新築住宅を販売する場合における次の記述のうち、特定住宅瑕疵担保責任の履行の確保等に関する法律の規定によれば、正しいものはどれか。\n\n1 Bが建設業者である場合、Aは、Bに引き渡した新築住宅について、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務を負わない。\n\n2 Aが住宅販売瑕疵担保責任保険契約を締結する場合、当該契約は、BがAから当該新築住宅の引渡しを受けた時から2年以上の期間にわたって有効なものでなければならない。\n\n3 Aが住宅販売瑕疵担保責任保険契約を締結した場合、A及びBは、指定住宅紛争処理機関に特別住宅紛争処理の申請をすることにより、当該新築住宅の瑕疵に関するAとBとの間の紛争について、あっせん、調停又は仲裁を受けることができる。\n\n4 AB間の新築住宅の売買契約において、当該新築住宅の構造耐力上主要な部分に瑕疵があってもAが瑕疵担保責任を負わない旨の特約があった場合、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務はない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r3_10-46",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 機構は、証券化支援事業（買取型）において、賃貸住宅の購入に必要な資金の貸付けに係る金融機関の貸付債権を譲受けの対象としている。\n\n2 機構は、市街地の土地の合理的な利用に寄与する一定の建築物の建設に必要な資金の貸付けを業務として行っている。\n\n3 機構は、証券化支援事業（買取型）において、省エネルギー性に優れた住宅を取得する場合について、貸付金の利率を一定期間引き下げる制度を設けている。\n\n4 機構は、経済事情の変動に伴い、貸付けを受けた者の住宅ローンの元利金の支払が著しく困難になった場合に、償還期間の延長等の貸付条件の変更を行っている。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r3_10-49",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 森林は、木材資源としても重要で、水源涵養、洪水防止等の大きな役割を担っている。\n\n2 活動度の高い火山の火山麓では、火山活動に伴う災害にも留意する必要がある。\n\n3 林相は良好でも、破砕帯や崖錐等の上の杉の植林地は、豪雨に際して崩壊することがある。\n\n4 崖錐や小河川の出口で堆積物の多い所等は、土石流の危険が少ない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r3_10-50",
    "examId": "r3_10",
    "year": "令和3年度10月",
    "label": "2021 / 令和3年度10月",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/12/R3-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2021-10kakomon/r031-50/",
    "questionText": "【問 50】 建物の構造に関する次の記述のうち、最も不適当なものはどれか。\n\n1 鉄骨構造は、主要構造の構造形式にトラス、ラーメン、アーチ等が用いられ、高層建築の骨組に適している。\n\n2 鉄骨構造の床は既製気泡コンクリート板、プレキャストコンクリート板等でつくられる。\n\n3 鉄骨構造は、耐火被覆や鋼材の加工性の問題があり、現在は住宅、店舗等の建物には用いられていない。\n\n4 鉄骨構造は、工場、体育館、倉庫等の単層で大空間の建物に利用されている。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-01",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-1/",
    "questionText": "【問 1】 不法行為（令和2年4月1日以降に行われたもの）に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 建物の建築に携わる設計者や施工者は、建物としての基本的な安全性が欠ける建物を設計し又は建築した場合、設計契約や建築請負契約の当事者に対しても、また、契約関係にない当該建物の居住者に対しても損害賠償責任を負うことがある。\n\n2 被用者が使用者の事業の執行について第三者に損害を与え、第三者に対してその損害を賠償した場合には、被用者は、損害の公平な分担という見地から相当と認められる額について、使用者に対して求償することができる。\n\n3 責任能力がない認知症患者が線路内に立ち入り、列車に衝突して旅客鉄道事業者に損害を与えた場合、当該責任無能力者と同居する配偶者は、法定の監督義務者として損害賠償責任を負う。\n\n4 人の生命又は身体を害する不法行為による損害賠償請求権は、被害者又はその法定代理人が損害及び加害者を知った時から5年間行使しない場合、時効によって消滅する。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-02",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-2/",
    "questionText": "【問 2】 AがBに対して、A所有の甲土地を売却する代理権を令和2年7月1日に授与した場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 Bが自己又は第三者の利益を図る目的で、Aの代理人として甲土地をDに売却した場合、Dがその目的を知り、又は知ることができたときは、Bの代理行為は無権代理とみなされる。\n\n2 BがCの代理人も引き受け、AC双方の代理人として甲土地に係るAC間の売買契約を締結した場合、Aに損害が発生しなければ、Bの代理行為は無権代理とはみなされない。\n\n3 AがBに授与した代理権が消滅した後、BがAの代理人と称して、甲土地をEに売却した場合、AがEに対して甲土地を引き渡す責任を負うことはない。\n\n4 Bが、Aから代理権を授与されていないA所有の乙土地の売却につき、Aの代理人としてFと売買契約を締結した場合、AがFに対して追認の意思表示をすれば、Bの代理行為は追認の時からAに対して効力を生ずる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-03",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-3/",
    "questionText": "【問 3】 親族に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 姻族関係は、離婚した場合及び夫婦の一方が死亡した場合、当然に終了する。\n\n2 離婚に当たり、相手方に有責不法の行為がなければ、他の一方は、相手方に対して財産の分与を請求することができない。\n\n3 未成年者に対して親権を行う者がないときは、家庭裁判所は、検察官の請求によって、親族の中から未成年後見人を選任する。\n\n4 夫婦間で婚姻の届出前に別段の契約をしなかった場合、夫婦のいずれに属するか明らかでない財産は、その共有に属するものと推定される。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-04",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-4/",
    "questionText": "【問 4】 債務不履行に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。なお、債務は令和2年4月1日以降に生じたものとする。\n\n1 債務の履行について不確定期限があるときは、債務者は、その期限が到来したことを知らなくても、期限到来後に履行の請求を受けた時から遅滞の責任を負う。\n\n2 債務の目的が特定物の引渡しである場合、債権者が目的物の引渡しを受けることを理由なく拒否したため、その後の履行の費用が増加したときは、その増加額について、債権者と債務者はそれぞれ半額ずつ負担しなければならない。\n\n3 債務者がその債務について遅滞の責任を負っている間に、当事者双方の責めに帰することができない事由によってその債務の履行が不能となったときは、その履行不能は債務者の責めに帰すべき事由によるものとみなされる。\n\n4 契約に基づく債務の履行が契約の成立時に不能であったとしても、その不能が債務者の責めに帰することができない事由によるものでない限り、債権者は、履行不能によって生じた損害について、債務不履行による損害の賠償を請求することができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-05",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 5,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-5/",
    "questionText": "【問 5】 時効に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。なお、時効の対象となる債権の発生原因は、令和2年4月1日以降に生じたものとする。\n\n1 消滅時効の援用権者である「当事者」とは、権利の消滅について正当な利益を有する者であり、債務者のほか、保証人、物上保証人、第三取得者も含まれる。\n\n2 裁判上の請求をした場合、裁判が終了するまでの間は時効が完成しないが、当該請求を途中で取り下げて権利が確定することなく当該請求が終了した場合には、その終了した時から新たに時効の進行が始まる。\n\n3 権利の承認があったときは、その時から新たに時効の進行が始まるが、権利の承認をするには、相手方の権利についての処分につき行為能力の制限を受けていないことを要しない。\n\n4 夫婦の一方が他方に対して有する権利については、婚姻の解消の時から6箇月を経過するまでの間は、時効が完成しない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-06",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-6/",
    "questionText": "【問 6】 AはBにA所有の甲建物を令和2年7月1日に賃貸し、BはAの承諾を得てCに適法に甲建物を転貸し、Cが甲建物に居住している場合における次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 Aは、Bとの間の賃貸借契約を合意解除した場合、解除の当時Bの債務不履行による解除権を有していたとしても、合意解除したことをもってCに対抗することはできない。\n\n2 Cの用法違反によって甲建物に損害が生じた場合、AはBに対して、甲建物の返還を受けた時から1年以内に損害賠償を請求しなければならない。\n\n3 AがDに甲建物を売却した場合、AD間で特段の合意をしない限り、賃貸人の地位はDに移転する。\n\n4 BがAに約定の賃料を支払わない場合、Cは、Bの債務の範囲を限度として、Aに対して転貸借に基づく債務を直接履行する義務を負い、Bに賃料を前払いしたことをもってAに対抗することはできない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-07",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 7,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-7/",
    "questionText": "【問 7】 Aを売主、Bを買主として、令和2年7月1日に甲土地の売買契約（以下この問において「本件契約」という。）が締結された場合における次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 甲土地の実際の面積が本件契約の売買代金の基礎とした面積より少なかった場合、Bはそのことを知った時から2年以内にその旨をAに通知しなければ、代金の減額を請求することができない。\n\n2 AがBに甲土地の引渡しをすることができなかった場合、その不履行がAの責めに帰することができない事由によるものであるときを除き、BはAに対して、損害賠償の請求をすることができる。\n\n3 Bが売買契約で定めた売買代金の支払期日までに代金を支払わなかった場合、売買契約に特段の定めがない限り、AはBに対して、年5%の割合による遅延損害金を請求することができる。\n\n4 本件契約が、Aの重大な過失による錯誤に基づくものであり、その錯誤が重要なものであるときは、Aは本件契約の無効を主張することができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-08",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 8,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-8/",
    "questionText": "【問 8】 1億2,000万円の財産を有するAが死亡した場合の法定相続分についての次の記述のうち、民法の規定によれば、正しいものの組み合わせはどれか。\n\nア Aの長男の子B及びC、Aの次男の子Dのみが相続人になる場合の法定相続分は、それぞれ4,000万円である。\n\nイ Aの長男の子B及びC、Aの次男の子Dのみが相続人になる場合の法定相続分は、B及びCがそれぞれ3,000万円、Dが6,000万円である。\n\nウ Aの父方の祖父母E及びF、Aの母方の祖母Gのみが相続人になる場合の法定相続分は、それぞれ4,000万円である。\n\nエ Aの父方の祖父母E及びF、Aの母方の祖母Gのみが相続人になる場合の法定相続分は、E及びFがそれぞれ3,000万円、Gが6,000万円である。\n\n1 ア、ウ\n\n2 ア、エ\n\n3 イ、ウ\n\n4 イ、エ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-09",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-9/",
    "questionText": "【問 9】 地役権に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 地役権は、継続的に行使されるもの、又は外形上認識することができるものに限り、時効取得することができる。\n\n2 地役権者は、設定行為で定めた目的に従い、承役地を要役地の便益に供する権利を有する。\n\n3 設定行為又は設定後の契約により、承役地の所有者が自己の費用で地役権の行使のために工作物を設け、又はその修繕をする義務を負担したときは、承役地の所有者の特定承継人もその義務を負担する。\n\n4 要役地の所有権とともに地役権を取得した者が、所有権の取得を承役地の所有者に対抗し得るときは、地役権の取得についても承役地の所有者に対抗することができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-11",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-11/",
    "questionText": "【問 11】 次の記述のうち、借地借家法の規定及び判例によれば、正しいものはどれか。\n\n1 借地権者が借地権の登記をしておらず、当該土地上に所有権の登記がされている建物を所有しているときは、これをもって借地権を第三者に対抗することができるが、建物の表示の登記によっては対抗することができない。\n\n2 借地権者が登記ある建物を火災で滅失したとしても、建物が滅失した日から2年以内に新たな建物を築造すれば、2年を経過した後においても、これをもって借地権を第三者に対抗することができる。\n\n3 土地の賃借人が登記ある建物を所有している場合であっても、その賃借人から当該土地建物を賃借した転借人が対抗力を備えていなければ、当該転借人は転借権を第三者に対抗することができない。\n\n4 借地権者が所有する数棟の建物が一筆の土地上にある場合は、そのうちの一棟について登記があれば、借地権の対抗力が当該土地全部に及ぶ。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-12",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-12/",
    "questionText": "【問 12】 賃貸人Aと賃借人Bとの間で令和2年7月1日に締結した居住用建物の賃貸借契約に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、誤っているものはどれか。\n\n1 当該建物の修繕が必要である場合において、BがAに修繕が必要である旨を通知したにもかかわらずAが相当の期間内に必要な修繕をしないときは、Bは自ら修繕をすることができる。\n\n2 BがAに無断でCに当該建物を転貸した場合であっても、Aに対する背信行為と認めるに足りない特段の事情があるときは、Aは賃貸借契約を解除することができない。\n\n3 賃貸借契約に期間を定め、賃貸借契約を書面によって行った場合には、AがBに対しあらかじめ契約の更新がない旨を説明していれば、賃貸借契約は期間満了により終了する。\n\n4 Bが相続人なしに死亡した場合、Bと婚姻の届出をしていないが事実上夫婦と同様の関係にあった同居者Dは、Bが相続人なしに死亡したことを知った後1月以内にAに反対の意思表示をしない限り、賃借人としてのBの権利義務を承継する。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-13",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 13,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-13/",
    "questionText": "【問 13】 建物の区分所有等に関する法律に関する次の記述のうち、誤っているものはどれか。\n\n1 規約の保管場所は、建物内の見やすい場所に掲示しなければならない。\n\n2 管理者は、規約に特別の定めがあるときは、共用部分を所有することができる。\n\n3 規約及び集会の決議は、区分所有者の特定承継人に対しては、その効力を生じない。\n\n4 区分所有者は、規約に別段の定めがない限り集会の決議によって、管理者を解任することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-15",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-15/",
    "questionText": "【問 15】 都市計画法に関する次の記述のうち、正しいものはどれか。\n\n1 市街化区域及び区域区分が定められていない都市計画区域については、少なくとも道路、病院及び下水道を定めるものとされている。\n\n2 市街化調整区域内においては、都市計画に、市街地開発事業を定めることができないこととされている。\n\n3 都市計画区域は、市町村が、市町村都市計画審議会の意見を聴くとともに、都道府県知事に協議し、その同意を得て指定する。\n\n4 準都市計画区域については、都市計画に、高度地区を定めることができないこととされている。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-16",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、正しいものはどれか。ただし、許可を要する開発行為の面積については、条例による定めはないものとし、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 市街化調整区域において、非常災害のため必要な応急措置として8,000m²の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n2 市街化区域において、社会教育法に規定する公民館の建築の用に供する目的で行われる1,500m²の土地の区画形質の変更を行おうとする者は、都道府県知事の許可を受けなくてよい。\n\n3 区域区分が定められていない都市計画区域において、店舗の建築の用に供する目的で行われる2,000m²の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n4 市街化調整区域において、自己の居住の用に供する住宅の建築の用に供する目的で行われる100m²の土地の区画形質の変更を行おうとする者は、都道府県知事の許可を受けなくてよい。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-17",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-17/",
    "questionText": "【問 17】 建築基準法に関する次の記述のうち、誤っているものはどれか。\n\n1 建築物が防火地域及び準防火地域にわたる場合においては、その全部について、敷地の属する面積が大きい方の地域内の建築物に関する規定を適用する。\n\n2 倉庫の用途に供する建築物で、その用途に供する3階以上の部分の床面積の合計が500m²であるものは、耐火建築物としなければならない。\n\n3 高さ25mの建築物には、周囲の状況によって安全上支障がない場合を除き、有効に避雷設備を設けなければならない。\n\n4 高さ1m以下の階段の部分には、手すりを設けなくてもよい。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-18",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-18/",
    "questionText": "【問 18】 次の記述のうち、建築基準法（以下この問において「法」という。）の規定によれば、誤っているものはどれか。\n\n1 建築物の壁又はこれに代わる柱は、地盤面下の部分又は特定行政庁が建築審査会の同意を得て許可した歩廊の柱その他これに類するものを除き、壁面線を越えて建築してはならない。\n\n2 特別用途地区内においては、地方公共団体は、その地区の指定の目的のために必要と認める場合は、国土交通大臣の承認を得て、条例で、法第48条第1項から第13項までの規定による用途制限を緩和することができる。\n\n3 都市計画により建蔽率の限度が10分の8と定められている準工業地域においては、防火地域内にある耐火建築物については、法第53条第1項から第5項までの規定に基づく建蔽率に関する制限は適用されない。\n\n4 田園住居地域内の建築物に対しては、法第56条第1項第3号の規定（北側斜線制限）は適用されない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-20",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 20,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-20/",
    "questionText": "【問 20】 土地区画整理法に関する次の記述のうち、正しいものはどれか。\n\n1 市町村が施行する土地区画整理事業の施行後の宅地の価額の総額が土地区画整理事業の施行前の宅地の価額の総額より減少した場合においては、その差額に相当する金額を、従前の宅地に存する建築物について賃借権を有する者に対して支払わなければならない。\n\n2 施行者は、仮換地を指定した時に、清算金を徴収し、又は交付しなければならない。\n\n3 換地計画において換地を定める場合においては、換地及び従前の宅地の位置、地積、土質、水利、利用状況、環境等が照応するように定めなければならない。\n\n4 土地区画整理組合が施行する土地区画整理事業の換地計画においては、災害を防止し、及び衛生の向上を図るために宅地の地積の規模を適正にする特別な必要があると認められる場合は、その換地計画に係る区域内の地積が小である宅地について、過小宅地とならないように換地を定めることができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-21",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-21/",
    "questionText": "【問 21】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 山林を開墾し、農地として耕作している土地であっても、土地登記簿上の地目が山林であれば、法の適用を受ける農地に該当しない。\n\n2 親から子に対して、所有するすべての農地を一括して贈与する場合には、法第3条第1項の許可を受ける必要はない。\n\n3 耕作を目的として農業者が競売により農地を取得する場合であっても、法第3条第1項の許可を受ける必要がある。\n\n4 市街化区域以外の区域に存する4haを超える農地を転用する場合には、農林水産大臣の許可を受ける必要がある。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-22",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-22/",
    "questionText": "【問 22】 国土利用計画法第23条の届出（以下この問において「事後届出」という。）に関する次の記述のうち、正しいものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市にあってはその長をいうものとする。\n\n1 都道府県知事は、事後届出に係る土地の利用目的及び対価の額について、届出をした宅地建物取引業者に対し勧告することができ、都道府県知事から勧告を受けた当該業者が勧告に従わなかった場合、その旨及びその勧告の内容を公表することができる。\n\n2 事後届出が必要な土地売買等の契約により権利取得者となった者が事後届出を行わなかった場合、都道府県知事から当該届出を行うよう勧告されるが、罰則の適用はない。\n\n3 国が所有する市街化区域内の一団の土地である1,500m²の土地と500m²の土地を個人Aが購入する契約を締結した場合、Aは事後届出を行う必要がある。\n\n4 個人Bが所有する都市計画区域外の11,000m²の土地について、個人CがBとの間で対価を支払って地上権設定契約を締結した場合、Cは事後届出を行う必要がある。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-23",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-23/",
    "questionText": "【問 23】 住宅用家屋の所有権の移転登記に係る登録免許税の税率の軽減措置に関する次の記述のうち、正しいものはどれか。\n\n1 この税率の軽減措置の適用を受けるためには、やむを得ない事情がある場合を除き、その住宅用家屋の取得後1年以内に所有権の移転登記を受けなければならない。\n\n2 この税率の軽減措置は、住宅用家屋を相続により取得した場合に受ける所有権の移転登記についても適用される。\n\n3 この税率の軽減措置に係る登録免許税の課税標準となる不動産の価額は、売買契約書に記載されたその住宅用家屋の実際の取引価格である。\n\n4 過去にこの税率の軽減措置の適用を受けたことがある者は、再度この措置の適用を受けることはできない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-24",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 24,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-24/",
    "questionText": "【問 24】 固定資産税に関する次の記述のうち、正しいものはどれか。\n\n1 固定資産税を既に全納した者が、年度の途中において土地の譲渡を行った場合には、その譲渡後の月数に応じて税額の還付を受けることができる。\n\n2 固定資産税の税率は、1.7%を超えることができない。\n\n3 固定資産税の納期は、4月、7月、12月及び2月中において、当該市町村の条例で定めることとされているが、特別の事情がある場合においては、これと異なる納期を定めることができる。\n\n4 200m²以下の住宅用地に対して課する固定資産税の課税標準は、課税標準となるべき価格の2分の1の額とする特例措置が講じられている。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-25",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-25/",
    "questionText": "【問 25】 地価公示法に関する次の記述のうち、正しいものはどれか。\n\n1 土地鑑定委員会は、その土地に地上権が存する場合であっても、標準地として選定することができる。\n\n2 土地鑑定委員会は、標準地について、2人以上の不動産鑑定士の鑑定評価を求めるものとし、当該2人以上の不動産鑑定士は、土地鑑定委員会に対し、鑑定評価書を連名で提出しなければならない。\n\n3 土地鑑定委員会は、標準地の正常な価格を判定したときは、標準地の単位面積当たりの価格のほか、当該標準地の価格の総額についても官報で公示しなければならない。\n\n4 土地収用法その他の法律によって土地を収用することができる事業を行う者は、標準地として選定されている土地を取得する場合において、当該土地の取得価格を定めるときは、公示価格と同額としなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-26",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 26,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-26/",
    "questionText": "【問 26】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者は、建物の売買に際し、買主に対して売買代金の貸借のあっせんをすることにより、契約の締結を誘引してはならない。\n\n2 宅地建物取引士は、自ら役員を務める宅地建物取引業者が宅地建物取引業に関し不正な行為をし、情状が特に重いことにより免許を取り消された場合、宅地建物取引士の登録を消除されることとなる。\n\n3 宅地建物取引業者は、建築工事完了前の賃貸住宅について、借主として貸借の契約を締結してはならない。\n\n4 宅地建物取引業者は、10区画以上の一団の宅地の分譲を行う案内所を設置し、当該案内所において売買の契約の締結をし、又は契約の申込みを受ける場合は、当該案内所にその業務に関する帳簿を備え付けなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-27",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 27,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-27/",
    "questionText": "【問 27】 宅地建物取引業者がその業務に関して行う広告に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 広告の表示が実際のものよりも著しく優良又は有利であると人を誤認させるようなものであっても、誤認による損害が実際に発生していなければ、監督処分の対象とならない。\n\n2 宅地建物取引業者は、建築確認申請中の建物について、建築確認申請中である旨を表示すれば、自ら売主として当該建物を販売する旨の広告をすることができる。\n\n3 宅地建物取引業者は、宅地の造成工事の完了前においては、当該造成工事に必要とされる許可等の処分があった後であれば、当該宅地の販売に関する広告をすることができる。\n\n4 テレビやインターネットを利用して行う広告は、新聞の折込チラシや配布用のチラシと異なり、規制の対象とならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-28",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-28/",
    "questionText": "【問 28】 宅地建物取引業者Aが、BからB所有の宅地の売却について媒介の依頼を受けた場合における次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。なお、この問において「専任媒介契約」とは、専属専任媒介契約ではない専任媒介契約をいうものとする。\n\nア AがBとの間で専任媒介契約を締結した場合、Bの要望により当該宅地を指定流通機構に登録しない旨の特約をしているときを除き、Aは、当該契約締結日から7日以内（Aの休業日を含まない。）に、当該宅地の所在等を指定流通機構に登録しなければならない。\n\nイ AがBとの間で専任媒介契約を締結した場合、AはBに対して、当該契約に係る業務の処理状況を1週間に1回以上報告しなければならない。\n\nウ AがBとの間で一般媒介契約を締結し、当該契約において、Bが他の宅地建物取引業者に重ねて依頼するときは当該他の宅地建物取引業者を明示する義務がある旨を定める場合、Aは、Bが明示していない他の宅地建物取引業者の媒介又は代理によって売買の契約を成立させたときの措置を宅地建物取引業法第34条の2第1項の規定に基づき交付すべき書面に記載しなければならない。\n\nエ AがBとの間で一般媒介契約を締結した場合、AがBに対し当該宅地の価額について意見を述べるときは、不動産鑑定士に評価を依頼して、その根拠を明らかにしなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-29",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 29,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-29/",
    "questionText": "【問 29】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者（甲県知事免許）が、乙県内に新たに事務所を設置して宅地建物取引業を営むため、国土交通大臣に免許換えの申請を行い、その免許を受けたときは、国土交通大臣から、免許換え前の免許（甲県知事）の有効期間が経過するまでの期間を有効期間とする免許証の交付を受けることとなる。\n\n2 宅地建物取引士（甲県知事登録）が、乙県に所在する宅地建物取引業者の事務所の業務に従事することとなったため、乙県知事に登録の移転の申請とともに宅地建物取引士証の交付の申請をしたときは、乙県知事から、有効期間を5年とする宅地建物取引士証の交付を受けることとなる。\n\n3 宅地建物取引士（甲県知事登録）が、乙県に所在する建物の売買に関する取引において宅地建物取引士として行う事務に関し不正な行為をし、乙県知事により事務禁止処分を受けたときは、宅地建物取引士証を甲県知事に提出しなければならない。\n\n4 宅地建物取引業者（甲県知事免許）は、乙県内で一団の建物の分譲を行う案内所を設置し、当該案内所において建物の売買の契約を締結し、又は契約の申込みを受ける場合、国土交通大臣に免許換えの申請をしなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-30",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-30/",
    "questionText": "【問 30】 宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 本店と3つの支店を有する宅地建物取引業者が保証協会に加入しようとする場合、当該保証協会に、110万円の弁済業務保証金分担金を納付しなければならない。\n\n2 保証協会の社員又は社員であった者が、当該保証協会から、弁済業務保証金の還付額に相当する還付充当金を当該保証協会に納付すべき旨の通知を受けたときは、その通知を受けた日から2週間以内に、その通知された額の還付充当金を当該保証協会に納付しなければならない。\n\n3 保証協会に加入している宅地建物取引業者は、保証を手厚くするため、更に別の保証協会に加入することができる。\n\n4 保証協会の社員（甲県知事免許）と宅地建物取引業に関し取引をした者が、その取引により生じた債権に関し、当該保証協会が供託した弁済業務保証金について弁済を受ける権利を実行しようとするときは、弁済を受けることができる額について甲県知事の認証を受ける必要がある。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-31",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 31,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-31/",
    "questionText": "【問 31】 宅地建物取引業の免許に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者が、免許を受けてから1年以内に事業を開始せず免許が取り消され、その後5年を経過していない場合は、免許を受けることができない。\n\n2 免許を受けようとしている法人の政令で定める使用人が、破産手続開始の決定を受け、復権を得てから5年を経過していない場合、当該法人は免許を受けることができない。\n\n3 免許権者は、免許に条件を付することができ、免許の更新に当たっても条件を付することができる。\n\n4 宅地建物取引業者の役員の住所に変更があったときは、30日以内に免許権者に変更を届け出なければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-32",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 32,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-32/",
    "questionText": "【問 32】 宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはいくつあるか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\nア 宅地の売買の媒介を行う場合、当該宅地が急傾斜地の崩壊による災害の防止に関する法律第3条第1項により指定された急傾斜地崩壊危険区域にあるときは、同法第7条第1項に基づく制限の概要を説明しなければならない。\n\nイ 建物の貸借の媒介を行う場合、当該建物が土砂災害警戒区域等における土砂災害防止対策の推進に関する法律第7条第1項により指定された土砂災害警戒区域内にあるときは、その旨を説明しなければならない。\n\nウ 宅地の貸借の媒介を行う場合、文化財保護法第46条第1項及び第5項の規定による重要文化財の譲渡に関する制限について、その概要を説明する必要はない。\n\nエ 宅地の売買の媒介を行う場合、当該宅地が津波防災地域づくりに関する法律第21条第1項により指定された津波防護施設区域内にあるときは、同法第23条第1項に基づく制限の概要を説明しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-33",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-33/",
    "questionText": "【問 33】 宅地建物取引業法に規定する営業保証金に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者は、事業の開始後、新たに従たる事務所を設置したときは、その従たる事務所の最寄りの供託所に政令で定める額の営業保証金を供託し、その旨を免許権者に届け出なければならない。\n\n2 宅地建物取引業者は、主たる事務所を移転したためその最寄りの供託所が変更した場合、国債証券をもって営業保証金を供託しているときは、遅滞なく、従前の主たる事務所の最寄りの供託所に対し、営業保証金の保管替えを請求しなければならない。\n\n3 宅地建物取引業者は、免許の有効期間満了に伴い営業保証金を取り戻す場合は、還付請求権者に対する公告をすることなく、営業保証金を取り戻すことができる。\n\n4 免許権者は、宅地建物取引業者が宅地建物取引業の免許を受けた日から3月以内に営業保証金を供託した旨の届出をしないときは、その届出をすべき旨の催告をしなければならず、その催告が到達した日から1月以内に届出がないときは、当該宅地建物取引業者の免許を取り消すことができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-34",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 34,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-34/",
    "questionText": "【問 34】 宅地建物取引業者（消費税課税事業者）が受けることができる報酬に関する次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。\n\n1 宅地建物取引業者が受けることのできる報酬は、依頼者が承諾していたとしても、国土交通大臣の定める報酬額の上限を超えてはならない。\n\n2 宅地建物取引業者は、その業務に関し、相手方に不当に高額の報酬を要求した場合、たとえ受領していなくても宅地建物取引業法違反となる。\n\n3 宅地建物取引業者が、事業用建物の貸借（権利金の授受はないものとする。）の媒介に関する報酬について、依頼者の双方から受けることのできる報酬の合計額は、借賃（消費税等相当額を含まない。）1か月分の1.1倍に相当する金額が上限であり、貸主と借主の負担の割合については特段の規制はない。\n\n4 宅地建物取引業者は、依頼者の依頼によらない広告の料金に相当する額を報酬額に合算する場合は、代理又は媒介に係る報酬の限度額を超える額の報酬を依頼者から受けることができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-36",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-36/",
    "questionText": "【問 36】 宅地建物取引業者の守秘義務に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者は、依頼者本人の承諾があった場合でも、秘密を他に漏らしてはならない。\n\n2 宅地建物取引業者が、宅地建物取引業を営まなくなった後は、その業務上取り扱ったことについて知り得た秘密を他に漏らしても、法に違反しない。\n\n3 宅地建物取引業者は、裁判の証人として、その取り扱った宅地建物取引に関して証言を求められた場合、秘密に係る事項を証言することができる。\n\n4 宅地建物取引業者は、調査の結果判明した法第35条第1項各号に掲げる事項であっても、売主が秘密にすることを希望した場合は、買主に対して説明しなくてもよい。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-37",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-37/",
    "questionText": "【問 37】 宅地建物取引業法第37条の規定により交付すべき書面（以下この問において「37条書面」という。）に関する次の記述のうち、同法の規定によれば、正しいものはどれか。\n\n1 既存の建物の構造耐力上主要な部分等の状況について当事者の双方が確認した事項がない場合、確認した事項がない旨を37条書面に記載しなければならない。\n\n2 代金又は交換差金についての金銭の貸借のあっせんに関する定めがない場合、定めがない旨を37条書面に記載しなければならない。\n\n3 損害賠償額の予定又は違約金に関する定めがない場合、定めがない旨を37条書面に記載しなければならない。\n\n4 宅地又は建物に係る租税その他の公課の負担に関する定めがない場合、定めがない旨を37条書面に記載しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-38",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-38/",
    "questionText": "【問 38】 宅地建物取引士に関する次の記述のうち、宅地建物取引業法及び民法の規定によれば、正しいものはいくつあるか。\n\nア 宅地建物取引業者は、事務所に置く唯一の専任の宅地建物取引士が退任した場合、その日から30日以内に新たな専任の宅地建物取引士を設置し、その設置の日から2週間以内に、専任の宅地建物取引士の変更があった旨を免許権者に届け出なければならない。\n\nイ 未成年者も、法定代理人の同意があれば、宅地建物取引業者の事務所に置かれる専任の宅地建物取引士となることができる。\n\nウ 宅地建物取引士は、重要事項説明書を交付するに当たり、相手方が宅地建物取引業者である場合、相手方から宅地建物取引士証の提示を求められない限り、宅地建物取引士証を提示する必要はない。\n\nエ 成年被後見人又は被保佐人は、宅地建物取引士として都道府県知事の登録を受けることができない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-39",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-39/",
    "questionText": "【問 39】 宅地建物取引業者Aが、自ら売主として宅地建物取引業者ではない買主Bとの間で締結した宅地の売買契約について、Bが宅地建物取引業法第37条の2の規定に基づき、いわゆるクーリング・オフによる契約の解除をする場合における次の記述のうち、誤っているものはどれか。\n\n1 Bは、Aの仮設テント張りの案内所で買受けの申込みをし、2日後、Aの事務所で契約を締結した上で代金全額を支払った。その5日後、Bが、宅地の引渡しを受ける前に当該契約について解除の書面を送付した場合、Aは代金全額が支払われていることを理由に契約の解除を拒むことができる。\n\n2 Bは、自らの希望により自宅近くの喫茶店において買受けの申込みをし、売買契約を締結した。当該契約に係るクーリング・オフについては、その3日後にAから書面で告げられた場合、Bは、当該契約の締結日から10日後であっても契約の解除をすることができる。\n\n3 Bは、Aの仮設テント張りの案内所で買受けの申込みをし、Aの事務所でクーリング・オフについて書面で告げられ、その日に契約を締結した。この書面の中で、クーリング・オフによる契約の解除ができる期間を14日間としていた場合、Bは、当該契約の締結日から10日後であっても契約の解除をすることができる。\n\n4 Bは、売買契約締結後に速やかに建物建築工事請負契約を締結したいと考え、自ら指定した宅地建物取引業者であるハウスメーカー（Aから当該宅地の売却について代理又は媒介の依頼は受けていない。）の事務所で買受けの申込み及び売買契約の締結をし、その際、クーリング・オフについて書面で告げられた。その6日後、Bが当該契約について解除の書面を送付した場合、Aは契約の解除を拒むことができない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-40",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 40,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-40/",
    "questionText": "【問 40】 宅地建物取引業法（以下この問において「法」という。）に規定する業務に関する禁止事項についての次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者が、マンション販売の勧誘をするに際し、相手方から購入を希望しない旨の返事があった後に、当該勧誘を継続することは法に違反しない。\n\n2 宅地建物取引業者は、契約の相手方に対して資金不足を理由に手付の貸付けを行ったが、契約締結後償還された場合は法に違反しない。\n\n3 宅地建物取引業者は、契約の締結の勧誘をするに際し、理由の如何を問わず、相手方に対して当該契約を締結するかどうかを判断するために必要な時間を与えることを拒んではならない。\n\n4 宅地建物取引業者は、勧誘の相手方が金銭的に不安であることを述べたため、売買代金の額を引き下げて、契約の締結を勧誘したとしても、法に違反しない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-41",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 41,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-41/",
    "questionText": "【問 41】 宅地建物取引業法第49条に規定する帳簿に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者は、本店と複数の支店がある場合、支店には帳簿を備え付けず、本店に支店の分もまとめて備え付けておけばよい。\n\n2 宅地建物取引業者は、宅地建物取引業に関し取引のあったつど、その年月日、その取引に係る宅地又は建物の所在及び面積その他国土交通省令で定める事項を帳簿に記載しなければならない。\n\n3 宅地建物取引業者は、帳簿を各事業年度の末日をもって閉鎖するものとし、閉鎖後5年間当該帳簿を保存しなければならないが、自ら売主となり、又は売買の媒介をする新築住宅に係るものにあっては10年間保存しなければならない。\n\n4 宅地建物取引業者は、帳簿の記載事項を、事務所のパソコンのハードディスクに記録し、必要に応じ当該事務所においてパソコンやプリンターを用いて明確に紙面に表示する場合でも、当該記録をもって帳簿への記載に代えることができない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-42",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-42/",
    "questionText": "【問 42】 宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、誤っているものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 地域における歴史的風致の維持及び向上に関する法律第12条第1項により指定された歴史的風致形成建造物である建物の売買の媒介を行う場合、その増築をするときは市町村長への届出が必要である旨を説明しなくてもよい。\n\n2 既存の建物の売買の媒介を行う場合、当該建物の建築確認済証がなくなっているときは、その旨を説明すればよい。\n\n3 区分所有建物の売買の媒介を行う場合、一棟の建物の維持修繕の実施状況が記録されているときは、その内容を説明しなければならない。\n\n4 建物の貸借の媒介を行う場合、台所、浴室、便所その他の当該建物の設備の整備の状況について、説明しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_12-43",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 43,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-43/",
    "questionText": "【問 43】 宅地建物取引業法に規定する宅地建物取引士及びその登録（以下この問において「登録」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 登録を受けている者が精神の機能の障害により宅地建物取引士の事務を適正に行うに当たって必要な認知、判断及び意思疎通を適切に行うことができない者となった場合、本人がその旨を登録をしている都道府県知事に届け出ることはできない。\n\n2 甲県知事の登録を受けている宅地建物取引士が乙県知事に登録の移転の申請を行うとともに宅地建物取引士証の交付の申請を行う場合、交付の申請前6月以内に行われる乙県知事が指定した講習を受講しなければならない。\n\n3 宅地建物取引士が、事務禁止処分を受け、宅地建物取引士証をその交付を受けた都道府県知事に速やかに提出しなかったときは、50万円以下の罰金に処せられることがある。\n\n4 宅地建物取引士が、刑法第222条（脅迫）の罪により、罰金の刑に処せられ、登録が消除された場合、刑の執行を終わり又は執行を受けることがなくなった日から5年を経過するまでは、新たな登録を受けることができない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-44",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-44/",
    "questionText": "【問 44】 宅地建物取引業法に関する次の記述のうち、正しいものはいくつあるか。\n\nア 宅地には、現に建物の敷地に供されている土地に限らず、将来的に建物の敷地に供する目的で取引の対象とされる土地も含まれる。\n\nイ 農地は、都市計画法に規定する用途地域内に存するものであっても、宅地には該当しない。\n\nウ 建物の敷地に供せられる土地であれば、都市計画法に規定する用途地域外に存するものであっても、宅地に該当する。\n\nエ 道路、公園、河川等の公共施設の用に供せられている土地は、都市計画法に規定する用途地域内に存するものであれば宅地に該当する。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-45",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-45/",
    "questionText": "【問 45】 宅地建物取引業者Aが自ら売主として、宅地建物取引業者ではない買主Bに新築住宅を販売する場合における次の記述のうち、特定住宅瑕疵担保責任の履行の確保等に関する法律によれば、正しいものはどれか。\n\n1 Aが、住宅販売瑕疵担保保証金を供託する場合、当該住宅の床面積が100m²以下であるときは、新築住宅の合計戸数の算定に当たって、2戸をもって1戸と数えることになる。\n\n2 Aは、住宅瑕疵担保責任保険法人と住宅販売瑕疵担保責任保険契約の締結をした場合、Bが住宅の引渡しを受けた時から10年以内に当該住宅を転売したときは、当該住宅瑕疵担保責任保険法人にその旨を申し出て、当該保険契約の解除をしなければならない。\n\n3 Aは、住宅販売瑕疵担保責任保険契約の締結をした場合、当該住宅を引き渡した時から10年間、当該住宅の構造耐力上主要な部分、雨水の浸入を防止する部分、給水設備又はガス設備の隠れた瑕疵によって生じた損害について保険金の支払を受けることができる。\n\n4 住宅販売瑕疵担保責任保険契約は、新築住宅を引き渡したAが住宅瑕疵担保責任保険法人と締結する必要があり、Bが保険料を支払うものではない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-46",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 機構は、地震に対する安全性の向上を主たる目的とする住宅の改良に必要な資金の貸付けを業務として行っている。\n\n2 証券化支援事業（買取型）における民間金融機関の住宅ローン金利は、金融機関によって異なる場合がある。\n\n3 機構は、高齢者が自ら居住する住宅に対して行うバリアフリー工事に係る貸付けについて、貸付金の償還を高齢者の死亡時に一括して行うという制度を設けている。\n\n4 証券化支援業務（買取型）において、機構による譲受けの対象となる住宅の購入に必要な資金の貸付けに係る金融機関の貸付債権には、当該住宅の購入に付随する改良に必要な資金は含まれない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_12-47",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 47,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-47/",
    "questionText": "【問 47】 宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。\n\n1 建築基準法第42条第2項の規定により道路とみなされる部分（セットバックを要する部分）を含む土地については、セットバックを要する旨及びその面積を必ず表示しなければならない。\n\n2 取引態様については、「売主」、「貸主」、「代理」又は「媒介（仲介）」の別を表示しなければならず、これらの用語以外の「直販」、「委託」等の用語による表示は、取引態様の表示とは認められない。\n\n3 インターネット上に掲載している賃貸物件について、掲載した後に契約済みとなり実際には取引できなくなっていたとしても、当該物件について消費者からの問合せがなく、故意に掲載を継続していたものでなければ、不当表示に問われることはない。\n\n4 新築分譲住宅を販売するに当たり、販売価格が確定していないため直ちに取引することができない場合、その取引開始時期をあらかじめ告知する予告広告を行うことはできない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_12-49",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 山地は、地形がかなり急峻で、大部分が森林となっている。\n\n2 低地は、一般に洪水や地震などに対して弱く、防災的見地からは住宅地として好ましくない。\n\n3 埋立地は、一般に海面に対して数mの比高を持ち、干拓地に比べ自然災害に対して危険度が高い。\n\n4 台地は、一般に地盤が安定しており、低地に比べ自然災害に対して安全度が高い。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_12-50",
    "examId": "r2_12",
    "year": "令和2年度12月",
    "label": "2020 / 令和2年度12月",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question_002.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-12kakomon/r022-50/",
    "questionText": "【問 50】 建築物の構造に関する次の記述のうち、最も不適当なものはどれか。\n\n1 基礎は、硬質の支持地盤に設置するとともに、上部構造とも堅固に緊結する必要がある。\n\n2 木造建物を耐震、耐風的な構造にするためには、できるだけ建物の形態を単純にすることが適切である。\n\n3 鉄骨造は、不燃構造であり、靱性が大きいことから、鋼材の防錆処理を行う必要はない。\n\n4 近年、コンクリートと鉄筋の強度が向上しており、鉄筋コンクリート造の超高層共同住宅建物もみられる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-01",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-1/",
    "questionText": "【問 1】 Aが購入した甲土地が他の土地に囲まれて公道に通じない土地であった場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 甲土地が共有物の分割によって公道に通じない土地となっていた場合には、Aは公道に至るために他の分割者の所有地を、償金を支払うことなく通行することができる。\n\n2 Aは公道に至るため甲土地を囲んでいる土地を通行する権利を有するところ、Aが自動車を所有していても、自動車による通行権が認められることはない。\n\n3 Aが、甲土地を囲んでいる土地の一部である乙土地を公道に出るための通路にする目的で賃借した後、甲土地をBに売却した場合には、乙土地の賃借権は甲土地の所有権に従たるものとして甲土地の所有権とともにBに移転する。\n\n4 Cが甲土地を囲む土地の所有権を時効により取得した場合には、AはCが時効取得した土地を公道に至るために通行することができなくなる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-02",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-2/",
    "questionText": "【問 2】 令和2年7月1日に下記ケース①及びケース②の保証契約を締結した場合に関する次の1から4までの記述のうち、民法の規定によれば、正しいものはどれか。\n\n（ケース①） 個人Aが金融機関Bから事業資金として1,000万円を借り入れ、CがBとの間で当該債務に係る保証契約を締結した場合\n\n（ケース②） 個人Aが建物所有者Dと居住目的の建物賃貸借契約を締結し、EがDとの間で当該賃貸借契約に基づくAの一切の債務に係る保証契約を締結した場合\n\n1 ケース①の保証契約は、口頭による合意でも有効であるが、ケース②の保証契約は、書面でしなければ効力を生じない。\n\n2 ケース①の保証契約は、Cが個人でも法人でも極度額を定める必要はないが、ケース②の保証契約は、Eが個人でも法人でも極度額を定めなければ効力を生じない。\n\n3 ケース①及びケース②の保証契約がいずれも連帯保証契約である場合、BがCに債務の履行を請求したときはCは催告の抗弁を主張することができるが、DがEに債務の履行を請求したときはEは催告の抗弁を主張することができない。\n\n4 保証人が保証契約締結の日前1箇月以内に公正証書で保証債務を履行する意思を表示していない場合、ケース①のCがAの事業に関与しない個人であるときはケース①の保証契約は効力を生じないが、ケース②の保証契約は有効である。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-03",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-3/",
    "questionText": "【問 3】 次の1から4までの契約に関する記述のうち、民法の規定及び下記判決文によれば、誤っているものはどれか。なお、これらの契約は令和2年4月1日以降に締結されたものとする。\n\n（判決文）\n法律が債務の不履行による契約の解除を認める趣意は、契約の要素をなす債務の履行がないために、該契約をなした目的を達することができない場合を救済するためであり、当事者が契約をなした主たる目的の達成に必須的でない附随的義務の履行を怠ったに過ぎないような場合には、特段の事情の存しない限り、相手方は当該契約を解除することができないものと解するのが相当である。\n\n1 土地の売買契約において、売主が負担した当該土地の税金相当額を買主が償還する付随的義務が定められ、買主が売買代金を支払っただけで税金相当額を償還しなかった場合、特段の事情がない限り、売主は当該売買契約の解除をすることができない。\n\n2 債務者が債務を履行しない場合であっても、債務不履行について債務者の責めに帰すべき事由がないときは付随的義務の不履行となり、特段の事情がない限り、債権者は契約の解除をすることができない。\n\n3 債務不履行に対して債権者が相当の期間を定めて履行を催告してその期間内に履行がなされない場合であっても、催告期間が経過した時における債務不履行がその契約及び取引上の社会通念に照らして軽微であるときは、債権者は契約の解除をすることができない。\n\n4 債務者が債務を履行しない場合であって、債務者がその債務の全部の履行を拒絶する意思を明確に表示したときは、債権者は、相当の期間を定めてその履行を催告することなく、直ちに契約の解除をすることができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-04",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-4/",
    "questionText": "【問 4】 建物の賃貸借契約が期間満了により終了した場合における次の記述のうち、民法の規定によれば、正しいものはどれか。なお、賃貸借契約は、令和2年7月1日付けで締結され、原状回復義務について特段の合意はないものとする。\n\n1 賃借人は、賃借物を受け取った後にこれに生じた損傷がある場合、通常の使用及び収益によって生じた損耗も含めてその損傷を原状に復する義務を負う。\n\n2 賃借人は、賃借物を受け取った後にこれに生じた損傷がある場合、賃借人の帰責事由の有無にかかわらず、その損傷を原状に復する義務を負う。\n\n3 賃借人から敷金の返還請求を受けた賃貸人は、賃貸物の返還を受けるまでは、これを拒むことができる。\n\n4 賃借人は、未払賃料債務がある場合、賃貸人に対し、敷金をその債務の弁済に充てるよう請求することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-05",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 5,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-5/",
    "questionText": "【問 5】 AとBとの間で令和2年7月1日に締結された委任契約において、委任者Aが受任者Bに対して報酬を支払うこととされていた場合に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 Aの責めに帰すべき事由によって履行の途中で委任が終了した場合、Bは報酬全額をAに対して請求することができるが、自己の債務を免れたことによって得た利益をAに償還しなければならない。\n\n2 Bは、契約の本旨に従い、自己の財産に対するのと同一の注意をもって委任事務を処理しなければならない。\n\n3 Bの責めに帰すべき事由によって履行の途中で委任が終了した場合、BはAに対して報酬を請求することができない。\n\n4 Bが死亡した場合、Bの相続人は、急迫の事情の有無にかかわらず、受任者の地位を承継して委任事務を処理しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-06",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-6/",
    "questionText": "【問 6】 AとBとの間で令和2年7月1日に締結された売買契約に関する次の記述のうち、民法の規定によれば、売買契約締結後、AがBに対し、錯誤による取消しができるものはどれか。\n\n1 Aは、自己所有の自動車を100万円で売却するつもりであったが、重大な過失によりBに対し「10万円で売却する」と言ってしまい、Bが過失なく「Aは本当に10万円で売るつもりだ」と信じて購入を申し込み、AB間に売買契約が成立した場合\n\n2 Aは、自己所有の時価100万円の壺（つぼ）を10万円程度であると思い込み、Bに対し「手元にお金がないので、10万円で売却したい」と言ったところ、BはAの言葉を信じ「それなら10万円で購入する」と言って、AB間に売買契約が成立した場合\n\n3 Aは、自己所有の時価100万円の名匠の絵画を贋作（がんさく）だと思い込み、Bに対し「贋作（がんさく）であるので、10万円で売却する」と言ったところ、Bも同様に贋作（がんさく）だと思い込み「贋作（がんさく）なら10万円で購入する」と言って、AB間に売買契約が成立した場合\n\n4 Aは、自己所有の腕時計を100万円で外国人Bに売却する際、当日の正しい為替レート（1ドル100円）を重大な過失により1ドル125円で計算して「8,000ドルで売却する」と言ってしまい、Aの錯誤について過失なく知らなかったBが「8,000ドルなら買いたい」と言って、AB間に売買契約が成立した場合",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-07",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 7,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-7/",
    "questionText": "【問 7】 保証に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。なお、保証契約は令和2年4月1日以降に締結されたものとする。\n\n1 特定物売買における売主の保証人は、特に反対の意思表示がない限り、売主の債務不履行により契約が解除された場合には、原状回復義務である既払代金の返還義務についても保証する責任がある。\n\n2 主たる債務の目的が保証契約の締結後に加重されたときは、保証人の負担も加重され、主たる債務者が時効の利益を放棄すれば、その効力は連帯保証人に及ぶ。\n\n3 委託を受けた保証人が主たる債務の弁済期前に債務の弁済をしたが、主たる債務者が当該保証人からの求償に対して、当該弁済日以前に相殺の原因を有していたことを主張するときは、保証人は、債権者に対し、その相殺によって消滅すべきであった債務の履行を請求することができる。\n\n4 委託を受けた保証人は、履行の請求を受けた場合だけでなく、履行の請求を受けずに自発的に債務の消滅行為をする場合であっても、あらかじめ主たる債務者に通知をしなければ、同人に対する求償が制限されることがある。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-08",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 8,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-8/",
    "questionText": "【問 8】 相続（令和2年7月1日に相続の開始があったもの）に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 相続回復の請求権は、相続人又はその法定代理人が相続権を侵害された事実を知った時から5年間行使しないときは、時効によって消滅する。\n\n2 被相続人の子が相続開始以前に死亡したときは、その者の子がこれを代襲して相続人となるが、さらに代襲者も死亡していたときは、代襲者の子が相続人となることはない。\n\n3 被相続人に相続人となる子及びその代襲相続人がおらず、被相続人の直系尊属が相続人となる場合には、被相続人の兄弟姉妹が相続人となることはない。\n\n4 被相続人の兄弟姉妹が相続人となるべき場合であっても、相続開始以前に兄弟姉妹及びその子がいずれも死亡していたときは、その者の子（兄弟姉妹の孫）が相続人となることはない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-09",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-9/",
    "questionText": "【問 9】 Aがその所有する甲建物について、Bとの間で、①Aを売主、Bを買主とする売買契約を締結した場合と、②Aを贈与者、Bを受贈者とする負担付贈与契約を締結した場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。なお、これらの契約は、令和2年7月1日に締結され、担保責任に関する特約はないものとする。\n\n1 ①の契約において、Bが手付を交付し、履行期の到来後に代金支払の準備をしてAに履行の催告をした場合、Aは、手付の倍額を現実に提供して契約の解除をすることができる。\n\n2 ②の契約が書面によらずになされた場合、Aは、甲建物の引渡し及び所有権移転登記の両方が終わるまでは、書面によらないことを理由に契約の解除をすることができる。\n\n3 ②の契約については、Aは、その負担の限度において、売主と同じく担保責任を負う。\n\n4 ①の契約については、Bの債務不履行を理由としてAに解除権が発生する場合があるが、②の契約については、Bの負担の不履行を理由としてAに解除権が発生することはない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-10",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-10/",
    "questionText": "【問 10】 Aが甲土地を所有している場合の時効に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 Bが甲土地を所有の意思をもって平穏かつ公然に17年間占有した後、CがBを相続し甲土地を所有の意思をもって平穏かつ公然に3年間占有した場合、Cは甲土地の所有権を時効取得することができる。\n\n2 Dが、所有者と称するEから、Eが無権利者であることについて善意無過失で甲土地を買い受け、所有の意思をもって平穏かつ公然に3年間占有した後、甲土地がAの所有であることに気付いた場合、そのままさらに7年間甲土地の占有を継続したとしても、Dは、甲土地の所有権を時効取得することはできない。\n\n3 Dが、所有者と称するEから、Eが無権利者であることについて善意無過失で甲土地を買い受け、所有の意思をもって平穏かつ公然に3年間占有した後、甲土地がAの所有であることを知っているFに売却し、Fが所有の意思をもって平穏かつ公然に甲土地を7年間占有した場合、Fは甲土地の所有権を時効取得することができる。\n\n4 Aが甲土地を使用しないで20年以上放置していたとしても、Aの有する甲土地の所有権が消滅時効にかかることはない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-11",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-11/",
    "questionText": "【問 11】 A所有の甲土地につき、令和2年7月1日にBとの間で居住の用に供する建物の所有を目的として存続期間30年の約定で賃貸借契約（以下この問において「本件契約」という。）が締結された場合に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、正しいものはどれか。\n\n1 Bは、借地権の登記をしていなくても、甲土地の引渡しを受けていれば、甲土地を令和2年7月2日に購入したCに対して借地権を主張することができる。\n\n2 本件契約で「一定期間は借賃の額の増減を行わない」旨を定めた場合には、甲土地の借賃が近傍類似の土地の借賃と比較して不相当となったときであっても、当該期間中は、AもBも借賃の増減を請求することができない。\n\n3 本件契約で「Bの債務不履行により賃貸借契約が解除された場合には、BはAに対して建物買取請求権を行使することができない」旨を定めても、この合意は無効となる。\n\n4 AとBとが期間満了に当たり本件契約を最初に更新する場合、更新後の存続期間を15年と定めても、20年となる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-12",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-12/",
    "questionText": "【問 12】 AとBとの間でA所有の甲建物をBに対して、居住の用を目的として、期間2年、賃料月額10万円で賃貸する旨の賃貸借契約（以下この問において「本件契約」という。）を締結し、Bが甲建物の引渡しを受けた場合に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、誤っているものはどれか。\n\n1 AがCに甲建物を売却した場合、Bは、それまでに契約期間中の賃料全額をAに前払いしていたことを、Cに対抗することができる。\n\n2 本件契約が借地借家法第38条の定期建物賃貸借契約であって、賃料改定に関する特約がない場合、経済事情の変動により賃料が不相当となったときは、AはBに対し、賃料増額請求をすることができる。\n\n3 本件契約が借地借家法第38条の定期建物賃貸借契約である場合、Aは、転勤、療養、親族の介護その他のやむを得ない事情があれば、Bに対し、解約を申し入れ、申入れの日から1月を経過することによって、本件契約を終了させることができる。\n\n4 本件契約が借地借家法第38条の定期建物賃貸借契約であって、造作買取請求に関する特約がない場合、期間満了で本件契約が終了するときに、Bは、Aの同意を得て甲建物に付加した造作について買取請求をすることができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-14",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 14,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-14/",
    "questionText": "【問 14】 不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、正しいものはどれか。\n\n1 敷地権付き区分建物の表題部所有者から所有権を取得した者は、当該敷地権の登記名義人の承諾を得なければ、当該区分建物に係る所有権の保存の登記を申請することができない。\n\n2 所有権に関する仮登記に基づく本登記は、登記上の利害関係を有する第三者がある場合であっても、その承諾を得ることなく、申請することができる。\n\n3 債権者Aが債務者Bに代位して所有権の登記名義人CからBへの所有権の移転の登記を申請した場合において、当該登記を完了したときは、登記官は、Aに対し、当該登記に係る登記識別情報を通知しなければならない。\n\n4 配偶者居住権は、登記することができる権利に含まれない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-15",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-15/",
    "questionText": "【問 15】 都市計画法に関する次の記述のうち、正しいものはどれか。\n\n1 地区計画については、都市計画に、地区施設及び地区整備計画を定めるよう努めるものとされている。\n\n2 都市計画事業の認可の告示があった後に当該認可に係る事業地内の土地建物等を有償で譲り渡そうとする者は、施行者の許可を受けなければならない。\n\n3 第二種住居地域は、中高層住宅に係る良好な住居の環境を保護するため定める地域とされている。\n\n4 市街化調整区域における地区計画は、市街化区域における市街化の状況等を勘案して、地区計画の区域の周辺における市街化を促進することがない等当該都市計画区域における計画的な市街化を図る上で支障がないように定めることとされている。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-16",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、誤っているものはどれか。なお、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 開発許可を申請しようとする者は、あらかじめ、開発行為又は開発行為に関する工事により設置される公共施設を管理することとなる者と協議しなければならない。\n\n2 都市計画事業の施行として行う建築物の新築であっても、市街化調整区域のうち開発許可を受けた開発区域以外の区域内においては、都道府県知事の許可を受けなければ、建築物の新築をすることができない。\n\n3 開発許可を受けた開発行為により公共施設が設置されたときは、その公共施設は、工事完了の公告の日の翌日において、原則としてその公共施設の存する市町村の管理に属するものとされている。\n\n4 開発許可を受けた者から当該開発区域内の土地の所有権を取得した者は、都道府県知事の承認を受けて、当該開発許可を受けた者が有していた当該開発許可に基づく地位を承継することができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-17",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-17/",
    "questionText": "【問 17】 建築基準法に関する次の記述のうち、正しいものはどれか。\n\n1 階数が2で延べ面積が200m²の鉄骨造の共同住宅の大規模の修繕をしようとする場合、建築主は、当該工事に着手する前に、確認済証の交付を受けなければならない。\n\n2 居室の天井の高さは、一室で天井の高さの異なる部分がある場合、室の床面から天井の最も低い部分までの高さを2.1m以上としなければならない。\n\n3 延べ面積が1,000m²を超える準耐火建築物は、防火上有効な構造の防火壁又は防火床によって有効に区画し、かつ、各区画の床面積の合計をそれぞれ1,000m²以内としなければならない。\n\n4 高さ30mの建築物には、非常用の昇降機を設けなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-18",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-18/",
    "questionText": "【問 18】 建築基準法に関する次の記述のうち、正しいものはどれか。\n\n1 公衆便所及び巡査派出所については、特定行政庁の許可を得ないで、道路に突き出して建築することができる。\n\n2 近隣商業地域内において、客席の部分の床面積の合計が200m²以上の映画館は建築することができない。\n\n3 建築物の容積率の算定の基礎となる延べ面積には、老人ホームの共用の廊下又は階段の用に供する部分の床面積は、算入しないものとされている。\n\n4 日影による中高層の建築物の高さの制限に係る日影時間の測定は、夏至日の真太陽時の午前8時から午後4時までの間について行われる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-20",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 20,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-20/",
    "questionText": "【問 20】 土地区画整理組合（以下この問において「組合」という。）に関する次の記述のうち、土地区画整理法の規定によれば、正しいものはどれか。\n\n1 組合の設立認可を申請しようとする者は、施行地区となるべき区域内の宅地について借地権を有するすべての者の3分の2以上の同意を得なければならないが、未登記の借地権を有する者の同意を得る必要はない。\n\n2 組合の総会の会議は、定款に特別な定めがある場合を除くほか、組合員の半数以上が出席しなければ開くことができない。\n\n3 組合が賦課金を徴収する場合、賦課金の額は、組合員が施行地区内に有する宅地又は借地の地積等にかかわらず一律に定めなければならない。\n\n4 組合の施行する土地区画整理事業に参加することを希望する者のうち、当該土地区画整理事業に参加するのに必要な資力及び信用を有する者であって定款で定められたものは、参加組合員として組合員となる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-21",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-21/",
    "questionText": "【問 21】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 法第3条第1項の許可が必要な農地の売買については、この許可を受けずに売買契約を締結しても所有権移転の効力は生じない。\n\n2 市街化区域内の自己の農地を駐車場に転用する場合には、農地転用した後に農業委員会に届け出ればよい。\n\n3 相続により農地を取得することとなった場合には、法第3条第1項の許可を受ける必要がある。\n\n4 農地に抵当権を設定する場合には、法第3条第1項の許可を受ける必要がある。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-22",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-22/",
    "questionText": "【問 22】 国土利用計画法第23条の届出（以下この問において「事後届出」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 Aが所有する市街化区域内の1,500m²の土地をBが購入した場合には、Bは事後届出を行う必要はないが、Cが所有する市街化調整区域内の6,000m²の土地についてDと売買に係る予約契約を締結した場合には、Dは事後届出を行う必要がある。\n\n2 Eが所有する市街化区域内の2,000m²の土地をFが購入した場合、Fは当該土地の所有権移転登記を完了した日から起算して2週間以内に事後届出を行う必要がある。\n\n3 Gが所有する都市計画区域外の15,000m²の土地をHに贈与した場合、Hは事後届出を行う必要がある。\n\n4 Iが所有する都市計画区域外の10,000m²の土地とJが所有する市街化調整区域内の10,000m²の土地を交換した場合、I及びJは事後届出を行う必要はない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-23",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-23/",
    "questionText": "【問 23】 印紙税に関する次の記述のうち、正しいものはどれか。\n\n1 「建物の電気工事に係る請負代金は1,100万円（うち消費税額及び地方消費税額100万円）とする」旨を記載した工事請負契約書について、印紙税の課税標準となる当該契約書の記載金額は1,100万円である。\n\n2 「Aの所有する土地（価額5,000万円）とBの所有する土地（価額4,000万円）とを交換する」旨の土地交換契約書を作成した場合、印紙税の課税標準となる当該契約書の記載金額は4,000万円である。\n\n3 国を売主、株式会社Cを買主とする土地の売買契約において、共同で売買契約書を2通作成し、国とC社がそれぞれ1通ずつ保存することとした場合、C社が保存する契約書には印紙税は課されない。\n\n4 「契約期間は10年間、賃料は月額10万円、権利金の額は100万円とする」旨が記載された土地の賃貸借契約書は、記載金額1,300万円の土地の賃借権の設定に関する契約書として印紙税が課される。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-25",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-25/",
    "questionText": "【問 25】 不動産の鑑定評価に関する次の記述のうち、不動産鑑定評価基準によれば、誤っているものはどれか。\n\n1 不動産の価格は、その不動産の効用が最高度に発揮される可能性に最も富む使用を前提として把握される価格を標準として形成されるが、不動産についての現実の使用方法は当該不動産が十分な効用を発揮していない場合があることに留意すべきである。\n\n2 対象建築物に関する工事が完了していない場合でも、当該工事の完了を前提として鑑定評価を行うことがある。\n\n3 特殊価格とは、一般的に市場性を有しない不動産について、その利用現況等を前提とした不動産の経済価値を適正に表示する価格をいい、例としては、文化財の指定を受けた建造物について、その保存等に主眼をおいた鑑定評価を行う場合において求められる価格があげられる。\n\n4 原価法は、対象不動産が建物及びその敷地である場合において、再調達原価の把握及び減価修正を適切に行うことができるときに有効な手法であるが、対象不動産が土地のみである場合には、この手法を適用することはできない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-26",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 26,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-26/",
    "questionText": "【問 26】 宅地建物取引業の免許（以下この問において「免許」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者A社（甲県知事免許）が宅地建物取引業者ではないB社との合併により消滅した場合には、B社は、A社が消滅した日から30日以内にA社を合併した旨を甲県知事に届け出れば、A社が受けていた免許を承継することができる。\n\n2 信託業法第3条の免許を受けた信託会社が宅地建物取引業を営もうとする場合には、国土交通大臣の免許を受けなければならない。\n\n3 個人Cが、転売目的で競売により取得した宅地を多数の区画に分割し、宅地建物取引業者Dに販売代理を依頼して、不特定多数の者に分譲する事業を行おうとする場合には、免許を受けなければならない。\n\n4 宅地建物取引業者E（乙県知事免許）は、乙県内に2以上の事務所を設置してその事業を営もうとする場合には、国土交通大臣に免許換えの申請をしなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-27",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 27,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-27/",
    "questionText": "【問 27】 宅地建物取引業者がその業務に関して行う広告に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。\n\nア 建物の売却について代理を依頼されて広告を行う場合、取引態様として、代理であることを明示しなければならないが、その後、当該物件の購入の注文を受けたときは、広告を行った時点と取引態様に変更がない場合を除き、遅滞なく、その注文者に対し取引態様を明らかにしなければならない。\n\nイ 広告をするに当たり、実際のものよりも著しく優良又は有利であると人を誤認させるような表示をしてはならないが、誤認させる方法には限定がなく、宅地又は建物に係る現在又は将来の利用の制限の一部を表示しないことにより誤認させることも禁止されている。\n\nウ 複数の区画がある宅地の売買について、数回に分けて広告をする場合は、広告の都度取引態様の別を明示しなければならない。\n\nエ 宅地の造成又は建物の建築に関する工事の完了前においては、当該工事に必要な都市計画法に基づく開発許可、建築基準法に基づく建築確認その他法令に基づく許可等の申請をした後でなければ、当該工事に係る宅地又は建物の売買その他の業務に関する広告をしてはならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-28",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-28/",
    "questionText": "【問 28】 宅地建物取引士に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引士資格試験に合格した者は、合格した日から10年以内に登録の申請をしなければ、その合格は無効となる。\n\n2 宅地建物取引士証の有効期間の更新の申請は、有効期間満了の90日前から30日前までにする必要がある。\n\n3 宅地建物取引士は、重要事項の説明をするときは説明の相手方からの請求の有無にかかわらず宅地建物取引士証を提示しなければならず、また、取引の関係者から請求があったときにも宅地建物取引士証を提示しなければならない。\n\n4 甲県知事の登録を受けている宅地建物取引士が、乙県知事に登録の移転を申請するときは、乙県知事が指定する講習を受講しなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-29",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 29,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-29/",
    "questionText": "【問 29】 宅地建物取引業者Aが、BからB所有の住宅の売却の媒介を依頼された場合における次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはいくつあるか。\n\nア Aは、Bとの間で専任媒介契約を締結し、所定の事項を指定流通機構に登録したときは、その登録を証する書面を遅滞なくBに引き渡さなければならない。\n\nイ Aは、Bとの間で媒介契約を締結したときは、当該契約が国土交通大臣が定める標準媒介契約約款に基づくものであるか否かの別を、法第34条の2第1項の規定に基づき交付すべき書面に記載しなければならない。\n\nウ Aは、Bとの間で専任媒介契約を締結するときは、Bの要望に基づく場合を除き、当該契約の有効期間について、有効期間満了時に自動的に更新する旨の特約をすることはできない。\n\nエ Aは、Bとの間で専属専任媒介契約を締結したときは、Bに対し、当該契約に係る業務の処理状況を1週間に1回以上報告しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-30",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-30/",
    "questionText": "【問 30】 宅地建物取引業者A及び宅地建物取引業者B（ともに消費税課税事業者）が受領する報酬に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。なお、借賃には消費税等相当額を含まないものとする。\n\n1 Aは売主から代理の依頼を、Bは買主から媒介の依頼を、それぞれ受けて、代金5,000万円の宅地の売買契約を成立させた場合、Aは売主から343万2,000円、Bは買主から171万6,000円、合計で514万8,000円の報酬を受けることができる。\n\n2 Aが単独で行う居住用建物の貸借の媒介に関して、Aが依頼者の一方から受けることができる報酬の上限額は、当該媒介の依頼者から報酬請求時までに承諾を得ている場合には、借賃の1.1か月分である。\n\n3 Aが単独で貸主と借主の双方から店舗用建物の貸借の媒介の依頼を受け、1か月の借賃25万円、権利金330万円（権利設定の対価として支払われるもので、返還されないものをいい、消費税等相当額を含む。）の賃貸借契約を成立させた場合、Aが依頼者の一方から受けることができる報酬の上限額は、30万8,000円である。\n\n4 Aが単独で行う事務所用建物の貸借の媒介に関し、Aが受ける報酬の合計額が借賃の1.1か月分以内であれば、Aは依頼者の双方からどのような割合で報酬を受けてもよく、また、依頼者の一方のみから報酬を受けることもできる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-31",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 31,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-31/",
    "questionText": "【問 31】 宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 建物の売買の媒介だけでなく建物の貸借の媒介を行う場合においても、損害賠償額の予定又は違約金に関する事項について、説明しなければならない。\n\n2 建物の売買の媒介を行う場合、当該建物について、石綿の使用の有無の調査の結果が記録されているか照会を行ったにもかかわらず、その存在の有無が分からないときは、宅地建物取引業者自らが石綿の使用の有無の調査を実施し、その結果を説明しなければならない。\n\n3 建物の売買の媒介を行う場合、当該建物が既存の住宅であるときは、建物状況調査を実施しているかどうかを説明しなければならないが、実施している場合その結果の概要を説明する必要はない。\n\n4 区分所有建物の売買の媒介を行う場合、建物の区分所有等に関する法律第2条第3項に規定する専有部分の用途その他の利用の制限に関する規約の定めがあるときは、その内容を説明しなければならないが、区分所有建物の貸借の媒介を行う場合は、説明しなくてよい。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-32",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 32,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-32/",
    "questionText": "【問 32】 宅地建物取引業者Aが、自ら売主として、宅地建物取引業者ではないBとの間で建物の売買契約を締結する場合における次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 AB間の建物の売買契約において、Bが当該契約の履行に着手した後においては、Aは、契約の締結に際してBから受領した手付金の倍額をBに現実に提供したとしても、契約を解除することはできない。\n\n2 AB間の建物の売買契約における「法第37条の2の規定に基づくクーリング・オフによる契約の解除の際に、当該契約の締結に際しAがBから受領した手付金は返還しない」旨の特約は有効である。\n\n3 AB間の建物の割賦販売の契約において、Bからの賦払金が当初設定していた支払期日までに支払われなかった場合、Aは直ちに賦払金の支払の遅滞を理由として当該契約を解除することができる。\n\n4 AB間で工事の完了前に当該工事に係る建物（代金5,000万円）の売買契約を締結する場合、Aは、法第41条に定める手付金等の保全措置を講じた後でなければ、Bから200万円の手付金を受領してはならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-34",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 34,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-34/",
    "questionText": "【問 34】 宅地建物取引士の登録（以下この問において「登録」という。）及び宅地建物取引士証に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 甲県で宅地建物取引士資格試験に合格した後1年以上登録の申請をしていなかった者が宅地建物取引業者（乙県知事免許）に勤務することとなったときは、乙県知事あてに登録の申請をしなければならない。\n\n2 登録を受けている者は、住所に変更があっても、登録を受けている都道府県知事に変更の登録を申請する必要はない。\n\n3 宅地建物取引士は、従事先として登録している宅地建物取引業者の事務所の所在地に変更があったときは、登録を受けている都道府県知事に変更の登録を申請しなければならない。\n\n4 丙県知事の登録を受けている宅地建物取引士が、丁県知事への登録の移転の申請とともに宅地建物取引士証の交付の申請をした場合は、丁県知事から、移転前の宅地建物取引士証の有効期間が経過するまでの期間を有効期間とする新たな宅地建物取引士証が交付される。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-35",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 35,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-35/",
    "questionText": "【問 35】 宅地建物取引業者A（甲県知事免許）の営業保証金に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 Aから建設工事を請け負った建設業者は、Aに対する請負代金債権について、営業継続中のAが供託している営業保証金から弁済を受ける権利を有する。\n\n2 Aが甲県内に新たに支店を設置したときは、本店の最寄りの供託所に政令で定める額の営業保証金を供託すれば、当該支店での事業を開始することができる。\n\n3 Aは、営業保証金の還付により、営業保証金の額が政令で定める額に不足することとなったときは、甲県知事から不足額を供託すべき旨の通知書の送付を受けた日から2週間以内にその不足額を供託しなければならない。\n\n4 Aが甲県内に本店及び2つの支店を設置して宅地建物取引業を営もうとする場合、供託すべき営業保証金の合計額は1,200万円である。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r2_10-36",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-36/",
    "questionText": "【問 36】 宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 保証協会の社員との宅地建物取引業に関する取引により生じた債権を有する者は、当該社員が納付した弁済業務保証金分担金の額に相当する額の範囲内で弁済を受ける権利を有する。\n\n2 保証協会の社員と宅地建物取引業に関し取引をした者が、その取引により生じた債権に関し、弁済業務保証金について弁済を受ける権利を実行するときは、当該保証協会の認証を受けるとともに、当該保証協会に対し還付請求をしなければならない。\n\n3 保証協会は、弁済業務保証金の還付があったときは、当該還付に係る社員又は社員であった者に対し、当該還付額に相当する額の還付充当金をその主たる事務所の最寄りの供託所に供託すべきことを通知しなければならない。\n\n4 保証協会は、弁済業務保証金の還付があったときは、当該還付額に相当する額の弁済業務保証金を供託しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-37",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-37/",
    "questionText": "【問 37】 宅地建物取引業者Aが、自ら売主として宅地の売買契約を締結した場合に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。なお、この問において「37条書面」とは、同法第37条の規定に基づき交付すべき書面をいうものとする。\n\nア Aは、専任の宅地建物取引士をして、37条書面の内容を当該契約の買主に説明させなければならない。\n\nイ Aは、供託所等に関する事項を37条書面に記載しなければならない。\n\nウ Aは、買主が宅地建物取引業者であっても、37条書面を遅滞なく交付しなければならない。\n\nエ Aは、買主が宅地建物取引業者であるときは、当該宅地の引渡しの時期及び移転登記の申請の時期を37条書面に記載しなくてもよい。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-38",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-38/",
    "questionText": "【問 38】 宅地建物取引業者Aが、BからB所有の甲住宅の売却に係る媒介の依頼を受けて締結する一般媒介契約に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 Aは、法第34条の2第1項の規定に基づき交付すべき書面に、宅地建物取引士をして記名押印させなければならない。\n\n2 Aは、甲住宅の価額について意見を述べる場合、Bに対してその根拠を口頭ではなく書面で明示しなければならない。\n\n3 Aは、当該媒介契約を締結した場合、指定流通機構に甲住宅の所在等を登録しなければならない。\n\n4 Aは、媒介契約の有効期間及び解除に関する事項を、法第34条の2第1項の規定に基づき交付すべき書面に記載しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-39",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-39/",
    "questionText": "【問 39】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者は、従業者名簿の閲覧の請求があったときは、取引の関係者か否かを問わず、請求した者の閲覧に供しなければならない。\n\n2 宅地建物取引業者は、その業務に従事させる者に従業者証明書を携帯させなければならず、その者が宅地建物取引士であり、宅地建物取引士証を携帯していても、従業者証明書を携帯させなければならない。\n\n3 宅地建物取引業者は、その事務所ごとに従業者名簿を備えなければならないが、退職した従業者に関する事項は、個人情報保護の観点から従業者名簿から消去しなければならない。\n\n4 宅地建物取引業者は、その業務に従事させる者に従業者証明書を携帯させなければならないが、その者が非常勤の役員や単に一時的に事務の補助をする者である場合には携帯させなくてもよい。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-40",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 40,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-40/",
    "questionText": "【問 40】 宅地建物取引業者Aが、自ら売主として、宅地建物取引業者ではないBとの間で宅地の売買契約を締結した場合における、宅地建物取引業法第37条の2の規定に基づくいわゆるクーリング・オフに関する次の記述のうち、Bがクーリング・オフにより契約の解除を行うことができるものはいくつあるか。\n\nア Bが喫茶店で当該宅地の買受けの申込みをした場合において、Bが、Aからクーリング・オフについて書面で告げられた日の翌日から起算して8日目にクーリング・オフによる契約の解除の書面を発送し、10日目にAに到達したとき。\n\nイ Bが喫茶店で当該宅地の買受けの申込みをした場合において、クーリング・オフによる契約の解除ができる期間内に、Aが契約の履行に着手したとき。\n\nウ Bが喫茶店で当該宅地の買受けの申込みをした場合において、AとBとの間でクーリング・オフによる契約の解除をしない旨の合意をしたとき。\n\nエ Aの事務所ではないがAが継続的に業務を行うことができる施設があり宅地建物取引業法第31条の3第1項の規定により専任の宅地建物取引士が置かれている場所で、Bが買受けの申込みをし、2日後に喫茶店で売買契約を締結したとき。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-42",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-42/",
    "questionText": "【問 42】 宅地建物取引業者Aが、自ら売主として締結する売買契約に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）及び民法の規定によれば、誤っているものはどれか。\n\n1 Aが宅地建物取引業者ではないBとの間で締結する宅地の売買契約において、当該宅地の種類又は品質に関して契約の内容に適合しない場合におけるその不適合を担保すべき責任を負う期間をBがその不適合を知った時から2年とする特約を定めた場合、この特約は有効である。\n\n2 Aが宅地建物取引業者ではないCとの間で建築工事の完了前に締結する建物（代金5,000万円）の売買契約においては、Aは、手付金200万円を受領した後、法第41条に定める手付金等の保全措置を講じなければ、当該建物の引渡し前に中間金300万円を受領することができない。\n\n3 Aが宅地建物取引業者Dとの間で造成工事の完了後に締結する宅地（代金3,000万円）の売買契約においては、Aは、法第41条の2に定める手付金等の保全措置を講じないで、当該宅地の引渡し前に手付金800万円を受領することができる。\n\n4 Aが宅地建物取引業者ではないEとの間で締結する建物の売買契約において、Aは当該建物の種類又は品質に関して契約の内容に適合しない場合におけるその不適合を担保すべき責任を一切負わないとする特約を定めた場合、この特約は無効となり、Aが当該責任を負う期間は当該建物の引渡日から2年となる。",
    "correctChoices": [
      1,
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1 / 4"
  },
  {
    "id": "r2_10-44",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-44/",
    "questionText": "【問 44】 宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、誤っているものはどれか。なお、特に断りのない限り、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 昭和55年に新築の工事に着手し完成した建物の売買の媒介を行う場合、当該建物が地方公共団体による耐震診断を受けたものであるときは、その内容を説明しなければならない。\n\n2 貸借の媒介を行う場合、敷金その他いかなる名義をもって授受されるかを問わず、契約終了時において精算することとされている金銭の精算に関する事項を説明しなければならない。\n\n3 自らを委託者とする宅地又は建物に係る信託の受益権の売主となる場合、取引の相手方が宅地建物取引業者であっても、重要事項説明書を交付して説明をしなければならない。\n\n4 区分所有建物の売買の媒介を行う場合、一棟の建物の計画的な維持修繕のための費用の積立てを行う旨の規約の定めがあるときは、その内容を説明しなければならないが、既に積み立てられている額について説明する必要はない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-45",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-45/",
    "questionText": "【問 45】 宅地建物取引業者A（甲県知事免許）が、自ら売主として宅地建物取引業者ではない買主Bに新築住宅を販売する場合における次の記述のうち、特定住宅瑕疵担保責任の履行の確保等に関する法律の規定によれば、正しいものはどれか。\n\n1 Aが媒介を依頼した宅地建物取引業者又はBが住宅販売瑕疵（かし）担保責任保険契約の締結をしていれば、Aは住宅販売瑕疵（かし）担保保証金の供託又は住宅販売瑕疵（かし）担保責任保険契約の締結を行う必要はない。\n\n2 Aが住宅販売瑕疵（かし）担保保証金の供託をし、その額が、基準日において、販売新築住宅の合計戸数を基礎として算定する基準額を超えることとなった場合、甲県知事の承認を受けた上で、その超過額を取り戻すことができる。\n\n3 新築住宅をBに引き渡したAは、基準日ごとに基準日から50日以内に、当該基準日に係る住宅販売瑕疵（かし）担保保証金の供託及び住宅販売瑕疵（かし）担保責任保険契約の締結の状況について、甲県知事に届け出なければならない。\n\n4 Bが宅地建物取引業者である場合であっても、Aは、Bに引き渡した新築住宅について、住宅販売瑕疵（かし）担保保証金の供託又は住宅販売瑕疵（かし）担保責任保険契約の締結を行う義務を負う。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-46",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 機構は、証券化支援事業（買取型）において、金融機関から買い取った住宅ローン債権を担保としてMBS（資産担保証券）を発行している。\n\n2 機構は、災害により住宅が滅失した場合におけるその住宅に代わるべき住宅の建設又は購入に係る貸付金については、元金据置期間を設けることができない。\n\n3 機構は、証券化支援事業（買取型）において、賃貸住宅の建設又は購入に必要な資金の貸付けに係る金融機関の貸付債権については譲受けの対象としていない。\n\n4 機構は、貸付けを受けた者とあらかじめ契約を締結して、その者が死亡した場合に支払われる生命保険の保険金を当該貸付けに係る債務の弁済に充当する団体信用生命保険を業務として行っている。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r2_10-47",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 47,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-47/",
    "questionText": "【問 47】 宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。\n\n1 路地状部分（敷地延長部分）のみで道路に接する土地であって、その路地状部分の面積が当該土地面積のおおむね30％以上を占める場合には、路地状部分を含む旨及び路地状部分の割合又は面積を明示しなければならない。\n\n2 新築住宅を販売するに当たり、当該物件から最寄駅まで実際に歩いたときの所要時間が15分であれば、物件から最寄駅までの道路距離にかかわらず、広告中に「最寄駅まで徒歩15分」と表示することができる。\n\n3 新築分譲住宅を販売するに当たり、予告広告である旨及び契約又は予約の申込みには応じられない旨を明瞭に表示すれば、当該物件が建築確認を受けていなくても広告表示をすることができる。\n\n4 新築分譲マンションを販売するに当たり、住戸により管理費の額が異なる場合であって、すべての住戸の管理費を示すことが広告スペースの関係で困難なときは、全住戸の管理費の平均額を表示すればよい。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r2_10-49",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 都市の中小河川の氾濫の原因の一つは、急速な都市化、宅地化に伴い、降雨時に雨水が短時間に大量に流れ込むようになったことである。\n\n2 中小河川に係る防災の観点から、宅地選定に当たっては、その地点だけでなく、周辺の地形と防災施設に十分注意することが必要である。\n\n3 地盤の液状化については、宅地の地盤条件について調べるとともに、過去の地形についても古地図などで確認することが必要である。\n\n4 地形や地質的な条件については、宅地に適しているか調査する必要があるが、周辺住民の意見は聴かなくてよい。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r2_10-50",
    "examId": "r2_10",
    "year": "令和2年度10月",
    "label": "2020 / 令和2年度10月",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R2-question.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2020-10kakomon/r02-50/",
    "questionText": "【問 50】 建築物の構造に関する次の記述のうち、最も不適当なものはどれか。\n\n1 建物の構成は、大きく基礎構造と上部構造からなっており、基礎構造は地業と基礎盤から構成されている。\n\n2 基礎の種類には、基礎の底面が建物を支持する地盤に直接接する直接基礎と、建物を支持する地盤が深い場合に使用する杭基礎（杭地業）がある。\n\n3 直接基礎の種類には、形状により、柱の下に設ける独立基礎、壁体等の下に設けるべた基礎、建物の底部全体に設ける布基礎（連続基礎）等がある。\n\n4 上部構造は、重力、風力、地震力等の荷重に耐える役目を負う主要構造と、屋根、壁、床等の仕上げ部分等から構成されている。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-01",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-1/",
    "questionText": "【問 1】 Aは、Aが所有している甲土地をBに売却した。この場合に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 甲土地を何らの権原なく不法占有しているCがいる場合、BがCに対して甲土地の所有権を主張して明渡請求をするには、甲土地の所有権移転登記を備えなければならない。\n\n2 Bが甲土地の所有権移転登記を備えていない場合には、Aから建物所有目的で甲土地を賃借して甲土地上にD名義の登記ある建物を有するDに対して、Bは自らが甲土地の所有者であることを主張することができない。\n\n3 Bが甲土地の所有権移転登記を備えないまま甲土地をEに売却した場合、Eは、甲土地の所有権移転登記なくして、Aに対して甲土地の所有権を主張することができる。\n\n4 Bが甲土地の所有権移転登記を備えた後に甲土地につき取得時効が完成したFは、甲土地の所有権移転登記を備えていなくても、Bに対して甲土地の所有権を主張することができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-04",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-4/",
    "questionText": "【問 4】 不法行為に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 放火によって家屋が滅失し、火災保険契約の被保険者である家屋所有者が当該保険契約に基づく保険金請求権を取得した場合、当該家屋所有者は、加害者に対する損害賠償請求金額からこの保険金額を、いわゆる損益相殺として控除しなければならない。\n\n2 被害者は、不法行為によって損害を受けると同時に、同一の原因によって損害と同質性のある利益を既に受けた場合でも、その額を加害者の賠償すべき損害額から控除されることはない。\n\n3 第三者が債務者を教唆して、その債務の全部又は一部の履行を不能にさせたとしても、当該第三者が当該債務の債権者に対して、不法行為責任を負うことはない。\n\n4 名誉を違法に侵害された者は、損害賠償又は名誉回復のための処分を求めることができるほか、人格権としての名誉権に基づき、加害者に対し侵害行為の差止めを求めることができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-05",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 5,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-5/",
    "questionText": "【問 5】 次の1から4までの記述のうち、民法の規定及び判例並びに下記判決文によれば、誤っているものはどれか。\n\n（判決文）\n\n本人が無権代理行為の追認を拒絶した場合には、その後に無権代理人が本人を相続したとしても、無権代理行為が有効になるものではないと解するのが相当である。けだし、無権代理人がした行為は、本人がその追認をしなければ本人に対してその効力を生ぜず（民法113条1項）、本人が追認を拒絶すれば無権代理行為の効力が本人に及ばないことが確定し、追認拒絶の後は本人であっても追認によって無権代理行為を有効とすることができず、右追認拒絶の後に無権代理人が本人を相続したとしても、右追認拒絶の効果に何ら影響を及ぼすものではないからである。\n\n1 本人が無権代理行為の追認を拒絶した場合、その後は本人であっても無権代理行為を追認して有効な行為とすることはできない。\n\n2 本人が追認拒絶をした後に無権代理人が本人を相続した場合と、本人が追認拒絶をする前に無権代理人が本人を相続した場合とで、法律効果は同じである。\n\n3 無権代理行為の追認は、別段の意思表示がないときは、契約の時にさかのぼってその効力を生ずる。ただし、第三者の権利を害することはできない。\n\n4 本人が無権代理人を相続した場合、当該無権代理行為は、その相続により当然には有効とならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r1-06",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-6/",
    "questionText": "【問 6】 遺産分割に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 被相続人は、遺言によって遺産分割を禁止することはできず、共同相続人は、遺産分割協議によって遺産の全部又は一部の分割をすることができる。\n\n2 共同相続人は、既に成立している遺産分割協議につき、その全部又は一部を全員の合意により解除した上、改めて遺産分割協議を成立させることができる。\n\n3 遺産に属する預貯金債権は、相続開始と同時に当然に相続分に応じて分割され、共同相続人は、その持分に応じて、単独で預貯金債権に関する権利を行使することができる。\n\n4 遺産の分割は、共同相続人の遺産分割協議が成立した時から効力を生ずるが、第三者の権利を害することはできない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r1-07",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 7,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-7/",
    "questionText": "【問 7】 Aを売主、Bを買主として甲建物の売買契約が締結された場合におけるBのAに対する代金債務（以下「本件代金債務」という。）に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 Bが、本件代金債務につき受領権限のないCに対して弁済した場合、Cに受領権限がないことを知らないことにつきBに過失があれば、Cが受領した代金をAに引き渡したとしても、Bの弁済は有効にならない。\n\n2 Bが、Aの代理人と称するDに対して本件代金債務を弁済した場合、Dに受領権限がないことにつきBが善意かつ無過失であれば、Bの弁済は有効となる。\n\n3 Bが、Aの相続人と称するEに対して本件代金債務を弁済した場合、Eに受領権限がないことにつきBが善意かつ無過失であれば、Bの弁済は有効となる。\n\n4 Bは、本件代金債務の履行期が過ぎた場合であっても、特段の事情がない限り、甲建物の引渡しに係る履行の提供を受けていないことを理由として、Aに対して代金の支払を拒むことができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-10",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-10/",
    "questionText": "【問 10】 債務者Aが所有する甲土地には、債権者Bが一番抵当権（債権額2,000万円）、債権者Cが二番抵当権（債権額2,400万円）、債権者Dが三番抵当権（債権額3,000万円）をそれぞれ有しているが、BはDの利益のために抵当権の順位を譲渡した。甲土地の競売に基づく売却代金が6,000万円であった場合、Bの受ける配当額として、民法の規定によれば、正しいものはどれか。\n\n1 600万円\n\n2 1,000万円\n\n3 1,440万円\n\n4 1,600万円",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-11",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-11/",
    "questionText": "【問 11】 甲土地につき、期間を50年と定めて賃貸借契約を締結しようとする場合（以下「ケース①」という。）と、期間を15年と定めて賃貸借契約を締結しようとする場合（以下「ケース②」という。）に関する次の記述のうち、民法及び借地借家法の規定によれば、正しいものはどれか。\n\n1 賃貸借契約が建物を所有する目的ではなく、資材置場とする目的である場合、ケース①は期間の定めのない契約になり、ケース②では期間は15年となる。\n\n2 賃貸借契約が建物の所有を目的とする場合、公正証書で契約を締結しなければ、ケース①の期間は30年となり、ケース②の期間は15年となる。\n\n3 賃貸借契約が居住の用に供する建物の所有を目的とする場合、ケース①では契約の更新がないことを書面で定めればその特約は有効であるが、ケース②では契約の更新がないことを書面で定めても無効であり、期間は30年となる。\n\n4 賃貸借契約が専ら工場の用に供する建物の所有を目的とする場合、ケース①では契約の更新がないことを公正証書で定めた場合に限りその特約は有効であるが、ケース②では契約の更新がないことを公正証書で定めても無効である。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-12",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-12/",
    "questionText": "【問 12】 AがBに対し、A所有の甲建物を3年間賃貸する旨の契約をした場合における次の記述のうち、民法及び借地借家法の規定によれば、正しいものはどれか（借地借家法第39条に定める取壊し予定の建物の賃貸借及び同法第40条に定める一時使用目的の建物の賃貸借は考慮しないものとする。）。\n\n1 AB間の賃貸借契約について、契約の更新がない旨を定めるには、公正証書による等書面によって契約すれば足りる。\n\n2 甲建物が居住の用に供する建物である場合には、契約の更新がない旨を定めることはできない。\n\n3 AがBに対して、期間満了の3月前までに更新しない旨の通知をしなければ、従前の契約と同一の条件で契約を更新したものとみなされるが、その期間は定めがないものとなる。\n\n4 Bが適法に甲建物をCに転貸していた場合、Aは、Bとの賃貸借契約が解約の申入れによって終了するときは、特段の事情がない限り、Cにその旨の通知をしなければ、賃貸借契約の終了をCに対抗することができない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-14",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 14,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-14/",
    "questionText": "【問 14】 不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、誤っているものはどれか。\n\n1 登記の申請に係る不動産の所在地が当該申請を受けた登記所の管轄に属しないときは、登記官は、理由を付した決定で、当該申請を却下しなければならない。\n\n2 所有権の登記名義人が相互に異なる土地の合筆の登記は、することができない。\n\n3 登記官は、一筆の土地の一部が別の地目となったときであっても、職権で当該土地の分筆の登記をすることはできない。\n\n4 登記の申請をする者の委任による代理人の権限は、本人の死亡によっては、消滅しない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-15",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-15/",
    "questionText": "【問 15】 都市計画法に関する次の記述のうち、誤っているものはどれか。\n\n1 高度地区は、用途地域内において市街地の環境を維持し、又は土地利用の増進を図るため、建築物の高さの最高限度又は最低限度を定める地区とされている。\n\n2 特定街区については、都市計画に、建築物の容積率並びに建築物の高さの最高限度及び壁面の位置の制限を定めるものとされている。\n\n3 準住居地域は、道路の沿道としての地域の特性にふさわしい業務の利便の増進を図りつつ、これと調和した住居の環境を保護するため定める地域とされている。\n\n4 特別用途地区は、用途地域が定められていない土地の区域（市街化調整区域を除く。）内において、その良好な環境の形成又は保持のため当該地域の特性に応じて合理的な土地利用が行われるよう、制限すべき特定の建築物等の用途の概要を定める地区とされている。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-16",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、正しいものはどれか。ただし、許可を要する開発行為の面積については、条例による定めはないものとし、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 準都市計画区域において、店舗の建築を目的とした4,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n2 市街化区域において、農業を営む者の居住の用に供する建築物の建築を目的とした1,500㎡の土地の区画形質の変更を行おうとする者は、都道府県知事の許可を受けなくてよい。\n\n3 市街化調整区域において、野球場の建設を目的とした8,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n4 市街化調整区域において、医療法に規定する病院の建築を目的とした1,000㎡の土地の区画形質の変更を行おうとする者は、都道府県知事の許可を受けなくてよい。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-17",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-17/",
    "questionText": "【問 17】 建築基準法に関する次の記述のうち、誤っているものはどれか。\n\n1 特定行政庁は、緊急の必要がある場合においては、建築基準法の規定に違反した建築物の所有者等に対して、仮に、当該建築物の使用禁止又は使用制限の命令をすることができる。\n\n2 地方公共団体は、条例で、津波、高潮、出水等による危険の著しい区域を災害危険区域として指定することができ、当該区域内における住居の用に供する建築物の建築の禁止その他建築物の建築に関する制限で災害防止上必要なものは当該条例で定めることとされている。\n\n3 防火地域内にある看板で建築物の屋上に設けるものは、その主要な部分を不燃材料で造り、又はおおわなければならない。\n\n4 共同住宅の住戸には、非常用の照明装置を設けなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-18",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-18/",
    "questionText": "【問 18】 建築基準法に関する次の記述のうち、正しいものはどれか。\n\n1 第一種低層住居専用地域内においては、延べ面積の合計が60㎡であって、居住の用に供する延べ面積が40㎡、クリーニング取次店の用に供する延べ面積が20㎡である兼用住宅は、建築してはならない。\n\n2 工業地域内においては、幼保連携型認定こども園を建築することができる。\n\n3 都市計画において定められた建蔽率の限度が10分の8とされている地域外で、かつ、防火地域内にある準耐火建築物の建蔽率については、都市計画において定められた建蔽率の数値に10分の1を加えた数値が限度となる。\n\n4 地方公共団体は、その敷地が袋路状道路にのみ接する一戸建ての住宅について、条例で、その敷地が接しなければならない道路の幅員に関して必要な制限を付加することができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r1-20",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 20,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-20/",
    "questionText": "【問 20】 土地区画整理法に関する次の記述のうち、誤っているものはどれか。\n\n1 仮換地の指定があった日後、土地区画整理事業の施行による施行地区内の土地及び建物の変動に係る登記がされるまでの間は、登記の申請人が確定日付のある書類によりその指定前に登記原因が生じたことを証明した場合を除き、施行地区内の土地及び建物に関しては他の登記をすることができない。\n\n2 施行者が個人施行者、土地区画整理組合、区画整理会社、市町村、独立行政法人都市再生機構又は地方住宅供給公社であるときは、その換地計画について都道府県知事の認可を受けなければならない。\n\n3 個人施行者以外の施行者は、換地計画を定めようとする場合においては、その換地計画を2週間公衆の縦覧に供しなければならない。\n\n4 換地処分の公告があった場合においては、換地計画において定められた換地は、その公告があった日の翌日から従前の宅地とみなされ、換地計画において換地を定めなかった従前の宅地について存する権利は、その公告があった日が終了した時において消滅する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-21",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-21/",
    "questionText": "【問 21】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 耕作目的で原野を農地に転用しようとする場合、法第4条第1項の許可は不要である。\n\n2 金融機関からの資金借入れのために農地に抵当権を設定する場合、法第3条第1項の許可が必要である。\n\n3 市街化区域内の農地を自家用駐車場に転用する場合、法第4条第1項の許可が必要である。\n\n4 砂利採取法による認可を受けた採取計画に従って砂利採取のために農地を一時的に貸し付ける場合、法第5条第1項の許可は不要である。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-22",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-22/",
    "questionText": "【問 22】 国土利用計画法第23条の届出（以下この問において「事後届出」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者Aが、自己の所有する市街化区域内の2,000㎡の土地を、個人B、個人Cに1,000㎡ずつに分割して売却した場合、B、Cは事後届出を行わなければならない。\n\n2 個人Dが所有する市街化区域内の3,000㎡の土地を、個人Eが相続により取得した場合、Eは事後届出を行わなければならない。\n\n3 宅地建物取引業者Fが所有する市街化調整区域内の6,000㎡の一団の土地を、宅地建物取引業者Gが一定の計画に従って、3,000㎡ずつに分割して購入した場合、Gは事後届出を行わなければならない。\n\n4 甲市が所有する市街化調整区域内の12,000㎡の土地を、宅地建物取引業者Hが購入した場合、Hは事後届出を行わなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-23",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-23/",
    "questionText": "【問 23】 個人が令和元年（平成31年）中に平成31年1月1日において所有期間が10年を超える居住用財産を譲渡した場合のその譲渡に係る譲渡所得の課税に関する次の記述のうち、誤っているものはどれか。\n\n1 その譲渡について収用交換等の場合の譲渡所得等の5,000万円特別控除の適用を受ける場合であっても、その特別控除後の譲渡益について、居住用財産を譲渡した場合の軽減税率の特例の適用を受けることができる。\n\n2 居住用財産を譲渡した場合の軽減税率の特例は、その個人が平成29年において既にその特例の適用を受けている場合であっても、令和元年（平成31年）中の譲渡による譲渡益について適用を受けることができる。\n\n3 居住用財産の譲渡所得の3,000万円特別控除は、その個人がその個人と生計を一にしていない孫に譲渡した場合には、適用を受けることができない。\n\n4 その譲渡について収用等に伴い代替資産を取得した場合の課税の特例の適用を受ける場合には、その譲渡があったものとされる部分の譲渡益について、居住用財産を譲渡した場合の軽減税率の特例の適用を受けることができない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r1-24",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 24,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-24/",
    "questionText": "【問 24】 固定資産税に関する次の記述のうち、地方税法の規定によれば、正しいものはどれか。\n\n1 居住用超高層建築物（いわゆるタワーマンション）に対して課する固定資産税は、当該居住用超高層建築物に係る固定資産税額を、各専有部分の取引価格の当該居住用超高層建築物の全ての専有部分の取引価格の合計額に対する割合により按分した額を、各専有部分の所有者に対して課する。\n\n2 住宅用地のうち、小規模住宅用地に対して課する固定資産税の課税標準は、当該小規模住宅用地に係る固定資産税の課税標準となるべき価格の3分の1の額とされている。\n\n3 固定資産税の納期は、他の税目の納期と重複しないようにとの配慮から、4月、7月、12月、2月と定められており、市町村はこれと異なる納期を定めることはできない。\n\n4 固定資産税は、固定資産の所有者に対して課されるが、質権又は100年より永い存続期間の定めのある地上権が設定されている土地については、所有者ではなくその質権者又は地上権者が固定資産税の納税義務者となる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-25",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-25/",
    "questionText": "【問 25】 地価公示法に関する次の記述のうち、正しいものはどれか。\n\n1 都市及びその周辺の地域等において、土地の取引を行う者は、取引の対象土地から最も近傍の標準地について公示された価格を指標として取引を行うよう努めなければならない。\n\n2 標準地は、都市計画区域外や国土利用計画法の規定により指定された規制区域内からは選定されない。\n\n3 標準地の正常な価格とは、土地について、自由な取引が行われるとした場合におけるその取引（一定の場合を除く。）において通常成立すると認められる価格をいい、当該土地に関して地上権が存する場合は、この権利が存しないものとして通常成立すると認められる価格となる。\n\n4 土地鑑定委員会は、自然的及び社会的条件からみて類似の利用価値を有すると認められる地域において、土地の利用状況、環境等が特に良好と認められる一団の土地について標準地を選定する。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-26",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 26,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-26/",
    "questionText": "【問 26】 宅地建物取引業法に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者は、自己の名義をもって、他人に、宅地建物取引業を営む旨の表示をさせてはならないが、宅地建物取引業を営む目的をもってする広告をさせることはできる。\n\n2 宅地建物取引業とは、宅地又は建物の売買等をする行為で業として行うものをいうが、建物の一部の売買の代理を業として行う行為は、宅地建物取引業に当たらない。\n\n3 宅地建物取引業の免許を受けていない者が営む宅地建物取引業の取引に、宅地建物取引業者が代理又は媒介として関与していれば、当該取引は無免許事業に当たらない。\n\n4 宅地建物取引業者の従業者が、当該宅地建物取引業者とは別に自己のために免許なく宅地建物取引業を営むことは、無免許事業に当たる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-28",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-28/",
    "questionText": "【問 28】 宅地建物取引業者が建物の貸借の媒介を行う場合における宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 当該建物が住宅の品質確保の促進等に関する法律第5条第1項に規定する住宅性能評価を受けた新築住宅であるときは、その旨を説明しなければならない。\n\n2 当該建物が既存の建物であるときは、既存住宅に係る住宅の品質確保の促進等に関する法律第6条第3項に規定する建設住宅性能評価書の保存の状況について説明しなければならない。\n\n3 当該建物が既存の建物である場合、石綿使用の有無の調査結果の記録がないときは、石綿使用の有無の調査を自ら実施し、その結果について説明しなければならない。\n\n4 当該建物が建物の区分所有等に関する法律第2条第1項に規定する区分所有権の目的であるものであって、同条第3項に規定する専有部分の用途その他の利用の制限に関する規約の定めがあるときは、その内容を説明しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-29",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 29,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-29/",
    "questionText": "【問 29】 宅地建物取引業法（以下この問において「法」という。）の規定に基づく監督処分及び罰則に関する次の記述のうち、正しいものはいくつあるか。\n\nア 宅地建物取引業者A（国土交通大臣免許）が甲県内における業務に関し、法第37条に規定する書面を交付していなかったことを理由に、甲県知事がAに対して業務停止処分をしようとするときは、あらかじめ、内閣総理大臣に協議しなければならない。\n\nイ 乙県知事は、宅地建物取引業者B（乙県知事免許）に対して指示処分をしようとするときは、聴聞を行わなければならず、聴聞の期日における審理は、公開により行わなければならない。\n\nウ 丙県知事は、宅地建物取引業者C（丙県知事免許）が免許を受けてから1年以内に事業を開始しないときは、免許を取り消さなければならない。\n\nエ 宅地建物取引業者D（丁県知事免許）は、法第72条第1項の規定に基づき、丁県知事から業務について必要な報告を求められたが、これを怠った。この場合、Dは50万円以下の罰金に処せられることがある。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-30",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-30/",
    "questionText": "【問 30】 宅地建物取引業者が行う広告に関する次の記述のうち、宅地建物取引業法の規定に違反するものはいくつあるか。\n\nア 建築基準法第6条第1項に基づき必要とされる確認を受ける前において、建築工事着手前の賃貸住宅の貸主から当該住宅の貸借の媒介を依頼され、取引態様を媒介と明示して募集広告を行った。\n\nイ 一団の宅地の売買について、数回に分けて広告する際に、最初に行った広告以外には取引態様の別を明示しなかった。\n\nウ 建物の貸借の媒介において、依頼者の依頼によらない通常の広告を行い、国土交通大臣の定める報酬限度額の媒介報酬のほか、当該広告の料金に相当する額を受領した。\n\nエ 建築工事着手前の分譲住宅の販売において、建築基準法第6条第1項に基づき必要とされる確認を受ける前に、取引態様を売主と明示して当該住宅の広告を行った。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-31",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 31,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-31/",
    "questionText": "【問 31】 宅地建物取引業者Aが、BからB所有の既存のマンションの売却に係る媒介を依頼され、Bと専任媒介契約（専属専任媒介契約ではないものとする。）を締結した。この場合における次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。\n\nア Aは、専任媒介契約の締結の日から7日以内に所定の事項を指定流通機構に登録しなければならないが、その期間の計算については、休業日数を算入しなければならない。\n\nイ AがBとの間で有効期間を6月とする専任媒介契約を締結した場合、その媒介契約は無効となる。\n\nウ Bが宅地建物取引業者である場合、Aは、当該専任媒介契約に係る業務の処理状況の報告をする必要はない。\n\nエ AがBに対して建物状況調査を実施する者のあっせんを行う場合、建物状況調査を実施する者は建築士法第2条第1項に規定する建築士であって国土交通大臣が定める講習を修了した者でなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-33",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-33/",
    "questionText": "【問 33】 宅地建物取引業保証協会（以下この問において「保証協会」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者で保証協会に加入した者は、その加入の日から2週間以内に、弁済業務保証金分担金を保証協会に納付しなければならない。\n\n2 保証協会の社員となった宅地建物取引業者が、保証協会に加入する前に供託していた営業保証金を取り戻すときは、還付請求権者に対する公告をしなければならない。\n\n3 保証協会の社員は、新たに事務所を設置したにもかかわらずその日から2週間以内に弁済業務保証金分担金を納付しなかったときは、保証協会の社員の地位を失う。\n\n4 還付充当金の未納により保証協会の社員の地位を失った宅地建物取引業者は、その地位を失った日から2週間以内に弁済業務保証金を供託すれば、その地位を回復する。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-35",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 35,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-35/",
    "questionText": "【問 35】 宅地建物取引業者Aが行う業務に関する次の記述のうち、宅地建物取引業法の規定に違反しないものはどれか。\n\n1 Aは、宅地建物取引業者ではないBが所有する宅地について、Bとの間で確定測量図の交付を停止条件とする売買契約を締結した。その後、停止条件が成就する前に、Aは自ら売主として、宅地建物取引業者ではないCとの間で当該宅地の売買契約を締結した。\n\n2 Aは、その主たる事務所に従事する唯一の専任の宅地建物取引士Dが令和元年5月15日に退職したため、同年6月10日に新たな専任の宅地建物取引士Eを置いた。\n\n3 Aは、宅地建物取引業者Fから宅地の売買に関する注文を受けた際、Fに対して取引態様の別を明示しなかった。\n\n4 Aは、宅地の貸借の媒介に際し、当該宅地が都市計画法第29条の許可の申請中であることを知りつつ、賃貸借契約を成立させた。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-36",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-36/",
    "questionText": "【問 36】 宅地建物取引業者Aが宅地建物取引業法（以下この問において「法」という。）第37条の規定により交付すべき書面（以下この問において「37条書面」という。）に関する次の記述のうち、法の規定によれば、正しいものはいくつあるか。\n\nア Aは、その媒介により建築工事完了前の建物の売買契約を成立させ、当該建物を特定するために必要な表示について37条書面で交付する際、法第35条の規定に基づく重要事項の説明において使用した図書の交付により行った。\n\nイ Aが自ら貸主として宅地の定期賃貸借契約を締結した場合において、借賃の支払方法についての定めがあるときは、Aは、その内容を37条書面に記載しなければならず、借主が宅地建物取引業者であっても、当該書面を交付しなければならない。\n\nウ 土地付建物の売主Aは、買主が金融機関から住宅ローンの承認を得られなかったときは契約を無条件で解除できるという取決めをしたが、自ら住宅ローンのあっせんをする予定がなかったので、37条書面にその取決めの内容を記載しなかった。\n\nエ Aがその媒介により契約を成立させた場合において、契約の解除に関する定めがあるときは、当該契約が売買、貸借のいずれに係るものであるかを問わず、37条書面にその内容を記載しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r1-37",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-37/",
    "questionText": "【問 37】 宅地建物取引業者Aが、自ら売主として、宅地建物取引業者ではないBとの間で締結する建築工事完了前のマンション（代金3,000万円）の売買契約に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 Aが手付金として200万円を受領しようとする場合、Aは、Bに対して書面で法第41条に定める手付金等の保全措置を講じないことを告げれば、当該手付金について保全措置を講じる必要はない。\n\n2 Aが手付金を受領している場合、Bが契約の履行に着手する前であっても、Aは、契約を解除することについて正当な理由がなければ、手付金の倍額を償還して契約を解除することができない。\n\n3 Aが150万円を手付金として受領し、さらに建築工事完了前に中間金として50万円を受領しようとする場合、Aは、手付金と中間金の合計額200万円について法第41条に定める手付金等の保全措置を講じれば、当該中間金を受領することができる。\n\n4 Aが150万円を手付金として受領し、さらに建築工事完了前に中間金として500万円を受領しようとする場合、Aは、手付金と中間金の合計額650万円について法第41条に定める手付金等の保全措置を講じたとしても、当該中間金を受領することができない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-38",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-38/",
    "questionText": "【問 38】 宅地建物取引業者Aが、自ら売主として、宅地建物取引業者ではないBとの間で宅地の売買契約を締結した場合における、宅地建物取引業法第37条の2の規定に基づくいわゆるクーリング・オフに関する次の記述のうち、誤っているものはいくつあるか。\n\nア Bがクーリング・オフにより売買契約を解除した場合、当該契約の解除に伴う違約金について定めがあるときは、Aは、Bに対して違約金の支払を請求することができる。\n\nイ Aは、Bの指定した喫茶店で買受けの申込みを受けたが、その際クーリング・オフについて何も告げず、その3日後に、クーリング・オフについて書面で告げたうえで売買契約を締結した。この契約において、クーリング・オフにより契約を解除できる期間について買受けの申込みをした日から起算して10日間とする旨の特約を定めた場合、当該特約は無効となる。\n\nウ Aが媒介を依頼した宅地建物取引業者Cの事務所でBが買受けの申込みをし、売買契約を締結した場合、Aからクーリング・オフについて何も告げられていなければ、当該契約を締結した日から起算して8日経過していてもクーリング・オフにより契約を解除することができる。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r1-39",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-39/",
    "questionText": "【問 39】 宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 既存住宅の貸借の媒介を行う場合、建物の建築及び維持保全の状況に関する書類の保存状況について説明しなければならない。\n\n2 宅地の売買の媒介を行う場合、登記された抵当権について、引渡しまでに抹消される場合は説明しなくてよい。\n\n3 宅地の貸借の媒介を行う場合、借地権の存続期間を50年とする賃貸借契約において、契約終了時における当該宅地の上の建物の取壊しに関する事項を定めようとするときは、その内容を説明しなければならない。\n\n4 建物の売買又は貸借の媒介を行う場合、当該建物が津波防災地域づくりに関する法律第53条第1項により指定された津波災害警戒区域内にあるときは、その旨を、売買の場合は説明しなければならないが、貸借の場合は説明しなくてよい。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-40",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 40,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-40/",
    "questionText": "【問 40】 次の記述のうち、宅地建物取引業法の規定によれば、誤っているものはどれか。\n\n1 宅地建物取引業者の従業者は、取引の関係者の請求があったときは、従業者証明書を提示しなければならないが、宅地建物取引士は、重要事項の説明をするときは、請求がなくても説明の相手方に対し、宅地建物取引士証を提示しなければならない。\n\n2 宅地建物取引業者は、その業務に関する帳簿を、各取引の終了後5年間、当該宅地建物取引業者が自ら売主となる新築住宅に係るものにあっては10年間、保存しなければならない。\n\n3 宅地建物取引業者が、一団の宅地建物の分譲を案内所を設置して行う場合、その案内所が一時的かつ移動が容易な施設であるときは、当該案内所には、クーリング・オフ制度の適用がある旨等所定の事項を表示した標識を掲げなければならない。\n\n4 宅地建物取引業者が、一団の宅地建物の分譲を案内所を設置して行う場合、その案内所が契約を締結し、又は契約の申込みを受ける場所であるときは、当該案内所には、専任の宅地建物取引士を置かなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "r1-41",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 41,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-41/",
    "questionText": "【問 41】 宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明（以下この問において「重要事項説明」という。）に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 建物管理が管理会社に委託されている建物の貸借の媒介をする宅地建物取引業者は、当該建物が区分所有建物であるか否かにかかわらず、その管理会社の商号及びその主たる事務所の所在地について、借主に説明しなければならない。\n\n2 宅地建物取引業者である売主は、他の宅地建物取引業者に媒介を依頼して宅地の売買契約を締結する場合、重要事項説明の義務を負わない。\n\n3 建物の貸借の媒介において、建築基準法に規定する建蔽率及び容積率に関する制限があるときは、その概要を説明しなければならない。\n\n4 重要事項説明では、代金、交換差金又は借賃の額を説明しなければならないが、それ以外に授受される金銭の額については説明しなくてよい。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-42",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-42/",
    "questionText": "【問 42】 宅地建物取引業法第2条第1号に規定する宅地に関する次の記述のうち、誤っているものはどれか。\n\n1 建物の敷地に供せられる土地は、都市計画法に規定する用途地域の内外を問わず宅地であるが、道路、公園、河川等の公共施設の用に供せられている土地は、用途地域内であれば宅地とされる。\n\n2 宅地とは、現に建物の敷地に供せられている土地に限らず、広く建物の敷地に供する目的で取引の対象とされた土地をいうものであり、その地目、現況の如何を問わない。\n\n3 都市計画法に規定する市街化調整区域内において、建物の敷地に供せられる土地は宅地である。\n\n4 都市計画法に規定する準工業地域内において、建築資材置場の用に供せられている土地は宅地である。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-44",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-44/",
    "questionText": "【問 44】 宅地建物取引業法に規定する宅地建物取引士資格登録（以下この問において「登録」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 業務停止の処分に違反したとして宅地建物取引業の免許の取消しを受けた法人の政令で定める使用人であった者は、当該免許取消しの日から5年を経過しなければ、登録を受けることができない。\n\n2 宅地建物取引業者A（甲県知事免許）に勤務する宅地建物取引士（甲県知事登録）が、宅地建物取引業者B（乙県知事免許）に勤務先を変更した場合は、乙県知事に対して、遅滞なく勤務先の変更の登録を申請しなければならない。\n\n3 甲県知事登録を受けている者が、甲県から乙県に住所を変更した場合は、宅地建物取引士証の交付を受けていなくても、甲県知事に対して、遅滞なく住所の変更の登録を申請しなければならない。\n\n4 宅地建物取引士資格試験に合格した者は、宅地建物取引に関する実務の経験を有しない場合でも、合格した日から1年以内に登録を受けようとするときは、登録実務講習を受講する必要はない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-46",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 機構は、証券化支援事業（買取型）において、中古住宅を購入するための貸付債権を買取りの対象としていない。\n\n2 機構は、証券化支援事業（買取型）において、バリアフリー性、省エネルギー性、耐震性又は耐久性・可変性に優れた住宅を取得する場合に、貸付金の利率を一定期間引き下げる制度を実施している。\n\n3 機構は、マンション管理組合や区分所有者に対するマンション共用部分の改良に必要な資金の貸付けを業務として行っている。\n\n4 機構は、災害により住宅が滅失した場合において、それに代わるべき建築物の建設又は購入に必要な資金の貸付けを業務として行っている。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "r1-47",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 47,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-47/",
    "questionText": "【問 47】 宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。\n\n1 土地を販売するに当たり、購入者に対し、購入後一定期間内に当該土地に建物を建築することを条件としていても、建物建築の発注先を購入者が自由に選定できることとなっていれば、当該土地の広告に「建築条件付土地」と表示する必要はない。\n\n2 新聞折込チラシにおいて新築賃貸マンションの賃料を表示するに当たり、すべての住戸の賃料を表示することがスペース上困難な場合は、標準的な1住戸1か月当たりの賃料を表示すれば、不当表示に問われることはない。\n\n3 リフォーム済みの中古住宅については、リフォーム済みである旨を必ず表示しなければならない。\n\n4 分譲住宅について、住宅の購入者から買い取って再度販売する場合、当該住宅が建築後1年未満で居住の用に供されたことがないものであるときは、広告に「新築」と表示しても、不当表示に問われることはない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "r1-49",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 台地、段丘は、農地として利用され、また都市的な土地利用も多く、地盤も安定している。\n\n2 台地を刻む谷や台地上の池沼を埋め立てた所では、地盤の液状化が発生し得る。\n\n3 台地、段丘は、水はけも良く、宅地として積極的に利用されているが、自然災害に対して安全度の低い所である。\n\n4 旧河道や低湿地、海浜の埋立地では、地震による地盤の液状化対策が必要である。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "r1-50",
    "examId": "r1",
    "year": "令和元年度",
    "label": "2019 / 令和元年度",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/R1-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2019kakomon/r01-50/",
    "questionText": "【問 50】 建築物の構造に関する次の記述のうち、最も不適当なものはどれか。\n\n1 地震に対する建物の安全確保においては、耐震、制震、免震という考え方がある。\n\n2 制震は制振ダンパーなどの制振装置を設置し、地震等の周期に建物が共振することで起きる大きな揺れを制御する技術である。\n\n3 免震はゴムなどの免震装置を設置し、上部構造の揺れを減らす技術である。\n\n4 耐震は、建物の強度や粘り強さで地震に耐える技術であるが、既存不適格建築物の地震に対する補強には利用されていない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h30-02",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-2/",
    "questionText": "【問 2】 Aが、所有する甲土地の売却に関する代理権をBに授与し、BがCとの間で、Aを売主、Cを買主とする甲土地の売買契約（以下この問において「本件契約」という。）を締結した場合における次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 Bが売買代金を着服する意図で本件契約を締結し、Cが本件契約の締結時点でこのことを知っていた場合であっても、本件契約の効果はAに帰属する。\n\n2 AがBに代理権を授与するより前にBが補助開始の審判を受けていた場合、Bは有効に代理権を取得することができない。\n\n3 BがCの代理人にもなって本件契約を成立させた場合、Aの許諾の有無にかかわらず、本件契約は無効となる。\n\n4 AがBに代理権を授与した後にBが後見開始の審判を受け、その後に本件契約が締結された場合、Bによる本件契約の締結は無権代理行為となる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h30-03",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-3/",
    "questionText": "【問 3】 AとBとの間で、5か月後に実施される試験（以下この問において「本件試験」という。）にBが合格したときにはA所有の甲建物をBに贈与する旨を書面で約した（以下この問において「本件約定」という。）。この場合における次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 本件約定は、停止条件付贈与契約である。\n\n2 本件約定の後、Aの放火により甲建物が滅失し、その後にBが本件試験に合格した場合、AはBに対して損害賠償責任を負う。\n\n3 Bは、本件試験に合格したときは、本件約定の時点にさかのぼって甲建物の所有権を取得する。\n\n4 本件約定の時点でAに意思能力がなかった場合、Bは、本件試験に合格しても、本件約定に基づき甲建物の所有権を取得することはできない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h30-04",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 4,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-4/",
    "questionText": "【問 4】 時効の援用に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 消滅時効完成後に主たる債務者が時効の利益を放棄した場合であっても、保証人は時効を援用することができる。\n\n2 後順位抵当権者は、先順位抵当権の被担保債権の消滅時効を援用することができる。\n\n3 詐害行為の受益者は、債権者から詐害行為取消権を行使されている場合、当該債権者の有する被保全債権について、消滅時効を援用することができる。\n\n4 債務者が時効の完成の事実を知らずに債務の承認をした場合、その後、債務者はその完成した消滅時効を援用することはできない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h30-05",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 5,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-5/",
    "questionText": "【問 5】 Aは、隣人Bの留守中に台風が接近して、屋根の一部が壊れていたB宅に甚大な被害が生じる差し迫ったおそれがあったため、Bからの依頼なくB宅の屋根を修理した。この場合における次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 Aは、Bに対して、特段の事情がない限り、B宅の屋根を修理したことについて報酬を請求することができない。\n\n2 Aは、Bからの請求があったときには、いつでも、本件事務処理の状況をBに報告しなければならない。\n\n3 Aは、B宅の屋根を善良な管理者の注意をもって修理しなければならない。\n\n4 AによるB宅の屋根の修理が、Bの意思に反することなく行われた場合、AはBに対し、Aが支出した有益な費用全額の償還を請求することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h30-06",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-6/",
    "questionText": "【問 6】 Aが所有する甲土地上にBが乙建物を建築して所有権を登記していたところ、AがBから乙建物を買い取り、その後、Aが甲土地にCのために抵当権を設定し登記した。この場合の法定地上権に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 Aが乙建物の登記をA名義に移転する前に甲土地に抵当権を設定登記していた場合、甲土地の抵当権が実行されたとしても、乙建物のために法定地上権は成立しない。\n\n2 Aが乙建物を取り壊して更地にしてから甲土地に抵当権を設定登記し、その後にAが甲土地上に丙建物を建築していた場合、甲土地の抵当権が実行されたとしても、丙建物のために法定地上権は成立しない。\n\n3 Aが甲土地に抵当権を設定登記するのと同時に乙建物にもCのために共同抵当権を設定登記した後、乙建物を取り壊して丙建物を建築し、丙建物にCのために抵当権を設定しないまま甲土地の抵当権が実行された場合、丙建物のために法定地上権は成立しない。\n\n4 Aが甲土地に抵当権を設定登記した後、乙建物をDに譲渡した場合、甲土地の抵当権が実行されると、乙建物のために法定地上権が成立する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-08",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 8,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-8/",
    "questionText": "【問 8】 次の1から4までの記述のうち、民法の規定及び下記判決文によれば、誤っているものはどれか。\n\n（判決文）\n賃借人は、賃貸借契約が終了した場合には、賃借物件を原状に回復して賃貸人に返還する義務があるところ、賃貸借契約は、賃借人による賃借物件の使用とその対価としての賃料の支払を内容とするものであり、賃借物件の損耗の発生は、賃貸借という契約の本質上当然に予定されているものである。それゆえ、建物の賃貸借においては、賃借人が社会通念上通常の使用をした場合に生ずる賃借物件の劣化又は価値の減少を意味する通常損耗に係る投下資本の減価の回収は、通常、減価償却費や修繕費等の必要経費分を賃料の中に含ませてその支払を受けることにより行われている。そうすると、建物の賃借人にその賃貸借において生ずる通常損耗についての原状回復義務を負わせるのは、賃借人に予期しない特別の負担を課すことになるから、賃借人に同義務が認められるためには、（中略）その旨の特約（以下「通常損耗補修特約」という。）が明確に合意されていることが必要であると解するのが相当である。\n\n1 賃借物件を賃借人がどのように使用しても、賃借物件に発生する損耗による減価の回収は、賃貸人が全て賃料に含ませてその支払を受けることにより行っている。\n\n2 通常損耗とは、賃借人が社会通念上通常の使用をした場合に生ずる賃借物件の劣化又は価値の減少を意味する。\n\n3 賃借人が負担する通常損耗の範囲が賃貸借契約書に明記されておらず口頭での説明等もない場合に賃借人に通常損耗についての原状回復義務を負わせるのは、賃借人に予期しない特別の負担を課すことになる。\n\n4 賃貸借契約に賃借人が原状回復義務を負う旨が定められていても、それをもって、賃借人が賃料とは別に通常損耗の補修費を支払う義務があるとはいえない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-09",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-9/",
    "questionText": "【問 9】 Aは、平成30年10月1日、A所有の甲土地につき、Bとの間で、代金1,000万円、支払期日を同年12月1日とする売買契約を締結した。この場合の相殺に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 BがAに対して同年12月31日を支払期日とする貸金債権を有している場合には、Bは同年12月1日に売買代金債務と当該貸金債権を対当額で相殺することができる。\n\n2 同年11月1日にAの売買代金債権がAの債権者Cにより差し押さえられても、Bは、同年11月2日から12月1日までの間にAに対する別の債権を取得した場合には、同年12月1日に売買代金債務と当該債権を対当額で相殺することができる。\n\n3 同年10月10日、BがAの自動車事故によって被害を受け、Aに対して不法行為に基づく損害賠償債権を取得した場合には、Bは売買代金債務と当該損害賠償債権を対当額で相殺することができる。\n\n4 BがAに対し同年9月30日に消滅時効の期限が到来する貸金債権を有していた場合には、Aが当該消滅時効を援用したとしても、Bは売買代金債務と当該貸金債権を対当額で相殺することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h30-10",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-10/",
    "questionText": "【問 10】 相続に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 無権代理人が本人に無断で本人の不動産を売却した後に、単独で本人を相続した場合、本人が自ら当該不動産を売却したのと同様な法律上の効果が生じる。\n\n2 相続財産に属する不動産について、遺産分割前に単独の所有権移転登記をした共同相続人から移転登記を受けた第三取得者に対し、他の共同相続人は、自己の持分を登記なくして対抗することができる。\n\n3 連帯債務者の一人が死亡し、その相続人が数人ある場合、相続人らは被相続人の債務の分割されたものを承継し、各自その承継した範囲において、本来の債務者とともに連帯債務者となる。\n\n4 共同相続に基づく共有物の持分価格が過半数を超える相続人は、協議なくして単独で共有物を占有する他の相続人に対して、当然にその共有物の明渡しを請求することができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h30-11",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-11/",
    "questionText": "【問 11】 AとBとの間で、A所有の甲土地につき建物所有目的で賃貸借契約（以下この問において「本件契約」という。）を締結する場合に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、正しいものはどれか。\n\n1 本件契約が専ら事業の用に供する建物の所有を目的とする場合には、公正証書によらなければ無効となる。\n\n2 本件契約が居住用の建物の所有を目的とする場合には、借地権の存続期間を20年とし、かつ、契約の更新請求をしない旨を定めても、これらの規定は無効となる。\n\n3 本件契約において借地権の存続期間を60年と定めても、公正証書によらなければ、その期間は30年となる。\n\n4 Bは、甲土地につき借地権登記を備えなくても、Bと同姓でかつ同居している未成年の長男名義で保存登記をした建物を甲土地上に所有していれば、甲土地の所有者が替わっても、甲土地の新所有者に対し借地権を対抗することができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h30-12",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-12/",
    "questionText": "【問 12】 AとBとの間で、Aが所有する甲建物をBが5年間賃借する旨の契約を締結した場合における次の記述のうち、民法及び借地借家法の規定によれば、正しいものはどれか（借地借家法第39条に定める取壊し予定の建物の賃貸借及び同法第40条に定める一時使用目的の建物の賃貸借は考慮しないものとする。）。\n\n1 AB間の賃貸借契約が借地借家法第38条の定期建物賃貸借で、契約の更新がない旨を定めた場合には、5年経過をもって当然に、AはBに対して、期間満了による終了を対抗することができる。\n\n2 AB間の賃貸借契約が借地借家法第38条の定期建物賃貸借で、契約の更新がない旨を定めた場合には、当該契約の期間中、Bから中途解約を申し入れることはできない。\n\n3 AB間の賃貸借契約が借地借家法第38条の定期建物賃貸借でない場合、A及びBのいずれからも期間内に更新しない旨の通知又は条件変更しなければ更新しない旨の通知がなかったときは、当該賃貸借契約が更新され、その契約は期間の定めがないものとなる。\n\n4 CがBから甲建物を適法に賃貸された転借人で、期間満了によってAB間及びBC間の賃貸借契約が終了する場合、Aの同意を得て甲建物に付加した造作について、BはAに対する買取請求権を有するが、CはAに対する買取請求権を有しない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h30-13",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 13,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-13/",
    "questionText": "【問 13】 建物の区分所有等に関する法律に関する次の記述のうち、誤っているものはどれか。\n\n1 規約の設定、変更又は廃止を行う場合は、区分所有者の過半数による集会の決議によってなされなければならない。\n\n2 規約を保管する者は、利害関係人の請求があったときは、正当な理由がある場合を除いて、規約の閲覧を拒んではならず、閲覧を拒絶した場合は20万円以下の過料に処される。\n\n3 規約の保管場所は、建物内の見やすい場所に掲示しなければならない。\n\n4 占有者は、建物又はその敷地若しくは附属施設の使用方法につき、区分所有者が規約又は集会の決議に基づいて負う義務と同一の義務を負う。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-15",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-15/",
    "questionText": "【問 15】 国土利用計画法第23条の届出（以下この問において「事後届出」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 事後届出に係る土地の利用目的について、甲県知事から勧告を受けた宅地建物取引業者Aがその勧告に従わないときは、甲県知事は、その旨及びその勧告の内容を公表することができる。\n\n2 乙県が所有する都市計画区域内の土地（面積6,000㎡）を買い受けた者は、売買契約を締結した日から起算して2週間以内に、事後届出を行わなければならない。\n\n3 指定都市（地方自治法に基づく指定都市をいう。）の区域以外に所在する土地について、事後届出を行うに当たっては、市町村の長を経由しないで、直接都道府県知事に届け出なければならない。\n\n4 宅地建物取引業者Bが所有する市街化区域内の土地（面積2,500㎡）について、宅地建物取引業者Cが購入する契約を締結した場合、Cは事後届出を行う必要はない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-16",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、誤っているものはどれか。\n\n1 田園住居地域内の農地の区域内において、土地の形質の変更を行おうとする者は、一定の場合を除き、市町村長の許可を受けなければならない。\n\n2 風致地区内における建築物の建築については、一定の基準に従い、地方公共団体の条例で、都市の風致を維持するため必要な規制をすることができる。\n\n3 市街化区域については、少なくとも用途地域を定めるものとし、市街化調整区域については、原則として用途地域を定めないものとする。\n\n4 準都市計画区域については、無秩序な市街化を防止し、計画的な市街化を図るため、都市計画に市街化区域と市街化調整区域との区分を定めなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h30-17",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-17/",
    "questionText": "【問 17】 都市計画法に関する次の記述のうち、誤っているものはどれか。ただし、許可を要する開発行為の面積については、条例による定めはないものとし、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 非常災害のため必要な応急措置として開発行為をしようとする者は、当該開発行為が市街化調整区域内において行われるものであっても都道府県知事の許可を受けなくてよい。\n\n2 用途地域等の定めがない土地のうち開発許可を受けた開発区域内においては、開発行為に関する工事完了の公告があった後は、都道府県知事の許可を受けなければ、当該開発許可に係る予定建築物以外の建築物を新築することができない。\n\n3 都市計画区域及び準都市計画区域外の区域内において、8,000㎡の開発行為をしようとする者は、都道府県知事の許可を受けなくてよい。\n\n4 準都市計画区域内において、農業を営む者の居住の用に供する建築物の建築を目的とした1,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h30-18",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 18,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-18/",
    "questionText": "【問 18】 建築基準法に関する次の記述のうち、正しいものはどれか。\n\n1 建築物の高さ31m以下の部分にある全ての階には、非常用の進入口を設けなければならない。\n\n2 防火地域内にある3階建ての木造の建築物を増築する場合、その増築に係る部分の床面積の合計が10㎡以内であれば、その工事が完了した際に、建築主事又は指定確認検査機関の完了検査を受ける必要はない。\n\n3 4階建ての事務所の用途に供する建築物の2階以上の階にあるバルコニーその他これに類するものの周囲には、安全上必要な高さが1.1m以上の手すり壁、さく又は金網を設けなければならない。\n\n4 建築基準法の改正により、現に存する建築物が改正後の規定に適合しなくなった場合、当該建築物の所有者又は管理者は速やかに当該建築物を改正後の建築基準法の規定に適合させなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h30-19",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 19,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-19/",
    "questionText": "【問 19】 建築基準法（以下この問において「法」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 田園住居地域内においては、建築物の高さは、一定の場合を除き、10m又は12mのうち当該地域に関する都市計画において定められた建築物の高さの限度を超えてはならない。\n\n2 一の敷地で、その敷地面積の40%が第二種低層住居専用地域に、60%が第一種中高層住居専用地域にある場合は、原則として、当該敷地内には大学を建築することができない。\n\n3 都市計画区域の変更等によって法第3章の規定が適用されるに至った際現に建築物が立ち並んでいる幅員2mの道で、特定行政庁の指定したものは、同章の規定における道路とみなされる。\n\n4 容積率規制を適用するに当たっては、前面道路の境界線又はその反対側の境界線からそれぞれ後退して壁面線の指定がある場合において、特定行政庁が一定の基準に適合すると認めて許可した建築物については、当該前面道路の境界線又はその反対側の境界線は、それぞれ当該壁面線にあるものとみなす。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h30-21",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-21/",
    "questionText": "【問 21】 土地区画整理法に関する次の記述のうち、正しいものはどれか。\n\n1 土地区画整理事業とは、公共施設の整備改善及び宅地の利用の増進を図るため、土地区画整理法で定めるところに従って行われる、都市計画区域内及び都市計画区域外の土地の区画形質の変更に関する事業をいう。\n\n2 土地区画整理組合の設立の認可の公告があった日以後、換地処分の公告がある日までは、施行地区内において、土地区画整理事業の施行の障害となるおそれがある建築物その他の工作物の新築を行おうとする者は、都道府県知事及び市町村長の許可を受けなければならない。\n\n3 土地区画整理事業の施行者は、仮換地を指定した場合において、従前の宅地に存する建築物を移転し、又は除却することが必要となったときは、当該建築物を移転し、又は除却することができる。\n\n4 土地区画整理事業の施行者は、仮換地を指定した場合において、当該仮換地について使用又は収益を開始することができる日を当該仮換地の効力発生の日と同一の日として定めなければならない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h30-22",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-22/",
    "questionText": "【問 22】 農地法（以下この問において「法」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 市街化区域内の農地を宅地とする目的で権利を取得する場合は、あらかじめ農業委員会に届出をすれば法第5条の許可は不要である。\n\n2 遺産分割により農地を取得することとなった場合、法第3条第1項の許可を受ける必要がある。\n\n3 法第2条第3項の農地所有適格法人の要件を満たしていない株式会社は、耕作目的で農地を借り入れることはできない。\n\n4 雑種地を開墾し耕作している土地でも、登記簿上の地目が雑種地である場合は、法の適用を受ける農地に当たらない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-24",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 24,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-24/",
    "questionText": "【問 24】 不動産取得税に関する次の記述のうち、正しいものはどれか。\n\n1 不動産取得税は、不動産の取得があった日の翌日から起算して3月以内に当該不動産が所在する都道府県に申告納付しなければならない。\n\n2 不動産取得税は不動産の取得に対して課される税であるので、家屋を改築したことにより当該家屋の価格が増加したとしても、新たな不動産の取得とはみなされないため、不動産取得税は課されない。\n\n3 相続による不動産の取得については、不動産取得税は課されない。\n\n4 一定の面積に満たない土地の取得については、不動産取得税は課されない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h30-25",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-25/",
    "questionText": "【問 25】 不動産の鑑定評価に関する次の記述のうち、不動産鑑定評価基準によれば、正しいものはどれか。\n\n1 不動産の価格は、その不動産の効用が最高度に発揮される可能性に最も富む使用を前提として把握される価格を標準として形成されるが、これを最有効使用の原則という。\n\n2 収益還元法は、賃貸用不動産又は賃貸以外の事業の用に供する不動産の価格を求める場合に特に有効な手法であるが、事業の用に供さない自用の不動産の鑑定評価には適用すべきではない。\n\n3 鑑定評価の基本的な手法は、原価法、取引事例比較法及び収益還元法に大別され、実際の鑑定評価に際しては、地域分析及び個別分析により把握した対象不動産に係る市場の特性等を適切に反映した手法をいずれか1つ選択して、適用すべきである。\n\n4 限定価格とは、市場性を有する不動産について、法令等による社会的要請を背景とする鑑定評価目的の下で、正常価格の前提となる諸条件を満たさないことにより正常価格と同一の市場概念の下において形成されるであろう市場価値と乖離することとなる場合における不動産の経済価値を適正に表示する価格のことをいい、民事再生法に基づく鑑定評価目的の下で、早期売却を前提として求められる価格が例としてあげられる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-28",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-28/",
    "questionText": "【問 28】 次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはいくつあるか。\n\nア 宅地建物取引業者が、買主として、造成工事完了前の宅地の売買契約を締結しようとする場合、売主が当該造成工事に関し必要な都市計画法第29条第1項の許可を申請中であっても、当該売買契約を締結することができる。\n\nイ 宅地建物取引業者が、買主として、宅地建物取引業者との間で宅地の売買契約を締結した場合、法第37条の規定により交付すべき書面を交付しなくてよい。\n\nウ 営業保証金を供託している宅地建物取引業者が、売主として、宅地建物取引業者との間で宅地の売買契約を締結しようとする場合、営業保証金を供託した供託所及びその所在地について、買主に対し説明をしなければならない。\n\nエ 宅地建物取引業者が、宅地の売却の依頼者と媒介契約を締結した場合、当該宅地の購入の申込みがあったときは、売却の依頼者が宅地建物取引業者であっても、遅滞なく、その旨を当該依頼者に報告しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-32",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 32,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-32/",
    "questionText": "【問 32】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引士が都道府県知事から指示処分を受けた場合において、宅地建物取引業者（国土交通大臣免許）の責めに帰すべき理由があるときは、国土交通大臣は、当該宅地建物取引業者に対して指示処分をすることができる。\n\n2 宅地建物取引士が不正の手段により宅地建物取引士の登録を受けた場合、その登録をした都道府県知事は、宅地建物取引士資格試験の合格の決定を取り消さなければならない。\n\n3 国土交通大臣は、すべての宅地建物取引士に対して、購入者等の利益の保護を図るため必要な指導、助言及び勧告をすることができる。\n\n4 甲県知事の登録を受けている宅地建物取引士が、乙県知事から事務の禁止の処分を受けた場合は、速やかに、宅地建物取引士証を乙県知事に提出しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-33",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-33/",
    "questionText": "【問 33】 宅地建物取引業者Aは、Bから、Bが所有し居住している甲住宅の売却について媒介の依頼を受けた。この場合における次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 Aが甲住宅について、法第34条の2第1項第4号に規定する建物状況調査の制度概要を紹介し、Bが同調査を実施する者のあっせんを希望しなかった場合、Aは、同項の規定に基づき交付すべき書面に同調査を実施する者のあっせんに関する事項を記載する必要はない。\n\n2 Aは、Bとの間で専属専任媒介契約を締結した場合、当該媒介契約締結日から7日以内（休業日を含まない。）に、指定流通機構に甲住宅の所在等を登録しなければならない。\n\n3 Aは、甲住宅の評価額についての根拠を明らかにするため周辺の取引事例の調査をした場合、当該調査の実施についてBの承諾を得ていなくても、同調査に要した費用をBに請求することができる。\n\n4 AとBの間で専任媒介契約を締結した場合、Aは、法第34条の2第1項の規定に基づき交付すべき書面に、BがA以外の宅地建物取引業者の媒介又は代理によって売買又は交換の契約を成立させたときの措置について記載しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h30-37",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-37/",
    "questionText": "【問 37】 宅地建物取引業者である売主Aが、宅地建物取引業者Bの媒介により宅地建物取引業者ではない買主Cと新築マンションの売買契約を締結した場合において、宅地建物取引業法第37条の2の規定に基づくいわゆるクーリング・オフに関する次の記述のうち、正しいものはいくつあるか。\n\nア AとCの間で、クーリング・オフによる契約の解除に関し、Cは契約の解除の書面をクーリング・オフの告知の日から起算して8日以内にAに到達させなければ契約を解除することができない旨の特約を定めた場合、当該特約は無効である。\n\nイ Cは、Bの事務所で買受けの申込みを行い、その3日後に、Cの自宅近くの喫茶店で売買契約を締結した場合、クーリング・オフによる契約の解除はできない。\n\nウ Cは、Bからの提案によりCの自宅で買受けの申込みを行ったが、クーリング・オフについては告げられず、その10日後に、Aの事務所で売買契約を締結した場合、クーリング・オフによる契約の解除はできない。\n\nエ クーリング・オフについて告げる書面には、Bの商号又は名称及び住所並びに免許証番号を記載しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h30-38",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 38,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-38/",
    "questionText": "【問 38】 宅地建物取引業者である売主は、宅地建物取引業者ではない買主との間で、戸建住宅の売買契約（所有権の登記は当該住宅の引渡し時に行うものとする。）を締結した。この場合における宅地建物取引業法第41条又は第41条の2の規定に基づく手付金等の保全措置（以下この問において「保全措置」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 当該住宅が建築工事の完了後で、売買代金が3,000万円であった場合、売主は、買主から手付金200万円を受領した後、当該住宅を引き渡す前に中間金300万円を受領するためには、手付金200万円と合わせて保全措置を講じた後でなければ、その中間金を受領することができない。\n\n2 当該住宅が建築工事の完了前で、売買代金が2,500万円であった場合、売主は、当該住宅を引き渡す前に買主から保全措置を講じないで手付金150万円を受領することができる。\n\n3 当該住宅が建築工事の完了前で、売主が買主から保全措置が必要となる額の手付金を受領する場合、売主は、事前に、国土交通大臣が指定する指定保管機関と手付金等寄託契約を締結し、かつ、当該契約を証する書面を買主に交付した後でなければ、買主からその手付金を受領することができない。\n\n4 当該住宅が建築工事の完了前で、売主が買主から保全措置が必要となる額の手付金等を受領する場合において売主が銀行との間で締結する保証委託契約に基づく保証契約は、建築工事の完了までの間を保証期間とするものでなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-39",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-39/",
    "questionText": "【問 39】 宅地建物取引業者が建物の貸借の媒介を行う場合における宅地建物取引業法（以下この問において「法」という。）第35条に規定する重要事項の説明に関する次の記述のうち、誤っているものはどれか。なお、特に断りのない限り、当該建物を借りようとする者は宅地建物取引業者ではないものとする。\n\n1 当該建物を借りようとする者が宅地建物取引業者であるときは、貸借の契約が成立するまでの間に重要事項を記載した書面を交付しなければならないが、その内容を宅地建物取引士に説明させる必要はない。\n\n2 当該建物が既存の住宅であるときは、法第34条の2第1項第4号に規定する建物状況調査を実施しているかどうか、及びこれを実施している場合におけるその結果の概要を説明しなければならない。\n\n3 台所、浴室、便所その他の当該建物の設備の整備の状況について説明しなければならない。\n\n4 宅地建物取引士は、テレビ会議等のITを活用して重要事項の説明を行うときは、相手方の承諾があれば宅地建物取引士証の提示を省略することができる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h30-40",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 40,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-40/",
    "questionText": "【問 40】 宅地建物取引業者Aが行う業務に関する次の記述のうち、宅地建物取引業法の規定に違反するものはいくつあるか。\n\nア Aは、自ら売主として、建物の売買契約を締結するに際し、買主が手付金を持ち合わせていなかったため手付金の分割払いを提案し、買主はこれに応じた。\n\nイ Aは、建物の販売に際し、勧誘の相手方から値引きの要求があったため、広告に表示した販売価格から100万円値引きすることを告げて勧誘し、売買契約を締結した。\n\nウ Aは、土地の売買の媒介に際し重要事項の説明の前に、宅地建物取引士ではないAの従業者をして媒介の相手方に対し、当該土地の交通等の利便の状況について説明させた。\n\nエ Aは、投資用マンションの販売に際し、電話で勧誘を行ったところ、勧誘の相手方から「購入の意思がないので二度と電話をかけないように」と言われたことから、電話での勧誘を諦め、当該相手方の自宅を訪問して勧誘した。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h30-41",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 41,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-41/",
    "questionText": "【問 41】 次の記述のうち、宅地建物取引業の免許を要する業務が含まれるものはどれか。\n\n1 A社は、所有する土地を10区画にほぼ均等に区分けしたうえで、それぞれの区画に戸建住宅を建築し、複数の者に貸し付けた。\n\n2 B社は、所有するビルの一部にコンビニエンスストアや食堂など複数のテナントの出店を募集し、その募集広告を自社のホームページに掲載したほか、多数の事業者に案内を行った結果、出店事業者が決まった。\n\n3 C社は賃貸マンションの管理業者であるが、複数の貸主から管理を委託されている物件について、入居者の募集、貸主を代理して行う賃貸借契約の締結、入居者からの苦情・要望の受付、入居者が退去した後の清掃などを行っている。\n\n4 D社は、多数の顧客から、顧客が所有している土地に住宅や商業用ビルなどの建物を建設することを請け負って、その対価を得ている。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h30-42",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-42/",
    "questionText": "【問 42】 次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 宅地建物取引士が死亡した場合、その相続人は、死亡した日から30日以内に、その旨を当該宅地建物取引士の登録をしている都道府県知事に届け出なければならない。\n\n2 甲県知事の登録を受けている宅地建物取引士は、乙県に所在する宅地建物取引業者の事務所の業務に従事しようとするときは、乙県知事に対し登録の移転の申請をし、乙県知事の登録を受けなければならない。\n\n3 宅地建物取引士は、事務禁止の処分を受けたときは宅地建物取引士証をその交付を受けた都道府県知事に提出しなくてよいが、登録消除の処分を受けたときは返納しなければならない。\n\n4 宅地建物取引士は、法第37条に規定する書面を交付する際、取引の関係者から請求があったときは、専任の宅地建物取引士であるか否かにかかわらず宅地建物取引士証を提示しなければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h30-43",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 43,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-43/",
    "questionText": "【問 43】 宅地建物取引業法に規定する営業保証金に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者は、免許を受けた日から3月以内に営業保証金を供託した旨の届出を行わなかったことにより国土交通大臣又は都道府県知事の催告を受けた場合、当該催告が到達した日から1月以内に届出をしないときは、免許を取り消されることがある。\n\n2 宅地建物取引業者に委託している家賃収納代行業務により生じた債権を有する者は、宅地建物取引業者が供託した営業保証金について、その債権の弁済を受けることができる。\n\n3 宅地建物取引業者は、宅地建物取引業の開始後1週間以内に、供託物受入れの記載のある供託書の写しを添附して、営業保証金を供託した旨を免許を受けた国土交通大臣又は都道府県知事に届け出なければならない。\n\n4 宅地建物取引業者は、新たに事務所を2か所増設するための営業保証金の供託について国債証券と地方債証券を充てる場合、地方債証券の額面金額が800万円であるときは、額面金額が200万円の国債証券が必要となる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-44",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-44/",
    "questionText": "【問 44】 宅地建物取引業保証協会（以下この問において「保証協会」という。）の社員である宅地建物取引業者Aに関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 Aは、保証協会の社員の地位を失った場合、Aとの宅地建物取引業に関する取引により生じた債権に関し権利を有する者に対し、6月以内に申し出るべき旨の公告をしなければならない。\n\n2 保証協会は、Aの取引の相手方から宅地建物取引業に係る取引に関する苦情を受けた場合は、Aに対し、文書又は口頭による説明を求めることができる。\n\n3 Aは、保証協会の社員の地位を失った場合において、保証協会に弁済業務保証金分担金として150万円の納付をしていたときは、全ての事務所で営業を継続するためには、1週間以内に主たる事務所の最寄りの供託所に営業保証金として1,500万円を供託しなければならない。\n\n4 Aは、その一部の事務所を廃止したときは、保証協会が弁済業務保証金の還付請求権者に対し、一定期間内に申し出るべき旨の公告をした後でなければ、弁済業務保証金分担金の返還を受けることができない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h30-45",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-45/",
    "questionText": "【問 45】 特定住宅瑕疵担保責任の履行の確保等に関する法律に基づく住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結に関する次の記述のうち、正しいものはどれか。\n\n1 宅地建物取引業者は、自ら売主として新築住宅を販売する場合及び新築住宅の売買の媒介をする場合において、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結を行う義務を負う。\n\n2 自ら売主として新築住宅を宅地建物取引業者でない買主に引き渡した宅地建物取引業者は、その住宅を引き渡した日から3週間以内に、住宅販売瑕疵担保保証金の供託又は住宅販売瑕疵担保責任保険契約の締結の状況について、宅地建物取引業の免許を受けた国土交通大臣又は都道府県知事に届け出なければならない。\n\n3 自ら売主として新築住宅を宅地建物取引業者でない買主に引き渡した宅地建物取引業者は、基準日に係る住宅販売瑕疵担保保証金の供託及び住宅販売瑕疵担保責任保険契約の締結の状況について届出をしなければ、当該基準日の翌日から起算して50日を経過した日以後においては、新たに自ら売主となる新築住宅の売買契約を締結することができない。\n\n4 住宅販売瑕疵担保責任保険契約を締結している宅地建物取引業者は、当該住宅を引き渡した時から10年間、住宅の構造耐力上主要な部分の瑕疵によって生じた損害についてのみ保険金を請求することができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h30-46",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 機構は、住宅の建設又は購入に必要な資金の貸付けに係る金融機関の貸付債権の譲受けを業務として行っているが、当該住宅の建設又は購入に付随する土地又は借地権の取得に必要な資金の貸付けに係る金融機関の貸付債権については、譲受けの対象としていない。\n\n2 機構は、金融機関による住宅資金の供給を支援するため、金融機関が貸し付けた住宅ローンについて、住宅融資保険を引き受けている。\n\n3 機構は、証券化支援事業（買取型）において、MBS（資産担保証券）を発行することにより、債券市場（投資家）から資金を調達している。\n\n4 機構は、高齢者の家庭に適した良好な居住性能及び居住環境を有する住宅とすることを主たる目的とする住宅の改良（高齢者が自ら居住する住宅について行うものに限る。）に必要な資金の貸付けを業務として行っている。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h30-47",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 47,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-47/",
    "questionText": "【問 47】 宅地建物取引業者が行う広告に関する次の記述のうち、不当景品類及び不当表示防止法（不動産の表示に関する公正競争規約を含む。）の規定によれば、正しいものはどれか。\n\n1 新築分譲住宅について、価格Aで販売を開始してから3か月以上経過したため、価格Aから価格Bに値下げをすることとし、価格Aと価格Bを併記して、値下げをした旨を表示する場合、値下げ金額が明確になっていれば、価格Aの公表時期や値下げの時期を表示する必要はない。\n\n2 土地上に古家が存在する場合に、当該古家が、住宅として使用することが可能な状態と認められる場合であっても、古家がある旨を表示すれば、売地と表示して販売しても不当表示に問われることはない。\n\n3 新築分譲マンションの広告において、当該マンションの完成図を掲載する際に、敷地内にある電柱及び電線を消去する加工を施した場合であっても、当該マンションの外観を消費者に対し明確に示すためであれば、不当表示に問われることはない。\n\n4 複数の売買物件を1枚の広告に掲載するに当たり、取引態様が複数混在している場合には、広告の下部にまとめて表示すれば、どの物件がどの取引態様かを明示していなくても不当表示に問われることはない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h30-49",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 山麓の地形の中で、地すべりによってできた地形は一見なだらかで、水はけもよく、住宅地として好適のように見えるが、末端の急斜面部等は斜面崩壊の危険度が高い。\n\n2 台地の上の浅い谷は、豪雨時には一時的に浸水することがあり、現地に入っても気付かないことが多いが、住宅地としては注意を要する。\n\n3 大都市の大部分は低地に立地しているが、この数千年の間に形成され、かつては湿地や旧河道であった地域が多く、地震災害に対して脆弱で、また洪水、高潮、津波等の災害の危険度も高い。\n\n4 低地の中で特に災害の危険度の高い所は、扇状地の中の微高地、自然堤防、廃川敷となった旧天井川等であり、比較的危険度の低い所が沿岸部の標高の低いデルタ地域、旧河道等である。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h30-50",
    "examId": "h30",
    "year": "平成30年度",
    "label": "2018 / 平成30年度",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H30-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2018kakomon/30-50/",
    "questionText": "【問 50】 建築物の構造に関する次の記述のうち、最も不適当なものはどれか。\n\n1 木造建物を造る際には、強度や耐久性において、できるだけ乾燥している木材を使用するのが好ましい。\n\n2 集成木材構造は、集成木材で骨組を構成したもので、大規模な建物にも使用されている。\n\n3 鉄骨構造は、不燃構造であり、耐火材料による耐火被覆がなくても耐火構造にすることができる。\n\n4 鉄筋コンクリート構造は、耐久性を高めるためには、中性化の防止やコンクリートのひび割れ防止の注意が必要である。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-01",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 1,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-1/",
    "questionText": "【問 1】 代理に関する次の記述のうち、民法の規定及び判例によれば、誤っているものはどれか。\n\n1 売買契約を締結する権限を与えられた代理人は、特段の事情がない限り、相手方からその売買契約を取り消す旨の意思表示を受領する権限を有する。\n\n2 委任による代理人は、本人の許諾を得たときのほか、やむを得ない事由があるときにも、復代理人を選任することができる。\n\n3 復代理人が委任事務を処理するに当たり金銭を受領し、これを代理人に引き渡したときは、特段の事情がない限り、代理人に対する受領物引渡義務は消滅するが、本人に対する受領物引渡義務は消滅しない。\n\n4 夫婦の一方は、個別に代理権の授権がなくとも、日常家事に関する事項について、他の一方を代理して法律行為をすることができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-02",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 2,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-2/",
    "questionText": "【問 2】 所有権の移転又は取得に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 Aの所有する甲土地をBが時効取得した場合、Bが甲土地の所有権を取得するのは、取得時効の完成時である。\n\n2 Aを売主、Bを買主としてCの所有する乙建物の売買契約が締結された場合、BがAの無権利について善意無過失であれば、AB間で売買契約が成立した時点で、Bは乙建物の所有権を取得する。\n\n3 Aを売主、Bを買主として、丙土地の売買契約が締結され、代金の完済までは丙土地の所有権は移転しないとの特約が付された場合であっても、当該売買契約締結の時点で丙土地の所有権はBに移転する。\n\n4 AがBに丁土地を売却したが、AがBの強迫を理由に売買契約を取り消した場合、丁土地の所有権はAに復帰し、初めからBに移転しなかったことになる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-03",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 3,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-3/",
    "questionText": "【問 3】 次の1から4までの記述のうち、民法の規定及び下記判決文によれば、誤っているものはどれか。\n\n（判決文）\n\n共有者の一部の者から共有者の協議に基づかないで共有物を占有使用することを承認された第三者は、その者の占有使用を承認しなかった共有者に対して共有物を排他的に占有する権原を主張することはできないが、現にする占有がこれを承認した共有者の持分に基づくものと認められる限度で共有物を占有使用する権原を有するので、第三者の占有使用を承認しなかった共有者は右第三者に対して当然には共有物の明渡しを請求することはできないと解するのが相当である。\n\n1 共有者は、他の共有者との協議に基づかないで当然に共有物を排他的に占有する権原を有するものではない。\n\n2 AとBが共有する建物につき、AB間で協議することなくAがCと使用貸借契約を締結した場合、Bは当然にはCに対して当該建物の明渡しを請求することはできない。\n\n3 DとEが共有する建物につき、DE間で協議することなくDがFと使用貸借契約を締結した場合、Fは、使用貸借契約を承認しなかったEに対して当該建物全体を排他的に占有する権原を主張することができる。\n\n4 GとHが共有する建物につき、Gがその持分を放棄した場合は、その持分はHに帰属する。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-06",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 6,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-6/",
    "questionText": "【問 6】 Aが死亡し、相続人がBとCの2名であった場合に関する次の記述のうち、民法の規定及び判例によれば、正しいものはどれか。\n\n1 ①BがAの配偶者でCがAの子である場合と、②BとCがいずれもAの子である場合とでは、Bの法定相続分は①の方が大きい。\n\n2 Aの死亡後、いずれもAの子であるBとCとの間の遺産分割協議が成立しないうちにBが死亡したときは、Bに配偶者Dと子Eがいる場合であっても、Aの遺産分割についてはEが代襲相続人として分割協議を行う。\n\n3 遺産分割協議が成立するまでの間に遺産である不動産から賃料債権が生じていて、BとCがその相続分に応じて当該賃料債権を分割単独債権として確定的に取得している場合、遺産分割協議で当該不動産をBが取得することになっても、Cが既に取得した賃料債権につき清算する必要はない。\n\n4 Bが自己のために相続の開始があったことを知った時から3か月以内に家庭裁判所に対して、相続によって得た財産の限度においてのみAの債務及び遺贈を弁済すべきことを留保して相続を承認する限定承認をする旨を申述すれば、Cも限定承認をする旨を申述したとみなされる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-09",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 9,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-9/",
    "questionText": "【問 9】 1億2,000万円の財産を有するAが死亡した。Aには、配偶者はなく、子B、C、Dがおり、Bには子Eが、Cには子Fがいる。Bは相続を放棄した。また、Cは生前のAを強迫して遺言作成を妨害したため、相続人となることができない。この場合における法定相続分に関する次の記述のうち、民法の規定によれば、正しいものはどれか。\n\n1 Dが4,000万円、Eが4,000万円、Fが4,000万円となる。\n\n2 Dが1億2,000万円となる。\n\n3 Dが6,000万円、Fが6,000万円となる。\n\n4 Dが6,000万円、Eが6,000万円となる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-10",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 10,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-10/",
    "questionText": "【問 10】 ①不動産質権と②抵当権に関する次の記述のうち、民法の規定によれば、誤っているものはどれか。\n\n1 ①では、被担保債権の利息のうち、満期となった最後の2年分についてのみ担保されるが、②では、設定行為に別段の定めがない限り、被担保債権の利息は担保されない。\n\n2 ①は、10年を超える存続期間を定めたときであっても、その期間は10年となるのに対し、②は、存続期間に関する制限はない。\n\n3 ①は、目的物の引渡しが効力の発生要件であるのに対し、②は、目的物の引渡しは効力の発生要件ではない。\n\n4 ①も②も不動産に関する物権であり、登記を備えなければ第三者に対抗することができない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h29-11",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 11,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-11/",
    "questionText": "【問 11】 A所有の甲土地につき、平成29年10月1日にBとの間で賃貸借契約（以下「本件契約」という。）が締結された場合に関する次の記述のうち、民法及び借地借家法の規定並びに判例によれば、正しいものはどれか。\n\n1 Aが甲土地につき、本件契約とは別に、平成29年9月1日にCとの間で建物所有を目的として賃貸借契約を締結していた場合、本件契約が資材置場として更地で利用することを目的とするものであるときは、本件契約よりもCとの契約が優先する。\n\n2 賃借権の存続期間を10年と定めた場合、本件契約が居住の用に供する建物を所有することを目的とするものであるときは存続期間が30年となるのに対し、本件契約が資材置場として更地で利用することを目的とするものであるときは存続期間は10年である。\n\n3 本件契約が建物所有を目的として存続期間60年とし、賃料につき3年ごとに1%ずつ増額する旨を公正証書で定めたものである場合、社会情勢の変化により賃料が不相当となったときであっても、AもBも期間満了まで賃料の増減額請求をすることができない。\n\n4 本件契約が建物所有を目的としている場合、契約の更新がなく、建物の買取りの請求をしないこととする旨を定めるには、AはあらかじめBに対してその旨を記載した書面を交付して説明しなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h29-12",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 12,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-12/",
    "questionText": "【問 12】 Aが所有する甲建物をBに対して3年間賃貸する旨の契約をした場合における次の記述のうち、借地借家法の規定によれば、正しいものはどれか。\n\n1 AがBに対し、甲建物の賃貸借契約の期間満了の1年前に更新をしない旨の通知をしていれば、AB間の賃貸借契約は期間満了によって当然に終了し、更新されない。\n\n2 Aが甲建物の賃貸借契約の解約の申入れをした場合には申入れ日から3月で賃貸借契約が終了する旨を定めた特約は、Bがあらかじめ同意していれば、有効となる。\n\n3 Cが甲建物を適法に転借している場合、AB間の賃貸借契約が期間満了によって終了するときに、Cがその旨をBから聞かされていれば、AはCに対して、賃貸借契約の期間満了による終了を対抗することができる。\n\n4 AB間の賃貸借契約が借地借家法第38条の定期建物賃貸借で、契約の更新がない旨を定めるものである場合、当該契約前にAがBに契約の更新がなく期間の満了により終了する旨を記載した書面を交付して説明しなければ、契約の更新がない旨の約定は無効となる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-13",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 13,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-13/",
    "questionText": "【問 13】 建物の区分所有等に関する法律に関する次の記述のうち、誤っているものはどれか。\n\n1 管理者は、少なくとも毎年1回集会を招集しなければならない。\n\n2 区分所有者の5分の1以上で議決権の5分の1以上を有するものは、管理者に対し、会議の目的たる事項を示して、集会の招集を請求することができるが、この定数は規約で減ずることはできない。\n\n3 集会の招集の通知は、区分所有者が管理者に対して通知を受け取る場所をあらかじめ通知した場合には、管理者はその場所にあててすれば足りる。\n\n4 集会は、区分所有者全員の同意があれば、招集の手続を経ないで開くことができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h29-14",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 14,
    "category": "権利関係",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-14/",
    "questionText": "【問 14】 不動産の登記に関する次の記述のうち、不動産登記法の規定によれば、誤っているものはどれか。\n\n1 建物の名称があるときは、その名称も当該建物の表示に関する登記の登記事項となる。\n\n2 地上権の設定の登記をする場合において、地上権の存続期間の定めがあるときは、その定めも登記事項となる。\n\n3 賃借権の設定の登記をする場合において、敷金があるときであっても、その旨は登記事項とならない。\n\n4 事業用定期借地権として借地借家法第23条第1項の定めのある賃借権の設定の登記をする場合、その定めも登記事項となる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-15",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 15,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-15/",
    "questionText": "【問 15】 農地に関する次の記述のうち、農地法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 市街化区域内の農地を耕作のために借り入れる場合、あらかじめ農業委員会に届出をすれば、法第3条第1項の許可を受ける必要はない。\n\n2 市街化調整区域内の4ヘクタールを超える農地について、これを転用するために所有権を取得する場合、農林水産大臣の許可を受ける必要がある。\n\n3 銀行から500万円を借り入れるために農地に抵当権を設定する場合、法第3条第1項又は第5条第1項の許可を受ける必要がある。\n\n4 相続により農地の所有権を取得した者は、遅滞なく、その農地の存する市町村の農業委員会にその旨を届け出なければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-16",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 16,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-16/",
    "questionText": "【問 16】 都市計画法に関する次の記述のうち、正しいものの組合せはどれか。\n\nア 都市計画施設の区域又は市街地開発事業の施行区域内において建築物の建築をしようとする者は、一定の場合を除き、都道府県知事（市の区域内にあっては、当該市の長）の許可を受けなければならない。\n\nイ 地区整備計画が定められている地区計画の区域内において、建築物の建築を行おうとする者は、都道府県知事（市の区域内にあっては、当該市の長）の許可を受けなければならない。\n\nウ 都市計画事業の認可の告示があった後、当該認可に係る事業地内において、当該都市計画事業の施行の障害となるおそれがある土地の形質の変更を行おうとする者は、都道府県知事（市の区域内にあっては、当該市の長）の許可を受けなければならない。\n\nエ 都市計画事業の認可の告示があった後、当該認可に係る事業地内の土地建物等を有償で譲り渡そうとする者は、当該事業の施行者の許可を受けなければならない。\n\n1 ア、ウ\n\n2 ア、エ\n\n3 イ、ウ\n\n4 イ、エ",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h29-17",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 17,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-17/",
    "questionText": "【問 17】 都市計画法に関する次の記述のうち、正しいものはどれか。ただし、許可を要する開発行為の面積について、条例による定めはないものとし、この問において「都道府県知事」とは、地方自治法に基づく指定都市、中核市及び施行時特例市にあってはその長をいうものとする。\n\n1 準都市計画区域内において、工場の建築の用に供する目的で1,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n2 市街化区域内において、農業を営む者の居住の用に供する建築物の建築の用に供する目的で1,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n3 都市計画区域及び準都市計画区域外の区域内において、変電所の建築の用に供する目的で1,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。\n\n4 区域区分の定めのない都市計画区域内において、遊園地の建設の用に供する目的で3,000㎡の土地の区画形質の変更を行おうとする者は、あらかじめ、都道府県知事の許可を受けなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h29-19",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 19,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-19/",
    "questionText": "【問 19】 建築基準法（以下この問において「法」という。）に関する次の記述のうち、正しいものはどれか。\n\n1 都市計画区域又は準都市計画区域内における用途地域の指定のない区域内の建築物の建ぺい率の上限値は、原則として、法で定めた数値のうち、特定行政庁が土地利用の状況等を考慮し当該区域を区分して都道府県都市計画審議会の議を経て定めるものとなる。\n\n2 第二種中高層住居専用地域内では、原則として、ホテル又は旅館を建築することができる。\n\n3 幅員4m以上であり、法が施行された時点又は都市計画区域若しくは準都市計画区域に入った時点で現に存在する道は、特定行政庁の指定がない限り、法上の道路とはならない。\n\n4 建築物の前面道路の幅員により制限される容積率について、前面道路が2つ以上ある場合には、これらの前面道路の幅員の最小の数値（12m未満の場合に限る。）を用いて算定する。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h29-21",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 21,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-21/",
    "questionText": "【問 21】 土地区画整理法に関する次の記述のうち、誤っているものはどれか。なお、この問において「組合」とは、土地区画整理組合をいう。\n\n1 組合は、事業の完成により解散しようとする場合においては、都道府県知事の認可を受けなければならない。\n\n2 施行地区内の宅地について組合員の有する所有権の全部又は一部を承継した者がある場合においては、その組合員がその所有権の全部又は一部について組合に対して有する権利義務は、その承継した者に移転する。\n\n3 組合を設立しようとする者は、事業計画の決定に先立って組合を設立する必要があると認める場合においては、7人以上共同して、定款及び事業基本方針を定め、その組合の設立について都道府県知事の認可を受けることができる。\n\n4 組合が施行する土地区画整理事業に係る施行地区内の宅地について借地権のみを有する者は、その組合の組合員とはならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-22",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 22,
    "category": "法令上の制限",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-22/",
    "questionText": "【問 22】 次の記述のうち、正しいものはどれか。\n\n1 津波防災地域づくりに関する法律によれば、津波防護施設区域内において土地の掘削をしようとする者は、一定の場合を除き、津波防護施設管理者の許可を受けなければならない。\n\n2 国土利用計画法によれば、市街化区域内の3,000㎡の土地を贈与により取得した者は、2週間以内に、都道府県知事（地方自治法に基づく指定都市にあっては、当該指定都市の長）に届け出なければならない。\n\n3 景観法によれば、景観計画区域内において建築物の新築、増築、改築又は移転をした者は、工事着手後30日以内に、その旨を景観行政団体の長に届け出なければならない。\n\n4 道路法によれば、道路の区域が決定された後道路の供用が開始されるまでの間であっても、道路管理者が当該区域についての土地に関する権原を取得する前であれば、道路管理者の許可を受けずに、当該区域内において工作物を新築することができる。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h29-23",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 23,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-23/",
    "questionText": "【問 23】 所得税法に関する次の記述のうち、正しいものはどれか。\n\n1 個人が台風により主として保養の用に供する目的で所有する別荘について受けた損失の金額（保険金等により補てんされる部分の金額を除く。）は、その損失を受けた日の属する年分又はその翌年分の譲渡所得の金額の計算上控除される。\n\n2 建物の所有を目的とする土地の賃借権の設定の対価として支払を受ける権利金の金額が、その土地の価額の10分の5に相当する金額を超えるときは、不動産所得として課税される。\n\n3 譲渡所得とは資産の譲渡による所得をいうので、不動産業者である個人が営利を目的として継続的に行っている土地の譲渡による所得は、譲渡所得として課税される。\n\n4 個人が相続（限定承認に係るものを除く。）により取得した譲渡所得の基因となる資産を譲渡した場合における譲渡所得の金額の計算については、その資産をその相続の時における価額に相当する金額により取得したものとして計算される。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h29-24",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 24,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-24/",
    "questionText": "【問 24】 固定資産税に関する次の記述のうち、正しいものはどれか。\n\n1 固定資産税は、固定資産が賃借されている場合、所有者ではなく当該固定資産の賃借人に対して課税される。\n\n2 家屋に対して課する固定資産税の納税者が、その納付すべき当該年度の固定資産税に係る家屋について家屋課税台帳等に登録された価格と当該家屋が所在する市町村内の他の家屋の価格とを比較することができるよう、当該納税者は、家屋価格等縦覧帳簿をいつでも縦覧することができる。\n\n3 固定資産税の納税者は、その納付すべき当該年度の固定資産課税に係る固定資産について、固定資産課税台帳に登録された価格について不服があるときは、一定の場合を除いて、文書をもって、固定資産評価審査委員会に審査の申出をすることができる。\n\n4 平成29年1月1日現在において更地であっても住宅の建設が予定されている土地においては、市町村長が固定資産課税台帳に当該土地の価格を登録した旨の公示をするまでに当該住宅の敷地の用に供された場合には、当該土地に係る平成29年度の固定資産税について、住宅用地に対する課税標準の特例が適用される。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-25",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 25,
    "category": "税・価格評定",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-25/",
    "questionText": "【問 25】 地価公示法に関する次の記述のうち、正しいものはどれか。\n\n1 土地鑑定委員会は、標準地の単位面積当たりの価格及び当該標準地の前回の公示価格からの変化率等一定の事項を官報により公示しなければならないとされている。\n\n2 土地鑑定委員会は、公示区域内の標準地について、毎年2回、2人以上の不動産鑑定士の鑑定評価を求め、その結果を審査し、必要な調整を行って、一定の基準日における当該標準地の単位面積当たりの正常な価格を判定し、これを公示するものとされている。\n\n3 標準地は、土地鑑定委員会が、自然的及び社会的条件からみて類似の利用価値を有すると認められる地域において、土地の利用状況、環境等が通常であると認められる一団の土地について選定するものとされている。\n\n4 土地の取引を行なう者は、取引の対象となる土地が標準地である場合には、当該標準地について公示された価格により取引を行なう義務を有する。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-28",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 28,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-28/",
    "questionText": "【問 28】 宅地建物取引業者Aが行う業務に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定に違反しないものはいくつあるか。\n\nア Aは、法第49条に規定されている業務に関する帳簿について、業務上知り得た秘密が含まれているため、当該帳簿の閉鎖後、遅滞なく、専門業者に委託して廃棄した。\n\nイ Aは、宅地の売却を希望するBと専任代理契約を締結した。Aは、Bの要望を踏まえ、当該代理契約に指定流通機構に登録しない旨の特約を付したため、その登録をしなかった。\n\nウ Aの従業者Cは、投資用マンションの販売において、勧誘に先立ちAの名称を告げず、自己の氏名及び契約締結の勧誘が目的であることを告げたうえで勧誘を行ったが、相手方から関心がない旨の意思表示があったので、勧誘の継続を断念した。\n\nエ Aは、自ら売主として新築マンションを分譲するに当たり、売買契約の締結に際して買主から手付を受領した。その後、当該契約の当事者の双方が契約の履行に着手する前に、Aは、手付を買主に返還して、契約を一方的に解除した。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-29",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 29,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-29/",
    "questionText": "【問 29】 次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者A（甲県知事免許）は、マンション管理業に関し、不正又は著しく不当な行為をしたとして、マンションの管理の適正化の推進に関する法律に基づき、国土交通大臣から業務の停止を命じられた。この場合、Aは、甲県知事から法に基づく指示処分を受けることがある。\n\n2 国土交通大臣は、宅地建物取引業者B（乙県知事免許）の事務所の所在地を確知できない場合、その旨を官報及び乙県の公報で公告し、その公告の日から30日を経過してもBから申出がないときは、Bの免許を取り消すことができる。\n\n3 国土交通大臣は、宅地建物取引業者C（国土交通大臣免許）に対し、法第35条の規定に基づく重要事項の説明を行わなかったことを理由に業務停止を命じた場合は、遅滞なく、その旨を内閣総理大臣に通知しなければならない。\n\n4 宅地建物取引業者D（丙県知事免許）は、法第72条第1項に基づく丙県職員による事務所への立入検査を拒んだ。この場合、Dは、50万円以下の罰金に処せられることがある。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-30",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 30,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-30/",
    "questionText": "【問 30】 宅地建物取引業法（以下この問において「法」という。）の規定に関する次の記述のうち、誤っているものはどれか。なお、この問において「登録」とは、宅地建物取引士の登録をいうものとする。\n\n1 宅地建物取引士A（甲県知事登録）が、甲県から乙県に住所を変更したときは、乙県知事に対し、登録の移転の申請をすることができる。\n\n2 宅地建物取引業者B（甲県知事免許）が、乙県に所在する1棟のマンション（150戸）を分譲するため、現地に案内所を設置し契約の申込みを受けるときは、甲県知事及び乙県知事に、その業務を開始する日の10日前までに、法第50条第2項の規定に基づく届出をしなければならない。\n\n3 宅地建物取引士資格試験合格後18月を経過したC（甲県知事登録）が、甲県知事から宅地建物取引士証の交付を受けようとする場合は、甲県知事が指定する講習を交付の申請前6月以内に受講しなければならない。\n\n4 宅地建物取引業者D社（甲県知事免許）が、合併により消滅したときは、その日から30日以内に、D社を代表する役員であった者が、その旨を甲県知事に届け出なければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h29-31",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 31,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-31/",
    "questionText": "【問 31】 宅地建物取引業者Aが、自ら売主として、宅地建物取引業者でないBとの間でマンション（代金3,000万円）の売買契約を締結しようとする場合における次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはいくつあるか。\n\nア Bは自ら指定した自宅においてマンションの買受けの申込みをした場合においても、法第37条の2の規定に基づき、書面により買受けの申込みの撤回を行うことができる。\n\nイ BがAに対し、法第37条の2の規定に基づき、書面により買受けの申込みの撤回を行った場合、その効力は、当該書面をAが受け取った時に生じることとなる。\n\nウ Aは、Bとの間で、当事者の債務不履行を理由とする契約解除に伴う違約金について300万円とする特約を定めた場合、加えて、損害賠償の予定額を600万円とする特約を定めることができる。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 なし",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-32",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 32,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-32/",
    "questionText": "【問 32】 宅地建物取引業法に規定する営業保証金に関する次の記述のうち、誤っているものはどれか。\n\n1 宅地建物取引業者は、主たる事務所を移転したことにより、その最寄りの供託所が変更となった場合において、金銭のみをもって営業保証金を供託しているときは、従前の供託所から営業保証金を取り戻した後、移転後の最寄りの供託所に供託しなければならない。\n\n2 宅地建物取引業者は、事業の開始後新たに事務所を設置するため営業保証金を供託したときは、供託物受入れの記載のある供託書の写しを添附して、その旨を免許を受けた国土交通大臣又は都道府県知事に届け出なければならない。\n\n3 宅地建物取引業者は、一部の事務所を廃止し営業保証金を取り戻そうとする場合には、供託した営業保証金につき還付を請求する権利を有する者に対し、6月以上の期間を定めて申し出るべき旨の公告をしなければならない。\n\n4 宅地建物取引業者は、営業保証金の還付があったために営業保証金に不足が生じたときは、国土交通大臣又は都道府県知事から不足額を供託すべき旨の通知書の送付を受けた日から2週間以内に、不足額を供託しなければならない。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h29-33",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 33,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-33/",
    "questionText": "【問 33】 宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、正しいものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 宅地の売買の媒介を行う場合、売買の各当事者すなわち売主及び買主に対して、書面を交付して説明しなければならない。\n\n2 宅地の売買の媒介を行う場合、代金に関する金銭の貸借のあっせんの内容及び当該あっせんに係る金銭の貸借が成立しないときの措置について、説明しなければならない。\n\n3 建物の貸借の媒介を行う場合、私道に関する負担について、説明しなければならない。\n\n4 建物の売買の媒介を行う場合、天災その他不可抗力による損害の負担に関する定めがあるときは、その内容について、説明しなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h29-34",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 34,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-34/",
    "questionText": "【問 34】 次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、誤っているものはどれか。\n\n1 宅地建物取引業者が、自ら売主として、宅地及び建物の売買の契約を締結するに際し、手付金について、当初提示した金額を減額することにより、買主に対し売買契約の締結を誘引し、その契約を締結させることは、法に違反しない。\n\n2 宅地建物取引業者が、アンケート調査をすることを装って電話をし、その目的がマンションの売買の勧誘であることを告げずに勧誘をする行為は、法に違反する。\n\n3 宅地建物取引業者が、宅地及び建物の売買の媒介を行うに際し、媒介報酬について、買主の要望を受けて分割受領に応じることにより、契約の締結を誘引する行為は、法に違反する。\n\n4 宅地建物取引業者が、手付金について信用の供与をすることにより、宅地及び建物の売買契約の締結を誘引する行為を行った場合、監督処分の対象となるほか、罰則の適用を受けることがある。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-35",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 35,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-35/",
    "questionText": "【問 35】 次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者は、自ら貸主として締結した建物の賃貸借契約について、法第49条に規定されている業務に関する帳簿に、法及び国土交通省令で定められた事項を記載しなければならない。\n\n2 宅地建物取引業者は、その業務に関する帳簿を、一括して主たる事務所に備えれば、従たる事務所に備えておく必要はない。\n\n3 宅地建物取引業者は、その業務に関する帳簿に報酬の額を記載することが義務付けられており、違反した場合は指示処分の対象となる。\n\n4 宅地建物取引業者は、その業務に従事する者であっても、一時的に事務の補助のために雇用した者については、従業者名簿に記載する必要がない。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-36",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 36,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-36/",
    "questionText": "【問 36】 次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。なお、この問において「免許」とは、宅地建物取引業の免許をいう。\n\n1 宅地建物取引業者Aは、免許の更新を申請したが、免許権者である甲県知事の申請に対する処分がなされないまま、免許の有効期間が満了した。この場合、Aは、当該処分がなされるまで、宅地建物取引業を営むことができない。\n\n2 Bは、新たに宅地建物取引業を営むため免許の申請を行った。この場合、Bは、免許の申請から免許を受けるまでの間に、宅地建物取引業を営む旨の広告を行い、取引する物件及び顧客を募ることができる。\n\n3 宅地建物取引業者Cは、宅地又は建物の売買に関連し、兼業として、新たに不動産管理業を営むこととした。この場合、Cは兼業で不動産管理業を営む旨を、免許権者である国土交通大臣又は都道府県知事に届け出なければならない。\n\n4 宅地建物取引業者である法人Dが、宅地建物取引業者でない法人Eに吸収合併されたことにより消滅した場合、一般承継人であるEは、Dが締結した宅地又は建物の契約に基づく取引を結了する目的の範囲内において宅地建物取引業者とみなされる。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-37",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 37,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-37/",
    "questionText": "【問 37】 次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはどれか。\n\n1 宅地建物取引士は、取引の関係者から請求があったときは、物件の買受けの申込みの前であっても宅地建物取引士証を提示しなければならないが、このときに提示した場合、後日、法第35条に規定する重要事項の説明をする際は、宅地建物取引士証を提示しなくてもよい。\n\n2 甲県知事の登録を受けている宅地建物取引士Aは、乙県に主たる事務所を置く宅地建物取引業者Bの専任の宅地建物取引士となる場合、乙県知事に登録を移転しなければならない。\n\n3 宅地建物取引士の登録を受けるには、宅地建物取引士資格試験に合格した者で、2年以上の実務の経験を有するもの又は国土交通大臣がその実務の経験を有するものと同等以上の能力を有すると認めたものであり、法で定める事由に該当しないことが必要である。\n\n4 宅地建物取引士は、取引の関係者から請求があったときは、従業者証明書を提示しなければならないが、法第35条に規定する重要事項の説明をする際は、宅地建物取引士証の提示が義務付けられているため、宅地建物取引士証の提示をもって、従業者証明書の提示に代えることができる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-39",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 39,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-39/",
    "questionText": "【問 39】 営業保証金を供託している宅地建物取引業者Aと宅地建物取引業保証協会（以下この問において「保証協会」という。）の社員である宅地建物取引業者Bに関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。\n\nア A（国土交通大臣免許）は、甲県内にある主たる事務所とは別に、乙県内に新たに従たる事務所を設置したときは、営業保証金をその従たる事務所の最寄りの供託所に供託しなければならない。\n\nイ Aは、平成29年5月1日に、Bに手付金500万円を支払い、宅地の売買契約を締結した。宅地の引渡しの前にBが失踪し、宅地の引渡しを受けることができなくなったときは、Aは、手付金について、弁済業務保証金から弁済を受けることができる。\n\nウ Bは、保証協会の社員の地位を失ったときは、その地位を失った日から1週間以内に、営業保証金を供託しなければならない。\n\nエ Bの取引に関して弁済業務保証金の還付があったときは、Bは、保証協会から当該還付額に相当する額の還付充当金を納付すべき旨の通知を受けた日から2週間以内に、還付充当金を保証協会に納付しなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h29-41",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 41,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-41/",
    "questionText": "【問 41】 宅地建物取引業者が行う宅地建物取引業法第35条に規定する重要事項の説明に関する次の記述のうち、誤っているものはどれか。なお、説明の相手方は宅地建物取引業者ではないものとする。\n\n1 区分所有建物の売買の媒介を行う場合、当該1棟の建物及びその敷地の管理が委託されているときは、その委託を受けている者の氏名（法人にあっては、その商号又は名称）及び住所（法人にあっては、その主たる事務所の所在地）を説明しなければならない。\n\n2 土地の売買の媒介を行う場合、移転登記の申請の時期の定めがあるときは、その内容を説明しなければならない。\n\n3 住宅の売買の媒介を行う場合、宅地内のガス配管設備等に関して、当該住宅の売買後においても当該ガス配管設備等の所有権が家庭用プロパンガス販売業者にあるものとするときは、その旨を説明する必要がある。\n\n4 中古マンションの売買の媒介を行う場合、当該マンションの計画的な維持修繕のための費用の積立てを行う旨の規約の定めがあるときは、その内容及び既に積み立てられている額について説明しなければならない。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h29-42",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 42,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-42/",
    "questionText": "【問 42】 宅地建物取引業者が行う広告に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはいくつあるか。\n\nア 宅地の販売広告において、宅地の将来の環境について、著しく事実に相違する表示をしてはならない。\n\nイ 宅地又は建物に係る広告の表示項目の中に、取引物件に係る現在又は将来の利用の制限があるが、この制限には、都市計画法に基づく利用制限等の公法上の制限だけではなく、借地権の有無等の私法上の制限も含まれる。\n\nウ 顧客を集めるために売る意思のない条件の良い物件を広告することにより他の物件を販売しようとした場合、取引の相手方が実際に誤認したか否か、あるいは損害を受けたか否かにかかわらず、監督処分の対象となる。\n\nエ 建物の売却について代理を依頼されて広告を行う場合、取引態様として、代理であることを明示しなければならないが、その後、当該物件の購入の注文を受けたとき、広告を行った時点と取引態様に変更がない場合でも、遅滞なく、その注文者に対し取引態様を明らかにしなければならない。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-43",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 43,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-43/",
    "questionText": "【問 43】 宅地建物取引業者Aが、BからB所有の中古マンションの売却の依頼を受け、Bと専任媒介契約（専属専任媒介契約ではない媒介契約）を締結した場合に関する次の記述のうち、宅地建物取引業法（以下この問において「法」という。）の規定によれば、正しいものはいくつあるか。\n\nア Aは、2週間に1回以上当該専任媒介契約に係る業務の処理状況をBに報告しなければならないが、これに加え、当該中古マンションについて購入の申込みがあったときは、遅滞なく、その旨をBに報告しなければならない。\n\nイ 当該専任媒介契約の有効期間は、3月を超えることができず、また、依頼者の更新しない旨の申出がなければ自動更新とする旨の特約も認められない。ただし、Bが宅地建物取引業者である場合は、AとBの合意により、自動更新とすることができる。\n\nウ Aは、当該専任媒介契約の締結の日から7日（ただし、Aの休業日は含まない。）以内に所定の事項を指定流通機構に登録しなければならず、また、法第50条の6に規定する登録を証する書面を遅滞なくBに提示しなければならない。\n\nエ 当該専任媒介契約に係る通常の広告費用はAの負担であるが、指定流通機構への情報登録及びBがAに特別に依頼した広告に係る費用については、成約したか否かにかかわらず、国土交通大臣の定める報酬の限度額を超えてその費用をBに請求することができる。\n\n1 一つ\n\n2 二つ\n\n3 三つ\n\n4 四つ",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  },
  {
    "id": "h29-44",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 44,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-44/",
    "questionText": "【問 44】 宅地建物取引業の免許（以下この問において「免許」という。）に関する次の記述のうち、宅地建物取引業法の規定によれば、正しいものはどれか。\n\n1 宅地建物取引業者A社が免許を受けていないB社との合併により消滅する場合、存続会社であるB社はA社の免許を承継することができる。\n\n2 個人である宅地建物取引業者Cがその事業を法人化するため、新たに株式会社Dを設立しその代表取締役に就任する場合、D社はCの免許を承継することができる。\n\n3 個人である宅地建物取引業者E（甲県知事免許）が死亡した場合、その相続人は、Eの死亡を知った日から30日以内に、その旨を甲県知事に届け出なければならず、免許はその届出があった日に失効する。\n\n4 宅地建物取引業者F社（乙県知事免許）が株主総会の決議により解散することとなった場合、その清算人は、当該解散の日から30日以内に、その旨を乙県知事に届け出なければならない。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-45",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 45,
    "category": "宅建業法",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-45/",
    "questionText": "【問 45】 宅地建物取引業者Aが自ら売主として、宅地建物取引業者でない買主Bに新築住宅を販売する場合における次の記述のうち、特定住宅瑕疵担保責任の履行の確保等に関する法律の規定によれば、正しいものはどれか。\n\n1 Aは、住宅販売瑕疵担保保証金の供託をする場合、Bに対し、当該住宅を引き渡すまでに、供託所の所在地等について記載した書面を交付して説明しなければならない。\n\n2 自ら売主として新築住宅をBに引き渡したAが、住宅販売瑕疵担保保証金を供託する場合、その住宅の床面積が55㎡以下であるときは、新築住宅の合計戸数の算定に当たって、床面積55㎡以下の住宅2戸をもって1戸と数えることになる。\n\n3 Aは、基準日に係る住宅販売瑕疵担保保証金の供託及び住宅販売瑕疵担保責任保険契約の締結の状況についての届出をしなければ、当該基準日から1月を経過した日以後においては、新たに自ら売主となる新築住宅の売買契約を締結してはならない。\n\n4 Aは、住宅販売瑕疵担保責任保険契約の締結をした場合、当該住宅を引き渡した時から10年間、当該住宅の給水設備又はガス設備の瑕疵によって生じた損害について保険金の支払を受けることができる。",
    "correctChoices": [
      2
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 2"
  },
  {
    "id": "h29-46",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 46,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-46/",
    "questionText": "【問 46】 独立行政法人住宅金融支援機構（以下この問において「機構」という。）に関する次の記述のうち、誤っているものはどれか。\n\n1 機構は、団体信用生命保険業務として、貸付けを受けた者が死亡した場合のみならず、重度障害となった場合においても、支払われる生命保険の保険金を当該貸付けに係る債務の弁済に充当することができる。\n\n2 機構は、直接融資業務において、高齢者の死亡時に一括償還をする方法により貸付金の償還を受けるときは、当該貸付金の貸付けのために設定された抵当権の効力の及ぶ範囲を超えて、弁済の請求をしないことができる。\n\n3 証券化支援業務（買取型）に係る貸付金の利率は、貸付けに必要な資金の調達に係る金利その他の事情を勘案して機構が定めるため、どの金融機関においても同一の利率が適用される。\n\n4 証券化支援業務（買取型）において、機構による譲受けの対象となる住宅の購入に必要な資金の貸付けに係る金融機関の貸付債権には、当該住宅の購入に付随する改良に必要な資金も含まれる。",
    "correctChoices": [
      3
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 3"
  },
  {
    "id": "h29-49",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 49,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-49/",
    "questionText": "【問 49】 土地に関する次の記述のうち、最も不適当なものはどれか。\n\n1 扇状地は、山地から河川により運ばれてきた砂礫等が堆積して形成された地盤である。\n\n2 三角州は、河川の河口付近に見られる軟弱な地盤である。\n\n3 台地は、一般に地盤が安定しており、低地に比べ、自然災害に対して安全度は高い。\n\n4 埋立地は、一般に海面に対して比高を持ち、干拓地に比べ、水害に対して危険である。",
    "correctChoices": [
      4
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 4"
  },
  {
    "id": "h29-50",
    "examId": "h29",
    "year": "平成29年度",
    "label": "2017 / 平成29年度",
    "number": 50,
    "category": "免除科目",
    "sourceUrl": "https://www.retio.or.jp/wp-content/uploads/2024/10/H29-q_a.pdf",
    "externalExplanationName": "宅建レトス",
    "externalExplanationUrl": "https://takken-success.info/2017kakomon/29-50/",
    "questionText": "【問 50】 建物の構造と材料に関する次の記述のうち、最も不適当なものはどれか。\n\n1 木材の強度は、含水率が小さい状態の方が低くなる。\n\n2 鉄筋は、炭素含有量が多いほど、引張強度が増大する傾向がある。\n\n3 常温、常圧において、鉄筋と普通コンクリートを比較すると、熱膨張率はほぼ等しい。\n\n4 鉄筋コンクリート構造は、耐火性、耐久性があり、耐震性、耐風性にも優れた構造である。",
    "correctChoices": [
      1
    ],
    "isAllCorrect": false,
    "officialExplanation": "公式PDFの正解番号表: 正解 1"
  }
];
