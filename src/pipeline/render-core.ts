/**
 * 렌더 코어 — CLI와 웹 API 공유.
 * RenderSpec(CutSpec[]) → layout-v2 엔진으로 PNG 합성(+sharp 합본).
 * 포함: 톤 보정(#5), 아이콘 SVG 주입(#7), 로고 배치(#9).
 */
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename } from 'node:path';
import { chromium, type Browser } from 'playwright';
import sharp from 'sharp';
import type { RenderSpec, CutSpec } from '../core/schemas.ts';
import { buildCutV2, type CutRender } from '../lib/layout-v2.ts';
import { loadIconSvg } from '../lib/icons.ts';

type Ctx = { tone?: string; logo?: string };

const cache = new Map<string, string | undefined>();

function hexRgb(hex: string) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return { r: parseInt(n.slice(0, 2), 16), g: parseInt(n.slice(2, 4), 16), b: parseInt(n.slice(4, 6), 16) };
}

/** 파일 → dataURI. tone 지정 시 팔레트색을 soft-light 10%로 살짝 입혀 페이지와 어울리게(#5). */
async function dataUri(p?: string, tone?: string): Promise<string | undefined> {
  if (!p) return undefined;
  const key = `${p}|${tone ?? ''}`;
  if (cache.has(key)) return cache.get(key);
  if (!existsSync(p)) { cache.set(key, undefined); return undefined; }
  try {
    let img = sharp(await readFile(p), { failOn: 'none' });
    if (tone) {
      const m = await img.metadata();
      const w = m.width ?? 0, h = m.height ?? 0;
      if (w && h) {
        const { r, g, b } = hexRgb(tone);
        const ov = await sharp({ create: { width: w, height: h, channels: 4, background: { r, g, b, alpha: 0.1 } } }).png().toBuffer();
        img = sharp(await img.png().toBuffer()).composite([{ input: ov, blend: 'soft-light' }]).modulate({ saturation: 0.97 });
      }
    }
    const out = await img.png().toBuffer();
    const v = `data:image/png;base64,${out.toString('base64')}`;
    cache.set(key, v);
    return v;
  } catch {
    cache.set(key, undefined);
    return undefined;
  }
}

async function toRender(cut: CutSpec, ctx: Ctx): Promise<CutRender> {
  const out: any = { ...cut, imageDataUri: await dataUri(cut.image, ctx.tone) };
  if (cut.columns) {
    out.columns = await Promise.all(
      cut.columns.map(async (c: any) => ({
        ...c,
        imageDataUri: c.image ? await dataUri(c.image, ctx.tone) : undefined,
        iconSvg: c.icon ? await loadIconSvg(c.icon) : undefined,
      })),
    );
  }
  if ((cut.layout === 'hero' || cut.layout === 'cta') && ctx.logo) {
    out.logoDataUri = await dataUri(ctx.logo); // 로고는 톤 보정 제외
  }
  return out as CutRender;
}

async function shoot(browser: Browser, cut: CutSpec, ctx: Ctx, outPath: string, width: number) {
  const html = buildCutV2(await toRender(cut, ctx), width);
  const page = await browser.newPage({ viewport: { width, height: 1500 }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => (document as any).fonts.ready).catch(() => {});
  await page.waitForTimeout(400);
  await page.locator('#cut').screenshot({ path: outPath });
  await page.close();
}

function ctxOf(spec: RenderSpec): Ctx {
  return { tone: spec.sections[0]?.accent, logo: (spec as any).logo };
}

/** 전체(또는 일부) 컷 렌더 → outDir/NN.png. 반환: 파일 경로 목록. */
export async function renderSpec(spec: RenderSpec, outDir = 'output', opts: { stitch?: boolean } = {}): Promise<string[]> {
  await mkdir(outDir, { recursive: true });
  const W = spec.canvasWidth ?? 860;
  const ctx = ctxOf(spec);
  const browser = await chromium.launch();
  const files: string[] = [];
  try {
    for (const cut of spec.sections) {
      const out = `${outDir}/${basename(cut.outFile)}`;
      await shoot(browser, cut, ctx, out, W);
      files.push(out);
    }
  } finally {
    await browser.close();
  }
  if (opts.stitch !== false && files.length > 1) await stitch(files, `${outDir}/full-page.png`);
  return files;
}

/** 단일 컷 재렌더. */
export async function renderOne(spec: RenderSpec, index: number, outDir = 'output'): Promise<string> {
  const cut = spec.sections[index];
  if (!cut) throw new Error(`cut #${index} 없음`);
  const out = `${outDir}/${basename(cut.outFile)}`;
  const browser = await chromium.launch();
  try {
    await shoot(browser, cut, ctxOf(spec), out, spec.canvasWidth ?? 860);
  } finally {
    await browser.close();
  }
  return out;
}

async function stitch(files: string[], outPath: string) {
  const metas = await Promise.all(files.map((f) => sharp(f).metadata()));
  const w = Math.max(...metas.map((m) => m.width ?? 0));
  const h = metas.reduce((s, m) => s + (m.height ?? 0), 0);
  let top = 0;
  const comp = files.map((f, i) => {
    const c = { input: f, top, left: 0 };
    top += metas[i].height ?? 0;
    return c;
  });
  await sharp({ create: { width: w, height: h, channels: 4, background: '#ffffff' } })
    .composite(comp).png().toFile(outPath);
}
