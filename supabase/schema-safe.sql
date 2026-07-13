-- Mimikids Schema (idempotente — se puede correr más de una vez)

-- Products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  description text,
  price numeric(10,2) not null,
  images text[] default '{}',
  category text default 'portachupete',
  badge text,
  materials text,
  care_instructions text,
  production_days_min int default 3,
  production_days_max int default 5,
  available_colors jsonb default '[]',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  order_number text unique not null,
  status text default 'pendiente_pago' check (status in ('pendiente_pago', 'pago_confirmado', 'en_produccion', 'enviado', 'entregado', 'cancelado')),
  payment_method text check (payment_method in ('transferencia')),
  payment_status text default 'pendiente' check (payment_status in ('pendiente', 'confirmado', 'rechazado')),
  items jsonb not null default '[]',
  shipping_method jsonb,
  shipping_address jsonb,
  buyer jsonb,
  subtotal numeric(10,2),
  shipping_cost numeric(10,2) default 0,
  total numeric(10,2),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Testimonials table
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  author_name text not null,
  baby_name text,
  content text not null,
  rating int check (rating between 1 and 5) default 5,
  image_url text,
  is_published boolean default true,
  created_at timestamptz default now()
);

-- RLS
alter table products enable row level security;
alter table orders enable row level security;
alter table testimonials enable row level security;

-- Policies (drop primero para evitar duplicados)
drop policy if exists "Products are viewable by everyone" on products;
drop policy if exists "Testimonials are viewable by everyone" on testimonials;
drop policy if exists "Anyone can create orders" on orders;

create policy "Products are viewable by everyone" on products for select using (is_active = true);
create policy "Testimonials are viewable by everyone" on testimonials for select using (is_published = true);
create policy "Anyone can create orders" on orders for insert with check (true);

-- Updated_at trigger
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at_orders on orders;
drop trigger if exists set_updated_at_products on products;

create trigger set_updated_at_orders before update on orders
  for each row execute function handle_updated_at();

create trigger set_updated_at_products before update on products
  for each row execute function handle_updated_at();

-- Sample product (solo si no existe)
insert into products (slug, name, description, price, images, category, badge, materials, care_instructions, production_days_min, production_days_max, available_colors)
select
  'portachupete-clasico-personalizado',
  'Portachupete Clásico',
  'Nuestro portachupete más querido. Hecho con cuentas de silicona 100% seguras y letras acrílicas con el nombre de tu bebé.',
  4500,
  '{"https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80"}',
  'portachupete',
  'Más vendido',
  'Cuentas de silicona grado alimentario, letras acrílicas, clip de madera de haya',
  'Limpiar con paño húmedo. No sumergir en agua.',
  3,
  5,
  '[{"id":"rosa","name":"Rosa","hex":"#F9C4D2"},{"id":"lila","name":"Lila","hex":"#E8D5F5"},{"id":"menta","name":"Menta","hex":"#C8EFE3"},{"id":"celeste","name":"Celeste","hex":"#B8DFF5"}]'
where not exists (select 1 from products where slug = 'portachupete-clasico-personalizado');
