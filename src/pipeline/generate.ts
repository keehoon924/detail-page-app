/**
 * 자동 생성 파이프라인 — FormInput → 고정 순서 13컷 v2 RenderSpec.
 *
 * 1) LLM(OpenAI) 또는 Mock 이 컷별 카피+레이아웃+색을 설계
 * 2) 코드가 부드러운 배경 틴트 흐름·divider·이미지·outFile 조립
 * 3) QA 자가검증(금지어·필수문구·연속 레이아웃) → 위반 시 1회 LLM 보정 + 결정적 보강
 */
import { readFile } from 'node:fs/promises';
import { genJSON } from './llm.ts';
import { iconNameFor } from '../lib/icons.ts';
import {
  FormInputSchema, RenderSpecSchema, CutSpecSchema,
  type FormInput, type RenderSpec, type CutSpec,
} from '../core/schemas.ts';

const BANNED = ['획기적', '혁신적', '최고', '완벽', '최상'];
const IMG_LAYOUTS = ['hero', 'feature-split'];

type Style = {
  id: string; label: string; category: string;
  palette: { base: string; accent: string };
  mood: string; copyTone: string; summary: string;
};

/** 레퍼런스 학습 스타일 템플릿 로드 (styleId). */
async function loadStyle(styleId?: string): Promise<Style | undefined> {
  if (!styleId) return undefined;
  try {
    const tpl = JSON.parse(await readFile('src/styles/templates.json', 'utf8'));
    return tpl.styles?.[styleId];
  } catch {
    return undefined;
  }
}

const SYSTEM = `너는 한국형 상세페이지(세로)를 설계하는 20년차 마케터+UI디자이너다. 입력 제품 정보로 컷별 카피·레이아웃·색을 JSON으로 설계한다.

[카피 규칙]
- 모든 문장은 존댓말. 반말 금지.
- 후킹(1번 컷) 헤드라인은 8공식 중 가장 효과적인 것 사용: 공포/손실·결과선제시·상식파괴·숫자임팩트·직접질문·선언·대비·고객인용. 첫 문장에 제품명을 넣지 말 것(헤드라인=고객 감정/상황, 부제=제품).
- 금지어 절대 사용 금지: 획기적, 혁신적, 최고, 완벽, 최상.
- 기능 나열 금지 → 혜택으로 번역. 숫자가 있으면 구체적으로(예: "847명", "12초", "99.95%").
- 불릿은 명사+동사로 짧게.

[레이아웃 규칙]
- layout 은 다음 중에서만: hero, feature-split, columns, comparison, review, faq, steps, centered, gif, cta.
- 섹션 순서(고정): 히어로 → 문제공감 → 해결제시 → 기능3개(columns) → 사용장면 → 리뷰 → 비교 → 스펙 → 사용법 → 인증 → FAQ → CTA.
- 연속 3컷이 같은 layout 이면 안 된다.
- 리뷰는 review, 자주 묻는 질문은 faq, 경쟁비교는 comparison, 기능요약/스펙은 columns, 사용법은 steps, 마지막은 cta.

[색/폰트 규칙]
- 각 컷에 bg(hex)와 accent(hex)를 지정.
- 배경은 브랜드/메인 컬러의 **밝은 틴트** 위주로, **인접 컷 간 색 차이를 작게**(갑자기 튀는 색 금지) — 하나의 브랜드 페이지처럼 통일감 있게.
- 강한 풀컬러 배경은 CTA 등 1~2컷만. 밝은 bg면 어두운 글자, 어두운 bg면 밝은 글자.

[사용자 지시]
- userPrompt(생성 지시)를 최우선 반영. mustIncludePhrases(필수 문구)는 반드시 어딘가에 그대로 포함. freeDescription 반영.

[출력 JSON] { "tone":"...", "font":"Pretendard", "cuts":[ { "id","layout","bg","accent","badge?":{"text","kind"},"handwrite?","headline?","subcopy?","body?","bullets?":[],"stat?":[{"value","label"}],"columns?":[{"emoji","title","caption"}],"reviews?":[{"rating","text","user"}],"faqs?":[{"q","a"}],"comparison?":{"headers":[],"highlightCol","rows":[{"label","cells":[]}]},"steps?":[{"n","title","caption"}],"useImage?":true } ] }
컷마다 필요한 필드만. 위 고정 순서를 따른다. JSON 외 텍스트 금지.`;

function userPromptFor(form: FormInput, style?: Style): string {
  const price = form.priceSale
    ? `정가 ${form.priceRegular}원 → 할인가 ${form.priceSale}원`
    : `${form.priceRegular}원`;
  const lines = [
    `제품명: ${form.productName}`,
    `카테고리: ${form.category}`,
    `가격: ${price}`,
    `한 줄 소개: ${form.oneLiner}`,
    `핵심 특징 3가지: ${form.features3.join(' / ')}`,
  ];
  if (form.freeDescription) lines.push(`[자유 설명] ${form.freeDescription}`);
  if (form.mustIncludePhrases.length) lines.push(`[필수 포함 문구] ${form.mustIncludePhrases.join(', ')}`);
  if (form.userPrompt) lines.push(`[사용자 지시] ${form.userPrompt}`);
  if (form.target) lines.push(`타겟 고객: ${form.target}`);
  if (form.brandTone) lines.push(`브랜드 톤: ${form.brandTone}`);
  if (form.brandColor) lines.push(`브랜드 컬러: ${form.brandColor}`);
  if (form.specs) lines.push(`상세 스펙: ${form.specs}`);
  if (form.shipping) lines.push(`배송/교환/AS: ${form.shipping}`);
  if (form.reviews) lines.push(`리뷰: 평점 ${form.reviews.rating ?? '-'} / ${form.reviews.count ?? '-'}건 / 대표문구: ${(form.reviews.quotes ?? []).join(' | ')}`);
  if (form.certifications) lines.push(`인증/수상: ${form.certifications}`);
  if (form.promotion) lines.push(`프로모션: ${form.promotion}`);
  if (form.platform) lines.push(`출력 플랫폼: ${form.platform}`);
  if (style) lines.push(`[적용 스타일] ${style.label} — ${style.summary}. 무드: ${style.mood}. 카피 톤: ${style.copyTone}. 이 스타일의 감각으로 전체를 하나로 통일(한 페이지=하나의 스타일, 절대 섞지 말 것).`);
  return lines.join('\n');
}

function allText(cut: any): string {
  const parts: string[] = [];
  const push = (v: any) => { if (typeof v === 'string') parts.push(v); };
  push(cut.headline); push(cut.subcopy); push(cut.body); push(cut.handwrite);
  push(cut.badge?.text); push(cut.gifLabel);
  (cut.bullets ?? []).forEach(push);
  (cut.stat ?? []).forEach((s: any) => { push(s.value); push(s.label); });
  (cut.columns ?? []).forEach((c: any) => { push(c.title); push(c.caption); });
  (cut.reviews ?? []).forEach((r: any) => push(r.text));
  (cut.faqs ?? []).forEach((f: any) => { push(f.q); push(f.a); });
  (cut.steps ?? []).forEach((s: any) => { push(s.title); push(s.caption); });
  if (cut.comparison) {
    (cut.comparison.headers ?? []).forEach(push);
    (cut.comparison.rows ?? []).forEach((row: any) => { push(row.label); (row.cells ?? []).forEach(push); });
  }
  return parts.join(' \n ');
}

function qaCheck(cuts: any[], must: string[]): string[] {
  const v: string[] = [];
  const full = cuts.map(allText).join(' \n ');
  for (const w of BANNED) if (full.includes(w)) v.push(`금지어 사용: "${w}"`);
  for (const p of must) if (p && !full.includes(p)) v.push(`필수 문구 누락: "${p}"`);
  for (let i = 0; i + 2 < cuts.length; i++) {
    if (cuts[i].layout === cuts[i + 1].layout && cuts[i].layout === cuts[i + 2].layout)
      v.push(`연속 3컷 동일 레이아웃: ${cuts[i].layout} (${i + 1}~${i + 3})`);
  }
  return v;
}

/* LLM/Mock plan → 완전한 CutSpec[] (next/divider/이미지/outFile 조립) */
function assemble(form: FormInput, plan: any): CutSpec[] {
  const cuts: any[] = Array.isArray(plan.cuts) ? [...plan.cuts] : [];
  const productImgs = [form.mainImage, ...form.subImages].filter(Boolean);
  const peopleImgs = (form.peopleImages ?? []).filter(Boolean); // 업로드 사람 사진(우선)

  // 실제 LLM 모드: usePeople 플래그가 없으면 마지막 feature-split 컷을 사람(사용장면) 컷으로 지정
  if (peopleImgs.length && !cuts.some((c) => c.usePeople)) {
    const fsIdx = cuts.map((c, i) => (c.layout === 'feature-split' ? i : -1)).filter((i) => i >= 0);
    if (fsIdx.length) cuts[fsIdx[fsIdx.length - 1]].usePeople = true;
  }

  // 제품 이미지를 쓰는 컷 수(사람 컷 제외) → 남는 제품/사람 사진은 갤러리로
  const productCutCount = cuts.filter((c) => c.useImage !== false && IMG_LAYOUTS.includes(c.layout) && !c.usePeople).length;
  const peopleCutCount = cuts.filter((c) => c.usePeople).length;
  const leftover = [...productImgs.slice(productCutCount), ...peopleImgs.slice(peopleCutCount)];
  if (leftover.length) {
    const at = Math.min(5, cuts.length);
    const prev = cuts[at - 1] ?? cuts[0] ?? {};
    cuts.splice(at, 0, {
      id: 's-gallery', layout: 'columns', bg: prev.bg, accent: prev.accent,
      badge: { text: 'GALLERY', kind: 'pill' }, headline: '제품 디테일',
      columns: leftover.map((p) => ({ image: p, title: '' })),
    });
  }

  let pi = 0; // 제품 사진 인덱스
  let ppl = 0; // 사람 사진 인덱스
  return cuts.map((c, i) => {
    const next = cuts[i + 1]?.bg;
    const divider = i === cuts.length - 1 ? 'none' : i % 2 === 0 ? 'wave' : 'diagonal';
    const out: any = {
      ...c,
      id: c.id ?? `s${String(i + 1).padStart(2, '0')}`,
      next,
      divider,
      outFile: `output/${String(i + 1).padStart(2, '0')}.png`,
    };
    if (c.usePeople) {
      // 사용장면: 업로드 사람 사진 우선(없으면 이미지 없이 텍스트 컷)
      if (ppl < peopleImgs.length) out.image = peopleImgs[ppl++];
    } else if (c.useImage !== false && IMG_LAYOUTS.includes(c.layout) && pi < productImgs.length) {
      out.image = productImgs[pi++];
    }
    // #7 이미지 없는 컬럼에 특징 텍스트 기반 Lucide 아이콘 자동 매칭
    if (out.layout === 'columns' && Array.isArray(out.columns)) {
      out.columns = out.columns.map((col: any) =>
        !col.image && !col.icon && (col.caption || col.title)
          ? { ...col, icon: iconNameFor(col.caption || col.title) }
          : col);
    }
    delete out.useImage;
    delete out.usePeople;
    delete out.role;
    return out;
  });
}

function forceMustInclude(cuts: any[], must: string[]) {
  const full = cuts.map(allText).join(' \n ');
  const missing = must.filter((p) => p && !full.includes(p));
  if (!missing.length) return;
  const target = cuts.find((c) => Array.isArray(c.bullets)) ?? cuts.find((c) => c.layout === 'centered') ?? cuts[1] ?? cuts[0];
  target.bullets = [...(target.bullets ?? []), ...missing];
}

/* ───────── Mock 모드 (무료·OpenAI 미사용) ───────── */
// 색 강도(0~1, 높을수록 컬러가 진하게). 통일감 유지하며 카테고리 차별화.
const CAT_INTENSITY: Record<string, number> = {
  '식품': 0.8, '뷰티': 0.5, '전자기기': 0.42, '반려동물&유아': 0.42, '패션': 0.4, '프리미엄': 0.2,
};
const ID_INTENSITY: Record<string, number> = {
  'food-spicy': 0.9, 'food-tteok': 0.78, 'food-dumpling': 0.72, 'food-granola': 0.78,
  'elec-airfryer': 0.6, 'elec-rice': 0.32, 'elec-2': 0.36, 'elec-fan': 0.4,
  'pet-neckring': 0.3, 'premium-a': 0.2, 'beauty-c': 0.58, 'fashion-2': 0.34,
};

/** hex 를 흰색 쪽으로 ratio(0~1)만큼 섞는다(1=흰색). 밝은 틴트 생성용. */
function mix(hex: string, ratio: number): string {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const ch = [0, 2, 4].map((o) => parseInt(n.slice(o, o + 2), 16));
  const to2 = (v: number) => Math.round(v + (255 - v) * ratio).toString(16).padStart(2, '0');
  return `#${to2(ch[0])}${to2(ch[1])}${to2(ch[2])}`;
}

/** LLM 없이 입력값만으로 고정 순서 12컷 생성 (테스트용·무료). */
function mockPlan(form: FormInput, style?: Style) {
  const base = style?.palette?.base || form.brandColor || '#2563EB';
  const accentColor = style?.palette?.accent || form.brandColor || '#2563EB';
  const f = form.features3;
  const specItems = (form.specs ?? '').split('/').map((s) => s.trim()).filter(Boolean).map((s) => ({ title: s, caption: '' }));
  const quotes = form.reviews?.quotes ?? [];
  const masks = ['kim2***', '@drive***', 'hye0***', 'lee9***', 'park***'];
  const reviews = (quotes.length ? quotes : ['실제 써보니 만족스럽습니다.', '재구매 의사 있습니다.'])
    .slice(0, 4).map((t, i) => ({ rating: i % 3 === 2 ? 4 : 5, text: t, user: masks[i % masks.length] }));
  const brandName = form.productName.split(' ')[0];

  // 고정 섹션 순서: 히어로→문제공감→해결제시→기능3개→사용장면→리뷰→비교→스펙→사용법→인증→FAQ→CTA
  const cuts: any[] = [
    { id: 's01-hero', layout: 'hero', handwrite: form.category, headline: form.oneLiner, subcopy: form.productName, useImage: true, badge: form.promotion ? { text: 'BEST', kind: 'pill' } : undefined },
    { id: 's02-problem', layout: 'feature-split', badge: { text: '이런 고민', kind: 'pill' }, headline: '혹시 이런 점\n불편하지 않으셨나요?', body: form.freeDescription || '매일 겪는 작은 불편, 그냥 참고 계셨다면.', bullets: f.map((x) => x.split(/[,·]/)[0].slice(0, 18)), useImage: true },
    { id: 's03-solution', layout: 'centered', headline: `그래서, ${brandName}입니다`, subcopy: form.oneLiner },
    { id: 's04-features', layout: 'columns', badge: { text: 'FEATURES', kind: 'pill' }, headline: '핵심 기능 3가지', columns: f.map((x, i) => ({ emoji: ['🌀', '🔋', '🔇'][i] ?? '✅', title: `특징 ${i + 1}`, caption: x })) },
    { id: 's05-usage', layout: 'feature-split', badge: { text: 'USAGE', kind: 'pill' }, headline: '일상에서, 이렇게', body: '실제 사용 장면을 그대로 담았습니다.', useImage: true, imageRight: true, usePeople: true },
    { id: 's06-review', layout: 'review', badge: { text: 'REVIEW', kind: 'pill' }, headline: '고객 리뷰', reviews },
    { id: 's07-compare', layout: 'comparison', headline: `일반 제품 vs ${brandName}`, comparison: { headers: ['', '일반 제품', brandName], highlightCol: 2, rows: [{ label: '품질', cells: ['보통', '우수'] }, { label: '핵심', cells: ['일반', (f[0] ?? '차별화').slice(0, 12)] }, { label: '만족도', cells: [false, true] }] } },
    { id: 's08-spec', layout: specItems.length ? 'columns' : 'centered', badge: { text: 'SPEC', kind: 'pill' }, headline: '한눈에 보는 스펙', columns: specItems.length ? specItems.slice(0, 6) : undefined, subcopy: specItems.length ? undefined : form.specs },
    { id: 's09-steps', layout: 'steps', headline: '사용법', subcopy: '복잡한 설치 없이', steps: [{ n: 1, title: '준비', caption: '간단 세팅' }, { n: 2, title: '사용', caption: '바로 시작' }, { n: 3, title: '완료', caption: '끝!' }] },
    { id: 's10-cert', layout: 'centered', badge: form.certifications ? { text: '인증', kind: 'check' } : undefined, headline: form.certifications ? '믿을 수 있는 인증' : '믿을 수 있는 품질', subcopy: form.certifications ?? '품질로 증명합니다.' },
    { id: 's11-faq', layout: 'faq', headline: '자주 묻는 질문', faqs: [{ q: '배송은 어떻게 되나요?', a: form.shipping ?? '주문 후 빠르게 발송됩니다.' }, { q: '교환/반품 가능한가요?', a: '수령 후 7일 이내 가능합니다.' }] },
    { id: 's12-cta', layout: 'cta', handwrite: '특별 혜택', headline: '지금 만나보세요', subcopy: form.promotion ?? form.productName },
  ];

  // 부드러운 배경 틴트 흐름 (브랜드색의 밝은 틴트, 인접 차이 작게). CTA만 풀컬러.
  // 색 강도 적용: 부드러운 틴트 흐름 유지 + 카테고리별 컬러 존재감 차등.
  const intensity = style ? (ID_INTENSITY[style.id] ?? CAT_INTENSITY[style.category] ?? 0.45) : 0.4;
  const k = 0.6 + intensity * 3.0;
  const baseTints = [0.95, 0.89, 0.95, 0.86, 0.95, 0.9, 0.96, 0.88, 0.95, 0.91, 0.96];
  cuts.forEach((c, i) => {
    if (c.layout === 'cta') { c.bg = accentColor; c.accent = '#FFFFFF'; return; }
    const colorAmt = (1 - (baseTints[i] ?? 0.95)) * k;
    const ratio = Math.min(0.97, Math.max(0.6, 1 - colorAmt));
    c.bg = mix(base, ratio);
    c.accent = accentColor;
  });
  return { tone: style ? `${style.label} 스타일` : '데모(mock) 톤', font: 'Pretendard', cuts };
}

export async function generate(form: FormInput): Promise<{ spec: RenderSpec; qa: string[] }> {
  const isMock = process.env.MOCK_LLM === '1';
  const style = await loadStyle(form.styleId);
  let plan = isMock ? mockPlan(form, style) : await genJSON(SYSTEM, userPromptFor(form, style));
  let cuts = assemble(form, plan);
  let qa = qaCheck(cuts, form.mustIncludePhrases);

  if (!isMock && qa.length) {
    const repairUser = `${userPromptFor(form)}\n\n[이전 결과 JSON]\n${JSON.stringify(plan)}\n\n[고쳐야 할 위반]\n- ${qa.join('\n- ')}\n\n위반을 모두 해결해 같은 형식의 JSON 으로 다시 출력하라.`;
    try {
      plan = await genJSON(SYSTEM, repairUser);
      cuts = assemble(form, plan);
      qa = qaCheck(cuts, form.mustIncludePhrases);
    } catch { /* 보정 실패 시 원본 유지 */ }
  }
  forceMustInclude(cuts, form.mustIncludePhrases);
  qa = qaCheck(cuts, form.mustIncludePhrases);

  const spec = RenderSpecSchema.parse({ canvasWidth: 860, font: plan.font ?? 'Pretendard', logo: form.brandLogo, sections: cuts });
  return { spec, qa };
}

/** 단일 컷 재생성 — 구조는 유지, 카피만 새 버전. */
export async function regenerateCut(form: FormInput, cut: CutSpec): Promise<CutSpec> {
  if (process.env.MOCK_LLM === '1') return cut; // mock: 비용 없이 재렌더만
  const user = `${userPromptFor(form)}\n\n[다시 만들 컷] layout='${cut.layout}' 역할 유지, 표현만 새롭게.\n${JSON.stringify(cut)}\n\n이 컷 하나만 새 버전으로. 단일 cut 객체 JSON 으로 출력하되 layout/bg/accent/outFile/id 는 그대로 두고 카피만 새롭게.`;
  const fresh = await genJSON(SYSTEM, user);
  const c = fresh?.cut ?? (Array.isArray(fresh?.cuts) ? fresh.cuts[0] : fresh);
  const merged = {
    ...cut, ...c,
    id: cut.id, layout: cut.layout, bg: cut.bg, next: cut.next,
    divider: cut.divider, accent: cut.accent, image: cut.image, outFile: cut.outFile,
  };
  return CutSpecSchema.parse(merged);
}

export { FormInputSchema };
