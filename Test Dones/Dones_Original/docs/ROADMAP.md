# Hoja de Ruta (Roadmap): Test de Dones Espirituales - IGC Tegucigalpa

Este documento define la trayectoria del desarrollo, desde el MVP inicial hasta la integración móvil final y automatización.

> Esta es la hoja de ruta de la versión **"Dones_Original"**. Existe una
> segunda versión en planeación, **"Dones_IGC"** (ver `../../Dones_IGC/docs/`),
> con preguntas y UI/UX propios sobre el mismo tipo de sistema.

## Fase actual (MVP de hoy)
- **Fase 1: Setup & Control:** Git, Vercel, `PROJECT_STATE.md`, `ROADMAP.md` y `ARCHITECTURE.md`.
- **Fase 2: Sistema de Diseño:** Estilos base con Tailwind CDN y custom fonts (`Space Grotesk` y `Outfit`) y efectos "doodle".
- **Fase 3: Core Lógico:** Lógica matemática aislada en JS y catálogos de datos (`gifts-data.js` con SVGs y `questions.js`).
- **Fase 4: Integración UI:** Desarrollo del Wizard responsivo de preguntas y la vista Bento de resultados.
- **Fase 5: Lanzamiento:** Despliegue estático en Vercel.

## Futuro (Próximos pasos en la App de la Iglesia)
- **Fase 6: Integración en la App Móvil (Híbrida/Nativa):**
  - Embeber esta SPA en un contenedor Webview de la aplicación móvil de la iglesia.
  - Habilitar el puente `postMessage` para que la app móvil intercepte el objeto JSON de resultados.
- **Fase 7: Cuentas y Persistencia en Supabase:**
  - Agregar pantallas de inicio de sesión / registro (usando Supabase Auth).
  - Cambiar el guardado local exclusivo en `localStorage` a un envío HTTP (POST) para persistir los resultados en una tabla relacional en Supabase.
- **Fase 8: Onboarding Automatizado (n8n):**
  - Configurar un trigger en n8n que reaccione al nuevo registro en Supabase.
  - Clasificar al usuario e integrarlo en un canal o grupo ministerial basado en sus 3 dones principales.
  - Enviar un correo o mensaje automatizado de bienvenida ministerial.
