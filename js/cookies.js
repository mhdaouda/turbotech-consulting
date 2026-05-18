/**
 * Bandeau cookies — aligné sur https://www.daoudayinde.com/ (cookieconsent2, thème classic).
 */
(function () {
  'use strict';

  var CONSENT_KEY = 'turbotech_cookie_consent';

  function hasConsent() {
    try {
      var s = localStorage.getItem(CONSENT_KEY);
      return s === 'allow' || s === 'dismiss';
    } catch (e) {
      return false;
    }
  }

  function notifyAccepted() {
    window.dispatchEvent(new CustomEvent('turbotech:cookies-accepted'));
    if (window.TurboTechRegion && typeof window.TurboTechRegion.onConsentGranted === 'function') {
      window.TurboTechRegion.onConsentGranted();
    }
  }

  function initCookieConsent() {
    if (typeof window.cookieconsent === 'undefined') return;

    if (hasConsent()) {
      notifyAccepted();
    }

    window.cookieconsent.initialise({
      palette: {
        popup: { background: '#000000', text: '#ffffff' },
        button: { background: '#f1d600', text: '#000000' },
        highlight: { background: 'transparent', text: '#f1d600' },
      },
      theme: 'classic',
      position: 'bottom',
      content: {
        message: 'Ce site utilise des cookies pour améliorer votre expérience.',
        dismiss: 'Accepter',
        link: 'En savoir plus',
        href: 'politique-confidentialite.html',
      },
      onInitialise: function () {
        if (hasConsent()) notifyAccepted();
      },
      onStatusChange: function () {
        try {
          localStorage.setItem(CONSENT_KEY, this.status);
        } catch (e) {
          /* ignore */
        }
        if (this.status === 'allow' || this.status === 'dismiss') {
          notifyAccepted();
        }
      },
    });
  }

  window.TurboTechCookies = { hasConsent: hasConsent };

  window.addEventListener('load', initCookieConsent);
})();
