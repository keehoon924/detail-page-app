/**
 * #3 누끼 CLI — @imgly(sharp 0.32.6)와 우리 sharp(0.34.5)의 네이티브 충돌 방지를 위해
 * 누끼는 반드시 별도 프로세스에서 실행한다.
 *   tsx src/cutout-cli.ts <input> <output>
 */
import { cutout } from './lib/cutout.ts';

const inp = process.argv[2];
const outp = process.argv[3];
if (!inp || !outp) {
  console.error('사용법: tsx src/cutout-cli.ts <input> <output>');
  process.exit(1);
}
const ok = await cutout(inp, outp);
console.log(ok ? `✅ 누끼 → ${outp}` : '❌ 누끼 실패');
process.exit(ok ? 0 : 1);
