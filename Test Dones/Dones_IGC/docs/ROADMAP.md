# Hoja de Ruta (dinámica): Dones IGC (v2)

Roadmap vivo — se actualiza al cierre de cada fase, no es un plan fijo
escrito de una sola vez. Ver `PROJECT_STATE.md` para la fase activa.

## Metodología de trabajo (por fase)

Cada fase de este proyecto sigue el mismo ciclo:

1. **Explicación:** el usuario explica qué quiere para esa fase.
2. **Entrevista:** Claude pregunta lo que necesite tener claro antes de
   planear (decisiones que no se pueden derivar del código o los docs).
3. **Plan + docs de referencia:** se define el plan de la fase y se deja
   documentado en `docs/` (referencia técnica, decisiones, contenido).
4. **Construcción + Testing:** se implementa y se prueba antes de dar la
   fase por cerrada.
5. **Siguiente fase:** se abre la siguiente fase repitiendo el ciclo.

No se avanza una fase sin haber cerrado la anterior con su testing.

## Fases

### Fase 0 — Fundacional (completada)
- [x] Reorganización del repo (`Test Dones/Dones_Original` + `Dones_IGC`).
- [x] Contenido transcrito: 15 dones, 76 preguntas, descripciones
      (`CONTENIDO.md`).
- [x] Decisiones base tomadas: resultados en formato Bento + Top 3 (igual
      que v1), puntaje normalizado a % por don (ver `PROJECT_STATE.md`).
- [x] Requerimientos de infraestructura confirmados: schema propio en
      Supabase, proyecto Vercel propio (`igc-dones`), test totalmente
      independiente de `Dones_Original`.

### Fase 1 — UX (cerrada)
Define el *comportamiento* e interacción del test: situaciones (no
preguntas directas) con escala de identificación, agrupadas en 10 escenas
ilustradas mixed (no por don), home con 3 acciones, resultados Bento
Top 3 + compartir en formato Story. Sin definir todavía look visual (eso
es Fase 2).
- **Estado:** cerrada. Plan en `UX_PLAN.md`, mix de las 76 situaciones
  (reescritas + ilustración sugerida por escena) en `MIX_ESCENAS.md`,
  ambos aprobados por el usuario.

### Fase 3 — Score Engine (cerrada)
Motor de cálculo para 15 dones con cantidad desigual de preguntas
(4-7 por don), normalizado a porcentaje (0-100%) por don. Se adelantó
antes de Fase 2 (UI) porque el usuario lo necesita como base estable
para el handoff a Gemini (quien construye el frontend).
- **Estado:** cerrada. `src/data/situations.js`, `src/data/gifts.js`,
  `src/js/score-engine.js` y su suite de pruebas
  (`score-engine.test.mjs`, 18 checks, 0 fallas) completos. Contrato
  documentado en `SCORE_ENGINE.md`, con las 3 decisiones técnicas
  (redondeo, desempate, llaves de localStorage) confirmadas por el
  usuario. **Lista para handoff a Gemini.**

### Fase 2 — UI (pendiente)
Define el *look* visual: estilo, paleta, tipografía, componentes.
Dirección completamente nueva (no hereda el "Doodle & Bento" de
`Dones_Original`).
- **Estado:** no iniciada. Puede terminar de definirse directamente con
  Gemini durante la construcción del frontend, usando `SCORE_ENGINE.md`
  y `UX_PLAN.md` como contrato de lo que ya está decidido.

### Fases siguientes (a definir)
Integración de contenido `tips`/`examples` en `gifts.js` (borrador
pendiente, ver `BRIEF.md`), schema de Supabase, deploy a `igc-dones` en
Vercel, testing end-to-end. Se van a ir agregando aquí a medida que se
acuerden con el mismo ciclo de trabajo. No se asume su alcance de
antemano.
