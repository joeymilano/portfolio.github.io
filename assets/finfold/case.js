(() => {
  const languageLink = document.querySelector('[data-language]');
  const syncLanguageLink = () => { if (languageLink) languageLink.href = languageLink.dataset.language + location.hash; };
  syncLanguageLink(); window.addEventListener('hashchange', syncLanguageLink);
  const navLinks = [...document.querySelectorAll('.chapter-nav a')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const navTrack = document.querySelector('.nav-inner');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        navLinks.forEach(a => { const active = a.hash === '#' + entry.target.id; a.classList.toggle('active', active); if(active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
        const current = navLinks.find(a => a.hash === '#' + entry.target.id);
        if (current && navTrack) {
          const item = current.getBoundingClientRect();
          const track = navTrack.getBoundingClientRect();
          if (item.left < track.left + 16 || item.right > track.right - 16) {
            navTrack.scrollTo({left: navTrack.scrollLeft + item.left - track.left - (track.width - item.width) / 2, behavior: reducedMotion.matches ? 'auto' : 'smooth'});
          }
        }
      }
    }, {rootMargin:'-15% 0px -55% 0px',threshold:0});
    sections.forEach(section => observer.observe(section));
  }
  document.querySelectorAll('[role="tablist"]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    const activate = tab => {
      tabs.forEach(item => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
      });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (!direction && event.key !== 'Home' && event.key !== 'End') return;
        event.preventDefault();
        const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs[(index + direction + tabs.length) % tabs.length];
        activate(next); next.focus();
      });
    });
  });
  const dialog = document.querySelector('.lightbox');
  const preview = dialog.querySelector('img');
  const scaleButton = dialog.querySelector('.lightbox-scale');
  const canvas = dialog.querySelector('.lightbox-canvas');
  const setScale = full => {
    dialog.classList.toggle('full-size', full);
    scaleButton.setAttribute('aria-pressed', String(full));
    scaleButton.textContent = full ? scaleButton.dataset.fit : scaleButton.dataset.full;
    canvas.scrollTo(0, 0);
  };
  scaleButton.addEventListener('click', () => setScale(!dialog.classList.contains('full-size')));
  let opener;
  document.querySelectorAll('.zoom').forEach(button => button.addEventListener('click', () => {
    opener = button; const source = button.querySelector('img');
    preview.src = button.dataset.full || source.currentSrc; preview.alt = source.alt;
    dialog.querySelector('[data-caption]').textContent = source.alt;
    setScale(false);
    dialog.showModal(); document.body.style.overflow = 'hidden';
  }));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus({preventScroll:true}); });
  document.querySelectorAll('[data-contact]').forEach(a => a.addEventListener('click', () => {
    if (['joeyzhao.cc','www.joeyzhao.cc'].includes(location.hostname) && typeof window.gtag === 'function') window.gtag('event','case_contact_clicked',{case_name:'finfold',contact_type:a.dataset.contact,language:document.documentElement.lang});
  }));
})();
