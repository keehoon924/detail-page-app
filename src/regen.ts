/**
 * 단일 컷 재생성 CLI — 웹 API가 호출.
 *   tsx src/regen.ts <formFile> <specFile> <index0>
 * spec 의 index 컷 카피를 새 버전으로 바꿔 spec 파일에 다시 쓴다.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { FormInputSchema, RenderSpecSchema } from './core/schemas.ts';
import { regenerateCut } from './pipeline/generate.ts';

async function main() {
  const [, , formFile, specFile, idxStr] = process.argv;
  const form = FormInputSchema.parse(JSON.parse(await readFile(formFile, 'utf8')));
  const spec = RenderSpecSchema.parse(JSON.parse(await readFile(specFile, 'utf8')));
  const i = Number(idxStr);
  if (!spec.sections[i]) throw new Error(`cut #${i} 없음`);
  spec.sections[i] = await regenerateCut(form, spec.sections[i]);
  await writeFile(specFile, JSON.stringify(spec, null, 2));
  console.log(`✅ 컷 #${i} 재생성 완료`);
}

main().catch((e) => {
  console.error('재생성 실패:', e?.message ?? e);
  process.exit(1);
});
