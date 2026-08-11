-- Permite que el frontend (rol anon, sin Auth todavia) inserte resultados
-- en dones_igc.results a traves de la API. Los schemas nuevos no heredan
-- los grants por defecto que tiene `public` — hay que darlos explicitamente.
--
-- Solo INSERT, nunca SELECT/UPDATE/DELETE para anon: cualquiera puede
-- enviar su propio resultado, pero nadie puede leer los resultados de
-- otros con la llave publica. Eso cambia cuando exista Auth (Fase de Auth,
-- pendiente) y se agregue una politica de SELECT scoped a auth.uid().

grant usage on schema dones_igc to anon, authenticated;
grant insert on dones_igc.results to anon, authenticated;

create policy "anon puede insertar su resultado"
  on dones_igc.results
  for insert
  to anon, authenticated
  with check (true);
