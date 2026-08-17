# Brief: Dones IGC (v2)

Estado: **Fase 1 (UX) cerrada. Fase 3 (Score Engine) cerrada y confirmada**
— ver `SCORE_ENGINE.md`. Fase 2 (UI) sin iniciar; el usuario va a manejar
esa parte con Gemini para el frontend.
Ver `REFERENCE.md` (sistema reutilizable) y `CONTENIDO.md` (preguntas y
descripciones ya transcritas del material del usuario).

## Decisiones ya tomadas por el usuario

- [x] **Contenido:** preguntas y descripciones en `CONTENIDO.md` (15 dones,
      76 preguntas, cantidad desigual por don — 4 a 7).
- [x] **Independencia total:** `Dones_Original` y `Dones_IGC` son dos tests
      completamente independientes (sin selector cruzado, sin código
      compartido en runtime).
- [x] **Base de datos:** este test usa su **propio schema en Supabase**
      (separado del de `Dones_Original`, si es que este último llega a
      tener uno).
- [x] **Deploy:** proyecto de Vercel propio, nombre **`igc-dones`**
      (distinto del proyecto `igc` de `Dones_Original`).

## Decisiones de la entrevista (2026-08-10)

- [x] **Resultados:** Bento + Top 3, mismo patrón que `Dones_Original`
      (tarjetas Top 3, gráfico de barras, listado completo).
- [x] **Puntaje:** normalizado a porcentaje (0-100%) por don, para que
      los 15 dones sean comparables entre sí pese a tener distinta
      cantidad de preguntas (20-35 pts máx. crudo → todos a 0-100%).
- [ ] **Estilo visual:** dirección completamente nueva — el usuario la va
      a describir en Fase 2 (UI). **Pendiente.**

## Decisiones de Fase 1 — UX (2026-08-10)

- [x] Home con 3 acciones: Hacer el test / Ver resultados + Reset /
      Aprender de los Dones.
- [x] Situaciones (no preguntas directas) con escala de identificación
      1-5 ("No me identifico" → "Totalmente / Así soy yo"), aviso de
      sesgo en el valor medio (igual que v1).
- [x] 76 situaciones repartidas en **10 escenas** mixed (no agrupadas por
      don), 7-8 situaciones por escena — mix detallado y verificado (sin
      dones repetidos por escena) en `MIX_ESCENAS.md`.
- [x] Resultados: Bento Top 3 con 3 tamaños fijos por posición + listado
      de % del resto.
- [x] Compartir: 3 variantes en formato Story vertical (1080×1920),
      incluida una nueva card viral "Este es mi Don, descubrí el tuyo"
      (reemplaza la idea original de "Top 3 + más bajos").
- [ ] Consejos/ejemplos de "Aprender de los Dones": los redacto yo en
      borrador (no bloquea el resto de la fase), pendiente de revisión.

Fase 1 quedó **cerrada**: usuario aprobó `MIX_ESCENAS.md` (situaciones +
ilustración sugerida por escena).

## Decisiones de Fase 3 — Score Engine (2026-08-11)

- [x] Motor de cálculo puro (sin DOM), datos canónicos generados desde
      `MIX_ESCENAS.md`/`CONTENIDO.md`: `src/data/situations.js` (76),
      `src/data/gifts.js` (15), `src/js/score-engine.js`.
- [x] Suite de pruebas `score-engine.test.mjs` — 18 checks, 0 fallas
      (integridad de datos, casos límite, desempate, reproducibilidad).
- [x] Contrato completo documentado en `SCORE_ENGINE.md` para que Gemini
      construya el frontend sobre esto sin reinterpretar el cálculo.
- [x] 3 decisiones técnicas (redondeo de %, regla de desempate, nombres
      de llaves de `localStorage`) — **confirmadas** en `SCORE_ENGINE.md` §7.

Fase 3 quedó **cerrada**.

## Siguiente paso

Handoff a Gemini (`docs/` + `src/data/` + `src/js/score-engine.js`) para
construir el frontend completo, incluyendo la Fase 2 (UI) que aún no se
ha definido.
