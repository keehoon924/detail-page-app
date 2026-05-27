/** 레퍼런스에서 대표 색 추출 (레드/크림/크라프트/다크). */
import sharp from 'sharp';

async function main() {
  const { data, info } = await sharp('inputs/references/식품/식품1.jpg')
    .resize({ width: 240 }).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  let red = { s: -1, r: 0, g: 0, b: 0 };
  const cream = { r: 0, g: 0, b: 0, n: 0 };
  const kraft = { r: 0, g: 0, b: 0, n: 0 };
  let dark = { v: 9999, r: 0, g: 0, b: 0 };
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const sat = r - Math.max(g, b);
    if (r > 120 && sat > red.s) red = { s: sat, r, g, b };
    if (r > 205 && g > 195 && b > 168 && r >= g && g >= b) { cream.r += r; cream.g += g; cream.b += b; cream.n++; }
    if (r >= 110 && r <= 185 && g >= 78 && g <= 140 && b >= 45 && b <= 105 && r > g && g > b) { kraft.r += r; kraft.g += g; kraft.b += b; kraft.n++; }
    const v = r + g + b;
    if (v < dark.v && r >= g && g >= b) dark = { v, r, g, b };
  }
  const hex = (r, g, b) => '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
  const avg = (s) => (s.n ? hex(s.r / s.n, s.g / s.n, s.b / s.n) : '(none)');
  console.log('RED  ', hex(red.r, red.g, red.b));
  console.log('CREAM', avg(cream));
  console.log('KRAFT', avg(kraft));
  console.log('DARK ', hex(dark.r, dark.g, dark.b));
}
main().catch((e) => { console.error(e); process.exit(1); });
