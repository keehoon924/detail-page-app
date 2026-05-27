/**
 * 자동 생성 CLI — 폼 JSON → 13컷 render-spec.
 * 사용법: npm run generate -- inputs/form.example.json
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { FormInputSchema } from './core/schemas.ts';
import { generate } from './pipeline/generate.ts';

async function main() {
  const path = process.argv[2] ?? 'inputs/form.json';
  const specOut = process.argv[3] ?? 'pipeline/05-render-spec.json';
  const form = FormInputSchema.parse(JSON.parse(await readFile(path, 'utf8')));
  console.log(`자동 생성 중... (제품: ${form.productName}, ${form.cutCount}컷)`);

  const { spec, qa } = await generate(form);

  await mkdir(specOut.replace(/[^/\\]+$/, '') || '.', { recursive: true });
  await writeFile(specOut, JSON.stringify(spec, null, 2));
  console.log(`✅ ${specOut} (${spec.sections.length}컷)`);
  console.log(
    qa.length
      ? `⚠️ QA 경고:\n- ${qa.join('\n- ')}`
      : '✅ QA 통과 (금지어·필수문구·연속 레이아웃 이상 없음)',
  );
  console.log('\n다음: npm run render  (배경/사진 합성 → output/01~13.png)');
}

main().catch((e) => {
  console.error('생성 실패:', e?.message ?? e);
  process.exit(1);
});
