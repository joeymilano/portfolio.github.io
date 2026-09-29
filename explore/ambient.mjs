// Optional room sound. Muted by default; the file is fetched only after the visitor turns it on,
// and it loops gaplessly through Web Audio. It fades out while the tab is hidden or the music
// shelf is open, so it never talks over Joey's own tracks.
export const soundSource='/explore/assets/audio/studio-ambient-v1.m4a';
const level=.32,fade=1.2;

export function resolveSound(value){return value==='on'}
// AAC adds encoder silence at the edges; loop only the audible span so the seam stays gapless.
export function loopBounds(samples,rate,quiet=1.2e-3){
 const limit=Math.min(samples.length>>1,Math.round(rate*.25));let start=0,end=samples.length;
 while(start<limit&&Math.abs(samples[start])<quiet)start++;
 while(samples.length-end<limit&&Math.abs(samples[end-1])<quiet)end--;
 return {start:start/rate,end:end/rate};
}
// Target gain for the current page state; kept pure so the rules are testable.
export function soundLevel({on,hidden,selected}){return on&&!hidden&&selected!=='music'?level:0}

export function initAmbient(){
 const button=document.querySelector('#sound');if(!button)return;
 let on=false,selected=null,context=null,gain=null,loading=null;
 try{on=resolveSound(localStorage.getItem('studio-sound'))}catch{}
 function label(){
  const zh=document.documentElement.lang==='zh',text=on?(zh?'关闭环境声':'Mute room sound'):(zh?'打开环境声':'Play room sound');
  button.setAttribute('aria-label',text);button.title=text;button.setAttribute('aria-pressed',String(on));
  button.innerHTML=on?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="m16 10 4 4m0-4-4 4"/></svg>';
 }
 // Browsers only allow audio after a gesture, so the context is created on the first toggle or tap.
 function start(){
  if(loading)return loading;
  context=new (window.AudioContext||window.webkitAudioContext)();gain=context.createGain();gain.gain.value=0;gain.connect(context.destination);
  loading=fetch(soundSource).then(r=>{if(!r.ok)throw new Error(r.status);return r.arrayBuffer()}).then(data=>context.decodeAudioData(data)).then(buffer=>{const source=context.createBufferSource(),span=loopBounds(buffer.getChannelData(0),buffer.sampleRate);source.buffer=buffer;source.loop=true;source.loopStart=span.start;source.loopEnd=span.end;source.connect(gain);source.start(0,span.start);apply()}).catch(()=>{on=false;label()});
  return loading;
 }
 function apply(){
  if(!context)return;
  const target=soundLevel({on,hidden:document.hidden,selected});
  if(target>0&&context.state==='suspended')context.resume();
  const now=context.currentTime;gain.gain.cancelScheduledValues(now);gain.gain.setValueAtTime(gain.gain.value,now);gain.gain.linearRampToValueAtTime(target,now+fade);
  // Release the audio thread once the fade-out has finished.
  if(!target)setTimeout(()=>{if(!soundLevel({on,hidden:document.hidden,selected})&&context.state==='running')context.suspend()},fade*1000+100);
 }
 button.addEventListener('click',()=>{
  on=!on;try{localStorage.setItem('studio-sound',on?'on':'off')}catch{}
  label();if(on)start();apply();window.dispatchEvent(new CustomEvent('studio:sound',{detail:{on}}));
 });
 // A returning visitor who left sound on hears it again from their first interaction.
 if(on)window.addEventListener('pointerdown',event=>{if(on&&!button.contains(event.target)){start();apply()}},{once:true});
 window.addEventListener('studio:select',e=>{selected=e.detail?.id||null;apply()});
 document.addEventListener('visibilitychange',apply);
 window.addEventListener('studio:language',label);
 label();
}
