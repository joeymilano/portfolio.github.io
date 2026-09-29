// The studio is in Shanghai: without a saved choice, visitors see it as it looks there right now.
export function shanghaiHour(date=new Date()){return (date.getUTCHours()+8)%24}
export function resolveLightMode(value,date=new Date()){
 if(value==='day'||value==='night')return value;
 const hour=shanghaiHour(date);return hour>=7&&hour<19?'day':'night';
}
export function initLightMode(){
 const button=document.querySelector('#light-mode');
 let stored=null;try{stored=localStorage.getItem('studio-light-mode')}catch{}
 let mode=resolveLightMode(stored);
 function sync(){
  document.documentElement.dataset.lightMode=mode;
  const zh=document.documentElement.lang==='zh',label=mode==='night'?(zh?'切换白天':'Switch to day'):(zh?'切换夜间':'Switch to night');
  button.setAttribute('aria-label',label);button.title=label;button.innerHTML=mode==='night'?'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/></svg>';
  const poster=document.querySelector('#scene-poster');poster.dataset.mode=mode;poster.querySelector('source').srcset=`/explore/assets/poster-v3-${mode}-mobile.webp`;poster.querySelector('img').src=`/explore/assets/poster-v3-${mode}-desktop.webp`;
 }
 button.addEventListener('click',()=>{mode=mode==='day'?'night':'day';try{localStorage.setItem('studio-light-mode',mode)}catch{}sync();window.dispatchEvent(new CustomEvent('studio:lighting',{detail:{mode}}))});
 window.addEventListener('studio:language',sync);sync();
}
