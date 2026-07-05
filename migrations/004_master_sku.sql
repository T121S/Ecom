-- Master SKUs table
create table if not exists public.master_skus (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  sku_code text not null,
  name text not null,
  description text default '',
  current_stock integer default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, sku_code)
);

-- Master SKU items (links products to master SKU)
create table if not exists public.master_sku_items (
  id uuid default gen_random_uuid() primary key,
  master_sku_id uuid references public.master_skus(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  marketplace_id uuid references public.marketplaces(id) on delete set null,
  created_at timestamptz default now() not null,
  unique(master_sku_id, product_id)
);

alter table public.master_skus enable row level security;
alter table public.master_sku_items enable row level security;

create policy "Users can view own master SKUs"
  on master_skus for select
  using (auth.uid() = user_id);

create policy "Users can insert own master SKUs"
  on master_skus for insert
  with check (auth.uid() = user_id);

create policy "Users can update own master SKUs"
  on master_skus for update
  using (auth.uid() = user_id);

create policy "Users can delete own master SKUs"
  on master_skus for delete
  using (auth.uid() = user_id);

create policy "Users can view own master SKU items"
  on master_sku_items for select
  using (
    exists (
      select 1 from master_skus
      where master_skus.id = master_sku_items.master_sku_id
      and master_skus.user_id = auth.uid()
    )
  );

create policy "Users can insert own master SKU items"
  on master_sku_items for insert
  with check (
    exists (
      select 1 from master_skus
      where master_skus.id = master_sku_items.master_sku_id
      and master_skus.user_id = auth.uid()
    )
  );

create policy "Users can delete own master SKU items"
  on master_sku_items for delete
  using (
    exists (
      select 1 from master_skus
      where master_skus.id = master_sku_items.master_sku_id
      and master_skus.user_id = auth.uid()
    )
  );
