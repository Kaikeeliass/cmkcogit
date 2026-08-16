/* ============================================
   COGIT — Main Entry Point
   Initializes all modules on DOM ready
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all dynamic components
  initComponents();

  // Initialize configurator
  initConfigurator();

  // Initialize header (sticky + mobile menu)
  initHeader();

  // Initialize animations (scroll reveals, counters)
  initAnimations();

  // Initialize form validation
  initForm();

  // WhatsApp button with popup
  initWhatsApp();
});

// ── WhatsApp Float with Popup ──
function initWhatsApp() {
  const whatsappBtn = document.getElementById('whatsapp-float-btn');
  const popup = document.getElementById('whatsapp-popup');
  const closeBtn = document.getElementById('whatsapp-popup-close');
  const optionsContainer = document.getElementById('whatsapp-popup-options');

  if (!whatsappBtn || !popup) return;

  // Render options
  if (optionsContainer && typeof whatsappOptions !== 'undefined') {
    optionsContainer.innerHTML = whatsappOptions.map(opt => `
      <button class="whatsapp-popup-option" data-message="${encodeURIComponent(opt.message)}" type="button">
        ${opt.label}
      </button>
    `).join('');

    // Bind option clicks
    optionsContainer.querySelectorAll('.whatsapp-popup-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const message = decodeURIComponent(btn.dataset.message);
        const baseUrl = socialLinks.whatsapp || 'https://wa.me/5517981568889';
        const url = `${baseUrl}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        popup.classList.remove('is-open');
      });
    });
  }

  // Toggle popup
  whatsappBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.toggle('is-open');
  });

  // Close popup
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.remove('is-open');
    });
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    const floatEl = document.getElementById('whatsapp-float');
    if (floatEl && !floatEl.contains(e.target)) {
      popup.classList.remove('is-open');
    }
  });
}
