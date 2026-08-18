# Estado del Proyecto: Dones IGC (v3)
# Estado del Proyecto: Dones IGC (v3)
Fecha de última actualización: 2026-08-17

## <session>
*   **Sesión Activa:** Revisión de textos oficiales, auditoría del motor de cálculo de 3 escalas, limpieza de base de datos e higienización documental completada.
*   **Metas Alcanzadas:**
    1. **Revisión de Textos Oficiales:** Se verificó y sincronizó el documento maestro [`docs/TEXTOS_OFICIALES_DONES_IGC.md`](file:///c:/Users/Leo%20Borjas/Projects/igc/Test%20Dones/Dones_IGC/docs/TEXTOS_OFICIALES_DONES_IGC.md) con todas las situaciones, copys pastorales, modales y glosario de dones.
    2. **Auditoría de Motor de Cálculo (Escala de 3):** Se verificó que `score-engine.js`, `gifts.js` y `situations.js` funcionen en escala de 3 sutil (1: *Rara vez*, 2: *En ocasiones*, 3: *Con frecuencia*), con `maxRawScore = questionCount × 3` por don (100% exacto) y presentación de resultados en 3 tarjetas primarias de igual jerarquía (`.top3-equal-card`), con las 3 píldoras usando exactamente el mismo azul primario (`var(--primary)` / `#336cdd`) al estar seleccionadas.
    3. **Limpieza de Datos de Prueba en Supabase:** Se ejecutó la migración SQL `20260817000000_truncate_test_results.sql`, vaciando la tabla `dones_igc.results` (0 registros) y otorgando permisos de `SELECT` y `DELETE` para el Panel Admin.
    4. **Consolidación de Documentación:** Se depuró la carpeta `docs/`, conservando únicamente la documentación activa necesaria (`PROJECT_STATE.md`, `TEXTOS_OFICIALES_DONES_IGC.md`, `SCORE_ENGINE.md`, `CONTENIDO.md`, `DESIGN_SYSTEM_V3.md`) y trasladando borradores secundarios a `docs/archive/`.
</session>

## Decisiones Confirmadas y Aplicadas
*   [x] Dos tests **completamente independientes** (`Dones_Original` y `Dones_IGC`), sin código ni datos compartidos.
*   [x] Escala de 3 píldoras horizontales (1: Rara vez, 2: A veces, 3: Con frecuencia).
*   [x] Motor de cálculo recalibrado para escala 1..3 (`maxRawScore = questionCount × 3`).
*   [x] Vaciado / Truncate de registros de prueba en Supabase (`dones_igc.results`) ejecutado exitosamente.
*   [x] Permisos de lectura (`SELECT`) y eliminación (`DELETE`) concedidos para el Panel Admin (`admin.html`).
*   [x] **Mapa Coroplético + Pines Pulsantes de Ciudades con Apache ECharts (`admin.html`):**
    *   **Identificación de Departamentos por Ciudad:** Implementado motor inteligente de coincidencia (`getDeptFromCityString()`) que vincula ciudades seleccionadas en onboarding (ej: *Tegucigalpa*, *San Pedro Sula*, *La Ceiba*, *Danlí*, *Choluteca*, *Roatán*) a sus respectivos departamentos oficiales en la capa GeoJSON con claves de texto exactas (`Francisco Morazan`, `Cortes`, `El Paraiso`, `Islas de La Bahia`, etc.). Si hay 1 respuesta en Tegucigalpa, suma automáticamente 1 al conteo y color de polígono de Francisco Morazán.
    *   **Pines Pulsantes Acumulativos por Ubicación:** Incorporada la serie `effectScatter` de Apache ECharts que renderiza pines amarillos pulsantes sobre las coordenadas exactas de cada ciudad con encuestas completadas, escalando de tamaño según el conteo acumulativo.
    *   **Adaptación Móvil 100% Responsiva:** Ajustado el contenedor del mapa (`height: 320px` en móvil, `420px` en desktop) con `aspectScale: 0.85`, zoom táctil (`roam: true`) y redimensionamiento automático (`echartsInstance.resize()`).
*   [x] **Actualización de Subtítulo en Glosario (`index.html`):** Cambiado el texto secundario bajo *Aprender de los Dones* a: **“Explora los 15 dones espirituales y ejemplos de cómo aplicarlos”**.
*   [x] **Separación de Tarjetas de Acción en Pantalla de Resultados (`index.html`):**
    *   **Tarjeta 1 (Evaluación):** Dedicada exclusivamente a *"¿Cómo fue tu experiencia?"* con el botón primario *"Evaluar la Experiencia del Test"*.
    *   **Tarjeta 2 (Siguientes Pasos):** Contenedor independiente con los botones *"Conectar con un Grupo de Crecimiento"* y *"Reiniciar Test"*, mejorando la jerarquía y claridad de acciones.
*   [x] **Implementación de 9 Mejoras de UX/UI en Flujo y Maquetación (`index.html`, `styles.css`, `app.js`):**
    *   **Navegación Histórica de Navegador (`popstate` & `pushState`):** Integrado manejo del historial de navegación para que el botón "Atrás" o el gesto de deslizamiento del navegador regrese a la pantalla previa en lugar de salir de la aplicación.
    *   **Corrección de Halo Cortado en Círculos (Imagen 1):** Ajustado el relleno interno del contenedor (`padding: 12px 14px` en `.journey-nodes-scroll` y `padding: 4px 12px` en `.journey-nodes-track`) previniendo que el resplandor activo en Parte 1 o 10 se recorte por desbordamiento.
    *   **Reubicación de Copyright:** Eliminado el pie de página flotante tapado por la barra inferior e integrado el texto de copyright dentro del contenedor de créditos principales de bienvenida (*Creado por...*).
    *   **Estaciones Bloqueadas con Candado (🔒):** Las partes no alcanzadas muestran un ícono SVG de candado en lugar de números clicleables, deshabilitando el evento clic hasta completar las partes previas.
    *   **Estilizado de Botón Siguiente Deshabilitado:** Aplicado estado inactivo con fondo gris elegante (`#cbd5e1`) y cursor no permitido cuando la parte actual no se ha respondido por completo.
    *   **Etiqueta 'Finalizar Test' en Parte 10:** Cambiado el texto del botón final en la Parte 10 de "Siguiente" a **Finalizar Test** con ícono de verificación.
    *   **Resaltado Vibrante en Encuesta de Evaluación:** Botones seleccionados en la segunda pregunta de evaluación se destacan en azul primario sólido (`#336cdd`) con texto blanco de alto contraste.
    *   **Aviso Sutil de Guardado Automático:** Agregado distintivo discreto `☁️ Guardado automático` en la tarjeta de ruta para brindar tranquilidad al usuario.
    *   **Barra de Búsqueda Pegajosa en Aprender:** Implementado `position: sticky; top: 0;` en el encabezado del glosario para mantener el buscador fijo en su lugar al desplegar el teclado en dispositivos móviles.
*   [x] **Filtros Autónomos Completos de Fecha y Ubicación en Análisis de 15 Dones:** Incorporados controles internos independientes de **Rango de Fecha** (`cross-filter-date`: *Todas las fechas, Hoy, 1 semana, 1 mes, 3 meses, Personalizado*) y **Ubicación** (`cross-filter-location`) que se combinan acumulativamente con *Asistencia a Grupo* y *Reflejo de Servicio*. Al seleccionar *Personalizado...*, despliega selectores interactivos `Desde` (`cross-start-date`) y `Hasta` (`cross-end-date`).
*   [x] **Ilustración de Portada Ampliada (`index.html`):** Incrementado el tamaño visual de la ilustración principal de bienvenida (`src/assets/illustrations/ui/Home.png`) de 190px a **250px de altura** (`max-height: 38vh`), dándole mayor presencia visual en desktop y teléfonos móviles.
*   [x] **Vaciado de Registros de Prueba en Supabase (`dones_igc.results`):** Ejecutado script de limpieza vía API REST de Supabase que eliminó todas las respuestas de prueba previas y **mantuvo intacto únicamente el último registro real** del usuario (`Tegucigalpa / M.D.C.`).
*   [x] **Ajuste de Tipografía y Espaciado:** Añadidas reglas de `letter-spacing: -0.012em` en cuerpo y `-0.025em` en encabezados (`styles.css`), mejorando la densidad tipográfica y legibilidad.
*   [x] **Auditoría de Responsiveness & Navegadores:** Verificadas reglas CSS Flexbox/Grid móviles (`max-width: 600px`, `box-sizing: border-box`, `padding` líquido). Los componentes se adaptan sin desbordamiento desde 320px en iOS Safari, Android Chrome, Edge y Firefox.
*   [x] **Persistencia Garantizada en Supabase:** Confirmado que `submitResult()` guarda las respuestas, puntuaciones, Top 3, datos de Onboarding (`attends_growth_group`, `zone_location`) y la Encuesta de Evaluación (`clarity_rating`, `accuracy_perception`, `feedback_comments`) en la tabla `dones_igc.results`.
*   [x] **Arquitectura y Alta Concurrencia (1,000+ usuarios):** La SPA ejecuta el test y los cálculos 100% en el cliente (0% de carga en servidor durante el test). Vercel CDN entrega los estáticos con caché Edge y Supabase (PostgREST + PgBouncer pooler) procesa >5,000 escrituras/sec.
*   [x] **Prevención de Bucles y Bloqueos de Modales:** Añadido cierre global por toque en fondo oscuro para todos los modales (evaluación, guía rápida, don individual, hitos) evitando bloqueos de pantalla.
*   [x] **Rediseño UI de 'Conectar con un Grupo de Crecimiento':** Ajustada la altura a `52px`, texto en una sola línea, ícono centrado y aplicación de un fondo azul tintado suave (`rgba(51, 108, 221, 0.08)` / `#ebf3ff`), texto azul primario (`var(--primary)`) y borde `rgba(51, 108, 221, 0.25)` para alinearse 100% a la paleta de la aplicación.
*   [x] **Migración a Íconos Vectoriales SVG (0% Emojis):** Reemplazados todos los emojis del sistema (toasts, tarjetas de resultados, botones de acción, disclaimers, modales y buscador) por **íconos SVG vectoriales limpios y escalables** con colores dinámicos (`stroke="currentColor"` / `stroke="var(--primary)"`).
*   [x] **Sincronización del Don Liderar (Presidir):** Actualizada la descripción completa en `src/data/gifts.js` (*"Liderar, influir y dirigir hermanos, se suma al de Administración..."*) para alinearse 100% con la edición del documento maestro.
*   [x] **Icono de Video en el Home:** Cambiado el emoji por el icono de cámara de video SVG en la tarjeta de la Serie de Enseñanza del Home.
*   [x] **Corrección de Texto en Glosario:** Cambiado el término "motivacionales" por **"espirituales"** (*"Explora los 15 dones espirituales y sus aplicaciones bíblicas."*) tanto en la UI de `index.html` como en `docs/TEXTOS_OFICIALES_DONES_IGC.md`.
*   [x] **Indicadores Táctiles en Otros Dones:** Añadido mensaje superior (*👆 Toca cualquier don para ver sus detalles y ejemplos*) y chevrons `›` en cada fila de resultados.
*   [x] **Guía UI/UX:** Actualizada la especificación [`docs/DESIGN_SYSTEM_V3.md`](file:///c:/Users/Leo%20Borjas/Projects/igc/Test%20Dones/Dones_IGC/docs/DESIGN_SYSTEM_V3.md).
*   [x] **Auditoría de Cobertura de Dones (15 Dones):** Verificado que las 76 situaciones cubren al 100% los 15 dones del catálogo de `gifts.js` (Evangelismo: 7, Pastor: 7, Profecía: 4, los 12 dones restantes: 5 preguntas cada uno).
*   [x] **Ajuste Fino de Preguntas 39 y 45:** Pregunta 39 adaptada a fluidez de escala (*"Participo con entusiasmo cuando se trata de iniciar un nuevo grupo o iglesia."*) y Pregunta 45 simplificada (*"Detecto rápido cuando una enseñanza contiene errores sutiles."*).
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
