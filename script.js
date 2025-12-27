/* script.js — FINAL CLEAN VERSION
   Purpose: smooth UX helpers only (no gimmicks)
*/

(() => {
  'use strict';

  // Smooth scrolling for internal links
  function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', `#${id}`);
      });
    });
  }

  // Dark / light mode toggle
  function setupModeToggle() {
    const btn = document.createElement('button');
    btn.textContent = 'Theme';
    btn.style.position = 'fixed';
    btn.style.left = '20px';
    btn.style.bottom = '20px';
    btn.style.padding = '10px 14px';
    btn.style.borderRadius = '10px';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = '9999';

    document.body.appendChild(btn);

    let light = localStorage.getItem('mode') === 'light';

    function apply() {
      document.body.classList.toggle('light-mode', light);
      localStorage.setItem('mode', light ? 'light' : 'dark');
    }

    btn.addEventListener('click', () => {
      light = !light;
      apply();
    });

    apply();
  }

  // Back to top button
  function setupBackToTop() {
    const btn = document.createElement('button');
    btn.textContent = '↑ Top';
    btn.style.position = 'fixed';
    btn.style.right = '24px';
    btn.style.bottom = '24px';
    btn.style.padding = '10px 14px';
    btn.style.borderRadius = '10px';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.opacity = '0';
    btn.style.transition = 'opacity 200ms ease';
    btn.style.zIndex = '9999';

    document.body.appendChild(btn);

    btn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );

    window.addEventListener('scroll', () => {
      btn.style.opacity = window.scrollY > 300 ? '1' : '0';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupSmoothAnchors();
    setupModeToggle();
    setupBackToTop();
  });
})();
