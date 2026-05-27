/**
 * AI 플래너 — 자유 설명 + 사용자 프롬프트를 읽고 "생성 계획(Plan)"을 JSON으로 출력.
 * 사용자의 지시를 정확히 따른다: "3컷만" → 정확히 3컷, 시키지 않은 섹션은 추가하지 않음.
 * 키 없거나 실패 시 web-engine의 결정형 폴백 사용.
 */
import OpenAI from 'openai';
import { z } from 'zod';
import type { Plan } from './web-engine.ts';
import { fallbackPlan } from './web-engine.ts';

const CutZ = z.object({
  type: z.enum(['hero', 'sectionTitle', 'steps', 'iconGrid', 'circleGrid', 'featureStack', 'featureLR', 'pointCards', 'promiseBand', 'reviewPills', 'reviewCards', 'ratingCard', 'compareCard', 'checklist', 'specRows', 'ctaBand', 'text']),
}).passthrough();
const PlanZ = z.object({ palette: z.record(z.string()).optional(), cuts: z.array(CutZ).min(1) });

const SYSTEM = `당신은 한국형 세로 상세페이지(상세페이지)의 레이아웃 기획자입니다.
입력(제품 자유 설명 + 사용자 지시)을 읽고, 페이지를 구성할 "컷(cut)" 목록을 JSON으로만 출력합니다.

# 절대 규칙
- 사용자 지시를 **정확히** 따른다. "3컷만 만들어줘", "메인 KV와 아래 섹션 3개까지만" 같은 지시가 있으면 **정확히 그 수/구성**으로만 만든다.
- 시키지 않은 섹션(리뷰·CTA·스펙 등)을 **억지로 추가하지 않는다.**
- 지시에 컷 수가 없으면 cutCount 입력값을 따른다.
- 모든 카피(글자)는 **한국어**로, 자유 설명의 사실에 근거해 작성. 없는 사실(가격·수치·후기)을 지어내지 않는다.
- 첫 컷은 보통 hero(메인 KV)다(사용자가 다르게 지시하지 않는 한).

# 사용 가능한 컷 타입과 필드 (이 외 타입 금지)
- hero: { heroStyle:"emblem"|"band"|"bigtype"|"fullbleed", eyebrow?, title, sub?, brand?, pill?, chips?:[string] }  // 메인 KV
- sectionTitle: { eyebrow?, title }
- text: { title?, body }
- steps: { eyebrow?, title?, items:[{num?,title,desc}] }            // 번호 단계
- iconGrid: { eyebrow?, title?, cols?, items:[{title,sub?}] }        // 아이콘 격자
- circleGrid: { eyebrow?, title?, cols?, items:[string] }            // 원형+캡션 격자
- featureStack: { eyebrow?, title, pill?, body? }                    // 사진+제목+설명(세로)
- featureLR: { title, body, side?:"left"|"right" }                   // 좌우 2단(사진/글)
- pointCards: { eyebrow?, title?, cols?, items:[{label,title,desc}] }
- promiseBand: { eyebrow?, pill, items:[string] }                    // 컬러밴드+번호리스트
- reviewPills: { eyebrow?, title?, items:[string] }                  // 후기 알약
- reviewCards: { eyebrow?, title?, reviews:[{meta,text}] }           // 후기 카드
- ratingCard: { brand?, score, reviewsLine?, satisfaction? }         // 평점 카드
- compareCard: { title?, left:{title,lines}, right:{title,lines} }   // 비교
- checklist: { eyebrow?, title?, items:[string] }                    // 체크 리스트
- specRows: { title?, rows:[[키,값]] }                               // 스펙 표
- ctaBand: { eyebrow?, title, sub?, chips?:[string], button }        // 최종 CTA

# 출력 형식 (JSON만, 설명 금지)
{ "palette": { "accent":"#hex" } (선택), "cuts": [ { "type":"hero", ... }, ... ] }`;

export async function planWithAI(input: { description?: string; prompt?: string; cutCount?: number; productName?: string; category?: string }): Promise<{ plan: Plan; source: 'ai' | 'fallback'; note?: string }> {
  const key = process.env.OPENAI_API_KEY;
  if (process.env.MOCK_LLM === '1') return { plan: fallbackPlan(input), source: 'fallback', note: '목 모드(무료) → 결정형 폴백' };
  if (!key) return { plan: fallbackPlan(input), source: 'fallback', note: 'OPENAI_API_KEY 없음 → 결정형 폴백' };

  const user = `# 제품 자유 설명\n${input.description ?? '(없음)'}\n\n# 사용자 지시(프롬프트)\n${input.prompt ?? '(없음)'}\n\n# 참고\n- 제품명: ${input.productName ?? '(미지정)'}\n- 카테고리: ${input.category ?? '(미지정)'}\n- 기본 컷 수(지시에 없을 때만): ${input.cutCount ?? 5}`;

  try {
    const client = new OpenAI({ apiKey: key });
    const model = process.env.OPENAI_PLANNER_MODEL || process.env.OPENAI_VISION_MODEL || 'gpt-4o-mini';
    const res = await client.chat.completions.create({
      model,
      temperature: 0.5,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }],
    });
    const raw = res.choices[0]?.message?.content ?? '{}';
    const parsed = PlanZ.parse(JSON.parse(raw));
    return { plan: parsed as Plan, source: 'ai' };
  } catch (e: any) {
    return { plan: fallbackPlan(input), source: 'fallback', note: 'AI 계획 실패 → 폴백: ' + (e?.message ?? e) };
  }
}
