/** 디자인 엔진 CSS — 테마 변수 기반. 오트밀리 수준 마감(그림자·둥근카드·섹션배경·위계). */
export const CSS = `
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
@import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Jua&family=Noto+Serif+KR:wght@500;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
body{font-family:'Pretendard',sans-serif;background:#d8d8d8;word-break:keep-all;line-break:strict}
.page{width:var(--w,860px);margin:0 auto;background:var(--bg);color:var(--ink);overflow:hidden}
.sec{padding:62px 56px;position:relative}
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
.accent{color:var(--primary)} .h2.on .accent{color:var(--on-primary)}
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
.chip--line{background:#fff;color:var(--primary);border:1.5px solid var(--primary)}
.chip--on{background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.4)}
/* number badge */
.num{width:46px;height:46px;border-radius:50%;background:var(--primary);color:#fff;font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 14px rgba(0,0,0,.15)}
.num--sm{width:34px;height:34px;font-size:15px;flex:none}
.num--abs{position:absolute;top:-12px;left:-12px;border:3px solid #fff}
.sec--primary .num{background:#fff;color:var(--primary)}
.pdot{width:44px;height:44px;border-radius:50%;background:var(--light);color:var(--primary);font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto;border:1.5px solid var(--primary)}
/* hero */
.hero-img{margin:30px auto 0;max-width:560px;border-radius:28px;overflow:hidden;box-shadow:0 22px 46px rgba(0,0,0,.16)}
/* grids / cards */
.grid{display:flex;gap:18px;margin-top:32px}
.grid-1{justify-content:center}.grid-4>*,.grid-3>*,.grid-2>*{flex:1}
.card{background:#fff;border-radius:22px;padding:30px 22px;text-align:center;box-shadow:0 12px 30px rgba(0,0,0,.07)}
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
.igcell{background:#fff;border-radius:18px;padding:22px 12px;text-align:center;box-shadow:0 8px 22px rgba(0,0,0,.06)}
.igdot{width:54px;height:54px;border-radius:50%;background:var(--light);color:var(--primary);display:flex;align-items:center;justify-content:center;margin:0 auto 12px}
.igt{font-size:14px;font-weight:700;color:var(--ink);line-height:1.4}
.igd{font-size:12px;color:var(--sub);margin-top:6px;line-height:1.5}
/* check point */
.cp-title{display:inline-block;border:2px solid #fff;color:#fff;font-weight:800;font-size:22px;letter-spacing:3px;padding:10px 30px;border-radius:14px;margin:4px auto 26px}
.cp-title--ink{border-color:var(--primary);color:var(--primary)}
.checklist{list-style:none;max-width:560px;margin:0 auto;text-align:left}
.checklist li{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.12);border-radius:16px;padding:16px 20px;margin-bottom:12px;font-size:17px;font-weight:600;color:#fff}
/* steps */
.steps{margin-top:32px;display:flex;flex-direction:column;gap:24px}
.step{display:flex;align-items:center;gap:26px;background:#fff;border-radius:24px;padding:22px 26px;box-shadow:0 12px 30px rgba(0,0,0,.07)}
.step:nth-child(even){flex-direction:row-reverse;text-align:right}
.step-img{flex:none;width:150px;height:150px;position:relative}
.step-img .ph{height:150px;border-radius:50%}
.step-t{font-size:22px;font-weight:800;color:var(--primary);margin-bottom:8px}
.step-d{font-size:16px;color:var(--sub);line-height:1.7}
/* banner */
.banner{padding-top:70px;padding-bottom:70px}
/* stats */
.midimg{max-width:460px;margin:22px auto 0;border-radius:20px;overflow:hidden}
.stats{display:flex;gap:18px;justify-content:center;margin-top:26px;flex-wrap:wrap}
.statcell{background:#fff;border-radius:18px;padding:22px 26px;box-shadow:0 10px 26px rgba(0,0,0,.07);min-width:150px}
.statv{font-size:30px;font-weight:800;color:var(--primary)}
.statl{font-size:13px;color:var(--sub);margin-top:6px}
/* reviews */
.rcard{text-align:left}
.rstars{color:#ffb400;font-size:18px;letter-spacing:2px;margin-bottom:12px}
.rt{font-size:18px;font-weight:800;color:var(--ink);margin-bottom:10px;line-height:1.4}
.rd{font-size:14px;color:var(--sub);line-height:1.7;margin-bottom:14px}
.rwho{font-size:13px;color:var(--accent);font-weight:700}
/* spec */
.spectable{width:100%;max-width:620px;margin:24px auto 0;border-collapse:collapse;text-align:left;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 26px rgba(0,0,0,.06)}
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
/* images */
.fullimg{max-width:560px;margin:0 auto;border-radius:24px;overflow:hidden}
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
.ph{background:linear-gradient(135deg,var(--light),var(--light2));border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--accent);border:1px solid rgba(0,0,0,.05);min-height:120px}
.ph__icon{opacity:.55}.ph__label{font-size:14px;font-weight:700;text-align:center;padding:0 14px;color:var(--ink);opacity:.7}
.ph__tag{font-size:10px;letter-spacing:1px;opacity:.6;border:1px solid currentColor;border-radius:10px;padding:2px 9px}
.ph--round{border-radius:50%;aspect-ratio:1}
/* dividers */
.wavewrap{line-height:0}.wavewrap svg{display:block;width:100%}
`;

/** 웨이브 구분선 */
export function wave(w: number, top: string, bottom: string) {
  return `<div class="wavewrap" style="background:${top}"><svg viewBox="0 0 ${w} 46" preserveAspectRatio="none" width="${w}" height="46"><path d="M0,23 C${w * 0.2},48 ${w * 0.4},2 ${w * 0.55},22 C${w * 0.72},44 ${w * 0.88},6 ${w},25 L${w},46 L0,46 Z" fill="${bottom}"/></svg></div>`;
}
