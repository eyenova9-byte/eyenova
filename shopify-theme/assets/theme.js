/**
 * EyeNova Qatar - Client Interactions & Storefront Scripts
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * 1. Header scroll handler (native sticky positioning)
   * ------------------------------------------------------------------ */
  function initShrinkHeader() {
    // Header uses native CSS sticky positioning for 60/120fps scrolling
  }

  /* ------------------------------------------------------------------ *
   * 2. Scroll reveal - instant visibility, no animation lag
   * ------------------------------------------------------------------ */
  function initScrollReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    targets.forEach((el) => el.classList.add('is-visible'));
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
