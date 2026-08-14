/**
 * app.js — Dones IGC (v2)
 * Orquestador principal de la SPA. Controla el flujo del wizard (10 escenas),
 * la escala interactiva de píldoras horizontales, la persistencia local, la presentación de resultados
 * (Bento Grid) y el glosario con buscador.
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

// Mapeo de ilustraciones para las 10 partes del test (desde docs/design/illustrations_banners)
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
  currentScene: 1, // 1 a 10
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
  testSceneIndicator: document.getElementById('test-scene-indicator'),
  testPercentIndicator: document.getElementById('test-percent-indicator'),
  testProgressBar: document.getElementById('test-progress-bar'),
  sceneIllustration: document.getElementById('scene-illustration'),
  scenePartTitle: document.getElementById('scene-part-title'),
  questionsContainer: document.getElementById('questions-container'),
  btnPrev: document.getElementById('btn-prev'),
  btnNext: document.getElementById('btn-next'),
  navHint: document.getElementById('nav-hint'),
  
  // Resultados
  topGiftsContainer: document.getElementById('top-gifts-container'),
  remainingGiftsContainer: document.getElementById('remaining-gifts-container'),
  btnReset: document.getElementById('btn-reset'),
  
  // Glosario
  glossarySearch: document.getElementById('glossary-search'),
  glossaryGrid: document.getElementById('glossary-grid'),
  
  // Modal
  modal: document.getElementById('gift-modal'),
  modalBody: document.getElementById('gift-modal-body'),
  modalClose: document.getElementById('modal-close-btn'),
};

// ---------------------------------------------------------------------------
// Carga y Guardado (localStorage)
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
  } catch {
    // Silencioso
  }
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
  } catch {
    // Silencioso
  }
}

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_ANSWERS_KEY);
    localStorage.removeItem(STORAGE_RESULT_KEY);
  } catch {
    // Silencioso
  }
}

// ---------------------------------------------------------------------------
// Nombres neutrales de las 10 partes de la Ruta Espiritual
const STATION_NAMES = {
  1: "Parte 1",
  2: "Parte 2",
  3: "Parte 3",
  4: "Parte 4",
  5: "Parte 5",
  6: "Parte 6",
  7: "Parte 7",
  8: "Parte 8",
  9: "Parte 9",
  10: "Parte 10"
};

// ---------------------------------------------------------------------------
// Navegación entre Pantallas (SPA Transitions & Bottom Glass Nav)
// ---------------------------------------------------------------------------
function showScreen(screenKey) {
  // Ocultar todas las pantallas con desvanecimiento
  Object.entries(screens).forEach(([key, screenEl]) => {
    if (screenEl) {
      if (screenEl.classList.contains('active')) {
        screenEl.classList.remove('active');
      }
      screenEl.style.display = 'none';
    }
  });

  // Mostrar pantalla seleccionada con retardo
  const targetScreen = screens[screenKey];
  if (targetScreen) {
    targetScreen.style.display = 'block';
    // Forzar reflow
    targetScreen.offsetHeight;
    targetScreen.classList.add('active');
  }

  // Sincronizar Barra Flotante Inferior Glassmorphic
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    if (item.dataset.target === screenKey) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Mostrar tab de resultados si el test está completo
  const stored = loadStoredResult();
  const navResultsBtn = document.getElementById('nav-item-results');
  if (navResultsBtn) {
    navResultsBtn.style.display = (stored && isTestComplete(stored.answers)) ? 'flex' : 'none';
  }

  // Configurar botón "Volver/Inicio" del header dinámicamente
  if (screenKey === 'welcome') {
    el.navBtnBack.style.display = 'none';
  } else {
    el.navBtnBack.style.display = 'block';
    if (screenKey === 'test') {
      el.navBtnBack.textContent = 'Volver';
    } else {
      el.navBtnBack.textContent = 'Inicio';
    }
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------------------------
// Renderizado del Mapa de Ruta Espiritual (10 Estaciones Noom/Duolingo style)
// ---------------------------------------------------------------------------
function renderJourneyRoadmap() {
  const container = document.getElementById('journey-nodes-container');
  if (!container) return;

  container.innerHTML = '';
  for (let sId = 1; sId <= 10; sId++) {
    const sceneQuestions = situations.filter(s => s.sceneId === sId);
    const isCompleted = sceneQuestions.every(q => state.answers[q.id]);
    const isCurrent = state.currentScene === sId;

    let nodeStateClass = 'locked';
    let iconContent = `🔒`;
    if (isCompleted) {
      nodeStateClass = 'completed';
      iconContent = `✓`;
    } else if (isCurrent) {
      nodeStateClass = 'current';
      iconContent = `${sId}`;
    }

    const nodeEl = document.createElement('div');
    nodeEl.className = `journey-node ${nodeStateClass}`;
    nodeEl.title = `Estación ${sId}: ${STATION_NAMES[sId]}`;

    nodeEl.innerHTML = `
      <div class="node-circle">${iconContent}</div>
      <span class="node-label">${STATION_NAMES[sId]}</span>
    `;

    // Permitir navegar a estaciones ya respondidas o la actual
    nodeEl.addEventListener('click', () => {
      if (isCompleted || isCurrent) {
        state.currentScene = sId;
        renderScene();
      }
    });

    container.appendChild(nodeEl);
  }
}

// ---------------------------------------------------------------------------
// Tour Guiado Interactivo con Driver.js
// ---------------------------------------------------------------------------
function startDriverTour() {
  if (typeof window.driver === 'undefined') return;

  const driverObj = window.driver.js.driver({
    showProgress: true,
    animate: true,
    doneBtnText: '¡Entendido!',
    nextBtnText: 'Siguiente ➔',
    prevBtnText: '← Atrás',
    steps: [
      { 
        element: '#journey-roadmap-card', 
        popover: { title: '⚡ Ruta Espiritual', description: 'Aquí avanzas a través de 10 estaciones. Cada una explora distintas facetas de tus dones.' } 
      },
      { 
        element: '#scene-banner', 
        popover: { title: '🎯 Estación Actual', description: 'Cada parte contiene situaciones prácticas para evaluar tu afinidad de servicio.' } 
      },
      { 
        element: '#questions-container', 
        popover: { title: '🔢 Escala de Respuestas 1 al 5', description: 'Sé 100% sincero. Selecciona 1 (Casi nunca) a 5 (Casi siempre). ¡Evita los neutrales!' } 
      }
    ]
  });

  driverObj.drive();
}

// Determinar el primer número de escena que no está completo
function getFirstUnansweredScene() {
  for (let sceneId = 1; sceneId <= 10; sceneId++) {
    const sceneQuestions = situations.filter(s => s.sceneId === sceneId);
    const complete = sceneQuestions.every(q => state.answers[q.id]);
    if (!complete) return sceneId;
  }
  return 1;
}

// ---------------------------------------------------------------------------
// Lógica del Wizard del Test (Replicando Ref2.png)
// ---------------------------------------------------------------------------
function renderScene() {
  const sceneId = state.currentScene;
  
  // Renderizar Mapa de Ruta
  renderJourneyRoadmap();
  
  // Actualizar textos y banner limpiamente (Imagen 1 fix)
  if (el.testSceneIndicator) el.testSceneIndicator.textContent = `Parte ${sceneId}`;
  if (el.scenePartTitle) el.scenePartTitle.textContent = `Parte ${sceneId}`;
  
  if (el.sceneIllustration) {
    el.sceneIllustration.src = SCENE_ILLUSTRATIONS[sceneId] || "src/assets/illustrations/Discernimiento.png";
  }
  
  // Filtrar situaciones de esta escena
  const sceneQuestions = situations.filter(s => s.sceneId === sceneId);
  
  // Renderizar preguntas
  el.questionsContainer.innerHTML = '';
  sceneQuestions.forEach(q => {
    const answeredValue = state.answers[q.id] || null;
    
    // Crear contenedor del ítem
    const itemEl = document.createElement('div');
    itemEl.className = 'situation-item';
    itemEl.dataset.questionId = q.id;
    
    // Fila superior (Número circular + situación)
    const headerRow = document.createElement('div');
    headerRow.className = 'situation-header-row';
    
    const numEl = document.createElement('span');
    numEl.className = 'situation-number';
    numEl.textContent = q.id;
    
    const textEl = document.createElement('p');
    textEl.className = 'situation-text';
    textEl.textContent = q.text;
    
    headerRow.appendChild(numEl);
    headerRow.appendChild(textEl);
    itemEl.appendChild(headerRow);
    
    // Fila de la escala de píldoras con gradiente y tooltip flotante (Imagen 3 & 4 style)
    const scaleWrapper = document.createElement('div');
    scaleWrapper.className = 'situation-scale-wrapper';

    const labels = {
      1: "Casi nunca",
      2: "Rara vez",
      3: "A veces (Evita 3)",
      4: "Con frecuencia",
      5: "Con mucha frecuencia"
    };

    // Tooltip flotante tipo Imagen 4
    const tooltip = document.createElement('div');
    tooltip.className = `scale-tooltip-bubble ${answeredValue ? 'show' : ''}`;
    tooltip.id = `tooltip-q-${q.id}`;
    if (answeredValue) {
      tooltip.textContent = labels[answeredValue];
      tooltip.style.left = `${(answeredValue - 0.5) * 20}%`;
    }
    scaleWrapper.appendChild(tooltip);

    const scaleRow = document.createElement('div');
    scaleRow.className = 'situation-scale-row';

    const pillsContainer = document.createElement('div');
    pillsContainer.className = 'scale-pills';

    for (let i = 1; i <= 5; i++) {
      const pill = document.createElement('button');
      pill.className = `scale-pill scale-pill-${i} ${answeredValue === i ? 'selected' : ''}`;
      pill.dataset.value = i;
      pill.dataset.qid = q.id;
      pill.title = labels[i];
      pill.setAttribute('aria-label', `${i}: ${labels[i]}`);
      pill.innerHTML = `<span class="pill-number">${i}</span>`;

      // Click handler
      pill.addEventListener('click', (e) => handlePillClick(e, q.id, i, itemEl));
      pillsContainer.appendChild(pill);
    }

    scaleRow.appendChild(pillsContainer);
    scaleWrapper.appendChild(scaleRow);

    // Leyenda de extremos por pregunta (Frecuencia: Con poca frecuencia ... Con mucha frecuencia)
    const scaleSubLegend = document.createElement('div');
    scaleSubLegend.className = 'scale-sub-legend';
    scaleSubLegend.innerHTML = `
      <span class="sub-legend-left">Con poca frecuencia</span>
      <span class="sub-legend-right">Con mucha frecuencia</span>
    `;
    scaleWrapper.appendChild(scaleSubLegend);

    itemEl.appendChild(scaleWrapper);
    
    // Fila de estado para alertas de sesgo en valor 3
    const statusRow = document.createElement('div');
    statusRow.className = 'situation-status-row';
    
    const biasAlert = document.createElement('span');
    biasAlert.className = `bias-alert ${answeredValue === 3 ? 'show' : ''}`;
    biasAlert.innerHTML = `⚠️ Evita neutrales`;
    biasAlert.id = `bias-q-${q.id}`;
    
    statusRow.appendChild(biasAlert);
    itemEl.appendChild(statusRow);
    
    el.questionsContainer.appendChild(itemEl);
  });
  
  // Deshabilitar botón atrás en Parte 1
  el.btnPrev.disabled = sceneId === 1;
  checkSceneCompletion();
  updateProgressBar();
}

// ---------------------------------------------------------------------------
// Modales de Progreso e Hitos (25%, 50%, 90% - IQ Test Style)
// ---------------------------------------------------------------------------
const shownMilestones = { 25: false, 50: false, 90: false };

function checkProgressMilestone() {
  const answeredCount = Object.keys(state.answers).length;
  const pct = Math.round((answeredCount / TOTAL_SITUATIONS) * 100);

  if (pct >= 90 && !shownMilestones[90]) {
    shownMilestones[90] = true;
    showMilestoneModal(90, '🔥 90% COMPLETADO', '¡Último tramo!', 'Calibrando la precisión final de tus 3 Dones Principales...', 'src/assets/illustrations/ui/90.png');
  } else if (pct >= 50 && !shownMilestones[50]) {
    shownMilestones[50] = true;
    showMilestoneModal(50, '🎯 50% COMPLETADO', '¡Vas por la mitad!', 'Mapeando tus fortalezas prácticas de servicio...', 'src/assets/illustrations/ui/70.png');
  } else if (pct >= 25 && !shownMilestones[25]) {
    shownMilestones[25] = true;
    showMilestoneModal(25, '⚡ 25% COMPLETADO', '¡Buen ritmo!', 'Procesando tus primeras tendencias de afinidad...', 'src/assets/illustrations/ui/25.png');
  }
}

function showMilestoneModal(pct, badgeText, titleText, descText, imgPath) {
  const modal = document.getElementById('modal-progress-milestone');
  if (!modal) return;

  const badgeEl = document.getElementById('milestone-badge-pct');
  const imgEl = document.getElementById('milestone-img');
  const titleEl = document.getElementById('milestone-title');
  const descEl = document.getElementById('milestone-desc');

  if (badgeEl) badgeEl.textContent = badgeText;
  if (imgEl && imgPath) imgEl.src = imgPath;
  if (titleEl) titleEl.textContent = titleText;
  if (descEl) descEl.textContent = descText;

  modal.classList.add('active');
}

const btnCloseMilestone = document.getElementById('btn-close-milestone');
if (btnCloseMilestone) {
  btnCloseMilestone.addEventListener('click', () => {
    document.getElementById('modal-progress-milestone')?.classList.remove('active');
  });
}

function handlePillClick(event, qid, val, itemEl) {
  const btn = event.currentTarget;
  
  // Animación de onda ripple
  btn.classList.add('clicked');
  setTimeout(() => btn.classList.remove('clicked'), 400);
  
  // Guardar respuestas
  state.answers[qid] = val;
  saveAnswers(state.answers);
  
  // Actualizar clases seleccionadas en las píldoras de este grupo
  const pillsBox = btn.parentElement;
  pillsBox.querySelectorAll('.scale-pill').forEach(p => {
    p.classList.toggle('selected', Number(p.dataset.value) === val);
  });

  // Actualizar Tooltip Flotante (Imagen 4 style)
  const tooltipEl = document.getElementById(`tooltip-q-${qid}`);
  if (tooltipEl) {
    const labels = {
      1: "Casi nunca",
      2: "Rara vez",
      3: "A veces (Evita 3)",
      4: "Con frecuencia",
      5: "Con mucha frecuencia"
    };
    tooltipEl.textContent = labels[val];
    tooltipEl.style.left = `${(val - 0.5) * 20}%`;
    tooltipEl.classList.add('show');
  }
  
  // Mostrar u ocultar alerta de sesgo (si responde 3)
  const biasEl = document.getElementById(`bias-q-${qid}`);
  if (biasEl) {
    biasEl.classList.toggle('show', val === 3);
  }
  
  checkSceneCompletion();
  updateProgressBar();
  checkProgressMilestone();
  
  // Auto-scroll suave a la siguiente pregunta sin responder
  setTimeout(() => {
    const sceneQuestions = situations.filter(s => s.sceneId === state.currentScene);
    const nextUnanswered = sceneQuestions.find(q => !state.answers[q.id]);
    if (nextUnanswered) {
      const nextCard = el.questionsContainer.querySelector(`[data-question-id="${nextUnanswered.id}"]`);
      if (nextCard) {
        nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, 250);
}

function checkSceneCompletion() {
  const sceneId = state.currentScene;
  const sceneQuestions = situations.filter(s => s.sceneId === sceneId);
  const complete = sceneQuestions.every(q => state.answers[q.id]);
  
  el.btnNext.disabled = !complete;
  el.navHint.style.opacity = complete ? '0' : '1';
}

function updateProgressBar() {
  const globalAnswered = countAnswered();
  const pct = Math.round((globalAnswered / TOTAL_SITUATIONS) * 100);
  
  el.testPercentIndicator.textContent = `${pct}% Completado`;
  el.testProgressBar.style.width = `${pct}%`;
}

function countAnswered() {
  let count = 0;
  for (const s of situations) {
    if (state.answers[s.id]) count++;
  }
  return count;
}

// ---------------------------------------------------------------------------
// Finalización y Resultados
// ---------------------------------------------------------------------------
function sendBridgeCompletionMessage(payload) {
  const message = { type: 'IGC_GIFTS_TEST_COMPLETED', payload };

  if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  }

  if (window.parent && window.parent !== window) {
    window.parent.postMessage(message, '*');
  }
}

function triggerConfetti() {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#336cdd', '#D4AF37', '#E05A2B', '#10B981']
    });
  }
}

function finishTest() {
  const calculation = runFullCalculation(state.answers);
  
  const result = {
    version: '2.0.0',
    completedAt: new Date().toISOString(),
    answers: { ...state.answers },
    scores: calculation.percentage,
    topGifts: calculation.top3.map(g => g.id),
  };
  
  saveResult(result);
  submitResult(result); // best-effort, no bloquea la UI si falla

  sendBridgeCompletionMessage({
    version: result.version,
    completedAt: result.completedAt,
    answers: result.answers,
    scores: result.scores,
    topGifts: result.topGifts,
  });
  
  renderResults(calculation);
  showScreen('results');
  triggerConfetti();
}

function renderResults(calculation) {
  const top3 = calculation.top3;
  const remaining = calculation.ranked.slice(3);
  
  // Render Bento Grid Top 3
  el.topGiftsContainer.innerHTML = '';
  top3.forEach((g, i) => {
    const card = document.createElement('div');
    card.className = `bento-card rank-${i+1}`;
    
    const rankIcons = ['🥇', '🥈', '🥉'];
    
    let innerHTML = `
      <span class="bento-rank-tag">${rankIcons[i]}</span>
      <div class="bento-card-content">
        <div class="bento-card-header">
          <img src="${g.illustration || 'src/assets/illustrations/Evangelismo.png'}" alt="${g.name}" class="bento-gift-img">
          <div class="bento-title-text">
            <h4>${g.name}</h4>
            <span class="bento-pct-badge">${g.percentage}% afinidad</span>
          </div>
        </div>
        <p class="bento-description">${g.description}</p>
    `;
    
    if (i === 0) {
      innerHTML += `
        <div class="bento-extended">
          <div>
            <span class="bento-meta-title">💡 Consejos para florecer</span>
            <p class="bento-meta-text">${g.tips ? g.tips[0] : 'Sigue usando tu don con amor.'}</p>
          </div>
          <div>
            <span class="bento-meta-title">📌 Ejemplo práctico</span>
            <p class="bento-meta-text">${g.examples ? g.examples[0] : 'Servir activamente en las tareas locales.'}</p>
          </div>
        </div>
      `;
    }
    
    innerHTML += `
        <button class="btn-card-more" data-gift-id="${g.id}">
          Ver detalles
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    `;
    
    card.innerHTML = innerHTML;
    el.topGiftsContainer.appendChild(card);
  });
  
  // Render listado restante
  el.remainingGiftsContainer.innerHTML = '';
  remaining.forEach(g => {
    const row = document.createElement('div');
    row.className = 'remaining-row';
    row.dataset.giftId = g.id;
    row.addEventListener('click', () => openGiftModal(g.id));
    
    row.innerHTML = `
      <div class="remaining-info">
        <span class="remaining-name">${g.name}</span>
        <span class="remaining-pct">${g.percentage}%</span>
      </div>
      <div class="remaining-bar-track">
        <div class="remaining-bar-fill" style="width: ${g.percentage}%"></div>
      </div>
    `;
    el.remainingGiftsContainer.appendChild(row);
  });
  
  // Click de "Ver detalles" del Bento
  el.topGiftsContainer.querySelectorAll('.btn-card-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openGiftModal(btn.dataset.giftId);
    });
  });
  
  // Habilitar botón de ver resultados en inicio
  el.btnViewResults.style.display = 'block';
}

// ---------------------------------------------------------------------------
// Modal de Detalles de un Don (Replicando Ref3.png)
// ---------------------------------------------------------------------------
function openGiftModal(giftId) {
  const g = gifts.find(x => x.id === giftId);
  if (!g) return;
  
  const stored = loadStoredResult();
  const currentPct = stored ? stored.scores[g.id] : null;
  
  let tipsHTML = '';
  if (g.tips && g.tips.length > 0) {
    tipsHTML = `
      <div class="modal-section objective-callout">
        <span class="modal-section-title">💡 Consejos para florecer</span>
        <ul class="modal-list">
          ${g.tips.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  let examplesHTML = '';
  if (g.examples && g.examples.length > 0) {
    examplesHTML = `
      <div class="modal-section">
        <span class="modal-section-title">📌 Ejemplos prácticos</span>
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
    
    <p class="modal-desc">${g.description}</p>
    
    ${tipsHTML}
    ${examplesHTML}
  `;
  
  el.modal.classList.add('active');
}

function closeGiftModal() {
  el.modal.classList.remove('active');
}

el.modalClose.addEventListener('click', closeGiftModal);
el.modal.addEventListener('click', (e) => {
  if (e.target === el.modal) closeGiftModal();
});

// ---------------------------------------------------------------------------
// Glosario / Aprender de los Dones
// ---------------------------------------------------------------------------
function renderGlossary(filterText = '') {
  const query = filterText.toLowerCase().trim();
  el.glossaryGrid.innerHTML = '';
  
  const filtered = gifts.filter(g => {
    if (!query) return true;
    return (
      g.name.toLowerCase().includes(query) ||
      g.description.toLowerCase().includes(query) ||
      (g.tips && g.tips.some(t => t.toLowerCase().includes(query))) ||
      (g.examples && g.examples.some(ex => ex.toLowerCase().includes(query)))
    );
  });
  
  if (filtered.length === 0) {
    el.glossaryGrid.innerHTML = `<p style="grid-column: span 3; text-align: center; color: var(--text-muted); padding: 32px 0;">No se encontraron dones.</p>`;
    return;
  }
  
  filtered.forEach(g => {
    const card = document.createElement('div');
    card.className = 'glossary-card';
    card.addEventListener('click', () => openGiftModal(g.id));
    
    card.innerHTML = `
      <div class="glossary-card-header">
        <img src="${g.illustration || 'src/assets/illustrations/Evangelismo.png'}" alt="${g.name}" class="glossary-gift-img">
        <h4>${g.name}</h4>
      </div>
      <p>${g.description}</p>
    `;
    el.glossaryGrid.appendChild(card);
  });
}

el.glossarySearch.addEventListener('input', (e) => {
  renderGlossary(e.target.value);
});

// ---------------------------------------------------------------------------
// Event Listeners y Navegación
// ---------------------------------------------------------------------------
el.btnStart.addEventListener('click', () => {
  state.currentScene = getFirstUnansweredScene();
  renderScene();
  showScreen('test');

  // Lanzar tour guiado si es la primera vez
  if (localStorage.getItem('dones_igc_tour_done') !== 'true') {
    setTimeout(startDriverTour, 400);
    localStorage.setItem('dones_igc_tour_done', 'true');
  }
});

if (el.navBtnGlossaryWelcome) {
  el.navBtnGlossaryWelcome.addEventListener('click', () => {
    renderGlossary();
    showScreen('glossary');
  });
}

// Botones de la Barra Flotante Inferior Glassmorphic
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

// Botón de Volver/Inicio en el Header
el.navBtnBack.addEventListener('click', () => {
  const stored = loadStoredResult();
  el.btnViewResults.style.display = (stored && isTestComplete(stored.answers)) ? 'block' : 'none';
  showScreen('welcome');
});

// Navegación del Test con Auto-scroll superior
el.btnPrev.addEventListener('click', () => {
  if (state.currentScene > 1) {
    state.currentScene--;
    renderScene();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

el.btnNext.addEventListener('click', () => {
  const sceneId = state.currentScene;
  const sceneQuestions = situations.filter(s => s.sceneId === sceneId);
  const complete = sceneQuestions.every(q => state.answers[q.id]);
  
  if (!complete) return;
  
  if (sceneId < 10) {
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
    el.btnViewResults.style.display = 'none';
    showScreen('welcome');
  }
});

// ---------------------------------------------------------------------------
// Modal Selector de 3 Imágenes de Compartir & Compartir Test a otros (Estilo Heavy App)
// ---------------------------------------------------------------------------
const btnOpenShareModal = document.getElementById('btn-open-share-modal');
const modalShareSelector = document.getElementById('modal-share-selector');
const modalShareCloseBtn = document.getElementById('modal-share-close-btn');

if (btnOpenShareModal && modalShareSelector) {
  btnOpenShareModal.addEventListener('click', () => {
    modalShareSelector.classList.add('active');
  });
}

if (modalShareCloseBtn && modalShareSelector) {
  modalShareCloseBtn.addEventListener('click', () => {
    modalShareSelector.classList.remove('active');
  });
}

let selectedShareVariant = 'bento';
document.querySelectorAll('.share-variant-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.share-variant-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    selectedShareVariant = card.dataset.variant;
  });
});

const btnTriggerCanvasShare = document.getElementById('btn-trigger-canvas-share');
if (btnTriggerCanvasShare) {
  btnTriggerCanvasShare.addEventListener('click', async () => {
    const stored = loadStoredResult();
    if (!stored) return;

    try {
      if (modalShareSelector) modalShareSelector.classList.remove('active');
      const { downloadStory } = await import('./canvas-share.js');
      const calculation = runFullCalculation(stored.answers);
      downloadStory(calculation, selectedShareVariant);
    } catch (err) {
      console.error("Error al compartir historia:", err);
      alert("Error al descargar la imagen.");
    }
  });
}

// Botón Secundario: "Compartir Test a otros"
const btnShareTestLink = document.getElementById('btn-share-test-link');
if (btnShareTestLink) {
  btnShareTestLink.addEventListener('click', async () => {
    const shareData = {
      title: 'Test de Dones Espirituales IGC',
      text: '¡Hola! Te invito a realizar el Test de Dones Espirituales de Iglesia Gran Comisión Tegucigalpa para descubrir cómo Dios te ha capacitado para servir:',
      url: window.location.href.split('#')[0]
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        console.log('Share canceled', e);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('¡Enlace de invitación copiado al portapapeles! Ya puedes pegarlo en WhatsApp.');
      } catch (e) {
        alert(`Comparte este enlace: ${shareData.url}`);
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Inicialización
// ---------------------------------------------------------------------------
function init() {
  const stored = loadStoredResult();
  if (stored && isTestComplete(stored.answers)) {
    const calculation = runFullCalculation(stored.answers);
    renderResults(calculation);
    showScreen('results');
    el.btnViewResults.style.display = 'block';
  } else {
    showScreen('welcome');
  }
}

init();
