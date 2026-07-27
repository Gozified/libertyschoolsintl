/**
 * Progressive enhancements. Everything here is optional — the site is fully
 * readable and navigable with JS disabled.
 */

// ── Header elevation on scroll ───────────────────────────────────────────────
// The previous build wrote inline box-shadow strings on every scroll event.
// This toggles a class instead, and coalesces work into one animation frame.
function initHeaderElevation() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  let queued = false;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
    queued = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );

  update();
}

// ── Scroll reveal ────────────────────────────────────────────────────────────
// Elements are visible by default. We only hide them ("arm" them) once we know
// an observer exists to reveal them again, so a JS failure can never leave
// content invisible. Honours prefers-reduced-motion.
function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (targets.length === 0) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );

  for (const el of targets) {
    el.classList.add('is-armed');
    observer.observe(el);
  }
}

initHeaderElevation();
initReveal();
