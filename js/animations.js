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

// ── Brand Intro / Reveal Animation (~2.0s) ──
function initBrandIntro() {
  const introEl = document.getElementById('brand-intro');
  if (!introEl) return;

  // Respect reduced motion accessibility
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    introEl.classList.add('is-hidden');
    return;
  }

  // Lock scroll during the 1.5s intro
  document.body.classList.add('intro-animating');

  let isExited = false;
  function exitIntro() {
    if (isExited) return;
    isExited = true;

    introEl.classList.add('is-exiting');
    document.body.classList.remove('intro-animating');

    setTimeout(() => {
      introEl.classList.add('is-hidden');
    }, 520);
  }

  // Immediate dismiss on click/touch
  introEl.addEventListener('click', exitIntro, { once: true });

  // Auto dissolve into the site at 1.6s (total transition finishes at ~2.1s)
  setTimeout(exitIntro, 1600);

  // Safety fallback
  setTimeout(() => {
    document.body.classList.remove('intro-animating');
    if (!introEl.classList.contains('is-hidden')) {
      introEl.classList.add('is-hidden');
    }
  }, 2400);
}

// ── Initialize Animations ──
function initAnimations() {
  initBrandIntro();
  initScrollReveal();
  initProcessAnimation();
  initSmoothScroll();
}

