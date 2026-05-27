/* 떡볶이 상세페이지 — 식품1(그래놀라) 레퍼런스 스타일 재현. Figma 플러그인.
   레드+크림 팔레트, 영문 대문자 섹션 라벨 + 손글씨 악센트, 빨간 번호 원, 재료 원형,
   둥근 사진 카드, 크림↔레드 배경 전환. 전부 편집 가능한 레이어.
   ({{IMG}} 에 제품 이미지 base64 주입) */
const IMG_B64 = "{{IMG}}";

const C = {
  cream: { r: 0.96, g: 0.92, b: 0.85 },
  cream2: { r: 0.99, g: 0.95, b: 0.88 },
  red: { r: 0.75, g: 0.22, b: 0.17 },
  redDeep: { r: 0.64, g: 0.16, b: 0.12 },
  kraft: { r: 0.69, g: 0.49, b: 0.31 },
  ink: { r: 0.24, g: 0.15, b: 0.11 },
  sub: { r: 0.45, g: 0.36, b: 0.30 },
  white: { r: 1, g: 1, b: 1 },
  creamOnRed: { r: 0.98, g: 0.93, b: 0.84 },
};
const solid = (c) => [{ type: "SOLID", color: c }];

function b64ToBytes(b64) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const lk = new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) lk[chars.charCodeAt(i)] = i;
  const s = b64.replace(/[^A-Za-z0-9+/=]/g, "");
  let len = s.length, outLen = (len * 3) >> 2;
  if (s[len - 1] === "=") outLen--;
  if (s[len - 2] === "=") outLen--;
  const out = new Uint8Array(outLen);
  let p = 0;
  for (let i = 0; i < len; i += 4) {
    const a = lk[s.charCodeAt(i)], b = lk[s.charCodeAt(i + 1)], c = lk[s.charCodeAt(i + 2)], d = lk[s.charCodeAt(i + 3)];
    if (p < outLen) out[p++] = (a << 2) | (b >> 4);
    if (p < outLen) out[p++] = ((b & 15) << 4) | (c >> 2);
    if (p < outLen) out[p++] = ((c & 3) << 6) | (d & 63);
  }
  return out;
}
const withTimeout = (pr, ms) => Promise.race([pr, new Promise((_, rej) => setTimeout(() => rej(new Error("font timeout")), ms))]);

async function pickFamily(cands) {
  for (const f of cands) {
    try {
      await withTimeout(figma.loadFontAsync({ family: f, style: "Bold" }), 4000);
      await withTimeout(figma.loadFontAsync({ family: f, style: "Regular" }), 4000);
      return f;
    } catch (e) {}
  }
  return "Inter";
}
async function pickScript(fallback) {
  for (const f of ["Nanum Pen Script", "Gaegu", "Nanum Brush Script"]) {
    try { await withTimeout(figma.loadFontAsync({ family: f, style: "Regular" }), 4000); return f; } catch (e) {}
  }
  return fallback;
}

async function build() {
  const BODY = await pickFamily(["Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", "Spoqa Han Sans Neo", "Inter"]);
  const SCRIPT = await pickScript(BODY);
  const W = 1200;
  let img = null;
  try { img = figma.createImage(b64ToBytes(IMG_B64)); } catch (e) { img = null; }

  const page = figma.createFrame();
  page.name = "떡볶이 상세페이지 (식품1 스타일)";
  page.resize(W, 100); page.fills = solid(C.cream); page.clipsContent = true;
  let Y = 0;

  function txt(parent, str, size, color, opt) {
    opt = opt || {};
    const t = figma.createText();
    t.fontName = { family: opt.script ? SCRIPT : BODY, style: opt.bold ? "Bold" : "Regular" };
    t.fontSize = size; t.characters = str; t.fills = solid(color);
    t.lineHeight = { value: Math.round(size * (opt.lh || 1.32)), unit: "PIXELS" };
    if (opt.spacing) t.letterSpacing = { value: opt.spacing, unit: "PIXELS" };
    t.textAutoResize = "HEIGHT";
    if (opt.w) t.resize(opt.w, t.height);
    if (opt.align) t.textAlignHorizontal = opt.align;
    parent.appendChild(t);
    return t;
  }
  function sect(name, h, bg) {
    const f = figma.createFrame(); f.name = name; f.resize(W, h); f.fills = solid(bg); f.clipsContent = true;
    page.appendChild(f); f.x = 0; f.y = Y; Y += h; return f;
  }
  function card(parent, w, h, r, fillImg) {
    const x = figma.createRectangle(); x.resize(w, h); x.cornerRadius = r || 0;
    if (fillImg && img) x.fills = [{ type: "IMAGE", imageHash: img.hash, scaleMode: "FILL" }];
    else x.fills = solid(C.kraft);
    parent.appendChild(x); return x;
  }
  function circle(parent, label, d, bg, fg, fs) {
    const f = figma.createFrame(); f.resize(d, d); f.cornerRadius = d / 2; f.fills = solid(bg); f.name = "num " + label;
    parent.appendChild(f);
    const t = figma.createText(); t.fontName = { family: BODY, style: "Bold" }; t.fontSize = fs || Math.round(d * 0.4);
    t.characters = label; t.fills = solid(fg); t.textAutoResize = "HEIGHT"; t.resize(d, t.height); t.textAlignHorizontal = "CENTER";
    f.appendChild(t); t.x = 0; t.y = Math.round((d - t.height) / 2);
    return f;
  }
  const cx = (n, p) => { n.x = Math.round((p.width - n.width) / 2); };
  // 영문 라벨 + 손글씨 악센트 + 한글 제목 묶음 (가운데)
  function header(s, scriptStr, capStr, korStr, y, accentColor) {
    const sc = txt(s, scriptStr, 40, accentColor, { script: true, w: W - 160, align: "CENTER" }); cx(sc, s); sc.y = y;
    const cap = txt(s, capStr, 34, accentColor, { bold: true, w: W - 160, align: "CENTER", spacing: 2 }); cx(cap, s); cap.y = sc.y + sc.height + 4;
    let endY = cap.y + cap.height;
    if (korStr) { const k = txt(s, korStr, 26, C.sub, { w: W - 200, align: "CENTER" }); cx(k, s); k.y = endY + 12; endY = k.y + k.height; }
    return endY;
  }

  // 01 HERO (cream)
  {
    const s = sect("01 히어로", 1120, C.cream);
    const sc = txt(s, "진하게, 매콤하게", 44, C.red, { script: true, w: W - 160, align: "CENTER" }); cx(sc, s); sc.y = 90;
    const h = txt(s, "불맛 가득\n국물 떡볶이", 78, C.red, { bold: true, w: W - 160, align: "CENTER", lh: 1.2 }); cx(h, s); h.y = sc.y + sc.height + 6;
    const cap = txt(s, "SIGNATURE TTEOKBOKKI", 22, C.kraft, { bold: true, w: W - 160, align: "CENTER", spacing: 3 }); cx(cap, s); cap.y = h.y + h.height + 14;
    const p = card(s, 760, 560, 28, true); cx(p, s); p.y = cap.y + cap.height + 44;
  }
  // 02 WHEN TO EAT (cream2)
  {
    const s = sect("02 WHEN TO EAT", 760, C.cream2);
    const endY = header(s, "언제 먹어도 좋아요", "WHEN TO EAT?", "", 80, C.red);
    const items = [["01", "야식으로", "출출한 밤, 5분이면 매콤한 한 끼"], ["02", "혼술 안주로", "맥주 한 캔과 환상의 궁합"], ["03", "비 오는 날", "따끈한 국물로 기분 전환"]];
    const colW = 330, gap = 36, total = colW * 3 + gap * 2, startX = (W - total) / 2, rowY = endY + 50;
    items.forEach((it, i) => {
      const x = startX + i * (colW + gap);
      const cir = circle(s, it[0], 64, C.red, C.white, 26); cir.x = x + (colW - 64) / 2; cir.y = rowY;
      const t1 = txt(s, it[1], 28, C.ink, { bold: true, w: colW, align: "CENTER" }); t1.x = x; t1.y = rowY + 84;
      const t2 = txt(s, it[2], 19, C.sub, { w: colW, align: "CENTER" }); t2.x = x; t2.y = rowY + 130;
    });
  }
  // 03 INGREDIENTS (red)
  {
    const s = sect("03 INGREDIENTS", 660, C.red);
    const sc = txt(s, "좋은 재료만", 40, C.creamOnRed, { script: true, w: W - 160, align: "CENTER" }); cx(sc, s); sc.y = 80;
    const cap = txt(s, "INGREDIENTS", 34, C.white, { bold: true, w: W - 160, align: "CENTER", spacing: 2 }); cx(cap, s); cap.y = sc.y + sc.height + 4;
    const ings = ["국내산 쌀떡", "쫄깃 어묵", "직화 불맛양념", "신선한 대파"];
    const d = 180, gap = 34, total = d * 4 + gap * 3, startX = (W - total) / 2, rowY = cap.y + cap.height + 60;
    ings.forEach((nm, i) => {
      const x = startX + i * (d + gap);
      const c = figma.createFrame(); c.resize(d, d); c.cornerRadius = d / 2; c.fills = solid(C.cream); s.appendChild(c); c.x = x; c.y = rowY;
      const lab = txt(s, nm, 21, C.white, { bold: true, w: d + 20, align: "CENTER" }); lab.x = x - 10; lab.y = rowY + d + 18;
    });
  }
  // 04 CHECK POINT (redDeep)
  {
    const s = sect("04 CHECK POINT", 700, C.redDeep);
    const sc = txt(s, "이건 꼭 확인하세요", 38, C.creamOnRed, { script: true, w: W - 160, align: "CENTER" }); cx(sc, s); sc.y = 70;
    const cap = txt(s, "CHECK POINT", 34, C.white, { bold: true, w: W - 160, align: "CENTER", spacing: 2 }); cx(cap, s); cap.y = sc.y + sc.height + 4;
    const pts = ["국내산 쌀떡으로 쫄깃하게", "직화로 낸 진한 불맛 양념", "전자레인지 5분, 초간단 조리", "평일 2시 이전 주문 시 당일출고"];
    const listW = 720, x0 = (W - listW) / 2; let y = cap.y + cap.height + 50;
    pts.forEach((p, i) => {
      const cir = circle(s, String(i + 1).padStart(2, "0"), 52, C.cream, C.red, 22); cir.x = x0; cir.y = y;
      const t = txt(s, p, 25, C.white, { bold: true, w: listW - 80 }); t.x = x0 + 76; t.y = y + 12;
      y += 78;
    });
  }
  // 05 HOW TO EAT (cream)
  {
    const s = sect("05 HOW TO EAT", 900, C.cream);
    const endY = header(s, "어떻게 먹나요?", "HOW TO EAT?", "", 80, C.red);
    const steps = [["1", "끓는 물에", "소스와 떡을 넣어주세요"], ["2", "5분간", "중불로 자글자글"], ["3", "완성!", "대파 올리면 끝"]];
    const colW = 340, gap = 30, total = colW * 3 + gap * 2, startX = (W - total) / 2, rowY = endY + 40;
    steps.forEach((st, i) => {
      const x = startX + i * (colW + gap);
      const p = card(s, colW, 240, 20, true); p.x = x; p.y = rowY;
      const cir = circle(s, st[0], 60, C.red, C.white, 28); cir.x = x + 16; cir.y = rowY + 16;
      const t1 = txt(s, st[1], 27, C.ink, { bold: true, w: colW, align: "CENTER" }); t1.x = x; t1.y = rowY + 262;
      const t2 = txt(s, st[2], 19, C.sub, { w: colW, align: "CENTER" }); t2.x = x; t2.y = rowY + 304;
    });
  }
  // 06 제품 상세 / CTA (cream2)
  {
    const s = sect("06 CTA", 720, C.cream2);
    const sc = txt(s, "지금, 매콤하게", 44, C.red, { script: true, w: W - 160, align: "CENTER" }); cx(sc, s); sc.y = 70;
    const h = txt(s, "오늘 저녁, 떡볶이 어떠세요?", 42, C.ink, { bold: true, w: W - 160, align: "CENTER" }); cx(h, s); h.y = sc.y + sc.height + 8;
    const p = card(s, 560, 330, 24, true); cx(p, s); p.y = h.y + h.height + 30;
    const btn = figma.createFrame(); btn.layoutMode = "HORIZONTAL"; btn.primaryAxisSizingMode = "AUTO"; btn.counterAxisSizingMode = "AUTO";
    btn.paddingLeft = btn.paddingRight = 48; btn.paddingTop = btn.paddingBottom = 20; btn.cornerRadius = 999; btn.fills = solid(C.red); s.appendChild(btn);
    const bt = txt(btn, "구매하러 가기", 26, C.white, { bold: true }); cx(btn, s); btn.y = p.y + p.height + 34;
  }

  page.resize(W, Y);
  figma.currentPage.appendChild(page);
  figma.currentPage.selection = [page];
  figma.viewport.scrollAndZoomIntoView([page]);
  return { BODY, SCRIPT };
}

build()
  .then((r) => {
    const w = r.BODY === "Inter" ? " (한글 폰트 폴백 — □로 보이면 알려주세요)" : "";
    figma.closePlugin("✅ 식품1 스타일 6섹션 생성 완료 (폰트: " + r.BODY + " / 손글씨: " + r.SCRIPT + ")." + w);
  })
  .catch((e) => {
    const m = e && e.message ? e.message : String(e);
    try { figma.notify("오류: " + m); } catch (_) {}
    figma.closePlugin("플러그인 오류: " + m);
  });
