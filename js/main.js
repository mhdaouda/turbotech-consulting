/* TurboTech Consulting – main.js
 * Interactions: scroll-aware header, mobile menu, AOS init,
 * smooth scroll, dynamic year.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.classList.add('is-loading');
    document.body.classList.add('is-loading');
    initPageLoader();
    initAOS();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initDynamicYear();
    initOrbParallax();
    initScrollProgress();
    initSpotlight();
    initInterventionMap();
    initHeroCarousel();
  });

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initPageLoader() {
    const loader = document.getElementById('page-loader');
    const skipBtn = document.getElementById('loader-skip');
    if (!loader) return;

    const stepBrand = document.getElementById('loader-step-brand');
    const stepStartup = document.getElementById('loader-step-startup');
    const stepZones = document.getElementById('loader-step-zones');
    const stepMap = document.getElementById('loader-step-map');

    let dismissed = false;
    const timeouts = [];

    const reveal = (el) => {
      if (el) el.classList.add('is-visible');
    };

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      timeouts.forEach(clearTimeout);
      document.removeEventListener('keydown', onEscape);
      loader.classList.add('is-hidden');
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
      if (skipBtn) {
        skipBtn.disabled = true;
        skipBtn.setAttribute('aria-hidden', 'true');
      }
    };

    const schedule = (fn, ms) => {
      const id = setTimeout(() => {
        if (!dismissed) fn();
      }, ms);
      timeouts.push(id);
    };

    skipBtn?.addEventListener('click', dismiss);

    const onEscape = (e) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onEscape);

    const timelineStart = performance.now();
    /** Carte visible à ~MAP_STEP_MS ; on la laisse MAP_DWELL_MS avant fermeture auto */
    const MAP_STEP_MS = 3600;
    const MAP_DWELL_MS = 2800;

    if (prefersReducedMotion()) {
      reveal(stepBrand);
      reveal(stepStartup);
      reveal(stepZones);
      reveal(stepMap);
      window.addEventListener('load', () => schedule(dismiss, 400));
      schedule(dismiss, 4500);
      return;
    }

    schedule(() => reveal(stepBrand), 50);
    schedule(() => reveal(stepStartup), 1450);
    schedule(() => reveal(stepZones), 2500);
    schedule(() => reveal(stepMap), MAP_STEP_MS);

    window.addEventListener('load', () => {
      const now = performance.now();
      const sequenceEnd = timelineStart + MAP_STEP_MS + MAP_DWELL_MS;
      const linger = Math.max(650, sequenceEnd - now);
      schedule(dismiss, linger);
    });

    schedule(dismiss, 18000);
  }

  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic',
      });
    }
  }

  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  function initDynamicYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  function initOrbParallax() {
    if (prefersReducedMotion()) return;

    const orbs = Array.from(document.querySelectorAll('.bg-orb'));
    if (orbs.length === 0) return;

    let mx = 0;
    let my = 0;
    let raf = null;

    const apply = () => {
      raf = null;
      // subtle parallax (px) – keep it small to avoid nausea
      const x = (mx - 0.5) * 18;
      const y = (my - 0.5) * 14;

      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.35;
        orb.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
      });
    };

    const onMove = (e) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
  }

  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const pct = (doc.scrollTop / max) * 100;
      bar.style.width = pct.toFixed(2) + '%';
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  function initSpotlight() {
    const el = document.getElementById('spotlight');
    if (!el || prefersReducedMotion()) return;

    document.body.classList.add('has-spotlight');

    let mx = 0.5;
    let my = 0.3;
    let raf = null;

    const apply = () => {
      raf = null;
      el.style.setProperty('--sx', (mx * 100).toFixed(2) + '%');
      el.style.setProperty('--sy', (my * 100).toFixed(2) + '%');
    };

    const onMove = (e) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    apply();
  }

  function initInterventionMap() {
    const card = document.getElementById('hero-intervention-card');
    if (!card) return;

    const svg = card.querySelector('.world-map-svg');
    const tip = card.querySelector('#map-tip');
    if (!svg) return;

    const markers = Array.from(svg.querySelectorAll('.mk[data-country]'));
    const chips = Array.from(card.querySelectorAll('.country-chip[data-country]'));
    const markerByCode = new Map(markers.map((m) => [m.getAttribute('data-country'), m]));
    const chipByCode = new Map(chips.map((c) => [c.getAttribute('data-country'), c]));

    const getLabel = (code) => {
      const m = markerByCode.get(code);
      if (!m) return code;
      const t = m.querySelector('.lbl');
      return (t && t.textContent) ? t.textContent.trim() : code;
    };

    const clear = () => {
      markers.forEach((m) => m.classList.remove('is-active'));
      chips.forEach((c) => c.classList.remove('is-active'));
      if (tip) tip.classList.remove('is-visible');
    };

    const activate = (code, showTip = true) => {
      clear();
      const m = markerByCode.get(code);
      const c = chipByCode.get(code);
      if (m) m.classList.add('is-active');
      if (c) c.classList.add('is-active');

      if (!tip || !m || !showTip) return;
      const pin = m.querySelector('.pin');
      if (!pin) return;
      const cx = pin.getAttribute('cx');
      const cy = pin.getAttribute('cy');
      if (!cx || !cy) return;

      // Map SVG coords to container via percentages
      const vb = svg.viewBox.baseVal;
      const px = (Number(cx) / vb.width) * 100;
      const py = (Number(cy) / vb.height) * 100;
      tip.style.setProperty('--tx', px.toFixed(2) + '%');
      tip.style.setProperty('--ty', py.toFixed(2) + '%');
      tip.textContent = getLabel(code);
      tip.classList.add('is-visible');
    };

    const wireMarker = (m) => {
      const code = m.getAttribute('data-country');
      if (!code) return;
      m.addEventListener('mouseenter', () => activate(code, true));
      m.addEventListener('focus', () => activate(code, true));
      m.addEventListener('click', () => activate(code, true));
      m.addEventListener('mouseleave', () => clear());
      m.addEventListener('blur', () => clear());
      m.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate(code, true);
        }
      });
    };

    const wireChip = (c) => {
      const code = c.getAttribute('data-country');
      if (!code) return;
      c.addEventListener('mouseenter', () => activate(code, true));
      c.addEventListener('focus', () => activate(code, true));
      c.addEventListener('click', () => activate(code, true));
      c.addEventListener('mouseleave', () => clear());
      c.addEventListener('blur', () => clear());
    };

    markers.forEach(wireMarker);
    chips.forEach(wireChip);

    // Default highlight
    activate('BJ', false);
  }

  function initHeroCarousel() {
    const root = document.getElementById('hero-carousel');
    const track = document.getElementById('hero-carousel-track');
    const prev = document.getElementById('hero-carousel-prev');
    const next = document.getElementById('hero-carousel-next');
    const dotsWrap = document.getElementById('hero-carousel-dots');
    if (!root || !track || !dotsWrap) return;

    const slides = Array.from(track.querySelectorAll('.hero-carousel-slide'));
    const dots = Array.from(dotsWrap.querySelectorAll('[data-carousel-dot]'));
    const n = slides.length;
    if (n === 0 || dots.length !== n) return;

    let index = 0;
    let timer = null;
    const autoplayMs = Math.max(3500, Number(root.dataset.autoplayMs) || 6500);

    const applyTransform = () => {
      track.style.transform = `translateX(-${(index * 100) / n}%)`;
    };

    const syncA11y = () => {
      slides.forEach((s, j) => {
        const hidden = j !== index;
        s.setAttribute('aria-hidden', hidden ? 'true' : 'false');
        if (hidden) {
          s.setAttribute('inert', '');
        } else {
          s.removeAttribute('inert');
        }
      });
      dots.forEach((d, j) => {
        const on = j === index;
        d.classList.toggle('is-active', on);
        d.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    };

    const go = (i) => {
      index = ((i % n) + n) % n;
      applyTransform();
      syncA11y();
    };

    const stopAutoplay = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (document.hidden) return;
      timer = setInterval(() => go(index + 1), autoplayMs);
    };

    prev?.addEventListener('click', () => {
      go(index - 1);
      startAutoplay();
    });
    next?.addEventListener('click', () => {
      go(index + 1);
      startAutoplay();
    });

    dots.forEach((d, j) => {
      d.addEventListener('click', () => {
        go(j);
        startAutoplay();
      });
    });

    /* Pause uniquement sur les flèches / points : la carte ne bloque plus l’autoplay */
    const controls = root.querySelector('.hero-carousel-controls');
    if (controls) {
      controls.addEventListener('mouseenter', stopAutoplay);
      controls.addEventListener('mouseleave', startAutoplay);
      controls.addEventListener('focusin', stopAutoplay);
      controls.addEventListener('focusout', () => {
        window.setTimeout(() => {
          if (!controls.contains(document.activeElement)) startAutoplay();
        }, 0);
      });
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    track.style.width = `${n * 100}%`;

    go(0);
    startAutoplay();
  }
})();
