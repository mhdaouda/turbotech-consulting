/**
 * TurboTech — localisation visiteur (pays / continent) et contenus de confiance par zone.
 * Pays : BJ, TG, GA, NG, FR, CH, BE, NL, CA — repli continent → Europe / Amériques / Afrique.
 */
(function (global) {
  'use strict';

  /** Ancienne barre sticky : retirée du HTML mais peut réapparaître via cache JS. */
  function removeLegacyRegionUi() {
    document.querySelectorAll('#region-banner, .region-banner, #region-picker').forEach(function (el) {
      el.remove();
    });
    document.body.classList.remove('region-active');
  }

  removeLegacyRegionUi();

  var STORAGE_KEY = 'turbotech_region_v2';
  var LEGACY_STORAGE_KEY = 'turbotech_region_v1';

  var PROFILE = {
    benin: {
      mapCode: 'BJ',
      label: 'Bénin',
      zoneHref: 'zones-benin.html',
      localStat: 'Expertise ancrée au Bénin et en Afrique de l’Ouest.',
      servicesLead:
        'Projets web et mobile, infrastructure et cybersécurité adaptés au contexte ouest-africain : connectivité, budgets et déploiement sur site au Bénin.',
      servicesTags: ['Sur site Cotonou', 'Mobile money', 'Réseau & cloud'],
      trustHero:
        'accompagne les entreprises au Bénin avec une équipe à Cotonou : projets web, infra et cybersécurité pensés pour vos réalités terrain (connectivité, budget, délais).',
      trustAbout:
        'Nous intervenons sur site à Cotonou et à distance dans tout le pays. Français, WhatsApp et visio — des interlocuteurs qui connaissent le marché local.',
      trustContact:
        'Décrivez votre projet : nous vous répondons rapidement (WhatsApp ou e-mail), en fuseau GMT+1, avec un premier cadrage sans engagement.',
    },
    togo: {
      mapCode: 'TG',
      label: 'Togo',
      zoneHref: 'zones-togo.html',
      localStat: 'Présence et projets au Togo.',
      servicesLead:
        'Accompagnement digital au Togo : applications métiers, réseau et sécurité, avec une équipe habituée aux contraintes locales.',
      servicesTags: ['Lomé & provinces', 'Web & mobile', 'Infra'],
      trustHero:
        'accompagne les entreprises au Togo — applications métiers, réseau et sécurité, avec des livraisons adaptées à Lomé et aux provinces.',
      trustAbout:
        'Équipe habituée aux déploiements au Togo : francophone, réactive, et capable d’intervenir à distance ou sur site selon l’urgence.',
      trustContact:
        'Premier contact par message ou visio : nous clarifions votre besoin et vos délais avant toute proposition commerciale.',
    },
    gabon: {
      mapCode: 'GA',
      label: 'Gabon',
      zoneHref: 'zones-gabon.html',
      localStat: 'Interventions au Gabon et en zone CEMAC.',
      servicesLead:
        'Solutions IT pour entreprises au Gabon : plateformes web, cloud et cybersécurité, en français, avec interventions à distance ou sur site.',
      servicesTags: ['Libreville', 'Cloud', 'Cybersécurité'],
      trustHero:
        'accompagne les entreprises au Gabon — plateformes web, cloud et cybersécurité en français, à Libreville ou à distance.',
      trustAbout:
        'Nous comprenons les enjeux des structures au Gabon : souveraineté des données, continuité de service et interlocuteurs stables.',
      trustContact:
        'Expliquez votre contexte (secteur, site, délais) : réponse personnalisée et proposition d’étapes claires.',
    },
    nigeria: {
      mapCode: 'NG',
      label: 'Nigeria',
      zoneHref: 'zones-nigeria.html',
      localStat: 'Delivery in English & French for Nigeria.',
      servicesLead:
        'Delivery in English or French: web & mobile products, secure infrastructure and cybersecurity for Nigerian businesses.',
      servicesTags: ['EN / FR', 'Fintech-ready', 'Cloud & SOC'],
      trustHero:
        'supports businesses in Nigeria with web & mobile delivery, secure infrastructure and cybersecurity — in English or French.',
      trustAbout:
        'We work with Nigerian teams remotely and on site when needed, with clear milestones and documentation your stakeholders can trust.',
      trustContact:
        'Tell us about your stack and timeline — we reply with a practical next step, no hard sell on the first call.',
    },
    europe: {
      mapCode: 'FR',
      label: 'Europe',
      zoneHref: 'zones-france.html',
      localStat: 'Même exigence en France, Suisse, Belgique et Pays-Bas.',
      servicesLead:
        'Même offre en France, Suisse, Belgique et Pays-Bas : développement web & mobile, cloud, cybersécurité, RGPD et accompagnement DSI — à distance ou sur site.',
      servicesTags: ['RGPD', 'Cloud UE', 'Remote & on-site'],
      europeCountries: { FR: 'France', CH: 'Suisse', BE: 'Belgique', NL: 'Pays-Bas' },
      trustHero:
        'accompagne les entreprises en Europe (France, Suisse, Belgique, Pays-Bas) : delivery agile, cloud, cybersécurité et conformité RGPD — remote ou sur site.',
      trustAbout:
        'Méthodes éprouvées, interlocuteurs stables et livrables documentés : nous parlons le langage des DSI, des directions métier et des équipes techniques.',
      trustContact:
        'Décrivez votre besoin : réponse sous 24–48 h ouvrées, visio aux horaires européens, premier échange pour cadrer sans engagement.',
    },
    canada: {
      mapCode: 'CA',
      label: 'Canada',
      zoneHref: 'zones-canada.html',
      localStat: 'Collaboration FR/EN, fuseaux Amérique du Nord.',
      servicesLead:
        'Services alignés sur le marché canadien : produits numériques bilingues, cloud, conformité et cybersécurité, collaboration en fuseaux NA.',
      servicesTags: ['FR / EN', 'Cloud', 'Télétravail'],
      trustHero:
        'collabore avec des équipes au Canada et en Amérique du Nord : produits bilingues, cloud et cybersécurité, aux horaires qui vous conviennent.',
      trustAbout:
        'Nous travaillons en français et en anglais, avec des livraisons structurées et une communication adaptée aux fuseaux nord-américains.',
      trustContact:
        'Partagez votre contexte (province, stack, échéance) : premier échange pour valider la faisabilité et les modalités.',
    },
  };

  var DIRECT = {
    BJ: 'benin',
    TG: 'togo',
    GA: 'gabon',
    NG: 'nigeria',
    FR: 'europe',
    CH: 'europe',
    BE: 'europe',
    NL: 'europe',
    CA: 'canada',
  };

  var ZONE_PAGES = {
    benin: 'zones-benin.html',
    togo: 'zones-togo.html',
    gabon: 'zones-gabon.html',
    nigeria: 'zones-nigeria.html',
    europe: 'zones-france.html',
    canada: 'zones-canada.html',
  };

  var EUROPE_PAGE = {
    FR: 'zones-france.html',
    CH: 'zones-suisse.html',
    BE: 'zones-belgique.html',
    NL: 'zones-pays-bas.html',
  };

  function hasConsent() {
    if (global.TurboTechCookies && global.TurboTechCookies.hasConsent()) return true;
    try {
      var s = localStorage.getItem('turbotech_cookie_consent');
      if (s === 'allow' || s === 'dismiss') return true;
    } catch (e) {
      /* ignore */
    }
    var cookie = document.cookie || '';
    return cookie.indexOf('cookieconsent_status=dismiss') !== -1 || cookie.indexOf('cookieconsent_status=allow') !== -1;
  }

  function footerNeedsUpdate() {
    var el = document.querySelector('[data-region-footer-location]');
    if (!el) return false;
    var t = (el.textContent || '').trim();
    return !t || t === '…' || t === '...';
  }

  function shouldRefreshGeo(stored) {
    if (!stored || !stored.profileKey) return true;
    if (!stored.locationLabel) return true;
    if (footerNeedsUpdate()) return true;
    return false;
  }

  function profileForKey(key) {
    return PROFILE[key] || PROFILE.benin;
  }

  function formatLocation(city, countryName) {
    if (city && countryName) return city + ', ' + countryName;
    if (countryName) return countryName;
    return '';
  }

  function resolveFromCountry(countryCode, continentCode, source) {
    var cc = (countryCode || '').toUpperCase();
    var continent = (continentCode || '').toUpperCase();
    var profileKey = DIRECT[cc];
    var detectedName = null;
    var fallbackKind = null;

    if (profileKey === 'europe') {
      detectedName = PROFILE.europe.europeCountries[cc] || null;
      return buildState(profileKey, cc, source, detectedName, null, null, null);
    }

    if (profileKey) {
      return buildState(profileKey, cc, source, null, null, null, null);
    }

    if (continent === 'EU') {
      return buildState('europe', 'FR', source, null, 'europe', null, null);
    }
    if (continent === 'NA' || continent === 'SA') {
      return buildState('canada', 'CA', source, null, 'americas', null, null);
    }
    if (continent === 'AF') {
      return buildState('benin', 'BJ', source, null, 'africa', null, null);
    }

    return buildState('benin', 'BJ', source || 'default', null, 'global', null, null);
  }

  function enrichFromGeo(state, geo) {
    var city = (geo && geo.city) || '';
    var countryName = (geo && geo.country_name) || state.displayLabel;
    var rawCode = (geo && geo.country_code) ? geo.country_code.toUpperCase() : state.countryCode;

    if (!DIRECT[rawCode] && countryName) {
      state.detectedCountryName = countryName;
      if (state.fallbackKind === 'europe') {
        state.displayLabel = countryName;
      }
    }

    state.city = city;
    state.countryName = countryName;
    state.locationLabel = formatLocation(city, countryName);
    state.bannerMessage = buildBannerMessage(state);
    return state;
  }

  function buildState(profileKey, countryCode, source, detectedCountryName, fallbackKind, city, countryName) {
    var p = profileForKey(profileKey);
    var cc = (countryCode || p.mapCode).toUpperCase();
    var zoneHref = ZONE_PAGES[profileKey] || p.zoneHref;

    if (profileKey === 'europe') {
      zoneHref = EUROPE_PAGE[cc] || PROFILE.europe.zoneHref;
      if (!detectedCountryName && PROFILE.europe.europeCountries[cc]) {
        detectedCountryName = PROFILE.europe.europeCountries[cc];
      }
    }

    var displayLabel = detectedCountryName || p.label;

    var state = {
      profileKey: profileKey,
      countryCode: cc,
      mapCode: profileKey === 'europe' && EUROPE_PAGE[cc] ? cc : p.mapCode,
      source: source || 'geo',
      displayLabel: displayLabel,
      zoneHref: zoneHref,
      servicesLead: p.servicesLead,
      servicesTags: p.servicesTags.slice(),
      fallbackKind: fallbackKind,
      localStat: p.localStat,
      trustHero: p.trustHero,
      trustAbout: p.trustAbout,
      trustContact: p.trustContact,
      city: city || '',
      countryName: countryName || displayLabel,
      locationLabel: formatLocation(city, countryName || displayLabel),
      detectedCountryName: null,
    };

    state.bannerMessage = buildBannerMessage(state);
    return state;
  }

  function buildBannerMessage(state) {
    var loc = state.locationLabel;
    var intro = loc
      ? 'Vous consultez depuis ' + loc + '. '
      : 'Bienvenue sur TurboTech Consulting. ';

    if (state.fallbackKind === 'europe') {
      return (
        intro +
        'Nous appliquons la même offre qu’en France, Suisse, Belgique et Pays-Bas (Europe) — pour vous rassurer sur la méthode et la conformité.'
      );
    }
    if (state.fallbackKind === 'americas') {
      return (
        intro +
        'Nous alignons nos services sur le marché canadien (Amérique du Nord) : bilingue FR/EN et collaboration à distance.'
      );
    }
    if (state.fallbackKind === 'africa') {
      return (
        intro +
        'Notre siège est au Bénin : nous vous proposons le même accompagnement de proximité pour l’Afrique de l’Ouest.'
      );
    }
    if (state.profileKey === 'europe' && PROFILE.europe.europeCountries[state.countryCode]) {
      return (
        intro +
        'Offre identique en France, Suisse, Belgique et Pays-Bas : cloud, RGPD et cybersécurité — équipe habituée à votre pays.'
      );
    }
    if (state.profileKey === 'nigeria') {
      return (
        intro +
        'We tailor web, infrastructure and cybersecurity services for Nigeria — EN/FR, clear delivery and local context.'
      );
    }
    return (
      intro +
      'Services et modalités adaptés à ' +
      state.displayLabel +
      ' : une équipe qui connaît votre zone.'
    );
  }

  function loadStored() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        raw = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (raw) {
          var legacy = JSON.parse(raw);
          if (legacy && legacy.profileKey && !legacy.locationLabel) {
            return null;
          }
        }
      }
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveStored(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignore */
    }
  }

  function fetchGeoJson(url, signal) {
    return fetch(url, {
      signal: signal,
      headers: { Accept: 'application/json' },
    }).then(function (res) {
      if (!res.ok) throw new Error('geo');
      return res.json();
    });
  }

  function mapGeoPayload(data) {
    return {
      city: data.city || '',
      country_name: data.country_name || data.country || '',
      country_code: (data.country_code || '').toUpperCase(),
      continent_code: (data.continent_code || guessContinent(data.country_code) || '').toUpperCase(),
    };
  }

  function stateFromMapped(mapped, source) {
    var state = resolveFromCountry(mapped.country_code, mapped.continent_code, source || 'geo');
    return enrichFromGeo(state, mapped);
  }

  function fetchGeo() {
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timeout = controller
      ? global.setTimeout(function () {
          controller.abort();
        }, 8000)
      : null;
    var signal = controller ? controller.signal : undefined;

    return fetchGeoJson('https://get.geojs.io/v1/ip/geo.json', signal)
      .then(function (data) {
        return stateFromMapped(mapGeoPayload(data), 'geo');
      })
      .catch(function () {
        return fetchGeoJson('https://ipwho.is/', signal).then(function (data) {
          if (!data.success) throw new Error('geo');
          return stateFromMapped(
            mapGeoPayload({
              city: data.city,
              country: data.country,
              country_code: data.country_code,
              continent_code: data.continent_code,
            }),
            'geo'
          );
        });
      })
      .catch(function () {
        return fetchGeoJson('https://ipapi.co/json/', signal).then(function (data) {
          return stateFromMapped(
            mapGeoPayload({
              city: data.city,
              country_name: data.country_name,
              country_code: data.country_code,
              continent_code: data.continent_code,
            }),
            'geo'
          );
        });
      })
      .catch(function () {
        var fallback = resolveFromBrowserLocale();
        fallback.locationLabel = fallback.countryName || fallback.displayLabel;
        fallback.bannerMessage = buildBannerMessage(fallback);
        return fallback;
      })
      .finally(function () {
        if (timeout) global.clearTimeout(timeout);
      });
  }

  function resolveFromBrowserLocale() {
    var lang = (navigator.language || 'fr').toUpperCase();
    var region = '';
    if (lang.indexOf('-') !== -1) {
      region = lang.split('-')[1];
    }
    if (region) {
      return resolveFromCountry(region, guessContinent(region), 'locale');
    }
    return resolveFromCountry('BJ', 'AF', 'default');
  }

  function guessContinent(cc) {
    var eu = ['FR', 'CH', 'BE', 'NL', 'LU', 'DE', 'IT', 'ES', 'PT', 'AT', 'IE', 'GB'];
    if (eu.indexOf(cc) !== -1) return 'EU';
    if (['US', 'CA', 'MX', 'BR'].indexOf(cc) !== -1) return 'NA';
    if (['BJ', 'TG', 'GA', 'NG', 'SN', 'CI'].indexOf(cc) !== -1) return 'AF';
    return '';
  }

  function applyToDocument(state) {
    if (!state || !document.body) return;
    document.body.dataset.regionProfile = state.profileKey;
    document.body.dataset.regionCountry = state.countryCode;

    var trustCard = document.getElementById('region-trust-card');
    if (trustCard) {
      trustCard.classList.add('hidden');
      trustCard.setAttribute('aria-hidden', 'true');
    }

    var lead = document.querySelector('[data-region-services-lead]');
    if (lead) lead.textContent = state.servicesLead;

    var heroIntro = document.querySelector('[data-region-hero-intro]');
    if (heroIntro && state.trustHero) {
      heroIntro.innerHTML =
        '<strong class="text-slate-200">TurboTech Consulting</strong> ' + state.trustHero;
    }

    var aboutTrust = document.querySelector('[data-region-about-trust]');
    if (aboutTrust && state.trustAbout) aboutTrust.textContent = state.trustAbout;

    var contactLead = document.querySelector('[data-region-contact-lead]');
    if (contactLead && state.trustContact) contactLead.textContent = state.trustContact;

    var localStat = document.querySelector('[data-region-local-stat]');
    if (localStat && state.localStat) localStat.textContent = state.localStat;

    var footerLocation = document.querySelector('[data-region-footer-location]');
    if (footerLocation) {
      var place = state.locationLabel || state.countryName || state.displayLabel || '';
      footerLocation.textContent = place ? ' ' + place + '.' : ' notre réseau international.';
    }

    var cards = document.querySelectorAll('#services .service-card');
    if (cards.length && state.servicesTags.length) {
      cards.forEach(function (card, i) {
        var tag = state.servicesTags[i % state.servicesTags.length];
        var badge = card.querySelector('[data-region-badge]');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'region-service-badge';
          badge.setAttribute('data-region-badge', '');
          var title = card.querySelector('.service-title');
          if (title) title.insertAdjacentElement('afterend', badge);
        }
        badge.textContent = tag;
      });
    }

    document.querySelectorAll('.country-tile[data-country]').forEach(function (tile) {
      var c = tile.getAttribute('data-country');
      tile.classList.toggle('country-tile--active', c === state.mapCode);
    });

    var paysList = document.getElementById('pays-list');
    if (paysList) {
      var items = Array.from(paysList.querySelectorAll('li'));
      items.sort(function (a, b) {
        var ta = a.querySelector('[data-country]');
        var tb = b.querySelector('[data-country]');
        var ac = ta ? ta.getAttribute('data-country') : '';
        var bc = tb ? tb.getAttribute('data-country') : '';
        if (ac === state.mapCode) return -1;
        if (bc === state.mapCode) return 1;
        return 0;
      });
      items.forEach(function (li) {
        paysList.appendChild(li);
      });
    }

    global.dispatchEvent(new CustomEvent('turbotech:region', { detail: state }));
  }

  function applyGeoState(state) {
    saveStored(state);
    applyToDocument(state);
    if (typeof global.initInterventionMapRegion === 'function') {
      global.initInterventionMapRegion(state.mapCode);
    }
  }

  function runGeoDetection() {
    if (!hasConsent()) return;

    var stored = loadStored();
    if (stored && stored.profileKey && !shouldRefreshGeo(stored)) {
      applyToDocument(stored);
      if (typeof global.initInterventionMapRegion === 'function') {
        global.initInterventionMapRegion(stored.mapCode);
      }
      return;
    }

    if (stored && stored.profileKey) {
      applyToDocument(stored);
    }

    fetchGeo()
      .then(applyGeoState)
      .catch(function () {
        var fallback = resolveFromBrowserLocale();
        applyGeoState(fallback);
      });
  }

  function onConsentGranted() {
    runGeoDetection();
  }

  function setManualCountry(mapCode) {
    var cc = (mapCode || '').toUpperCase();
    var state = resolveFromCountry(cc, DIRECT[cc] === 'europe' ? 'EU' : guessContinent(cc), 'manual');
    if (state.profileKey === 'europe' && PROFILE.europe.europeCountries[cc]) {
      state.displayLabel = PROFILE.europe.europeCountries[cc];
      state.locationLabel = state.displayLabel;
      state.bannerMessage = buildBannerMessage(state);
    }
    applyGeoState(state);
  }

  function init() {
    removeLegacyRegionUi();

    var onConsent = function () {
      runGeoDetection();
    };

    global.addEventListener('turbotech:cookies-accepted', onConsent);

    if (hasConsent()) {
      runGeoDetection();
    }

    global.addEventListener('load', function () {
      if (hasConsent() && footerNeedsUpdate()) {
        runGeoDetection();
      }
    });
  }

  global.TurboTechRegion = {
    init: init,
    onConsentGranted: onConsentGranted,
    setManualCountry: setManualCountry,
    applyToDocument: applyToDocument,
    resolveFromCountry: resolveFromCountry,
    fetchGeo: fetchGeo,
    runGeoDetection: runGeoDetection,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
