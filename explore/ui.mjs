import {collectionShelf} from './collections.mjs?v=links-v2';
import {parseLocation,buildLocation,resolveLanguage,validId} from './state.mjs?v=20260927-editorial1';
import {copy,projects,featuredWork,tracks,writing,writingPath,contactPath} from './content.mjs?v=20260927-editorial1';
import {photography} from './photography.mjs?v=20260927-editorial1';
const dialog=document.querySelector('#content-panel'),content=document.querySelector('#panel-content'),status=document.querySelector('#scene-status');
let saved;try{saved=localStorage.getItem('lang')}catch{}
let state=parseLocation(location.href),language=resolveLanguage(state.language,saved),selected=null,returnFocus=null,sceneState='loading',revealTimer=0,revealSerial=0;
const t=key=>copy[language][key];
const emit=(name,detail)=>window.dispatchEvent(new CustomEvent(name,{detail}));
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n};
function link(text,href,cls='panel-link'){const a=el('a',text,cls);a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer'}return a}
function image(src,alt,cls='cover'){const img=el('img',null,cls);img.src=src;img.alt=alt;img.loading='lazy';return img}
function disposeMedia(){content.querySelectorAll('iframe').forEach(frame=>frame.remove())}
function player(type,id){disposeMedia();const box=content.querySelector('#media-player');box.replaceChildren();const frame=el('iframe');frame.title=type==='video'?'CALL ME YAO music video':'NetEase Cloud Music player';frame.allow='fullscreen; encrypted-media';frame.referrerPolicy='strict-origin-when-cross-origin';if(type==='video'){frame.src='https://www.youtube-nocookie.com/embed/FXCQGqpYmto';frame.className='video-player';frame.allowFullscreen=true}else{frame.src=`https://music.163.com/outchain/player?type=2&id=${id}&auto=0&height=66`;frame.height='100'}box.append(frame,el('p',t(type==='video'?'video':'player'),'media-status'));}
function appendContacts(){const row=el('div',null,'contact-actions');row.append(link(t('recruiting'),contactPath('recruiting',language)),link(t('project'),contactPath('project',language)));content.append(row)}
function appendWork(){const featured=el('div',null,'featured-work');for(const item of featuredWork){const card=el('article',null,'featured-card');const visual=link('',item.path,'featured-visual');visual.setAttribute('aria-label',`${t('open')}: ${item.title}`);visual.append(image(item.image,item.title));const body=el('div',null,'featured-copy');body.append(el('p',item.role[language],'featured-role'),link(item.title,item.path,'featured-title'),el('p',item.summary[language],'featured-summary'));card.append(visual,body);featured.append(card)}content.append(featured,el('h2',t('otherWork'),'editorial-label'));const list=el('ul',null,'project-list');for(const [title,path] of projects.filter(([,path])=>!featuredWork.some(item=>item.path===path))){const li=el('li');li.append(link(title,path,''));list.append(li)}content.append(list,el('h2',t('around'),'editorial-label'));const objects=el('nav',null,'object-navigation');objects.setAttribute('aria-label',t('around'));for(const id of ['photography','writing','music','about','books']){const button=el('button',t(id==='books'?'booksPreview':id),'small-button');button.dataset.open=id;objects.append(button)}content.append(objects)}
function appendWriting(){const list=el('ol',null,'notebook-list');for(const article of writing){const li=el('li');const a=link(article[language],writingPath(article.slug,language),'notebook-title');const date=el('time',article.date.replaceAll('-','.'),'notebook-date');date.dateTime=article.date;li.append(date,a);list.append(li)}content.append(list,link(t('writingFull'),language==='zh'?'/writing/':'/en/writing/','panel-link'))}
function appendPhotography(){
 const wall=el('div',null,'photo-wall');
 for(const [index,photo] of photography.entries()){
  const figure=el('figure',null,'photo-print');
  const img=image(photo.display,photo[language==='zh'?'altZh':'altEn'],'photo-wall-image');
  img.width=photo.width;img.height=photo.height;img.decoding='async';
  const caption=el('figcaption');caption.append(el('span',String(index+1).padStart(2,'0'),'photo-number'),el('span',photo[language==='zh'?'zh':'en']));
  const unavailable=el('p',t('photoUnavailable'),'photo-unavailable');unavailable.hidden=true;
  img.addEventListener('error',()=>{img.hidden=true;unavailable.hidden=false});
  figure.append(img,unavailable,caption);wall.append(figure);
 }
 content.append(wall,link(t('photographyFull'),'https://photography-portfolio-rd5.pages.dev/','photo-source-link'));
}
function render(){dialog.dataset.collection=['books','music'].includes(selected)?selected:'';dialog.dataset.panel=selected||'';disposeMedia();content.replaceChildren();const heading=el('h1',t(selected==='work'?'allwork':selected));heading.id='panel-title';content.append(heading);
 if(selected==='finfold'){content.append(image('/images/finfold-app-workbench.png','Finfold product workbench'));for(const [label,body] of [['problem','finfoldProblem'],['roleLabel','finfoldRole'],['decisions','finfoldDecisions']])content.append(el('h2',t(label),'eyebrow'),el('p',t(body)));content.append(link(t('open'),'/finfold'),link(t('product'),'https://www.finfold.app/workbench'));appendContacts();}
 if(selected==='about'){content.append(image('/explore/assets/portrait.png','Joey Zhao','portrait'),el('p',t('aboutbody')),link(t('resume'),'/resume/joey-zhao-resume.pdf'),link(t('contact'),'mailto:super666joey@gmail.com'));appendContacts();}
 if(selected==='work'){appendWork();}
 if(selected==='books'){content.append(collectionShelf('books',language));}
 if(selected==='writing'){appendWriting();}
 if(selected==='photography'){appendPhotography();}
 if(selected==='music'){content.append(collectionShelf('albums',language));content.append(el('h2',language==='zh'?'Joey 的音乐与 MV':'Joey’s music & MV','eyebrow'));const media=el('div');media.id='media-player';content.append(media);const list=el('ul',null,'track-list');for(const [id,name,meta] of tracks){const li=el('li');li.append(el('span',name,'track-name'),el('div',meta,'track-meta'));const button=el('button',t('load'),'small-button');button.setAttribute('aria-label',`${t('load')}: ${name}`);button.addEventListener('click',()=>player('music',id));li.append(button,link(t('external'),`https://music.163.com/song?id=${id}`,''));list.append(li)}content.append(list,image('/images/yao-cover.jpg','CALL ME YAO music video'));const video=el('button',t('loadvideo'),'small-button');video.addEventListener('click',()=>{player('video');content.querySelector('#media-player').scrollIntoView({block:'nearest'});});content.append(video,link(t('youtube'),'https://www.youtube.com/watch?v=FXCQGqpYmto'),link(t('open'),'/yao'));}
}
function syncLanguage(){document.documentElement.lang=language;document.title=t('title');document.querySelectorAll('[data-copy]').forEach(n=>n.textContent=t(n.dataset.copy));document.querySelector('#language').textContent=language==='en'?'EN / 中文':'中文 / EN';document.querySelector('#language').setAttribute('aria-label',language==='en'?'Switch to Chinese':'切换为英语');document.querySelector('#panel-close').setAttribute('aria-label',t('close'));document.querySelector('.studio-mode')?.setAttribute('aria-label',t('viewToggle'));document.querySelector('.loading-links')?.setAttribute('aria-label',t('loadingNav'));document.querySelector('.hotspots')?.setAttribute('aria-label',t('hotspotsLabel'));for(const b of document.querySelectorAll('[data-object]')){const key=b.dataset.object;const label=t(key==='work'?'allwork':key);b.setAttribute('aria-label',label);b.querySelector('span').textContent=label}status.textContent=sceneState==='loading'?'':t(sceneState);document.querySelector('.scene-loader').setAttribute('aria-label',t('loading'));emit('studio:language',{language});}
function select(id,{historyMode='push',trigger=null}={}){id=validId(id);if(id===selected)return;clearTimeout(revealTimer);revealTimer=0;const serial=++revealSerial;if(!dialog.open&&!selected)returnFocus=trigger||document.activeElement;selected=id;disposeMedia();if(historyMode==='push')history.pushState({studio:true},'',buildLocation(location.href,id,language));emit('studio:select',{id});if(id){render();const reveal=()=>{revealTimer=0;if(serial!==revealSerial||selected!==id)return;if(!dialog.open)dialog.showModal();document.querySelector('#panel-close').focus({preventScroll:true})};if(historyMode==='push'&&['writing','photography'].includes(id)&&!matchMedia('(prefers-reduced-motion: reduce)').matches){if(dialog.open)dialog.close();revealTimer=setTimeout(reveal,360)}else reveal()}else{if(dialog.open)dialog.close();if(returnFocus?.isConnected&&returnFocus.matches?.('button,a,[tabindex]:not([tabindex="-1"])')&&returnFocus.getClientRects().length)returnFocus.focus({preventScroll:true});else document.querySelector('#studio-navigation [data-open=work]')?.focus({preventScroll:true})}}
document.addEventListener('click',event=>{const trigger=event.target.closest('[data-open]');if(trigger){event.preventDefault();select(trigger.dataset.open,{trigger});}const mode=event.target.closest('[data-mode]');if(mode){disposeMedia();try{localStorage.setItem('portfolio-mode',mode.dataset.mode)}catch{}}});
document.querySelector('#panel-close').addEventListener('click',()=>select(null));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&revealTimer&&!dialog.open){event.preventDefault();select(null)}});dialog.addEventListener('cancel',event=>{event.preventDefault();select(null)});dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)select(null)}});
document.querySelector('#language').addEventListener('click',()=>{language=language==='en'?'zh':'en';try{localStorage.setItem('lang',language)}catch{}history.replaceState(history.state,'',buildLocation(location.href,selected,language));syncLanguage();if(selected)render();});
window.addEventListener('popstate',()=>{const next=parseLocation(location.href);language=resolveLanguage(next.language,language);syncLanguage();if(next.id===selected&&selected)render();else select(next.id,{historyMode:'none'});if(next.invalidItem)status.textContent=t('overview');});
window.addEventListener('studio:pick',e=>select(e.detail?.id));
const loadingBar=document.querySelector('.scene-loader');
let progress=0;
window.addEventListener('studio:progress',({detail})=>{
 if(sceneState==='failure')return;
 progress=Math.max(progress,Math.min(100,Math.round(detail.percent)));
 loadingBar.style.setProperty('--progress',progress/100);
 loadingBar.setAttribute('aria-valuenow',progress);
 loadingBar.querySelector('.loader-number').textContent=String(progress).padStart(2,'0');
});
window.addEventListener('studio:complete',({detail})=>{
 document.body.dataset.loadState='complete';
 loadingBar.setAttribute('aria-hidden','true');
 if(detail.degraded)status.textContent=language==='zh'?'部分物件暂未载入。':'Some objects could not load.';
});
window.addEventListener('studio:ready',()=>{sceneState='ready';document.body.dataset.sceneState=sceneState;status.textContent='';emit('studio:select',{id:selected})});
window.addEventListener('studio:failure',()=>{sceneState='failure';document.body.dataset.sceneState=sceneState;document.body.dataset.loadState='failure';loadingBar.setAttribute('aria-hidden','true');status.textContent=t(sceneState)});
window.addEventListener('studio:view',({detail})=>{
 resetViewButton.hidden=!detail.moved;
 if(detail.moved)document.body.dataset.explored='true';
});
document.addEventListener('visibilitychange',()=>{if(document.hidden){const hadPlayer=!!content.querySelector('iframe');disposeMedia();if(hadPlayer){const box=content.querySelector('#media-player');box?.replaceChildren(el('p',t('stopped'),'media-status'))}}});window.addEventListener('pagehide',disposeMedia);
syncLanguage();if(state.id)select(state.id,{historyMode:'none'});if(state.invalidItem)status.textContent=t('overview');

const resetViewButton=document.querySelector('#view-reset');resetViewButton.addEventListener('click',()=>{emit('studio:reset-view',{});document.querySelector('#scene-root canvas')?.focus({preventScroll:true});});
function viewLabels(){const zh=language==='zh';document.querySelector('#view-hint').textContent=zh?'拖动，环视工作室':'Drag to look around';const label=zh?'复位视角':'Reset view';resetViewButton.setAttribute('aria-label',label);resetViewButton.title=label;}
window.addEventListener('studio:language',viewLabels);viewLabels();
