# Estado del Proyecto: Dones IGC (v2)
Fecha de última actualización: 2026-08-11

## <session>
*   **Sesión Activa:** Fase 3 (Score Engine) — **cerrada**. Listo para handoff a Gemini.
*   **Meta de Hoy:** Formalizar el motor de cálculo (`src/js/score-engine.js`) con datos canónicos (`src/data/situations.js`, `src/data/gifts.js`) generados desde `MIX_ESCENAS.md`/`CONTENIDO.md` ya aprobados, y una suite de pruebas (`score-engine.test.mjs`) que valida integridad de datos, casos límite y desempates. Documentado el contrato completo en `SCORE_ENGINE.md`, y el usuario confirmó las 3 decisiones técnicas pendientes (redondeo, desempate, llaves de localStorage).
*   **Estado:** Fase 1 (UX) cerrada. Fase 3 (Score Engine) cerrada: código funcionando, `npm run test:score-engine` → 18 checks, 0 fallas, sin puntos pendientes. Fase 2 (UI) aún no iniciada.
*   **Siguiente Paso:** Handoff a Gemini con `docs/` + `src/data/` + `src/js/score-engine.js` como base, para construir el frontend completo (incluye definir Fase 2 — UI con el estilo visual que el usuario aporte).
</session>

## Decisiones Confirmadas
*   [x] Dos tests **completamente independientes** (`Dones_Original` y `Dones_IGC`), sin código ni datos compartidos en runtime.
*   [x] `Dones_IGC` usa su **propio schema en Supabase** (separado del de `Dones_Original`) — schema aún no creado, pendiente.
*   [x] `Dones_IGC` se despliega en su **propio proyecto de Vercel**, llamado `igc-dones` — proyecto aún no creado.
*   [x] Contenido: 15 dones, 76 preguntas (desigual por don, 4-7 c/u) — transcrito en `docs/CONTENIDO.md`.
*   [x] Resultados: formato **Bento + Top 3** con 3 tamaños fijos por posición, igual patrón que `Dones_Original`.
*   [x] Puntaje: **normalizado a porcentaje (0-100%)** por don — implementado y probado en `score-engine.js`.
*   [x] Estilo visual: dirección **completamente nueva**, no hereda el "Doodle & Bento" de v1 — pendiente de definir (Fase 2 — UI).
*   [x] Flujo del test (Fase 1 — UX, **cerrada**): situaciones (no preguntas directas) con escala de identificación 1-5, agrupadas en 10 escenas mixed con ilustración sugerida por escena (`MIX_ESCENAS.md`, aprobado). Home con 3 acciones (Test / Ver resultados+Reset / Aprender de los Dones). Resultados en Bento Top 3 + listado de % del resto + 3 variantes de imagen para compartir en formato Story (1080×1920), incluyendo la card viral "Este es mi Don, descubrí el tuyo".
*   [x] Score Engine (Fase 3): motor puro y portable, sin dependencias del DOM — código y contrato completo en `docs/SCORE_ENGINE.md`. Redondeo a entero, desempate por raw→orden fijo, y llaves `dones_igc_answers`/`dones_igc_result` — **confirmados por el usuario**.

## Hitos Completados
*   [x] Fase 0: Fundación — reorganización del repo, contenido transcrito, decisiones base e infraestructura confirmadas.
*   [x] Fase 1: UX — home, flujo de escenas/situaciones, resultados, compartir, todo documentado y aprobado (`UX_PLAN.md`, `MIX_ESCENAS.md`).
*   [x] Fase 3: Score Engine — datos canónicos + motor de cálculo + suite de pruebas, todo funcionando y confirmado (`SCORE_ENGINE.md`). **Lista para handoff a Gemini.**

## Estado Técnico de Componentes
*   `Dones_IGC/src/data/situations.js` — 76 situaciones canónicas (id, giftId, sceneId, text, sourceQuestion). Completo.
*   `Dones_IGC/src/data/gifts.js` — 15 dones (id, name, description, questionCount, maxRawScore). `tips`/`examples`/`illustration` en `null`, pendientes.
*   `Dones_IGC/src/js/score-engine.js` — motor de cálculo. Completo y probado.
*   `Dones_IGC/src/js/score-engine.test.mjs` — 18 checks, 0 fallas (`npm run test:score-engine`).
*   No hay todavía `index.html`, UI, ni ningún componente visual — eso es Fase 2 (UI) / trabajo de Gemini.
*   Supabase: schema no creado todavía.
*   Vercel: proyecto `igc-dones` no creado todavía.

## Documentos de referencia en `docs/`
*   `REFERENCE.md` — qué se reutiliza del sistema de `Dones_Original`.
*   `CONTENIDO.md` — las 15 dones, 76 preguntas y descripciones originales.
*   `UX_PLAN.md` — plan de Fase 1, cerrado.
*   `MIX_ESCENAS.md` — las 76 situaciones (reescritas desde las preguntas) en 10 escenas, con ilustración sugerida — aprobado.
*   `SCORE_ENGINE.md` — contrato técnico del motor de cálculo, para handoff a Gemini.
*   `BRIEF.md` — bitácora de decisiones y pendientes por fase.
*   `ROADMAP.md` — fases dinámicas y metodología de trabajo.
