/**
 * 레퍼런스 분할 이미지 세로 병합 — sharp.
 * 지정 그룹을 폭 정규화 후 세로로 이어 붙이고, 원본은 삭제(합본만 남김).
 */
import sharp from 'sharp';
import { unlink } from 'node:fs/promises';
import path from 'node:path';

const REF = 'inputs/references';

type Job = { dir: string; inputs: string[]; out: string };
const jobs: Job[] = [
  { dir: '뷰티', inputs: ['뷰티1.png', '뷰티2.png'], out: '뷰티A.png' },
  { dir: '뷰티', inputs: ['뷰티3.png', '뷰티4.png', '뷰티5.png'], out: '뷰티B.png' },
  { dir: '뷰티', inputs: ['뷰티립1.png', '뷰티립2.png'], out: '뷰티C.png' },
  { dir: '전자기기', inputs: ['밥솥1.png', '밥솥2.png'], out: '밥솥.png' },
  { dir: '전자기기', inputs: ['선풍기1.png', '선풍기2.png'], out: '선풍기.png' },
  { dir: '전자기기', inputs: ['에어프라이기1.png', '에어프라이기2.png'], out: '에어프라이기.png' },
  { dir: '반려동물&유아', inputs: ['유아1.png', '유아2.png'], out: '유아A.png' },
  { dir: '프리미엄', inputs: ['프리미엄1.png', '프리미엄2.png', '프리미엄3.png'], out: '프리미엄A.png' },
];

async function mergeVertical(files: string[], outPath: string) {
  const metas = await Promise.all(files.map((f) => sharp(f).metadata()));
  const targetW = Math.min(...metas.map((m) => m.width ?? 0)) || metas[0].width!;
  const resized = await Promise.all(
    files.map(async (f) => {
      const buf = await sharp(f).resize({ width: targetW }).png().toBuffer();
      const m = await sharp(buf).metadata();
      return { buf, h: m.height ?? 0 };
    }),
  );
  const totalH = resized.reduce((s, r) => s + r.h, 0);
  let top = 0;
  const comp = resized.map((r) => {
    const c = { input: r.buf, top, left: 0 };
    top += r.h;
    return c;
  });
  await sharp({ create: { width: targetW, height: totalH, channels: 4, background: '#ffffff' } })
    .composite(comp).png().toFile(outPath);
  return { width: targetW, height: totalH };
}

async function main() {
  for (const j of jobs) {
    const ins = j.inputs.map((f) => path.join(REF, j.dir, f));
    const out = path.join(REF, j.dir, j.out);
    const r = await mergeVertical(ins, out);
    console.log(`✅ ${j.dir}/${j.out}  (${r.width}x${r.height})  ← ${j.inputs.join(' + ')}`);
    for (const f of ins) await unlink(f);
  }
  console.log('\n원본 삭제 완료 — 합본만 남았습니다.');
}

main().catch((e) => {
  console.error('병합 실패:', e?.message ?? e);
  process.exit(1);
});
