/**
 * A+B 하이브리드 카피 작성.
 *  - 코드가 ref.sections 를 N에 맞춰 select → 박스 type/순서를 100% 고정.
 *  - AI 는 그 sections 의 텍스트 필드만 product 에 맞춰 자연스럽게 새로 작성.
 *  - 출력은 sections 와 동일 구조 — 텍스트만 교체된 sections 배열.
 *  - type/순서가 변경되거나 누락되면 plan-copy-into-ref 자체가 거부.
 */
import 'dotenv/config';
import OpenAI from 'openai';
import { COPYWRITING_GUIDE } from './copywriting-guide.ts';
import { DESIGN_RULES } from './design-rules.ts';
import { selectByCount } from './select-cuts.ts';
import { getRef, recommendRef, type RefMeta } from './recommend-ref.ts';
import type { Section, Template2 } from './engine.ts';

export interface PlanCopyResult {
  template: Template2;
  refMeta: RefMeta;
  refSource: 'auto' | 'manual';
  model: string;
}

/** 시안 sections 의 각 슬롯에서 "AI 가 채울 텍스트 필드"만 빈 객체로 추출.
 * 박스 구조(type, 위치, 옵션, image 슬롯 메타)는 코드가 유지. */
function extractCopySlots(sections: Section[]): any[] {
  return sections.map((s: any) => {
    const slot: any = { type: s.type };
    switch (s.type) {
      case 'hero':
        slot.label = ''; slot.script = ''; slot.title = ''; slot.accent = ''; slot.sub = '';
        slot.chips = Array.isArray(s.chips) ? s.chips.map(() => '') : undefined;
        break;
      case 'cards':
        slot.label = ''; slot.head = ''; slot.accent = ''; slot.body = '';
        slot.cards = (s.cards ?? []).map((c: any) => ({ n: c.n ?? '', t: '', d: '' }));
        break;
      case 'feature':
        slot.label = ''; slot.head = ''; slot.accent = ''; slot.body = '';
        slot.points = Array.isArray(s.points) ? s.points.map(() => '') : undefined;
        break;
      case 'iconGrid':
        slot.label = ''; slot.head = ''; slot.sub = ''; slot.cols = s.cols;
        slot.items = (s.items ?? []).map(() => ({ t: '', d: '' }));
        break;
      case 'checkPoint':
        slot.label = ''; slot.title = '';
        slot.items = (s.items ?? []).map(() => '');
        break;
      case 'steps':
        slot.label = ''; slot.head = ''; slot.sub = '';
        slot.steps = (s.steps ?? []).map((st: any) => ({ n: st.n ?? '', t: '', d: '' }));
        break;
      case 'banner':
        slot.label = ''; slot.head = ''; slot.sub = '';
        break;
      case 'stat':
        slot.head = ''; slot.sub = '';
        slot.stats = (s.stats ?? []).map(() => ({ label: '', value: '' }));
        break;
      case 'reviews':
        slot.title = '';
        slot.items = (s.items ?? []).map(() => ({ stars: 5, t: '', d: '', who: '' }));
        break;
      case 'spec':
        slot.label = ''; slot.title = '';
        slot.rows = (s.rows ?? []).map(() => ['', '']);
        break;
      case 'swatches':
        slot.label = ''; slot.head = '';
        slot.items = (s.items ?? []).map((it: any) => ({ name: '', c: it?.c }));
        break;
      case 'compare':
        slot.head = ''; slot.body = ''; slot.left = ''; slot.right = '';
        break;
      case 'image':
        slot.label = ''; slot.caption = '';
        break;
      case 'detail':
        slot.label = ''; slot.head = '';
        slot.items = (s.items ?? []).map((it: any) => ({ label: it?.label ?? '', t: '', d: '' }));
        break;
      case 'cta':
        slot.label = ''; slot.head = ''; slot.sub = '';
        slot.benefits = Array.isArray(s.benefits) ? s.benefits.map(() => '') : undefined;
        break;
      case 'notice':
        slot.title = '';
        slot.items = (s.items ?? []).map(() => '');
        break;
      case 'mediaRow':
        slot.label = ''; slot.head = '';
        slot.items = (s.items ?? []).map(() => ({ t: '', d: '' }));
        break;
      case 'rateTable':
        slot.label = ''; slot.head = '';
        slot.items = (s.items ?? []).map((it: any) => ({ level: '', levelEn: it?.levelEn ?? '', desc: '', highlight: it?.highlight }));
        break;
      case 'tablePair':
        slot.label = ''; slot.head = '';
        slot.left = { title: '', rows: (s.left?.rows ?? []).map(() => ['', '']) };
        slot.right = { title: '', rows: (s.right?.rows ?? []).map(() => ['', '']) };
        break;
      case 'faq':
        slot.label = ''; slot.head = '';
        slot.items = (s.items ?? []).map(() => ({ q: '', a: '' }));
        break;
    }
    return slot;
  });
}

/** AI 출력 sections 를 원본 sections 와 합쳐 최종 Section 배열로 만든다.
 * 구조 옵션(headerBg, heroStyle, bg, image 슬롯, reverse 등) 은 원본 유지.
 * 텍스트는 AI 출력값으로 교체(없으면 원본). */
function mergeCopyIntoSections(original: Section[], aiSlots: any[]): Section[] {
  return original.map((orig: any, idx: number) => {
    const ai = aiSlots[idx] ?? {};
    const out: any = { ...orig };
    // 텍스트 필드만 머지 — type/bg/image/headerBg/reverse 등 구조는 원본
    const textKeys = ['label', 'script', 'title', 'accent', 'sub', 'head', 'body', 'caption'];
    for (const k of textKeys) if (typeof ai[k] === 'string' && ai[k].trim()) out[k] = ai[k];
    if (Array.isArray(ai.chips)) out.chips = ai.chips.filter(Boolean);
    if (Array.isArray(ai.points)) out.points = ai.points.filter(Boolean);
    if (Array.isArray(ai.benefits)) out.benefits = ai.benefits.filter(Boolean);
    // cards
    if (Array.isArray(ai.cards) && Array.isArray(orig.cards)) {
      out.cards = orig.cards.map((c: any, i: number) => ({ ...c, t: ai.cards[i]?.t || c.t, d: ai.cards[i]?.d || c.d }));
    }
    // iconGrid items
    if (orig.type === 'iconGrid' && Array.isArray(ai.items)) {
      out.items = orig.items.map((it: any, i: number) => ({ ...it, t: ai.items[i]?.t || it.t, d: ai.items[i]?.d || it.d }));
    }
    // checkPoint items
    if (orig.type === 'checkPoint' && Array.isArray(ai.items)) {
      out.items = orig.items.map((it: any, i: number) => (typeof ai.items[i] === 'string' && ai.items[i].trim()) ? ai.items[i] : it);
    }
    // steps
    if (orig.type === 'steps' && Array.isArray(ai.steps)) {
      out.steps = orig.steps.map((st: any, i: number) => ({ ...st, t: ai.steps[i]?.t || st.t, d: ai.steps[i]?.d || st.d }));
    }
    // stat
    if (orig.type === 'stat' && Array.isArray(ai.stats)) {
      out.stats = orig.stats.map((st: any, i: number) => ({ label: ai.stats[i]?.label || st.label, value: ai.stats[i]?.value || st.value }));
    }
    // reviews
    if (orig.type === 'reviews' && Array.isArray(ai.items)) {
      out.items = orig.items.map((it: any, i: number) => ({ ...it, t: ai.items[i]?.t || it.t, d: ai.items[i]?.d || it.d, who: ai.items[i]?.who || it.who }));
    }
    // spec
    if (orig.type === 'spec' && Array.isArray(ai.rows)) {
      out.rows = orig.rows.map((r: any[], i: number) => [ai.rows[i]?.[0] || r[0], ai.rows[i]?.[1] || r[1]]);
    }
    // swatches
    if (orig.type === 'swatches' && Array.isArray(ai.items)) {
      out.items = orig.items.map((it: any, i: number) => ({ ...it, name: ai.items[i]?.name || it.name }));
    }
    // compare
    if (orig.type === 'compare') {
      if (typeof ai.left === 'string' && ai.left.trim()) out.left = ai.left;
      if (typeof ai.right === 'string' && ai.right.trim()) out.right = ai.right;
    }
    // detail items
    if (orig.type === 'detail' && Array.isArray(ai.items)) {
      out.items = orig.items.map((it: any, i: number) => ({ ...it, t: ai.items[i]?.t || it.t, d: ai.items[i]?.d || it.d }));
    }
    // notice items
    if (orig.type === 'notice' && Array.isArray(ai.items)) {
      out.items = orig.items.map((it: string, i: number) => (typeof ai.items[i] === 'string' && ai.items[i].trim()) ? ai.items[i] : it);
    }
    // mediaRow items
    if (orig.type === 'mediaRow' && Array.isArray(ai.items)) {
      out.items = orig.items.map((it: any, i: number) => ({ ...it, t: ai.items[i]?.t || it.t, d: ai.items[i]?.d || it.d }));
    }
    // rateTable items
    if (orig.type === 'rateTable' && Array.isArray(ai.items)) {
      out.items = orig.items.map((it: any, i: number) => ({ ...it, level: ai.items[i]?.level || it.level, desc: ai.items[i]?.desc || it.desc }));
    }
    // tablePair
    if (orig.type === 'tablePair') {
      if (ai.left?.title) out.left = { ...orig.left, title: ai.left.title };
      if (ai.right?.title) out.right = { ...orig.right, title: ai.right.title };
      if (Array.isArray(ai.left?.rows) && Array.isArray(orig.left?.rows)) {
        out.left = { ...out.left, rows: orig.left.rows.map((r: any[], i: number) => [ai.left.rows[i]?.[0] || r[0], ai.left.rows[i]?.[1] || r[1]]) };
      }
      if (Array.isArray(ai.right?.rows) && Array.isArray(orig.right?.rows)) {
        out.right = { ...out.right, rows: orig.right.rows.map((r: any[], i: number) => [ai.right.rows[i]?.[0] || r[0], ai.right.rows[i]?.[1] || r[1]]) };
      }
    }
    // faq
    if (orig.type === 'faq' && Array.isArray(ai.items)) {
      out.items = orig.items.map((it: any, i: number) => ({ ...it, q: ai.items[i]?.q || it.q, a: ai.items[i]?.a || it.a }));
    }
    return out as Section;
  });
}

export async function planCopyIntoRef(opts: {
  description: string;
  prompt?: string;
  productName?: string;
  category?: string;
  cutCount: number;
  refId?: string;
  brandColor?: string;
}): Promise<PlanCopyResult> {
  const refMeta = (opts.refId && opts.refId !== 'auto')
    ? getRef(opts.refId)
    : recommendRef({
        category: opts.category,
        keywords: [opts.description, opts.prompt, opts.productName].filter(Boolean).join(' '),
      });
  if (!refMeta) throw new Error(`ref 매칭 실패: ${opts.refId}`);
  const refSource: 'auto' | 'manual' = (opts.refId && opts.refId !== 'auto') ? 'manual' : 'auto';

  // 1) 컷수에 맞춰 시안 sections 추리기 — 박스 구조 확정
  const selected = selectByCount(refMeta.template, opts.cutCount);
  const slots = extractCopySlots(selected.sections);

  // 2) AI 호출 — 텍스트 필드만 채우게
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY 필요');
  const client = new OpenAI({ apiKey: key });
  const model = process.env.OPENAI_SECTIONS_MODEL ?? 'gpt-4o';

  const system = `${DESIGN_RULES}

═══════════════════════════════════════════════════════════════

${COPYWRITING_GUIDE}

═══════════════════════════════════════════════════════════════

# 임무

당신은 주어진 슬롯 배열의 **텍스트 필드를 채우는 작업**만 합니다.
- 슬롯 배열은 시안의 박스 구조 그대로입니다.
- type, 순서, 슬롯 개수, 항목 개수를 **절대 변경하지 않습니다.**
- 각 빈 문자열("")에 새 제품 맥락의 카피를 채웁니다.
- 짧고 강하게(7무기). 슬롯 옆 옵션(n, levelEn, c, label)은 그대로 두세요.

# 출력 형식

\`\`\`json
{ "slots": [ {...같은 구조, 텍스트 채움...}, ... ] }
\`\`\`

순수 JSON 만. 설명·코드펜스 금지. **slots 배열 길이는 입력과 정확히 같아야** 합니다.`;

  const user = `# 제품 자유 설명
${opts.description}

# 사용자 추가 지시
${opts.prompt ?? '(없음)'}

# 제품명: ${opts.productName ?? '(미지정)'}
# 카테고리: ${opts.category ?? '(미지정)'}
# 시안: ${refMeta.id} (${refMeta.description})

# 채울 슬롯 배열 (총 ${slots.length}개 — 정확히 같은 길이로 반환)

\`\`\`json
${JSON.stringify(slots, null, 2)}
\`\`\`

위 슬롯의 빈 텍스트 필드(\"\")만 채우세요. type/순서/항목수 변경 금지.`;

  const res = await client.chat.completions.create({
    model,
    temperature: 0.65,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  });
  const raw = res.choices[0]?.message?.content ?? '{}';
  const parsed = JSON.parse(raw);
  const aiSlots: any[] = Array.isArray(parsed.slots) ? parsed.slots : (Array.isArray(parsed) ? parsed : []);
  if (aiSlots.length !== slots.length) {
    console.warn(`⚠ AI 출력 슬롯 개수 불일치 (${aiSlots.length} vs ${slots.length}). 원본 길이 강제.`);
  }

  // 3) 원본 + AI 카피 머지 — 박스/구조/옵션 100% 보존
  const finalSections = mergeCopyIntoSections(selected.sections, aiSlots);

  // 4) brand color 가 있으면 theme 오버라이드
  let theme = selected.theme;
  if (opts.brandColor) theme = { ...theme, primary: opts.brandColor };

  const finalTpl: Template2 = {
    ...selected, theme, sections: finalSections,
  };

  return { template: finalTpl, refMeta, refSource, model };
}
