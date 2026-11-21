(() => {
  const header = document.querySelector('.site-header');
  const button = header?.querySelector('.nav-toggle');
  const nav = header?.querySelector('nav');
  if (!button || !nav) return;

  const narrow = window.matchMedia('(max-width: 760px)');

  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    nav.hidden = narrow.matches && !open;
  }

  function isOpen() {
    return narrow.matches && button.getAttribute('aria-expanded') === 'true';
  }

  header.classList.add('is-enhanced');
  setOpen(false);
  narrow.addEventListener('change', () => setOpen(false));
  button.addEventListener('click', () => setOpen(!isOpen()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });
  header.addEventListener('focusout', (event) => {
    if (isOpen() && event.relatedTarget && !header.contains(event.relatedTarget)) setOpen(false);
  });
})();
