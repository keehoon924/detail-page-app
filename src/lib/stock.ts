/**
 * #6 사람/라이프스타일 스톡 사진 — Pexels/Unsplash 검색(실제 사진만, AI 생성 금지).
 * 키 없으면 null 반환(그레이스풀). 업로드 사진이 있으면 호출부에서 우선 사용.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

/** 카테고리/타겟 → 사람 사진 검색어. 기본적으로 한국인/동양인 우선(STOCK_PEOPLE_HINT). */
export function peopleQuery(category: string, target?: string): string {
  // 한국 특정 결과가 적으면 동양인까지 넓혀 검색 (recall 확보)
  const hint = process.env.STOCK_PEOPLE_HINT ?? 'korean';
  const scene: Record<string, string> = {
    '뷰티': 'applying skincare beauty', '패션': 'wearing stylish outfit fashion',
    '유아': 'with baby at home', '반려동물': 'with pet dog at home',
    '식품': 'eating food cooking', '전자기기': 'using home appliance',
    '생활': 'using product at home daily life', '건강': 'healthy lifestyle',
    '기타': 'lifestyle',
  };
  const person = /남성|남자|\bman\b|male/i.test(target ?? '') ? 'man' : 'woman';
  return `${hint} ${person} ${scene[category] ?? scene['기타']}`.trim();
}

export async function searchStock(query: string, outPath: string): Promise<string | null> {
  const provider = process.env.STOCK_PROVIDER ?? 'pexels';
  try {
    let src: string | undefined;
    if (provider === 'pexels' && process.env.PEXELS_API_KEY) {
      const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait`, {
        headers: { Authorization: process.env.PEXELS_API_KEY },
      });
      const j: any = await r.json();
      src = j?.photos?.[0]?.src?.large;
    } else if (provider === 'unsplash' && process.env.UNSPLASH_ACCESS_KEY) {
      const r = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
      const j: any = await r.json();
      src = j?.results?.[0]?.urls?.regular;
    }
    if (!src) return null; // 키 없음 또는 결과 없음
    const img = await fetch(src);
    const buf = Buffer.from(await img.arrayBuffer());
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, buf);
    return outPath;
  } catch {
    return null;
  }
}
