const host = document.querySelector('[data-gallery-enhancement]');
const mount = document.querySelector('#feature-carousel-root');
const fallback = document.querySelector('[data-carousel]');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let cleanup;
let starting = false;
let failed = false;
let visible = false;
let generation = 0;

const restore = () => {
  mount.hidden = true;
  mount.classList.remove('is-ready');
  fallback.hidden = false;
};
const stop = () => {
  generation++;
  cleanup?.();
  cleanup = undefined;
  starting = false;
  restore();
};
const start = async () => {
  if (!host || !mount || !fallback || cleanup || starting || failed || reduced.matches || !visible) return;
  starting = true;
  const current = ++generation;
  try {
    const { mountGallery } = await import('./GalleryIsland.jsx');
    if (current !== generation || reduced.matches) { starting = false; return; }
    const items = [...fallback.querySelectorAll('figure')].map(figure => ({
      src: figure.querySelector('img').getAttribute('src'),
      alt: figure.querySelector('img').alt,
      title: figure.querySelector('figcaption').textContent.trim()
    }));
    mount.hidden = false;
    cleanup = mountGallery(mount, items, {
      ready: () => {
        if (current !== generation) return;
        mount.classList.add('is-ready');
        fallback.hidden = true;
      },
      failed: () => { failed = true; stop(); }
    });
  } catch {
    failed = true;
    stop();
  }
  starting = false;
};
if (host && mount && fallback) {
  reduced.addEventListener('change', () => { if (reduced.matches) stop(); else start(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); }, {rootMargin:'300px'}).observe(host);
  } else { visible = true; start(); }
}
