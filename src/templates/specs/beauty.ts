import type { Template } from '../types.ts';
import { Flow } from '../flow.ts';

/* 핑크 뷰티 팔레트 */
const PINK = '#e8527a', PD = '#d83a66', LP = '#fbdce4', BG = '#fdeef2', INK = '#3a2a30', SUB = '#9a8088', W = '#ffffff';

/** 가운데 정렬 칩 행 */
function chips(f: Flow, items: string[], h = 38) {
  const gap = 10, n = items.length;
  const totalW = f.w - f.pad * 2;
  const cw = (totalW - gap * (n - 1)) / n;
  const y = f.at();
  items.forEach((t, i) => {
    const x = f.pad + i * (cw + gap);
    f.add({ t: 'rect', x, y, w: cw, h, fill: W, radius: h / 2, stroke: PINK, strokeW: 1.5 });
    f.add({ t: 'text', x, y: y + h / 2 - 8, w: cw, text: t, size: 12, weight: 700, color: PD, align: 'center' });
  });
  f.set(y + h).gap(24);
}

/* 뷰티A — Torriden 셀메이징 모공 퍼펙팅 앰플 (1000×45021 → 640 단일세로) */
function beautyA(): Template {
  const f = new Flow(640, 48);
  // 히어로
  let s = f.at(); f.band(620, BG);
  f.gap(28);
  f.photo(240, 'Torriden 모공 퍼펙팅 앰플 (히어로)', { x: 210, w: 220 });
  f.text('부석부석 거칠어진 모공, 수분 채우기 그래미야요', 13, { align: 'center', color: SUB });
  f.text('매일 사용 거친 잔지국 모공 케어 제품 있을까요?', 13, { align: 'center', color: SUB });
  f.gap(8);
  f.text('점점 신경 쓰이는 모공 & 탄력 고민엔?', 19, { align: 'center', weight: 700, color: INK });
  f.text('속보습은 채우고 모공을 함께 잡아줘야', 15, { align: 'center', color: SUB });
  f.text('진짜 모공 탄력 케어!', 24, { align: 'center', weight: 800, color: PD });
  f.gap(10);
  f.text('#모공턴오버앰플', 26, { align: 'center', weight: 800, color: INK });
  f.set(s + 620); f.gap(20);
  chips(f, ['5D 복합 콜라겐+펩타이드', '모공 탄력', '8자 모공 개선']);

  // 턴오버가 필요한 이유
  f.text('모공 속까지', 18, { align: 'center', weight: 600, color: PD });
  f.text('턴오버가 필요한 이유?', 28, { align: 'center', weight: 800, color: INK });
  f.gap(8);
  f.add({ t: 'photo', x: 60, y: f.at(), w: 150, h: 150, shape: 'circle', label: '거칠어진 모공' });
  f.add({ t: 'photo', x: 245, y: f.at(), w: 150, h: 150, shape: 'circle', label: '늘어진 모공' });
  f.add({ t: 'photo', x: 430, y: f.at(), w: 150, h: 150, shape: 'circle', label: '탄력없는 모공' });
  f.gap(170);

  // CHECK POINT
  f.text('셀메이징 저분자 콜라겐 모공 탄력 앰플이 필요한 이유', 13, { align: 'center', color: SUB });
  f.text('CHECK POINT!', 30, { align: 'center', weight: 800, color: PD });
  f.gap(8);
  f.text('✓  매일 저자극으로 모공 탄력을 케어하고 싶을 때\n✓  늘어진 모공을 촉촉한 수분감으로 채우고 싶을 때\n✓  피부 탄력을 단번에 모공을 잡고 싶을 때\n✓  끈적임 없이 산뜻한 피부 결을 케어하고 싶을 때', 15, { weight: 600, color: INK, lineH: 2.1, x: 90, w: 460 });
  f.gap(10);

  // PLANET 배너
  s = f.at(); f.band(220, LP);
  f.gap(70);
  f.text('YOUR SKIN IS OUR PLANET', 22, { align: 'center', weight: 800, color: W });
  f.text('Torriden  CELLMAZING  Pore Perfecting Ampoule', 13, { align: 'center', weight: 600, color: W });
  f.set(s + 220); f.gap(30);

  // 핵심 메시지
  f.text('확 수분감으로 속부터 채워 올리는', 15, { align: 'center', color: SUB });
  f.text('탄탄 속모공 탄력 케어', 26, { align: 'center', weight: 800, color: PD });
  f.gap(10);
  f.text('왜 모공 탄력 케어 제품은\n자극적이거나 끈적일까?', 24, { align: 'center', weight: 800, color: INK, lineH: 1.3 });
  f.photo(240, '벤다이어그램 (수분 + 모공 탄력) / 제품', { x: 150, w: 340 });

  // 5D 콜라겐
  f.text('왜 5D 복합 저분자 콜라겐 일까?', 24, { align: 'center', weight: 800, color: INK });
  f.gap(8);
  f.text('5,900 DA  일반 콜라겐\n2,000 DA  어류 콜라겐\n1,000 DA  저분자 콜라겐\n300 DA  더 저분자 콜라겐\n300 DA  콜라겐 펩타이드', 15, { weight: 700, color: PD, lineH: 2.0, x: 150, w: 340 });
  f.text('콜라겐이 피부에 잘 흡수될 수 있도록 분자 크기가 다른 5가지 콜라겐을 배합했어요.', 13, { align: 'center', color: SUB });
  f.gap(6);
  s = f.at(); f.band(180, BG);
  f.gap(28);
  f.text('더 작아진 300DA 저분자 콜라겐으로\n흡수까지 효과적으로!', 20, { align: 'center', weight: 800, color: PD, lineH: 1.4 });
  f.set(s + 180); f.gap(24);

  // 임상 그래프
  f.text('2주 후, 손 끝에서 느껴지는', 15, { align: 'center', color: SUB });
  f.text('피부의 변화가 눈에 보여요!', 24, { align: 'center', weight: 800, color: INK });
  f.photo(160, '모공 개선 +9.99% / 탄력 개선 +8.01% (그래프)', { x: 90, w: 460 });
  f.text('3중 모공 속탄력 레이어링', 24, { align: 'center', weight: 800, color: PD });
  f.photo(220, '3 depth layering (단면 도식)', { x: 150, w: 340 });

  // 임상 전후
  f.text('넓어진 가로 모공  -34.15% 개선', 16, { align: 'center', weight: 700, color: PD });
  f.photo(110, '전/후 모공 비교 사진', { x: 90, w: 460 });
  f.text('늘어진 세로 모공  -33.30% 개선', 16, { align: 'center', weight: 700, color: PD });
  f.photo(110, '전/후 모공 비교 사진', { x: 90, w: 460 });
  f.text('직밀한 모공  -32.00% 개선', 16, { align: 'center', weight: 700, color: PD });
  f.photo(110, '전/후 모공 비교 사진', { x: 90, w: 460 });

  // 만족도 100%
  f.text('탄탄 속모공 탄력 케어 앰플', 14, { align: 'center', color: SUB });
  f.text('사용 후 만족도 100%', 26, { align: 'center', weight: 800, color: PD });
  f.text('진정탄력 89.4% · 속흡수 100%\n빠른 흡수 100% · 모공 케어 100%', 14, { align: 'center', weight: 600, color: INK, lineH: 1.8 });
  f.gap(10);

  // 임상시험 안내 + 텍스처
  f.text('인체적용시험 완료 (피부과 임상시험 기관)', 12, { align: 'center', color: SUB });
  f.photo(200, '손등 흡수 텍스처 사진', { x: 90, w: 460 });
  f.text('TEXTURE', 24, { align: 'center', weight: 800, color: PD });
  f.text('끈적임 없이 빠르게 흡수되는 수분감 가득 촉촉한 앰플 제형', 14, { align: 'center', color: SUB });
  f.gap(16);

  // TIP & USE
  s = f.at(); f.band(360, BG);
  f.gap(28);
  f.text('TIP & USE', 26, { align: 'center', weight: 800, color: PD });
  chips(f, ['모공 탄력 더블 케어']);
  f.text('토너로 피부결을 정돈한 후, 앰플을 모공 결 따라 펴 발라\n흡수시킨 뒤 크림으로 마무리하면 촉촉하게 마무리됩니다.', 14, { align: 'center', color: INK, lineH: 1.7 });
  f.photo(150, '토리든 크림 + 앰플 라인업', { x: 150, w: 340 });
  f.set(s + 360); f.gap(24);

  // 라인업
  f.text('토리든 독립 기능성 셀메이징 라인,', 15, { align: 'center', weight: 600, color: INK });
  f.text('고민에 따라 아낌없이 사용해 보세요!', 15, { align: 'center', color: SUB });
  f.add({ t: 'photo', x: 90, y: f.at(), w: 220, h: 180, shape: 'rect', radius: 10, label: '셀메이징 클렌징폼' });
  f.add({ t: 'photo', x: 330, y: f.at(), w: 220, h: 180, shape: 'rect', radius: 10, label: '모공 탄력 앰플' });
  f.gap(200);

  // PLANET 마무리
  f.text('POSITIVE TO OUR PLANET', 20, { align: 'center', weight: 800, color: PD });
  f.text('피부를 넘어 지구의 지속가능성을 생각하는 토리든의 약속', 13, { align: 'center', color: SUB });
  f.gap(10);
  s = f.at(); f.band(160, PINK);
  f.gap(50);
  f.text('YOUR SKIN IS\nOUR PLANET', 26, { align: 'center', weight: 800, color: W, lineH: 1.2 });
  f.set(s + 160);

  return f.done('뷰티A', '뷰티', '#ffffff');
}

/* 뷰티B — Medicube PDRN 핑크 펩타이드 세럼 (1000×55955 → 640 단일세로) */
function beautyB(): Template {
  const f = new Flow(640, 48);
  let s = f.at(); f.band(560, BG);
  f.gap(24);
  f.photo(230, 'Medicube PDRN 앰플 (히어로/리필기획)', { x: 180, w: 280 });
  f.text('연어 PDRN 앰플의 시대', 18, { align: 'center', weight: 700, color: INK });
  f.text('1등 PDRN 앰플 리필기획', 14, { align: 'center', color: SUB });
  f.set(s + 560); f.gap(20);
  chips(f, ['ONLY 1등', 'Slow Aging', 'PDRN 10,000ppm']);

  f.text('PDRN Pink Peptide Serum', 26, { align: 'center', weight: 800, color: PD, font: 'serif' });
  f.text('PDRN 핑크 펩타이드 앰플', 15, { align: 'center', color: SUB });
  f.photo(280, '드로퍼 앰플 제품컷', { x: 180, w: 280 });

  f.text('연어 PDRN 1% 최고 함유한', 15, { align: 'center', color: SUB });
  f.text('PDRN 핑크 펩타이드 앰플', 24, { align: 'center', weight: 800, color: INK });
  f.text('잡티흔적 토닝 효과', 18, { align: 'center', weight: 700, color: PD });
  f.photo(160, '잡티 흔적 피부 사진', { x: 90, w: 460 });

  f.text('단시간 무너진 탄력을 채워', 15, { align: 'center', color: SUB });
  f.text('진피 강니층까지 케어', 22, { align: 'center', weight: 800, color: INK });
  f.photo(140, 'Before / After 피부 단면 비교', { x: 90, w: 460 });
  f.text('촘촘 진정 효과            촘촘 탄력 효과', 14, { align: 'center', weight: 700, color: PD });
  f.gap(10);

  f.text('2주연 짙은 잡티·흔적빛 완료', 22, { align: 'center', weight: 800, color: INK });
  f.photo(200, '얼굴 사용 사진 + 드로퍼', { x: 150, w: 340 });
  f.text('잡티색 흔적 개선  +2.6%', 16, { align: 'center', weight: 700, color: PD });
  f.text('진피 잡티흔적 개선  +1.39%', 16, { align: 'center', weight: 700, color: PD });
  f.gap(10);

  f.text('잡티 개선', 15, { align: 'center', color: SUB });
  f.text('+14.6%', 30, { align: 'center', weight: 800, color: PD });
  f.photo(200, '얼굴 측면 + 임상 카드 (탄력 +2.19%)', { x: 150, w: 340 });

  s = f.at(); f.band(220, LP);
  f.gap(40);
  f.text('PDRN Toning Repair', 24, { align: 'center', weight: 800, color: PD, font: 'serif' });
  f.text('연어 PDRN 농축 앰플의\n토닝 리페어 시스템', 16, { align: 'center', weight: 700, color: INK, lineH: 1.4 });
  f.set(s + 220); f.gap(24);

  f.text('STEP 02  탄력 개선 케어', 14, { align: 'center', weight: 700, color: PD });
  f.text('바르기만 해도 달라지는\n집디흔적 개선 + 탄력 효과', 22, { align: 'center', weight: 800, color: INK, lineH: 1.3 });
  f.photo(120, '서소상 모근라인 먼지 개선 (전/후)', { x: 90, w: 460 });
  f.text('서소상시킴 개선  14.6%', 15, { align: 'center', weight: 700, color: PD });
  f.photo(120, '피부 지보결 개선 (전/후)', { x: 90, w: 460 });
  f.text('피부 지보결 개선  3.5%   ·   피부단결 개선  2.1%', 14, { align: 'center', weight: 700, color: PD });
  f.gap(10);

  f.text('Point 02', 14, { align: 'center', weight: 700, color: PD });
  f.text('촘촘하고 산뜻한 고농축 핑크빛 제형', 20, { align: 'center', weight: 800, color: INK });
  f.photo(180, '핑크빛 제형 클로즈업', { x: 150, w: 340 });

  s = f.at(); f.band(180, BG);
  f.gap(28);
  f.text('Pink Vitamin B12', 22, { align: 'center', weight: 800, color: PD, font: 'serif' });
  f.text('진주 큐브빛은 색기를 채워주는 핑크 비타민 B12', 14, { align: 'center', color: SUB });
  f.set(s + 180); f.gap(24);

  f.text('Plus Effects', 18, { align: 'center', weight: 800, color: PD });
  f.text('비비는 즉시 촉촉 채워지는 수분 광채감', 15, { align: 'center', color: INK });
  f.text('[수분 보습]  귀르스개선 47.2% · 푸요다 3.46% · 마르용토 9.33%\n[탄력 광채]  피부탄력 11.6% · 진피개선 1.07% · 광채/윤기 34.9%', 13, { align: 'center', weight: 600, color: INK, lineH: 1.9 });
  f.gap(10);

  f.text('Powerful Care', 16, { align: 'center', weight: 800, color: PD });
  f.text('진정 & 장벽 강화 성분 조합으로\n더욱 확실하고 강력한 케어', 22, { align: 'center', weight: 800, color: INK, lineH: 1.3 });
  f.add({ t: 'photo', x: 90, y: f.at(), w: 220, h: 130, shape: 'rect', radius: 10, label: '올리브잎+히알루론산' });
  f.add({ t: 'photo', x: 330, y: f.at(), w: 220, h: 130, shape: 'rect', radius: 10, label: '연어 콜라겐+코엔자임Q10' });
  f.gap(150);
  f.text('즉각적인 진정 효과와 손상된 피부 장벽 기능까지\n빈틈없는 연어 PDRN 앰플의 효과', 15, { align: 'center', color: INK, lineH: 1.6 });
  f.photo(120, '피부 진정/장벽 개선 (전/후)', { x: 90, w: 460 });
  f.text('피부 진정 효과 +2.6% · 피부 장벽 개선 +67.4% · 지구결 개선 77%', 13, { align: 'center', weight: 700, color: PD });
  f.gap(10);

  f.text('무겁지 않고 산뜻하게, 자극없이 빠르게', 15, { align: 'center', color: SUB });
  f.photo(220, '얼굴 사용 마무리 컷', { x: 150, w: 340 });

  s = f.at(); f.band(180, LP);
  f.gap(40);
  f.text('PDRN Pink Peptide Serum', 22, { align: 'center', weight: 800, color: PD, font: 'serif' });
  f.text('1등 그늘력 토닝업 앰플,\n피부에 아낌없이 담았어요', 15, { align: 'center', weight: 600, color: INK, lineH: 1.5 });
  f.set(s + 180);

  return f.done('뷰티B', '뷰티', '#ffffff');
}

/* 뷰티C — MOOL 베어 워터 틴트 (960×45386 → 640 단일세로) */
function beautyC(): Template {
  const f = new Flow(640, 48);
  let s = f.at(); f.band(520, BG);
  f.gap(24);
  f.photo(200, '과일 바구니 + 틴트 (히어로)', { x: 120, w: 400 });
  f.text('MOOL.', 44, { align: 'center', weight: 800, color: PD, font: 'serif' });
  f.text('유리알 같이 맑아지는 입술', 15, { align: 'center', color: SUB });
  f.set(s + 520); f.gap(16);
  f.text('BARE WATER TINT', 24, { align: 'center', weight: 800, color: INK });
  f.text('베어 워터 틴트', 14, { align: 'center', color: SUB });
  f.photo(80, '7색 컬러 라인업', { x: 90, w: 460 });

  f.text('①  머금어 마신 듯 스미는', 16, { align: 'center', weight: 600, color: PD });
  f.text('물 텍스처', 26, { align: 'center', weight: 800, color: INK });
  f.photo(180, '입술 발색 클로즈업', { x: 90, w: 460 });
  f.text('젤제가 스며들어 선명한 입술 · 입가 없이 촉촉한 컬러센스 · 주름 부각없이 매끈한 입술', 13, { align: 'center', color: SUB });
  f.gap(10);

  f.text('②  골든 과즙에서 찾아낸', 16, { align: 'center', weight: 600, color: PD });
  f.text('다채로운 컬러 차트', 26, { align: 'center', weight: 800, color: INK });
  f.photo(180, '과일 + 틴트 무드컷', { x: 90, w: 460 });
  f.text('힘없이고 산뜻한 발색 컬러', 16, { align: 'center', weight: 700, color: PD });

  // 컬러 스와치
  const sw = ['01 BARE VANILLA', '02 TAFFY FLOAT', '03 BUTTY MOVE', '04 WATER GRAPE', '05 APPLE BOTE', '06 BERRY BITE', '07 CHILLI RUSH', '08 PLUSH RED'];
  const cw = (f.w - f.pad * 2 - 30) / 4;
  const sy = f.at();
  sw.forEach((t, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = f.pad + col * (cw + 10), y = sy + row * 110;
    f.add({ t: 'ellipse', x: x + cw / 2 - 28, y, w: 56, h: 56, fill: i % 2 ? '#d98aa0' : '#e8a07a' });
    f.add({ t: 'text', x, y: y + 64, w: cw, text: t, size: 10, weight: 700, color: INK, align: 'center' });
  });
  f.set(sy + 230);

  s = f.at(); f.band(160, LP);
  f.gap(50);
  f.text('COLOR CHART', 28, { align: 'center', weight: 800, color: PD });
  f.set(s + 160); f.gap(24);

  // 컬러별 쇼케이스
  for (const c of sw.slice(0, 7)) {
    f.text(c, 18, { align: 'center', weight: 800, color: PD });
    f.photo(160, `${c} 입술 발색 컷`, { x: 90, w: 460 });
  }

  f.text('균일하게 물들어 오래도록 유지되는 착색력', 18, { align: 'center', weight: 700, color: INK });
  f.photo(150, '팔/손가락 지속력 스와치', { x: 90, w: 460 });

  f.text('번지지 않고 스며들어 오래 지속되는 착색력', 16, { align: 'center', color: SUB });
  f.rect(220, W, { x: 90, w: 460, radius: 12, stroke: PINK, strokeW: 1, gap: 4 });
  f.add({ t: 'text', x: 110, y: f.at() - 200, w: 420, text: '성분 요약서 (전성분 표기 영역)', size: 13, weight: 600, color: INK, align: 'center' });
  f.text('여러 번 덧칠해도 자극 없는 순한 사용', 14, { align: 'center', color: SUB });
  f.gap(8);

  s = f.at(); f.band(420, BG);
  f.gap(28);
  f.text('HOW TO USE', 28, { align: 'center', weight: 800, color: PD });
  chips(f, ['물 그라데이션 TIP!']);
  f.photo(150, '입술 단계 (덜어내기→연하게→채우기)', { x: 90, w: 460 });
  f.text('소량을 덜어 도트로 톡톡 → 안쪽부터 연하게 → 입술 안쪽 컬러 풀로 채워 발라요(MAX!)', 13, { align: 'center', color: INK, lineH: 1.7 });
  f.set(s + 420); f.gap(24);

  f.photo(200, 'BARE WATER TINT 제품 마무리컷', { x: 150, w: 340 });
  f.text('산뜻한 틴트 한 벌로 채워주는 즉색 한 방울', 15, { align: 'center', weight: 600, color: INK });

  return f.done('뷰티C', '뷰티', '#ffffff');
}

export const BEAUTY: Template[] = [beautyA(), beautyB(), beautyC()];
