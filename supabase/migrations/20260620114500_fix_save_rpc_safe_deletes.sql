create or replace function public.save_cms_content(content jsonb)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  profile_data jsonb := content -> 'profile';
begin
  if not public.is_cms_admin() then
    raise exception 'Only CMS administrators can save content.' using errcode = '42501';
  end if;

  if jsonb_typeof(content) is distinct from 'object' then
    raise exception 'CMS content must be a JSON object.' using errcode = '22023';
  end if;

  insert into public.profiles (
    id, name, full_name, intro, about_text, hero_image_path,
    about_image_path, cv_url, linkedin_url, github_url, updated_by
  )
  values (
    'main',
    profile_data ->> 'name',
    profile_data ->> 'fullName',
    coalesce(profile_data ->> 'intro', ''),
    coalesce(profile_data ->> 'aboutText', ''),
    nullif(profile_data ->> 'heroImage', ''),
    nullif(profile_data ->> 'aboutImage', ''),
    nullif(profile_data ->> 'cvUrl', ''),
    (
      select social ->> 'href'
      from jsonb_array_elements(coalesce(profile_data -> 'socials', '[]'::jsonb)) as social
      where social ->> 'label' = 'LinkedIn'
      limit 1
    ),
    (
      select social ->> 'href'
      from jsonb_array_elements(coalesce(profile_data -> 'socials', '[]'::jsonb)) as social
      where social ->> 'label' = 'GitHub'
      limit 1
    ),
    auth.uid()
  )
  on conflict (id) do update set
    name = excluded.name,
    full_name = excluded.full_name,
    intro = excluded.intro,
    about_text = excluded.about_text,
    hero_image_path = excluded.hero_image_path,
    about_image_path = excluded.about_image_path,
    cv_url = excluded.cv_url,
    linkedin_url = excluded.linkedin_url,
    github_url = excluded.github_url,
    updated_by = excluded.updated_by;

  delete from public.skills where true;

  insert into public.skills (id, name, section, group_index, sort_order)
  select
    (skill.value ->> 'id')::uuid,
    skill.value ->> 'name',
    skill.value ->> 'section',
    coalesce((skill.value ->> 'groupIndex')::integer, 0),
    coalesce((skill.value ->> 'sortOrder')::integer, 0)
  from jsonb_array_elements(coalesce(content -> 'skills', '[]'::jsonb)) as skill(value);

  delete from public.experiences where true;

  insert into public.experiences (
    id, title, company, description, period, timeline_side,
    sort_order, published, updated_by
  )
  select
    (experience.value ->> 'id')::uuid,
    experience.value ->> 'title',
    experience.value ->> 'company',
    coalesce(experience.value ->> 'description', ''),
    coalesce(experience.value ->> 'period', ''),
    coalesce(nullif(experience.value ->> 'side', ''), 'left'),
    coalesce((experience.value ->> 'sortOrder')::integer, 0),
    coalesce((experience.value ->> 'published')::boolean, false),
    auth.uid()
  from jsonb_array_elements(coalesce(content -> 'experiences', '[]'::jsonb)) as experience(value);

  delete from public.project_images where true;

  delete from public.projects as existing_project
  where not exists (
    select 1
    from jsonb_array_elements(coalesce(content -> 'projects', '[]'::jsonb)) as incoming_project
    where (incoming_project ->> 'id')::uuid = existing_project.id
  );

  insert into public.projects (
    id, slug, title, summary, description, role, project_url,
    main_image_path, sort_order, published, updated_by
  )
  select
    (project.value ->> 'id')::uuid,
    project.value ->> 'slug',
    project.value ->> 'title',
    coalesce(project.value ->> 'summary', ''),
    coalesce(project.value ->> 'description', ''),
    coalesce(project.value ->> 'role', ''),
    nullif(project.value ->> 'url', ''),
    nullif(project.value ->> 'img', ''),
    coalesce((project.value ->> 'sortOrder')::integer, 0),
    coalesce((project.value ->> 'published')::boolean, false),
    auth.uid()
  from jsonb_array_elements(coalesce(content -> 'projects', '[]'::jsonb)) as project(value)
  on conflict (id) do update set
    slug = excluded.slug,
    title = excluded.title,
    summary = excluded.summary,
    description = excluded.description,
    role = excluded.role,
    project_url = excluded.project_url,
    main_image_path = excluded.main_image_path,
    sort_order = excluded.sort_order,
    published = excluded.published,
    updated_by = excluded.updated_by;

  insert into public.project_images (
    id, project_id, storage_path, alt_text, sort_order
  )
  select
    (gallery_image.value ->> 'id')::uuid,
    (project.value ->> 'id')::uuid,
    gallery_image.value ->> 'path',
    coalesce(gallery_image.value ->> 'altText', ''),
    coalesce((gallery_image.value ->> 'sortOrder')::integer, 0)
  from jsonb_array_elements(coalesce(content -> 'projects', '[]'::jsonb)) as project(value)
  cross join lateral jsonb_array_elements(coalesce(project.value -> 'gallery', '[]'::jsonb)) as gallery_image(value)
  where nullif(gallery_image.value ->> 'path', '') is not null;
end;
$$;

revoke all on function public.save_cms_content(jsonb) from public, anon;
grant execute on function public.save_cms_content(jsonb) to authenticated;
