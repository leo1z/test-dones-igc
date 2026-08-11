# Test Dones — Iglesia Gran Comisión Tegucigalpa

Carpeta que agrupa las distintas versiones del Test de Dones Espirituales.
Cada versión es una SPA estática independiente (HTML/CSS/JS puro, sin
backend), pensada para aguantar muchos usuarios simultáneos porque el
guardado es local (`localStorage`) — ver
`Dones_IGC/docs/REFERENCE.md` §1 para el detalle de por qué escala así.

## Versiones

### `Dones_Original/`
Versión inicial (MVP), funcional y desplegada. 128 preguntas / 16 dones
bíblicos motivacionales, sistema de diseño "Doodle & Bento" (Space Grotesk
+ Outfit, paleta crema/azul), ilustraciones propias por don, wizard de 16
páginas, resultados con Top 3 y glosario, puente `postMessage` para una
futura app móvil. Documentación completa en `Dones_Original/docs/`.

### `Dones_IGC/`
Segunda versión — **en planeación**. Mismas garantías de sistema
(estático, local-first, botón de Reset), pero con preguntas y UI/UX
propios. Ver `Dones_IGC/docs/BRIEF.md` para el estado y las decisiones
pendientes, y `Dones_IGC/docs/REFERENCE.md` para qué partes del motor de
`Dones_Original` se reutilizan.

## Nota de despliegue

Si ambas versiones se sirven bajo el mismo dominio de Vercel, comparten
origin de `localStorage` — cada versión debe usar sus propias claves de
storage (prefijo distinto) para no pisar los datos de la otra. Ver
`Dones_IGC/docs/REFERENCE.md` §3.
