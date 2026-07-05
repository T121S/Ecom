-- Ensure marketplaces exist with correct icon names
insert into public.marketplaces (name, slug, icon_name) values
  ('Shopee', 'shopee', 'simple-icons:shopee'),
  ('Tokopedia', 'tokopedia', 'ri:shopping-bag-3-fill'),
  ('Lazada', 'lazada', 'ri:shopping-cart-fill')
on conflict (slug) do update set
  icon_name = excluded.icon_name,
  name = excluded.name;
