-- Core CMS schema for the portfolio website.
-- RLS is enabled without policies so all API access stays closed until the
-- authentication and authorization migration is added.

create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

comment on table public.admin_users is 'Supabase Auth users allowed to manage CMS content.';

create table public.profiles (
  id text primary key default 'main' check (id = 'main'),
  name text not null check (char_length(trim(name)) > 0),
  full_name text not null check (char_length(trim(full_name)) > 0),
  intro text not null default '',
  about_text text not null default '',
  hero_image_path text,
  about_image_path text,
  cv_url text,
  linkedin_url text,
  github_url text,
  updated_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Singleton profile record used by the hero and about sections.';

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  section text not null check (section in ('hero', 'stack')),
  group_index integer not null default 0 check (group_index >= 0),
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.skills.section is 'hero for hero pills, stack for grouped About tech stacks.';

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  company text not null check (char_length(trim(company)) > 0),
  description text not null default '',
  period text not null default '',
  timeline_side text not null default 'left' check (timeline_side in ('left', 'right')),
  sort_order integer not null default 0 check (sort_order >= 0),
  published boolean not null default false,
  updated_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(trim(title)) > 0),
  summary text not null default '',
  description text not null default '',
  role text not null default '',
  project_url text,
  main_image_path text,
  sort_order integer not null default 0 check (sort_order >= 0),
  published boolean not null default false,
  updated_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.projects.slug is 'Stable public URL identifier; UUID remains the internal identity.';
comment on column public.projects.main_image_path is 'Storage object path or temporary local /assets path during migration.';

create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  storage_path text not null check (char_length(trim(storage_path)) > 0),
  alt_text text not null default '',
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, storage_path)
);

create index skills_display_order_idx
  on public.skills (section, group_index, sort_order);

create index experiences_public_order_idx
  on public.experiences (published, sort_order);

create index projects_public_order_idx
  on public.projects (published, sort_order);

create index project_images_display_order_idx
  on public.project_images (project_id, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger skills_set_updated_at
before update on public.skills
for each row execute function public.set_updated_at();

create trigger experiences_set_updated_at
before update on public.experiences
for each row execute function public.set_updated_at();

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create trigger project_images_set_updated_at
before update on public.project_images
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;

grant usage on schema public to anon, authenticated;

grant select on table public.profiles, public.skills, public.experiences,
  public.projects, public.project_images to anon, authenticated;

grant select, insert, update, delete on table public.admin_users to authenticated;
grant insert, update, delete on table public.profiles, public.skills,
  public.experiences, public.projects, public.project_images to authenticated;

revoke all on function public.set_updated_at() from public, anon, authenticated;
