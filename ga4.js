// GA4 (Google Analytics) — loads ONLY after the visitor accepts cookies.
// Include this AFTER cookie-consent.js on every page:
// <script src="cookie-consent.js"></script>
// <script src="ga4.js"></script>
//
// How it works:
// - On page load, checks window.pokosekConsent (set by cookie-consent.js).
// - If already 'accepted', loads GA4 immediately.
// - Otherwise waits for the 'pokosek-consent' event and loads GA4 only if
//   the visitor clicks "Přijmout vše".
// - If the visitor clicks "Pouze nezbytné" (or never decides), GA4 never loads
//   and no Google Analytics cookies are ever set.
//
// To track a conversion (e.g. a submitted form) elsewhere in the code, call:
//   if (window.gtag) { window.gtag('event', 'generate_lead'); }

(function () {
  var GA_ID = 'G-R7GMF43H3F';
  var loaded = false;

  function loadGA() {
    if (loaded) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };

    window.gtag('js', new Date());
    // anonymize_ip / other privacy defaults can be added here if needed
    window.gtag('config', GA_ID);

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  if (window.pokosekConsent === 'accepted') {
    loadGA();
  }

  document.addEventListener('pokosek-consent', function (e) {
    if (e.detail === 'accepted') loadGA();
  });
})();
