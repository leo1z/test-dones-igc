# Estado del Proyecto: Dones IGC (v2)
Fecha de última actualización: 2026-08-11

## <session>
*   **Sesión Activa:** Corrección de mobile-first (Claude) tras handoff de Gemini. Backend (Supabase/Auth/Vercel) aún no iniciado.
*   **Meta de Hoy:** El usuario reportó que el diseño de Gemini no era mobile-first. Verificado con capturas reales a 320-375px y medición de elementos: 3 problemas objetivos confirmados y corregidos (ver abajo). Backend queda para la siguiente sesión, a petición del usuario ("primero UI móvil, luego backend").
*   **Estado:** Fases 0-5 (contenido, UX, Score Engine, integración SPA, canvas share) siguen en pie sin cambios. La Fase 6 (QA/Optimización Móvil) que Gemini dio por cerrada **tenía bugs reales de mobile-first no detectados** — corregidos en esta sesión. Backend sin iniciar.
*   **Siguiente Paso:** Fase 7 — Integración Supabase (schema propio) + Auth + despliegue en Vercel (`igc-dones`).

### Corrección de mobile-first (2026-08-11, por Claude)
Verificado con Playwright a 320px/375px (no solo confiando en el doc de Gemini). 3 problemas objetivos encontrados y corregidos:
1.  **Objetivos táctiles de la escala de respuesta:** medían 27×10px (Gemini los redujo a propósito — `height: 10px` con comentario "píldora delgada y elegante" — para evitar overflow horizontal). Corregido a 44px+ de alto, ancho automático por `flex`. Se eliminaron las etiquetas "No me Identifico"/"Así Soy Yo" repetidas en cada una de las 8 preguntas por escena (ruido visual que además robaba el espacio horizontal que necesitaban las píldoras) y se reemplazaron por una sola leyenda (`.scale-legend`) al inicio de cada escena.
2.  **Barra de navegación del test rota:** botón Atrás + texto de aviso + botón Siguiente vivían en un mismo `flex-row` con `width:100%` en ambos botones, sin wrap — se aplastaban entre sí en pantallas angostas. Corregido: el aviso ahora es su propia fila centrada arriba, y los botones son una fila de 2 columnas iguales debajo.
3.  **Los "3 tamaños fijos por posición" del Top 3 (decisión de UX_PLAN.md) solo estaban implementados en el media query de escritorio** (`min-width:768px`, vía `grid-row: span 2`) — en mobile (la experiencia principal) las 3 tarjetas se veían idénticas. Corregido: la jerarquía de tamaño (ilustración, tipografía, padding, borde) ahora vive en los estilos base (mobile), y el grid de escritorio se suma encima sin reemplazarla.

Archivos tocados: `index.html`, `src/css/styles.css`, `src/js/app.js`. `src/js/score-engine.js` y `src/data/*` **no se tocaron** (motor y datos siguen siendo la fuente de verdad de `SCORE_ENGINE.md`, tests en 0 fallas).

**Nota para reconciliar en la fase de Supabase:** el formato que `app.js` guarda en `localStorage` (`{ version, completedAt, answers, scores, topGifts }`) no coincide con el contrato documentado en `SCORE_ENGINE.md` §4 (`{ raw, percentage, ranked, top3, lowest, complete }`). Es autoconsistente (no rompe nada hoy) pero hay que decidir cuál es la forma canónica antes de diseñar las columnas de Supabase — el formato de Gemini, de hecho, ya mapea bien al schema sugerido en `Dones_Original/docs/ARCHITECTURE.md` (`answers`, `scores`, `top_gifts`).
</session>

## Decisiones Confirmadas y Aplicadas
*   [x] Dos tests **completamente independientes** (`Dones_Original` y `Dones_IGC`), sin código ni datos compartidos.
*   [x] Diseño responsivo minimalista y premium alineado con las referencias oficiales (`Ref1.png` para Home, `Ref2.png` para el Test, `Ref3.png` para Detalles/Modal).
*   [x] Paleta de colores oficial aplicada: `#336cdd` (Primario), `#f7eee5` (Fondo crema de las pantallas), `#0f0f31` (Navy para texto y botones), y `#fffaf7` (Alabastro para tarjetas).
*   [x] Escala de píldoras horizontales de Ref2 adaptada a móviles (ancho de 160px máximo para el grupo de píldoras y 70px para etiquetas alineadas con wrap natural), previniendo desbordamiento horizontal en anchos pequeños de hasta 320px.
*   [x] Navegación de cabecera simplificada para móviles. En el Home no hay navegación (solo el logotipo), y en pantallas internas se muestra un único botón dinámico de `"Volver"` o `"Inicio"`.
*   [x] Catálogo de dones en `gifts.js` completado con consejos (`tips`), ejemplos (`examples`) y rutas a ilustraciones oficiales locales.
*   [x] Compartir Historias: Desarrolladas las 3 variantes de canvas (Bento Top 3, Don Destacado e Invitación Viral) en formato 1080×1920 y descargables en caliente.

## Hitos Completados
*   [x] Fase 0: Fundación — Estructura del repositorio e infraestructura inicial.
*   [x] Fase 1: UX — Flujo del test y pantallas documentadas en `UX_PLAN.md` e integradas.
*   [x] Fase 2: UI — Implementado diseño responsivo y premium en `styles.css` basado en `Ref1`, `Ref2` y `Ref3`.
*   [x] Fase 3: Score Engine — Lógica de cálculo en `score-engine.js` y datos en `src/data/`.
*   [x] Fase 4: Integración SPA — Lógica de app.js con localStorage, wizard de escenas y glosario.
*   [x] Fase 5: Canvas Share — Lógica de canvas en `canvas-share.js` para descarga de historias.
*   [x] Fase 6: QA/Optimización Móvil — Ejecución de suite de tests y optimización responsiva fina (cero scrollbar horizontal).

## Estado Técnico de Componentes
*   `Dones_IGC/index.html` — Contenedor estructurado de la SPA, header minimalista, secciones dinámicas y modal.
*   `Dones_IGC/src/css/styles.css` — Estilos premium con fuente Elms Sans, paleta oficial, Bento Grid y escala de píldoras móvil.
*   `Dones_IGC/src/data/situations.js` — 76 situaciones canónicas.
*   `Dones_IGC/src/data/gifts.js` — 15 dones con sus consejos, ejemplos e ilustraciones finales.
*   `Dones_IGC/src/js/app.js` — Control del wizard, auto-scroll, modals, glosario y navegación.
*   `Dones_IGC/src/js/score-engine.js` — Motor de cálculo.
*   `Dones_IGC/src/js/canvas-share.js` — Renderizado en Canvas para descarga de historias (1080×1920).
*   `Dones_IGC/src/js/score-engine.test.mjs` — Suite de 18 checks (`npm run test:score-engine` -> PASS, 0 fallas).
