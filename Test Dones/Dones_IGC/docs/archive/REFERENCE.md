# Referencia Técnica: Sistema Reutilizable de "Dones_Original"

Este documento resume qué partes del sistema construido en `Dones_Original`
se **reutilizan tal cual** en `Dones_IGC`, y cuáles se **reconstruyen** porque
esta versión tiene preguntas y UI/UX distintos.

Fuente: `../../Dones_Original/` (código) y `../../Dones_Original/docs/ARCHITECTURE.md`.

---

## 1. Por qué el sistema "aguanta muchas personas"

`Dones_Original` es una **SPA estática sin backend**: HTML + CSS + JS puro,
sin build step, servida como archivos estáticos desde Vercel (CDN).

- No hay servidor de aplicación, ni base de datos, ni cola de escritura
  compartida entre usuarios → **no existe cuello de botella de concurrencia**.
  Cada visitante descarga los mismos archivos estáticos del CDN y ejecuta
  el test 100% en su propio navegador.
- El guardado es **local** (`localStorage`, ver §3) → cada usuario escribe
  solo en su propio dispositivo, nunca en un recurso compartido. Por diseño,
  miles de personas pueden entrar al mismo link a la misma vez sin que el
  sitio "se trabe", porque no compiten por nada entre sí.
- Esto es exactamente lo que pide la nueva versión ("que aguante muchas
  personas... pero que se guarde local"). **No cambiar este modelo** — no
  agregar un backend/DB para guardar respuestas a menos que se pida
  explícitamente (eso está planeado a futuro como Fase 7 en el `ROADMAP.md`
  de `Dones_Original`, con Supabase, pero es un paso posterior y separado).

## 2. Motor de cálculo — reutilizable sin cambios de lógica

`src/js/test-engine.js` es un módulo puro (sin DOM, sin `window`,
sin `localStorage`) y **data-driven**: no tiene el número 128 ni el número 16
hardcodeados en su lógica, los toma de `questions.js` y `gifts-data.js`.

```
giftIndex = (questionId - 1) % GIFTS_COUNT   // reparto round-robin
```

**Implicación para Dones_IGC:** si el nuevo test también reparte sus
preguntas en round-robin entre categorías/dones (N categorías, M preguntas,
M múltiplo de N), `test-engine.js` se puede **copiar tal cual** — solo hay
que proveer un nuevo `questions.js` y `gifts-data.js` con la misma forma:

```js
// questions.js
export const TOTAL_QUESTIONS = <M>;
export const QUESTIONS_PER_PAGE = <N por página>;
export const TOTAL_PAGES = TOTAL_QUESTIONS / QUESTIONS_PER_PAGE;
export const questions = [{ id: 1, text: '...' }, ...];

// gifts-data.js
export const GIFTS_COUNT = <N>;
export const gifts = [{ id, name, oneWord, description, overuse, objective, passages, illustration }, ...];
```

Si la nueva versión **no** usa un reparto round-robin (p. ej. número
distinto de preguntas por categoría), hay que ajustar `calculateScores()`
en `test-engine.js` — todo lo demás (`rankGifts`, `getTopGifts`,
`runFullCalculation`) sigue funcionando igual porque solo dependen del
arreglo de puntajes ya calculado.

## 3. Persistencia local + Reset — patrón a replicar

En `src/js/app.js`:

```js
const STORAGE_ANSWERS_KEY = 'igc_gifts_answers';
const STORAGE_RESULT_KEY = 'igc_gifts_result';
```

- Autoguardado de cada respuesta en `localStorage` (try/catch silencioso
  por si el navegador lo bloquea — modo privado, webview restringido).
- Al cargar la página, si ya existe un resultado guardado, se salta
  directo a la pantalla de resultados (evita repetir el test).
- Botón "Reiniciar Test" (`btn-reset`) llama `clearStorage()` y vuelve a
  la pantalla de bienvenida.

**⚠️ Importante para Dones_IGC:** si ambas versiones terminan sirviéndose
bajo el mismo dominio de Vercel (mismo origin, distintas rutas), comparten
el mismo `localStorage`. Hay que usar claves **distintas y con prefijo
propio**, por ejemplo:

```js
const STORAGE_ANSWERS_KEY = 'igc_dones_igc_answers';
const STORAGE_RESULT_KEY = 'igc_dones_igc_result';
```

para que completar un test no pise ni oculte el resultado del otro.

## 4. Puente móvil (Webview postMessage) — mantener igual

Al completar el test, además de guardar local, se emite el mismo evento
(ver `docs/ARCHITECTURE.md` de `Dones_Original` §2) para que una futura
app móvil contenedora lo pueda capturar:

```js
{ type: "IGC_GIFTS_TEST_COMPLETED", payload: { version, completedAt, answers, scores, topGifts } }
```

Reutilizar el mismo `type` y forma de `payload` (cambiando solo el
contenido de `topGifts`/`scores` según el catálogo de esta versión) para
que la app móvil no necesite lógica distinta por versión — puede usar
un campo adicional como `testId: "dones_igc"` si se necesita diferenciar
de cuál versión vino el resultado.

## 5. Lo que SÍ cambia en Dones_IGC

- **Contenido:** nuevas preguntas (`questions.js`) y nuevo catálogo de
  dones/categorías (`gifts-data.js`) — ver `BRIEF.md` para las decisiones
  pendientes sobre esto.
- **UI/UX:** nuevo sistema de diseño (tipografía, colores, estilo de
  tarjetas/ilustraciones). No hereda el estilo "Doodle & Bento" de
  `Dones_Original` a menos que se decida lo contrario.
- **Identidad de assets:** carpeta propia `src/assets/`, `localStorage`
  keys propias (§3), y su propio `index.html`/`styles.css`/`app.js` —
  no se comparte código en tiempo de ejecución entre versiones, cada una
  es una SPA estática independiente (mismo patrón, sin dependencias
  cruzadas). Esto también permite desplegarlas como proyectos Vercel
  separados si se prefiere aislar dominios/analítica.

## 6. Archivos de Dones_Original a usar como plantilla

| Necesitas...                          | Cópialo/adáptalo desde...                              |
|----------------------------------------|----------------------------------------------------------|
| Motor de cálculo                       | `Dones_Original/src/js/test-engine.js` (sin cambios)     |
| Forma de `questions.js`                | `Dones_Original/src/js/questions.js` (cambiar contenido) |
| Forma de `gifts-data.js`               | `Dones_Original/src/js/gifts-data.js` (cambiar contenido)|
| Orquestador UI (persistencia + bridge) | `Dones_Original/src/js/app.js` (adaptar selectores/DOM)  |
| Contrato de datos Supabase (futuro)    | `Dones_Original/docs/ARCHITECTURE.md` §3                 |
