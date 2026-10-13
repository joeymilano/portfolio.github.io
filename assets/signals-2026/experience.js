(() => {
  const root = document.documentElement;
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const safeStore = {get(key) {try {return localStorage.getItem(key)} catch {return null}}, set(key,value) {try {localStorage.setItem(key,value)} catch {}}};
  const params = new URLSearchParams(location.search);
  const selected = params.get('lang') || safeStore.get('lang') || 'en';
  function setLanguage(lang, updateUrl = true) {
    const chinese = lang === 'zh' || lang === 'zh-CN';
    root.lang = chinese ? 'zh-CN' : 'en';
    languageButtons.forEach(button => {const active=button.dataset.language===(chinese?'zh':'en');button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
    safeStore.set('lang',chinese ? 'zh' : 'en');
    document.querySelectorAll('[data-label-zh]').forEach(el=>el.setAttribute('aria-label',chinese?el.dataset.labelZh:el.dataset.labelEn));
    document.querySelectorAll('[data-alt-zh]').forEach(el=>el.alt=chinese?el.dataset.altZh:el.dataset.altEn);
    document.title=(chinese?root.dataset.titleZh:root.dataset.titleEn)||document.title;

    document.querySelectorAll('a[href^="/signals"]').forEach(link => {
      const url = new URL(link.getAttribute('href'),location.origin);
      url.searchParams.set('lang',chinese ? 'zh' : 'en');
      link.setAttribute('href',url.pathname+url.search+url.hash);
    });
    if(updateUrl) {const url=new URL(location.href);url.searchParams.set('lang',chinese?'zh':'en');history.replaceState(null,'',url)}
  }
  setLanguage(selected,false);
  languageButtons.forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = reducedQuery.matches;
  function setMotion(value) {
    reduced=value;root.classList.toggle('reduced-motion',value);
    if(value)document.querySelectorAll('video').forEach(video=>video.pause());
  }
  setMotion(reduced);
  reducedQuery.addEventListener('change',event=>setMotion(event.matches));
  if('IntersectionObserver' in window) {
    root.classList.add('motion-ready');
    const reveal = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');reveal.unobserve(entry.target)}}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
    const chapters = document.querySelectorAll('.chapter-nav a');
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)chapters.forEach(link=>link.classList.toggle('active',link.hash==='#'+entry.target.id))}),{rootMargin:'-15% 0px -55% 0px'});
    chapters.forEach(link=>{const section=document.querySelector(link.hash);if(section)observer.observe(section)});
  }
  const viewer = document.getElementById('image-viewer');
  const viewerImage = viewer.querySelector('img');
  let lastZoom;
  const viewerScale = viewer.querySelector('.viewer-scale');
  viewerScale?.addEventListener('click',()=>{
    const actual=viewer.classList.toggle('is-actual');
    viewerScale.setAttribute('aria-pressed',String(actual));
    viewerScale.querySelector('.zh').textContent=actual?'适应屏幕':'原始尺寸';
    viewerScale.querySelector('.en').textContent=actual?'Fit to screen':'Actual size';
  });
  document.querySelectorAll('.zoom').forEach(button=>button.addEventListener('click',()=>{
    viewer.classList.remove('is-actual');
    if(viewerScale){viewerScale.setAttribute('aria-pressed','false');viewerScale.querySelector('.zh').textContent='原始尺寸';viewerScale.querySelector('.en').textContent='Actual size';}
    lastZoom=button;viewerImage.src=button.dataset.image;viewerImage.alt=button.querySelector('img')?.alt||'';
    viewer.showModal();document.body.style.overflow='hidden';viewer.querySelector('button').focus();
  }));
  viewer.querySelector('button').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
  viewer.addEventListener('close',()=>{document.body.style.overflow='';lastZoom?.focus()});
  const marketButtons=[...document.querySelectorAll('[data-player]')];
  marketButtons.forEach(button=>button.addEventListener('click',()=>{
    const selected=button.dataset.player;
    marketButtons.forEach(item=>{const active=item===button;item.classList.toggle('is-selected',active);item.setAttribute('aria-pressed',String(active))});
    document.querySelectorAll('[data-player-panel]').forEach(panel=>{const active=panel.dataset.playerPanel===selected;panel.hidden=!active;panel.classList.toggle('is-selected',active)});
  }));
  const explorer=document.querySelector('.molecule-explorer');
  if(explorer){
    const filterButton=explorer.querySelector('.filter-play');
    filterButton.addEventListener('click',()=>{
      const filtered=explorer.dataset.filtered!=='true';
      explorer.dataset.filtered=String(filtered);
      filterButton.setAttribute('aria-pressed',String(filtered));
      explorer.querySelector('#molecule-count').textContent=filtered?'43':'94';
      explorer.querySelector('[data-count-label] .zh').textContent=filtered?'条符合条件':'条实验记录';
      explorer.querySelector('[data-count-label] .en').textContent=filtered?'matching records':'experiment records';
      filterButton.querySelector('.zh').textContent=filtered?'再看全部 94 条':'试着筛选一下';
      filterButton.querySelector('.en').textContent=filtered?'Show all 94 again':'Try the filter';
      explorer.querySelector('.filter-result .zh').textContent=filtered?'43 条满足条件。45 条未满足，另外 6 条只有下限。':'每个点对应一条真实记录。';
      explorer.querySelector('.filter-result .en').textContent=filtered?'43 match. 45 do not, and 6 give only a lower bound.':'Each dot represents one real record.';
    });
  }
  const story = document.querySelector('.design-story');
  if (story) {
    const steps=[...story.querySelectorAll('.story-step')];
    const panels=[...story.querySelectorAll('.scene-panel')];
    const tabs=[...story.querySelectorAll('[data-scene]')];
    const mobile=matchMedia('(max-width:900px)');
    let current=0, pending=false;
    function selectScene(index) {
      current=index;
      steps.forEach((step,i)=>step.classList.toggle('is-current',i===index));
      panels.forEach((panel,i)=>{
        const inactive=!mobile.matches&&i!==index;
        panel.classList.toggle('is-active',i===index);
        panel.inert=inactive;
        panel.setAttribute('aria-hidden',String(inactive));
      });
      tabs.forEach((tab,i)=>tab.setAttribute('aria-pressed',String(i===index)));
      story.querySelector('.scene-progress i').style.transform=`translateX(${index*100}%)`;
    }
    function followScroll() {
      pending=false;
      const target=innerHeight*.5;
      const distances=steps.map(step=>{const r=step.getBoundingClientRect();return Math.abs(r.top+r.height*.5-target)});
      selectScene(distances.indexOf(Math.min(...distances)));
    }
    story.classList.add('is-ready');
    selectScene(0);
    window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(followScroll)}},{passive:true});
    window.addEventListener('resize',followScroll);
    mobile.addEventListener('change',()=>selectScene(current));
    tabs.forEach(tab=>tab.addEventListener('click',()=>{
      const index=Number(tab.dataset.scene);selectScene(index);
      steps[index].scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});
    }));
    panels.forEach(panel=>panel.querySelector('.focus-control').addEventListener('click',event=>{
      const button=event.currentTarget;
      const focused=panel.classList.toggle('is-focused');
      button.setAttribute('aria-pressed',String(focused));
      button.querySelector('.zh').textContent=focused?'返回全图':'聚焦设计细节';
      button.querySelector('.en').textContent=focused?'Back to full screen':'Focus on the detail';
    }));
  }
  document.querySelectorAll('video').forEach(video=>{
    video.addEventListener('error',()=>{const fallback=video.parentElement.querySelector('.media-fallback');if(fallback)fallback.hidden=false});
    video.querySelector('source')?.addEventListener('error',()=>{const fallback=video.parentElement.querySelector('.media-fallback');if(fallback)fallback.hidden=false});
  });
  document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('image-unavailable');img.closest('.zoom')?.setAttribute('aria-label','Image unavailable / 图片暂不可用')}));
})();
