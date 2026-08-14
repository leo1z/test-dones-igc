# Estado del Proyecto: Dones IGC (v3)
Fecha de última actualización: 2026-08-14

## <session>
*   **Sesión Activa:** Transformación UX/UI V8 completada con éxito.
*   **Meta Alcanzada:**
    1. **Escala Base 3:** Escala de píldoras simplificada a 3 opciones (*Rara vez*, *A veces*, *Con frecuencia*) eliminando las alertas de sesgo neutro y recalibrando `gifts.js` y `score-engine.js`.
    2. **Onboarding Inicial Pre-Home:** Modal de bienvenida que explica la gracia y el Espíritu Santo (con enlace pastoral a `https://igcteg.org/grupos/`), capturando asistencia a Grupo de Crecimiento (Sí/No) y Zona/Ciudad de Honduras.
    3. **Home Reorganizado & CTA YouTube:** Botones ordenados (`Aprender` primero, `Descubrir` segundo), subtítulo *"Otro de los regalos de la Gracia de Dios"*, ilustración principal agrandada, créditos oficiales (*Creado por Iglesia Gran Comisión Tegucigalpa* y *Revisado por Pastor Gustavo Zepeda*), y tarjeta interactiva **"Conoce sobre los Dones Espirituales"** con enlace activo a YouTube (`https://www.youtube.com/watch?v=SnUkqFxukyk&t=180s`) y episodios 2 y 3 etiquetados como *Pendiente*.
    4. **Auditoría UI/UX y Sistema de Diseño:**
       - **Escala de 3 Píldoras:** Cada píldora muestra ahora de forma vertical tanto el número (`1`, `2`, `3`) como su etiqueta textual explícita (`Rara vez`, `A veces`, `Con frecuencia`), resolviendo cualquier ambigüedad visual.
       - **Header & Logo IGC:** Ampliado y resaltado a `64px` de alto con sombras suaves y contenedor adaptativo.
       - **Botón "← Inicio":** Rediseñado como píldora blanca flotante elevada (`#nav-btn-back`) con sombra e interactividad hover responsiva.
    5. **Resultados Igualitarios Top 3 & Eliminación de Compartir:** Tarjetas primarias paralelas de igual jerarquía para los 3 dones principales; se removieron por completo todas las opciones de compartir historias/canvas.
    6. **Encuesta de Evaluación de 3 Preguntas:** Modal final de retroalimentación (Claridad 1-5★, Precisión percibida, Comentarios abiertos) almacenados en Supabase.
    7. **Modal de Cierre "Pon en práctica tus dones":** Recomendación pastoral con botón directo a `https://igcteg.org/grupos/` para usuarios que no asisten a un grupo de crecimiento.
    8. **Glosario Filtrado por Nombre:** Buscador exclusivo por nombre del don y banner persistente con los 3 Dones Principales detectados si el usuario completó el test.
    9. **Panel Admin Independiente (`admin.html`):** Página web protegida por contraseña (`igc2026`) que consulta en tiempo real desde Supabase: estadísticas por fecha/hora, asistencia a grupos, zonas de Honduras, promedios de claridad, percepción de precisión, dones más frecuentes y tabla de comentarios abiertos.
</session>

## Decisiones Confirmadas y Aplicadas
*   [x] Dos tests **completamente independientes** (`Dones_Original` y `Dones_IGC`), sin código ni datos compartidos.
*   [x] Escala de 3 píldoras horizontales sin avisos de sesgo.
*   [x] Onboarding inicial de 2 pasos antes de acceder al Home.
*   [x] Reordenamiento de botones de bienvenida (`Aprender` destacado en azul primario, `Descubrir` en navy).
*   [x] CTA interactivo para la serie de predicas sobre Dones en YouTube.
*   [x] Franja constante de aprendizaje en los banners del test con slideover de consulta rápida.
*   [x] Tarjetas de Top 3 en igualdad visual sin botones de compartir historias.
*   [x] Encuesta de 3 preguntas de evaluación guardada en Supabase.
*   [x] Panel de administración independiente (`admin.html`) con contraseña y filtros por fecha.
*   [x] Migración de base de datos `20260814000000_update_dones_igc_onboarding_and_feedback.sql`.

## Hitos Completados
*   [x] Fase 0: Fundación — Estructura del repositorio e infraestructura inicial.
*   [x] Fase 1 a 12: Desarrollo inicial, responsive design, canvas share y bento layout.
*   [x] Fase 13: Transformación Integral (v3) — Escala base 3, Onboarding Inicial (Evangelio + Zona), Reordenamiento de Home, CTA YouTube, Disclaimer Cálido, Top 3 Igualitario, Encuesta de Evaluación 3 Preguntas y Panel Admin Protegido (`admin.html`).

## Estado Técnico de Componentes
*   `Dones_IGC/index.html` — Estructura de la SPA con onboarding pre-home, 3 píldoras, top 3 igualitario, encuestas y footer limpio.
*   `Dones_IGC/admin.html` — Panel de administración independiente protegido con clave para métricas de Supabase.
*   `Dones_IGC/src/css/styles.css` — Estilos de píldoras base 3, Top 3 igualitario, modales y panel admin.
*   `Dones_IGC/src/data/situations.js` — 76 situaciones canónicas.
*   `Dones_IGC/src/data/gifts.js` — 15 dones con `maxRawScore` recalibrado para base 3 y resúmenes de 1-2 frases.
*   `Dones_IGC/src/js/app.js` — Orquestación de onboarding, wizard 3-píldoras, modales de evaluación, slideover de dones y Supabase.
*   `Dones_IGC/src/js/score-engine.js` — Motor de cálculo recalibrado para escala 1..3.
*   `Dones_IGC/src/js/supabase-client.js` — Funciones de envío de resultados y lectura para el Panel Admin con filtros por fecha.
*   `supabase/migrations/20260814000000_update_dones_igc_onboarding_and_feedback.sql` — Campos de onboarding demográfico y evaluación.
