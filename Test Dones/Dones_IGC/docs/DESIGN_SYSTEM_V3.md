# Design System v5 - Dones IGC (Iglesia Gran Comisión Tegucigalpa)

Este documento registra los tokens de diseño, componentes, micro-interacciones y reglas visuales aplicadas en la versión 5 de **Dones IGC**.

---

## 🎨 1. Tokens de Color y Paleta Oficial

```css
:root {
  /* Marca e Institucional */
  --primary: #336CDD;          /* Azul Real IGC */
  --primary-hover: #2655B3;    /* Azul Hover Táctil */
  --primary-light: rgba(51, 108, 221, 0.12);
  --navy: #0F0F31;             /* Navy Profundo para textos y cabeceras */
  --cream: #F7EEE5;            /* Fondo Crema Cálido (Ref1, Ref2, Ref3) */
  --bg-warm: #WMFAFA;          /* Blanco cálido para tarjetas elevadas */
  
  /* Acentos Teológicos y Estados */
  --gold: #D4AF37;             /* Dorado Don #1 (Rank 1) */
  --gold-light: rgba(212, 175, 55, 0.15);
  --terracotta: #E05A2B;       /* Terracota para Advertencias / Alerta Sesgo */
  --terracotta-light: rgba(224, 90, 43, 0.09);
  --emerald: #10B981;          /* Verde Confirmación */
  --emerald-light: rgba(16, 185, 129, 0.12);
}
```

---

## 📐 2. Escala de Logos y Dimensiones V5

* **Header Main Logo (`.logo-igc`):**
  * Altura: `76px` (`max-width: 280px`).
  * Altura de la barra header: `96px`.
  * Filtro: `drop-shadow(0 3px 10px rgba(15, 15, 49, 0.08))`.
* **Footer Logo (`.logo-antimateria`):**
  * Altura: `32px`.
  * Presente en el pie general y en el bloque crediticio del Home (`.welcome-actions`).

---

## 🔢 3. Escala de Afinidad con Gradiente Horizontal y Tooltip Flotante

Cada ítem de pregunta incluye 5 píldoras táctiles numéricas sobre una barra de gradiente horizontal (`rgba(100, 116, 139, 0.12)` a `rgba(51, 108, 221, 0.2)`):

1. **`1` (No me identifico):** Neutro Pizarra (`#64748b`).
2. **`2` (Poco):** Azul Suave (`#3b82f6`).
3. **`3` (A veces):** Terracota Alerta (`#E05A2B`) + Alerta de sesgo ("Evita 3").
4. **`4` (Bastante):** Azul Intenso (`#2563eb`).
5. **`5` (Así soy yo):** Azul Real Brand (`#336cdd`) + Halo de luz con escala 1.08x.

* **Tooltip Flotante Popover (`.scale-tooltip-bubble`):** Burbuja flotante animada que aparece directamente encima del número seleccionado mostrando la etiqueta textual ("No me identifico", "Así soy yo", etc.).

---

## 🚀 4. Botones Magnéticos & Proporciones Flecha

* **Botones Siguiente / Atrás:**
  * `.icon-arrow`: Dimensiones fijas `20px × 20px` sin desbordamiento sobre el texto.
  * Botón Siguiente: Gradiente de 135° (`#336cdd` a `#2251ad`), sombra de elevación `0 8px 24px`, destello *shimmer* y animación de flecha `translateX(4px)`.
* **Ruta de Evaluación:** Titular del módulo nombrado **"Conoce tus dones"** con partes nombradas neutralmente (`Parte 1` ... `Parte 10`).
