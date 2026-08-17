-- Dones IGC (v3) — Limpieza de datos de prueba y actualización de permisos para Admin
-- 1. Vacía todos los registros de prueba generados durante la fase de desarrollo
truncate table dones_igc.results;

-- 2. Concede permisos de SELECT y DELETE para consulta e higienización pastorales
grant select, delete on dones_igc.results to anon, authenticated;

-- 3. Políticas RLS para lectura y eliminación en el Panel Admin
drop policy if exists "anon_select_results" on dones_igc.results;
create policy "anon_select_results"
  on dones_igc.results
  for select
  to anon, authenticated
  using (true);

drop policy if exists "anon_delete_results" on dones_igc.results;
create policy "anon_delete_results"
  on dones_igc.results
  for delete
  to anon, authenticated
  using (true);
