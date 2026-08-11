# Score Engine — Dones IGC (v2)

Estado: **cerrado y confirmado** (`npm run test:score-engine` → 0 fallas).
Este documento es el contrato técnico para quien construya el frontend
(Gemini) — define exactamente cómo se calcula el resultado, qué datos
consume, y qué debe respetar sin reinterpretar.

## 1. Dónde está cada cosa

```
Dones_IGC/
├── package.json                  (type: module, script de test)
└── src/
    ├── data/
    │   ├── situations.js         76 situaciones (fuente: docs/MIX_ESCENAS.md)
    │   └── gifts.js               15 dones (fuente: docs/CONTENIDO.md)
    └── js/
        ├── score-engine.js        motor de cálculo (puro, sin DOM)
        └── score-engine.test.mjs  suite de pruebas (18 checks, 0 fallas)
```

`score-engine.js` **no tiene dependencias del navegador** (sin `window`,
`document`, `localStorage`) — es portable a cualquier framework/stack,
incluyendo si Gemini decide reescribir el frontend en React, Vue, o lo
que sea. Se puede copiar tal cual, o reimplementar siguiendo este
contrato al pie de la letra — los tests de este repo son la forma de
verificar que una reimplementación produce los mismos resultados.

## 2. Contrato de datos de entrada

Un test respondido es un objeto plano `answersMap`:

```js
{ "1": 4, "2": 2, "3": 5, ..., "76": 3 }
```

- Llave: `situationId` (1-76, ver `situations.js`).
- Valor: entero 1-5 (escala de identificación, ver `docs/UX_PLAN.md` §2).
  1=No me identifico, 2=Poco, 3=Algo, 4=Bastante, 5=Totalmente.
- El valor 3 ("Algo") **no tiene ningún efecto especial en el cálculo** —
  el aviso visual de sesgo es puramente de UI, el motor lo trata como
  cualquier otro valor 1-5.
- Situaciones sin responder (llave ausente o valor falsy) cuentan como 0
  — el motor es defensivo (`Number(answersMap[id]) || 0`), no explota con
  un `answersMap` incompleto.

## 3. Algoritmo

Para cada uno de los 15 dones:

1. **Puntaje crudo** (`raw`): suma de 1-5 de todas sus situaciones
   respondidas. Rango posible: `questionCount` (mín, todo en 1) a
   `questionCount × 5` (máx, todo en 5) — varía por don porque los 15
   dones **no tienen la misma cantidad de situaciones** (4 a 7 c/u, ver
   `gifts.js` → `questionCount`/`maxRawScore`).
2. **Porcentaje** (`percentage`): `round(raw / maxRawScore × 100)`,
   entero 0-100. Normaliza cada don contra su propio máximo — así los 15
   son comparables entre sí pese a tener distinta cantidad de preguntas
   (decisión tomada en Fase 0, ver `PROJECT_STATE.md`).
3. **Ranking**: los 15 dones ordenados de mayor a menor `percentage`.
   **Desempate** (2 niveles, 100% determinista — nunca aleatorio):
   1. Mayor `raw` (más preciso que el `%` ya redondeado).
   2. Si el `raw` también es idéntico: el **orden fijo** en que aparece
      el don en `data/gifts.js` (ese arreglo es, a la vez, catálogo de
      contenido y criterio de desempate — no reordenar `gifts.js` sin
      saber que afecta esto).
4. **Top 3**: los primeros 3 del ranking, ya con `rank` 1/2/3. El
   *tamaño* de sus cards (grande/mediana/chica) es una decisión de UI
   basada en `rank`, no de este motor — ver `UX_PLAN.md` §3.
5. **`complete`**: `true` solo si las 76 situaciones tienen respuesta.
   La pantalla de resultados no debería ser accesible si `complete` es
   `false` (mismo patrón que `Dones_Original`: no se puede saltar al
   resultado con un test a medias).

### Salida de `runFullCalculation(answersMap)`

```js
{
  raw: { evangelismo: 24, dar: 18, ... },        // 15 llaves, puntaje crudo
  percentage: { evangelismo: 69, dar: 72, ... }, // 15 llaves, 0-100
  ranked: [
    { id, name, description, questionCount, maxRawScore, minRawScore,
      tips, examples, illustration, raw, percentage, rank },
    // ... 15 items, ordenados
  ],
  top3: [ ranked[0], ranked[1], ranked[2] ],
  lowest: ranked[14],   // el de menor %, por si se necesita
  complete: true | false,
}
```

Cada item de `ranked`/`top3` ya trae **todo** el contenido del don
(nombre, descripción, etc. de `gifts.js`) fusionado con su puntaje — el
frontend no necesita volver a cruzar datos.

## 4. Contrato de persistencia local (`localStorage`)

Mismo patrón que `Dones_Original` (autoguardado + Reset, ver
`REFERENCE.md` §1 y §3), pero con **llaves propias** para no chocar si
algún día ambas versiones viven bajo el mismo dominio:

```js
const STORAGE_ANSWERS_KEY = 'dones_igc_answers'; // { "1": 4, "2": 2, ... } — autoguardado por respuesta
const STORAGE_RESULT_KEY  = 'dones_igc_result';  // runFullCalculation(...) + completedAt, guardado 1 vez al completar
```

- **Reset** = `localStorage.removeItem` de ambas llaves.
- Al cargar la app: si `dones_igc_result` existe, saltar directo a
  resultados (no repetir el test).
- Guardar en `try/catch` silencioso — el navegador puede bloquear
  `localStorage` (modo privado, webview restringido).

## 5. Qué NO hace este motor (fuera de su alcance)

- No genera las imágenes para compartir (Top 3 / destacado / card viral)
  — eso consume la salida de `runFullCalculation` pero es lógica de
  render, no de cálculo.
- No persiste a Supabase — eso es una fase de infraestructura aparte
  (pendiente, ver `ROADMAP.md`). Cuando se implemente, el `raw` +
  `percentage` + `ranked` de este motor son exactamente lo que se envía.
- No decide el tamaño de las cards del Top 3 (eso es `rank`-based en la
  capa de UI).
- No sabe nada de escenas para efectos de *cálculo* — `sceneId` en
  `situations.js` es solo para agrupar la presentación (10 pantallas),
  no afecta el puntaje.

## 6. Testing

`npm run test:score-engine` corre `src/js/score-engine.test.mjs` — 18
checks cubriendo:

- Integridad de datos: 76 situaciones únicas (id 1-76 sin huecos), cada
  una con un `giftId` válido, `questionCount`/`maxRawScore` de cada don
  coincide con sus situaciones reales, ninguna escena repite un don.
- Casos límite: respuestas vacías (`complete=false`, todo en 0%), todo
  en 1 (mínimo), todo en 5 (100% en los 15 dones), respuestas parciales
  (el motor no explota, solo `complete=false`).
- Desempate: caso donde el `%` empata pero el `raw` decide (todo en 3 →
  Evangelismo con 7 preguntas gana sobre Pastor con 6, etc.), y caso de
  **empate real** (mismo `raw` y `%` exactos) donde decide el orden fijo
  de `gifts.js`.
- Reproducibilidad: mismo `answersMap` produce siempre el mismo output
  (sin aleatoriedad).

Si Gemini reimplementa el motor en otro lenguaje/framework, correr los
mismos casos de `score-engine.test.mjs` contra esa reimplementación es
la forma de verificar que el cálculo es idéntico.

## 7. Decisiones técnicas — CONFIRMADAS (2026-08-11)

- [x] Redondeo de `%` a entero (0 decimales).
- [x] Desempate: raw score → orden fijo de `gifts.js`.
- [x] Llaves de `localStorage`: `dones_igc_answers` / `dones_igc_result`.

## 8. Pendiente fuera del Score Engine (no bloquea esta fase)

- `tips` y `examples` en `gifts.js` siguen en `null` — pendiente el
  borrador que propuse en `BRIEF.md` (Fase 1).
- `illustration` en `gifts.js` sigue en `null` — se define en Fase 2
  (UI).
