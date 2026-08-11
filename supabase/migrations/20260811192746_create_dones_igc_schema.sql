-- Dones IGC (v2) — schema propio, separado del de Dones_Original.
-- Este proyecto de Supabase ("IGC") es compartido entre ambas versiones del
-- test; cada una vive en su propio schema de Postgres para no compartir
-- tablas ni datos. Ver Test Dones/Dones_IGC/docs/SCORE_ENGINE.md para el
-- contrato de datos que produce el frontend (answers, scores, topGifts).

create schema if not exists dones_igc;

create table if not exists dones_igc.results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade, -- nullable: aun no hay Auth
  version text not null default '2.0.0',
  answers jsonb not null,   -- { "1": 4, "2": 2, ... } — 76 situaciones
  scores jsonb not null,    -- { "evangelismo": 76, "dar": 60, ... } — % 0-100 por don
  top_gifts text[] not null, -- ids de los 3 dones principales, en orden
  completed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

comment on table dones_igc.results is 'Resultados del Test de Dones IGC (v2). Ver docs/SCORE_ENGINE.md para el contrato de answers/scores/topGifts.';

-- RLS activado sin políticas todavía: nadie tiene acceso hasta que se
-- defina el modelo de autenticación (Fase de Auth, aún no iniciada).
alter table dones_igc.results enable row level security;

create index if not exists results_user_id_idx on dones_igc.results (user_id);
create index if not exists results_completed_at_idx on dones_igc.results (completed_at desc);
