/**
 * 아이콘 매칭 — Lucide(lucide-static). AI 생성 금지, 라이브러리 통일.
 * 특징 텍스트 키워드 → Lucide 아이콘 이름. SVG 는 stroke=currentColor 라 부모 color 로 색 통일.
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const DIR = 'node_modules/lucide-static/icons';

const MAP: [RegExp, string][] = [
  [/필터|정화|공기|청정|미세먼지|먼지|탈취|냄새/, 'wind'],
  [/충전|배터리|usb/i, 'battery-charging'],
  [/무선|선\s?없|코드리스/, 'zap'],
  [/소음|조용|저소음/, 'volume-x'],
  [/경량|가벼|초경량/, 'feather'],
  [/크기|한\s?손|컴팩트|미니|소형|사이즈/, 'ruler'],
  [/방수|물|워터|수분/, 'droplet'],
  [/안전|인증|보장|특허|kc/i, 'shield-check'],
  [/살균|위생|세척|청결|소독/, 'sparkles'],
  [/시간|작동|타이머|지속|연속/, 'clock'],
  [/led|빛|조명|디스플레이/i, 'lightbulb'],
  [/냉각|쿨링|시원|아이스|냉/, 'snowflake'],
  [/보온|따뜻|온열|히팅/, 'flame'],
  [/소재|품질|프리미엄|고급|원단/, 'gem'],
  [/배송|출고|당일/, 'truck'],
  [/교환|반품|환불/, 'rotate-ccw'],
  [/천연|오가닉|식물|친환경|무첨가/, 'leaf'],
  [/영양|건강|성분|함량/, 'heart-pulse'],
  [/맛|식욕|먹|요리|조리|레시피/, 'utensils'],
  [/매콤|불맛|매운|직화/, 'flame'],
  [/디자인|미니멀|심플|모던/, 'palette'],
  [/휴대|이동|어디서나|아웃도어/, 'move'],
  [/스트랩|조절/, 'sliders-horizontal'],
  [/자외선|차단|uv|선케어/i, 'sun'],
  [/보습|수분|촉촉/, 'droplets'],
  [/흡수|발림/, 'sparkle'],
  [/포근|부드|보드라/, 'heart'],
];
const FALLBACK = 'circle-check-big';

/** 텍스트 → Lucide 아이콘 이름. 매칭 없으면 fallback. */
export function iconNameFor(text = ''): string {
  for (const [re, name] of MAP) if (re.test(text)) return name;
  return FALLBACK;
}

/** Lucide SVG 문자열 로드 (없으면 fallback, 그것도 없으면 undefined). */
export async function loadIconSvg(name: string): Promise<string | undefined> {
  for (const n of [name, FALLBACK, 'check']) {
    const p = `${DIR}/${n}.svg`;
    if (existsSync(p)) return await readFile(p, 'utf8');
  }
  return undefined;
}
