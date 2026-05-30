/**
 * 시안 6번 (Glacier 텀블러) — 레이아웃 1:1, 카피는 7무기로 재작성.
 */
import type { Template2, Theme, Section } from '../engine.ts';

const T: Theme = {
  primary: '#2f9ad9', primaryDeep: '#1f7cb5',
  light: '#eef6fc', light2: '#dbeaf5',
  ink: '#1f2d38', sub: '#6e8190',
  accent: '#16b6c4', bg: '#f5fbfe', onPrimary: '#f1fbff',
  surface: '#ffffff', badge: '#2f9ad9',
};

const sections: Section[] = [
  /* 1. Hero — ⑥ 장면 */
  {
    type: 'hero', bg: 'page', heroStyle: 'fullbleed',
    label: 'Glacier',
    script: '한낮 30도, 손 안엔 빙하 한 조각',
    title: 'Glacier 텀블러',
    sub: '6시간 동안, 차가움은 그대로',
    image: { mask: 'rect', overlay: 0.3, focusX: 0.5, focusY: 0.5, label: '해변 + 핑크 텀블러' } as any,
  },

  /* 2. 4가지 차이 */
  {
    type: 'cards', bg: 'page',
    label: 'Glacier가 보여주는',
    head: '4가지 차이',
    cards: [
      { n: 'Point 1', t: '아이스 6시간, 보온 4시간', d: '얼음 녹지 않게, 진공 Vacuum™ 단열.' },
      { n: 'Point 2', t: '가방 안에서도 안심', d: '360° 완전 밀폐, 한 방울도 새지 않습니다.' },
      { n: 'Point 3', t: '304 스테인리스 + BPA Free', d: 'KC/FDA 인증, 식기세척기까지 OK.' },
      { n: 'Point 4', t: '600ml, 손이 쏙 들어가는 입구', d: '하루 한 통 + 안쪽까지 닦이는 청결.' },
    ],
  },

  /* 3. Glacier Edition */
  {
    type: 'banner', bg: 'page',
    label: '나만의 한 컵',
    head: 'Glacier Edition',
    sub: '5컬러 — 오늘 기분에 맞춰 고르세요',
  },

  /* 4. 컬러 픽 4컬러 */
  {
    type: 'mediaRow', bg: 'page',
    head: '오늘은 어떤 색이세요?',
    headerBg: 'plain',
    items: [
      { image: '핑크 텀블러', t: '핑크', d: '한 모금에 기분이 산뜻해지는 색' },
      { image: '라벤더 텀블러', t: '라벤더', d: '하루의 끝에 잘 어울리는 색' },
      { image: '민트 텀블러', t: '민트', d: '눈만 떠도 상쾌해지는 색' },
      { image: '블랙 텀블러', t: '블랙', d: '어떤 자리에도 어울리는 클래식' },
    ],
  },

  /* 5. 화이트 + 큰 카피 */
  {
    type: 'feature', bg: 'page',
    label: '화이트',
    head: '한 모금이,',
    accent: '하루의 온도를 바꿉니다',
    image: '화이트 텀블러',
  },

  /* 6. 사용 상황 4컷 */
  {
    type: 'cards', bg: 'page',
    head: '하루 종일, 손에서 안 떨어집니다',
    cards: [
      { t: '출근길', d: '차 안에서도 시원하게' },
      { t: '데스크 위', d: '집중할 땐 한 모금' },
      { t: '야외', d: '얼음이 안 녹습니다' },
      { t: '밤 산책', d: '시간이 지나도 차가움 그대로' },
    ],
  },

  /* 7. 스펙 헤딩 */
  {
    type: 'banner', bg: 'page',
    head: '디테일까지 보여드립니다',
    sub: 'Glacier 스펙을 한눈에',
  },

  /* 8. 4중 구조 */
  {
    type: 'feature', bg: 'page',
    head: '왜 6시간이 가능한가?',
    accent: '4중 구조 Copper Shield',
    body: '① 외벽 — 파우더코팅 304 스테인리스 (스크래치 강함)\n② 진공 — 공기 차단층 (열전도 ZERO)\n③ 구리코팅 — Copper Shield (보온 유지)\n④ 내벽 — 식품용 304 스테인리스 (위생)',
    image: '단면 4중 구조 일러스트',
  },

  /* 9. 후기 — ⑤ 공감 */
  {
    type: 'reviews', bg: 'page',
    title: '실제 사용자가 이렇게 말합니다',
    items: [
      { stars: 5, t: '보냉력 진짜 미쳤어요', d: '"아침에 넣어둔 얼음이, 저녁까지 그대로."', who: 'k**님' },
      { stars: 5, t: '결로가 없어요', d: '"가방에 그대로 넣어도 안 젖습니다."', who: 'k**님' },
      { stars: 4, t: '입구가 정말 넓어요', d: '"솔이 안쪽까지 들어가서 세척 편합니다."', who: 'a**님' },
      { stars: 5, t: '회의 끝나도 따뜻해요', d: '"3시간 화상회의 끝나도 커피가 따뜻."', who: 'k**님' },
      { stars: 5, t: '내 인생 텀블러', d: '"이제 다른 텀블러는 못 씁니다."', who: 'k**님' },
    ],
  },

  /* 10. FAQ */
  {
    type: 'faq', bg: 'page',
    label: 'FAQ',
    head: '궁금한 6가지, 한 번에 답합니다',
    items: [
      { q: '보냉·보온은 정말 그만큼 가나요?', a: '20°C 환경 기준 아이스 6시간, 90°C 기준 보온 4시간 이상 유지됩니다.' },
      { q: '식기세척기에 넣어도 되나요?', a: '본체는 가능합니다. 단, 실리콘 패킹이 있는 뚜껑은 손세척을 권장합니다.' },
      { q: '탄산음료도 보관 가능한가요?', a: '내부 압력 상승 우려로 장기 밀폐 보관은 권장하지 않습니다.' },
      { q: '실리콘 패킹 교체가 되나요?', a: '소모 부품은 공식몰에서 별도 구매 가능합니다.' },
      { q: '전자레인지·직화 사용은요?', a: '금속 재질이라 둘 다 사용 불가입니다.' },
      { q: '교환·환불은 어떻게 되나요?', a: '초기 불량은 7일 이내 무상 교환, 사용 중 하자는 무상 수리/부품 교체 가능합니다.' },
    ],
  },

  /* 11. 환경 — ② 숫자 */
  {
    type: 'feature', bg: 'page',
    label: 'Glacier 한 잔 = 일회용 컵 1,000개 절감',
    head: '"한 컵으로 지구를 식히다"',
    accent: '연간 -146 kg CO₂',
    image: '민트 텀블러 + 화살표 + 플라스틱 컵 더미',
    points: ['CO₂ 감축', '재사용'],
  },

  /* 12. 함께하는 가치 */
  {
    type: 'banner', bg: 'primary',
    head: '한 사람이 텀블러 하나,\n그게 모이면 큰 변화입니다.',
    sub: 'Glacier는 작은 변화를 응원합니다.',
  },

  /* 13. Glacier 활동 */
  {
    type: 'feature', bg: 'page',
    label: 'Glacier의 활동',
    head: 'Plastic Bank 파트너십',
    accent: '매출 1%를 지구로 환원',
    body: '· 바다를 지키는 작은 손길에 함께합니다.\n· 푸른 옷, 초록 지구 — 우리의 1%가 만드는 변화.',
    image: 'Plastic Bank 파트너십 활동 사진',
  },

  /* 14. spec */
  {
    type: 'spec', bg: 'light',
    label: 'Glacier',
    title: '제품상세정보',
    rows: [
      ['제품명', 'Glacier Tumbler'],
      ['용량', '600ml'],
      ['재질', '스테인리스 스틸 (내부), 폴리프로필렌 (뚜껑), 실리콘 (패킹)'],
      ['제조국', '중국 (OEM)'],
      ['제조사', 'Glacier Co., Ltd.'],
      ['수입·판매원', 'Glacier Korea'],
      ['주의', '강한 충격 주의, 전자레인지·직화 사용 금지'],
      ['품질보증기준', '공정거래위원회 소비자분쟁해결 기준'],
      ['고객센터', '0000-0000 (평일 09:00~18:00)'],
    ],
  },

  /* 15. 구매 안내 */
  {
    type: 'notice', bg: 'page',
    title: '구매 안내',
    items: [
      '전자상거래법에 따라 교환·환불 가능합니다.',
      '단순 변심: 수령 후 7일 이내 (미사용·미개봉)',
      '제품 하자: 왕복 배송비 무료 교환·환불',
    ],
  },
];

export const REF_06: Template2 = {
  id: 'ref-06', category: '리빙', theme: T, width: 860, sections,
};
