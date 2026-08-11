/**
 * score-engine.js — Dones IGC (v2)
 * Motor de cálculo de dones espirituales.
 *
 * DESACOPLADO: sin dependencias del DOM ni del navegador (sin `window`,
 * `document`, `localStorage`). Portable a cualquier framework/stack que
 * use Gemini para el frontend — ver docs/SCORE_ENGINE.md para el contrato
 * completo (formato de entrada/salida, reglas de desempate, edge cases).
 */

import { situations, TOTAL_SITUATIONS } from '../data/situations.js';
import { gifts, GIFTS_COUNT } from '../data/gifts.js';

const GIFT_ORDER = gifts.map((g) => g.id); // también es el criterio de desempate

/** Número de situaciones respondidas (valor truthy 1-5) en el mapa. */
export function countAnswered(answersMap) {
  let count = 0;
  for (const s of situations) {
    if (answersMap[s.id]) count++;
  }
  return count;
}

/** true si las 76 situaciones tienen respuesta. */
export function isTestComplete(answersMap) {
  return countAnswered(answersMap) === TOTAL_SITUATIONS;
}

/**
 * Suma el puntaje crudo (1-5 por situación) de cada don.
 * @param {Object<number, number>} answersMap - { "1": 4, "2": 2, ... }
 * @returns {Object<string, number>} puntaje crudo por giftId
 */
export function calculateRawScores(answersMap) {
  const raw = {};
  for (const g of gifts) raw[g.id] = 0;
  for (const s of situations) {
    const value = Number(answersMap[s.id]) || 0;
    raw[s.giftId] += value;
  }
  return raw;
}

/**
 * Normaliza cada puntaje crudo a un porcentaje 0-100 sobre el máximo
 * posible de ESE don (questionCount × 5) — necesario porque los 15 dones
 * no tienen la misma cantidad de situaciones (4 a 7 c/u, ver CONTENIDO.md).
 * Redondeado a entero (0 decimales).
 */
export function calculatePercentages(rawScores) {
  const pct = {};
  for (const g of gifts) {
    pct[g.id] = Math.round((rawScores[g.id] / g.maxRawScore) * 100);
  }
  return pct;
}

/**
 * Combina puntajes crudos + porcentaje con el catálogo de dones y ordena
 * de mayor a menor porcentaje.
 *
 * Desempate determinista (mismo resultado siempre, sin aleatoriedad) en
 * 2 niveles, para que el ranking sea 100% reproducible:
 *   1) mayor puntaje CRUDO (más preciso que el % ya redondeado)
 *   2) si aún hay empate exacto: el orden fijo de `gifts` (GIFT_ORDER,
 *      definido en data/gifts.js según CONTENIDO.md)
 *
 * @returns {Array<Object>} 15 dones con { ...gift, raw, percentage, rank }
 */
export function rankGifts(rawScores, percentages) {
  const withScores = gifts.map((g) => ({
    ...g,
    raw: rawScores[g.id],
    percentage: percentages[g.id],
  }));

  withScores.sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    if (b.raw !== a.raw) return b.raw - a.raw;
    return GIFT_ORDER.indexOf(a.id) - GIFT_ORDER.indexOf(b.id);
  });

  return withScores.map((g, i) => ({ ...g, rank: i + 1 }));
}

/** Los N dones principales (por defecto Top 3), ya con `rank` 1/2/3. */
export function getTopGifts(rankedGifts, n = 3) {
  return rankedGifts.slice(0, n);
}

/** El don con menor porcentaje (para la card viral, si se necesita). */
export function getLowestGift(rankedGifts) {
  return rankedGifts[rankedGifts.length - 1];
}

/**
 * Ejecuta el cálculo completo: puntajes crudos, porcentajes, ranking y
 * Top 3. Punto de entrada único recomendado para consumidores externos
 * (frontend de Gemini, o cualquier otro stack).
 *
 * @param {Object<number, number>} answersMap
 * @returns {{raw: object, percentage: object, ranked: Array, top3: Array, lowest: Object, complete: boolean}}
 */
export function runFullCalculation(answersMap) {
  const raw = calculateRawScores(answersMap);
  const percentage = calculatePercentages(raw);
  const ranked = rankGifts(raw, percentage);
  const top3 = getTopGifts(ranked, 3);
  const lowest = getLowestGift(ranked);
  const complete = isTestComplete(answersMap);
  return { raw, percentage, ranked, top3, lowest, complete };
}
