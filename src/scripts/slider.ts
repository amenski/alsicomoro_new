// Ported verbatim from the inline "HERO SLIDER" block.

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const prev = document.getElementById('sliderPrev');
const next = document.getElementById('sliderNext');
const hero = document.querySelector('.hero');

if (!(!prev && !next && dots.length === 0) && slides.length > 1) {
  let current = 0;
  let autoplayTimer: ReturnType<typeof setInterval> | undefined;
  const DURATION = 6500;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function go(i: number): void {
    if (!slides[current]) return;
    slides[current].classList.remove('active');
    if (dots[current]) {
      dots[current].classList.remove('active');
      dots[current].setAttribute('aria-selected', 'false');
    }
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) {
      dots[current].classList.add('active');
      dots[current].setAttribute('aria-selected', 'true');
    }
  }

  function start(): void {
    if (reduced) return;
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => go(current + 1), DURATION);
  }
  function pause(): void {
    clearInterval(autoplayTimer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      go(i);
      start();
    });
  });
  if (prev)
    prev.addEventListener('click', () => {
      go(current - 1);
      start();
    });
  if (next)
    next.addEventListener('click', () => {
      go(current + 1);
      start();
    });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else start();
  });

  let touchX = 0;
  if (hero) {
    hero.addEventListener(
      'touchstart',
      (e) => {
        touchX = (e as TouchEvent).touches[0].clientX;
        pause();
      },
      { passive: true }
    );
    hero.addEventListener(
      'touchend',
      (e) => {
        const diff = touchX - (e as TouchEvent).changedTouches[0].clientX;
        if (Math.abs(diff) > 50) go(current + (diff > 0 ? 1 : -1));
        start();
      },
      { passive: true }
    );
  }

  start();
}
