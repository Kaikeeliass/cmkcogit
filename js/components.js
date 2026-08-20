/* ============================================
   COGIT — Dynamic Component Rendering
   Renders data-driven sections from data.js
   ============================================ */

function getIcon(name) {
  return ICONS[name] || '';
}

// ── Render Challenge Grid ──
function renderChallenge() {
  const container = document.getElementById('challenge-grid');
  if (!container || typeof challengeData === 'undefined' || !challengeData.length) return;

  container.innerHTML = challengeData.map((item, i) => `
    <a href="${item.ctaLink}" class="challenge-card reveal reveal-delay-${i + 1}" id="challenge-${item.id}">
      <div class="challenge-card-icon">${getIcon(item.icon)}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="challenge-card-tags">
        ${item.tags.map(t => `<span>${t}</span>`).join('')}
      </div>
      <span class="challenge-card-cta">${item.cta}</span>
    </a>
  `).join('');
}

// ── Render Hero Interactive — Diagnóstico Consultivo (5 Desafios + Objetivos + Contexto + Resultado) ──
function renderHeroInteractive() {
  const container = document.getElementById('hero-interactive-container');
  if (!container) return;

  // ── Desafios de negócio (Etapa 1 — Ícones outline profissionais e monocromáticos) ──
  const CHALLENGES = [
    {
      id: 'presenca',
      title: 'Presença digital',
      phrase: 'Fortalecer marca e gerar novas oportunidades.',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="15" rx="2.5"/><line x1="2" y1="8" x2="22" y2="8"/><circle cx="5.5" cy="5.5" r="0.75" fill="currentColor"/><circle cx="8" cy="5.5" r="0.75" fill="currentColor"/><path d="M8 21h8"/><path d="M12 18v3"/></svg>'
    },
    {
      id: 'automacao',
      title: 'Automação',
      phrase: 'Eliminar tarefas manuais e melhorar processos.',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><circle cx="6" cy="18" r="2"/><path d="M9 6h5a2 2 0 0 1 2 2v7"/><path d="M6 9v7"/><polyline points="13 13 16 16 13 19"/></svg>'
    },
    {
      id: 'sistema',
      title: 'Sistema',
      phrase: 'Criar uma solução para uma operação específica.',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><path d="M7 11v2"/><path d="M17 11v2"/><path d="M11 7h2"/><path d="M11 17h2"/></svg>'
    },
    {
      id: 'produto',
      title: 'Produto digital',
      phrase: 'Transformar uma ideia em plataforma escalável.',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/></svg>'
    },
    {
      id: 'outro',
      title: 'Outro desafio',
      phrase: 'Encontrar o melhor caminho tecnológico.',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/></svg>'
    }
  ];

  // ── Objetivos contextuais por desafio (Etapa 2) ──
  const OBJECTIVES_MAP = {
    presenca: [
      { id: 'apresentar', label: 'Apresentar melhor minha empresa' },
      { id: 'gerar-clientes', label: 'Gerar novos clientes' },
      { id: 'autoridade', label: 'Transmitir mais autoridade' },
      { id: 'comunicacao', label: 'Melhorar minha comunicação digital' }
    ],
    automacao: [
      { id: 'reduzir-manual', label: 'Reduzir trabalho manual' },
      { id: 'integrar', label: 'Integrar ferramentas' },
      { id: 'produtividade', label: 'Ganhar produtividade' },
      { id: 'erros', label: 'Eliminar erros operacionais' }
    ],
    sistema: [
      { id: 'organizar', label: 'Organizar minha operação' },
      { id: 'centralizar', label: 'Centralizar informações' },
      { id: 'processo', label: 'Criar um processo próprio' },
      { id: 'planilhas', label: 'Substituir planilhas' }
    ],
    produto: [
      { id: 'tirar-papel', label: 'Tirar minha ideia do papel' },
      { id: 'mvp', label: 'Criar um MVP funcional' },
      { id: 'saas', label: 'Lançar uma plataforma SaaS' },
      { id: 'validar', label: 'Validar meu conceito' }
    ],
    outro: [
      { id: 'problema', label: 'Resolver um problema específico' },
      { id: 'explorar', label: 'Explorar possibilidades tecnológicas' },
      { id: 'viabilidade', label: 'Avaliar viabilidade de uma ideia' }
    ]
  };

  // ── Mapeamento de resultado (desafio + objetivo → solução sugerida + descrição) ──
  const SOLUTIONS_MAP = {
    'presenca:apresentar':       { solution: 'Site institucional estratégico', desc: 'Fortalecer marca, apresentar serviços e gerar confiança com o mercado.' },
    'presenca:gerar-clientes':   { solution: 'Landing Page de conversão', desc: 'Capturar e qualificar leads com uma página focada em resultado comercial.' },
    'presenca:autoridade':       { solution: 'Site com portfólio e cases', desc: 'Demonstrar expertise, cases reais e posicionar a empresa como referência.' },
    'presenca:comunicacao':      { solution: 'Site institucional + conteúdo', desc: 'Estruturar a comunicação digital com clareza e consistência de marca.' },
    'automacao:reduzir-manual':  { solution: 'Automação de processos internos', desc: 'Identificar e eliminar tarefas repetitivas, liberando a equipe para o estratégico.' },
    'automacao:integrar':        { solution: 'Integrações via API', desc: 'Conectar ferramentas que funcionam de forma isolada em um fluxo unificado.' },
    'automacao:produtividade':   { solution: 'Fluxos automatizados', desc: 'Automatizar rotinas operacionais para aumentar capacidade sem aumentar equipe.' },
    'automacao:erros':           { solution: 'Processos automatizados com validação', desc: 'Criar fluxos com regras e verificações que reduzem erros na operação.' },
    'sistema:organizar':         { solution: 'Sistema de gestão personalizado', desc: 'Uma aplicação desenvolvida exatamente para os processos da sua empresa.' },
    'sistema:centralizar':       { solution: 'Painel administrativo sob medida', desc: 'Centralizar informações e controles em uma única plataforma acessível.' },
    'sistema:processo':          { solution: 'Sistema de fluxo operacional', desc: 'Digitalizar e automatizar decisões com regras de negócio personalizadas.' },
    'sistema:planilhas':         { solution: 'Aplicação web de gestão', desc: 'Substituir planilhas por um sistema robusto com histórico, validação e permissões.' },
    'produto:tirar-papel':       { solution: 'MVP funcional', desc: 'Transformar o conceito em um produto real e validado no mercado rapidamente.' },
    'produto:mvp':               { solution: 'MVP estruturado e testável', desc: 'Primeira versão funcional com as features essenciais para coletar feedback.' },
    'produto:saas':              { solution: 'Plataforma SaaS escalável', desc: 'Arquitetura preparada para crescer com modelo de receita recorrente.' },
    'produto:validar':           { solution: 'Protótipo validável', desc: 'Versão inicial para testar hipóteses e colher feedback de usuários reais.' },
    'outro:problema':            { solution: 'Consultoria técnica inicial', desc: 'Analisar o desafio específico e definir a solução tecnológica mais adequada.' },
    'outro:explorar':            { solution: 'Diagnóstico tecnológico', desc: 'Mapear possibilidades digitais e identificar oportunidades para o negócio.' },
    'outro:viabilidade':         { solution: 'Análise de viabilidade técnica', desc: 'Avaliar escopo, riscos e estimativa de investimento para o projeto.' }
  };

  function getSolution(challenge, objective) {
    const key = `${challenge}:${objective}`;
    return SOLUTIONS_MAP[key] || { solution: 'Solução tecnológica sob medida', desc: 'A COGIT irá analisar seu cenário e propor o caminho mais adequado.' };
  }

  // ── State ──
  const state = {
    step: 0,
    challenge: null,
    objective: null,
    context: ''
  };

  try {
    const saved = sessionStorage.getItem('cogit_diag_state');
    if (saved) {
      const p = JSON.parse(saved);
      if (p && CHALLENGES.some(c => c.id === p.challenge)) {
        state.challenge = p.challenge;
        state.objective = p.objective || null;
        state.context = p.context || '';
      }
    }
  } catch (e) {}

  function saveState() {
    try { sessionStorage.setItem('cogit_diag_state', JSON.stringify({ challenge: state.challenge, objective: state.objective, context: state.context })); } catch (e) {}
  }

  function transitionTo(renderFn, direction = 'next') {
    const wrapper = container.querySelector('.hero-step-wrapper');
    if (wrapper) {
      wrapper.classList.add(direction === 'next' ? 'is-fading-left' : 'is-fading-right');
      setTimeout(() => {
        renderFn();
        const nw = container.querySelector('.hero-step-wrapper');
        if (nw) {
          nw.classList.add(direction === 'next' ? 'is-entering-right' : 'is-entering-left');
          requestAnimationFrame(() => setTimeout(() => nw.classList.remove('is-entering-right', 'is-entering-left'), 30));
        }
      }, 150);
    } else { renderFn(); }
  }

  function renderProgressBar(currentStep, total) {
    const labels = ['Desafio', 'Objetivo', 'Contexto'];
    return `<div class="hero-progress-bar" role="progressbar" aria-valuenow="${currentStep}" aria-valuemin="1" aria-valuemax="${total}">
      ${labels.map((label, i) => {
        const stepNum = i + 1;
        const isDone = currentStep > stepNum;
        const isActive = currentStep === stepNum;
        return `<div class="hero-progress-step ${isDone ? 'is-done' : ''} ${isActive ? 'is-active' : ''}">
          <div class="hero-progress-dot">${isDone ? '<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : `<span>${stepNum}</span>`}</div>
          <span class="hero-progress-label">${label}</span>
        </div>${i < labels.length - 1 ? `<div class="hero-progress-line${isDone ? ' is-done' : ''}"></div>` : ''}`;
      }).join('')}
    </div>`;
  }

  // ── ETAPA 0: Convite ──
  function renderStep0() {
    state.step = 0;
    container.innerHTML = `
      <div class="hero-step-wrapper hero-invite-view">
        <div class="hero-invite-content">
          <div class="hero-invite-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <div class="hero-invite-text">
            <p class="hero-invite-eyebrow">DIAGNÓSTICO INICIAL</p>
            <h2 class="hero-invite-title">Vamos entender<br>seu momento.</h2>
            <p class="hero-invite-desc">Conte o que sua empresa precisa. A COGIT identifica o melhor caminho tecnológico.</p>
          </div>
          <button type="button" class="btn-hero-montar btn-hero-start" id="hero-btn-start">
            Começar diagnóstico <span>→</span>
          </button>
          <p class="hero-invite-meta">3 perguntas · menos de 1 minuto</p>
        </div>
      </div>
    `;
    const startBtn = document.getElementById('hero-btn-start');
    if (startBtn) startBtn.addEventListener('click', () => transitionTo(renderStep1, 'next'));
  }

  // ── ETAPA 1: Escolha do Desafio ──
  function renderStep1() {
    state.step = 1;

    const cardsHtml = CHALLENGES.map(ch => `
      <div class="hero-challenge-card ${state.challenge === ch.id ? 'is-selected' : ''}"
           data-id="${ch.id}" role="radio" aria-checked="${state.challenge === ch.id}" tabindex="0">
        <span class="hero-challenge-icon">${ch.iconSvg}</span>
        <div class="hero-challenge-body">
          <span class="hero-challenge-title">${ch.title}</span>
          <span class="hero-challenge-phrase">${ch.phrase}</span>
        </div>
        <div class="hero-challenge-check">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="hero-step-wrapper hero-step-1-view">
        <div class="hero-interactive-header">
          <div class="hero-discovery-topbar">
            <span class="hero-discovery-tag">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              DIAGNÓSTICO
            </span>
            ${renderProgressBar(1, 3)}
          </div>
          <h2 class="hero-interactive-title">O que sua empresa precisa hoje?</h2>
          <p class="hero-interactive-desc">Escolha o desafio mais próximo do seu momento atual.</p>
        </div>

        <div class="hero-challenges-list" role="radiogroup" aria-label="Selecione o desafio">
          ${cardsHtml}
        </div>

        <div class="hero-discovery-footer">
          <button type="button" class="btn-hero-back hero-btn-back-invite" id="hero-btn-back-invite">← Voltar</button>
          <button type="button" class="btn-hero-montar" id="hero-btn-continue-1" ${state.challenge ? '' : 'disabled'}>
            Continuar <span>→</span>
          </button>
        </div>
      </div>
    `;

    // Events
    const cards = container.querySelectorAll('.hero-challenge-card');
    const continueBtn = document.getElementById('hero-btn-continue-1');
    const backBtn = document.getElementById('hero-btn-back-invite');

    cards.forEach(card => {
      const select = () => {
        state.challenge = card.dataset.id;
        state.objective = null; // reset downstream
        saveState();
        cards.forEach(c => { c.classList.remove('is-selected'); c.setAttribute('aria-checked', 'false'); });
        card.classList.add('is-selected');
        card.setAttribute('aria-checked', 'true');
        if (continueBtn) continueBtn.removeAttribute('disabled');
      };
      card.addEventListener('click', select);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } });
    });

    if (backBtn) backBtn.addEventListener('click', () => transitionTo(renderStep0, 'back'));
    if (continueBtn) continueBtn.addEventListener('click', () => {
      if (!state.challenge) return;
      transitionTo(renderStep2, 'next');
    });
  }

  // ── ETAPA 2: Objetivo ──
  function renderStep2() {
    state.step = 2;

    const challenge = CHALLENGES.find(c => c.id === state.challenge);
    const objectives = OBJECTIVES_MAP[state.challenge] || [];

    const chipsHtml = objectives.map(obj => `
      <button type="button" class="hero-objective-chip ${state.objective === obj.id ? 'is-selected' : ''}" data-id="${obj.id}">
        ${obj.label}
      </button>
    `).join('');

    container.innerHTML = `
      <div class="hero-step-wrapper hero-step-2-view">
        <div class="hero-interactive-header">
          <div class="hero-discovery-topbar">
            <span class="hero-discovery-tag">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="12" r="10"/><path d="M12 17h.01"/></svg>
              OBJETIVO
            </span>
            ${renderProgressBar(2, 3)}
          </div>

          <div class="hero-challenge-context-bar">
            <span class="hero-challenge-context-icon">${challenge ? challenge.iconSvg : ''}</span>
            <span class="hero-challenge-context-name">${challenge ? challenge.title : ''}</span>
            <button type="button" class="hero-btn-edit-step" id="hero-btn-edit-challenge">Alterar</button>
          </div>

          <h2 class="hero-interactive-title" style="margin-top:10px;">Qual resultado você busca?</h2>
          <p class="hero-interactive-desc">Selecione o objetivo que mais se aproxima da sua necessidade.</p>
        </div>

        <div class="hero-objective-chips-grid" role="radiogroup" aria-label="Selecione o objetivo">
          ${chipsHtml}
        </div>

        <div class="hero-discovery-footer" style="margin-top: var(--space-4);">
          <button type="button" class="btn-hero-back" id="hero-btn-back-2">← Voltar</button>
          <button type="button" class="btn-hero-montar" id="hero-btn-continue-2" ${state.objective ? '' : 'disabled'}>
            Continuar <span>→</span>
          </button>
        </div>
      </div>
    `;

    const chips = container.querySelectorAll('.hero-objective-chip');
    const continueBtn = document.getElementById('hero-btn-continue-2');
    const backBtn = document.getElementById('hero-btn-back-2');
    const editBtn = document.getElementById('hero-btn-edit-challenge');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        state.objective = chip.dataset.id;
        saveState();
        chips.forEach(c => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        if (continueBtn) continueBtn.removeAttribute('disabled');
        if (typeof trackEvent === 'function') trackEvent('hero_objective_selected', chip.dataset.id);
      });
    });

    if (backBtn) backBtn.addEventListener('click', () => transitionTo(renderStep1, 'back'));
    if (editBtn) editBtn.addEventListener('click', () => transitionTo(renderStep1, 'back'));
    if (continueBtn) continueBtn.addEventListener('click', () => {
      if (!state.objective) return;
      transitionTo(renderStep3, 'next');
    });
  }

  // ── ETAPA 3: Contexto ──
  function renderStep3() {
    state.step = 3;

    container.innerHTML = `
      <div class="hero-step-wrapper hero-step-3-view">
        <div class="hero-interactive-header">
          <div class="hero-discovery-topbar">
            <span class="hero-discovery-tag">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              CONTEXTO
            </span>
            ${renderProgressBar(3, 3)}
          </div>
          <h2 class="hero-interactive-title">Existe algo específico que devemos entender?</h2>
          <p class="hero-interactive-desc">Campo opcional — nos ajuda a direcionar melhor sua orientação.</p>
        </div>

        <div class="hero-context-field">
          <textarea id="hero-context-input" class="hero-textarea hero-textarea-lg" rows="4"
            placeholder="Ex: Hoje controlamos tudo por planilhas e queremos organizar nosso processo de vendas e pós-venda...">${state.context || ''}</textarea>
        </div>

        <div class="hero-discovery-footer" style="margin-top: var(--space-4);">
          <button type="button" class="btn-hero-back" id="hero-btn-back-3">← Voltar</button>
          <button type="button" class="btn-hero-montar" id="hero-btn-finalize">
            Finalizar diagnóstico <span>→</span>
          </button>
        </div>
      </div>
    `;

    const textarea = document.getElementById('hero-context-input');
    const backBtn = document.getElementById('hero-btn-back-3');
    const finalBtn = document.getElementById('hero-btn-finalize');

    if (textarea) textarea.addEventListener('input', e => { state.context = e.target.value; saveState(); });
    if (backBtn) backBtn.addEventListener('click', () => transitionTo(renderStep2, 'back'));
    if (finalBtn) finalBtn.addEventListener('click', () => {
      if (textarea) state.context = textarea.value;
      saveState();
      transitionTo(renderAnalyzing, 'next');
    });
  }

  // ── TELA INTERMEDIÁRIA: Analisando ──
  function renderAnalyzing() {
    container.innerHTML = `
      <div class="hero-step-wrapper hero-analyzing-view">
        <div class="hero-analyzing-content">
          <div class="hero-analyzing-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <p class="hero-analyzing-label">Analisando seu cenário...</p>
          <div class="hero-analyzing-checks">
            <div class="hero-analyzing-check" id="acheck-1">
              <div class="hero-analyzing-check-dot"></div>
              <span>Desafio identificado</span>
            </div>
            <div class="hero-analyzing-check" id="acheck-2">
              <div class="hero-analyzing-check-dot"></div>
              <span>Objetivo mapeado</span>
            </div>
            <div class="hero-analyzing-check" id="acheck-3">
              <div class="hero-analyzing-check-dot"></div>
              <span>Direcionamento tecnológico definido</span>
            </div>
          </div>
        </div>
      </div>
    `;

    ['acheck-1', 'acheck-2', 'acheck-3'].forEach((id, i) => {
      setTimeout(() => { const el = document.getElementById(id); if (el) el.classList.add('is-done'); }, 450 + i * 430);
    });
    setTimeout(() => transitionTo(renderResult, 'next'), 450 + 3 * 430 + 650);
  }

  // ── RESULTADO: Diagnóstico Consultivo ──
  function renderResult() {
    const challenge = CHALLENGES.find(c => c.id === state.challenge);
    const objectives = OBJECTIVES_MAP[state.challenge] || [];
    const objData = objectives.find(o => o.id === state.objective);
    const solution = getSolution(state.challenge, state.objective);

    const phone = '5517981568889';
    let waMsg = `Olá! Fiz um diagnóstico no site da COGIT:\n\n*Desafio:* ${challenge ? challenge.title : state.challenge}\n*Objetivo:* ${objData ? objData.label : state.objective}\n*Solução identificada:* ${solution.solution}`;
    if (state.context && state.context.trim()) waMsg += `\n*Contexto:* ${state.context.trim()}`;
    waMsg += `\n\nGostaria de receber uma orientação técnica da equipe COGIT!`;
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(waMsg)}`;

    container.innerHTML = `
      <div class="hero-step-wrapper hero-result-view">
        <div class="hero-interactive-header">
          <div class="hero-discovery-topbar">
            <span class="hero-discovery-tag hero-discovery-tag--success">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              DIAGNÓSTICO CONCLUÍDO
            </span>
          </div>
          <h2 class="hero-interactive-title">Entendemos seu cenário.</h2>
          <p class="hero-interactive-desc">Identificamos uma possível direção para o seu momento.</p>
        </div>

        <div class="hero-result-card">
          <div class="hero-result-row">
            <span class="hero-result-label">Sua necessidade</span>
            <span class="hero-result-value"><span class="hero-result-icon-inline">${challenge ? challenge.iconSvg : ''}</span> ${challenge ? challenge.title : state.challenge}</span>
          </div>
          <div class="hero-result-divider"></div>
          <div class="hero-result-row">
            <span class="hero-result-label">Possível solução</span>
            <span class="hero-result-value hero-result-value--accent">${solution.solution}</span>
          </div>
          <div class="hero-result-divider"></div>
          <div class="hero-result-row hero-result-row--desc">
            <span class="hero-result-label">Objetivo</span>
            <span class="hero-result-desc">${solution.desc}</span>
          </div>
          ${state.context && state.context.trim() ? `
          <div class="hero-result-context">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>"${state.context.trim()}"</span>
          </div>` : ''}
        </div>

        <div class="hero-result-commitment">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Antes de desenvolver qualquer tecnologia, a COGIT entende o problema.
        </div>

        <div class="hero-summary-actions">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-hero-montar btn-hero-whatsapp" id="hero-btn-whatsapp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Receber orientação da COGIT
          </a>
          <div class="hero-summary-sub-actions">
            <a href="contato.html" class="hero-sub-link" id="hero-link-form">Ou preencher formulário detalhado →</a>
            <button type="button" class="hero-btn-restart-flow" id="hero-btn-restart">← Refazer diagnóstico</button>
          </div>
        </div>
      </div>
    `;

    const waBtn = document.getElementById('hero-btn-whatsapp');
    const formLink = document.getElementById('hero-link-form');
    const restartBtn = document.getElementById('hero-btn-restart');

    if (waBtn) waBtn.addEventListener('click', () => {
      if (typeof trackEvent === 'function') trackEvent('hero_whatsapp_conversion', { challenge: state.challenge, objective: state.objective });
    });

    if (restartBtn) restartBtn.addEventListener('click', () => {
      state.challenge = null; state.objective = null; state.context = '';
      saveState();
      transitionTo(renderStep0, 'back');
    });
  }

  // Expose global starter
  window.heroStartDiagnosis = function() {
    if (state.step === 0) {
      transitionTo(renderStep1, 'next');
    }
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // Initial render
  renderStep0();
}



function updateHomeDynamicRecommendations(flowId) {
  const container = document.getElementById('dynamic-rec-grid');
  const sectionTitle = document.getElementById('rec-section-title');
  const sectionDesc = document.getElementById('rec-section-desc');
  if (!container) return;

  if (sectionTitle) sectionTitle.textContent = "Para o seu desafio, começaríamos por aqui.";
  if (sectionDesc) sectionDesc.textContent = "Com base no que você selecionou, estas são as soluções com maior aderência ao seu objetivo:";

  if (flowId === 'automatizar-processo') {
    container.innerHTML = `
      <div class="dynamic-rec-card reveal reveal-delay-1" style="border-color: rgba(74, 61, 219, 0.4);">
        <span class="dynamic-rec-card-tag" style="background: var(--purple); color: #fff;">RECOMENDADO</span>
        <h3>Automação de Processos</h3>
        <p>Elimine tarefas repetitivas, conecte planilhas e integre fluxos operacionais com WhatsApp e e-mails.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Você indicou foco em produtividade e redução de trabalho manual.</div>
        <a href="solucoes/automacoes-e-integracoes.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-2">
        <span class="dynamic-rec-card-tag">CONEXÃO TÉCNICA</span>
        <h3>Integrações com APIs</h3>
        <p>Sincronização contínua de dados entre CRMs, sistemas legados, gateways e ferramentas de terceiros.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Garante que as ferramentas que você já usa trabalhem integradas.</div>
        <a href="solucoes/automacoes-e-integracoes.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-3">
        <span class="dynamic-rec-card-tag">VISIBILIDADE</span>
        <h3>Dashboards Gerenciais</h3>
        <p>Centralize indicadores e dados gerados pelos seus processos em painéis visuais em tempo real.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Acompanhe os resultados das rotinas automatizadas com clareza.</div>
        <a href="solucoes/plataformas-e-outras-solucoes.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
    `;
  } else if (flowId === 'vender-online') {
    container.innerHTML = `
      <div class="dynamic-rec-card reveal reveal-delay-1" style="border-color: rgba(74, 61, 219, 0.4);">
        <span class="dynamic-rec-card-tag" style="background: var(--purple); color: #fff;">RECOMENDADO</span>
        <h3>Site Institucional</h3>
        <p>Estrutura profissional com múltiplas páginas para transmitir credibilidade e autoridade da sua marca.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Ideal para comunicar seu posicionamento e gerar confiança no mercado.</div>
        <a href="solucoes/sites-e-landing-pages.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-2">
        <span class="dynamic-rec-card-tag">ALTA CONVERSÃO</span>
        <h3>Landing Page de Vendas</h3>
        <p>Página estratégica pensada para campanhas de tráfego e captura direta de leads qualificados.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Foco direto em conversão sem pontos de distração para o usuário.</div>
        <a href="solucoes/sites-e-landing-pages.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-3">
        <span class="dynamic-rec-card-tag">AUTOMAÇÃO COMERCIAL</span>
        <h3>Integração com WhatsApp</h3>
        <p>Direcione os leads do site diretamente para o WhatsApp com mensagens pré-formatadas.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Agiliza o primeiro contato comercial e aumenta as taxas de resposta.</div>
        <a href="solucoes/automacoes-e-integracoes.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
    `;
  } else if (flowId === 'sistema-operacao') {
    container.innerHTML = `
      <div class="dynamic-rec-card reveal reveal-delay-1" style="border-color: rgba(74, 61, 219, 0.4);">
        <span class="dynamic-rec-card-tag" style="background: var(--purple); color: #fff;">RECOMENDADO</span>
        <h3>Sistema Personalizado</h3>
        <p>Software desenvolvido exatamente para o fluxo de trabalho, regras e processos da sua equipe.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Centraliza a operação e elimina as falhas de planilhas e sistemas engessados.</div>
        <a href="solucoes/sistemas-personalizados.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-2">
        <span class="dynamic-rec-card-tag">GESTÃO VISUAL</span>
        <h3>Painel Administrativo</h3>
        <p>Controle de permissões, perfis de usuários e relatórios operacionais consolidados.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Garante segurança de dados e governança interna.</div>
        <a href="solucoes/sistemas-personalizados.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-3">
        <span class="dynamic-rec-card-tag">CONECTIVIDADE</span>
        <h3>Integrações de Banco de Dados</h3>
        <p>Conexão com sistemas financeiros, notas fiscais ou bancos legados.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Mantém a consistência das informações em toda a empresa.</div>
        <a href="solucoes/automacoes-e-integracoes.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
    `;
  } else if (flowId === 'ideia-papel') {
    container.innerHTML = `
      <div class="dynamic-rec-card reveal reveal-delay-1" style="border-color: rgba(74, 61, 219, 0.4);">
        <span class="dynamic-rec-card-tag" style="background: var(--purple); color: #fff;">RECOMENDADO</span>
        <h3>MVP Funcional</h3>
        <p>Primeira versão do produto digital para validação rápida de hipóteses e atração dos primeiros usuários.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Reduz o risco de investimento permitindo testar antes de construir um sistema gigante.</div>
        <a href="solucoes/saas-e-produtos-digitais.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-2">
        <span class="dynamic-rec-card-tag">ESCALABILIDADE</span>
        <h3>Produto SaaS</h3>
        <p>Arquitetura multi-inquilino, cobrança recorrente e infraestrutura em nuvem preparada para escala.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Estrutura sólida para modelos de receita recorrente.</div>
        <a href="solucoes/saas-e-produtos-digitais.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-3">
        <span class="dynamic-rec-card-tag">ECOSSISTEMA</span>
        <h3>Plataforma Digital</h3>
        <p>Ambiente que conecta múltiplos tipos de usuários com regras de negócio personalizadas.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Ideal para marketplaces e plataformas intermediárias.</div>
        <a href="solucoes/plataformas-e-outras-solucoes.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
    `;
  } else if (flowId === 'ainda-nao-sei') {
    container.innerHTML = `
      <div class="dynamic-rec-card reveal reveal-delay-1" style="border-color: rgba(74, 61, 219, 0.4);">
        <span class="dynamic-rec-card-tag" style="background: var(--purple); color: #fff;">DIAGNÓSTICO</span>
        <h3>Análise e Diagnóstico Técnico</h3>
        <p>Ajudamos a identificar os principais gargalos e oportunidades digitais para o momento atual da sua empresa.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Você indicou que ainda está avaliando o melhor formato técnico.</div>
        <a href="contato.html" class="dynamic-rec-card-cta">Falar com especialista <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-2">
        <span class="dynamic-rec-card-tag">AUTOMAÇÃO</span>
        <h3>Otimização de Processos</h3>
        <p>Identificação de rotinas manuais que podem ser integradas para liberar tempo da sua equipe.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Gera resultados rápidos e redução imediata de trabalho braçal.</div>
        <a href="solucoes/automacoes-e-integracoes.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
      <div class="dynamic-rec-card reveal reveal-delay-3">
        <span class="dynamic-rec-card-tag">PRESENÇA</span>
        <h3>Estruturação de Canais</h3>
        <p>Sites e canais de contato pensados para aumentar autoridade e gerar oportunidades comerciais.</p>
        <div class="dynamic-rec-card-why"><strong>Por que recomendamos:</strong> Garante que seu negócio seja encontrado e compreendido com clareza.</div>
        <a href="solucoes/sites-e-landing-pages.html" class="dynamic-rec-card-cta">Entender essa solução <span>→</span></a>
      </div>
    `;
  }
}

window.continueToConfigurator = function(preselectStr) {
  if (preselectStr) {
    sessionStorage.setItem('cogit_preselect', preselectStr);
  }
  const target = window.location.pathname.includes('/solucoes/') || window.location.pathname.includes('/projetos/') ? '../monte-sua-solucao.html' : 'monte-sua-solucao.html';
  window.location.href = target;
};

// ── Render Services Grid ──
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container || !servicesData.length) return;

  container.innerHTML = servicesData.map((service, i) => {
    const ctaText = service.id === 'outras-solucoes' ? 'Conte o que você precisa' : 'Conheça a solução';
    const targetUrl = service.id === 'outras-solucoes' ? '#contact' : '#configurator';
    
    return `
      <a href="${targetUrl}" class="service-card reveal reveal-delay-${(i % 3) + 1} ${service.highlight ? 'service-card-highlight' : ''}" id="service-${service.id}" aria-label="Conheça a solução de ${service.title}">
        <div class="service-card-header">
          ${service.tag ? `<span class="service-card-tag">${service.tag}</span>` : ''}
          <div class="service-card-icon">${getIcon(service.icon)}</div>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <span class="service-card-arrow">
          ${ctaText} ${getIcon('arrowRight')}
        </span>
      </a>
    `;
  }).join('');
}

// ── Render Process Timeline (Interactive) ──
function renderProcess() {
  const container = document.getElementById('process-steps-container');
  if (!container || !processData.length) return;

  container.innerHTML = processData.map((step, i) => `
    <div class="process-step" data-step="${i + 1}" id="process-step-${i + 1}">
      <div class="process-step-icon-wrapper">
        <div class="process-step-icon">${getIcon(step.icon)}</div>
        ${i < processData.length - 1 ? '<div class="process-step-line"><div class="process-step-line-fill"></div></div>' : ''}
      </div>
      <div class="process-step-content">
        <span class="process-step-number">${step.number}</span>
        <h3>${step.title}</h3>
        <p class="process-step-keywords">${step.keywords}</p>
        <p class="process-step-desc">${step.description}</p>
      </div>
    </div>
  `).join('');

  // Initialize Scroll Spy for Methodology
  initProcessScrollSpy();
}

function initProcessScrollSpy() {
  const steps = document.querySelectorAll('.process-step');
  const visualGraphic = document.getElementById('process-visual-graphic');
  if (!steps.length || !visualGraphic) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stepNum = entry.target.getAttribute('data-step');
        
        steps.forEach(s => s.classList.remove('active'));
        entry.target.classList.add('active');

        visualGraphic.className = 'process-visual-graphic state-' + stepNum;
      }
    });
  }, observerOptions);

  steps.forEach(step => observer.observe(step));
}

// ── Render Starting Points (Pricing) ──
function renderPricing() {
  const container = document.getElementById('pricing-grid');
  if (!container || !plansData.length) return;

  container.innerHTML = plansData.map((plan, i) => {
    let priceText = 'Sob análise';
    if (plan.priceId && typeof startingOptionsData !== 'undefined' && startingOptionsData[plan.priceId]) {
      const pData = startingOptionsData[plan.priceId];
      priceText = `R$ ${pData.basePrice.toLocaleString('pt-BR')}`;
    } else if (plan.price) {
      priceText = plan.price;
    }

    const preselectAttr = plan.primaryCtaPreselect ? `data-preselect='${JSON.stringify(plan.primaryCtaPreselect)}'` : '';

    return `
      <div class="pricing-card ${plan.cardType ? `pricing-card-${plan.cardType}` : ''} ${plan.featured ? 'is-featured' : ''} reveal reveal-delay-${i + 1}" id="plan-${plan.id}">
        
        <div class="pricing-card-header">
          <div class="pricing-card-id">
            <span class="pricing-card-number">${plan.number}</span>
            <span class="pricing-card-tag">${plan.tag}</span>
          </div>
          <h3 class="pricing-card-title">${plan.title}</h3>
          <p class="pricing-card-desc">${plan.description}</p>
        </div>

        <div class="pricing-card-ideal">
          <span class="pricing-ideal-label">IDEAL PARA</span>
          <p class="pricing-ideal-text">${plan.idealFor}</p>
        </div>

        <div class="pricing-card-block">
          <h4 class="pricing-block-title">${plan.solutionsHeader || 'SOLUÇÕES POSSÍVEIS'}</h4>
          <ul class="pricing-solutions-list">
            ${plan.solutions.map(sol => `<li>${sol}</li>`).join('')}
          </ul>
        </div>

        <div class="pricing-card-footer mt-auto">
          <div class="pricing-investment">
            <span class="pricing-investment-title">INVESTIMENTO INICIAL</span>
            ${plan.priceLabel ? `<span class="price-label">${plan.priceLabel}</span>` : ''}
            <span class="price-value">${priceText}</span>
            <p class="price-subtext">${plan.priceExplanation}</p>
            ${plan.secondaryExplanation ? `<p class="price-subtext-alt">${plan.secondaryExplanation}</p>` : ''}
          </div>
          
          ${plan.advancedNote ? `
            <div class="pricing-advanced-note">
              <p>${plan.advancedNote}</p>
              <a href="${plan.advancedLinkUrl}">${plan.advancedLinkText}</a>
            </div>
          ` : ''}

          ${plan.estimatedTime ? `<p class="pricing-time">Prazo estimado<br><strong>${plan.estimatedTime}</strong></p>` : ''}
          
          <div class="pricing-ctas">
            <button type="button" class="btn btn-primary pricing-cta-primary" ${preselectAttr} onclick="if(window.ConfiguratorApp) window.ConfiguratorApp.preselectAndScroll(JSON.parse(this.getAttribute('data-preselect')))">${plan.primaryCta}</button>
            ${plan.secondaryCta ? `<a href="${plan.secondaryCtaLink}" class="btn btn-secondary pricing-cta-secondary">${plan.secondaryCta}</a>` : ''}
          </div>
        </div>
        
      </div>
    `;
  }).join('');
}

// ── Render Cases ──
function renderCases() {
  const container = document.getElementById('cases-grid');
  if (!container) return;

  if (!casesData.length) {
    container.innerHTML = `
      <div class="cases-empty">
        <h3>Projetos em desenvolvimento</h3>
        <p>Estamos construindo soluções para diferentes desafios. Em breve, compartilharemos aqui os resultados de projetos reais.</p>
      </div>
    `;
    return;
  }

  const isSubfolder = window.location.pathname.includes('/projetos') || window.location.pathname.includes('/solucoes');
  const targetUrl = isSubfolder ? '../contato.html' : 'contato.html';

  container.innerHTML = casesData.map((c, i) => `
    <a href="${targetUrl}" class="case-card reveal reveal-delay-${(i % 2) + 1}" id="case-${c.id}">
      <div class="case-card-image">
        <img src="${c.image}" alt="${c.title}" loading="lazy">
        <div class="case-card-overlay"></div>
      </div>
      <div class="case-card-body">
        <span class="case-card-segment">${c.segment}</span>
        <h3>${c.title}</h3>
        <p>${c.solution}</p>
        <div class="case-card-techs">
          ${c.technologies.map(t => `<span class="case-card-tech">${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');
}

// ── Render Impact Grid ──
function renderImpact() {
  const container = document.getElementById('impact-grid');
  if (!container || !impactData.length) return;

  container.innerHTML = impactData.map(item => `
    <div class="impact-card">
      <div class="impact-card-icon">${getIcon(item.icon)}</div>
      <span>${item.title}</span>
    </div>
  `).join('');
}

// ── Render FAQ ──
function renderFAQ() {
  const container = document.getElementById('faq-list');
  if (!container || !faqData.length) return;

  container.innerHTML = faqData.map((item, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
        <span>${item.question}</span>
        <span class="faq-icon">${getIcon('plus')}</span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}" role="region">
        <div class="faq-answer-inner">
          ${item.answer}
        </div>
      </div>
    </div>
  `).join('');

  // FAQ toggle handlers
  container.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      // Close all others
      container.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('is-open');
        fi.querySelector('.faq-answer').style.maxHeight = null;
        fi.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ── Render Form Selects ──
function renderFormOptions() {
  const typeSelect = document.getElementById('project-type');
  const budgetSelect = document.getElementById('budget-range');

  if (typeSelect) {
    typeSelect.innerHTML = `<option value="" disabled selected>Selecione o tipo</option>` +
      projectTypes.map(t => `<option value="${t}">${t}</option>`).join('');
  }

  if (budgetSelect) {
    budgetSelect.innerHTML = `<option value="" disabled selected>Selecione (opcional)</option>` +
      budgetRanges.map(b => `<option value="${b}">${b}</option>`).join('');
  }

  // Auto-fill from Hero Discovery if navigated from Step 3
  try {
    const prefill = sessionStorage.getItem('cogit_contact_prefill');
    if (prefill) {
      const data = JSON.parse(prefill);
      const descEl = document.getElementById('description');
      if (descEl && !descEl.value) {
        let msg = '';
        if (data.solutions && data.solutions.length) {
          msg += `Soluções de interesse: ${data.solutions.join(', ')}\n`;
        }
        if (data.objective) {
          msg += `Objetivo principal: ${data.objective}\n`;
        }
        if (data.details) {
          msg += `Detalhes da ideia: ${data.details}\n`;
        }
        descEl.value = msg.trim();
      }
    }
  } catch (e) {}
}

// ── Render Footer Social Links ──
function renderFooterSocial() {
  const container = document.getElementById('footer-social');
  if (!container) return;

  let html = '';
  if (socialLinks.instagram && socialLinks.instagram !== '#') {
    html += `<a href="${socialLinks.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${getIcon('instagram')}</a>`;
  }
  if (socialLinks.linkedin && socialLinks.linkedin !== '#') {
    html += `<a href="${socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${getIcon('linkedin')}</a>`;
  }
  if (socialLinks.email) {
    html += `<a href="${socialLinks.email}" aria-label="E-mail">${getIcon('mail')}</a>`;
  }

  container.innerHTML = html;
}

// ── Render Testimonials ──
function renderTestimonials() {
  // Check if testimonials section placeholder exists in HTML
  // If not, we can dynamically inject it before FAQ
  if (typeof testimonialsData === 'undefined' || !testimonialsData.length) return;

  const faqSection = document.getElementById('faq');
  if (!faqSection) return;

  // Create testimonials section
  const section = document.createElement('section');
  section.className = 'section testimonials-section has-data';
  section.id = 'testimonials';
  section.setAttribute('aria-label', 'Depoimentos');
  section.innerHTML = `
    <div class="container">
      <div class="section-header center reveal">
        <span class="section-label" style="justify-content: center;">DEPOIMENTOS</span>
        <h2>Experiências de quem construiu com a gente</h2>
      </div>
      <div class="testimonials-grid">
        ${testimonialsData.map(t => {
          const initial = t.name ? t.name.charAt(0).toUpperCase() : '?';
          const avatarContent = t.photo 
            ? `<img src="${t.photo}" alt="Foto de ${t.name}" loading="lazy">` 
            : initial;
          const roleText = [t.role, t.company].filter(Boolean).join(' · ');
          return `
            <div class="testimonial-card reveal">
              <p class="testimonial-card-quote">${t.testimonial}</p>
              <div class="testimonial-card-author">
                <div class="testimonial-card-avatar">${avatarContent}</div>
                <div class="testimonial-card-info">
                  <h4>${t.name}</h4>
                  ${roleText ? `<p>${roleText}</p>` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Insert before FAQ
  faqSection.parentNode.insertBefore(section, faqSection);
}

// ── Initialize All Components ──
function initComponents() {
  renderChallenge();
  renderHeroInteractive();
  renderServices();
  renderProcess();
  renderPricing();
  renderCases();
  renderImpact();
  renderFAQ();
  renderFormOptions();
  renderFooterSocial();
  renderTestimonials();
}

