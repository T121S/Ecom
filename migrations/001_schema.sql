-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Marketplaces seed data
create table if not exists public.marketplaces (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  icon_name text not null,
  created_at timestamptz default now() not null
);

insert into public.marketplaces (name, slug, icon_name) values
  ('Shopee', 'shopee', 'simple-icons:shopee'),
  ('Tokopedia', 'tokopedia', 'ri:shopping-bag-3-fill'),
  ('Lazada', 'lazada', 'ri:shopping-cart-fill')
on conflict (slug) do nothing;

-- Store connections (for future use)
create table if not exists public.store_connections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  marketplace_id uuid references public.marketplaces(id) on delete cascade not null,
  store_name text,
  access_token text,
  refresh_token text,
  expires_at timestamptz,
  status text default 'disconnected' check (status in ('connected', 'disconnected', 'expired')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, marketplace_id)
);

-- RLS policies
alter table public.profiles enable row level security;
alter table public.marketplaces enable row level security;
alter table public.store_connections enable row level security;

-- Profiles: users can view/update their own profile
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Marketplaces: everyone can view
create policy "Anyone can view marketplaces"
  on marketplaces for select
  to authenticated
  using (true);

-- Store connections: users can manage their own
create policy "Users can view own connections"
  on store_connections for select
  using (auth.uid() = user_id);

create policy "Users can insert own connections"
  on store_connections for insert
  with check (auth.uid() = user_id);

create policy "Users can update own connections"
  on store_connections for update
  using (auth.uid() = user_id);

create policy "Users can delete own connections"
  on store_connections for delete
  using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
