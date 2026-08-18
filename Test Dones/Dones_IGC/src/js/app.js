/**
 * app.js — Dones IGC (v3)
 * Orquestador principal de la Web App Dones IGC.
 * Maneja el flujo de onboarding (Evangelio + Demografía), el wizard del test con 3 opciones,
 * resultados igualitarios Top 3, encuesta de evaluación de 3 preguntas, consulta rápida de dones y
 * la sincronización con Supabase.
 */

import { situations, TOTAL_SITUATIONS } from '../data/situations.js';
import { gifts } from '../data/gifts.js';
import { runFullCalculation, isTestComplete } from './score-engine.js';
import { submitResult } from './supabase-client.js';

// ---------------------------------------------------------------------------
// Constantes de almacenamiento local
// ---------------------------------------------------------------------------
const STORAGE_ANSWERS_KEY = 'dones_igc_answers';
const STORAGE_RESULT_KEY = 'dones_igc_result';
const STORAGE_ONBOARDING_KEY = 'dones_igc_onboarding';
const STORAGE_SUBMISSION_ID_KEY = 'dones_igc_submission_id';

const SCENE_ILLUSTRATIONS = {
  1: "src/assets/illustrations/banners/Parte 1.png",
  2: "src/assets/illustrations/banners/Parte 2.png",
  3: "src/assets/illustrations/banners/Parte 3.png",
  4: "src/assets/illustrations/banners/Parte 4.png",
  5: "src/assets/illustrations/banners/Parte 5.png",
  6: "src/assets/illustrations/banners/Parte 6.png",
  7: "src/assets/illustrations/banners/Parte 7.png",
  8: "src/assets/illustrations/banners/Parte 8.png",
  9: "src/assets/illustrations/banners/Parte 9.png",
  10: "src/assets/illustrations/banners/Parte 10.png"
};

// ---------------------------------------------------------------------------
// Estado de la aplicación
// ---------------------------------------------------------------------------
const state = {
  answers: loadAnswers(),
  currentScene: 1,
  onboarding: loadOnboardingData(),
  evalRating: 0,
  evalAccuracy: null,
  submissionId: localStorage.getItem(STORAGE_SUBMISSION_ID_KEY) || null,
};

// ---------------------------------------------------------------------------
// Referencias al DOM
// ---------------------------------------------------------------------------
const screens = {
  welcome: document.getElementById('screen-welcome'),
  test: document.getElementById('screen-test'),
  results: document.getElementById('screen-results'),
  glossary: document.getElementById('screen-glossary'),
};

const el = {
  btnStart: document.getElementById('btn-start'),
  btnViewResults: document.getElementById('btn-view-results'),
  navBtnGlossaryWelcome: document.getElementById('nav-btn-glossary-welcome'),
  navBtnBack: document.getElementById('nav-btn-back'),
  
  // Wizard
  testPercentIndicator: document.getElementById('test-percent-indicator'),
  sceneBanner: document.getElementById('scene-banner'),
  sceneIllustration: document.getElementById('scene-illustration'),
  scenePartTitle: document.getElementById('scene-part-title'),
  questionsContainer: document.getElementById('questions-container'),
  btnPrev: document.getElementById('btn-prev'),
  btnNext: document.getElementById('btn-next'),
  navHint: document.getElementById('nav-hint'),
  btnQuickExploreGifts: document.getElementById('btn-quick-explore-gifts'),
  
  // Resultados
  topGiftsContainer: document.getElementById('top-gifts-container'),
  remainingGiftsContainer: document.getElementById('remaining-gifts-container'),
  btnReset: document.getElementById('btn-reset'),
  btnOpenEvaluation: document.getElementById('btn-open-evaluation'),
  
  // Glosario
  glossarySearch: document.getElementById('glossary-search'),
  glossaryGrid: document.getElementById('glossary-grid'),
  
  // Modales
  modal: document.getElementById('gift-modal'),
  modalBody: document.getElementById('gift-modal-body'),
  modalClose: document.getElementById('modal-close-btn'),
  
  // Onboarding
  modalOnboarding: document.getElementById('modal-initial-onboarding'),
  btnOnboardingStep2: document.getElementById('btn-onboarding-to-step2'),
  btnFinishOnboarding: document.getElementById('btn-finish-onboarding'),
  btnGroupYes: document.getElementById('btn-group-yes'),
  btnGroupNo: document.getElementById('btn-group-no'),
  zoneSelect: document.getElementById('onboarding-zone-select'),
  
  // Encuesta Evaluación
  modalEval: document.getElementById('modal-evaluation-survey'),
  evalCloseBtn: document.getElementById('eval-modal-close'),
  btnSubmitEval: document.getElementById('btn-submit-evaluation'),
  
  // Quick Gifts Slideover
  modalQuickGifts: document.getElementById('modal-quick-gifts'),
  quickGiftsCloseBtn: document.getElementById('quick-gifts-close'),
  quickGiftsList: document.getElementById('quick-gifts-list'),
  
  // Callout Grupo
  modalGrowthCallout: document.getElementById('modal-growth-group-callout'),
};

// ---------------------------------------------------------------------------
// Persistencia local
// ---------------------------------------------------------------------------
function loadAnswers() {
  try {
    const raw = localStorage.getItem(STORAGE_ANSWERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAnswers(answers) {
  try {
    localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(answers));
  } catch {}
}

function loadStoredResult() {
  try {
    const raw = localStorage.getItem(STORAGE_RESULT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveResult(result) {
  try {
    localStorage.setItem(STORAGE_RESULT_KEY, JSON.stringify(result));
  } catch {}
}

function loadOnboardingData() {
  try {
    const raw = localStorage.getItem(STORAGE_ONBOARDING_KEY);
    return raw ? JSON.parse(raw) : { completed: false, attendsGrowthGroup: null, zoneLocation: '' };
  } catch {
    return { completed: false, attendsGrowthGroup: null, zoneLocation: '' };
  }
}

function saveOnboardingData(data) {
  try {
    localStorage.setItem(STORAGE_ONBOARDING_KEY, JSON.stringify(data));
  } catch {}
}

function clearStorage() {
  localStorage.removeItem(STORAGE_ANSWERS_KEY);
  localStorage.removeItem(STORAGE_RESULT_KEY);
  localStorage.removeItem(STORAGE_SUBMISSION_ID_KEY);
  localStorage.removeItem(STORAGE_ONBOARDING_KEY);
}

// ---------------------------------------------------------------------------
// Control de Pantallas
// ---------------------------------------------------------------------------
function showScreen(screenId) {
  Object.keys(screens).forEach(key => {
    if (screens[key]) {
      screens[key].classList.remove('active');
    }
  });

  if (screens[screenId]) {
    screens[screenId].classList.add('active');
  }

  // Actualizar Bottom Navigation
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.target === screenId);
  });

  const stored = loadStoredResult();
  const hasResult = stored && isTestComplete(stored.answers);
  const navResultsBtn = document.getElementById('nav-item-results');
  if (navResultsBtn) {
    navResultsBtn.style.display = hasResult ? 'flex' : 'none';
  }

  // Header Back Button
  el.navBtnBack.style.display = (screenId === 'welcome') ? 'none' : 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------------------------
// Flujo de Onboarding Inicial (Evangelio + Zona)
// ---------------------------------------------------------------------------
function initOnboardingFlow() {
  checkAndShowOnboarding();

  if (el.btnOnboardingStep2) {
    el.btnOnboardingStep2.addEventListener('click', () => {
      document.getElementById('onboarding-step-1').style.display = 'none';
      document.getElementById('onboarding-step-2').style.display = 'block';
    });
  }

  if (el.btnGroupYes && el.btnGroupNo) {
    el.btnGroupYes.addEventListener('click', () => {
      state.onboarding.attendsGrowthGroup = true;
      el.btnGroupYes.classList.add('selected');
      el.btnGroupNo.classList.remove('selected');
      validateOnboardingForm();
    });

    el.btnGroupNo.addEventListener('click', () => {
      state.onboarding.attendsGrowthGroup = false;
      el.btnGroupNo.classList.add('selected');
      el.btnGroupYes.classList.remove('selected');
      validateOnboardingForm();
    });
  }

  if (el.zoneSelect) {
    el.zoneSelect.addEventListener('change', (e) => {
      state.onboarding.zoneLocation = e.target.value;
      validateOnboardingForm();
    });
  }

  if (el.btnFinishOnboarding) {
    el.btnFinishOnboarding.addEventListener('click', () => {
      state.onboarding.completed = true;
      saveOnboardingData(state.onboarding);
      el.modalOnboarding.classList.remove('active');
      showScreen('welcome');
    });
  }
}

function checkAndShowOnboarding() {
  if (!state.onboarding.completed) {
    const step1 = document.getElementById('onboarding-step-1');
    const step2 = document.getElementById('onboarding-step-2');
    if (step1 && step2) {
      step1.style.display = 'block';
      step2.style.display = 'none';
    }
    if (el.btnGroupYes) el.btnGroupYes.classList.remove('selected');
    if (el.btnGroupNo) el.btnGroupNo.classList.remove('selected');
    if (el.zoneSelect) el.zoneSelect.value = '';
    validateOnboardingForm();
    el.modalOnboarding.classList.add('active');
  } else {
    el.modalOnboarding.classList.remove('active');
  }
}

function validateOnboardingForm() {
  const isGroupSelected = state.onboarding.attendsGrowthGroup !== null;
  const isZoneSelected = state.onboarding.zoneLocation.trim() !== '';
  if (el.btnFinishOnboarding) {
    el.btnFinishOnboarding.disabled = !(isGroupSelected && isZoneSelected);
  }
}

// ---------------------------------------------------------------------------
// Wizard del Test (Escala 3 Opciones)
// ---------------------------------------------------------------------------
function getFirstUnansweredScene() {
  for (let sceneId = 1; sceneId <= 10; sceneId++) {
    const sceneQuestions = situations.filter(s => s.sceneId === sceneId);
    const allAnswered = sceneQuestions.every(q => state.answers[q.id]);
    if (!allAnswered) return sceneId;
  }
  return 10;
}

const MILESTONE_BANNERS = {
  2: {
    title: "⚡ ¡BUEN COMIENZO! (PARTE 2)",
    text: "Recuerda responder con total sinceridad sobre lo que realmente harías en cada situación.",
    illustration: "src/assets/illustrations/banners/Parte 2.png"
  },
  5: {
    title: "⚡ ¡MITAD DEL CAMINO! (PARTE 5)",
    text: "¡Vas excelente! Cada respuesta nos ayuda a identificar con precisión tus fortalezas principales.",
    illustration: "src/assets/illustrations/banners/Parte 5.png"
  },
  9: {
    title: "🏁 ¡YA CASI TERMINAS! (PARTE 9)",
    text: "Estás a un paso de descubrir tus dones espirituales y su aplicación práctica en la iglesia local.",
    illustration: "src/assets/illustrations/banners/Parte 9.png"
  }
};

function renderScene() {
  const sceneId = state.currentScene;
  const sceneQuestions = situations.filter(s => s.sceneId === sceneId);
  
  // Renderizado dinámico de Banner únicamente en partes hito (2, 5, 9)
  const milestone = MILESTONE_BANNERS[sceneId];
  if (milestone && el.sceneBanner) {
    if (el.sceneIllustration) el.sceneIllustration.src = milestone.illustration;
    if (el.scenePartTitle) el.scenePartTitle.textContent = milestone.title;
    const bannerTextEl = document.getElementById('scene-banner-text');
    if (bannerTextEl) bannerTextEl.textContent = milestone.text;
    el.sceneBanner.style.display = 'flex';
  } else if (el.sceneBanner) {
    el.sceneBanner.style.display = 'none';
  }

  // Estaciones del Mapa de Ruta
  renderRoadmapTrack(sceneId);
  
  // Preguntas con 3 píldoras
  el.questionsContainer.innerHTML = '';
  
  sceneQuestions.forEach((q, index) => {
    const globalIndex = situations.findIndex(s => s.id === q.id) + 1;
    const itemEl = document.createElement('div');
    itemEl.className = 'question-item-card';
    itemEl.id = `question-card-${q.id}`;
    
    const answeredValue = state.answers[q.id] || null;
    
    itemEl.innerHTML = `
      <div class="question-header">
        <span class="question-index-badge">${globalIndex}</span>
        <p class="question-text">${q.text}</p>
      </div>
    `;

    const scaleWrapper = document.createElement('div');
    scaleWrapper.className = 'situation-scale-wrapper';

    const labels = {
      1: "Rara vez",
      2: "En ocasiones",
      3: "Con frecuencia"
    };

    const scaleRow = document.createElement('div');
    scaleRow.className = 'situation-scale-row';

    const pillsContainer = document.createElement('div');
    pillsContainer.className = 'scale-pills';

    for (let i = 1; i <= 3; i++) {
      const pill = document.createElement('button');
      pill.className = `scale-pill scale-pill-${i} ${answeredValue === i ? 'selected' : ''}`;
      pill.dataset.value = i;
      pill.dataset.qid = q.id;
      pill.title = labels[i];
      pill.setAttribute('aria-label', `${i}: ${labels[i]}`);
      pill.innerHTML = `
        <span class="pill-number">${i}</span>
        <span class="pill-label">${labels[i]}</span>
      `;

      pill.addEventListener('click', (e) => handlePillClick(e, q.id, i, itemEl));
      pillsContainer.appendChild(pill);
    }

    scaleRow.appendChild(pillsContainer);
    scaleWrapper.appendChild(scaleRow);

    itemEl.appendChild(scaleWrapper);
    el.questionsContainer.appendChild(itemEl);
  });

  el.btnPrev.style.display = sceneId === 1 ? 'none' : 'inline-flex';
  checkSceneCompletion();
  updateProgressBar();
}

function renderRoadmapTrack(currentSceneId) {
  const container = document.getElementById('journey-nodes-container');
  if (!container) return;
  
  container.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const sceneQuestions = situations.filter(s => s.sceneId === i);
    const isCompleted = sceneQuestions.every(q => state.answers[q.id]);
    const isCurrent = i === currentSceneId;

    const node = document.createElement('div');
    node.className = `roadmap-node journey-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`;
    node.title = `Parte ${i}`;

    node.innerHTML = `
      <div class="node-circle">
        ${isCompleted ? '✓' : i}
      </div>
      <span class="node-label">Parte ${i}</span>
    `;

    if (isCompleted || i <= getFirstUnansweredScene()) {
      node.style.cursor = 'pointer';
      node.addEventListener('click', () => {
        state.currentScene = i;
        renderScene();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    container.appendChild(node);
  }
}

function handlePillClick(e, questionId, val, itemEl) {
  e.preventDefault();
  state.answers[questionId] = val;
  saveAnswers(state.answers);

  const container = itemEl.querySelector('.scale-pills');
  container.querySelectorAll('.scale-pill').forEach(p => p.classList.remove('selected'));
  
  const selectedPill = container.querySelector(`.scale-pill-${val}`);
  if (selectedPill) selectedPill.classList.add('selected');

  checkSceneCompletion();
  updateProgressBar();

  // Auto-scroll a la siguiente pregunta
  setTimeout(() => {
    const questionsInScene = situations.filter(s => s.sceneId === state.currentScene);
    const currentIndex = questionsInScene.findIndex(q => q.id === questionId);
    if (currentIndex < questionsInScene.length - 1) {
      const nextQ = questionsInScene[currentIndex + 1];
      const nextCard = document.getElementById(`question-card-${nextQ.id}`);
      if (nextCard) {
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, 250);
}

function checkSceneCompletion() {
  const sceneQuestions = situations.filter(s => s.sceneId === state.currentScene);
  const complete = sceneQuestions.every(q => state.answers[q.id]);
  el.btnNext.disabled = !complete;
  el.navHint.style.opacity = complete ? '0' : '1';
}

function updateProgressBar() {
  const globalAnswered = countAnswered();
  const pct = Math.round((globalAnswered / TOTAL_SITUATIONS) * 100);
  el.testPercentIndicator.textContent = `${pct}% Completado`;
}

function countAnswered() {
  let count = 0;
  for (const s of situations) {
    if (state.answers[s.id]) count++;
  }
  return count;
}

function showProgressToast(toastData) {
  let toastEl = document.getElementById('test-progress-toast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'test-progress-toast';
    toastEl.className = 'test-progress-toast';
    document.body.appendChild(toastEl);
  }

  toastEl.innerHTML = `
    <div class="toast-icon">${toastData.icon}</div>
    <div class="toast-content">
      <strong class="toast-title">${toastData.title}</strong>
      <span class="toast-text">${toastData.text}</span>
    </div>
    <button class="toast-close" onclick="document.getElementById('test-progress-toast').classList.remove('show')">×</button>
  `;

  setTimeout(() => {
    toastEl.classList.add('show');
  }, 100);

  if (toastEl.hideTimer) clearTimeout(toastEl.hideTimer);
  toastEl.hideTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 4500);
}

// ---------------------------------------------------------------------------
// Tutorial Driver.js
// ---------------------------------------------------------------------------
function runDriverTutorial() {
  if (typeof window.driver === 'function' || window.driver?.js?.driver) {
    const driverObj = window.driver.js.driver({
      showProgress: true,
      steps: [
        { element: '#screen-welcome', popover: { title: 'Bienvenido a Dones IGC', description: 'Este test está diseñado para ayudarte a descubrir tus fortalezas de servicio en la iglesia local.' } },
        { element: '#nav-btn-glossary-welcome', popover: { title: '1. Aprender de los Dones', description: 'Te recomendamos explorar la guía de dones previamente para responder con mayor claridad.' } },
        { element: '#btn-start', popover: { title: '2. Iniciar el Test', description: 'El test está dividido en 10 partes cortas. Responde con total sinceridad en base a tus vivencias reales.' } }
      ]
    });
    driverObj.drive();
  }
}

// ---------------------------------------------------------------------------
// Finalización y Resultados
// ---------------------------------------------------------------------------
async function finishTest() {
  const calculation = runFullCalculation(state.answers);
  
  const result = {
    id: state.submissionId || undefined,
    version: '3.0.0',
    completedAt: new Date().toISOString(),
    answers: { ...state.answers },
    scores: calculation.percentage,
    topGifts: calculation.top3.map(g => g.id),
    attendsGrowthGroup: state.onboarding.attendsGrowthGroup,
    zoneLocation: state.onboarding.zoneLocation,
  };
  
  saveResult(result);
  const createdId = await submitResult(result);
  if (createdId) {
    state.submissionId = createdId;
    localStorage.setItem(STORAGE_SUBMISSION_ID_KEY, createdId);
  }

  renderResults(calculation);
  showScreen('results');
  triggerConfetti();

  // Abrir modal de llamado a Grupo de Crecimiento
  setTimeout(() => {
    openGrowthGroupModal();
  }, 1200);
}

function triggerConfetti() {
  if (typeof window.confetti === 'function') {
    window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#336cdd', '#D4AF37', '#E05A2B', '#10B981'] });
  }
}

function renderResults(calculation) {
  const top3 = calculation.top3;
  const remaining = calculation.ranked.slice(3);
  
  // Render Top 3 en Igualdad de Jerarquía
  el.topGiftsContainer.innerHTML = '';
  top3.forEach((g, i) => {
    const card = document.createElement('div');
    card.className = 'top3-equal-card';
    
    card.innerHTML = `
      <span class="top3-rank-badge">LUGAR #${i+1}</span>
      <img src="${g.illustration || 'src/assets/illustrations/Evangelismo.png'}" alt="${g.name}" class="top3-gift-img">
      <h4>${g.name}</h4>
      <span class="top3-pct-badge">${g.percentage}% afinidad</span>
      <p>${g.summary || g.description}</p>
      <button class="btn-know-more" data-gift-id="${g.id}">Conocer más →</button>
    `;
    
    el.topGiftsContainer.appendChild(card);
  });

  el.topGiftsContainer.querySelectorAll('.btn-know-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openGiftModal(btn.dataset.giftId);
    });
  });
  
  // Callout dinámico si NO asiste a Grupo de Crecimiento (justo abajo del Top 3)
  const calloutEl = document.getElementById('results-growth-group-callout');
  if (calloutEl) {
    if (state.onboarding.attendsGrowthGroup === false) {
      calloutEl.innerHTML = `
        <div style="background: rgba(51, 108, 221, 0.05); border: 1.5px solid rgba(51, 108, 221, 0.2); border-radius: 18px; padding: 20px; text-align: center; box-shadow: 0 6px 20px rgba(51, 108, 221, 0.06);">
          <div style="display: inline-flex; align-items: center; justify-content: center; background: rgba(51, 108, 221, 0.1); padding: 10px; border-radius: 50%; margin-bottom: 8px; color: var(--primary);">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; font-weight: 850; color: var(--navy);">¿Aún no estás en un Grupo de Crecimiento?</h4>
          <p style="margin: 0 0 14px 0; font-size: 0.86rem; color: var(--text-muted); line-height: 1.4;">Descubrir tus dones es el primer paso. Conéctate a un grupo en tu comunidad para ejercitarlos con propósito.</p>
          <a href="https://igcteg.org/grupos/" target="_blank" rel="noopener noreferrer" class="btn btn-connect-group btn-block">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Conectar con un Grupo de Crecimiento</span>
          </a>
        </div>
      `;
      calloutEl.style.display = 'block';
    } else {
      calloutEl.style.display = 'none';
    }
  }
  
  // Render listado restante de 12 dones
  el.remainingGiftsContainer.innerHTML = '';
  remaining.forEach(g => {
    const row = document.createElement('div');
    row.className = 'remaining-row';
    row.dataset.giftId = g.id;
    row.addEventListener('click', () => openGiftModal(g.id));
    
    row.innerHTML = `
      <div class="remaining-info">
        <span class="remaining-name">${g.name}</span>
        <span class="remaining-pct" style="display: inline-flex; align-items: center; gap: 4px;">${g.percentage}% <span style="font-size: 0.95rem; color: var(--primary); font-weight: 900;">›</span></span>
      </div>
      <div class="remaining-bar-track">
        <div class="remaining-bar-fill" style="width: ${g.percentage}%"></div>
      </div>
    `;
    el.remainingGiftsContainer.appendChild(row);
  });

  el.btnViewResults.style.display = 'block';
}

// ---------------------------------------------------------------------------
// Encuesta de Evaluación (3 Preguntas)
// ---------------------------------------------------------------------------
function initEvaluationSurvey() {
  if (el.btnOpenEvaluation) {
    el.btnOpenEvaluation.addEventListener('click', () => {
      const stored = loadStoredResult();
      if (stored) {
        if (stored.clarityRating) {
          state.evalRating = Number(stored.clarityRating);
          const starsContainer = document.getElementById('star-rating-container');
          if (starsContainer) {
            starsContainer.querySelectorAll('span').forEach(s => {
              s.style.color = Number(s.dataset.star) <= state.evalRating ? '#f59e0b' : '#cbd5e1';
            });
          }
        }
        if (stored.accuracyPerception) {
          state.evalAccuracy = stored.accuracyPerception;
          document.querySelectorAll('.eval-acc-btn').forEach(b => {
            if (b.dataset.acc === state.evalAccuracy) b.classList.add('selected');
            else b.classList.remove('selected');
          });
        }
        const textInput = document.getElementById('eval-feedback-text');
        if (textInput && stored.feedbackComments) {
          textInput.value = stored.feedbackComments;
        }
      }
      el.modalEval.classList.add('active');
    });
  }

  if (el.evalCloseBtn) {
    el.evalCloseBtn.addEventListener('click', () => {
      el.modalEval.classList.remove('active');
    });
  }

  // Selección de Estrellas
  const starsContainer = document.getElementById('star-rating-container');
  if (starsContainer) {
    starsContainer.querySelectorAll('span').forEach(star => {
      star.addEventListener('click', () => {
        state.evalRating = Number(star.dataset.star);
        starsContainer.querySelectorAll('span').forEach(s => {
          s.style.color = Number(s.dataset.star) <= state.evalRating ? '#f59e0b' : '#cbd5e1';
        });
      });
    });
  }

  // Selección de Precisión
  document.querySelectorAll('.eval-acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.eval-acc-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.evalAccuracy = btn.dataset.acc;
    });
  });

  // Envío de la evaluación
  if (el.btnSubmitEval) {
    el.btnSubmitEval.addEventListener('click', async () => {
      const feedbackText = document.getElementById('eval-feedback-text')?.value || '';
      
      let stored = loadStoredResult();
      if (!stored && isTestComplete(state.answers)) {
        const calculation = runFullCalculation(state.answers);
        stored = {
          completedAt: new Date().toISOString(),
          answers: { ...state.answers },
          scores: calculation.percentage,
          topGifts: calculation.top3.map(g => g.id),
        };
      }

      if (stored) {
        const activeSubId = state.submissionId || localStorage.getItem(STORAGE_SUBMISSION_ID_KEY) || stored.id || undefined;
        
        const payload = {
          id: activeSubId,
          version: '3.0.0',
          answers: stored.answers,
          scores: stored.scores,
          topGifts: stored.topGifts,
          completedAt: stored.completedAt || new Date().toISOString(),
          attendsGrowthGroup: state.onboarding.attendsGrowthGroup,
          zoneLocation: state.onboarding.zoneLocation,
          clarityRating: state.evalRating || stored.clarityRating || null,
          accuracyPerception: state.evalAccuracy || stored.accuracyPerception || null,
          feedbackComments: feedbackText,
        };

        // Guardar/Actualizar en localStorage
        stored.id = activeSubId;
        stored.clarityRating = payload.clarityRating;
        stored.accuracyPerception = payload.accuracyPerception;
        stored.feedbackComments = payload.feedbackComments;
        saveResult(stored);

        // Enviar/Actualizar en Supabase
        const updatedId = await submitResult(payload);
        if (updatedId) {
          state.submissionId = updatedId;
          localStorage.setItem(STORAGE_SUBMISSION_ID_KEY, updatedId);
          stored.id = updatedId;
          saveResult(stored);
        }
      }

      el.modalEval.classList.remove('active');
      alert('¡Gracias por tus comentarios! Nos ayudan a mejorar.');
    });
  }
}

// ---------------------------------------------------------------------------
// Modal de Llamado a Grupo de Crecimiento
// ---------------------------------------------------------------------------
function openGrowthGroupModal() {
  const container = document.getElementById('growth-callout-actions');
  if (!container) return;

  if (state.onboarding.attendsGrowthGroup === false) {
    container.innerHTML = `
      <p style="font-size:0.85rem; color: var(--navy); font-weight: 750; margin-bottom: 16px;">
        Indicaste que no asistes a un grupo. ¡Te invitamos a integrarte a uno cerca de ti!
      </p>
      <a href="https://igcteg.org/grupos/" target="_blank" class="btn btn-primary btn-block" style="text-decoration:none; padding:12px; font-size:0.95rem;">🌱 Solicitar Grupo de Crecimiento</a>
    `;
  } else {
    container.innerHTML = `
      <p style="font-size:0.88rem; color: var(--primary); font-weight: 800; margin-bottom: 16px;">
        ¡Sigue ejerciendo activamente tus dones en tu Grupo de Crecimiento!
      </p>
      <button class="btn btn-secondary btn-block" onclick="document.getElementById('modal-growth-group-callout').classList.remove('active')">Entendido</button>
    `;
  }

  el.modalGrowthCallout.classList.add('active');
}

// ---------------------------------------------------------------------------
// Slideover Consulta Rápida de Dones (Desde el Test)
// ---------------------------------------------------------------------------
function initQuickGiftsSlideover() {
  const openSlideover = () => {
    renderQuickGiftsList();
    if (el.modalQuickGifts) el.modalQuickGifts.classList.add('active');
  };

  if (el.btnQuickExploreGifts) {
    el.btnQuickExploreGifts.addEventListener('click', openSlideover);
  }

  const inlineBtn = document.getElementById('btn-quick-explore-gifts-inline');
  if (inlineBtn) {
    inlineBtn.addEventListener('click', openSlideover);
  }

  if (el.quickGiftsCloseBtn) {
    el.quickGiftsCloseBtn.addEventListener('click', () => {
      el.modalQuickGifts.classList.remove('active');
    });
  }
}

function renderQuickGiftsList() {
  if (!el.quickGiftsList) return;
  el.quickGiftsList.innerHTML = gifts.map(g => `
    <div style="background:#ffffff; border-radius: 12px; padding: 14px; border: 1px solid rgba(15,15,49,0.08); display: flex; gap: 12px; align-items: center;">
      <img src="${g.illustration || 'src/assets/illustrations/Evangelismo.png'}" style="width: 44px; height: 44px; object-fit: contain;">
      <div>
        <h5 style="margin: 0; font-size: 0.95rem; font-weight: 900; color: var(--navy);">${g.name}</h5>
        <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.35;">${g.summary || g.description}</p>
      </div>
    </div>
  `).join('');
}

// ---------------------------------------------------------------------------
// Modal de Detalles de un Don
// ---------------------------------------------------------------------------
function openGiftModal(giftId) {
  const g = gifts.find(x => x.id === giftId);
  if (!g) return;
  
  const stored = loadStoredResult();
  const currentPct = stored ? stored.scores[g.id] : null;
  
  let examplesHTML = '';
  if (g.examples && g.examples.length > 0) {
    examplesHTML = `
      <div class="modal-section" style="margin-top: 14px;">
        <span class="modal-section-title" style="font-size: 0.88rem; font-weight: 850; color: var(--primary); display: flex; align-items: center; gap: 6px; margin-bottom: 6px;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Ejemplos Prácticos de Servicio</span>
        <ul class="modal-list">
          ${g.examples.map(ex => `<li>${ex}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  el.modalBody.innerHTML = `
    <div class="modal-illustration-wrapper">
      <img src="${g.illustration || 'src/assets/illustrations/Evangelismo.png'}" alt="${g.name}" class="modal-illustration">
    </div>
    
    <div class="modal-gift-tag">${g.name.toUpperCase()}</div>
    
    ${currentPct !== null ? `<span class="bento-pct-badge" style="margin-top:-10px; font-size: 0.85rem; padding: 4px 14px;">${currentPct}% afinidad detectada</span>` : ''}
    
    <p class="modal-desc" style="font-size: 0.9rem; line-height: 1.5; color: var(--navy); text-align: left; margin-top: 12px;">${g.description}</p>
    
    ${examplesHTML}
  `;
  
  el.modal.classList.add('active');
}

function closeGiftModal() {
  el.modal.classList.remove('active');
}

el.modalClose.addEventListener('click', closeGiftModal);

// Cierre global al hacer click en el fondo oscuro de cualquier modal (excepto Onboarding inicial si no ha finalizado)
document.querySelectorAll('.modal-overlay').forEach(modalEl => {
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl && modalEl.id !== 'modal-initial-onboarding') {
      modalEl.classList.remove('active');
    }
  });
});

// ---------------------------------------------------------------------------
// Glosario / Aprender de los Dones
// ---------------------------------------------------------------------------
function renderGlossary(filterText = '') {
  const query = filterText.toLowerCase().trim();
  el.glossaryGrid.innerHTML = '';

  const stored = loadStoredResult();
  const hasCompletedTest = stored && isTestComplete(stored.answers);
  let giftsList = [...gifts];

  if (hasCompletedTest) {
    const calc = runFullCalculation(stored.answers);
    giftsList = giftsList.map(g => ({
      ...g,
      pct: calc.percentage[g.id] ?? 0
    })).sort((a, b) => b.pct - a.pct);
  }

  // Filtro por nombre de don
  const filtered = giftsList.filter(g => {
    if (!query) return true;
    return g.name.toLowerCase().includes(query);
  });
  
  if (filtered.length === 0) {
    el.glossaryGrid.innerHTML = `<p style="grid-column: span 3; text-align: center; color: var(--text-muted); padding: 32px 0;">No se encontraron dones que coincidan.</p>`;
    return;
  }
  
  filtered.forEach(g => {
    const card = document.createElement('div');
    card.className = 'glossary-card';
    card.addEventListener('click', () => openGiftModal(g.id));
    
    const pctBadgeHTML = (hasCompletedTest && typeof g.pct === 'number') 
      ? `<span class="glossary-pct-badge">${g.pct}% Afinidad</span>` 
      : '';

    card.innerHTML = `
      <div class="glossary-card-header">
        <img src="${g.illustration || 'src/assets/illustrations/Evangelismo.png'}" alt="${g.name}" class="glossary-gift-img">
        <div>
          <h4 class="glossary-card-title">${g.name}</h4>
          ${pctBadgeHTML}
        </div>
      </div>
      <p class="glossary-card-summary">${g.summary || g.description}</p>
      <button class="btn-glossary-more" type="button">
        <span>Conocer más</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    `;
    el.glossaryGrid.appendChild(card);
  });
}

// ---------------------------------------------------------------------------
// Event Listeners Globales
// ---------------------------------------------------------------------------
el.btnStart.addEventListener('click', () => {
  state.currentScene = getFirstUnansweredScene();
  renderScene();
  showScreen('test');
});

el.navBtnGlossaryWelcome.addEventListener('click', () => {
  renderGlossary();
  showScreen('glossary');
});

document.querySelectorAll('.bottom-nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    if (target === 'test') {
      state.currentScene = getFirstUnansweredScene();
      renderScene();
      showScreen('test');
    } else if (target === 'glossary') {
      renderGlossary();
      showScreen('glossary');
    } else if (target === 'results') {
      const stored = loadStoredResult();
      if (stored && isTestComplete(stored.answers)) {
        const calculation = runFullCalculation(stored.answers);
        renderResults(calculation);
        showScreen('results');
      }
    } else {
      showScreen('welcome');
    }
  });
});

el.btnViewResults.addEventListener('click', () => {
  const stored = loadStoredResult();
  if (stored && isTestComplete(stored.answers)) {
    const calculation = runFullCalculation(stored.answers);
    renderResults(calculation);
    showScreen('results');
  }
});

el.navBtnBack.addEventListener('click', () => {
  showScreen('welcome');
});

el.btnPrev.addEventListener('click', () => {
  if (state.currentScene > 1) {
    state.currentScene--;
    renderScene();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

el.btnNext.addEventListener('click', () => {
  const sceneQuestions = situations.filter(s => s.sceneId === state.currentScene);
  const complete = sceneQuestions.every(q => state.answers[q.id]);
  if (!complete) return;
  
  if (state.currentScene < 10) {
    state.currentScene++;
    renderScene();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    finishTest();
  }
});

el.btnReset.addEventListener('click', () => {
  const confirmed = window.confirm('¿Seguro que deseas reiniciar el test? Esto borrará tus respuestas actuales.');
  if (confirmed) {
    clearStorage();
    state.answers = {};
    state.currentScene = 1;
    state.onboarding = { completed: false, attendsGrowthGroup: null, zoneLocation: '' };
    el.btnViewResults.style.display = 'none';
    showScreen('welcome');
    checkAndShowOnboarding();
  }
});

el.glossarySearch.addEventListener('input', (e) => {
  renderGlossary(e.target.value);
});

function initVideoLinks() {
  try {
    const raw = localStorage.getItem('dones_igc_video_links');
    if (!raw) return;
    const links = JSON.parse(raw);
    
    const ep1 = document.getElementById('yt-link-1');
    const ep2 = document.getElementById('yt-link-2');
    const ep3 = document.getElementById('yt-link-3');

    if (ep1 && links.v1 && links.v1.trim() !== '') {
      ep1.href = links.v1;
    }

    if (ep2 && links.v2 && links.v2.trim() !== '') {
      ep2.outerHTML = `
        <a id="yt-link-2" href="${links.v2}" target="_blank" class="yt-episode-link" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(51,108,221,0.08); border: 1px solid rgba(51,108,221,0.2); border-radius: 12px; color: var(--navy); font-size: 0.85rem; font-weight: 800; text-decoration: none; transition: transform 0.2s ease;">
          <span><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="display:inline-block; vertical-align:-1px; margin-right:4px;"><polygon points="5 3 19 12 5 21 5 3"/></svg> Parte 2: Descubriendo tu Don</span>
          <span style="color: var(--primary); font-weight: 900;">Ver Video →</span>
        </a>
      `;
    }

    if (ep3 && links.v3 && links.v3.trim() !== '') {
      ep3.outerHTML = `
        <a id="yt-link-3" href="${links.v3}" target="_blank" class="yt-episode-link" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(51,108,221,0.08); border: 1px solid rgba(51,108,221,0.2); border-radius: 12px; color: var(--navy); font-size: 0.85rem; font-weight: 800; text-decoration: none; transition: transform 0.2s ease;">
          <span><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="display:inline-block; vertical-align:-1px; margin-right:4px;"><polygon points="5 3 19 12 5 21 5 3"/></svg> Parte 3: Servir con Propósito</span>
          <span style="color: var(--primary); font-weight: 900;">Ver Video →</span>
        </a>
      `;
    }
  } catch (e) {}
}

function initOnsiteGrowthGroupModal() {
  const modal = document.getElementById('modal-growth-group-onsite');
  const closeBtn = document.getElementById('close-modal-growth-onsite');

  const openOnsite = (e) => {
    if (e) e.preventDefault();
    if (modal) modal.classList.add('active');
  };

  const closeOnsite = () => {
    if (modal) modal.classList.remove('active');
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-connect-group') || e.target.closest('#btn-open-growth-onsite');
    if (btn) {
      openOnsite(e);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeOnsite);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeOnsite();
    });
  }
}

// ---------------------------------------------------------------------------
// Inicialización
// ---------------------------------------------------------------------------
function init() {
  initVideoLinks();
  initOnboardingFlow();
  initEvaluationSurvey();
  initQuickGiftsSlideover();
  initOnsiteGrowthGroupModal();

  const stored = loadStoredResult();
  if (stored && isTestComplete(stored.answers)) {
    const calculation = runFullCalculation(stored.answers);
    renderResults(calculation);
    showScreen('results');
    el.btnViewResults.style.display = 'block';
  } else {
    showScreen('welcome');
  }

  // Si el usuario NO ha completado el onboarding, se fuerza a mostrarlo en cada carga o recarga
  checkAndShowOnboarding();
}

init();
