const playLink = document.querySelector('a[href="#play"]');
const clip = document.querySelector('#play');

playLink.addEventListener('click', (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
  clip.focus({ preventScroll: true });
  clip.play().catch(() => {
    // Native video controls remain available if playback is blocked.
  });
});
