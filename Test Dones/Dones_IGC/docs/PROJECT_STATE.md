# Estado del Proyecto: Dones IGC (v3)
# Estado del Proyecto: Dones IGC (v3)
Fecha de última actualización: 2026-08-17

## <session>
*   **Sesión Activa:** Revisión de textos oficiales, auditoría del motor de cálculo de 3 escalas, limpieza de base de datos e higienización documental completada.
*   **Metas Alcanzadas:**
    1. **Revisión de Textos Oficiales:** Se verificó y sincronizó el documento maestro [`docs/TEXTOS_OFICIALES_DONES_IGC.md`](file:///c:/Users/Leo%20Borjas/Projects/igc/Test%20Dones/Dones_IGC/docs/TEXTOS_OFICIALES_DONES_IGC.md) con todas las situaciones, copys pastorales, modales y glosario de dones.
    2. **Auditoría de Motor de Cálculo (Escala de 3):** Se verificó que `score-engine.js`, `gifts.js` y `situations.js` funcionen en escala de 3 sutil (1: *Rara vez*, 2: *En ocasiones*, 3: *Con frecuencia*), con `maxRawScore = questionCount × 3` por don (100% exacto) y presentación de resultados en 3 tarjetas primarias de igual jerarquía (`.top3-equal-card`).
    3. **Limpieza de Datos de Prueba en Supabase:** Se ejecutó la migración SQL `20260817000000_truncate_test_results.sql`, vaciando la tabla `dones_igc.results` (0 registros) y otorgando permisos de `SELECT` y `DELETE` para el Panel Admin.
    4. **Consolidación de Documentación:** Se depuró la carpeta `docs/`, conservando únicamente la documentación activa necesaria (`PROJECT_STATE.md`, `TEXTOS_OFICIALES_DONES_IGC.md`, `SCORE_ENGINE.md`, `CONTENIDO.md`, `DESIGN_SYSTEM_V3.md`) y trasladando borradores secundarios a `docs/archive/`.
</session>

## Decisiones Confirmadas y Aplicadas
*   [x] Dos tests **completamente independientes** (`Dones_Original` y `Dones_IGC`), sin código ni datos compartidos.
*   [x] Escala de 3 píldoras horizontales (1: Rara vez, 2: A veces, 3: Con frecuencia).
*   [x] Motor de cálculo recalibrado para escala 1..3 (`maxRawScore = questionCount × 3`).
*   [x] Vaciado / Truncate de registros de prueba en Supabase (`dones_igc.results`) ejecutado exitosamente.
*   [x] Permisos de lectura (`SELECT`) y eliminación (`DELETE`) concedidos para el Panel Admin (`admin.html`).
*   [x] Onboarding inicial de 2 pasos antes de acceder al Home.
*   [x] Tarjetas de Top 3 en igualdad visual.
*   [x] Encuesta de 3 preguntas de evaluación guardada en Supabase.
*   [x] Panel de administración independiente (`admin.html`) protegido con clave (`igc2026`).
*   [x] Migraciones de BD aplicadas: `20260814000000_update_dones_igc_onboarding_and_feedback.sql` y `20260817000000_truncate_test_results.sql`.

## Estado Técnico de Componentes
*   `Dones_IGC/index.html` — SPA con onboarding pre-home, 3 píldoras, top 3 igualitario y glosario.
*   `Dones_IGC/admin.html` — Panel de administración independiente protegido con clave para métricas de Supabase.
*   `Dones_IGC/src/css/styles.css` — Estilos de píldoras base 3, Top 3 igualitario, modales y panel admin.
*   `Dones_IGC/src/data/situations.js` — 76 situaciones canónicas.
*   `Dones_IGC/src/data/gifts.js` — 15 dones con `maxRawScore = questionCount × 3`.
*   `Dones_IGC/src/js/score-engine.js` — Motor de cálculo para escala 1..3.
*   `Dones_IGC/src/js/supabase-client.js` — Integración Supabase con lectura/escritura para la app y el Panel Admin.
*   `supabase/migrations/20260817000000_truncate_test_results.sql` — Migración SQL de vaciado e higienización de permisos.
