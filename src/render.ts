/**
 * 렌더 CLI — render-core 사용. CLI/웹 공용.
 *   npm run render                       # pipeline/05-render-spec.json → output/
 *   npm run render -- --only=1,11        # 지정 컷만
 *   SPEC_FILE=... RENDER_OUT=... npm run render   # 세션별 경로(웹 API용)
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
import { readFile } from 'node:fs/promises';
import { RenderSpecSchema } from './core/schemas.ts';
import { renderSpec } from './pipeline/render-core.ts';

function parseArgs() {
  const a = process.argv.slice(2);
  const only = a.find((x) => x.startsWith('--only='))?.split('=')[1]?.split(',').map((s) => s.trim());
  return { only, noStitch: a.includes('--no-stitch') };
}

async function main() {
  const args = parseArgs();
  const specFile = process.env.SPEC_FILE ?? 'pipeline/05-render-spec.json';
  const outDir = process.env.RENDER_OUT ?? 'output';
  const spec = RenderSpecSchema.parse(JSON.parse(await readFile(specFile, 'utf8')));

  let sections = spec.sections;
  if (args.only) {
    const want = args.only.map((o) => `/${o.padStart(2, '0')}.png`);
    sections = sections.filter((s) => want.some((w) => s.outFile.replace(/\\/g, '/').endsWith(w)));
  }
  console.log(`렌더 ${sections.length}컷 → ${outDir}`);
  const files = await renderSpec({ ...spec, sections }, outDir, { stitch: !args.only && !args.noStitch });
  files.forEach((f) => console.log('  ✓', f));
  console.log('\n✅ 렌더 완료');
}

main().catch((e) => {
  console.error('렌더 실패:', e?.message ?? e);
  process.exit(1);
});
