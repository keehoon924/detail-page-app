/**
 * 스톡 후보 여러 장 다운로드 → public/stock-preview/NN.jpg (브라우저 확인용).
 *   tsx src/fetch-stock-many.ts "검색어" [개수]
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
import { writeFile, mkdir, rm } from 'node:fs/promises';

const key = process.env.PEXELS_API_KEY;
const query = process.argv[2] ?? 'korean asian woman applying skincare';
const n = Number(process.argv[3] ?? 6);
const OUT = 'public/stock-preview';

async function main() {
  if (!key) { console.error('❌ PEXELS_API_KEY 없음 (.env)'); process.exit(1); }
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${n}&orientation=portrait`, {
    headers: { Authorization: key },
  });
  const j: any = await r.json();
  const photos = j?.photos ?? [];
  let i = 0;
  for (const p of photos) {
    const src = p.src?.large ?? p.src?.medium;
    if (!src) continue;
    i++;
    const img = await fetch(src);
    const buf = Buffer.from(await img.arrayBuffer());
    await writeFile(`${OUT}/${String(i).padStart(2, '0')}.jpg`, buf);
    console.log(`✓ ${String(i).padStart(2, '0')}.jpg  (사진: ${p.photographer}, alt: ${(p.alt ?? '').slice(0, 40)})`);
  }
  console.log(`\n검색어: "${query}"  ·  ${i}장 → http://localhost:3000/stock-preview`);
}

main().catch((e) => { console.error(e); process.exit(1); });
