import { searchStock, peopleQuery } from './lib/stock.ts';

const q = peopleQuery('뷰티', '20~30대 여성');
const r = await searchStock(q, 'assets/stock-test.jpg');
console.log(r ? `✅ 스톡 다운로드: ${r}\n   검색어: ${q}` : `❌ 실패 (검색어: ${q})`);
