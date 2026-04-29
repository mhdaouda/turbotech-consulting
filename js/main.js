/* TurboTech Consulting – main.js
 * Interactions: scroll-aware header, mobile menu, AOS init,
 * smooth scroll, dynamic year.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
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
  });

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initPageLoader() {
    const loader = document.getElementById('page-loader');
    const bar = document.getElementById('loader-bar');
    const pct = document.getElementById('loader-pct');
    if (!loader || !bar || !pct) return;

    if (prefersReducedMotion()) {
      bar.style.width = '100%';
      pct.textContent = '100';
      loader.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
      return;
    }

    let current = 0;
    let target = 72; // fast initial feedback
    let raf = null;
    let done = false;

    const tick = () => {
      // Ease towards target to feel "alive" even on fast loads.
      const speed = current < 65 ? 0.22 : 0.12;
      current += (target - current) * speed;
      const shown = Math.max(0, Math.min(99, Math.floor(current)));
      bar.style.width = shown + '%';
      pct.textContent = String(shown);

      if (!done) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // When all resources are loaded, finish quickly then fade out.
    window.addEventListener('load', () => {
      done = true;
      if (raf) cancelAnimationFrame(raf);
      bar.style.width = '100%';
      pct.textContent = '100';

      // small delay for perceived smoothness
      setTimeout(() => {
        loader.classList.add('is-hidden');
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-loaded');
      }, 180);
    });

    // Safety: if "load" never fires for some reason, don't block the page.
    setTimeout(() => {
      if (loader.classList.contains('is-hidden')) return;
      bar.style.width = '100%';
      pct.textContent = '100';
      loader.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
    }, 6000);
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
})();
