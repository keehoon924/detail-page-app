/**
 * 웹 엔진 — "생성 계획(Plan)" → sections.ts 조립 → Template.
 * 계획은 AI(planner.ts) 또는 결정형 폴백이 만든다. 렌더러는 계획을 그대로 충실히 그린다.
 * 계획의 cut 어휘(한정된 섹션 타입)만 받으므로 안정적이고, AI가 컷 수·구성을 정확히 지시할 수 있다.
 */
import { P } from './kit.ts';
import * as S from './sections.ts';
import type { Template } from './specs/types.ts';

/* ── 한정된 cut 어휘 (AI가 이 타입들로만 계획을 출력) ── */
export type CutType =
  | 'hero' | 'sectionTitle' | 'steps' | 'iconGrid' | 'circleGrid'
  | 'featureStack' | 'featureLR' | 'pointCards' | 'promiseBand'
  | 'reviewPills' | 'reviewCards' | 'ratingCard' | 'compareCard'
  | 'checklist' | 'specRows' | 'ctaBand' | 'text';

export interface Cut {
  type: CutType;
  // 공통 카피
  eyebrow?: string; title?: string; sub?: string; body?: string;
  // hero
  heroStyle?: 'emblem' | 'band' | 'bigtype' | 'fullbleed';
  emblem?: string; brand?: string; pill?: string; chips?: string[];
  // 리스트형 (steps/iconGrid/circleGrid/pointCards/promiseBand/reviewPills/checklist)
  items?: any[];      // steps:[{num,title,desc}] / iconGrid:[{title,sub}] / circleGrid:[name] / pointCards:[{label,title,desc}] / promiseBand·reviewPills·checklist:[text]
  cols?: number;
  // featureLR
  side?: 'left' | 'right';
  // reviewCards
  reviews?: { meta: string; text: string }[];
  // ratingCard
  score?: string; reviewsLine?: string; satisfaction?: string;
  // compareCard
  left?: { title: string; lines: string }; right?: { title: string; lines: string };
  // specRows
  rows?: [string, string][];
  // ctaBand
  button?: string;
  // 이미지 슬롯 수 힌트(이 컷이 사진 몇 장 쓰는지). 미지정 시 타입별 기본.
  imageCount?: number;
  bandColor?: string;
}

export interface Palette { bg: string; ink: string; sub: string; accent: string; accent2: string; band: string; on: string; card: string; }

export interface Plan { palette?: Partial<Palette>; cuts: Cut[]; }

/* ── 카테고리별 기본 팔레트 (16종에서 추출) ── */
const PALETTES: Record<string, Palette> = {
  식품: { bg: '#f7eee2', ink: '#3a2a1f', sub: '#8a7867', accent: '#c43a2f', accent2: '#b07a3e', band: '#c43a2f', on: '#f7e6d3', card: '#ffffff' },
  전자기기: { bg: '#f3f1ee', ink: '#28303a', sub: '#8a9099', accent: '#2f6fd0', accent2: '#1f2d52', band: '#1f2d52', on: '#dbe8f5', card: '#ffffff' },
  패션: { bg: '#f1ece3', ink: '#3a352c', sub: '#8a8270', accent: '#6f7b52', accent2: '#a89878', band: '#3a352c', on: '#efe7d6', card: '#ffffff' },
  유아: { bg: '#f6efe6', ink: '#2f261f', sub: '#8a7e70', accent: '#8a5a36', accent2: '#e2542a', band: '#8a5a36', on: '#f0e2d2', card: '#ffffff' },
  반려동물: { bg: '#e9e6e1', ink: '#2d2d2d', sub: '#8a8a8a', accent: '#7fb4cb', accent2: '#3a6b80', band: '#3a6b80', on: '#dfe7ea', card: '#f3f1ee' },
  기타: { bg: '#f4f2ee', ink: '#2b2b2b', sub: '#888888', accent: '#2563eb', accent2: '#1e3a8a', band: '#1e293b', on: '#dbeafe', card: '#ffffff' },
};

export function palette(category?: string, brandColor?: string): Palette {
  const base = PALETTES[category ?? '기타'] ?? PALETTES['기타'];
  if (brandColor) return { ...base, accent: brandColor, band: brandColor };
  return { ...base };
}

/** 배경색 밝기에 따라 읽히는 글자색(흰/어두움) 반환 */
function readable(hex: string, dark = '#2b2b2b'): string {
  const h = hex.replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(f, 16);
  const lum = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum > 150 ? dark : '#ffffff';
}

/* ── 이미지 커서: 업로드 이미지를 순서대로 슬롯에 배치 ── */
class Imgs {
  i = 0;
  constructor(public list: string[]) {}
  next(): string | undefined { return this.i < this.list.length ? this.list[this.i++] : undefined; }
  take(n: number): string[] { const out: string[] = []; for (let k = 0; k < n; k++) { const s = this.next(); if (s) out.push(s); } return out; }
}

/* ── 컷 하나 렌더 ── */
function renderCut(p: P, cut: Cut, pal: Palette, imgs: Imgs) {
  const T = cut.type;
  if (T === 'hero') {
    const style = cut.heroStyle ?? 'band';
    if (style === 'emblem') S.heroEmblem(p, { emblem: cut.emblem, script: cut.eyebrow, title: cut.title ?? '', sub: cut.sub, chips: cut.chips, photoLabel: '메인 비주얼', photoSrc: imgs.next(), ink: pal.ink, accent: pal.accent, sub2: pal.accent2, emblemBg: pal.accent2, chipBg: pal.card, chipStroke: pal.on });
    else if (style === 'bigtype') S.heroBigType(p, { brand: cut.brand ?? cut.title ?? '', brandSub: cut.eyebrow, title: cut.sub ?? cut.title ?? '', divider: true, body: cut.body, photoLabel: '제품 히어로', photoSrc: imgs.next(), ink: pal.ink, sub: pal.sub });
    else if (style === 'fullbleed') { const src = imgs.next(); if (src) S.heroFullbleed(p, { src, eyebrow: cut.eyebrow, title: cut.title ?? '', sub: cut.sub }); else { const bg = cut.bandColor ?? pal.band; S.heroBand(p, { bg, eyebrow: cut.eyebrow, title: cut.title ?? '', titleColor: readable(bg), sub: cut.sub, subColor: readable(bg, pal.sub), photoLabel: '메인 비주얼', pill: cut.pill, pillBg: readable(bg) === '#ffffff' ? '#ffffff' : pal.accent, eyebrowColor: readable(bg, pal.sub) }); } }
    else { const bg = cut.bandColor ?? pal.band; const fg = readable(bg); S.heroBand(p, { bg, eyebrow: cut.eyebrow, title: cut.title ?? '', titleColor: fg, sub: cut.sub, subColor: readable(bg, pal.sub), photoLabel: '메인 비주얼', photoSrc: imgs.next(), pill: cut.pill, pillBg: fg === '#ffffff' ? '#ffffff' : pal.accent, body: cut.body, bodyColor: fg, eyebrowColor: readable(bg, pal.sub) }); }
    p.gap(60);
    return;
  }
  if (T === 'sectionTitle') { S.sectionLabel(p, cut.eyebrow ?? '', cut.title ?? '', { eyebrowColor: pal.accent2, titleColor: pal.ink }); return; }
  if (T === 'text') { if (cut.title) p.ctext(cut.title, 28, { weight: 800, color: pal.ink, gap: 30 }); if (cut.body) p.ctext(cut.body, 17, { color: pal.sub, align: 'center', lineH: 1.7, gap: 50 }); return; }
  if (T === 'steps') {
    if (cut.eyebrow || cut.title) S.sectionLabel(p, cut.eyebrow ?? '', cut.title ?? '', { eyebrowColor: pal.accent2, titleColor: pal.ink });
    const items = (cut.items ?? []).map((it: any, i: number) => [it.num ?? String(i + 1).padStart(2, '0'), it.title ?? '', it.desc ?? ''] as [string, string, string]);
    S.stepsRow(p, items, { accent: pal.accent, ink: pal.ink, sub: pal.sub }); p.gap(50); return;
  }
  if (T === 'iconGrid') {
    if (cut.eyebrow || cut.title) S.sectionLabel(p, cut.eyebrow ?? '', cut.title ?? '', { eyebrowColor: pal.accent2, titleColor: pal.ink });
    const items = (cut.items ?? []).map((it: any) => [it.title ?? it, it.sub] as [string, string?]);
    S.iconGrid(p, items, cut.cols ?? 3, { iconBg: 'square', d: 96, capColor: pal.ink, subColor: pal.sub, srcs: imgs.take(items.length) }); p.gap(40); return;
  }
  if (T === 'circleGrid') {
    if (cut.eyebrow || cut.title) S.sectionLabel(p, cut.eyebrow ?? '', cut.title ?? '', { eyebrowColor: pal.accent2, titleColor: pal.ink });
    const items = (cut.items ?? []).map((it: any) => (typeof it === 'string' ? it : it.title ?? ''));
    S.circleCaptionGrid(p, items, cut.cols ?? 4, { ink: pal.ink, srcs: imgs.take(items.length) }); p.gap(40); return;
  }
  if (T === 'featureStack') { S.featureStack(p, { eyebrow: cut.eyebrow, title: cut.title ?? '', pill: cut.pill, pillBg: pal.accent2, body: cut.body, photoLabel: '특징 이미지', photoSrc: imgs.next(), ink: pal.ink, sub: pal.sub }); return; }
  if (T === 'featureLR') { S.featureLR(p, { title: cut.title ?? '', body: cut.body ?? '', side: cut.side ?? 'left', photoLabel: '', photoSrc: imgs.next(), ink: pal.ink, sub: pal.sub }); return; }
  if (T === 'pointCards') {
    if (cut.eyebrow || cut.title) S.sectionLabel(p, cut.eyebrow ?? '', cut.title ?? '', { eyebrowColor: pal.accent2, titleColor: pal.ink });
    const items = (cut.items ?? []).map((it: any, i: number) => [it.label ?? `POINT ${i + 1}`, it.title ?? '', it.desc ?? ''] as [string, string, string]);
    S.pointCards(p, items, { cols: cut.cols ?? 2, ink: pal.ink, sub: pal.sub, accent: pal.accent, cardBg: pal.card }); p.gap(20); return;
  }
  if (T === 'promiseBand') { S.promiseBand(p, { bg: cut.bandColor ?? pal.band, eyebrow: cut.eyebrow, pill: cut.pill ?? cut.title ?? 'CHECK POINT', items: (cut.items ?? []).map(String), on: pal.on }); return; }
  if (T === 'reviewPills') { if (cut.title) S.sectionLabel(p, cut.eyebrow ?? '', cut.title, { eyebrowColor: pal.accent2, titleColor: pal.ink }); S.reviewPills(p, (cut.items ?? []).map(String), { bg: pal.accent }); p.gap(20); return; }
  if (T === 'reviewCards') { if (cut.title) S.sectionLabel(p, cut.eyebrow ?? '', cut.title, { eyebrowColor: pal.accent2, titleColor: pal.ink }); S.reviewCards(p, (cut.reviews ?? []).map((r) => [r.meta, r.text] as [string, string]), { highlight: pal.on, star: pal.accent, ink: pal.ink, cardBg: pal.card }); p.gap(20); return; }
  if (T === 'ratingCard') { S.ratingCard(p, { brand: cut.brand, score: cut.score ?? '4.9 / 5', reviews: cut.reviewsLine, satisfaction: cut.satisfaction, accent: pal.accent, ink: pal.ink, star: pal.accent, cardBg: pal.card }); return; }
  if (T === 'compareCard') { if (cut.title) S.sectionLabel(p, cut.eyebrow ?? '', cut.title, { eyebrowColor: pal.accent2, titleColor: pal.ink }); S.compareCard(p, { left: cut.left ?? { title: '일반', lines: '' }, right: cut.right ?? { title: '우리 제품', lines: '' }, ink: pal.ink, subColor: pal.sub, accent: pal.accent, cardBg: pal.card }); return; }
  if (T === 'checklist') { if (cut.title) S.sectionLabel(p, cut.eyebrow ?? '', cut.title, { eyebrowColor: pal.accent2, titleColor: pal.ink }); S.checklist(p, (cut.items ?? []).map(String), { check: pal.accent, ink: pal.ink, rowBg: pal.card }); p.gap(20); return; }
  if (T === 'specRows') { if (cut.title) S.sectionLabel(p, cut.eyebrow ?? '', cut.title, { eyebrowColor: pal.accent2, titleColor: pal.ink, titleSize: 28 }); S.specRows(p, cut.rows ?? [], { ink: pal.ink, sub: pal.sub }); return; }
  if (T === 'ctaBand') { S.ctaBand(p, { bg: cut.bandColor ?? pal.band, eyebrow: cut.eyebrow, title: cut.title ?? '', sub: cut.sub, chips: cut.chips, chipBg: pal.accent2, button: cut.button ?? '지금 구매하기', on: pal.on }); return; }
}

/* ── 계획 → Template ── */
export function assemble(plan: Plan, opts: { id?: string; category?: string; brandColor?: string; images?: string[] } = {}): Template {
  const pal: Palette = { ...palette(opts.category, opts.brandColor), ...(plan.palette ?? {}) };
  const p = new P(860, 64);
  const imgs = new Imgs(opts.images ?? []);
  p.gap(8);
  (plan.cuts ?? []).forEach((cut) => renderCut(p, cut, pal, imgs));
  return p.done(opts.id ?? 'web', opts.category ?? '생성', pal.bg);
}

/* ── 결정형 폴백 플래너 (AI 미사용 시) — 자유텍스트에서 대략 추출, cutCount 맞춤 ── */
export function fallbackPlan(input: { description?: string; prompt?: string; cutCount?: number; productName?: string }): Plan {
  const desc = (input.description ?? '').trim();
  const lines = desc.split(/[\n.·]/).map((s) => s.trim()).filter((s) => s.length > 2);
  const title = (input.productName ?? lines[0] ?? '제품명').slice(0, 30);
  const sub = lines.find((l) => l !== title)?.slice(0, 40) ?? '';
  // 프롬프트에서 컷 수 추출 (예: "3컷")
  const m = (input.prompt ?? '').match(/(\d+)\s*컷/);
  const n = Math.max(1, Math.min(15, m ? Number(m[1]) : (input.cutCount ?? 5)));

  const cuts: Cut[] = [{ type: 'hero', heroStyle: 'band', eyebrow: sub, title, pill: lines[2]?.slice(0, 30) }];
  const featureLines = lines.slice(1, 1 + Math.max(0, n - 2));
  featureLines.forEach((l, i) => cuts.push({ type: 'featureStack', eyebrow: `POINT ${i + 1}`, title: l.slice(0, 40), body: lines[i + 2]?.slice(0, 80) }));
  while (cuts.length < n) cuts.push({ type: 'featureStack', title: `특징 ${cuts.length}`, body: '' });
  if (cuts.length >= n && n >= 2) cuts.length = n; // 정확히 n컷
  return { cuts };
}
