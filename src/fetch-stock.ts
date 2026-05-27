import { searchStock } from './lib/stock.ts';
const [, , q, out] = process.argv;
const r = await searchStock(q ?? 'lifestyle person', out ?? 'assets/stock.jpg');
console.log(r ? `✅ ${r}` : '❌ null (키/결과 없음)');
