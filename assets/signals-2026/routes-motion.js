(() => {
  const cards = [...document.querySelectorAll('.routes .route')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover:hover) and (pointer:fine)');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target,isIntersecting}) => {
        if (!isIntersecting) return;
        target.classList.add('route-arrived');
        observer.unobserve(target);
      });
    }, {threshold:.18});
    cards.forEach(card => observer.observe(card));
  }
  cards.forEach(card => {
    let frame;
    const reset = () => {
      cancelAnimationFrame(frame);
      card.style.removeProperty('--route-rx');
      card.style.removeProperty('--route-ry');
    };
    card.addEventListener('pointermove', event => {
      if (reduced.matches || !pointer.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty('--route-rx', `${-y * 4}deg`);
        card.style.setProperty('--route-ry', `${x * 5}deg`);
      });
    });
    card.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', reset);
  });
})();
