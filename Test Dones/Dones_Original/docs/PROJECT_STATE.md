# Estado del Proyecto: Test de Dones Espirituales - IGC Tegucigalpa (v1 "Dones_Original")
Fecha de última actualización: 2026-08-10

## <session>
*   **Sesión Activa:** Reorganización del repositorio en `Test Dones/` para dar paso a una segunda versión ("Dones_IGC").
*   **Meta de Hoy:** Mover este proyecto (antes en la raíz del repo) a `Test Dones/Dones_Original/` sin romper rutas relativas ni historial de git, y dejar preparados los documentos de referencia para construir `Dones_IGC`.
*   **Estado:** MVP funcional y estable. Reorganización de carpetas completada.
*   **Siguiente Paso:** Definir con el usuario el plan de `Dones_IGC` (preguntas, dones/categorías, UI/UX) — ver `../Dones_IGC/docs/BRIEF.md`.
</session>

## Hitos Completados
*   [x] Fase 1: Setup del Entorno y Documentación de Control (Git, GitHub, Vercel, ROADMAP, ARCHITECTURE, PROJECT_STATE).
*   [x] Fase 2: Sistema de Diseño (Doodle & Bento, Space Grotesk + Outfit).
*   [x] Fase 3: Motor de cálculo (`test-engine.js`) y catálogos de datos (`questions.js`, `gifts-data.js`).
*   [x] Fase 4: Wizard interactivo de 128 preguntas, resultados Bento con Top 3, glosario, modal de detalle.
*   [x] Ilustraciones doodle reales integradas por don (`src/assets/gifts/*.svg`), acento de marca en azul (#2F6BBD).
*   [x] Reorganización: proyecto movido de la raíz del repo a `Test Dones/Dones_Original/` para convivir con futuras versiones.

## Estado Técnico de Componentes
*   `index.html`, `src/css/styles.css`, `src/js/*`: completos y funcionales.
*   Persistencia local (`localStorage`) + botón de Reset: implementado.
*   Puente móvil (Webview `postMessage`): implementado, ver `docs/ARCHITECTURE.md`.
*   Pendiente (fuera de alcance de esta versión): cuentas/Supabase, automatización n8n — ver `docs/ROADMAP.md`.

## Nota de Despliegue
El proyecto ya no vive en la raíz del repositorio. Si el proyecto de
Vercel (`igc`) tiene el **Root Directory** apuntando a la raíz, hay que
actualizarlo en el dashboard de Vercel a `Test Dones/Dones_Original`
para que el próximo deploy no falle.
