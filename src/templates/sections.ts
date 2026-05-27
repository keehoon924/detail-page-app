/**
 * 섹션 패턴 카탈로그 — 16종 레퍼런스에서 반복되는 레이아웃을 파라미터화한 재사용 헬퍼.
 * 새 제품은 한 템플릿을 복제하지 않고, 여기서 섹션을 골라 색·카피·밀도를 맞춰 "조립"한다.
 * 각 함수는 P(y커서)에 블록을 쌓고 커서를 전진시킨다. (좌표는 Figma/HTML 양쪽에 그대로 적용)
 *
 * 출처 표기: 각 섹션이 어느 레퍼런스에서 나왔는지 주석으로 남김.
 */
import { P, stars } from './kit.ts';

const W = 860;

/* ─────────── 공통: 섹션 제목 (영문 라벨 + 큰 한글 제목) ───────────
   출처: 식품1 WHEN TO EAT / INGREDIENTS, 전자기기 다수 */
export function sectionLabel(p: P, eyebrow: string, title: string,
  o: { eyebrowColor?: string; titleColor?: string; ls?: number; titleSize?: number; gap?: number; font?: 'sans' | 'serif' | 'script' } = {}) {
  if (eyebrow) p.ctext(eyebrow, 16, { weight: 700, color: o.eyebrowColor ?? '#b07a3e', ls: o.ls ?? 2, gap: 28 });
  p.ctext(title, o.titleSize ?? 34, { weight: 800, color: o.titleColor ?? '#2b2b2b', font: o.font, gap: o.gap ?? 48 });
  return p;
}

/* ─────────── 히어로 ① 엠블럼형 (원형 로고 + 손글씨 + 큰 제목 + 사진 + 칩)
   출처: 식품1 두브로 ─────────── */
export function heroEmblem(p: P, o: {
  emblem?: string; script?: string; title: string; sub?: string;
  photoH?: number; photoLabel?: string; photoSrc?: string; chips?: string[];
  ink?: string; accent?: string; sub2?: string; emblemBg?: string; chipBg?: string; chipStroke?: string;
}) {
  const ink = o.ink ?? '#3a2a1f', accent = o.accent ?? '#c43a2f';
  p.gap(52);
  if (o.emblem) { p.circle((W - 96) / 2, p.at(), 96, o.emblemBg ?? '#b07a3e', { label: o.emblem, color: '#fff', size: 16, weight: 700 }); p.gap(120); }
  if (o.script) p.ctext(o.script, 30, { font: 'script', color: accent, gap: 40 });
  p.ctext(o.title, 54, { weight: 800, color: accent, lineH: 1.16, gap: 40 });
  if (o.sub) p.ctext(o.sub, 16, { weight: 700, color: o.sub2 ?? '#b07a3e', ls: 3, gap: 40 });
  p.photo(o.photoH ?? 380, o.photoLabel ?? '메인 비주얼', { radius: 20, gap: o.chips ? 28 : 64, src: o.photoSrc });
  if (o.chips) p.chips(o.chips, { bg: o.chipBg ?? '#fff', color: accent, stroke: o.chipStroke ?? '#eccfae', strokeW: 1, size: 15, advanceGap: 70 });
  return p;
}

/* ─────────── 히어로 ② 컬러 밴드형 (배경 꽉 채운 색 + 흰/포인트 글자)
   출처: 식품2 블랙, 식품3 브라운, 선풍기 스카이 ─────────── */
export function heroBand(p: P, o: {
  bandH?: number; bg: string; eyebrow?: string; title: string; titleColor: string;
  sub?: string; subColor?: string; photoLabel?: string; photoSrc?: string; photoH?: number;
  pill?: string; pillBg?: string; body?: string; bodyColor?: string; eyebrowColor?: string;
}) {
  const y = p.at(), bi = p.B.length;
  p.bg(10, o.bg, { y }); // 높이는 콘텐츠 쌓은 뒤 자동 패치
  p.gap(56);
  if (o.eyebrow) p.ctext(o.eyebrow, 20, { color: o.eyebrowColor ?? o.subColor ?? '#ddd', gap: 36 });
  p.ctext(o.title, 56, { weight: 800, color: o.titleColor, lineH: 1.14, gap: 70 });
  if (o.sub) p.ctext(o.sub, 18, { color: o.subColor ?? '#fff', gap: 40 });
  if (o.photoLabel != null) p.photo(o.photoH ?? 360, o.photoLabel, { x: 120, w: W - 240, radius: 18, gap: 36, src: o.photoSrc });
  if (o.pill) p.pill(o.pill, { cx: true, bg: o.pillBg ?? '#fff', color: o.bg, size: 19, padX: 30, advance: true, gap: 40 });
  if (o.body) p.ctext(o.body, 22, { weight: 700, color: o.bodyColor ?? '#fff', lineH: 1.6, gap: 56 });
  p.B[bi].h = o.bandH ?? (p.at() - y); // 콘텐츠 끝까지 밴드 확장
  return p;
}

/* ─────────── 히어로 ③ 미니멀 빅타이포형
   출처: 에어프라이기 MILAS, 가습기 ─────────── */
export function heroBigType(p: P, o: {
  brand: string; brandSub?: string; title: string; divider?: boolean; body?: string;
  photoLabel?: string; photoSrc?: string; ink?: string; sub?: string;
}) {
  const ink = o.ink ?? '#2b2b2b', sub = o.sub ?? '#888';
  p.gap(56);
  p.ctext(o.brand, 26, { weight: 800, color: ink, ls: 4, gap: o.brandSub ? 12 : 36 });
  if (o.brandSub) p.ctext(o.brandSub, 12, { color: sub, ls: 3, gap: 36 });
  p.ctext(o.title, 38, { weight: 800, color: ink, lineH: 1.25, gap: o.divider ? 28 : 56 });
  if (o.divider) p.hr({ color: '#ddd', x: 360, w: 140, gap: 26 });
  if (o.body) p.ctext(o.body, 18, { color: sub, lineH: 1.6, gap: 56 });
  p.photo(340, o.photoLabel ?? '제품 (히어로)', { radius: 0, gap: 70, src: o.photoSrc });
  return p;
}

/* ─────────── 히어로 ④ 풀블리드 이미지형 (NEW: 실제 이미지 + 스크림 + 흰 카피)
   신규 — 실사 입력 시 가장 강력한 히어로 ─────────── */
export function heroFullbleed(p: P, o: {
  src: string; h?: number; eyebrow?: string; title: string; sub?: string;
  titleColor?: string; scrimTo?: number;
}) {
  const h = o.h ?? 460, y = p.at();
  p.bgimage(h, o.src, { overlay: '#000', overlayOpacity: 0.12 });
  p.grad(h, '#000', '#000', { y, fromA: 0, toA: o.scrimTo ?? 0.62 });
  let ty = y + h - 150;
  if (o.eyebrow) { p.atext(64, ty, p.cw(), o.eyebrow, 16, { weight: 700, color: '#fff', align: 'center', ls: 2 }); ty += 34; }
  p.atext(64, ty, p.cw(), o.title, 38, { weight: 800, color: o.titleColor ?? '#fff', align: 'center', lineH: 1.2 });
  if (o.sub) p.atext(64, ty + 56, p.cw(), o.sub, 17, { color: '#f0f0f0', align: 'center' });
  p.to(y + h + 56);
  return p;
}

/* ─────────── 번호 스텝 행 (원형 번호 + 제목 + 설명) 3컬럼
   출처: 식품1 WHEN TO EAT / HOW TO EAT ─────────── */
export function stepsRow(p: P, items: [string, string, string][], o: { accent?: string; ink?: string; sub?: string; cols?: number; gap?: number } = {}) {
  const accent = o.accent ?? '#c43a2f', ink = o.ink ?? '#3a2a1f', sub = o.sub ?? '#8a7867', n = o.cols ?? items.length;
  const top = p.at();
  p.cols(n, o.gap ?? 28, (i, x, cw) => {
    if (!items[i]) return;
    p.circle(x + (cw - 72) / 2, top, 72, accent, { label: items[i][0], color: '#fff', size: 28 });
    p.atext(x, top + 96, cw, items[i][1], 23, { weight: 800, color: ink, align: 'center' });
    p.atext(x, top + 138, cw, items[i][2], 16, { color: sub, align: 'center', lineH: 1.5 });
  });
  p.to(top + 240);
  return p;
}

/* ─────────── 원형 사진 + 캡션 그리드 (재료/라인업/아이콘)
   출처: 식품1 INGREDIENTS, 식품2 언제먹어도 ─────────── */
export function circleCaptionGrid(p: P, items: string[], cols: number, o: { d?: number; gapX?: number; gapY?: number; ink?: string; capSize?: number; srcs?: string[] } = {}) {
  const top = p.at(), d = o.d ?? 150, gapX = o.gapX ?? 22, gapY = o.gapY ?? 56, ink = o.ink ?? '#3a2a1f';
  const colW = (p.cw() - gapX * (cols - 1)) / cols, rowH = d + 50 + gapY;
  items.forEach((nm, i) => {
    const c = i % cols, r = Math.floor(i / cols), x = 64 + c * (colW + gapX), y = top + r * rowH;
    const dd = Math.min(colW, d);
    p.aphoto(x + (colW - dd) / 2, y, dd, dd, nm, { shape: 'circle', src: o.srcs?.[i] });
    p.atext(x - 6, y + dd + 14, colW + 12, nm, o.capSize ?? 17, { weight: 700, color: ink, align: 'center' });
  });
  p.to(top + Math.ceil(items.length / cols) * rowH);
  return p;
}

/* ─────────── 아이콘 그리드 (사각/원형 아이콘 + 캡션 + 선택 서브)
   출처: 선풍기 9핵심, 에어프라이기 한눈에 ─────────── */
export function iconGrid(p: P, items: [string, string?][], cols: number, o: { iconBg?: 'circle' | 'square'; d?: number; gapX?: number; gapY?: number; capColor?: string; subColor?: string; capSize?: number; srcs?: string[] } = {}) {
  const d = o.d ?? 96, gapX = o.gapX ?? 24, gapY = o.gapY ?? 70;
  const colW = (p.cw() - gapX * (cols - 1)) / cols, rowH = d + (o.subColor ? 88 : 60) + gapY, top = p.at();
  items.forEach((it, i) => {
    const c = i % cols, r = Math.floor(i / cols), x = 64 + c * (colW + gapX), y = top + r * rowH;
    p.aphoto(x + (colW - d) / 2, y, d, d, '', { shape: o.iconBg === 'square' ? 'rect' : 'circle', radius: 20, src: o.srcs?.[i] });
    p.atext(x - 4, y + d + 14, colW + 8, it[0], o.capSize ?? 17, { weight: 700, color: o.capColor ?? '#2b2b2b', align: 'center', lineH: 1.35 });
    if (it[1]) p.atext(x - 4, y + d + 14 + (o.capSize ?? 17) * 1.5, colW + 8, it[1], 14, { color: o.subColor ?? '#8a8a8a', align: 'center' });
  });
  p.to(top + Math.ceil(items.length / cols) * rowH);
  return p;
}

/* ─────────── 약속/원칙 밴드 (컬러 배경 + 알약 제목 + 번호 리스트)
   출처: 식품1 CHECK POINT(red) ─────────── */
export function promiseBand(p: P, o: { bg: string; eyebrow?: string; pill: string; items: string[]; on?: string; bandH?: number }) {
  const on = o.on ?? '#f7e6d3', y = p.at(), bi = p.B.length;
  p.bg(10, o.bg, { y });
  p.gap(56);
  if (o.eyebrow) p.ctext(o.eyebrow, 16, { weight: 700, color: on, ls: 3, gap: 26 });
  p.pill(o.pill, { cx: true, bg: '#fff', color: o.bg, size: 20, padX: 30, advance: true, gap: 44 });
  const x0 = 150;
  o.items.forEach((t, i) => {
    const yy = p.at();
    p.circle(x0, yy, 52, on, { label: String(i + 1).padStart(2, '0'), color: o.bg, size: 21 });
    p.atext(x0 + 72, yy + 12, W - x0 * 2 - 12, t, 22, { weight: 700, color: '#fff' });
    p.gap(80);
  });
  p.gap(28);
  p.B[bi].h = o.bandH ?? (p.at() - y);
  return p;
}

/* ─────────── 후기 알약 (별점 + 한 줄, 둥근 알약 반복)
   출처: 식품2/식품3 ─────────── */
export function reviewPills(p: P, items: string[], o: { bg?: string; color?: string; x?: number } = {}) {
  const x = o.x ?? 120, w = W - x * 2;
  items.forEach((t) => {
    const y = p.at();
    p.bg(72, o.bg ?? '#ff5a3c', { x, w, radius: 36 });
    p.atext(x, y + 24, w, '★★★★★  ' + t, 18, { weight: 700, color: o.color ?? '#fff', align: 'center' });
    p.gap(88);
  });
  return p;
}

/* ─────────── 후기 카드 (별점 + 작성자 + 본문, 형광 하이라이트 옵션)
   출처: 유아A ─────────── */
export function reviewCards(p: P, items: [string, string][], o: { cardBg?: string; star?: string; meta?: string; ink?: string; highlight?: string; cardH?: number } = {}) {
  const cardBg = o.cardBg ?? '#fff', star = o.star ?? '#e2542a', cardH = o.cardH ?? 120;
  items.forEach((r) => {
    const y = p.at();
    p.bg(cardH, cardBg, { x: 64, w: p.cw(), radius: 12 });
    p.atext(88, y + 18, p.cw() - 48, stars(5) + '  5', 14, { weight: 700, color: star });
    p.atext(88, y + 44, p.cw() - 48, r[0], 13, { color: o.meta ?? '#8a7e70' });
    if (o.highlight) p.abs({ t: 'rect', x: 88, y: y + 70, w: p.cw() - 80, h: 34, fill: o.highlight });
    p.atext(96, y + 78, p.cw() - 64, r[1], 14, { color: o.ink ?? '#2f261f' });
    p.to(y + cardH + 24);
  });
  return p;
}

/* ─────────── 평점 카드 (큰 점수 + 리뷰수/만족도)
   출처: 유아A 4.9/5 ─────────── */
export function ratingCard(p: P, o: { brand?: string; label?: string; score: string; stars?: string; reviews?: string; satisfaction?: string; note?: string; ink?: string; accent?: string; cardBg?: string; star?: string }) {
  const y = p.at(), ink = o.ink ?? '#2f261f', accent = o.accent ?? '#8a5a36';
  p.bg(400, o.cardBg ?? '#fff', { x: 64, w: p.cw(), radius: 16 });
  if (o.brand) p.atext(64, y + 40, p.cw(), o.brand, 24, { weight: 800, color: accent, align: 'center' });
  p.atext(64, y + 82, p.cw(), o.label ?? '고객 총 평점', 18, { weight: 700, color: ink, align: 'center' });
  p.atext(64, y + 118, p.cw(), o.score, 48, { weight: 800, color: ink, align: 'center' });
  p.atext(64, y + 190, p.cw(), o.stars ?? stars(5), 26, { color: o.star ?? '#e2542a', align: 'center' });
  if (o.reviews) p.atext(64, y + 250, p.cw(), o.reviews, 20, { weight: 700, color: ink, align: 'center' });
  if (o.satisfaction) p.atext(64, y + 292, p.cw(), o.satisfaction, 20, { weight: 700, color: ink, align: 'center' });
  if (o.note) p.atext(64, y + 340, p.cw(), o.note, 12, { color: '#8a7e70', align: 'center' });
  p.to(y + 400 + 50);
  return p;
}

/* ─────────── 비교 카드 (2열: 일반 vs 우리 제품, 가운데 구분선)
   출처: 유아5 ─────────── */
export function compareCard(p: P, o: { left: { title: string; lines: string }; right: { title: string; lines: string }; ink?: string; subColor?: string; accent?: string; cardBg?: string; h?: number }) {
  const h = o.h ?? 220, y = p.at(), cardBg = o.cardBg ?? '#fff';
  p.bg(h, cardBg, { x: 64, w: p.cw(), radius: 14 });
  p.cols(2, 0, (i, x, cw) => {
    const side = i === 0 ? o.left : o.right;
    p.atext(x + 24, y + 28, cw - 48, side.title, 16, { weight: 800, color: i === 0 ? (o.subColor ?? '#8a7a66') : (o.accent ?? '#a8825e'), align: 'center' });
    p.atext(x + 24, y + 70, cw - 48, side.lines, 15, { color: o.ink ?? '#3a2f24', align: 'center', lineH: 1.9 });
  });
  p.abs({ t: 'line', x: W / 2, y: y + 24, w: 2, h: h - 50, fill: '#e6ddd0' });
  p.to(y + h + 50);
  return p;
}

/* ─────────── 체크리스트 (체크 아이콘 + 한 줄, 흰 알약 반복)
   출처: 패션2 CHECK POINT 5 ─────────── */
export function checklist(p: P, items: string[], o: { rowBg?: string; check?: string; ink?: string; rowH?: number } = {}) {
  const rowBg = o.rowBg ?? '#fff', check = o.check ?? '#d6453a', ink = o.ink ?? '#2b2b2b', rowH = o.rowH ?? 56;
  items.forEach((t) => {
    const y = p.at();
    p.bg(rowH, rowBg, { x: 64, w: p.cw(), radius: 10 });
    p.abs({ t: 'rect', x: 88, y: y + (rowH - 26) / 2, w: 26, h: 26, fill: check, radius: 6 });
    p.atext(92, y + (rowH - 26) / 2 + 4, 26, '✓', 14, { weight: 800, color: '#fff', align: 'center' });
    p.atext(134, y + (rowH - 20) / 2, p.cw() - 90, t, 16, { weight: 700, color: ink });
    p.gap(rowH + 14);
  });
  return p;
}

/* ─────────── 좌우 2열 특징 (한쪽 사진 / 한쪽 텍스트)
   출처: 가습기 Easy/Power…, 밥솥 에너지 ─────────── */
export function featureLR(p: P, o: { title: string; body: string; photoLabel?: string; photoSrc?: string; photoSide?: 'left' | 'right'; ink?: string; sub?: string; photoH?: number; bodyGap?: number }) {
  const ink = o.ink ?? '#28303a', sub = o.sub ?? '#8a9099', ph = o.photoH ?? 200, photoLeft = (o.photoSide ?? 'left') === 'left';
  p.cols(2, 30, (col, x) => {
    const isPhoto = (col === 0) === photoLeft;
    if (isPhoto) p.aphoto(x, p.at(), (p.cw() - 30) / 2, ph, o.photoLabel ?? '', { radius: 12, src: o.photoSrc });
    else {
      p.atext(x, p.at() + 20, (p.cw() - 30) / 2, o.title, 30, { weight: 800, color: ink });
      p.atext(x, p.at() + 70, (p.cw() - 30) / 2, o.body, 16, { color: sub, lineH: 1.7 });
    }
  });
  p.gap(ph + (o.bodyGap ?? 40));
  return p;
}

/* ─────────── 스택 특징 (사진 + 제목 + 알약 + 본문, 중앙)
   출처: 밥솥/에어프라이기/선풍기 #01~ ─────────── */
export function featureStack(p: P, o: { photoLabel?: string; photoSrc?: string; photoH?: number; title: string; body?: string; pill?: string; pillBg?: string; ink?: string; sub?: string; eyebrow?: string; accent?: string }) {
  const ink = o.ink ?? '#2b2b2b', sub = o.sub ?? '#888';
  if (o.eyebrow) p.ctext(o.eyebrow, 19, { weight: 600, color: sub, gap: 30 });
  p.ctext(o.title, 30, { weight: 800, color: ink, lineH: 1.3, gap: o.pill ? 18 : 32 });
  if (o.pill) p.pill(o.pill, { cx: true, bg: o.pillBg ?? '#3a3a3a', color: '#fff', size: 15, advance: true, gap: 30 });
  if (o.body) p.ctext(o.body, 16, { color: sub, lineH: 1.7, gap: 40 });
  p.photo(o.photoH ?? 300, o.photoLabel ?? '', { radius: 12, gap: 56, src: o.photoSrc });
  return p;
}

/* ─────────── 2열 포인트 카드 (라벨 + 제목 + 설명)
   출처: 식품3 POINT 1~4, babycape 진심 ─────────── */
export function pointCards(p: P, items: [string, string, string][], o: { cols?: number; cardBg?: string; cardH?: number; ink?: string; sub?: string; accent?: string; gap?: number } = {}) {
  const cols = o.cols ?? 2, cardBg = o.cardBg ?? '#fff', ch = o.cardH ?? 150, gap = o.gap ?? 24;
  const top = p.at(), cw = (p.cw() - gap * (cols - 1)) / cols;
  items.forEach((pt, i) => {
    const c = i % cols, r = Math.floor(i / cols), x = 64 + c * (cw + gap), y = top + r * (ch + gap);
    p.abs({ t: 'rect', x, y, w: cw, h: ch, fill: cardBg, radius: 14 });
    p.atext(x + 24, y + 24, cw - 48, pt[0], 14, { weight: 700, color: o.accent ?? '#f2741a' });
    p.atext(x + 24, y + 54, cw - 48, pt[1], 22, { weight: 800, color: o.ink ?? '#3a2a1f' });
    p.atext(x + 24, y + 96, cw - 48, pt[2], 15, { color: o.sub ?? '#8a7565', lineH: 1.4 });
  });
  p.to(top + Math.ceil(items.length / cols) * (ch + gap) + 32);
  return p;
}

/* ─────────── 스펙 표 (키-값 행, 밑줄 구분 / 카드 옵션)
   출처: 밥솥/선풍기/에어프라이기 SPEC ─────────── */
export function specRows(p: P, rows: [string, string][], o: { card?: boolean; ink?: string; sub?: string; lineColor?: string; rowH?: number } = {}) {
  const ink = o.ink ?? '#2b2b2b', sub = o.sub ?? '#888', rowH = o.rowH ?? 50, x0 = o.card ? 96 : 64;
  if (o.card) { const y0 = p.at(); p.bg(rows.length * rowH + 32, '#fff', { x: 64, w: p.cw(), radius: 14 }); p.to(y0 + 24); }
  rows.forEach((r) => {
    const y = p.at();
    p.atext(x0, y, 150, r[0], 15, { weight: 700, color: ink });
    p.atext(x0 + 156, y, p.cw() - 176, r[1], 15, { color: sub });
    if (!o.card) p.hr({ color: o.lineColor ?? '#eee', gap: 18, x: x0, w: p.cw() - (x0 - 64) * 2 });
    p.to(y + rowH);
  });
  p.gap(20);
  return p;
}

/* ─────────── 정보 알약 행 (흰 박스에 키-값)
   출처: 식품1 제품 상세 정보 ─────────── */
export function infoPillRows(p: P, rows: [string, string][], o: { accent?: string; ink?: string; rowH?: number } = {}) {
  const rowH = o.rowH ?? 60;
  rows.forEach((r) => {
    const y = p.at();
    p.bg(rowH, '#fff', { x: 64, w: p.cw(), radius: 10 });
    p.atext(88, y + (rowH - 20) / 2, 150, r[0], 16, { weight: 700, color: o.accent ?? '#c43a2f' });
    p.atext(250, y + (rowH - 20) / 2, p.cw() - 210, r[1], 16, { color: o.ink ?? '#3a2a1f' });
    p.gap(rowH + 10);
  });
  return p;
}

/* ─────────── 추천 대상 카드 (썸네일 + 제목 + 설명, 가로 카드)
   출처: 선풍기 추천, 유아5 안전 ─────────── */
export function recommendCards(p: P, items: [string, string][], o: { cardBg?: string; ink?: string; sub?: string; cardH?: number; srcs?: string[] } = {}) {
  const cardBg = o.cardBg ?? '#fff', cardH = o.cardH ?? 110;
  items.forEach((r, i) => {
    const y = p.at();
    p.bg(cardH, cardBg, { x: 64, w: p.cw(), radius: 14 });
    p.aphoto(84, y + 20, 130, cardH - 40, '', { radius: 8, src: o.srcs?.[i] });
    p.atext(240, y + 22, p.cw() - 200, r[0], 18, { weight: 800, color: o.ink ?? '#2b2b2b' });
    p.atext(240, y + 56, p.cw() - 200, r[1], 14, { color: o.sub ?? '#8a8a8a' });
    p.to(y + cardH + 18);
  });
  return p;
}

/* ─────────── 최종 CTA 밴드 (컬러 + 제목 + 칩 + 버튼)
   출처: 식품1 ORDER NOW ─────────── */
export function ctaBand(p: P, o: { bg: string; eyebrow?: string; title: string; sub?: string; chips?: string[]; chipBg?: string; button: string; on?: string; bandH?: number }) {
  const on = o.on ?? '#f7e6d3', y = p.at(), bi = p.B.length;
  p.bg(10, o.bg, { y });
  p.gap(56);
  if (o.eyebrow) p.ctext(o.eyebrow, 16, { weight: 700, color: on, ls: 3, gap: 26 });
  p.ctext(o.title, 40, { weight: 800, color: '#fff', gap: 50 });
  if (o.sub) p.ctext(o.sub, 18, { color: on, gap: 44 });
  if (o.chips) p.chips(o.chips, { bg: o.chipBg ?? '#fff2', color: '#fff', size: 15, advanceGap: 44 });
  p.pill(o.button, { cx: true, bg: '#fff', color: o.bg, size: 22, padX: 42, h: 64, advance: true, gap: 56 });
  p.B[bi].h = o.bandH ?? (p.at() - y);
  return p;
}
