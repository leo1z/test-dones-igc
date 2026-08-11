# Plan Fase 1 — UX: Dones IGC (v2)

Estado: **mayormente confirmado**, con 2 puntos abiertos marcados abajo.
Ver `PROJECT_STATE.md` / `ROADMAP.md` para el ciclo de fases.

## 1. Home

Tres acciones:
- **Hacer el test** → entra al flujo de escenas/situaciones (§2).
- **Ver mis resultados** → si ya hay un resultado guardado en
  `localStorage`, salta directo a la pantalla de resultados (§3), con
  opción de **Reset**. (Mismo patrón que `Dones_Original`.)
- **Aprender de los Dones** → glosario de los 15 dones: cards con
  ilustración, descripción, consejos y ejemplos (§4).

## 2. Test — Escenas y Situaciones

- Las 76 situaciones se agrupan en **escenas** (varias situaciones bajo
  una misma escena ilustrada, mezcladas entre dones — no agrupadas por
  categoría).
- **[CONFIRMADO] 10 escenas** (reducidas desde la propuesta inicial de
  19): 6 escenas de 8 situaciones + 4 escenas de 7 (76 ÷ 10 ≈ 7.6,
  repartidas parejo). Mix generado analizando las 76 situaciones para que
  ninguna escena repita un mismo don dos veces y los 15 dones queden
  entrelazados. Cada situación fue **reescrita desde la pregunta original**
  en forma de escena/momento cotidiano (no pregunta directa), y cada
  escena tiene una **ilustración sugerida** (mood/ambientación) — ver el
  detalle completo (76 situaciones + 10 ilustraciones) en `MIX_ESCENAS.md`,
  pendiente de tu aprobación.
  Cada escena = 1 ilustración + 7-8 situaciones con su escala de
  respuesta, en una misma pantalla (misma densidad ya probada en v1: 8
  por pantalla).
- **Orden mixed:** fijo, no aleatorio en cada sesión (reproducible y
  testeable) — el orden exacto está en `MIX_ESCENAS.md`.
- **[CONFIRMADO] Escala de respuesta** (reemplaza el "1 Casi nunca – 5
  Casi siempre" de v1 por identificación con la situación):

  | Valor | Etiqueta |
  |:-:|---|
  | 1 | No me identifico |
  | 2 | Poco |
  | 3 | Algo |
  | 4 | Bastante |
  | 5 | Totalmente / Así soy yo |

- **[CONFIRMADO] Control de sesgo:** se mantiene el mecanismo de v1
  (aviso visual sutil al elegir el valor medio "3 — Algo") para reducir
  la tendencia a responder siempre neutral.
- Progreso: barra de avance por escena (1 de 10), no por pregunta
  individual — igual idea que v1 pero a nivel de escena.

## 3. Resultados

- **Top 3 en Bento con 3 tamaños fijos por posición:** 1º lugar = card
  grande, 2º = mediana, 3º = pequeña (tamaño fijo por ranking, no
  proporcional al % exacto — así el layout es siempre predecible).
- **Resto de los dones (12 restantes):** listado con **porcentaje**
  (0-100%) por don — mismo dato normalizado que decidimos en Fase 0.
- **Compartir en redes:** el usuario elige entre 3 variantes de imagen
  generada, **[CONFIRMADO] formato Story vertical, 1080×1920**, las tres:
  1. **Top 3** — los 3 dones destacados juntos (mismo layout Bento de
     resultados, adaptado a formato story).
  2. **Solo el destacado** — el don #1 con su descripción, en grande.
  3. **"Este es mi Don, descubrí el tuyo"** (nueva, reemplaza la idea
     original de "Top 3 + más bajos") — card tipo invitación/viral:
     ilustración + nombre del don #1 en grande, tagline "Este es mi Don.
     Descubre el tuyo." como llamado a la acción, y espacio para el
     link/QR al test. Sin descripción larga — el objetivo es que quien lo
     vea en una historia sienta curiosidad y entre a hacer el test, no
     informar en detalle (eso ya lo cubre la variante 2).
     *(Propuesta de contenido — confírmalo o ajústalo.)*

## 4. "Aprender de los Dones" — contenido de las cards

Cada card: ilustración del don + descripción (ya está en
`CONTENIDO.md`) + **consejos** + **ejemplos** (no estaban en los .docx
compartidos).

- Redacto un primer borrador de consejos y ejemplos por don, basado en
  las descripciones ya transcritas. Queda marcado **pendiente de tu
  revisión** antes de darlo por final — no se usa como definitivo sin que
  lo confirmes.

## 5. Implicaciones de estructura de datos (para Fase 3 — Score Engine)

- `questions.js` deja de tener un `id` implícito por posición; cada
  situación necesita: `{ id, giftId, sceneId, text }` — el reparto ya no
  es la fórmula modular `(id-1) % 16` de v1 (ver `REFERENCE.md` §2),
  sino un mapeo explícito.
- Nueva entidad **escena**: `{ sceneId, illustration, situations: [...] }`
  — 10 escenas, 7-8 situaciones c/u (mix exacto en `MIX_ESCENAS.md`).
- `gifts-data.js` gana dos campos nuevos por don: `tips` (consejos) y
  `examples` (ejemplos), además de los campos ya usados en v1
  (`description`, `overuse`, `objective`, `passages`, `illustration`).

## Pendiente de tu confirmación antes de construir

- [ ] `MIX_ESCENAS.md` — ¿10 escenas y el orden/mezcla propuestos están
      bien, o se regenera distinto?
- [ ] Variante 3 de share ("Este es mi Don, descubrí el tuyo") — ¿el
      contenido propuesto (don #1 + tagline + espacio para link/QR, sin
      descripción larga) es lo que tenías en mente?

## Decisiones confirmadas en esta fase

- [x] Home con 3 acciones (Test / Ver resultados + Reset / Aprender de
      los Dones).
- [x] Situaciones (no preguntas directas), escala de identificación 1-5
      con etiquetas definidas, aviso de sesgo en el valor medio.
- [x] 10 escenas mixed (no agrupadas por don), 7-8 situaciones c/u —
      detalle en `MIX_ESCENAS.md`.
- [x] Resultados: Bento Top 3 con 3 tamaños fijos por posición + listado
      de % del resto.
- [x] Compartir: 3 variantes, formato Story vertical 1080×1920.
- [x] "Aprender de los Dones": consejos/ejemplos los redacto yo en
      borrador, pendiente de tu revisión (no bloquea el resto de la fase).
