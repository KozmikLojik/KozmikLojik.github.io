(() => {
  'use strict';

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (window.AOS && !prefersReducedMotion) {
    document.documentElement.classList.remove('no-js');
    window.AOS.init({ once: true, duration: 560, easing: 'ease-out' });
  } else {
    document.documentElement.classList.remove('no-js');
  }

  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');

  const setMenuOpen = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', open);
  };

  toggle?.addEventListener('click', () => {
    setMenuOpen(!nav.classList.contains('is-open'));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const navLinks = [...(nav?.querySelectorAll('a[href^="#"]') || [])];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', active);
        });
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });

    sections.forEach((section) => observer.observe(section));
  }

  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !email || !message) {
      if (status) status.textContent = 'Please complete every field.';
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:pritbhatt2010@gmail.com?subject=${subject}&body=${body}`;
    if (status) status.textContent = 'Opening your email client…';
    form.reset();
  });
})();
