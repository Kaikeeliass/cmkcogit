/* ============================================
   COGIT — Form Controller
   Validation, masks, submission
   ============================================ */

function initForm() {
  const form = document.getElementById('contact-form');
  const formContainer = document.querySelector('.contact-form');
  const formSuccess = document.getElementById('form-success');

  if (!form) return;

  // ── WhatsApp Mask ──
  const whatsappInput = document.getElementById('whatsapp');
  if (whatsappInput) {
    whatsappInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');

      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }

      e.target.value = value;
    });
  }

  // ── Validation ──
  function validateField(field) {
    const group = field.closest('.form-group');
    if (!group) return true;

    const errorEl = group.querySelector('.form-error');
    let isValid = true;
    let errorMsg = '';

    // Required check
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMsg = 'Este campo é obrigatório';
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        errorMsg = 'Insira um e-mail válido';
      }
    }

    // WhatsApp validation
    if (field.id === 'whatsapp' && field.value.trim()) {
      const digits = field.value.replace(/\D/g, '');
      if (digits.length < 10) {
        isValid = false;
        errorMsg = 'Insira um número válido';
      }
    }

    if (!isValid) {
      group.classList.add('has-error');
      if (errorEl) errorEl.textContent = errorMsg;
    } else {
      group.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
    }

    return isValid;
  }

  // Validate on blur
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      if (group && group.classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  // ── Form Submission ──
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;

    requiredFields.forEach(field => {
      if (!validateField(field)) {
        allValid = false;
      }
    });

    if (!allValid) {
      // Focus first invalid field
      const firstError = form.querySelector('.has-error .form-input, .has-error .form-select, .has-error .form-textarea');
      if (firstError) firstError.focus();
      return;
    }

    // Collect form data
    const formData = {
      name: document.getElementById('name')?.value,
      company: document.getElementById('company')?.value,
      email: document.getElementById('email')?.value,
      whatsapp: document.getElementById('whatsapp')?.value,
      projectType: document.getElementById('project-type')?.value,
      description: document.getElementById('description')?.value,
      budget: document.getElementById('budget-range')?.value
    };

    // Log form data (replace with actual submission logic)
    console.log('Form submitted:', formData);

    // Fire analytics event
    if (typeof trackEvent === 'function') {
      trackEvent('lead_form_submitted', {
        event_category: 'conversion',
        event_label: formData.projectType || 'unknown',
        value: formData.budget || ''
      });
    }

    // Redirect to thank-you page for conversion tracking
    window.location.href = '/obrigado.html';
  });
}
