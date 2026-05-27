/** Figma 플러그인 빌드 — 제품 이미지를 base64로 code.src.js 에 주입해 code.js 생성. */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const PRODUCT = 'public/uploads/food-main.jpg';

async function main() {
  const buf = await sharp(PRODUCT).resize({ width: 760 }).jpeg({ quality: 72 }).toBuffer();
  const b64 = buf.toString('base64');
  const tpl = await readFile('figma-plugin/code.src.js', 'utf8');
  await writeFile('figma-plugin/code.js', tpl.replace('{{IMG}}', b64));
  console.log(`✅ figma-plugin/code.js 생성 (이미지 base64 ${(b64.length / 1024).toFixed(0)}KB 내장)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
