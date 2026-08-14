# Guía de Ilustraciones y Prompts — Test Dones IGC

Este documento contiene las propuestas de ilustración para las **10 Partes** del wizard de la aplicación, los prompts listos para usar en Midjourney / DALL-E (siguiendo el estilo doodle corporativo de la marca), y las especificaciones técnicas para trabajar o exportar desde **Adobe Illustrator**.

---

## 🎨 Prompts para Generación de Ilustraciones (Midjourney / DALL-E)

### Estilo Visual Oficial:
* **Estilo:** Doodle vectorial plano (Flat Vector Doodle Character).
* **Colores Primarios:** Personajes y trazos principales en Navy Profundo (`#0F0F31`), acentos y destellos en Azul Real IGC (`#336CDD`).
* **Fondo:** Blanco limpio o transparente aislado.
* **Trazos:** Líneas limpias, bordes suavizados, estética moderna estilo Notion/Slothui.

---

### 🖼️ Prompts por Cada Parte (Estaciones 1 a 10)

| Parte | Tema / Preguntas Clave | Prompt de Generación Recomendado |
| :-: | :--- | :--- |
| **Parte 1** | Alcance, Oración, Apoyo Logístico e Iniciativa | `Minimalist flat vector doodle illustration, solid dark navy character (#0f0f31) holding a megaphone with geometric speech bubbles and floating stars, royal blue accents (#336cdd), clean bold line art, corporate doodle aesthetic, isolated on white background --no 3d render gradient photo --v 6.0` |
| **Parte 2** | Claridad de Visión, Discernimiento y Doctrina | `Minimalist flat vector doodle illustration, solid dark navy character (#0f0f31) looking through a telescope towards glowing geometric constellations and sharp stars, royal blue accent details (#336cdd), bold clean outlines, corporate doodle style, white background --v 6.0` |
| **Parte 3** | Oración Respondida, Enseñanza y Conexión Profunda | `Minimalist flat vector doodle illustration, solid dark navy character (#0f0f31) holding an open book emitting sharp light rays and small geometric sparkles towards a heart shape, royal blue accent highlights (#336cdd), corporate doodle aesthetic, isolated on white background --v 6.0` |
| **Parte 4** | Generosidad, Trabajo Práctico e Iniciar Proyectos | `Minimalist flat vector doodle illustration, two solid dark navy characters (#0f0f31) shaking hands over building blocks, with small floating starbursts and a protective shield outline in royal blue (#336cdd), clean vector doodle style, white background --v 6.0` |
| **Parte 5** | Solución de Contingencias y Armonía de Equipo | `Minimalist flat vector doodle illustration, solid dark navy character (#0f0f31) organizing floating geometric puzzle pieces and gears into place, royal blue accent colors (#336cdd), minimalist doodle line art, plain white background --v 6.0` |
| **Parte 6** | Formación de Otros, Esfuerzo Físico y Misiones | `Minimalist flat vector doodle illustration, solid dark navy character (#0f0f31) holding a compass and lantern illuminating a dashed pathway forward, royal blue accent details (#336cdd), flat vector doodle style, crisp lines, white background --v 6.0` |
| **Parte 7** | Consejería Individual, Transmisión y Medios Escritos | `Minimalist flat vector doodle illustration, solid dark navy character (#0f0f31) sitting across a desk mentoring another character with speech bubbles and glowing lightbulbs, royal blue accent outlines (#336cdd), minimalist corporate doodle, white background --v 6.0` |
| **Parte 8** | Discipulado Silencioso, Anonimato y Firmeza Doctrinal | `Minimalist flat vector doodle illustration, solid dark navy character (#0f0f31) watering a small growing sprout emerging from a geometric block, royal blue accent leaves and water drops (#336cdd), flat vector doodle art, isolated white background --v 6.0` |
| **Parte 9** | Calma en la Prueba, Empatía Colectiva y Liderazgo | `Minimalist flat vector doodle illustration, solid dark navy character (#0f0f31) standing atop a stylized geometric hill holding a beacon light, with calm wave lines in royal blue (#336cdd), minimalist line art doodle, plain white background --v 6.0` |
| **Parte 10** | Formación de Nuevos Líderes, Visita y Cuidado | `Minimalist flat vector doodle illustration, solid dark navy character (#0f0f31) guiding another up a three-step geometric podium towards a flag peak, royal blue accents (#336cdd), corporate doodle aesthetic, clean flat line art, white background --v 6.0` |

---

## 🛠️ Guía Técnica para Trabajo en Adobe Illustrator

Si prefieres diseñar o personalizar tus propias ilustraciones o tarjetas en **Adobe Illustrator**, ten en cuenta estas reglas para una integración perfecta en la Web App:

### 1. Lienzos y Resoluciones (Artboards):
* **Para Ilustraciones de Banner de las 10 Partes:**
  * Mesa de Trabajo: `512 × 512 px` (o `1024 × 1024 px` para pantallas Retina).
  * Modo de Color: **RGB** (nunca CMYK para web).
  * Fondo de Mesa de Trabajo: **Transparente**.
* **Para Tarjetas Completas de Don / Historia (Canvas Share):**
  * Mesa de Trabajo: `1080 × 1920 px` (Proporción 9:16 vertical).

### 2. Paleta Oficial de Colores (Códigos HEX):
* **Navy Profundo (Personajes y Trazos):** `#0F0F31`
* **Azul Real IGC (Detalles y Acentos):** `#336CDD`
* **Crema Cálido (Fondos):** `#F7EEE5`
* **Blanco Puro (Tarjetas):** `#FFFFFF`
* **Dorado Rango 1:** `#D4AF37`
* **Terracota Alerta:** `#E05A2B`

### 3. Trazos y Acabados (Stroke Settings):
* Grosor de Trazo recomendado: `3 pt` a `5 pt` (para lienzo 512px).
* **Remate (Cap):** *Extremo Redondeado (Round Cap)*.
* **Unión (Join):** *Unión Redondeada (Round Join)*.
* **Estilo:** Personajes en plano silueta negro/navy (`#0f0f31`), sin facciones detalladas (boca/ojos), enfatizando la acción con brazos, manos e íconos flotantes.

### 4. Ajustes de Exportación desde Illustrator:
1. Dirígete a `Archivo > Exportar > Exportar para pantallas (Alt + Ctrl + E)`.
2. Selecciona las Mesas de Trabajo deseadas.
3. Formatos recomendados:
   * **PNG-24 @2x** (con fondo transparente marcado).
   * **SVG** (vectorial directo, ideal para web responsiva ultraligera).

### 5. ¿Cómo pasarnos los archivos para añadirlos a la Web App?
* Coloca tus PNGs o SVGs exportados dentro de la carpeta del proyecto:
  `Test Dones/Dones_IGC/src/assets/illustrations/`
* O adjúntalos aquí en la conversación y los conectaremos automáticamente en el mapeo de `app.js` (`SCENE_ILLUSTRATIONS`).
