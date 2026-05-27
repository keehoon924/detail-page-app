import type { Template } from '../types.ts';
import { Flow } from '../flow.ts';

const INK = '#2b2b2b', SUB = '#8a8a8a', LG = '#f2f1ee', GREEN = '#3f8f3f', W = '#ffffff';

/** 가운데 작은 태그 라벨(회색 알약). */
function tag(f: Flow, text: string) {
  const w = Math.min(280, text.length * 16 + 40), h = 30;
  const x = f.w / 2 - w / 2, y = f.at();
  f.add({ t: 'rect', x, y, w, h, fill: '#ededeb', radius: h / 2 });
  f.add({ t: 'text', x, y: y + 7, w, text, size: 12, weight: 700, color: '#666', align: 'center' });
  f.set(y + h + 14);
}

/* 밥솥 — CUCKOO EGG RICE COOKER (1920×35090 → 640 단일세로) */
function bapsot(): Template {
  const f = new Flow(640, 48);
  // hero
  f.text('CUCKOO', 16, { weight: 800, color: INK });
  f.gap(6);
  f.text('EGG RICE COOKER', 30, { weight: 800, color: INK });
  f.text('깨끗하고 세련된 디자인을 담다', 15, { color: SUB });
  f.photo(280, '주방 위 밥솥 (히어로)', { x: 0, w: 640, radius: 0 });
  // design story
  f.text('DESIGN STORY', 14, { align: 'center', weight: 700, color: SUB, ls: 2 });
  f.text('심플하고 깨끗한 디자인', 24, { align: 'center', weight: 800, color: INK });
  f.text('어떤 주방에도 잘 어울리도록 심플하게 디자인 되었습니다.', 13, { align: 'center', color: SUB });
  f.photo(220, '에그 트레이 무드컷', { x: 90, w: 460 });
  f.add({ t: 'photo', x: 48, y: f.at(), w: 264, h: 150, shape: 'rect', radius: 8, label: '주방 연출1' });
  f.add({ t: 'photo', x: 328, y: f.at(), w: 264, h: 150, shape: 'rect', radius: 8, label: '주방 연출2' });
  f.gap(170);
  // 맞춤 밥맛
  f.text('아이와 부모님까지 만족', 24, { align: 'center', weight: 800, color: INK });
  tag(f, '맞춤 밥맛 기능');
  f.text('쿠쿠 전용 밥짓기술로 3가지 취향별 밥맛을 선택하여 기호에 맞게 취사할 수 있습니다.', 13, { align: 'center', color: SUB });
  f.add({ t: 'photo', x: 48, y: f.at(), w: 168, h: 120, shape: 'rect', radius: 8, label: '찰진밥' });
  f.add({ t: 'photo', x: 236, y: f.at(), w: 168, h: 120, shape: 'rect', radius: 8, label: '부드러운밥' });
  f.add({ t: 'photo', x: 424, y: f.at(), w: 168, h: 120, shape: 'rect', radius: 8, label: '구수한밥' });
  f.gap(140);
  // 다양한 요리
  f.text('다양한 음식까지', 24, { align: 'center', weight: 800, color: INK });
  tag(f, '다양한 요리 기능');
  f.text('쿠쿠와 함께 다양한 요리기능을 활용하여 맛있는 요리를 만들어보세요.', 13, { align: 'center', color: SUB });
  f.photo(240, '요리 플레이팅 모음 (수프죽·백숙·찜닭·영양밥 등)', { x: 48, w: 544 });
  // 디스플레이
  f.text('조작이 쉽고 편리한 디스플레이', 22, { align: 'center', weight: 800, color: INK });
  tag(f, '터치 방식 디스플레이');
  f.photo(180, '터치 디스플레이 클로즈업', { x: 90, w: 460 });
  // 오픈 버튼
  f.text('가볍게 누르면 가볍게 오픈', 22, { align: 'center', weight: 800, color: INK });
  tag(f, '원터치 오픈 버튼');
  f.photo(220, '손으로 버튼 누르는 컷', { x: 120, w: 400 });
  // 분리 세척
  f.text('간편하게 분리 세척이 가능한', 22, { align: 'center', weight: 800, color: INK });
  tag(f, '단순 분리형 커버');
  f.text('분리형 커버와 물받이가 탈부착 가능하여 세척과 관리가 더욱 용이합니다.', 13, { align: 'center', color: SUB });
  f.photo(260, '분해도 (분리형커버·내솥·증기캡·증기배출구·물받이)', { x: 90, w: 460 });
  // 코팅
  f.text('위생적으로 안심하고 사용', 22, { align: 'center', weight: 800, color: INK });
  tag(f, '논스틱코팅 내솥');
  f.text('쉽게 코팅이 벗겨지거나 변색없이 더욱 안심하고 요리할 수 있습니다.', 13, { align: 'center', color: SUB });
  f.photo(220, '검은 내솥 + 코팅 디테일', { x: 90, w: 460 });
  f.text('식품 용기에도 사용되는 안전한 코팅', 16, { align: 'center', weight: 700, color: INK });
  f.gap(10);
  f.text('신선한 밥맛의 비밀', 18, { align: 'center', weight: 700, color: INK });
  tag(f, '밥물고임 방지배수로');
  f.photo(160, '물받이/배수로 디테일', { x: 120, w: 400 });
  // 자동살균
  f.text('스스로 닦아서 깨끗하게', 22, { align: 'center', weight: 800, color: INK });
  tag(f, '자동 살균세척');
  f.photo(180, '스팀 자동세척 컷', { x: 120, w: 400 });
  f.text('이동도 편리하게', 18, { align: 'center', weight: 700, color: INK });
  tag(f, '분리형 파워코드');
  f.photo(160, '파워코드 분리 컷', { x: 120, w: 400 });
  // 에너지 등급
  f.text('전기료 부담 없이', 20, { align: 'center', weight: 800, color: INK });
  f.text('에너지 효율 1등급', 24, { align: 'center', weight: 800, color: GREEN });
  f.photo(120, '에너지효율 등급 게이지', { x: 150, w: 340 });
  // 제품 상세정보
  f.text('제품 상세정보', 20, { align: 'center', weight: 800, color: INK });
  f.text('쿠쿠 에그밥솥', 16, { align: 'center', weight: 700, color: INK });
  f.text('· 3가지 취향별 밥맛 선택  · 다양한 요리 기능  · 원터치 오픈 버튼\n· 단순 분리형 커버  · 상부 직화 화력 방식  · 밥물고임 방지배수로\n· 자동 살균 세척  · 분리형 파워 코드', 12, { align: 'center', color: SUB, lineH: 1.9 });
  f.rect(220, LG, { radius: 10, gap: 16 });
  f.add({ t: 'text', x: 70, y: f.at() - 204, w: 500, text: '제품명  전기보온밥솥        모델명  CR-0675FW\n용량  6인용              중량  3.5kg\n출시년월  2019년 11월      제조국  한국·중국\n정격전압  220V/60Hz       A/S  1588-8899', size: 12, weight: 500, color: INK, lineH: 2.1 });
  // 환급 이벤트
  let s = f.at(); f.band(360, GREEN);
  f.gap(30);
  f.text('고효율가전', 18, { align: 'center', weight: 700, color: W });
  f.text('10% 환급 이벤트', 30, { align: 'center', weight: 800, color: '#fff200' });
  f.text('3자녀 이상/대가족/출산가구 등 한전복지할인 가구 대상\n고효율 가전제품 구매 비용의 최대 30만원 환급 혜택!', 13, { align: 'center', color: W, lineH: 1.6 });
  f.photo(140, '대상 가전 이미지 (TV·냉장고·세탁기 등)', { x: 90, w: 460 });
  f.set(s + 360); f.gap(24);
  // 주의사항
  s = f.at(); f.band(200, '#a52828');
  f.gap(20);
  f.text('사용시 주의사항', 22, { align: 'center', weight: 800, color: W });
  f.text('▷ 이물질이 있는 상태로 사용하지 않도록 해주세요\n▷ 정격 전압·전류 기준에 맞게 사용해주세요\n▷ 전원 플러그·콘센트에 이물질이 없도록 해주세요\n▷ 전원 플러그·제품에 파손 발생하지 않도록 해주세요', 12, { color: W, lineH: 2, x: 70, w: 500 });
  f.set(s + 200);

  return f.done('밥솥', '전자기기', '#ffffff');
}

/* 선풍기 — ANNLUCY BLDC 쿨버디 핸디 선풍기 (1920×50448 → 640 단일세로) */
const BLUE = '#2f7fd0', LBLUE = '#dbeefb', BGB = '#eef6fc';
function btag(f: Flow, en: string) {
  const w = Math.min(260, en.length * 11 + 40), h = 30, x = f.w / 2 - w / 2, y = f.at();
  f.add({ t: 'rect', x, y, w, h, fill: BLUE, radius: h / 2 });
  f.add({ t: 'text', x, y: y + 8, w, text: en, size: 12, weight: 700, color: W, align: 'center' });
  f.set(y + h + 12);
}
function feature(f: Flow, no: string, en: string, head: string, body: string, photo: string) {
  f.text(no, 22, { align: 'center', weight: 800, color: '#bcbcbc' });
  btag(f, en);
  f.text(head, 22, { align: 'center', weight: 800, color: INK, lineH: 1.3 });
  f.text(body, 13, { align: 'center', color: SUB, lineH: 1.6 });
  f.photo(200, photo, { x: 120, w: 400 });
}
function fan(): Template {
  const f = new Flow(640, 48);
  let s = f.at(); f.band(620, BGB);
  f.text('ANNLUCY', 16, { align: 'center', weight: 800, color: INK });
  f.gap(8);
  f.text('일상의 모든 순간을 Cool하게', 14, { align: 'center', color: SUB });
  f.text('앤루시 BLDC\n쿨버디 핸디 선풍기', 30, { align: 'center', weight: 800, color: INK, lineH: 1.2 });
  f.text('BLDC Cool Buddy Hand Fan', 14, { align: 'center', color: BLUE });
  f.photo(280, '3색 핸디 선풍기 (블랙·화이트·크림)', { x: 90, w: 460 });
  f.set(s + 620); f.gap(20);
  // 브랜드
  f.text('“일상의 모든 순간을 빛나게”', 20, { align: 'center', weight: 800, color: INK });
  f.text('앤루시는 단순한 제품을 넘어 삶에 가치를 더하는 경험을 제공합니다.\n고객의 삶 속에서 의미 있는 변화를 만들어내는 것을 목표로 하는 브랜드입니다.', 13, { align: 'center', color: SUB, lineH: 1.6 });
  f.photo(220, '3색 선풍기 평면 배치', { x: 90, w: 460 });
  // 9가지 핵심 포인트
  s = f.at(); f.band(420, BGB);
  f.gap(24);
  f.text('시원한 여름 나기에 필요한', 14, { align: 'center', color: SUB });
  f.text('9가지 핵심 포인트', 26, { align: 'center', weight: 800, color: INK });
  const pts = ['조용·강력 BLDC 모터', '한 손에 쏙 사이즈', '100g 가벼운 무게', 'USB-C 타입', '3단계 풍량 조절', '자체제작 5엽 날개', '튼튼한 내구성', '핸드 스트랩', '안전 인증'];
  const gx = f.at();
  pts.forEach((t, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const cw = (f.w - 96 - 24) / 3, x = 48 + col * (cw + 12), y = gx + row * 100;
    f.add({ t: 'rect', x, y, w: cw, h: 90, fill: W, radius: 12 });
    f.add({ t: 'ellipse', x: x + cw / 2 - 18, y: y + 14, w: 36, h: 36, fill: LBLUE });
    f.add({ t: 'text', x: x + 6, y: y + 58, w: cw - 12, text: t, size: 11, weight: 700, color: INK, align: 'center' });
  });
  f.set(gx + 300);
  f.set(Math.max(f.at(), s + 420)); f.gap(20);
  // 기능들
  feature(f, '#01', 'BLDC Motor', '최적의 소비전력\nBrushLess DC', '저소음·저발열을 실현한 프리미엄 BLDC 모터로 조용하고 강력한 바람을 만듭니다.', 'BLDC 모터/날개 컷');
  feature(f, '#02', 'Light weight', '100g의 가벼운 무게,\n초소형 사이즈로 휴대성 Up!', '가벼운 무게와 콤팩트한 디자인으로 언제 어디나 휴대가 가능합니다.', '에코백에 넣은 선풍기');
  feature(f, '#03', 'Strong wind strength', '작지만 강력한 바람 세기!\n최대 5시간 사용 가능', '1,200mAh 배터리로 약 5시간 사용 가능. (1단 4~5시간 / 2단 2~3시간 / 3단 1.5시간)', '바람 세기 컷');
  feature(f, '#04', 'USB Type C Charging', '호환성이 좋은 C타입 충전 단자,\n배터리 걱정 없이 오래오래!', '무선만이 아닌 충전 중에도 지속적으로 사용 가능. C타입 케이블로 언제든지 충전!', 'C타입 충전 컷');
  feature(f, '#05', 'Five-leaf wing', '자체 개발 5엽 날개로\n더욱 시원한 바람!', '제조 공장과의 협업으로 탄생한 자체 개발 유선형 날개로 부드럽고 강력한 바람.', '5엽 날개 클로즈업');
  feature(f, '#06', 'Convenient operation', '단 하나의 버튼으로,\n설명서가 필요 없는 편리한 조작', '전원부터 풍량까지 단 하나의 버튼으로! (1회 1단 / 2회 2단 / 3회 3단 / 4회 전원 off)', '버튼 조작 단계');
  feature(f, '#07', 'Convenience', '앤루시는 사용 중의\n편의성을 지향합니다', '사용 중에도 간편하고 낙상 위험을 줄일 수 있도록 핸드 스트랩을 동봉합니다.', '핸드 스트랩 컷');
  // 안전 인증
  s = f.at(); f.band(300, BGB);
  f.gap(28);
  f.text('국내 전파인증 통과로', 16, { align: 'center', color: SUB });
  f.text('안전성이 확보된 제품', 24, { align: 'center', weight: 800, color: INK });
  f.add({ t: 'photo', x: 90, y: f.at(), w: 220, h: 150, shape: 'rect', radius: 8, label: 'KC 전파인증' });
  f.add({ t: 'photo', x: 330, y: f.at(), w: 220, h: 150, shape: 'rect', radius: 8, label: '전자파 적합성' });
  f.set(s + 300); f.gap(20);
  // 추천 대상
  f.text('이런 분들께 추천드려요', 22, { align: 'center', weight: 800, color: INK });
  f.text('· 출퇴근 & 야외 활동이 많은 직장인\n· 캠핑·등산·스포츠를 즐기는 아웃도어족\n· 활동이 많은 아이들', 14, { align: 'center', color: INK, lineH: 1.9 });
  f.photo(200, '연출 컷 (선풍기 2종)', { x: 120, w: 400 });
  // 사이즈/스펙
  f.text('· 제품 사이즈 안내 ·', 18, { align: 'center', weight: 800, color: INK });
  f.photo(180, '치수 도식 (총길이 140 / 헤드 두께 65mm / 지름 50mm)', { x: 120, w: 400 });
  f.text('앤루시 BLDC 쿨버디 핸디 선풍기', 16, { align: 'center', weight: 700, color: INK });
  f.rect(200, LG, { radius: 10, gap: 16 });
  f.add({ t: 'text', x: 70, y: f.at() - 184, w: 500, text: '모델명  ANN-0811D(화이트)/0811E(크림)/0811F(다크네이비)\n구성  선풍기 본품·충전 케이블·스트랩      원산지  중국\n재질  리튬이온전지·ABS      사이즈  140×50×65mm\n용량  1,200mAh      정격전압  5V/1A, 5W', size: 12, weight: 500, color: INK, lineH: 2 });

  return f.done('선풍기', '전자기기', '#ffffff');
}

/* 에어프라이기 — MIRAS 듀얼 바스켓 글라스 에어프라이어 (1920×32044 → 640 단일세로) */
function airfryer(): Template {
  const f = new Flow(640, 48);
  let s = f.at(); f.band(560, '#f4f3f1');
  f.gap(24);
  f.text('MIRAS', 18, { align: 'center', weight: 800, color: INK });
  f.gap(6);
  f.text('듀얼 바스켓\n글라스 에어프라이어', 28, { align: 'center', weight: 800, color: INK, lineH: 1.25 });
  f.text('이전까지 없던 주방의 혁신, 조리부터 보관까지 한번에 해결', 13, { align: 'center', color: SUB });
  f.photo(260, '글라스 에어프라이어 + 음식 (히어로)', { x: 90, w: 460 });
  f.set(s + 560); f.gap(16);
  f.text('미라스가 만든 주방의 핵심 변화', 22, { align: 'center', weight: 800, color: INK });
  f.photo(220, '에어프라이어 정면컷', { x: 90, w: 460 });
  // 보이는 유리 바스켓
  f.text('열지 않아도 보이는 유리 바스켓으로\n완벽한 굽기 조절', 20, { align: 'center', weight: 800, color: INK, lineH: 1.3 });
  f.photo(180, '유리 바스켓 들여다보는 컷', { x: 90, w: 460 });
  f.text('옮길 필요 없이 뚜껑만 닫아 그대로 보관하고 재가열까지 한 번에!', 14, { align: 'center', color: INK });
  f.photo(180, '식기세척기 컷', { x: 90, w: 460 });
  f.text('설거지거리는 유리용기뿐. 식기세척기도 OK', 14, { align: 'center', weight: 700, color: INK });
  f.gap(10);
  // 한눈에 보기 (9 아이콘)
  s = f.at(); f.band(440, '#f4f3f1');
  f.gap(24);
  f.text('미라스 에어프라이어 한눈에 보기', 22, { align: 'center', weight: 800, color: INK });
  const feats = ['원스톱 조리/식사/보관', '4가지 조리모드', '전면 투명유리', '쉬운 조작패널', '2사이즈 용기 (1.2L~4.5L)', '강력한 열풍순환', '안심 안전설계', '국가 인증제품', '완벽 분리세척'];
  const gx = f.at();
  feats.forEach((t, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const cw = (f.w - 96 - 24) / 3, x = 48 + col * (cw + 12), y = gx + row * 110;
    f.add({ t: 'ellipse', x: x + cw / 2 - 26, y, w: 52, h: 52, fill: '#dcdcda' });
    f.add({ t: 'text', x: x + 4, y: y + 60, w: cw - 8, text: t, size: 11, weight: 600, color: INK, align: 'center' });
  });
  f.set(gx + 330);
  f.set(Math.max(f.at(), s + 440)); f.gap(20);
  // 원스톱
  f.text('Cook - Eat - Keep', 15, { align: 'center', weight: 600, color: SUB, ls: 1 });
  f.text('원스톱 조리/보관', 24, { align: 'center', weight: 800, color: INK });
  f.text('조리부터 식사, 보관까지 그릇 이동 없이 한번에. 번거로운 설거지 시간을 획기적으로 줄여줍니다.', 13, { align: 'center', color: SUB, lineH: 1.6 });
  f.photo(220, '조리용기 그대로 플레이팅 컷', { x: 90, w: 460 });
  // 2사이즈
  f.text('1.2L와 4.5L 활용도 높은', 15, { align: 'center', color: SUB });
  f.text('2가지 사이즈 조리용기', 24, { align: 'center', weight: 800, color: INK });
  f.text('혼자 먹는 간편식부터 온가족 음식까지 음식 양에 따라 다르게 조리.', 13, { align: 'center', color: SUB });
  f.add({ t: 'photo', x: 90, y: f.at(), w: 220, h: 150, shape: 'rect', radius: 10, label: '1.2L 용기' });
  f.add({ t: 'photo', x: 330, y: f.at(), w: 220, h: 150, shape: 'rect', radius: 10, label: '4.5L 용기' });
  f.gap(170);
  // 보관용기 탈바꿈
  f.text('뚜껑만 덮으면 끝', 16, { align: 'center', color: SUB });
  f.text('보관용기로 탈바꿈', 24, { align: 'center', weight: 800, color: INK });
  f.text('남은 음식 번거롭게 옮겨담지 마세요. 뚜껑만 덮으면 쉽게 보관할 수 있습니다.', 13, { align: 'center', color: SUB });
  f.photo(180, '냉장고 보관 컷', { x: 90, w: 460 });
  // 열풍 순환
  f.text('기름 없이도 바삭하게', 16, { align: 'center', color: SUB });
  f.text('강력한 열풍 순환 기술', 24, { align: 'center', weight: 800, color: '#e0670a' });
  f.text('내부의 열을 빠르고 강하게 순환시키는 컨벡션 효과로 완벽한 조리 결과를 만듭니다.', 13, { align: 'center', color: SUB });
  f.photo(220, '열풍 순환 (히팅코일) 컷', { x: 120, w: 400 });
  // 조작 패널
  f.text('조리모드로 누구나 간편하게', 16, { align: 'center', color: SUB });
  f.text('직관적인 조작 패널', 24, { align: 'center', weight: 800, color: INK });
  f.text('버튼 하나로 끝내는 직관적인 패널과 메뉴에 맞는 4가지 조리모드.', 13, { align: 'center', color: SUB });
  f.photo(160, '디지털 패널 (230℃) 컷', { x: 120, w: 400 });
  // 안전
  s = f.at(); f.band(420, '#f4f3f1');
  f.gap(28);
  f.text('편리한 사용 만큼', 16, { align: 'center', color: SUB });
  f.text('안전도 중요하니까!', 24, { align: 'center', weight: 800, color: INK });
  f.text('꼼꼼한 안전설계로 안심하고 온 가족 요리를 시작하세요.\n국내 인증 기관의 필수 안전 인증을 모두 통과한 검증된 제품입니다.', 13, { align: 'center', color: SUB, lineH: 1.6 });
  f.photo(200, '후면 열 배출구 컷', { x: 120, w: 400 });
  f.text('본체 분리 시 자동 전원 차단 센서가 즉시 전원을 차단합니다 (메모리 유지 30초)', 12, { align: 'center', color: SUB });
  f.set(Math.max(f.at(), s + 420)); f.gap(16);
  // SPEC
  f.text('상세 SPEC', 18, { align: 'center', weight: 800, color: INK });
  f.rect(230, LG, { radius: 10, gap: 16 });
  f.add({ t: 'text', x: 70, y: f.at() - 214, w: 500, text: '제품명  미라스 듀얼바스켓 디지털 에어프라이어\n모델명  MS-4015PC      정격전압  220-240V 50-60Hz\n소비전력  1,500W      제품중량  약 4.9kg\n제품크기  295×232×300mm      제품용량  4.5L / 1.2L\n안전인증  SU073029-25001      제조국  중국', size: 12, weight: 500, color: INK, lineH: 2 });

  return f.done('에어프라이기', '전자기기', '#ffffff');
}

export const ELECTRONICS_LONG: Template[] = [bapsot(), fan(), airfryer()];
