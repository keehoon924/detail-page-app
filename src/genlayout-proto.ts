/**
 * 생성형 레이아웃 엔진 — 프로토타입.
 * 1) 레퍼런스 이미지를 비전 분석(디자인 재현 지침 추출)
 * 2) LLM이 그 스타일대로 "완전한 HTML/CSS 상세페이지"를 직접 생성 (템플릿 채우기 X)
 * 3) Playwright 렌더 → PNG
 *
 * 제품 사진은 {{PRODUCT_IMG}} 토큰 → 사용자 업로드 실사로 치환(AI 생성 아님).
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
import OpenAI from 'openai';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const VISION = process.env.OPENAI_VISION_MODEL ?? 'gpt-4o-mini';
const LAYOUT = process.env.OPENAI_LAYOUT_MODEL ?? 'gpt-4o';

const REF = 'inputs/references/식품/식품4.jpg';
const PRODUCT_IMG = 'public/uploads/food-main.jpg';
const OUT = 'output/genlayout';

async function analyzeRef(): Promise<string> {
  const b = await readFile(REF);
  const url = `data:image/jpeg;base64,${b.toString('base64')}`;
  const r = await client.chat.completions.create({
    model: VISION,
    temperature: 0.2,
    messages: [
      { role: 'system', content: '너는 상세페이지 아트디렉터다. 이 레퍼런스 상세페이지 디자인을 다른 디자이너가 그대로 재현할 수 있을 만큼 구체적으로 분석하라(한국어): ① 색 팔레트(hex 추정, 배경/포인트/텍스트) ② 타이포 느낌과 강약(헤드라인/본문 대비) ③ 섹션 구성·순서·리듬 ④ 장식 요소(블롭/물결 divider/뱃지/번호/마스코트/아이콘/말풍선 등 구체적으로) ⑤ 사진 사용 방식 ⑥ 여백·배경색 흐름 ⑦ 전체 무드 한 줄.' },
      { role: 'user', content: [{ type: 'text', text: '이 상세페이지 디자인을 재현 지침으로 분석해줘.' }, { type: 'image_url', image_url: { url } } as any] },
    ],
  });
  return r.choices[0]?.message?.content ?? '';
}

const SYS = `너는 한국 이커머스 상세페이지를 만드는 시니어 웹디자이너+퍼블리셔다.
아래 [레퍼런스 분석]의 스타일·구성·장식·타이포·색감 흐름을 그대로 재현하는 완전한 단일 HTML 문서를 작성한다. 고정 템플릿이 아니라, 레퍼런스를 보고 매번 새로 디자인하듯 마크업을 만든다.
[규칙]
- 전체 폭 860px 고정 컨테이너, 세로로 섹션 8~11개 스택.
- 폰트: Pretendard CDN(@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css')). 손글씨 필요시 Nanum Pen Script(Google Fonts).
- 모든 텍스트는 HTML 텍스트(이미지에 글자 넣지 말 것). 한글 카피는 존댓말·후킹형. 금지어 사용 금지: 획기적·혁신적·최고·완벽·최상.
- 제품 사진 자리는 반드시 <img src="{{PRODUCT_IMG}}" ...> 토큰 사용(여러 번 가능, object-fit:cover).
- 장식(블롭, 물결/대각선 divider, 뱃지, 번호 원, 점선, 말풍선, 아이콘 느낌)은 CSS·인라인 SVG로 직접 구현. 레퍼런스의 장식을 모사하라.
- 배경색은 섹션마다 레퍼런스처럼 흐르게. 텍스트 대비 확보.
- CSS는 인라인 <style> 하나에. 외부 JS 금지.
- 출력은 <!doctype html> 로 시작하는 "HTML 코드만". 설명·코드펜스 절대 금지.`;

async function genHtml(analysis: string): Promise<string> {
  const product = [
    '제품명: 불맛 가득 국물 떡볶이',
    '가격: 정가 12,900원 → 할인가 9,900원',
    '한 줄 소개: 집에서 즐기는 매콤 불맛 국물 떡볶이',
    '핵심 특징: 진한 불맛 양념 / 쫄깃한 국내산 쌀떡 / 간편 전자레인지 5분 조리',
    '타겟: 분식 좋아하는 20~30대',
    '필수 포함 문구: "당일출고", "국내산 쌀떡"',
    '리뷰: 평점 4.9 (2,310건) — "진짜 분식집 맛", "국물까지 싹 비웠어요", "간편한데 퀄리티 좋아요"',
    '인증: HACCP / 프로모션: 런칭 기념 1+1',
  ].join('\n');
  const user = `[레퍼런스 분석]\n${analysis}\n\n[제품 정보]\n${product}\n\n위 레퍼런스 스타일을 그대로 재현해, 이 제품의 상세페이지 HTML을 작성하라.`;
  const models = [LAYOUT, 'gpt-4o-mini'];
  let lastErr: any;
  for (const model of models) {
    try {
      const r = await client.chat.completions.create({
        model, temperature: 0.7, max_tokens: 9000,
        messages: [{ role: 'system', content: SYS }, { role: 'user', content: user }],
      });
      let html = r.choices[0]?.message?.content ?? '';
      html = html.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
      if (html.toLowerCase().includes('<!doctype') || html.includes('<html')) {
        console.log(`  (모델: ${model})`);
        return html;
      }
    } catch (e) { lastErr = e; }
  }
  throw new Error('HTML 생성 실패: ' + (lastErr?.message ?? ''));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log('1) 레퍼런스 비전 분석...');
  const analysis = await analyzeRef();
  await writeFile(`${OUT}/analysis.txt`, analysis);

  console.log('2) LLM이 HTML/CSS 직접 생성...');
  let html = await genHtml(analysis);
  const img = await readFile(PRODUCT_IMG);
  html = html.split('{{PRODUCT_IMG}}').join(`data:image/jpeg;base64,${img.toString('base64')}`);
  await writeFile(`${OUT}/page.html`, html);

  console.log('3) Playwright 렌더...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 860, height: 1400 }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => (document as any).fonts.ready).catch(() => {});
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/proto.png`, fullPage: true });
  await page.close();
  await browser.close();
  console.log(`✅ ${OUT}/proto.png  (분석: analysis.txt, 마크업: page.html)`);
}

main().catch((e) => { console.error('프로토타입 실패:', e?.message ?? e); process.exit(1); });
