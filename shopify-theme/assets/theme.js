/**
 * EyeNova Qatar — Client Interactions & Optical Customizer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Prescription Lens Option Selection
  const rxPills = document.querySelectorAll('.rx-option-pill');
  const rxTypeInput = document.getElementById('selected-lens-type');
  
  if (rxPills.length > 0 && rxTypeInput) {
    rxPills.forEach(pill => {
      pill.addEventListener('click', () => {
        rxPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const lensVal = pill.getAttribute('data-value');
        rxTypeInput.value = lensVal;
        
        const manualFields = document.getElementById('manual-rx-fields');
        if (manualFields) {
          if (lensVal.includes('Single') || lensVal.includes('Progressive') || lensVal.includes('رؤية') || lensVal.includes('تدريجية')) {
            manualFields.style.display = 'block';
          } else {
            manualFields.style.display = 'none';
          }
        }
      });
    });
  }

  // 2. AJAX Cart Drawer Toggle
  const cartToggleBtns = document.querySelectorAll('[data-cart-toggle]');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');

  function openCartDrawer() {
    if (cartDrawer) {
      cartDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    if (cartDrawer) {
      cartDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  cartToggleBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCartDrawer();
  }));

  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCartDrawer);
  }

  const closeBtn = document.querySelector('[data-cart-close]');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCartDrawer);
  }
});
