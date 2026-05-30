/**
 * 9장 후처리 검증 + 자동 보정.
 * - 가짜 정보 정규식 차단 (입력에 없는 별점·후기·만족도·% 등 제거)
 * - 카피 길이 한계 초과 시 절단 X, 표시(추후 재생성 트리거)
 * - 중복 문장 dedupe
 * - 컷수 정확도 보고
 */
import type { Section, Template2 } from './engine.ts';
import { COPY_LIMITS, FAKE_INFO_PATTERNS, findFakeClaims } from './design-rules.ts';

export interface ValidateReport {
  cutCountOk: boolean;
  fakeRemoved: string[];        // 제거된 가짜 클레임 목록
  dedupedLines: string[];       // dedupe 된 중복 문장
  overLimit: { where: string; len: number; limit: number }[];  // 길이 초과
}

/** 가짜 정보 클레임을 카피 필드에서 제거. 입력(allowedRaw)에 동일 문구가 있으면 보존. */
function stripFake(text: string, allowedRaw: string, removed: string[]): string {
  if (!text) return text;
  let out = text;
  for (const re of FAKE_INFO_PATTERNS) {
    out = out.replace(re, (m) => {
      if (allowedRaw.includes(m)) return m;   // 입력에 있으면 OK
      removed.push(m);
      return '';
    });
  }
  return out.replace(/\s{2,}/g, ' ').trim();
}

/** 모든 텍스트 필드 순회해서 fn 적용. */
function walkText(s: any, fn: (t: string, where: string) => string, prefix = ''): any {
  const textKeys = ['label', 'script', 'title', 'accent', 'sub', 'head', 'body', 'caption', 'name', 'level', 'desc', 'q', 'a', 'who', 'value', 't', 'd'];
  const out: any = Array.isArray(s) ? [...s] : { ...s };
  for (const k of Object.keys(out)) {
    const v = out[k];
    const here = `${prefix}.${k}`;
    if (typeof v === 'string' && textKeys.includes(k)) out[k] = fn(v, here);
    else if (Array.isArray(v)) {
      out[k] = v.map((it, i) => typeof it === 'string'
        ? fn(it, `${here}[${i}]`)
        : (typeof it === 'object' && it !== null ? walkText(it, fn, `${here}[${i}]`) : it));
    } else if (v && typeof v === 'object') out[k] = walkText(v, fn, here);
  }
  return out;
}

export function validateAndFix(
  tpl: Template2, opts: { cutCount: number; allowedRaw: string },
): { template: Template2; report: ValidateReport } {
  const removed: string[] = [];
  const dedupedLines: string[] = [];
  const overLimit: { where: string; len: number; limit: number }[] = [];

  // 1) 가짜 정보 정규식 차단
  const cleaned = tpl.sections.map((s, idx) => walkText(s, (t) => stripFake(t, opts.allowedRaw, removed), `[${idx}:${s.type}]`));

  // 2) 카피 길이 검사 (위반 표시만 — 자르지 않음. 추후 재생성 신호)
  cleaned.forEach((s: any, idx: number) => {
    const where = `[${idx}:${s.type}]`;
    const check = (key: string, limit: number, v?: string) => {
      if (typeof v === 'string' && v.length > limit) overLimit.push({ where: `${where}.${key}`, len: v.length, limit });
    };
    if (s.type === 'hero') { check('title', COPY_LIMITS.heroTitle, s.title); check('sub', COPY_LIMITS.heroSub, s.sub); }
    if (s.type === 'banner') { check('head', COPY_LIMITS.bannerHead, s.head); check('sub', COPY_LIMITS.bannerSub, s.sub); }
    if (s.type === 'feature') { check('body', COPY_LIMITS.featureBody, s.body); }
    if (s.type === 'iconGrid') (s.items ?? []).forEach((it: any, i: number) => { check(`items[${i}].t`, COPY_LIMITS.iconItemT, it.t); check(`items[${i}].d`, COPY_LIMITS.iconItemD, it.d); });
    if (s.type === 'faq') (s.items ?? []).forEach((it: any, i: number) => { check(`items[${i}].q`, COPY_LIMITS.faqQ, it.q); check(`items[${i}].a`, COPY_LIMITS.faqA, it.a); });
    if (s.type === 'cards') (s.cards ?? []).forEach((c: any, i: number) => { check(`cards[${i}].t`, COPY_LIMITS.cardT, c.t); check(`cards[${i}].d`, COPY_LIMITS.cardD, c.d); });
  });

  // 3) 중복 문장 dedupe (한 페이지 내 동일 문장이 두 번 이상)
  const seen = new Map<string, number>();
  const deduped = cleaned.map((s) => walkText(s, (t) => {
    if (!t || t.length < 6) return t;
    const norm = t.replace(/\s+/g, ' ').trim();
    const n = (seen.get(norm) ?? 0) + 1;
    seen.set(norm, n);
    if (n > 1) { dedupedLines.push(norm); return ''; }   // 두 번째 등장부터 비움
    return t;
  }));

  const cutCountOk = deduped.length === opts.cutCount;

  return {
    template: { ...tpl, sections: deduped as Section[] },
    report: { cutCountOk, fakeRemoved: removed, dedupedLines, overLimit },
  };
}
