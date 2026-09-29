// Re-captures the Explore loading posters from the live 3D scene with every UI layer hidden.
// Usage: python3 scripts/serve-preview.py &  then  node scripts/studio/capture-posters.mjs [version]
// Posters are served with an immutable cache, so each capture must ship under a new version name.
import puppeteer from 'puppeteer';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const version=process.argv[2]||'v2';
const base=process.env.STUDIO_URL||'http://127.0.0.1:4186';
const out=fileURLToPath(new URL('../../explore/assets/',import.meta.url));
const systemChrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// Desktop keeps the 16:10 frame the page crops with object-fit. Mobile matches the canvas's 1.5 pixel-ratio cap.
const frames=[{name:'desktop',width:1600,height:1000,scale:1.25,mobile:false},{name:'mobile',width:390,height:844,scale:1.5,mobile:true}];

const browser=await puppeteer.launch({headless:'new',executablePath:existsSync(systemChrome)?systemChrome:undefined,args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist']});
try{
 for(const mode of ['day','night'])for(const frame of frames){
  const page=await browser.newPage();
  await page.setViewport({width:frame.width,height:frame.height,deviceScaleFactor:frame.scale,isMobile:frame.mobile,hasTouch:frame.mobile});
  await page.evaluateOnNewDocument(mode=>{try{localStorage.setItem('studio-light-mode',mode);localStorage.setItem('lang','en')}catch{}},mode);
  await page.goto(`${base}/explore/`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.body.dataset.loadState==='complete',{timeout:90000});
  // The poster sits under the shade, so the shade must not be baked in either.
  await page.addStyleTag({content:'#studio>:not(#scene-root),#scene-poster,.scene-shade,.hotspots,dialog{visibility:hidden!important;opacity:0!important}#scene-root canvas{opacity:1!important}'});
  await new Promise(resolve=>setTimeout(resolve,2500));
  // The page uses WebP; the desktop day JPEG doubles as the social share image.
  const stem=`${out}poster-${version}-${mode}-${frame.name}`;
  await page.screenshot({path:stem+'.webp',type:'webp',quality:frame.mobile?70:74});console.log('wrote',stem+'.webp');
  if(mode==='day'&&!frame.mobile){await page.screenshot({path:stem+'.jpg',type:'jpeg',quality:78});console.log('wrote',stem+'.jpg');}
  await page.close();
 }
}finally{await browser.close();}
