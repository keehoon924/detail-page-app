/**
 * 오트밀리 수제 그래놀라 — 상세페이지 콘텐츠(카피 + 컬러 + 이미지 스펙).
 * 식품1(두브로 그래놀라) 디자인 언어를 차용한 10섹션 전환형 구성.
 * 카피는 후킹→공감→솔루션→근거3→신선→사용법→신뢰→CTA 의 연결 서사.
 */

/** 식품1 픽셀 샘플링 컬러 (sample-colors.ts 결과 기반). */
export const PALETTE = {
  red: '#d50001',
  redDeep: '#b00000',
  cream: '#f8ece1',
  cream2: '#f3e3d2',
  kraft: '#a76743',
  ink: '#33241c',
  sub: '#7a6a5a',
  white: '#ffffff',
  onRed: '#fdf3e8', // 레드 위 본문색
  line: '#e7d6c4',
};

export const BRAND = {
  name: '오트밀리',
  enName: 'OATMEALY',
  product: '수제 그래놀라',
  tagline: '국산 귀리로 매일 아침을 든든하게',
};

/** 생성할 이미지(gpt-image-1). 한글/문자 절대 없음, 비주얼만. */
export interface ImgSpec {
  id: string;
  size: '1024x1024' | '1024x1536' | '1536x1024';
  prompt: string;
}

export const IMAGES: ImgSpec[] = [
  {
    id: 'hero',
    size: '1024x1536',
    prompt:
      'Premium commercial food photography for an e-commerce hero: a glass jar full of homemade oat granola clusters next to a cozy ceramic bowl of granola with milk, on a warm cream-colored linen surface, soft morning sunlight from the side, scattered oats and almonds, shallow depth of field, appetizing golden tones, clean negative space at the top. Editorial, high-end, natural. Absolutely NO text, NO letters, NO words, NO numbers, NO logos, NO watermark.',
  },
  {
    id: 'oats',
    size: '1024x1024',
    prompt:
      'Close-up macro food photography of raw whole rolled oats and freshly roasted oat grains spilling from a rustic wooden scoop onto a warm cream surface, golden roasted color, natural light, artisanal and wholesome mood, top-down angle. Absolutely NO text, NO letters, NO numbers, NO logos, NO watermark.',
  },
  {
    id: 'ingredients',
    size: '1024x1024',
    prompt:
      'Top-down flat lay of granola ingredients neatly arranged on a cream linen surface: rolled oats, almonds, walnuts, pumpkin seeds, dried cranberries, a small bowl of unrefined raw sugar. Clean, bright, natural daylight, wholesome and organic feel, generous spacing. Absolutely NO text, NO letters, NO numbers, NO logos, NO watermark.',
  },
  {
    id: 'pack',
    size: '1024x1024',
    prompt:
      'Lifestyle product photography: a small single-serve kraft paper granola pouch resting on a wooden office desk next to a laptop corner and a cup of coffee, soft morning light, minimal clean composition, warm tones, on-the-go healthy breakfast mood. Absolutely NO text, NO letters, NO numbers, NO logos, NO watermark on the pouch or anywhere.',
  },
  {
    id: 'milk',
    size: '1024x1024',
    prompt:
      'Appetizing food photography: cold milk being poured into a white ceramic bowl filled with crunchy oat granola clusters, milk splash frozen in motion, on a cream surface with morning light, fresh and inviting, shallow depth of field. Absolutely NO text, NO letters, NO numbers, NO logos, NO watermark.',
  },
  {
    id: 'yogurt',
    size: '1024x1024',
    prompt:
      'Beautiful food photography: a bowl of plain yogurt topped generously with oat granola, fresh blueberries and sliced banana, drizzle of honey, on a warm cream linen surface, bright natural light, healthy breakfast styling, top-down. Absolutely NO text, NO letters, NO numbers, NO logos, NO watermark.',
  },
  {
    id: 'snack',
    size: '1024x1024',
    prompt:
      'Rustic food photography: a handful of golden granola clusters and a wooden bowl of granola on a warm wooden cutting board, scattered almonds and dried fruit, cozy warm light, artisanal homemade snack mood, close-up. Absolutely NO text, NO letters, NO numbers, NO logos, NO watermark.',
  },
  {
    id: 'jar',
    size: '1024x1536',
    prompt:
      'Clean studio product photography of a single glass jar packed with homemade oat granola clusters, sitting on a soft cream seamless background, gentle soft shadow, warm appetizing golden granola visible through the glass, premium minimal e-commerce look, centered with negative space. Absolutely NO text, NO letters, NO numbers, NO logos, NO watermark on the jar or background.',
  },
];

/* ─────────────────────────  10섹션 카피  ───────────────────────── */

export const CONTENT = {
  // 01 — 히어로 / 후킹
  hero: {
    arc: 'OATMEALY SIGNATURE GRANOLA',
    script: '매일 아침이 기다려지는',
    title: ['오트밀리', '수제 그래놀라'],
    sub: '국산 귀리로 매일 아침을 든든하게',
    chips: ['100% 국산 귀리', '인공첨가물 ZERO', '주문 후 당일 로스팅'],
    img: 'hero',
  },

  // 02 — 공감 / 문제 제기
  empathy: {
    label: 'MORNING STORY',
    head: ['오늘도 아침,', '그냥 건너뛰셨죠?'],
    body:
      '출근 준비에 쫓기는 아침. 챙겨 먹자니 번거롭고, 거르자니 오전 내내 기운이 빠집니다. 빵이나 시리얼은 금세 허기지고 당만 올라가죠.',
    pains: [
      { t: '시간이 없어서', d: '차려 먹을 10분조차 빠듯한 바쁜 아침' },
      { t: '금방 꺼지는 포만감', d: '먹어도 두 시간이면 다시 배고픈 간편식' },
      { t: '찜찜한 첨가물', d: '달기만 하고 뭐가 들었는지 모를 가공식품' },
    ],
  },

  // 03 — 솔루션 제시
  solution: {
    label: 'SOLUTION',
    head: ['그래서 오트밀리를', '만들었습니다'],
    body: '부어서 3분이면 끝나는 든든한 한 끼. 국산 귀리 그대로, 군더더기 없이.',
    cards: [
      { n: '01', t: '국산 귀리 직접 로스팅', d: '국내 농가 통귀리만 골라 직접 볶아 고소함을 살렸어요' },
      { n: '02', t: '무첨가 · 비정제원당', d: '정제 설탕도 합성 첨가물도 넣지 않았습니다' },
      { n: '03', t: '130kcal 소포장', d: '칼로리 부담 없이 딱 한 끼, 어디서나 간편하게' },
    ],
  },

  // 04 — 핵심특징 ①
  feature1: {
    arc: 'WHY OATMEALY',
    no: '01',
    head: ['100% 국산 귀리,', '매일 직접 로스팅합니다'],
    body:
      '수입 귀리 대신 국내 농가의 통귀리만 골라 씁니다. 미리 만들어 쌓아두지 않고 그날 볶기 때문에, 갓 로스팅한 귀리의 고소함이 입안 가득 퍼집니다.',
    points: ['국내산 통귀리', '자체 로스팅 공정', '살아있는 바삭함'],
    img: 'oats',
  },

  // 05 — 핵심특징 ②
  feature2: {
    arc: 'WHY OATMEALY',
    no: '02',
    head: ['설탕 대신 비정제원당,', '인공첨가물은 ZERO'],
    body:
      '정제 설탕도, 합성 향료·보존료도 넣지 않았습니다. 비정제원당의 은은한 단맛과 재료 본연의 맛만 담아, 매일 먹어도 부담 없습니다.',
    zeros: ['합성향료 0', '보존료 0', '정제설탕 0', '트랜스지방 0'],
    img: 'ingredients',
  },

  // 06 — 핵심특징 ③
  feature3: {
    arc: 'WHY OATMEALY',
    no: '03',
    head: ['한 팩 130kcal,', '부담 없는 소포장'],
    body:
      '한 끼에 딱 맞는 130kcal 개별 소포장. 가방에 쏙 들어가 사무실에서도, 외출 중에도 봉지만 뜯으면 바로 든든한 아침입니다.',
    points: ['130kcal / 팩', '개별 소포장', '휴대 간편'],
    img: 'pack',
  },

  // 07 — 신선함 (당일 로스팅 발송)
  fresh: {
    label: 'FRESHNESS',
    head: ['주문 후 당일 로스팅해', '바로 보냅니다'],
    body:
      '미리 대량으로 볶아 쌓아두고 팔지 않습니다. 주문이 들어오면 그날 로스팅해 그날 발송 — 가장 신선하고 바삭한 상태 그대로 받아보세요.',
    img: 'snack',
  },

  // 08 — 사용법 (식품1 HOW TO EAT 재현)
  howto: {
    arc: 'OATMEALY GRANOLA',
    head: 'HOW TO EAT?',
    headKo: '어떻게 먹지?',
    steps: [
      { n: '01', t: '우유에 부어서', d: '차가운 우유 한 컵에 부으면 끝. 바삭함이 살아있을 때 바로 드세요.', img: 'milk' },
      { n: '02', t: '요거트와 함께', d: '플레인 요거트 위에 듬뿍. 과일을 더하면 근사한 한 그릇이 됩니다.', img: 'yogurt' },
      { n: '03', t: '그대로 간식으로', d: '출출할 때 한 줌. 바삭하고 고소한 건강 간식으로도 좋아요.', img: 'snack' },
    ],
  },

  // 09 — 신뢰 (CHECK POINT 재현 + 후기 + 스펙)
  trust: {
    checkArc: 'OATMEALY PROMISE',
    checkTitle: 'CHECK POINT',
    checks: [
      '국내 농가의 통귀리만 사용합니다',
      '매일 소량씩 직접 로스팅합니다',
      '비정제원당 외 단맛을 더하지 않습니다',
    ],
    reviewTitle: '먼저 드셔본 분들',
    reviews: [
      { stars: 5, t: '아침마다 챙겨 먹게 돼요', who: '30대 직장인 · 김○○', d: '바빠도 부어서 먹으면 끝이라 출근 전 루틴이 됐어요.' },
      { stars: 5, t: '단 거 싫어하는데 딱 좋아요', who: '워킹맘 · 이○○', d: '안 달아서 아이랑 같이 먹어요. 고소함이 진짜예요.' },
      { stars: 5, t: '사무실 서랍에 쟁여둬요', who: '40대 직장인 · 박○○', d: '소포장이라 들고 다니기 편하고 칼로리도 안심.' },
    ],
    specTitle: '제품 상세 정보',
    specs: [
      ['제품명', '오트밀리 수제 그래놀라'],
      ['중량', '35g × 10팩'],
      ['원재료', '국산 귀리, 견과류, 건과일, 비정제원당'],
      ['보관방법', '직사광선을 피해 서늘한 실온 보관'],
      ['알레르기', '견과류 함유 (대두·밀 혼입 가능)'],
    ],
  },

  // 10 — CTA / 전환
  cta: {
    arc: 'ORDER NOW',
    head: ['내일 아침이', '달라집니다'],
    sub: '오늘 주문하면 오늘 볶아서 보내드려요',
    benefits: ['첫 구매 10% 할인', '2팩 이상 무료배송', '정기배송 추가 혜택'],
    button: '지금 주문하기',
    img: 'jar',
  },
};
