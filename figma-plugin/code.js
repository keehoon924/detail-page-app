/* 식품1(그래놀라) 스타일 재현 — 3열 레드+크림 상세페이지. Figma 플러그인.
   색: 레드 #d50001 / 크림 #f8ece1 / 크라프트 #a76743 (레퍼런스 픽셀 샘플).
   구조: 히어로 + WHEN TO EAT(넘버링) + INGREDIENTS(원형) + CHECK POINT(레드) + 제품 라인업(그리드) + HOW TO EAT(스텝).
   ▸ 텍스트는 CONFIG에서, 사진은 'IMG 슬롯' 레이어에 채워 교체. (카피는 샘플 — 자유 교체) */

const CONFIG = {
  brand: "SIGNATURE GRANOLA",
  columns: [
    [
      { type: "hero", script: "매일 건강한 한 끼", titleKo: "시그니처\n그래놀라", titleEn: "SIGNATURE GRANOLA", img: "제품 용기 컷", imgH: 300 },
      { type: "photo", img: "그래놀라 한 그릇", imgH: 300 },
      { type: "ingredients", script: "좋은 재료만 담았어요", cap: "INGREDIENTS", items: ["국산 귀리", "통견과류", "건과일", "꿀"] },
      { type: "checkpoint", cap: "CHECK POINT", points: ["국산 귀리로 만든 든든한 한 끼", "인공첨가물 없이 정직하게", "바삭한 식감 그대로 로스팅", "주문 후 당일 로스팅·발송"] },
    ],
    [
      { type: "numbered", script: "언제 먹어도 좋아요", cap: "WHEN TO EAT?", items: [["01", "아침으로", "우유·요거트와 간편하게"], ["02", "간식으로", "출출할 때 한 줌"], ["03", "운동 후", "든든한 단백질 보충"]] },
      { type: "photo", img: "우유에 말아먹는 컷", imgH: 320 },
      { type: "friends", script: "다양하게 즐기세요", cap: "제품 라인업", items: ["오리지널", "초코", "베리", "넛츠"] },
    ],
    [
      { type: "numbered", script: "어떻게 먹나요?", cap: "HOW TO EAT?", red: true, items: [["1", "요거트에", "그릭요거트와 한 스푼"], ["2", "우유에", "시리얼처럼 부어서"], ["3", "그대로", "바삭하게 한 줌"]] },
      { type: "photo", img: "디테일 클로즈업", imgH: 360 },
      { type: "footer", script: "제품 상세 정보" },
    ],
  ],
};

const C = {
  red: { r: 0.835, g: 0.0, b: 0.004 },
  redDeep: { r: 0.69, g: 0.0, b: 0.0 },
  cream: { r: 0.973, g: 0.925, b: 0.882 },
  cream2: { r: 0.95, g: 0.90, b: 0.84 },
  kraft: { r: 0.655, g: 0.404, b: 0.263 },
  white: { r: 0.996, g: 0.984, b: 0.965 },
  ink: { r: 0.20, g: 0.14, b: 0.10 },
  sub: { r: 0.47, g: 0.40, b: 0.33 },
  onRed: { r: 0.98, g: 0.94, b: 0.88 },
};
const solid = (c) => [{ type: "SOLID", color: c }];
const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("font timeout")), ms))]);
async function pickFamily(cands) {
  for (const f of cands) { try { await withTimeout(figma.loadFontAsync({ family: f, style: "Bold" }), 4000); await withTimeout(figma.loadFontAsync({ family: f, style: "Regular" }), 4000); return f; } catch (e) {} }
  return "Inter";
}
async function pickScript(fb) { for (const f of ["Nanum Pen Script", "Gaegu", "Nanum Brush Script"]) { try { await withTimeout(figma.loadFontAsync({ family: f, style: "Regular" }), 4000); return f; } catch (e) {} } return fb; }

async function build() {
  const F = await pickFamily(["Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", "Spoqa Han Sans Neo", "Inter"]);
  const S = await pickScript(F);
  const PAD = 40, COLW = 360, COLGAP = 24;
  const W = PAD * 2 + COLW * 3 + COLGAP * 2;
  const page = figma.createFrame(); page.name = "그래놀라 상세페이지 (식품1 스타일)"; page.resize(W, 100); page.fills = solid(C.cream2); page.clipsContent = true;

  function txt(parent, str, size, color, o) {
    o = o || {}; const t = figma.createText();
    t.fontName = { family: o.script ? S : F, style: o.bold ? "Bold" : "Regular" };
    t.fontSize = size; t.characters = str; t.fills = solid(color);
    t.lineHeight = { value: Math.round(size * (o.lh || 1.32)), unit: "PIXELS" };
    if (o.spacing) t.letterSpacing = { value: o.spacing, unit: "PIXELS" };
    t.textAutoResize = "HEIGHT"; if (o.w) t.resize(o.w, t.height); if (o.align) t.textAlignHorizontal = o.align;
    parent.appendChild(t); return t;
  }
  function rrect(p, w, h, r, fill) { const x = figma.createRectangle(); x.resize(w, h); x.cornerRadius = r; x.fills = solid(fill); p.appendChild(x); return x; }
  function circle(p, label, d, bg, fg, fs) {
    const f = figma.createFrame(); f.resize(d, d); f.cornerRadius = d / 2; f.fills = solid(bg); f.name = "num " + label; p.appendChild(f);
    const t = figma.createText(); t.fontName = { family: F, style: "Bold" }; t.fontSize = fs || Math.round(d * 0.42); t.characters = label; t.fills = solid(fg);
    t.textAutoResize = "HEIGHT"; t.resize(d, t.height); t.textAlignHorizontal = "CENTER"; f.appendChild(t); t.x = 0; t.y = Math.round((d - t.height) / 2); return f;
  }
  function slot(p, w, h, label, fill) {
    const f = figma.createFrame(); f.name = "IMG 슬롯: " + label; f.resize(w, h); f.cornerRadius = 16; f.fills = solid(fill || C.kraft); f.clipsContent = true; p.appendChild(f);
    const t = txt(f, label + "\n(사진)", 15, fill ? C.sub : C.onRed, { w: w - 20, align: "CENTER", lh: 1.5 }); t.x = 10; t.y = Math.round((h - t.height) / 2); return f;
  }
  const cxC = (n) => { n.x = Math.round((COLW - n.width) / 2); };

  // 섹션 헤더(스크립트 + 캡스) — 색 지정
  function head(card, cfg, y, capColor) {
    if (cfg.script) { const sc = txt(card, cfg.script, 32, capColor, { script: true, w: COLW - 48, align: "CENTER" }); cxC(sc); sc.y = y; y = sc.y + sc.height + 2; }
    const cap = txt(card, cfg.cap, 28, capColor, { bold: true, w: COLW - 48, align: "CENTER", spacing: 1.5 }); cxC(cap); cap.y = y; return cap.y + cap.height;
  }

  function renderCard(x, y, cfg) {
    let bg = C.white, dark = false;
    if (cfg.type === "checkpoint" || cfg.type === "friends") { bg = C.red; dark = true; }
    if (cfg.type === "ingredients") bg = C.cream;
    if (cfg.type === "numbered") bg = cfg.red ? C.cream : C.white;
    if (cfg.type === "photo") bg = C.cream;
    if (cfg.type === "footer") bg = C.cream;
    const titleCol = dark ? C.onRed : C.red, capCol = dark ? C.white : C.red, bodyCol = dark ? C.onRed : C.sub, inkCol = dark ? C.white : C.ink;
    const card = figma.createFrame(); card.name = cfg.cap || cfg.type; card.resize(COLW, 120); card.cornerRadius = 22; card.fills = solid(bg); card.clipsContent = true;
    page.appendChild(card); card.x = x; card.y = y;
    const iw = COLW - 48; let cy = 30;

    if (cfg.type === "hero") {
      const sc = txt(card, cfg.script, 34, C.red, { script: true, w: iw, align: "CENTER" }); cxC(sc); sc.y = cy; cy += sc.height + 4;
      const tk = txt(card, cfg.titleKo, 40, C.red, { bold: true, w: iw, align: "CENTER", lh: 1.2 }); cxC(tk); tk.y = cy; cy += tk.height + 8;
      const te = txt(card, cfg.titleEn, 16, C.kraft, { bold: true, w: iw, align: "CENTER", spacing: 2 }); cxC(te); te.y = cy; cy += te.height + 22;
      const s = slot(card, iw, cfg.imgH || 300, cfg.img, C.cream2); cxC(s); s.y = cy; cy += s.height + 16;
    } else if (cfg.type === "photo") {
      const s = slot(card, iw, cfg.imgH || 300, cfg.img, C.cream); s.x = 24; s.y = 24; cy = 24 + (cfg.imgH || 300) + 0;
    } else if (cfg.type === "footer") {
      const sc = txt(card, cfg.script, 36, C.red, { script: true, w: iw, align: "CENTER" }); cxC(sc); sc.y = 40; cy = sc.y + sc.height;
    } else if (cfg.type === "ingredients") {
      cy = head(card, cfg, cy, capCol) + 30;
      const items = cfg.items, d = 110, perRow = 2, gap = 28;
      items.forEach((nm, i) => {
        const col = i % perRow, row = Math.floor(i / perRow);
        const totalW = d * perRow + gap, sx = (COLW - totalW) / 2 + col * (d + gap), sy = cy + row * (d + 50);
        const c = figma.createFrame(); c.resize(d, d); c.cornerRadius = d / 2; c.fills = solid(C.white); page.appendChild(card); card.appendChild(c); c.x = sx; c.y = sy;
        const lab = txt(card, nm, 18, C.ink, { bold: true, w: d + 24, align: "CENTER" }); lab.x = sx - 12; lab.y = sy + d + 8;
      });
      cy += Math.ceil(items.length / perRow) * (d + 50) + 10;
    } else if (cfg.type === "checkpoint") {
      cy = head(card, cfg, cy, capCol) + 26;
      cfg.points.forEach((p, i) => {
        const c = circle(card, String(i + 1).padStart(2, "0"), 46, C.white, C.red, 19); c.x = 28; c.y = cy;
        const t = txt(card, p, 20, C.onRed, { bold: true, w: iw - 64 }); t.x = 90; t.y = cy + 11; cy += Math.max(46, t.height) + 22;
      });
      cy += 4;
    } else if (cfg.type === "friends") {
      cy = head(card, cfg, cy, capCol) + 26;
      const items = cfg.items, cw = (iw - 16) / 2, chh = 120;
      items.forEach((nm, i) => {
        const col = i % 2, row = Math.floor(i / 2), sx = 24 + col * (cw + 16), sy = cy + row * (chh + 16);
        const c = figma.createFrame(); c.resize(cw, chh); c.cornerRadius = 14; c.fills = solid(C.redDeep); card.appendChild(c); c.x = sx; c.y = sy;
        const t = txt(c, nm, 22, C.onRed, { bold: true, w: cw, align: "CENTER" }); t.x = 0; t.y = Math.round((chh - t.height) / 2);
      });
      cy += Math.ceil(items.length / 2) * (chh + 16) + 6;
    } else if (cfg.type === "numbered") {
      cy = head(card, cfg, cy, capCol) + 26;
      cfg.items.forEach((it) => {
        const c = circle(card, it[0], 54, C.red, C.white, 22); c.x = 30; c.y = cy;
        const t1 = txt(card, it[1], 24, inkCol, { bold: true, w: iw - 80 }); t1.x = 100; t1.y = cy + 4;
        const t2 = txt(card, it[2], 17, bodyCol, { w: iw - 80, lh: 1.4 }); t2.x = 100; t2.y = cy + 36;
        cy += Math.max(60, 36 + t2.height) + 18;
      });
      cy += 4;
    }
    card.resize(COLW, cy + 24);
    return cy + 24;
  }

  const bm = txt(page, CONFIG.brand, 18, C.red, { bold: true, spacing: 2 }); bm.x = PAD; bm.y = 20;

  let maxY = 0;
  CONFIG.columns.forEach((col, ci) => {
    const x = PAD + ci * (COLW + COLGAP);
    let y = 64 + (ci === 1 ? 30 : ci === 2 ? 10 : 0);
    col.forEach((c) => { const h = renderCard(x, y, c); y += h + 22; });
    if (y > maxY) maxY = y;
  });
  page.resize(W, maxY + PAD);
  figma.currentPage.appendChild(page);
  figma.currentPage.selection = [page];
  figma.viewport.scrollAndZoomIntoView([page]);
  return { F, S };
}

build()
  .then((r) => {
    const w = r.F === "Inter" ? " (한글 폰트 폴백 — □면 알려주세요)" : "";
    figma.closePlugin("✅ 식품1 스타일 그래놀라 상세페이지 생성 완료 (폰트 " + r.F + " / 손글씨 " + r.S + "). 색=레드#d50001·크림#f8ece1." + w);
  })
  .catch((e) => { const m = e && e.message ? e.message : String(e); try { figma.notify("오류: " + m); } catch (_) {} figma.closePlugin("플러그인 오류: " + m); });
