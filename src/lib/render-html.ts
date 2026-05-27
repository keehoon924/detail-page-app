/**
 * 섹션 1컷의 HTML 생성 — 배경(이미지/그라데이션) 위에 한글 텍스트 패널을 합성.
 * RenderSection.style(area/align/maxWidthPct/emphasis/accent)에 따라 배치한다.
 */
import type { RenderSpec } from '../core/schemas.ts';

type Section = RenderSpec['sections'][number];

const POS: Record<string, [string, string]> = {
  top: ['flex-start', 'center'],
  center: ['center', 'center'],
  bottom: ['flex-end', 'center'],
  left: ['center', 'flex-start'],
  right: ['center', 'flex-end'],
  full: ['center', 'center'],
};

const esc = (s: string) =>
  (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ml = (s: string) => esc(s).replace(/\n/g, '<br/>');

export function buildSectionHtml(
  section: Section,
  bgDataUri: string,
  opt: { width: number; height: number; font: string },
): string {
  const st = section.style ?? {};
  const area = (st.area as string) ?? 'center';
  const align = (st.align as string) ?? 'center';
  const maxW = Number(st.maxWidthPct ?? 80) || 80;
  const emphasis = (st.emphasis as string) ?? 'medium';
  const accent = (st.accent as string) ?? '#ff5a5f';
  const [justify, alignItems] = POS[area] ?? POS.center;
  const hSize = emphasis === 'high' ? 56 : emphasis === 'low' ? 36 : 46;

  const t = section.text;
  const bg = bgDataUri
    ? `background-image:url('${bgDataUri}');background-size:cover;background-position:center;`
    : `background:linear-gradient(160deg,#0b1f3a,#14365f 50%,#1f6f8b);`;

  const headline = t.headline ? `<h1>${ml(t.headline)}</h1>` : '';
  const subcopy = t.subcopy ? `<p class="sub">${ml(t.subcopy)}</p>` : '';
  const body = t.body ? `<p class="body">${ml(t.body)}</p>` : '';
  const bullets =
    (t.bullets ?? []).length > 0
      ? `<ul class="bul">${t.bullets.map((b) => `<li>${ml(b)}</li>`).join('')}</ul>`
      : '';
  const cta =
    section.template === 'cta' ? `<div class="ctaBtn">지금 구매하기</div>` : '';

  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"/>
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'${opt.font}','Malgun Gothic',sans-serif;-webkit-font-smoothing:antialiased;}
  .cut{width:${opt.width}px;height:${opt.height}px;position:relative;overflow:hidden;background:#0b1f3a;}
  .bg{position:absolute;inset:0;${bg}}
  .scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,10,20,0.30),rgba(4,10,20,0.05) 28%,rgba(4,10,20,0.05) 70%,rgba(4,10,20,0.32));}
  .content{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:${justify};align-items:${alignItems};padding:76px 56px;}
  .panel{max-width:${maxW}%;background:rgba(8,15,28,0.42);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:22px;padding:44px 40px;color:#fff;text-align:${align};box-shadow:0 18px 50px rgba(0,0,0,0.28);}
  h1{font-size:${hSize}px;font-weight:800;line-height:1.26;letter-spacing:-1px;text-shadow:0 2px 18px rgba(0,0,0,0.35);}
  .sub{font-size:25px;font-weight:500;line-height:1.5;color:rgba(255,255,255,0.92);margin-top:18px;}
  .body{font-size:22px;font-weight:400;line-height:1.65;color:rgba(255,255,255,0.86);margin-top:18px;}
  .bul{list-style:none;margin-top:24px;text-align:left;display:inline-block;}
  .bul li{font-size:22px;line-height:1.75;color:rgba(255,255,255,0.92);padding-left:28px;position:relative;}
  .bul li::before{content:'';position:absolute;left:4px;top:13px;width:9px;height:9px;border-radius:50%;background:${accent};}
  .ctaBtn{display:inline-block;margin-top:30px;background:${accent};color:#fff;font-size:24px;font-weight:700;padding:19px 44px;border-radius:14px;box-shadow:0 16px 36px rgba(0,0,0,0.3);}
</style></head>
<body>
  <div class="cut" id="cut">
    <div class="bg"></div>
    <div class="scrim"></div>
    <div class="content">
      <div class="panel">
        ${headline}${subcopy}${body}${bullets}${cta}
      </div>
    </div>
  </div>
</body></html>`;
}
