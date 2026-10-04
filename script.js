(() => {
  'use strict';

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Keep all content visible if AOS fails to load or the visitor prefers reduced motion.
  if (window.AOS && !prefersReducedMotion) {
    document.documentElement.classList.remove('no-js');
    window.AOS.init({ once: true, duration: 500, easing: 'ease-out' });
  }
})();
