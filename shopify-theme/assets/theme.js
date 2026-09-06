/**
 * EyeNova Qatar — Client Interactions & Optical Customizer
 */

(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ *
   * 1. Scroll-aware shrinking header
   *    Header starts tall, smoothly collapses once the user scrolls.
   * ------------------------------------------------------------------ */
  function initShrinkHeader() {
    const header = document.getElementById('SiteHeader');
    if (!header) return;

    const SHRINK_AT = 40; // px scrolled before collapse
    let ticking = false;
    let lastState = null;

    function apply() {
      const scrolled = window.scrollY > SHRINK_AT;
      if (scrolled !== lastState) {
        header.classList.toggle('is-shrunk', scrolled);
        lastState = scrolled;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(apply);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    apply(); // set initial state (handles reloads mid-page)
  }

  /* ------------------------------------------------------------------ *
   * 2. Scroll reveal — fade / slide sections in as they enter view
   * ------------------------------------------------------------------ */
  function initScrollReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------ *
   * 3. Mobile navigation drawer
   * ------------------------------------------------------------------ */
  function initMobileDrawer() {
    const drawer = document.getElementById('mobileNavDrawer');
    const backdrop = document.getElementById('mobileNavBackdrop');
    if (!drawer || !backdrop) return;

    function open() {
      drawer.classList.add('mobile-nav-drawer-open');
      backdrop.classList.add('mobile-nav-backdrop-open');
      document.body.classList.add('drawer-lock-scroll');
    }
    function close() {
      drawer.classList.remove('mobile-nav-drawer-open');
      backdrop.classList.remove('mobile-nav-backdrop-open');
      document.body.classList.remove('drawer-lock-scroll');
    }

    // Expose for inline onclick handlers in the header markup
    window.openMobileDrawer = open;
    window.closeMobileDrawer = close;

    document.querySelectorAll('[data-mobile-nav-open]').forEach((btn) =>
      btn.addEventListener('click', open)
    );
    document.querySelectorAll('[data-mobile-nav-close]').forEach((btn) =>
      btn.addEventListener('click', close)
    );

    const legacyOpen = document.getElementById('mobileMenuOpenBtn');
    const legacyClose = document.getElementById('mobileMenuCloseBtn');
    if (legacyOpen) legacyOpen.addEventListener('click', open);
    if (legacyClose) legacyClose.addEventListener('click', close);

    backdrop.addEventListener('click', close);
    // Close on link tap inside the drawer
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  /* ------------------------------------------------------------------ *
   * 4. Prescription lens option selection
   * ------------------------------------------------------------------ */
  function initRxPills() {
    const rxPills = document.querySelectorAll('.rx-option-pill');
    const rxTypeInput = document.getElementById('selected-lens-type');
    if (!rxPills.length || !rxTypeInput) return;

    rxPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        rxPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const lensVal = pill.getAttribute('data-value') || '';
        rxTypeInput.value = lensVal;

        const manualFields = document.getElementById('manual-rx-fields');
        if (manualFields) {
          const needsManual =
            lensVal.includes('Single') ||
            lensVal.includes('Progressive') ||
            lensVal.includes('رؤية') ||
            lensVal.includes('تدريجية');
          manualFields.style.display = needsManual ? 'block' : 'none';
        }
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 5. AJAX cart drawer toggle
   * ------------------------------------------------------------------ */
  function initCartDrawer() {
    const cartToggleBtns = document.querySelectorAll('[data-cart-toggle]');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');

    function openCartDrawer() {
      if (!cartDrawer) return;
      cartDrawer.classList.add('open');
      if (cartOverlay) cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeCartDrawer() {
      if (!cartDrawer) return;
      cartDrawer.classList.remove('open');
      if (cartOverlay) cartOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    cartToggleBtns.forEach((btn) =>
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartDrawer();
      })
    );

    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

    const closeBtn = document.querySelector('[data-cart-close]');
    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCartDrawer();
    });
  }

  /* ------------------------------------------------------------------ *
   * Boot
   * ------------------------------------------------------------------ */
  function init() {
    initShrinkHeader();
    initScrollReveal();
    initMobileDrawer();
    initRxPills();
    initCartDrawer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
