/**
 * Phase B 데모 (sharp 사용 프로세스) — #4 배경생성/합성 + #2 비전 + #6 스톡.
 * #3 누끼는 별도 프로세스(cutout-cli.ts)로 먼저 실행해 assets/pb-cut.png 를 만들어 둔다.
 * (@imgly sharp 와 우리 sharp 네이티브 충돌 회피)
 */
import { existsSync } from 'node:fs';
import { genScene, composeScene } from './lib/bg-scene.ts';
import { classifyPhoto } from './lib/vision.ts';
import { searchStock, peopleQuery } from './lib/stock.ts';

async function main() {
  const cut = 'assets/pb-cut.png';
  if (!existsSync(cut)) {
    console.error(`먼저 누끼를 실행하세요: npx tsx src/cutout-cli.ts public/demo/01.png ${cut}`);
    process.exit(1);
  }

  console.log('— #4 컨텍스트 배경 생성(전자기기/hero) —');
  await genScene('전자기기', 'hero', 'assets/pb-bg.png');

  console.log('— #3+#4 합성 —');
  await composeScene(cut, 'assets/pb-bg.png', 'assets/pb-scene.png');
  console.log('  ✅ assets/pb-scene.png');

  console.log('— #2 비전 분류 —');
  for (const p of ['public/demo/01.png', 'public/demo/02.png', 'public/demo/03.png', 'public/demo/04.png']) {
    const c = await classifyPhoto(p);
    console.log(`  ${p.split('/').pop()} → ${c.type} (${c.desc})`);
  }

  console.log('— #6 스톡 사람 사진 —');
  const q = peopleQuery('전자기기', '30~40대 직장인');
  const s = await searchStock(q, 'assets/pb-stock.jpg');
  console.log(s ? `  ✅ 스톡: ${s} (검색어: ${q})` : `  ⏭️ Pexels 키 없음 → 스킵 (검색어 준비됨: "${q}")`);
}

main().catch((e) => { console.error('Phase B 데모 실패:', e?.message ?? e); process.exit(1); });
