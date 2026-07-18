/**
 * test-engine.js
 * Motor matemático de cálculo de dones espirituales.
 *
 * DESACOPLADO: no tiene dependencias del navegador ni del DOM
 * (sin `window`, `document`, `localStorage`, etc.). Puede copiarse
 * directamente a un entorno Node.js o React Native. Ver docs/ARCHITECTURE.md.
 */

import { TOTAL_QUESTIONS } from './questions.js';
import { gifts, GIFTS_COUNT } from './gifts-data.js';

/** Fórmula modular: asocia una pregunta (1-128) a un don (0-15). */
export function getGiftIndexForQuestion(questionId) {
  return (questionId - 1) % GIFTS_COUNT;
}

/**
 * Calcula el puntaje de los 16 dones a partir del mapa de respuestas.
 * @param {Object<number, number>} answersMap - { "1": 5, "2": 3, ... } valores 1-5
 * @returns {number[]} arreglo de 16 puntajes (rango 8-40 cada uno)
 */
export function calculateScores(answersMap) {
  const scores = new Array(GIFTS_COUNT).fill(0);
  for (let questionId = 1; questionId <= TOTAL_QUESTIONS; questionId++) {
    const value = Number(answersMap[questionId]) || 0;
    const giftIndex = getGiftIndexForQuestion(questionId);
    scores[giftIndex] += value;
  }
  return scores;
}

/**
 * Combina los puntajes con el catálogo de dones y ordena de mayor a menor.
 * @param {number[]} scores
 * @returns {Array<Object>} dones con su `score`, ordenados descendente
 */
export function rankGifts(scores) {
  return gifts
    .map((gift, index) => ({ ...gift, index, score: scores[index] }))
    .sort((a, b) => b.score - a.score);
}

/** Devuelve los N dones principales (por defecto Top 3). */
export function getTopGifts(rankedGifts, n = 3) {
  return rankedGifts.slice(0, n);
}

/** Número de preguntas respondidas (valor truthy) en el mapa. */
export function countAnswered(answersMap) {
  let count = 0;
  for (let questionId = 1; questionId <= TOTAL_QUESTIONS; questionId++) {
    if (answersMap[questionId]) count++;
  }
  return count;
}

/** true si las 128 preguntas tienen respuesta. */
export function isTestComplete(answersMap) {
  return countAnswered(answersMap) === TOTAL_QUESTIONS;
}

/**
 * Ejecuta el cálculo completo: puntajes, ranking y Top 3.
 * Punto de entrada único recomendado para consumidores externos
 * (app.js, o una futura app móvil que reutilice este motor).
 */
export function runFullCalculation(answersMap) {
  const scores = calculateScores(answersMap);
  const ranked = rankGifts(scores);
  const topGifts = getTopGifts(ranked, 3);
  return { scores, ranked, topGifts };
}
