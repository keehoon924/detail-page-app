/**
 * 파이프라인 산출물 검증 — pipeline/*.json 을 Zod 스키마로 검사.
 * 각 에이전트가 계약(schemas.ts)을 지켰는지 게이트.
 */
import { readFile } from 'node:fs/promises';
import {
  ProductDataSchema,
  ResearchReportSchema,
  CopyDeckSchema,
  DesignSpecSchema,
  RenderSpecSchema,
} from './core/schemas.ts';
import type { ZodTypeAny } from 'zod';

const checks: [string, ZodTypeAny][] = [
  ['pipeline/01-product.json', ProductDataSchema],
  ['pipeline/02-research.json', ResearchReportSchema],
  ['pipeline/03-copy.json', CopyDeckSchema],
  ['pipeline/04-design.json', DesignSpecSchema],
  ['pipeline/05-render-spec.json', RenderSpecSchema],
];

let allOk = true;
let checked = 0;

for (const [path, schema] of checks) {
  let raw: string;
  try {
    raw = await readFile(path, 'utf8');
  } catch {
    console.log(`⏭️  ${path} (아직 없음)`);
    continue;
  }
  checked++;
  try {
    const data = JSON.parse(raw);
    const r = schema.safeParse(data);
    if (r.success) {
      // 13컷 섹션 길이 부가 점검
      const n = (data as any)?.sections?.length;
      const extra = typeof n === 'number' ? ` · sections: ${n}` : '';
      console.log(`✅ ${path}${extra}`);
    } else {
      allOk = false;
      console.log(`❌ ${path}`);
      for (const issue of r.error.issues.slice(0, 6)) {
        console.log(`   - ${issue.path.join('.')}: ${issue.message}`);
      }
    }
  } catch (e) {
    allOk = false;
    console.log(`❌ ${path} — JSON 파싱 실패: ${(e as Error).message}`);
  }
}

console.log(`\n검사 ${checked}개 / ${allOk ? '전부 통과 ✅' : '실패 있음 ❌'}`);
process.exit(allOk ? 0 : 1);
