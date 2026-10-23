// Ported verbatim from components.js `initNavDrawer`. The only change is that the
// drawer's aria-label is read from data attributes on the toggle, so it can be
// localized (components.js hard-coded the Italian strings on every page).

export function initNavDrawer(): void {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('menuToggle');
  if (!nav || !toggle) return;

  const links = document.querySelectorAll<HTMLAnchorElement>('#navLinks a');
  const openLabel = toggle.dataset.labelOpen ?? 'Apri menu';
  const closeLabel = toggle.dataset.labelClose ?? 'Chiudi menu';

  function setOpen(open: boolean): void {
    nav!.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    toggle!.setAttribute('aria-expanded', String(open));
    toggle!.setAttribute('aria-label', open ? closeLabel : openLabel);
  }

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('open'));
  });

  links.forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false);
  });
}

initNavDrawer();
