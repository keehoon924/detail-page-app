/**
 * 스타일 옵션 썸네일 생성 — 각 레퍼런스의 상단부를 크롭해 public/styles/<id>.png.
 * 폼에서 "어떤 느낌인지" 미리보기로 보여주기 위함.
 */
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';

const W = 380;
const MAXH = 560;

async function main() {
  const tpl = JSON.parse(await readFile('src/styles/templates.json', 'utf8'));
  await mkdir('public/styles', { recursive: true });
  const styles = tpl.styles as Record<string, any>;
  for (const id of Object.keys(styles)) {
    const s = styles[id];
    const meta = await sharp(s.srcPath).metadata();
    const scaledH = Math.round(((meta.height ?? 1) / (meta.width ?? 1)) * W);
    const cropH = Math.min(MAXH, scaledH);
    await sharp(s.srcPath)
      .resize({ width: W })
      .extract({ left: 0, top: 0, width: W, height: cropH })
      .png()
      .toFile(`public/styles/${id}.png`);
    console.log(`✓ public/styles/${id}.png (${W}x${cropH})  ← ${s.srcPath}`);
  }
  console.log(`\n✅ 썸네일 ${Object.keys(styles).length}개 생성`);
}

main().catch((e) => {
  console.error('썸네일 실패:', e?.message ?? e);
  process.exit(1);
});
