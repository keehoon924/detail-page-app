/**
 * OpenAI 배경 생성 — 하이브리드 렌더의 ① 단계.
 *
 * gpt-image-1 로 섹션 배경/비주얼만 생성한다(텍스트 없음).
 * API 키는 .env 의 OPENAI_API_KEY 에서 읽는다 (.env.local 도 폴백 지원).
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
import OpenAI from 'openai';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

// 클라이언트는 지연 생성 (키 없을 때 모듈 로드 단계에서 throw 되는 것 방지)
let _client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!_client) _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _client;
}
const MODEL = process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-1';
const SIZE = (process.env.OPENAI_IMAGE_SIZE ?? '1024x1536') as
  | '1024x1024' | '1024x1536' | '1536x1024' | 'auto';

/** 프롬프트로 배경 PNG 1장 생성 → outPath 저장. 재사용 가능. */
export async function generateBackground(prompt: string, outPath: string) {
  const params: Record<string, unknown> = { model: MODEL, prompt, size: SIZE, n: 1 };
  if (MODEL.startsWith('gpt-image')) {
    params.quality = process.env.OPENAI_IMAGE_QUALITY ?? 'high';
  } else if (MODEL.startsWith('dall-e')) {
    params.response_format = 'b64_json'; // gpt-image-1 은 항상 b64 반환
  }

  const res = await getClient().images.generate(params as any);
  const b64 = res.data?.[0]?.b64_json;
  if (!b64) throw new Error('이미지 미반환: ' + JSON.stringify(res).slice(0, 300));

  const buf = Buffer.from(b64, 'base64');
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, buf);
  return { bytes: buf.length, path: outPath };
}

/* ───────── CLI 테스트: 히어로 컷 배경 1장 ───────── */

const TEST_PROMPT = `Premium commercial product photography scene for a compact wireless car air purifier, for an e-commerce detail page hero.
A small sleek cylindrical white-and-silver air purifier device standing on a subtle reflective surface.
Deep navy-to-teal gradient studio background, soft volumetric light glow from the top, faint floating particles catching the light, gentle reflections.
Leave generous empty negative space in the TOP HALF of the frame (a headline will be composited there later).
Vertical portrait composition, minimalist, high-end, cinematic lighting.
Absolutely NO text, NO letters, NO words, NO numbers, NO logos, NO watermark anywhere.`;

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY 가 없습니다. .env 파일에 넣어주세요.');
    process.exit(1);
  }
  console.log(`모델: ${MODEL} (${SIZE})\n배경 생성 중...`);
  const r = await generateBackground(TEST_PROMPT, 'assets/bg-test.png');
  console.log(`✅ ${r.path} 생성 (${(r.bytes / 1024).toFixed(0)} KB)`);
}

// 이 파일을 직접 실행할 때만 CLI 테스트가 돌도록 가드 (import 시 자동 실행 방지)
const isMain = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;
if (isMain) {
  main().catch((e) => {
    console.error('생성 실패:', e?.message ?? e);
    process.exit(1);
  });
}
