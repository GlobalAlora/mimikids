-- Tabla de configuración general
-- Segura para re-ejecutar

create table if not exists settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz default now()
);

-- Habilitar RLS
alter table settings enable row level security;

-- Lectura pública (para la página de confirmación de pedido)
drop policy if exists "Settings are publicly readable" on settings;
create policy "Settings are publicly readable"
  on settings for select
  using (true);

-- Solo service role puede escribir (via API protegida)
drop policy if exists "Service role can manage settings" on settings;
create policy "Service role can manage settings"
  on settings for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Valores iniciales (idempotente)
insert into settings (key, value) values
  ('transfer_cbu',    '')
on conflict (key) do nothing;

insert into settings (key, value) values
  ('transfer_alias',  '')
on conflict (key) do nothing;

insert into settings (key, value) values
  ('transfer_bank',   '')
on conflict (key) do nothing;

insert into settings (key, value) values
  ('transfer_holder', '')
on conflict (key) do nothing;
