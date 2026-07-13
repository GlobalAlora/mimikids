-- Inserta los 5 productos del catálogo Mimikids
-- Seguro para re-ejecutar (usa WHERE NOT EXISTS)

insert into products (slug, name, description, price, images, category, badge, materials, care_instructions, production_days_min, production_days_max, available_colors, is_active)
select
  'portachupete-letras-blancas',
  'Portachupete · Letras Blancas',
  'El clásico atemporal. Letras de silicona blanca pura que combinan con cualquier estilo. Delicadas, luminosas y perfectas para nenas y nenes por igual.',
  4500,
  '["https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80"]'::jsonb,
  'portachupete',
  'Más vendido',
  'Cuentas de silicona grado alimentario, letras de silicona blanca, clip de madera de haya',
  'Limpiar con paño húmedo. No sumergir en agua. Revisar regularmente el estado del clip y las cuentas.',
  3, 5, '[]'::jsonb, true
where not exists (select 1 from products where slug = 'portachupete-letras-blancas');

insert into products (slug, name, description, price, images, category, badge, materials, care_instructions, production_days_min, production_days_max, available_colors, is_active)
select
  'portachupete-letras-beige',
  'Portachupete · Letras Beige',
  'Suaves y cálidas. Las letras beige le dan un tono natural y neutro, perfecto para combinar con paletas tierra, nude o arcoíris.',
  4500,
  '["https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80"]'::jsonb,
  'portachupete',
  null,
  'Cuentas de silicona grado alimentario, letras de silicona beige, clip de madera de haya',
  'Limpiar con paño húmedo. No sumergir en agua. Revisar regularmente el estado del clip y las cuentas.',
  3, 5, '[]'::jsonb, true
where not exists (select 1 from products where slug = 'portachupete-letras-beige');

insert into products (slug, name, description, price, images, category, badge, materials, care_instructions, production_days_min, production_days_max, available_colors, is_active)
select
  'portachupete-letras-rosas',
  'Portachupete · Letras Rosas',
  'El favorito para nenas. Las letras de silicona rosa suave le dan ese toque dulce y romántico que hace suspirar a todas las mamás.',
  4500,
  '["https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600&q=80"]'::jsonb,
  'portachupete',
  '💕 Para nenas',
  'Cuentas de silicona grado alimentario, letras de silicona rosa, clip de madera de haya',
  'Limpiar con paño húmedo. No sumergir en agua. Revisar regularmente el estado del clip y las cuentas.',
  3, 5, '[]'::jsonb, true
where not exists (select 1 from products where slug = 'portachupete-letras-rosas');

insert into products (slug, name, description, price, images, category, badge, materials, care_instructions, production_days_min, production_days_max, available_colors, is_active)
select
  'portachupete-letras-celeste',
  'Portachupete · Letras Celeste',
  'Fresco y tierno. Las letras celeste pastel aportan suavidad y un toque aéreo. Ideal para nenes o para un look neutro con personalidad.',
  4500,
  '["https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80"]'::jsonb,
  'portachupete',
  '💙 Para nenes',
  'Cuentas de silicona grado alimentario, letras de silicona celeste, clip de madera de haya',
  'Limpiar con paño húmedo. No sumergir en agua. Revisar regularmente el estado del clip y las cuentas.',
  3, 5, '[]'::jsonb, true
where not exists (select 1 from products where slug = 'portachupete-letras-celeste');

insert into products (slug, name, description, price, images, category, badge, materials, care_instructions, production_days_min, production_days_max, available_colors, is_active)
select
  'portachupete-letras-madera',
  'Portachupete · Letras Madera',
  'El premium de la colección. Letras de madera natural que le dan un estilo cálido, orgánico y súper sofisticado. Se combina con todo.',
  5200,
  '["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80"]'::jsonb,
  'portachupete',
  '🌿 Premium',
  'Cuentas de silicona grado alimentario, letras de madera de haya natural, clip de madera',
  'Limpiar con paño seco. La madera no debe mojarse. Revisar regularmente el estado de las cuentas.',
  3, 5, '[]'::jsonb, true
where not exists (select 1 from products where slug = 'portachupete-letras-madera');
