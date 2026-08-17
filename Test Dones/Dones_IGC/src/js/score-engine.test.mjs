import { situations, TOTAL_SITUATIONS } from '../data/situations.js';
import { gifts, GIFTS_COUNT } from '../data/gifts.js';
import {
  countAnswered,
  isTestComplete,
  calculateRawScores,
  calculatePercentages,
  rankGifts,
  runFullCalculation,
} from './score-engine.js';

let failures = 0;
function check(label, cond) {
  if (cond) {
    console.log('PASS -', label);
  } else {
    console.log('FAIL -', label);
    failures++;
  }
}

// --- Data integrity -------------------------------------------------------
check('76 situaciones', situations.length === 76 && TOTAL_SITUATIONS === 76);
check('15 dones', gifts.length === 15 && GIFTS_COUNT === 15);

const idsSeen = new Set(situations.map((s) => s.id));
check('ids 1..76 únicos y sin huecos', idsSeen.size === 76 && [...idsSeen].sort((a,b)=>a-b).every((v, i) => v === i + 1));

const giftIds = new Set(gifts.map((g) => g.id));
check('cada situación apunta a un giftId válido', situations.every((s) => giftIds.has(s.giftId)));

const countPerGift = {};
for (const s of situations) countPerGift[s.giftId] = (countPerGift[s.giftId] || 0) + 1;
check('questionCount de cada don coincide con situaciones reales',
  gifts.every((g) => countPerGift[g.id] === g.questionCount));

check('maxRawScore = questionCount * 3 en todos los dones',
  gifts.every((g) => g.maxRawScore === g.questionCount * 3));

const scenesSeen = {};
for (const s of situations) {
  scenesSeen[s.sceneId] = scenesSeen[s.sceneId] || new Set();
  check(`Escena ${s.sceneId}: sin don repetido (${s.giftId})`, !scenesSeen[s.sceneId].has(s.giftId));
  scenesSeen[s.sceneId].add(s.giftId);
}
check('10 escenas en total', Object.keys(scenesSeen).length === 10);

// --- Score engine: caso vacío ----------------------------------------------
const empty = {};
check('countAnswered(vacío) === 0', countAnswered(empty) === 0);
check('isTestComplete(vacío) === false', isTestComplete(empty) === false);
const rEmpty = runFullCalculation(empty);
check('runFullCalculation(vacío): todos los % en 0', Object.values(rEmpty.percentage).every((p) => p === 0));
check('runFullCalculation(vacío): complete === false', rEmpty.complete === false);

// --- Score engine: todo en 1 (mínimo) --------------------------------------
const allOnes = {};
for (const s of situations) allOnes[s.id] = 1;
const rMin = runFullCalculation(allOnes);
check('todo en 1: complete === true', rMin.complete === true);
check('todo en 1: todos los % en 33 (mínimo raw = questionCount, % = questionCount/max*100 redondeado)',
  Object.entries(rMin.percentage).every(([gid, p]) => {
    const g = gifts.find((x) => x.id === gid);
    const expected = Math.round((g.questionCount / g.maxRawScore) * 100);
    return p === expected;
  }));

// --- Score engine: todo en 3 (máximo) --------------------------------------
const allThrees = {};
for (const s of situations) allThrees[s.id] = 3;
const rMax = runFullCalculation(allThrees);
check('todo en 3: complete === true', rMax.complete === true);
check('todo en 3: todos los % en 100', Object.values(rMax.percentage).every((p) => p === 100));
check('todo en 3: ranked tiene 15 items con rank 1..15',
  rMax.ranked.length === 15 && rMax.ranked.every((g, i) => g.rank === i + 1));
check('todo en 3: top3 tiene 3 items', rMax.top3.length === 3);

// --- Score engine: desempate por % (raw distinto decide) --------------------
// Con todas las respuestas en 2, el % da exactamente 67% para los 15 dones
const allTwos = {};
for (const s of situations) allTwos[s.id] = 2;
const rTwos = runFullCalculation(allTwos);
check('todo en 2: el ranking se decide por raw (evangelismo, 7 preguntas, va 1º)',
  rTwos.ranked[0].id === 'evangelismo');
check('todo en 2: pastor (6 preguntas) va 2º',
  rTwos.ranked[1].id === 'pastor');

// --- Score engine: empate real (% y raw idénticos) -> desempate por orden fijo
// "dar" y "fe" tienen ambos questionCount=5. Si ambos responden todo en 4,
// ambos quedan con raw=20 y %=80 EXACTOS -> empate real de verdad.
// gifts.js los tiene en orden [..., dar, fe, ...] -> dar debe ir antes que fe.
const realTie = {};
for (const s of situations) {
  if (s.giftId === 'dar' || s.giftId === 'fe') realTie[s.id] = 4;
  else realTie[s.id] = 1; // el resto bien abajo, para no interferir
}
const rRealTie = runFullCalculation(realTie);
const darEntry = rRealTie.ranked.find((g) => g.id === 'dar');
const feEntry = rRealTie.ranked.find((g) => g.id === 'fe');
check('empate real dar/fe: mismo raw y %', darEntry.raw === feEntry.raw && darEntry.percentage === feEntry.percentage);
check('empate real dar/fe: "dar" queda antes que "fe" (orden fijo de gifts[])',
  darEntry.rank < feEntry.rank);

// --- Score engine: parcial (no todas respondidas) ---------------------------
const partial = {};
for (const s of situations.slice(0, 40)) partial[s.id] = 5;
check('countAnswered(parcial) === 40', countAnswered(partial) === 40);
check('isTestComplete(parcial) === false', isTestComplete(partial) === false);
const rPartial = runFullCalculation(partial);
check('parcial: sigue calculando (no explota) aunque complete=false', rPartial.complete === false && rPartial.ranked.length === 15);

// --- Reproducibilidad: mismo input -> mismo output exacto -------------------
const sample = {};
situations.forEach((s, i) => { sample[s.id] = (i % 5) + 1; });
const run1 = JSON.stringify(runFullCalculation(sample));
const run2 = JSON.stringify(runFullCalculation(sample));
check('runFullCalculation es determinista (mismo input -> mismo output)', run1 === run2);

console.log('');
console.log(failures === 0 ? `TODO OK (0 fallas)` : `${failures} FALLAS`);
process.exit(failures === 0 ? 0 : 1);
