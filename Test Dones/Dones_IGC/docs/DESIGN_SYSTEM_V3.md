# Design System v3 - Dones IGC (Iglesia Gran Comisión Tegucigalpa)

Este documento registra los tokens de diseño, componentes, micro-interacciones y reglas visuales aplicadas en la versión 3 de **Dones IGC**.

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

## 📐 2. Escala de Logos y Dimensiones

* **Header Main Logo (`.logo-igc`):**
  * Altura: `64px` (`max-width: 240px`).
  * Altura de la barra header: `88px`.
  * Filtro: `drop-shadow(0 2px 8px rgba(15, 15, 49, 0.06))`.
* **Footer Logo (`.logo-antimateria`):**
  * Altura: `32px`.
  * Filtro: `drop-shadow(0 1px 4px rgba(15, 15, 49, 0.1))`.

---

## 🔢 3. Escala Numérica Interactiva (Píldoras 1 al 5)

Cada ítem de pregunta incluye 5 píldoras táctiles con sus correspondientes dígitos centrados:

1. **`1` (No me Identifico):** Neutro pizarra suave (`#64748b`).
2. **`2` (Poco):** Azul tenue (`#3b82f6`).
3. **`3` (Algo):** Terracota Alerta (`#E05A2B`) + Alerta de sesgo ("Evita neutrales").
4. **`4` (Bastante):** Azul Intenso (`#2563eb`).
5. **`5` (Así Soy Yo):** Azul Real Brand (`#336cdd`) + Halo de luz con escala 1.08x.

---

## 🚀 4. Botones Magnéticos con Efecto Shimmer

Los botones primarios (`.btn-primary`) cuentan con:
* Gradiente de 135°: `linear-gradient(135deg, #336cdd 0%, #2251ad 100%)`.
* Sombra de profundidad: `0 8px 24px rgba(51, 108, 221, 0.3)`.
* Animación *shimmer*: Destello oblicuo que pasa periódicamente a 4s.
* Flecha interactiva: Desplazamiento `translateX(4px)` al pasar el cursor.

---

## 📱 5. Módulo de Compartir (Web Share API Nativo & Canvas)

* **Botón Nativo:** Invoca `navigator.share()` para compartir directo a WhatsApp, Instagram, Telegram o copiar enlace con el resultado formateado.
* **Canvas Stories (1080×1920):** Descarga local en 3 variantes (Bento Top 3, Don Destacado, Invitación Viral).
