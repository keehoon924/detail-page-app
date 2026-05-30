/**
 * 시안 7번 (grande TUMBLER 480ml) — 레이아웃 1:1, 카피는 7무기로 재작성.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#5e4cc7', primaryDeep: '#3f2fa3',
  light: '#f4f0ff', light2: '#e6dcfb',
  ink: '#2c2645', sub: '#7a7396',
  accent: '#5e4cc7', bg: '#fbfaff', onPrimary: '#f4f0ff',
  surface: '#ffffff', badge: '#5e4cc7',
};

const sections: Section[] = [
  /* 1. Hero — ⑥ 장면 */
  {
    type: 'hero', bg: 'page', heroStyle: 'centered',
    label: 'grande',
    title: 'TUMBLER',
    sub: '480ml — 내일을 위한 한 모금',
    chips: ['eco-friendly'],
    image: { mask: 'rounded', label: '5색상 텀블러 (보라/빨강/검정/노랑/베이지)', overlay: 0 } as any,
  },

  /* 2. 환경 어필 — ② 숫자 */
  {
    type: 'banner', bg: 'primary',
    head: '플라스틱 컵 하나가 사라지는 데,\n400년이 걸립니다.',
  },

  /* 3. 환경 본문 — ⑥ 장면 */
  {
    type: 'feature', bg: 'page',
    body: '매년 버려지는 일회용 컵 5,000억 개.\n바다로 흘러가 미세플라스틱이 되고,\n그 일부는 결국 우리 식탁에 돌아옵니다.',
    head: '',
    image: '플라스틱 컵 더미 사진',
  },

  /* 4. ZEROWASTE */
  {
    type: 'banner', bg: 'primary',
    head: '오늘의 텀블러 한 컵이,\n내일의 바다를 지킵니다.',
    sub: 'ZEROWASTE',
  },

  /* 5. KEY POINT 6 */
  {
    type: 'checkPoint', bg: 'page',
    label: 'KEY POINT',
    title: '한눈에 보는 6가지 이유',
    items: [
      '이중진공으로 보온·보냉이 길게 갑니다',
      '304 스테인리스, 위생까지 챙겼습니다',
      '스크래치에 강한 파우더 코팅',
      '지름 80mm — 손이 쏙 들어가는 입구',
      '한 손으로 열고 닫는 플립마개',
      '논슬립 바닥 — 책상 위에서 안 흔들립니다',
    ],
  },

  /* 6. 모델 + 워터마크 */
  {
    type: 'image', bg: 'primary',
    label: '모델 (노란 텀블러 들고 있음)',
    h: 620,
    caption: 'GRANDE TUMBLER',
  },

  /* 7. POINT 01 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 01',
    head: '이중진공단열로,',
    accent: '온도가 더 오래 갑니다',
    body: '내부와 외부 사이를 진공 상태로 만들어,\n뜨거운 건 뜨겁게, 차가운 건 차갑게 — 그대로.',
    image: '흰 텀블러 클로즈업 + 단면 아이콘',
  },

  /* 8. 보온/보냉 — ② 숫자 */
  {
    type: 'stat', bg: 'page',
    head: '실측으로 증명된 보온·보냉',
    stats: [
      { value: '12시간', label: '보온 — 최대 12시간 ─40°C 이상 유지' },
      { value: '8시간', label: '보냉 — 최대 8시간 ─81°C 이하 유지' },
    ],
  },

  /* 9. 결로 비교 — ⑦ 반전 */
  {
    type: 'compare', bg: 'page',
    head: '가방에 넣어도 안 젖습니다',
    body: '일반 컵은 물방울이 맺히지만,\n그란데 텀블러는 표면이 보송보송.',
    left: '일반컵 — 결로 발생',
    right: '그란데 텀블러 — 결로 없음',
  },

  /* 10. POINT 02 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 02',
    head: '입에 닿는 부분까지,',
    accent: '304 스테인리스로',
    body: '녹슬지 않는 식품용 304 스테인리스로 제작.\n납·카드뮴 등 유해물질 불검출 인증 완료.',
    image: 'SGS 인증서',
  },

  /* 11. 라임 음료 */
  { type: 'image', bg: 'page', label: '텀블러 + 라임 음료', h: 460 },

  /* 12. POINT 03 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 03',
    head: '한 시즌 쓰고 버리는 텀블러, 그만',
    accent: '파우더 코팅으로 색 그대로',
    body: '생활 스크래치에도 강한 외장 코팅.\n처음 색 그대로, 오래 쓰는 텀블러.',
    image: '색상 텀블러 3개 (베이지/보라/카멜)',
  },

  /* 13. 5색상 */
  {
    type: 'image', bg: 'primary',
    label: '5색상 전시 (라벤더/빨강/검정/노랑/핑크)',
    cols: ['그란데 텀블러 5색', '검정 텀블러', '빨강 텀블러'],
    h: 420,
  },

  /* 14. POINT 04 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 04',
    head: '얼음이 쏙 들어가는,',
    accent: '지름 80mm 넓은 입구',
    body: '큰 얼음도 한 번에. 음료가 빨리 차가워집니다.',
    image: '텀블러 + 얼음 음료',
  },

  /* 15. 세척 */
  {
    type: 'feature', bg: 'light', reverse: true,
    head: '구석까지 손이 닿는,',
    accent: '깔끔한 세척',
    image: '손 + 세척 브러시',
  },

  /* 16. POINT 05 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 05',
    head: '한 손으로 열고 닫는,',
    accent: '플립마개',
    body: '운전 중에도, 산책 중에도 — 한 손이면 끝.',
    image: '텀블러 + 컵 + 플립마개 디테일',
  },

  /* 17. 3 STEP */
  {
    type: 'mediaRow', bg: 'page',
    head: '한 손으로, 3초.',
    headerBg: 'plain',
    items: [
      { image: '1 STEP', t: 'STEP 1', d: '엄지로 위로' },
      { image: '2 STEP', t: 'STEP 2', d: '입에 대고 한 모금' },
      { image: '3 STEP', t: 'STEP 3', d: '다시 닫고 안심' },
    ],
  },

  /* 18. POINT 06 */
  {
    type: 'feature', bg: 'page',
    label: 'POINT 06',
    head: '책상 위에서,',
    accent: '안 미끄러지는 논슬립',
    body: '물기가 있어도 흔들리지 않는 실리콘 바닥.\n작은 디테일이, 매일을 바꿉니다.',
    image: '빨간 텀블러 바닥 (논슬립 실리콘)',
  },

  /* 19. eco-friendly 3컷 */
  {
    type: 'mediaRow', bg: 'page',
    label: 'eco-friendly',
    head: '하루 어디에 가도,\n손에서 떨어지지 않습니다',
    headerBg: 'plain',
    items: [
      { image: '외출 시 한손에 쏙', t: '외출엔 한 손에', d: '가볍게 들고 어디든' },
      { image: '가방에 가볍게', t: '가방엔 가볍게', d: '컴팩트 사이즈, 부담 없는 휴대' },
      { image: '자동차 컵홀더에', t: '차엔 컵홀더에', d: '딱 맞는 호환 사이즈' },
    ],
  },

  /* 20. 색상 옵션 */
  {
    type: 'image', bg: 'page',
    label: '색상 옵션 (라벤더/베이지/카멜/핑크/검정)',
    cols: ['라벤더', '베이지', '카멜', '핑크', '검정'],
    h: 200,
    caption: '오늘은 어떤 색이세요?',
  },

  /* 21. spec */
  {
    type: 'spec', bg: 'light',
    label: 'PRODUCT INFO',
    title: '제품정보',
    rows: [
      ['품명', '그란데 텀블러 480ml'],
      ['재질 (내부)', '스테인리스 스틸 304'],
      ['재질 (외부)', '스테인리스 스틸 201'],
      ['뚜껑', 'PP / 고무패킹(PE)'],
      ['내열온도', 'PP -30~140°C, 스테인리스 -40~200°C'],
      ['제조국', '중국'],
      ['제조원', 'OOO'],
      ['판매원', 'OOO'],
    ],
  },

  /* 22. 주의사항 */
  {
    type: 'notice', bg: 'page',
    title: '주의사항',
    items: [
      '뜨거운 음료 주입 시 화상에 주의해주세요.',
      '강한 충격을 피해주세요.',
      '뚜껑을 잠그지 않은 채로 흔들지 마세요.',
      '세척 후 완전히 건조해 보관해주세요.',
      '직사광선·고온을 피해 보관해주세요.',
      '어린이 손이 닿지 않는 곳에 보관해주세요.',
    ],
  },
];

export const REF_07: Template2 = {
  id: 'ref-07', category: '리빙', theme: T, width: 860, sections,
};
