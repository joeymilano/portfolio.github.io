import { initialState, transition, scenarios, phases } from './journey.mjs?v=20261102';
const copy = JSON.parse(document.querySelector('#case-copy').textContent);
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const localScenarios = scenarios[copy.lang];
const stage = $('.journey-stage');
let state = initialState();
let timers = [];
function cancelTimers() { timers.forEach(clearTimeout); timers = []; }
function dispatch(event) {
  const previous = state;
  state = transition(state, event);
  if (state === previous) return;
  cancelTimers();
  render();
  if (matchMedia('(max-width: 520px)').matches && ['review', 'delivered'].includes(state.phase)) {
    $(state.phase === 'review' ? '.demo-phone' : '.demo-workbench').scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  if (state.phase === 'receiving') timers.push(setTimeout(() => dispatch({ type: 'RECOGNIZED' }), 650));
  if (state.phase === 'running') timers.push(setTimeout(() => dispatch({ type: 'COMPLETE' }), 2300));
}
function render() {
  const item = state.scenario === null ? null : localScenarios[state.scenario];
  const phase = state.phase;
  stage.dataset.phase = phase;
  $$('[data-scenario]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.scenario) === state.scenario)));
  $('[data-phase-label]').textContent = copy.phaseLabels[phases.indexOf(phase)];
  $('[data-utterance]').textContent = item?.utterance || copy.ready;
  $('[data-request]').hidden = !item;
  $('[data-request]').textContent = item?.utterance.replace(/^[“]|[”]$/g, '') || '';
  $('[data-status]').textContent = ({ idle: copy.ready, receiving: copy.pending, review: copy.reviewmsg, running: copy.working, delivered: copy.done })[phase];
  $('.request-preview').hidden = phase !== 'review';
  $('[data-request-title]').textContent = item?.title || '';
  $('[data-request-detail]').textContent = item?.detail || '';
  $('.processing').hidden = !['receiving', 'running'].includes(phase);
  $('[data-reset]').hidden = phase === 'idle';
  $('[data-reset]').textContent = phase === 'delivered' ? `${copy.reset} ↺` : `${copy.cancel} ↺`;
  $('[data-file-title]').textContent = phase === 'delivered' ? item.file : phase === 'running' ? item.title : copy.lang === 'zh' ? '等待新的工作' : 'Ready for the next thing';
  $('[data-file-status]').textContent = phase === 'delivered' ? copy.done : phase === 'running' ? copy.working : copy.lang === 'zh' ? '确认后，请求会继续向这里走。' : 'A confirmed request continues here.';
  $('[data-open-file]').hidden = phase !== 'delivered';
  $('.file-skeleton').hidden = phase === 'delivered';
}
$$('[data-scenario]').forEach(button => button.addEventListener('click', () => dispatch({ type: 'SELECT', scenario: Number(button.dataset.scenario) })));
$('[data-confirm]').addEventListener('click', () => { dispatch({ type: 'CONFIRM' }); $('[data-reset]').focus({ preventScroll: true }); });
$('[data-reset]').addEventListener('click', () => { dispatch({ type: 'RESET' }); $('[data-scenario]').focus({ preventScroll: true }); });
$('[data-skip]').addEventListener('click', () => dispatch({ type: 'SKIP' }));
document.addEventListener('visibilitychange', () => { if (document.hidden && ['receiving', 'running'].includes(state.phase)) dispatch({ type: 'RESET' }); });
function showDialog(dialog) {
  dialog._returnFocus = document.activeElement;
  dialog.showModal();
}
$$('dialog').forEach(dialog => {
  $('[data-close]', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { $('video', dialog)?.pause(); dialog._returnFocus?.focus({ preventScroll: true }); });
});
$$('.zoom').forEach(button => button.addEventListener('click', () => {
  const source = $('img', button);
  const lightbox = $('.lightbox');
  $('img', lightbox).src = source.currentSrc || source.src;
  $('img', lightbox).alt = source.alt;
  $('p', lightbox).textContent = $('figcaption', button.closest('figure'))?.textContent || source.alt;
  showDialog(lightbox);
}));
$$('[data-play]').forEach(button => button.addEventListener('click', () => {
  const dialog = $('.video-dialog');
  const video = $('video', dialog);
  if (!video.getAttribute('src')) video.src = '/assets/missionget/media/demo-sdr.mp4';
  showDialog(dialog);
  video.play().catch(() => {});
}));
$('[data-open-file]').addEventListener('click', () => {
  if (state.phase !== 'delivered') return;
  const item = localScenarios[state.scenario];
  $('[data-document-title]').textContent = item.file;
  const body = $('[data-document-body]');
  body.replaceChildren();
  item.sections.forEach(([title, content]) => {
    const h = document.createElement('h3'); h.textContent = title; body.append(h);
    if (Array.isArray(content)) {
      const list = document.createElement('ul');
      content.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
      body.append(list);
    } else { const p = document.createElement('p'); p.textContent = content; body.append(p); }
  });
  showDialog($('.file-dialog'));
});
$$('[data-flow-mode]').forEach(button => button.addEventListener('click', () => {
  const mode = button.dataset.flowMode;
  $$('[data-flow-mode]').forEach(node => { const selected = node === button; node.setAttribute('aria-pressed', String(selected)); node.classList.toggle('selected', selected); });
  $$('[data-flow]').forEach((node, index) => { node.textContent = copy[`flow${mode}`][index]; });
  $('.flow-caption').textContent = copy[`flow${mode}p`];
}));
const compareImage = $('.comparison-image');
const originalAlt = compareImage.alt;
$$('[data-compare]').forEach(button => button.addEventListener('click', () => {
  const mode = button.dataset.compare;
  $$('[data-compare]').forEach(node => { const selected = node === button; node.setAttribute('aria-pressed', String(selected)); node.classList.toggle('selected', selected); });
  compareImage.src = `/assets/missionget/images/${mode === 'before' ? 'prototype-early' : 'workbench'}.webp`;
  compareImage.alt = mode === 'before' ? copy.captions.before : originalAlt;
  $('[data-comparison-caption]').textContent = copy.captions[mode];
}));
$('.lens-hotspot').addEventListener('click', event => {
  const button = event.currentTarget;
  const open = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(open));
  $('#hardware-detail').hidden = !open;
});
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const tilt = $('[data-tilt]');
if (matchMedia('(pointer:fine)').matches) {
  tilt.addEventListener('pointermove', event => {
    if (reduced.matches || !$('#hardware-detail').hidden) return;
    const rect = tilt.getBoundingClientRect();
    tilt.style.setProperty('--ry', `${(event.clientX - rect.left) / rect.width * 6 - 3}deg`);
    tilt.style.setProperty('--rx', `${3 - (event.clientY - rect.top) / rect.height * 6}deg`);
  });
  tilt.addEventListener('pointerleave', () => { tilt.style.setProperty('--rx', '0deg'); tilt.style.setProperty('--ry', '0deg'); });
}
if ('IntersectionObserver' in window) {
  const navigation = $$('.chapter-nav a');
  const chapterObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) navigation.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  $$('section[id]').forEach(section => chapterObserver.observe(section));
  if (!reduced.matches) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('seen'); reveal.unobserve(entry.target); } }), { threshold: 0.06 });
    $$('.story-heading, .hardware-stage, .flow-panel, .proof, .field-grid, .video-card, .learning').forEach(node => { node.classList.add('reveal'); reveal.observe(node); });
    document.documentElement.classList.add('motion-ready');
  }
}
$('[data-language]').addEventListener('click', event => {
  const link = event.currentTarget;
  link.hash = location.hash;
  try { localStorage.setItem('lang', copy.lang === 'zh' ? 'en' : 'zh'); } catch {}
});
