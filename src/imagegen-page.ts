/**
 * 생성형 "통이미지" 상세페이지 엔진 (조쉬 방식 + 우리 자산).
 * 1) LLM: 디자인 디렉션 + 섹션별 이미지 프롬프트(한글 카피를 그대로 박아 그릴 것)
 * 2) gpt-image-1: 각 섹션을 "배경+텍스트+제품+레이아웃" 통째로 1장 생성
 * 3) sharp: 세로로 합쳐 하나의 긴 상세페이지
 *
 * 카피 규칙(후킹·존댓말·금지어)과 레퍼런스 학습 스타일을 프롬프트에 반영.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
import OpenAI from 'openai';
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { generateBackground } from './generate-bg.ts';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const LAYOUT = process.env.OPENAI_LAYOUT_MODEL ?? 'gpt-4o';
const OUT = 'output/imagegen';

const PRODUCT = [
  '제품명: 불맛 가득 국물 떡볶이',
  '가격: 정가 12,900원 → 할인가 9,900원',
  '한 줄 소개: 집에서 즐기는 매콤 불맛 국물 떡볶이',
  '핵심 특징: 진한 불맛 양념 / 쫄깃한 국내산 쌀떡 / 간편 전자레인지 5분 조리',
  '타겟: 분식 좋아하는 20~30대',
  '필수 포함 문구: "당일출고", "국내산 쌀떡"',
  '리뷰: 평점 4.9(2,310건) — "진짜 분식집 맛", "국물까지 싹 비웠어요"',
].join('\n');

// 레퍼런스 학습(식품/분식) 스타일 — 디자인 프롬프트에 반영
const REF_STYLE = '레퍼런스(한국 분식 상세페이지): 따뜻한 오렌지·레드 식욕 컬러, 김 오르는 음식 클로즈업이 주인공, 손글씨 악센트 제목, 친근한 존댓말, POINT 뱃지·별점 말풍선 리뷰, 넉넉한 여백, 깔끔한 상업 레이아웃.';

const SYS = `너는 한국 이커머스 상세페이지 아트디렉터+카피라이터다. 제품 정보와 레퍼런스 스타일로, 상세페이지를 "섹션별 통이미지"로 생성하기 위한 계획을 JSON으로 작성한다.
[카피 규칙] 존댓말, 후킹 헤드라인(8공식 중 효과적인 것), 금지어 금지(획기적·혁신적·최고·완벽·최상), 필수문구 자연스럽게 포함, 기능→혜택 번역, 숫자 구체적.
[이미지 프롬프트 규칙] 각 섹션은 gpt-image-1로 배경+한글텍스트+음식/제품+레이아웃을 통째로 그리는 1장의 이미지다. 프롬프트는 영어로 작성하되, 화면에 들어갈 한글 문구는 정확한 한글 그대로 큰따옴표로 지정하고 'render this Korean text exactly, accurate Hangul, crisp, correctly spelled'를 명시. 워터마크·로고 금지, 영어 잡텍스트 금지, 세로 2:3.
[일관성] 모든 섹션이 한 페이지처럼 보이도록 공통 'direction'(팔레트·사진톤·무드·타이포 느낌)을 정하고 모든 섹션에 일관 적용.
[출력 JSON] { "direction":"공통 스타일 한 문단(영어)", "sections":[ {"role":"hero|문제공감|핵심기능|사용장면|리뷰|CTA", "prompt":"섹션 통이미지 영어 프롬프트(한글 카피 포함)"} ] } — 정확히 6개 섹션.`;

async function plan() {
  const r = await client.chat.completions.create({
    model: LAYOUT, temperature: 0.6, response_format: { type: 'json_object' }, max_tokens: 3500,
    messages: [
      { role: 'system', content: SYS },
      { role: 'user', content: `[제품]\n${PRODUCT}\n\n[레퍼런스 스타일]\n${REF_STYLE}\n\nhero·문제공감·핵심기능·사용장면·리뷰·CTA 6개 섹션 계획을 작성하라.` },
    ],
  });
  return JSON.parse(r.choices[0]?.message?.content ?? '{}');
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log('1) 카피+이미지프롬프트 계획(LLM)...');
  const p = await plan();
  await writeFile(`${OUT}/plan.json`, JSON.stringify(p, null, 2));
  const dir = p.direction ?? '';
  const sections: any[] = p.sections ?? [];

  console.log(`2) 섹션 통이미지 생성 ${sections.length}장 (gpt-image-1)...`);
  const files: string[] = [];
  let i = 0;
  for (const s of sections) {
    i++;
    const prompt = `${s.prompt}\n\n[CONSISTENT STYLE across all sections]: ${dir}\n[MANDATORY]: vertical 2:3 portrait. Render ALL Korean (Hangul) text EXACTLY as written, correctly spelled, sharp and legible. No watermark, no logo, no random English text.`;
    const f = `${OUT}/${String(i).padStart(2, '0')}.png`;
    process.stdout.write(`  • ${s.role}... `);
    await generateBackground(prompt, f);
    files.push(f);
    console.log('완료');
  }

  console.log('3) 세로 합치기(sharp)...');
  const metas = await Promise.all(files.map((f) => sharp(f).metadata()));
  const w = Math.max(...metas.map((m) => m.width ?? 0));
  const h = metas.reduce((a, m) => a + (m.height ?? 0), 0);
  let top = 0;
  const comp = files.map((f, idx) => { const c = { input: f, top, left: 0 }; top += metas[idx].height ?? 0; return c; });
  await sharp({ create: { width: w, height: h, channels: 4, background: '#ffffff' } }).composite(comp).png().toFile(`${OUT}/page.png`);
  console.log(`✅ ${OUT}/page.png  (${files.length}장 합침, ${w}x${h})`);
}

main().catch((e) => { console.error('실패:', e?.message ?? e); process.exit(1); });
