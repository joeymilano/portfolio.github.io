// GA4 events for the studio. Listens to the existing studio:* events only; no behaviour changes.
// gtag is configured on production hosts only, so local sessions queue into dataLayer unsent.
export function sourceOf(node){
 if(!node?.closest)return 'other';
 if(node.closest('.hotspots'))return 'hotspot';
 if(node.closest('#studio-navigation'))return 'nav';
 if(node.closest('.loading-links'))return 'quick_link';
 if(node.closest('#content-panel'))return 'panel';
 if(node.closest('#studio-profile'))return 'profile';
 return 'other';
}

export function createTracker(send,now=()=>performance.now()){
 let open=null,openedAt=0,pendingSource=null,looked=false;const seen=new Set();
 function close(){if(!open)return;send('studio_close',{item:open,dwell_ms:Math.round(now()-openedAt)});open=null;}
 return {
  source(value){pendingSource=value},
  select(id){
   if(!id){close();pendingSource=null;return}
   if(id===open)return;
   close();
   open=id;openedAt=now();seen.add(id);
   send('studio_open',{item:id,source:pendingSource||'other',objects_seen:seen.size});pendingSource=null;
  },
  look(){if(looked)return;looked=true;send('studio_look_around',{ms_to_look:Math.round(now())})},
  end(){close();send('studio_session_end',{objects_seen:seen.size,looked_around:looked,engaged_ms:Math.round(now())},{beacon:true})},
  get seen(){return seen.size}
 };
}

export function initAnalytics(){
 const send=(name,params={},{beacon=false}={})=>{if(typeof window.gtag!=='function')return;window.gtag('event',name,beacon?{...params,transport_type:'beacon'}:params)};
 const tracker=createTracker(send);
 // Deep links (?item=work) open before any click; attribute them to the URL.
 if(new URLSearchParams(location.search).get('item'))tracker.source('url');
 document.addEventListener('click',event=>{
  const trigger=event.target.closest?.('[data-open]');if(trigger)tracker.source(sourceOf(trigger));
  const anchor=event.target.closest?.('a[href]');
  if(anchor&&!anchor.dataset.open){const url=new URL(anchor.href,location.href);send('studio_link',{href:url.origin===location.origin?url.pathname:url.href,area:sourceOf(anchor),item:document.querySelector('#content-panel')?.dataset.panel||''})}
 },true);
 window.addEventListener('studio:pick',()=>tracker.source('scene'),true);
 window.addEventListener('studio:select',({detail})=>tracker.select(detail?.id||null));
 window.addEventListener('studio:view',({detail})=>{if(detail?.moved)tracker.look()});
 window.addEventListener('studio:sound',({detail})=>send('studio_sound',{on:!!detail?.on}));
 window.addEventListener('studio:lighting',({detail})=>send('studio_light_mode',{mode:detail?.mode}));
 document.querySelector('#language')?.addEventListener('click',()=>setTimeout(()=>send('studio_language',{language:document.documentElement.lang})));
 window.addEventListener('studio:ready',()=>send('studio_ready',{interactive_ms:Math.round(performance.now())}),{once:true});
 window.addEventListener('studio:complete',({detail})=>send('studio_complete',{complete_ms:Math.round(performance.now()),degraded:!!detail?.degraded}),{once:true});
 window.addEventListener('studio:failure',()=>send('studio_failure',{}),{once:true});
 let ended=false;window.addEventListener('pagehide',()=>{if(ended)return;ended=true;tracker.end()});
 return tracker;
}
