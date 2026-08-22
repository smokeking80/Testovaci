// Cookie consent banner — shared across all pages
// Include: <script src="cookie-consent.js"></script>
// Usage once consent is decided: window.pokosekConsent === 'accepted' | 'rejected' | null
// When adding marketing scripts later (GA4, Meta Pixel, Google Ads), only load them if
// window.pokosekConsent === 'accepted', and listen for the 'pokosek-consent' event to react live.

(function(){
  var KEY = 'pokosekCookieConsent';

  function getConsent(){
    try { return localStorage.getItem(KEY); } catch(e){ return null; }
  }
  function setConsent(val){
    try { localStorage.setItem(KEY, val); } catch(e){}
    window.pokosekConsent = val;
    document.dispatchEvent(new CustomEvent('pokosek-consent', { detail: val }));
  }

  window.pokosekConsent = getConsent();

  // Always wire up "change cookie settings" links/buttons, regardless of prior choice
  document.addEventListener('click', function(e){
    var el = e.target.closest('.cookie-settings-link');
    if(!el) return;
    e.preventDefault();
    try { localStorage.removeItem(KEY); } catch(err){}
    location.reload();
  });

  if (window.pokosekConsent) return; // already decided — don't show banner again

  var style = document.createElement('style');
  style.textContent = `
#cookieBar{
  position:fixed;left:0;right:0;bottom:0;z-index:500;
  display:flex;flex-wrap:wrap;align-items:center;gap:20px;
  justify-content:space-between;
  padding:20px clamp(20px,5vw,48px);
  background:var(--charcoal,#16201A);
  border-top:1px solid rgba(255,255,255,.1);
  box-shadow:0 -12px 30px rgba(0,0,0,.25);
  transform:translateY(100%);
  transition:transform .4s cubic-bezier(.22,1,.36,1);
}
#cookieBar.show{transform:translateY(0)}
#cookieBar .cookie-text{flex:1;min-width:240px;color:rgba(255,255,255,.85);font-family:var(--sans,sans-serif)}
#cookieBar .cookie-text strong{display:block;color:#fff;font-size:.95rem;margin-bottom:4px}
#cookieBar .cookie-text p{font-size:.82rem;line-height:1.6;margin:0;color:rgba(255,255,255,.6)}
#cookieBar .cookie-text a{color:var(--sage-glow,#8FBF8A);text-decoration:underline}
#cookieBar .cookie-actions{display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap}
.cookie-btn{
  padding:11px 20px;border-radius:2px;font-family:var(--sans,sans-serif);
  font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  cursor:pointer;transition:all .2s;border:1.5px solid transparent;white-space:nowrap;
}
.cookie-btn.ghost{background:transparent;border-color:rgba(255,255,255,.25);color:rgba(255,255,255,.8)}
.cookie-btn.ghost:hover{border-color:#fff;color:#fff}
.cookie-btn.solid{background:var(--green,#3E7A46);color:#fff}
.cookie-btn.solid:hover{background:var(--green-mid,#5FA366)}
@media(max-width:600px){#cookieBar{padding:18px 20px}.cookie-actions{width:100%}.cookie-btn{flex:1}}
`;
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.id = 'cookieBar';
  bar.innerHTML =
    '<div class="cookie-text">' +
      '<strong>Používáme cookies</strong>' +
      '<p>Nezbytné cookies pro chod webu používáme vždy. Se souhlasem bychom rádi měřili návštěvnost a zobrazovali relevantní reklamu. Více v <a href="gdpr.html#cookies">zásadách ochrany osobních údajů</a>.</p>' +
    '</div>' +
    '<div class="cookie-actions">' +
      '<button type="button" id="cookieReject" class="cookie-btn ghost">Pouze nezbytné</button>' +
      '<button type="button" id="cookieAccept" class="cookie-btn solid">Přijmout vše</button>' +
    '</div>';
  document.body.appendChild(bar);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ bar.classList.add('show'); }); });

  function hide(){
    bar.classList.remove('show');
    setTimeout(function(){ bar.remove(); }, 400);
  }
  document.getElementById('cookieAccept').addEventListener('click', function(){ setConsent('accepted'); hide(); });
  document.getElementById('cookieReject').addEventListener('click', function(){ setConsent('rejected'); hide(); });
})();
