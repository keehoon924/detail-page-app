/** 템플릿 → 완성 HTML 페이지 (테마 적용 + 섹션 자동 구분선). */
import type { Template2, BG, Theme } from './engine.ts';
import { renderSection } from './engine.ts';
import { CSS, wave } from './css.ts';

function bgColor(bg: BG, t: Theme): string {
  return { page: t.bg, light: t.light, light2: t.light2, white: '#ffffff', primary: t.primary, ink: t.ink }[bg];
}

export function buildPage(tpl: Template2): string {
  const w = tpl.width ?? 860;
  const t = tpl.theme;
  const vars = `--w:${w}px;--primary:${t.primary};--primary-deep:${t.primaryDeep};--light:${t.light};--light2:${t.light2};--ink:${t.ink};--sub:${t.sub};--accent:${t.accent};--bg:${t.bg};--on-primary:${t.onPrimary}`;

  const parts: string[] = [];
  tpl.sections.forEach((s, i) => {
    const prev = tpl.sections[i - 1];
    const curBg: BG = s.bg ?? 'page';
    const prevBg: BG = prev?.bg ?? 'page';
    // 강한 색(primary/ink) 경계에 웨이브 구분선
    if (prev && curBg !== prevBg && (curBg === 'primary' || curBg === 'ink' || prevBg === 'primary' || prevBg === 'ink')) {
      parts.push(wave(w, bgColor(prevBg, t), bgColor(curBg, t)));
    }
    parts.push(renderSection(s));
  });

  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>${CSS}</style></head>
  <body><div class="page" style="${vars}">${parts.join('\n')}</div></body></html>`;
}
