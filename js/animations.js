/* ============================================
   COGIT — Animations Controller
   IntersectionObserver, scroll reveals
   ============================================ */

// ── Scroll Reveal Observer ──
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ── Process Steps Observer ──
function initProcessAnimation() {
  const steps = document.querySelectorAll('.process-step');

  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -80px 0px'
  });

  steps.forEach(step => observer.observe(step));
}

// ── Smooth Scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      const mobileMenu = document.querySelector('.mobile-menu');
      const menuToggle = document.querySelector('.menu-toggle');
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
      }
    });
  });
}

// ── Initialize Animations ──
function initAnimations() {
  initScrollReveal();
  initProcessAnimation();
  initSmoothScroll();
}
