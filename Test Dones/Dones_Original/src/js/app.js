/**
 * app.js
 * Orquestador de UI: eventos, renderizado, persistencia en localStorage
 * y el puente de comunicación con una futura app móvil contenedora
 * (Webview postMessage Bridge, ver docs/ARCHITECTURE.md).
 *
 * Este archivo SÍ depende del DOM/navegador. Toda la lógica matemática
 * vive en test-engine.js (desacoplada), y los datos en questions.js /
 * gifts-data.js.
 */

import { questions, TOTAL_QUESTIONS, QUESTIONS_PER_PAGE, TOTAL_PAGES } from './questions.js';
import { gifts } from './gifts-data.js';
import { runFullCalculation, countAnswered, isTestComplete } from './test-engine.js';

// ---------------------------------------------------------------------------
// Persistencia (localStorage)
// ---------------------------------------------------------------------------
const STORAGE_ANSWERS_KEY = 'igc_gifts_answers';
const STORAGE_RESULT_KEY = 'igc_gifts_result';

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
    /* localStorage no disponible (modo privado, webview restringido, etc.) */
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
    /* noop */
  }
}

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_ANSWERS_KEY);
    localStorage.removeItem(STORAGE_RESULT_KEY);
  } catch {
    /* noop */
  }
}

// ---------------------------------------------------------------------------
// Estado en memoria
// ---------------------------------------------------------------------------
const state = {
  answers: loadAnswers(),
  currentPage: 0, // 0-15
  showAllDetails: false,
};

// ---------------------------------------------------------------------------
// Referencias al DOM
// ---------------------------------------------------------------------------
const screens = {
  welcome: document.getElementById('screen-welcome'),
  test: document.getElementById('screen-test'),
  results: document.getElementById('screen-results'),
  allGifts: document.getElementById('screen-all-gifts'),
};

const el = {
  navTest: document.getElementById('nav-btn-test'),
  navAll: document.getElementById('nav-btn-all'),
  btnStart: document.getElementById('btn-start'),
  progressTitle: document.getElementById('wizard-progress-title'),
  progressPercent: document.getElementById('wizard-progress-percent'),
  progressBar: document.getElementById('wizard-progress-bar'),
  blockTitle: document.getElementById('wizard-block-title'),
  questionsContainer: document.getElementById('questions-container'),
  btnPrev: document.getElementById('btn-prev'),
  btnNext: document.getElementById('btn-next'),
  topGiftsContainer: document.getElementById('top-gifts-container'),
  scoresChartContainer: document.getElementById('scores-chart-container'),
  allGiftsGrid: document.getElementById('all-gifts-grid'),
  btnToggleAll: document.getElementById('btn-toggle-all'),
  btnReset: document.getElementById('btn-reset'),
  glossaryGrid: document.getElementById('glossary-grid'),
  modal: document.getElementById('gift-modal'),
  modalBody: document.getElementById('gift-modal-body'),
};

const SCALE_LABELS = {
  1: 'Casi nunca',
  2: 'Rara vez',
  3: 'A veces',
  4: 'A menudo',
  5: 'Casi siempre',
};

// ---------------------------------------------------------------------------
// Utilidades de UI
// ---------------------------------------------------------------------------
function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.add('hidden'));
  screens[name].classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function iconSvg(pathD, classes = 'w-7 h-7') {
  return `<svg class="${classes}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${pathD}"></path></svg>`;
}

function giftIllustration(gift, classes = 'w-14 h-14') {
  return `<img src="${gift.illustration}" alt="${gift.name}" class="${classes}" loading="lazy">`;
}

// ---------------------------------------------------------------------------
// Wizard del test
// ---------------------------------------------------------------------------
function firstUnansweredPage() {
  for (let page = 0; page < TOTAL_PAGES; page++) {
    const start = page * QUESTIONS_PER_PAGE + 1;
    const end = start + QUESTIONS_PER_PAGE - 1;
    for (let q = start; q <= end; q++) {
      if (!state.answers[q]) return page;
    }
  }
  return TOTAL_PAGES - 1;
}

function renderQuestionPage() {
  const start = state.currentPage * QUESTIONS_PER_PAGE + 1;
  const end = start + QUESTIONS_PER_PAGE - 1;
  const pageQuestions = questions.filter((q) => q.id >= start && q.id <= end);

  el.blockTitle.textContent = `Preguntas ${start} – ${end}`;

  el.questionsContainer.innerHTML = pageQuestions
    .map((q) => {
      const selected = state.answers[q.id];
      const scaleButtons = [1, 2, 3, 4, 5]
        .map((val) => {
          const isSelected = selected === val;
          return `<button type="button" class="scale-btn scale-${val}${isSelected ? ' selected' : ''}" data-qid="${q.id}" data-value="${val}" aria-label="${SCALE_LABELS[val]}">${val}</button>`;
        })
        .join('');

      const showWarning = selected === 3;

      return `
        <div class="question-item space-y-3" data-question-wrapper="${q.id}">
          <p class="font-semibold text-[#1E293B]">${q.id}. ${q.text}</p>
          <div class="flex justify-between items-center gap-2 flex-wrap">
            ${scaleButtons}
          </div>
          <div class="flex justify-between text-[10px] uppercase font-bold text-[#64748B] px-1">
            <span>Casi nunca</span><span>Casi siempre</span>
          </div>
          <div class="warning-box p-2 px-3${showWarning ? '' : ' hidden'}" data-warning-for="${q.id}">
            💭 Intenta evitar "A veces" — elige 1, 2, 4 ó 5 para resultados más claros y sin sesgos.
          </div>
        </div>`;
    })
    .join('');

  updateProgress();
  updateNavButtons();
}

function updateProgress() {
  const answered = countAnswered(state.answers);
  const percent = Math.round((answered / TOTAL_QUESTIONS) * 100);
  el.progressTitle.textContent = `Página ${state.currentPage + 1} de ${TOTAL_PAGES}`;
  el.progressPercent.textContent = `${percent}% Completado`;
  el.progressBar.style.width = `${percent}%`;
}

function updateNavButtons() {
  el.btnPrev.disabled = state.currentPage === 0;
  const isLastPage = state.currentPage === TOTAL_PAGES - 1;
  el.btnNext.innerHTML = isLastPage
    ? `Ver Resultados ${iconSvg('M9 5l7 7-7 7', 'w-5 h-5')}`
    : `Siguiente ${iconSvg('M9 5l7 7-7 7', 'w-5 h-5')}`;
}

function currentPageIsComplete() {
  const start = state.currentPage * QUESTIONS_PER_PAGE + 1;
  const end = start + QUESTIONS_PER_PAGE - 1;
  for (let q = start; q <= end; q++) {
    if (!state.answers[q]) return false;
  }
  return true;
}

function flashIncompleteWarning() {
  el.questionsContainer.querySelectorAll('.question-item').forEach((item) => {
    const qid = Number(item.dataset.questionWrapper);
    if (!state.answers[qid]) {
      item.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      item.offsetHeight;
      item.style.animation = 'shake 0.35s';
      item.style.outline = '2px dashed #DC2626';
      item.style.borderRadius = '8px';
    }
  });
}

el.questionsContainer.addEventListener('click', (event) => {
  const btn = event.target.closest('.scale-btn');
  if (!btn) return;
  const qid = Number(btn.dataset.qid);
  const value = Number(btn.dataset.value);
  state.answers[qid] = value;
  saveAnswers(state.answers);

  const wrapper = el.questionsContainer.querySelector(`[data-question-wrapper="${qid}"]`);
  wrapper.querySelectorAll('.scale-btn').forEach((b) => {
    b.classList.toggle('selected', Number(b.dataset.value) === value);
  });
  const warning = wrapper.querySelector(`[data-warning-for="${qid}"]`);
  warning.classList.toggle('hidden', value !== 3);
  wrapper.style.outline = 'none';

  updateProgress();
});

el.btnPrev.addEventListener('click', () => {
  if (state.currentPage === 0) return;
  state.currentPage -= 1;
  renderQuestionPage();
});

el.btnNext.addEventListener('click', () => {
  if (!currentPageIsComplete()) {
    flashIncompleteWarning();
    return;
  }
  const isLastPage = state.currentPage === TOTAL_PAGES - 1;
  if (isLastPage) {
    finishTest();
    return;
  }
  state.currentPage += 1;
  renderQuestionPage();
});

el.btnStart.addEventListener('click', () => {
  state.currentPage = firstUnansweredPage();
  showScreen('test');
  renderQuestionPage();
});

// ---------------------------------------------------------------------------
// Finalización + puente móvil (Webview postMessage Bridge)
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

function finishTest() {
  const { scores, ranked, topGifts } = runFullCalculation(state.answers);

  const result = {
    version: '1.0',
    completedAt: new Date().toISOString(),
    answers: { ...state.answers },
    scores,
    topGifts: topGifts.map((g) => g.id),
  };
  saveResult(result);
  sendBridgeCompletionMessage({
    version: result.version,
    completedAt: result.completedAt,
    answers: result.answers,
    scores: result.scores,
    topGifts: result.topGifts,
  });

  renderResults(ranked);
  showScreen('results');
}

// ---------------------------------------------------------------------------
// Resultados
// ---------------------------------------------------------------------------
function scoreBarPercent(score) {
  return Math.max(0, Math.min(100, (score / 40) * 100));
}

function renderResults(ranked) {
  const top3Ids = new Set(ranked.slice(0, 3).map((g) => g.id));

  el.topGiftsContainer.innerHTML = ranked
    .slice(0, 3)
    .map(
      (g, i) => `
      <div class="doodle-card-organic p-5 bg-white space-y-3 cursor-pointer gift-card" data-gift-id="${g.id}">
        <div class="flex items-center justify-between">
          <div class="w-14 h-14 rounded-full bg-blue-50 border-2 border-[#1E293B] flex items-center justify-center overflow-hidden">
            ${giftIllustration(g, 'w-11 h-11')}
          </div>
          <span class="text-2xl">${['🥇', '🥈', '🥉'][i]}</span>
        </div>
        <h4 class="text-lg font-bold text-[#2E5138]">${g.name}</h4>
        <p class="text-xs uppercase font-bold text-[#2F6BBD] tracking-wide">${g.oneWord}</p>
        <p class="text-sm font-semibold text-[#64748B]">${g.score} / 40 puntos</p>
      </div>`
    )
    .join('');

  el.scoresChartContainer.innerHTML = ranked
    .map(
      (g) => `
      <div class="chart-row gift-card" data-gift-id="${g.id}" style="cursor:pointer">
        <span class="chart-label">${g.name}</span>
        <div class="chart-bar-bg">
          <div class="chart-bar-fill${top3Ids.has(g.id) ? ' top-gift' : ''}" style="width:${scoreBarPercent(g.score)}%"></div>
        </div>
        <span class="chart-value">${g.score}</span>
      </div>`
    )
    .join('');

  renderAllGiftsGrid(ranked, top3Ids);

  el.btnToggleAll.onclick = () => {
    state.showAllDetails = !state.showAllDetails;
    el.btnToggleAll.textContent = state.showAllDetails ? 'Ocultar Detalles' : 'Ver Detalles';
    renderAllGiftsGrid(ranked, top3Ids);
  };
}

function renderAllGiftsGrid(ranked, top3Ids) {
  el.allGiftsGrid.innerHTML = ranked
    .map(
      (g) => `
      <div class="doodle-card p-4 bg-white space-y-2 cursor-pointer gift-card" data-gift-id="${g.id}">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 shrink-0 rounded-full bg-blue-50 border-2 border-[#1E293B] flex items-center justify-center overflow-hidden">
            ${giftIllustration(g, 'w-7 h-7')}
          </div>
          <div class="min-w-0">
            <p class="font-bold text-sm text-[#2E5138] truncate">${g.name}${top3Ids.has(g.id) ? ' ⭐' : ''}</p>
            <p class="text-xs font-semibold text-[#64748B]">${g.score} / 40</p>
          </div>
        </div>
        ${state.showAllDetails ? `<p class="text-xs text-[#1E293B] leading-snug">${g.description}</p>` : ''}
      </div>`
    )
    .join('');
}

// ---------------------------------------------------------------------------
// Glosario de dones (modo independiente)
// ---------------------------------------------------------------------------
function renderGlossary() {
  el.glossaryGrid.innerHTML = gifts
    .map(
      (g) => `
      <div class="doodle-card p-5 bg-white space-y-3 cursor-pointer gift-card" data-gift-id="${g.id}">
        <div class="w-14 h-14 rounded-full bg-blue-50 border-2 border-[#1E293B] flex items-center justify-center overflow-hidden">
          ${giftIllustration(g, 'w-11 h-11')}
        </div>
        <h4 class="text-lg font-bold text-[#2E5138]">${g.name}</h4>
        <p class="text-xs uppercase font-bold text-[#2F6BBD] tracking-wide">${g.oneWord}</p>
        <p class="text-sm text-[#64748B] line-clamp-3">${g.description}</p>
      </div>`
    )
    .join('');
}

// ---------------------------------------------------------------------------
// Modal de detalle (información bíblica y ministerial)
// ---------------------------------------------------------------------------
function openGiftModal(giftId) {
  const g = gifts.find((x) => x.id === giftId);
  if (!g) return;

  el.modalBody.innerHTML = `
    <div class="flex items-start justify-between gap-4">
      <div class="w-14 h-14 shrink-0 rounded-full bg-blue-50 border-2 border-[#1E293B] flex items-center justify-center overflow-hidden">
        ${giftIllustration(g, 'w-11 h-11')}
      </div>
      <button id="modal-close-btn" class="doodle-btn px-3 py-1.5 text-sm bg-white">✕</button>
    </div>
    <div class="space-y-1">
      <h3 class="text-2xl font-bold text-[#2E5138]">${g.name}</h3>
      <p class="text-sm uppercase font-bold text-[#2F6BBD] tracking-wide">En una palabra: ${g.oneWord}</p>
    </div>
    <p class="text-sm leading-relaxed text-[#1E293B]">${g.description}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      <div class="p-3 border-2 border-dashed border-[#1E293B] rounded-lg bg-[#F5F2EB]">
        <p class="font-bold text-[#2E5138]">Uso excesivo</p>
        <p>${g.overuse}</p>
      </div>
      <div class="p-3 border-2 border-dashed border-[#1E293B] rounded-lg bg-[#F5F2EB]">
        <p class="font-bold text-[#2E5138]">Objetivo</p>
        <p>${g.objective}</p>
      </div>
    </div>
    <div class="p-3 bg-white border-2 border-[#1E293B] rounded-lg text-sm">
      <p class="font-bold text-[#2F6BBD]">📖 Pasajes Bíblicos</p>
      <p>${g.passages}</p>
    </div>
  `;
  el.modal.classList.add('open');
  el.modalBody.querySelector('#modal-close-btn').addEventListener('click', closeGiftModal);
}

function closeGiftModal() {
  el.modal.classList.remove('open');
}

document.addEventListener('click', (event) => {
  const card = event.target.closest('.gift-card');
  if (card) {
    openGiftModal(card.dataset.giftId);
    return;
  }
  if (event.target === el.modal) {
    closeGiftModal();
  }
});

// ---------------------------------------------------------------------------
// Navegación superior + reinicio
// ---------------------------------------------------------------------------
el.navTest.addEventListener('click', () => {
  const stored = loadStoredResult();
  if (stored && isTestComplete(stored.answers)) {
    const { ranked } = runFullCalculation(stored.answers);
    renderResults(ranked);
    showScreen('results');
  } else {
    state.currentPage = firstUnansweredPage();
    showScreen('test');
    renderQuestionPage();
  }
});

el.navAll.addEventListener('click', () => {
  renderGlossary();
  showScreen('allGifts');
});

el.btnReset.addEventListener('click', () => {
  const confirmed = window.confirm('¿Seguro que deseas borrar tus resultados y reiniciar el test?');
  if (!confirmed) return;
  clearStorage();
  state.answers = {};
  state.currentPage = 0;
  showScreen('welcome');
});

// ---------------------------------------------------------------------------
// Arranque de la aplicación
// ---------------------------------------------------------------------------
function init() {
  const stored = loadStoredResult();
  if (stored && isTestComplete(stored.answers)) {
    const { ranked } = runFullCalculation(stored.answers);
    renderResults(ranked);
    showScreen('results');
    return;
  }
  showScreen('welcome');
}

init();
