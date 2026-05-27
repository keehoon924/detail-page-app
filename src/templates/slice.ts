/** 긴 레퍼런스 이미지를 세로 N등분으로 잘라 읽기 좋게 저장. 사용: tsx slice.ts <img> <n> */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { basename, extname } from 'node:path';

async function main() {
  const img = process.argv[2];
  const n = parseInt(process.argv[3] || '8', 10);
  if (!img) { console.error('사용: tsx slice.ts <imagePath> <n>'); process.exit(1); }
  const meta = await sharp(img).metadata();
  const W = meta.width!, H = meta.height!;
  const name = basename(img, extname(img));
  const outDir = `output/slices/${name}`;
  await mkdir(outDir, { recursive: true });
  const sliceH = Math.ceil(H / n);
  for (let i = 0; i < n; i++) {
    const top = i * sliceH;
    const h = Math.min(sliceH, H - top);
    if (h <= 0) break;
    const out = `${outDir}/${String(i).padStart(2, '0')}.png`;
    // 폭이 1100 넘으면 가독성 위해 1100으로 다운스케일
    let pipe = sharp(img).extract({ left: 0, top, width: W, height: h });
    if (W > 1100) pipe = pipe.resize({ width: 1100 });
    await pipe.png().toFile(out);
  }
  console.log(`✅ ${name}: ${n}조각 (원본 ${W}x${H}) → ${outDir}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
