/**
 * 오트밀리 이미지 생성 — gpt-image-1 로 비주얼만 생성(한글/문자 없음).
 * 출력: assets/oatmeally/<id>.png
 * 이미 존재하면 건너뜀(재실행 시 비용 절감). FORCE=1 이면 재생성.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
import OpenAI from 'openai';
import { writeFile, mkdir, access } from 'node:fs/promises';
import { IMAGES } from './content.ts';

const MODEL = process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-1';
const QUALITY = process.env.OPENAI_IMAGE_QUALITY ?? 'medium';
const OUT = 'assets/oatmeally';

let _c: OpenAI | null = null;
const client = () => (_c ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));

async function exists(p: string) {
  try { await access(p); return true; } catch { return false; }
}

async function genOne(id: string, size: string, prompt: string) {
  const out = `${OUT}/${id}.png`;
  if (!process.env.FORCE && (await exists(out))) {
    console.log(`⏭️  ${id} (이미 있음)`);
    return;
  }
  const params: Record<string, unknown> = { model: MODEL, prompt, size, n: 1 };
  if (MODEL.startsWith('gpt-image')) params.quality = QUALITY;
  const res = await client().images.generate(params as any);
  const b64 = res.data?.[0]?.b64_json;
  if (!b64) throw new Error(`${id}: 이미지 미반환`);
  const buf = Buffer.from(b64, 'base64');
  await writeFile(out, buf);
  console.log(`✅ ${id} (${(buf.length / 1024).toFixed(0)}KB) → ${out}`);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) { console.error('❌ OPENAI_API_KEY 없음'); process.exit(1); }
  await mkdir(OUT, { recursive: true });
  console.log(`모델 ${MODEL} / 품질 ${QUALITY} / ${IMAGES.length}장\n`);
  for (const im of IMAGES) {
    try { await genOne(im.id, im.size, im.prompt); }
    catch (e: any) { console.error(`❌ ${im.id}: ${e?.message ?? e}`); }
  }
  console.log('\n완료.');
}
main().catch((e) => { console.error(e); process.exit(1); });
