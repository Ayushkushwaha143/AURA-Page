// ============================================
// AURA — Premium SaaS Landing Page
// Vanilla JS: nav toggle, smooth scroll, scroll reveal
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile hamburger menu ----------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Open menu');
  }

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close menu');
  }

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    // Close mobile menu when a link inside it is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ---------- Smooth scrolling for in-page nav links ----------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---------- Watch Demo -> scroll to product showcase ----------
  const watchDemoBtn = document.getElementById('watchDemoBtn');
  const showcaseSection = document.getElementById('showcase');
  if (watchDemoBtn && showcaseSection) {
    watchDemoBtn.addEventListener('click', () => {
      showcaseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ---------- Scroll reveal via IntersectionObserver ----------
  const revealEls = document.querySelectorAll('.reveal');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // ---------- Navbar background on scroll (subtle) ----------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 12) {
        navbar.style.borderBottomColor = 'rgba(255,255,255,0.14)';
      } else {
        navbar.style.borderBottomColor = 'rgba(255,255,255,0.08)';
      }
    }, { passive: true });
  }

});