import { cutout } from './lib/cutout.ts';
const ok = await cutout('public/demo/01.png', 'assets/cut-test.png');
console.log(ok ? '✅ 누끼 성공 → assets/cut-test.png' : '❌ 누끼 실패');
