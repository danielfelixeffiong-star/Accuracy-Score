(() => {
  const menu = document.getElementById('site-menu');
  if (!menu) return;
  const toggle = menu.querySelector('summary');
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) { menu.open = false; toggle.focus(); }
  });
})();
