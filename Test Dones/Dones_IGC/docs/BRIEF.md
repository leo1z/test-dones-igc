# Brief: Dones IGC (v2)

Estado: **planeación** — aún no se ha escrito código de esta versión.
Ver `REFERENCE.md` para lo que se reutiliza del sistema de `Dones_Original`.

## Lo que ya sabemos

- Es una segunda versión del test de dones, con **preguntas distintas**
  y **UI/UX distinto** a `Dones_Original`.
- Debe soportar muchos usuarios entrando al link simultáneamente sin
  trabarse → arquitectura estática + `localStorage` (igual que la v1,
  ver `REFERENCE.md` §1).
- Debe guardarse local (no backend) y tener opción de **Reset**.

## Decisiones pendientes (para cuando definamos el plan)

- [ ] **Preguntas:** ¿cuántas, cuántas categorías/dones, y de qué fuente
      (documento, transcripción, etc.)?
- [ ] **Catálogo de dones/categorías:** ¿son los mismos 16 dones bíblicos
      con preguntas nuevas, o un set de categorías distinto?
- [ ] **UI/UX:** ¿qué estilo reemplaza al "Doodle & Bento" de la v1?
      (referencia visual, paleta, tipografía)
- [ ] **Ilustraciones/assets:** ¿se reutilizan las 16 ilustraciones de
      `Dones_Original/docs/illustrations/` o son nuevas?
- [ ] **Relación entre versiones:** ¿se linkean entre sí (ej. selector
      "¿Cuál test quieres tomar?"), o son completamente independientes?
- [ ] **Deploy:** ¿mismo proyecto/dominio de Vercel bajo una ruta distinta,
      o un proyecto Vercel separado?

## Siguiente paso

Esperar el plan del usuario antes de generar `questions.js` / `gifts-data.js`
/ UI de esta versión.
