create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_cms_admin() from public, anon;
grant execute on function public.is_cms_admin() to authenticated;

drop policy if exists "users can view own admin membership" on public.admin_users;
create policy "users can view own admin membership"
on public.admin_users
for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "public can view profile" on public.profiles;
create policy "public can view profile"
on public.profiles
for select
to anon, authenticated
using (true);

drop policy if exists "admins can manage profile" on public.profiles;
create policy "admins can manage profile"
on public.profiles
for all
to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));

drop policy if exists "public can view skills" on public.skills;
create policy "public can view skills"
on public.skills
for select
to anon, authenticated
using (true);

drop policy if exists "admins can manage skills" on public.skills;
create policy "admins can manage skills"
on public.skills
for all
to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));

drop policy if exists "public can view published experiences" on public.experiences;
create policy "public can view published experiences"
on public.experiences
for select
to anon, authenticated
using (published);

drop policy if exists "admins can manage experiences" on public.experiences;
create policy "admins can manage experiences"
on public.experiences
for all
to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));

drop policy if exists "public can view published projects" on public.projects;
create policy "public can view published projects"
on public.projects
for select
to anon, authenticated
using (published);

drop policy if exists "admins can manage projects" on public.projects;
create policy "admins can manage projects"
on public.projects
for all
to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));

drop policy if exists "public can view published project images" on public.project_images;
create policy "public can view published project images"
on public.project_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = project_images.project_id
      and projects.published
  )
);

drop policy if exists "admins can manage project images" on public.project_images;
create policy "admins can manage project images"
on public.project_images
for all
to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));
