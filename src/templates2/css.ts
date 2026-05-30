/** 디자인 엔진 CSS — 테마 변수 기반. 오트밀리 수준 마감(그림자·둥근카드·섹션배경·위계). */
export const CSS = `
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Jua&family=Noto+Serif+KR:wght@500;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
body{font-family:'Pretendard',sans-serif;background:#d8d8d8;word-break:keep-all;line-break:strict}
.page{width:var(--w,860px);margin:0 auto;background:var(--bg);color:var(--ink);overflow:hidden}
/* 진단#27: padding 3종 리듬 (sec-airy/normal/tight). 기본은 normal. */
.sec{padding:48px 56px;position:relative}
.sec--airy{padding:80px 56px}
.sec--tight{padding:24px 56px}
.sec--page{background:var(--bg)} .sec--light{background:var(--light)} .sec--light2{background:var(--light2)}
.sec--white{background:#fff} .sec--primary{background:var(--primary);color:var(--on-primary)} .sec--ink{background:var(--ink);color:#fff}
.t-center{text-align:center}
/* 타이포 */
.label{font-size:13px;letter-spacing:4px;font-weight:800;color:var(--accent);margin-bottom:14px}
.label--left{text-align:left} .label--on{color:var(--on-primary);opacity:.85}
.script{font-family:'Nanum Pen Script',cursive;font-size:34px;color:var(--primary);line-height:1;margin-bottom:6px}
.script--sm{font-size:30px;margin-top:4px}
.h1{font-family:'Jua',sans-serif;font-size:50px;line-height:1.15;letter-spacing:-1px}
.h2{font-size:33px;font-weight:800;line-height:1.32;letter-spacing:-1px}
.h2.big{font-size:42px}.h2.on{color:#fff}
.accent{color:var(--badge)} .h2.on .accent{color:var(--on-primary)}
.sub{font-size:18px;color:var(--sub);margin-top:14px;line-height:1.65;max-width:600px}
.t-center .sub{margin-left:auto;margin-right:auto}
.sub.on{color:var(--on-primary);opacity:.95}
.body{font-size:17px;line-height:1.8;color:var(--sub);margin-top:14px}
.body.t-center{max-width:600px;margin-left:auto;margin-right:auto}
.sec--primary .body,.sec--ink .body{color:var(--on-primary);opacity:.95}
.cap{font-size:13px;color:var(--sub);text-align:center;margin-top:14px}
/* chips */
.chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:24px}
.frow .chips,.ftext .chips{justify-content:flex-start}
.chip{font-size:14px;font-weight:700;padding:9px 18px;border-radius:999px;background:#fff;color:var(--accent);border:1px solid rgba(0,0,0,.08)}
.chip--line{background:var(--surface);color:var(--badge);border:1.5px solid var(--badge)}
.chip--on{background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.4)}
/* number badge */
/* 진단#22: POINT 원 88px 이상 보장. 내부 텍스트 ≥ 20px */
.num{width:88px;height:88px;border-radius:50%;background:var(--badge);color:#fff;font-weight:800;font-size:24px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(0,0,0,.18);flex:none}
.num--sm{width:48px;height:48px;font-size:18px;flex:none}
.num--abs{position:absolute;top:-14px;left:-14px;border:4px solid var(--surface);width:64px;height:64px;font-size:20px}
.sec--primary .num{background:#fff;color:var(--primary)}
.pdot{width:44px;height:44px;border-radius:50%;background:var(--light);color:var(--badge);font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto;border:1.5px solid var(--badge)}
/* hero */
.hero-img{margin:30px auto 0;max-width:560px;border-radius:28px;overflow:hidden;box-shadow:0 22px 46px rgba(0,0,0,.16)}
/* fullbleed hero — 풀폭 배경 사진 + 스크림 + 흰 텍스트 (첫 컷 임팩트) */
.sec--hero-full{padding:130px 56px 110px;position:relative;min-height:720px;background-size:cover;background-position:center;color:#fff;text-align:center;overflow:hidden}
/* 진단#1: Hero 가독성 — 사진 밝기에 따라 "글자 색"을 바꾼다(사진은 그대로 보존).
 * - 기본(어두운 사진): 흰 글자 + 약한 그라데이션 스크림
 * - .sec--hero-full--bright (밝은/흰 사진): 글자색을 진한 톤으로 자동 전환, 스크림 제거(사진 그대로) */
.sec--hero-full::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.35) 0%,rgba(0,0,0,.2) 40%,rgba(0,0,0,.55) 100%);pointer-events:none}
.hero-full-inner{position:relative;z-index:1;max-width:680px;margin:0 auto;display:flex;flex-direction:column;align-items:center;padding:0 24px}
.sec--hero-full .label{color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.7);margin-bottom:18px;letter-spacing:4px}
.sec--hero-full .script{color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.7);margin-bottom:8px}
.sec--hero-full .h1{color:#fff;text-shadow:0 4px 24px rgba(0,0,0,.85),0 1px 2px rgba(0,0,0,.6);font-size:62px;letter-spacing:-1.5px;font-weight:800}
.sec--hero-full .h1 .accent{color:#fff;opacity:.95;font-weight:700}
.sec--hero-full .sub{color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.7);margin-top:18px;max-width:560px;font-weight:500;font-size:16px}
/* bright 모드 — 사진 안 가리고 글자 색만 어둡게 (흰 베개 사진에 진한 ink 글자) */
.sec--hero-full--bright::before{background:none}
.sec--hero-full--bright .label{color:var(--ink);text-shadow:none;opacity:.85}
.sec--hero-full--bright .script{color:var(--ink);text-shadow:none}
.sec--hero-full--bright .h1{color:var(--ink);text-shadow:0 1px 2px rgba(255,255,255,.4);font-weight:800}
.sec--hero-full--bright .h1 .accent{color:var(--primary)}
.sec--hero-full--bright .sub{color:var(--ink);text-shadow:none;opacity:.78}
.sec--hero-full--bright .chip--on{background:rgba(255,255,255,.7);color:var(--ink);border-color:rgba(0,0,0,.15)}
.sec--hero-full .chips{margin-top:34px}
/* split hero — 좌 텍스트 / 우 사진 */
.hero-split{display:flex;gap:48px;align-items:center;text-align:left}
.hero-split-text{flex:1}
.hero-split-img{flex:1;max-width:420px}
.hero-split-img .ph{box-shadow:0 22px 46px rgba(0,0,0,.16);border-radius:28px}
/* grids / cards */
.grid{display:flex;gap:18px;margin-top:32px}
.grid-1{justify-content:center}.grid-4>*,.grid-3>*,.grid-2>*{flex:1}
.card{background:var(--surface);border-radius:22px;padding:30px 22px;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.12);border:1px solid var(--line)}
.sec--primary .card,.sec--ink .card{box-shadow:0 12px 30px rgba(0,0,0,.18)}
.card .num,.card .pdot{margin:0 auto 16px}
.card-t{font-size:19px;font-weight:800;color:var(--ink);margin-bottom:8px}
.card-d{font-size:14px;color:var(--sub);line-height:1.6}
/* feature row */
.frow{display:flex;align-items:center;gap:40px}
.frow.rev{flex-direction:row-reverse}
.fimg{flex:none;width:330px;position:relative}
.fimg .ph{box-shadow:0 18px 40px rgba(0,0,0,.16)}
.ftext{flex:1}
.watermark{position:absolute;top:-30px;left:10px;font-family:'Jua',sans-serif;font-size:120px;color:rgba(255,255,255,.8);z-index:2;text-shadow:0 2px 10px rgba(0,0,0,.12)}
.ftext .h2{margin-top:6px}
/* icon grid */
.iggrid{display:grid;gap:16px;margin-top:32px}
.igcell{background:var(--surface);border-radius:18px;padding:22px 12px;text-align:center;box-shadow:0 8px 22px rgba(0,0,0,.06)}
.igdot{width:54px;height:54px;border-radius:50%;background:var(--light);color:var(--badge);display:flex;align-items:center;justify-content:center;margin:0 auto 12px}
.igt{font-size:14px;font-weight:700;color:var(--ink);line-height:1.4}
.igd{font-size:12px;color:var(--sub);margin-top:6px;line-height:1.5}
/* check point */
.cp-title{display:inline-block;border:2px solid #fff;color:#fff;font-weight:800;font-size:22px;letter-spacing:3px;padding:10px 30px;border-radius:14px;margin:4px auto 26px}
.cp-title--ink{border-color:var(--primary);color:var(--primary)}
.checklist{list-style:none;max-width:560px;margin:0 auto;text-align:left}
.checklist li{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.12);border-radius:16px;padding:16px 20px;margin-bottom:12px;font-size:17px;font-weight:600;color:#fff}
/* steps */
.steps{margin-top:32px;display:flex;flex-direction:column;gap:24px}
.step{display:flex;align-items:center;gap:26px;background:var(--surface);border-radius:24px;padding:22px 26px;box-shadow:0 12px 30px rgba(0,0,0,.07)}
.step:nth-child(even){flex-direction:row-reverse;text-align:right}
.step-img{flex:none;width:150px;height:150px;position:relative}
.step-img .ph{height:150px;border-radius:50%}
.step-t{font-size:22px;font-weight:800;color:var(--badge);margin-bottom:8px}
.step-d{font-size:16px;color:var(--sub);line-height:1.7}
/* banner */
.banner{padding-top:70px;padding-bottom:70px}
/* stats */
.midimg{max-width:460px;margin:22px auto 0;border-radius:20px;overflow:hidden}
.stats{display:flex;gap:18px;justify-content:center;margin-top:26px;flex-wrap:wrap}
.statcell{background:var(--surface);border-radius:18px;padding:22px 26px;box-shadow:0 10px 26px rgba(0,0,0,.07);min-width:150px}
/* 진단#24: 숫자 강조 폰트가 본문 대비 2.2배 이하로 (이전 30px는 본문 17px의 1.76배 OK, 단 본문 14px+ 보장) */
.statv{font-size:32px;font-weight:800;color:var(--badge);line-height:1.1}
.statl{font-size:13px;color:var(--sub);margin-top:6px}
/* reviews — 진단#23: 가운데 정렬 */
.rcard{text-align:center}
.rstars{color:#ffb400;font-size:18px;letter-spacing:2px;margin-bottom:12px}
.rt{font-size:18px;font-weight:800;color:var(--ink);margin-bottom:10px;line-height:1.4}
.rd{font-size:14px;color:var(--sub);line-height:1.7;margin-bottom:14px}
.rwho{font-size:13px;color:var(--accent);font-weight:700}
/* spec */
.spectable{width:100%;max-width:620px;margin:24px auto 0;border-collapse:collapse;text-align:left;background:var(--surface);border-radius:16px;overflow:hidden;box-shadow:0 10px 26px rgba(0,0,0,.06);color:var(--ink)}
.spectable th,.spectable td{padding:15px 22px;font-size:15px;border-bottom:1px solid rgba(0,0,0,.06)}
.spectable th{width:130px;background:var(--light);color:var(--accent);font-weight:800}
.spectable tr:last-child th,.spectable tr:last-child td{border-bottom:none}
/* swatches */
.swgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:30px}
.swcell{display:flex;flex-direction:column;align-items:center;gap:10px}
.swdot{width:64px;height:64px;border-radius:50%;box-shadow:0 6px 16px rgba(0,0,0,.12)}
.swt{font-size:12px;font-weight:700;color:var(--ink)}
/* compare */
.compare{display:flex;gap:20px;margin-top:28px}.cmpbox{flex:1}
/* images — 풀폭 (사진 풍부하게 보이도록) */
.fullimg{width:100%;border-radius:18px;overflow:hidden}
.fullimg .ph{min-height:380px}
.roundwrap{width:300px;margin:0 auto}
.imgrow{display:flex;gap:18px}.imgcell{flex:1}
/* detail rows */
.dlist{margin-top:30px;display:flex;flex-direction:column;gap:22px}
.drow{display:flex;align-items:center;gap:26px}
.dimg{flex:none}
.dt{font-size:20px;font-weight:800;color:var(--ink);margin-bottom:8px}
.dd{font-size:15px;color:var(--sub);line-height:1.6}
/* cta */
.cta{padding:0;overflow:hidden}
.cta-bg{position:absolute;inset:0;opacity:.18}.cta-bg .ph{height:100%;border-radius:0}
.cta-inner{position:relative;padding:74px 56px}
.button{display:inline-block;margin-top:28px;background:#fff;color:var(--primary);font-size:22px;font-weight:800;padding:20px 60px;border-radius:999px;box-shadow:0 14px 34px rgba(0,0,0,.22)}
/* notice */
.noticelist{list-style:none;max-width:560px;margin:18px auto 0;text-align:left}
.noticelist li{font-size:14px;color:var(--sub);line-height:2;padding-left:18px;position:relative}
.noticelist li:before{content:'·';position:absolute;left:4px;color:var(--primary);font-weight:800}
/* 이미지 placeholder */
.ph{background:linear-gradient(135deg,var(--light),var(--light2));border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--accent);border:1px solid rgba(0,0,0,.05);min-height:120px;position:relative;overflow:hidden}
.ph__icon{opacity:.55}.ph__label{font-size:14px;font-weight:700;text-align:center;padding:0 14px;color:var(--ink);opacity:.7}
.ph__tag{font-size:10px;letter-spacing:1px;opacity:.6;border:1px solid currentColor;border-radius:10px;padding:2px 9px}
.ph--round{border-radius:50%;aspect-ratio:1}
.ph--rect{border-radius:0}
.ph--rounded{border-radius:20px}
.ph--circle{border-radius:50%;aspect-ratio:1}
.ph--blob{border-radius:48% 52% 60% 40% / 55% 45% 60% 50%}
/* 실사 채움: 그라데이션·라벨 숨기고 background-image 그대로 보이게 */
.ph--filled{background-size:cover;background-repeat:no-repeat;border:none}
.ph--filled .ph__icon,.ph--filled .ph__label,.ph--filled .ph__tag{display:none}
/* 풀블리드 위 글자 가독성용 스크림 (아래로 갈수록 어두워짐) */
.ph__scrim{position:absolute;inset:0;border-radius:inherit;pointer-events:none}
/* mediaRow — 3단(사진+제목+본문) 가로 카드 (시안 10번 생식/조리/단계 카드) */
.mr-card{background:var(--surface);border-radius:22px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.07)}
.mr-header{padding:18px 26px;text-align:left}
.mr-header--green{background:#3d4f3a;color:#fff}
.mr-header--yellow{background:#e7c97a;color:#3a2f15}
.mr-header--plain{background:var(--light);color:var(--ink)}
.mr-eyebrow{display:block;font-size:12px;letter-spacing:3px;font-weight:800;opacity:.82;margin-bottom:4px}
.mr-head{font-size:18px;font-weight:800}
.mr-list{padding:8px 14px 14px}
.mr-row{display:flex;gap:18px;align-items:center;padding:14px 12px;border-bottom:1px solid var(--line)}
.mr-row:last-child{border-bottom:none}
.mr-img{flex:none}.mr-img .ph{border-radius:12px}
.mr-txt{flex:1;text-align:left}
.mr-t{font-size:16px;font-weight:800;color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:8px}
.mr-t::before{content:'✓';color:var(--badge);font-weight:800}
.mr-d{font-size:13.5px;color:var(--sub);line-height:1.6}
/* rateTable — 등급 3행 표 (Light/Medium/Intense Fruity) */
.rt-table{margin-top:28px;border-radius:16px;overflow:hidden;border:1px solid var(--line);max-width:680px;margin-left:auto;margin-right:auto}
.rt-row{display:flex;align-items:stretch;border-bottom:1px solid var(--line);background:var(--surface)}
.rt-row:last-child{border-bottom:none}
.rt-row--hi{background:#fdf3c5}
.rt-lvl{flex:none;width:200px;padding:18px 20px;background:#3a342e;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
.rt-row--hi .rt-lvl{background:#8a6a2a}
.rt-lvl-kr{font-size:15px;font-weight:800}
.rt-lvl-en{font-size:11px;letter-spacing:1px;opacity:.75;margin-top:4px}
.rt-desc{flex:1;padding:18px 22px;font-size:14.5px;color:var(--ink);line-height:1.6;text-align:left;display:flex;align-items:center}
/* tablePair — 좌우 2개 표 */
.tp-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:24px}
.tp-col{background:var(--surface);border-radius:14px;overflow:hidden;box-shadow:0 8px 22px rgba(0,0,0,.06)}
.tp-title{background:var(--light);padding:12px 16px;font-size:13px;font-weight:800;color:var(--accent);letter-spacing:1px}
.tp-table{width:100%;border-collapse:collapse}
.tp-table th,.tp-table td{padding:11px 14px;font-size:12.5px;border-bottom:1px solid var(--line);text-align:left}
.tp-table th{width:100px;background:rgba(0,0,0,.02);color:var(--sub);font-weight:700}
.tp-table tr:last-child th,.tp-table tr:last-child td{border-bottom:none}
/* faq — 번호+질문+답 */
.faq-list{margin-top:24px;display:flex;flex-direction:column;gap:14px;max-width:680px;margin-left:auto;margin-right:auto;text-align:left}
.faq-row{background:var(--surface);border-radius:14px;padding:18px 22px;box-shadow:0 8px 22px rgba(0,0,0,.06)}
.sec--primary .faq-row,.sec--ink .faq-row{background:rgba(255,255,255,.06);box-shadow:none}
.faq-q{display:flex;align-items:center;gap:14px;margin-bottom:10px}
.faq-num{width:30px;height:30px;border-radius:50%;background:var(--badge);color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex:none}
.faq-qt{font-size:16px;font-weight:800;color:var(--ink)}
.sec--primary .faq-qt,.sec--ink .faq-qt{color:#fff}
.faq-a{font-size:14px;color:var(--sub);line-height:1.7;padding-left:44px}
.sec--primary .faq-a,.sec--ink .faq-a{color:rgba(255,255,255,.85)}
/* dividers */
.wavewrap{line-height:0}.wavewrap svg{display:block;width:100%}
`;

/** 웨이브 구분선 */
export function wave(w: number, top: string, bottom: string) {
  return `<div class="wavewrap" style="background:${top}"><svg viewBox="0 0 ${w} 46" preserveAspectRatio="none" width="${w}" height="46"><path d="M0,23 C${w * 0.2},48 ${w * 0.4},2 ${w * 0.55},22 C${w * 0.72},44 ${w * 0.88},6 ${w},25 L${w},46 L0,46 Z" fill="${bottom}"/></svg></div>`;
}
