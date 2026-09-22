(() => {
  const key = 'accuracy-score-privacy-notice-v2';
  try { if (localStorage.getItem(key) === 'acknowledged') return; } catch (_) {}
  const notice = document.createElement('section');
  notice.setAttribute('role', 'region');
  notice.setAttribute('aria-label', 'Cookies and privacy');
  const root = notice.attachShadow({mode: 'open'});
  root.innerHTML = `<style>
    :host { position:fixed; bottom:0; left:0; right:0; z-index:9999; }
    .box { box-sizing:border-box; max-width:760px; margin:12px auto; padding:20px; background:#101827; color:#fff; border:1px solid #34d399; border-radius:16px; box-shadow:0 4px 28px #0008; font:15px/1.5 system-ui,sans-serif; }
    h2 { margin:0 0 8px; font-size:18px; } p { margin:0 0 14px; }
    a { color:#6ee7b7; text-decoration:underline; } button { background:#6ee7b7; color:#071c16; border:0; border-radius:8px; padding:12px 20px; font:700 15px system-ui; cursor:pointer; }
    button:focus-visible,a:focus-visible { outline:3px solid #fff; outline-offset:4px; }
    @media(max-width:790px) { .box { margin:10px; padding:16px; margin-bottom:max(10px,env(safe-area-inset-bottom)); } }
  </style><div class="box"><h2>Cookies &amp; privacy</h2><p>We use browser storage to remember that you have seen this notice. Secure sign-in may also use browser storage. Our public website uses Google AdSense. Google and its partners may use cookies to serve, measure and personalize ads. Where required, a separate Google consent message lets you consent, decline or manage your choices. Clicking Understood only dismisses this notice; it does not give advertising consent. External links have their own privacy practices. <a href="/privacy.html">Read our Privacy Policy</a>.</p><button type="button">Understood</button></div>`;
  root.querySelector('button').addEventListener('click', () => {
    try { localStorage.setItem(key, 'acknowledged'); } catch (_) {}
    notice.remove();
  });
  document.body.appendChild(notice);
})();
