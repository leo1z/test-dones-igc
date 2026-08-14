-- Dones IGC (v3) — Adición de campos para Onboarding Demográfico y Evaluacion del Test
-- Permite registrar asistencia a grupos de crecimiento, ciudad/zona de Honduras y retroalimentacion.

alter table dones_igc.results 
  add column if not exists attends_growth_group boolean,
  add column if not exists zone_location text,
  add column if not exists clarity_rating integer,
  add column if not exists accuracy_perception text,
  add column if not exists feedback_comments text;

comment on column dones_igc.results.attends_growth_group is '¿El usuario asiste a un grupo de crecimiento? (Sí/No)';
comment on column dones_igc.results.zone_location is 'Zona/Ciudad/Departamento de Honduras donde reside el usuario';
comment on column dones_igc.results.clarity_rating is 'Calificación de claridad del test (1 a 5 estrellas)';
comment on column dones_igc.results.accuracy_perception is 'Percepción de precisión de los resultados (Sí/Parcialmente/No)';
comment on column dones_igc.results.feedback_comments is 'Comentarios o sugerencias abiertas para mejorar el test';

create index if not exists results_zone_location_idx on dones_igc.results (zone_location);
create index if not exists results_growth_group_idx on dones_igc.results (attends_growth_group);
