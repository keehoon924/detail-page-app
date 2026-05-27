/** Figma 플러그인 런타임(JS 문자열). build.ts 가 `const TEMPLATES=[...]` 뒤에 이어붙여 code.js 생성. */
export const RUNTIME = String.raw`
function hexRgb(hex){
  if(!hex) return {r:0,g:0,b:0};
  var h = hex.replace('#','');
  if(h.length===3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  var n = parseInt(h,16);
  return { r:((n>>16)&255)/255, g:((n>>8)&255)/255, b:(n&255)/255 };
}
function solid(hex,opacity){ var c=hexRgb(hex); var p={type:'SOLID',color:c}; if(opacity!=null)p.opacity=opacity; return [p]; }
// 선형 그라데이션 fill (스크림 등). angle: CSS식 deg(180=위→아래).
function linGrad(from,to,angle,fromA,toA){
  var rad=((angle==null?180:angle))*Math.PI/180;
  var cos=Math.cos(rad), sin=Math.sin(rad);
  var transform=[[cos, sin, 0.5-0.5*cos-0.5*sin],[-sin, cos, 0.5+0.5*sin-0.5*cos]];
  var f=hexRgb(from), t=hexRgb(to);
  return {type:'GRADIENT_LINEAR', gradientTransform:transform, gradientStops:[
    {position:0,color:{r:f.r,g:f.g,b:f.b,a:(fromA!=null?fromA:1)}},
    {position:1,color:{r:t.r,g:t.g,b:t.b,a:(toA!=null?toA:1)}} ]};
}
function withTimeout(p,ms){ return Promise.race([p, new Promise(function(_,rej){ setTimeout(function(){rej(new Error('timeout'))},ms) })]); }

var SANS = ['Pretendard','Pretendard JP','Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic','Spoqa Han Sans Neo','Inter','Roboto'];
var SCRIPT = ['Nanum Pen Script','Gaegu','Nanum Brush Script','Hi Melody'];
var SERIF = ['Noto Serif KR','Nanum Myeongjo','Apple SD Gothic Neo'];
var STYLES = ['Regular','Medium','SemiBold','Bold'];

async function loadFamily(cands){
  for(var i=0;i<cands.length;i++){
    var fam=cands[i];
    try{
      await withTimeout(figma.loadFontAsync({family:fam,style:'Regular'}),3500);
      var avail={Regular:true};
      for(var s=1;s<STYLES.length;s++){
        try{ await withTimeout(figma.loadFontAsync({family:fam,style:STYLES[s]}),2500); avail[STYLES[s]]=true; }catch(e){}
      }
      return {family:fam,avail:avail};
    }catch(e){}
  }
  return null;
}
function pickStyle(font,weight){
  var a=font.avail;
  if(weight>=700) return a.Bold?'Bold':(a.SemiBold?'SemiBold':'Regular');
  if(weight>=600) return a.SemiBold?'SemiBold':(a.Bold?'Bold':(a.Medium?'Medium':'Regular'));
  if(weight>=500) return a.Medium?'Medium':'Regular';
  return 'Regular';
}

async function build(){
  var fonts={
    sans: await loadFamily(SANS),
    script: await loadFamily(SCRIPT),
    serif: await loadFamily(SERIF),
  };
  if(!fonts.sans) fonts.sans = {family:'Inter',avail:{Regular:true}};
  if(!fonts.script) fonts.script = fonts.sans;
  if(!fonts.serif) fonts.serif = fonts.sans;

  var pages=[];
  var cursorX=0;
  for(var ti=0; ti<TEMPLATES.length; ti++){
    var T=TEMPLATES[ti];
    var frame=figma.createFrame();
    frame.name=T.category+' / '+T.id;
    frame.resize(T.w, T.h);
    frame.x=cursorX; frame.y=0;
    frame.fills=solid(T.bg);
    frame.clipsContent=true;
    cursorX += T.w + 140;
    pages.push(frame);

    for(var bi=0; bi<T.blocks.length; bi++){
      var b=T.blocks[bi];
      var node=null;
      if(b.t==='photo'){
        if(b.shape==='circle'){ node=figma.createEllipse(); }
        else { node=figma.createRectangle(); node.cornerRadius=(b.radius||12); }
        node.resize(b.w, b.h||40);
        if(b.b64){
          try{
            var im=figma.createImage(figma.base64Decode(b.b64));
            var fillsArr=[{type:'IMAGE', scaleMode:(b.fit==='contain'?'FIT':'FILL'), imageHash:im.hash}];
            if(b.overlay){ var oc=hexRgb(b.overlay); fillsArr.push({type:'SOLID',color:oc,opacity:(b.overlayOpacity!=null?b.overlayOpacity:0.35)}); }
            node.fills=fillsArr;
          }catch(e){ node.fills=solid('#edeae4'); node.strokes=solid('#d9d4ca'); node.strokeWeight=1; }
        } else {
          node.fills=solid('#edeae4');
          node.strokes=solid('#d9d4ca'); node.strokeWeight=1;
        }
      } else if(b.t==='rect'){
        node=figma.createRectangle();
        node.resize(b.w, b.h||40);
        if(b.grad){ node.fills=[ linGrad(b.grad.from, b.grad.to, b.grad.angle, b.grad.fromA, b.grad.toA) ]; }
        else node.fills= b.fill?solid(b.fill,b.opacity):[];
        if(b.stroke){ node.strokes=solid(b.stroke); node.strokeWeight=b.strokeW||1; }
        if(b.radius) node.cornerRadius=b.radius;
        if(b.opacity!=null && b.fill==null && !b.grad) node.opacity=b.opacity;
      } else if(b.t==='ellipse'){
        node=figma.createEllipse();
        node.resize(b.w, b.h||b.w);
        node.fills= b.fill?solid(b.fill,b.opacity):[];
        if(b.stroke){ node.strokes=solid(b.stroke); node.strokeWeight=b.strokeW||1; }
      } else if(b.t==='line'){
        node=figma.createRectangle();
        node.resize(b.w, b.h||b.strokeW||2);
        node.fills=solid(b.stroke||b.fill||'#000', b.opacity);
      } else if(b.t==='text'){
        node=figma.createText();
        var font=fonts[b.font||'sans'];
        var style=pickStyle(font, b.weight||400);
        node.fontName={family:font.family,style:style};
        node.fontSize=b.size||16;
        node.characters=(b.text||'');
        node.fills=solid(b.color||'#222222');
        node.textAlignHorizontal=(b.align||'left').toUpperCase();
        if(b.ls) node.letterSpacing={unit:'PIXELS',value:b.ls};
        if(b.lineH) node.lineHeight={unit:'PERCENT',value:Math.round(b.lineH*100)};
        node.resize(b.w, node.height);
        node.textAutoResize='HEIGHT';
      }
      if(node){
        if(b.t==='photo'){
          frame.appendChild(node); node.x=b.x; node.y=b.y;
          if(b.rotate) node.rotation=-b.rotate;
          if(b.label && !b.b64){
            var lab=figma.createText();
            lab.fontName={family:fonts.sans.family,style:'Regular'};
            lab.fontSize=13; lab.characters=b.label;
            lab.fills=solid('#a39d92'); lab.textAlignHorizontal='CENTER';
            lab.resize(b.w-16, lab.height);
            frame.appendChild(lab);
            lab.x=b.x+8; lab.y=b.y+((b.h||40)/2)-10;
          }
        }else{
          frame.appendChild(node);
          node.x=b.x; node.y=b.y;
          if(b.rotate) node.rotation=-b.rotate;
        }
      }
    }
  }
  figma.currentPage.selection=pages;
  figma.viewport.scrollAndZoomIntoView(pages);
}

build().then(function(){ figma.closePlugin('✅ '+TEMPLATES.length+'개 템플릿 생성 완료'); })
       .catch(function(e){ figma.closePlugin('⚠️ 오류: '+(e&&e.message?e.message:e)); });
`;
