/* Optional public-site measurement. No Google Analytics request before opt-in. */
(() => {
  const id = 'G-VJ0QMFFPCM';
  const key = 'accuracy-website-measurement-v1';
  let allowed = false;
  let initialized = false;
  let choice = null;
  try { choice = localStorage.getItem(key); } catch (_) {}
  const host = document.createElement('div');
  const root = host.attachShadow({mode:'open'});
  root.innerHTML = `<style>:host{position:fixed;left:12px;bottom:12px;z-index:10000;font:14px/1.5 Arial,sans-serif;color:#102c27}section{max-width:390px;background:#f7f8f2;border:1px solid #9ba994;border-radius:14px;padding:18px;box-shadow:0 8px 35px #0002}h2{font-size:17px;margin:0 0 8px}p{margin:0 0 12px}button{font:600 12px Arial;padding:10px 14px;border:1px solid #102c27;border-radius:7px;background:#f7f8f2;color:#102c27;cursor:pointer;margin:4px}button:focus-visible,a:focus-visible{outline:3px solid #52945f;outline-offset:3px}a{color:#102c27;text-decoration:underline}[hidden]{display:none!important}@media(max-width:480px){section{max-width:calc(100vw - 24px)}}</style><section hidden aria-label="Optional website measurement"><h2>Help us improve Accuracy Score</h2><p>Allow Google Analytics cookies to measure visits and app-store button clicks, including campaign performance? This is optional. Advertising consent is managed separately by Google’s consent message. <a href="/privacy.html">Privacy policy</a>.</p><button data-choice="yes">Allow measurement</button><button data-choice="no">Decline measurement</button></section><button id="settings">Measurement settings</button>`;
  const panel = root.querySelector('section');
  const settings = root.querySelector('#settings');
  function apply(value) {
    allowed = value === 'yes';
    window['ga-disable-' + id] = !allowed;
    if (!allowed) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    if (!initialized) {
      initialized = true;
      window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      window.gtag('consent','update',{analytics_storage:'granted'});
      window.gtag('js',new Date());
      window.gtag('config',id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname});
      window.gtag('event','page_view',{send_to:id,page_location:location.origin+location.pathname,page_title:document.title});
      const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(script);
    } else window.gtag('consent','update',{analytics_storage:'granted'});
  }
  root.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
    choice=button.dataset.choice;
    try{localStorage.setItem(key,choice);}catch(_){}
    if(choice==='no' && initialized) window.gtag('consent','update',{analytics_storage:'denied'});
    apply(choice); panel.hidden=true;settings.hidden=false;
  }));
  settings.addEventListener('click',()=>{panel.hidden=false;settings.hidden=true;});
  document.body.appendChild(host);
  // A separate, explicit choice; never reuse acknowledgment of the privacy notice.
  panel.hidden = true;settings.hidden=false;
  apply(choice);
  document.addEventListener('click',event=>{
    if(!allowed || !initialized) return;
    const link=event.target.closest('a[href]');if(!link) return;
    let url;try{url=new URL(link.href);}catch(_){return;}
    if(url.hostname==='play.google.com' && url.pathname==='/store/apps/details' && url.searchParams.get('id')==='com.accuracyscore.app') {
      window.gtag('event','website_play_click',{send_to:id,store:'google_play',transport_type:'beacon'});
    }
  });
})();
