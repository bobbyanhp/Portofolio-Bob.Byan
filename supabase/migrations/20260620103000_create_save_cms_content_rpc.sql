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
    id,
    name,
    full_name,
    intro,
    about_text,
    hero_image_path,
    about_image_path,
    cv_url,
    linkedin_url,
    github_url,
    updated_by
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

  delete from public.skills;

  insert into public.skills (name, section, group_index, sort_order)
  select
    hero_skill.value #>> '{}',
    'hero',
    0,
    (hero_skill.ordinality - 1)::integer
  from jsonb_array_elements(coalesce(content -> 'heroSkills', '[]'::jsonb))
    with ordinality as hero_skill(value, ordinality)
  union all
  select
    stack_skill.value #>> '{}',
    'stack',
    (skill_group.ordinality - 1)::integer,
    (stack_skill.ordinality - 1)::integer
  from jsonb_array_elements(coalesce(content -> 'skillGroups', '[]'::jsonb))
    with ordinality as skill_group(value, ordinality)
  cross join lateral jsonb_array_elements(skill_group.value)
    with ordinality as stack_skill(value, ordinality);

  delete from public.experiences;

  insert into public.experiences (
    title,
    company,
    description,
    period,
    timeline_side,
    sort_order,
    published,
    updated_by
  )
  select
    experience.value ->> 'title',
    experience.value ->> 'company',
    coalesce(experience.value ->> 'description', ''),
    coalesce(experience.value ->> 'period', ''),
    coalesce(nullif(experience.value ->> 'side', ''), 'left'),
    (experience.ordinality - 1)::integer,
    true,
    auth.uid()
  from jsonb_array_elements(coalesce(content -> 'experiences', '[]'::jsonb))
    with ordinality as experience(value, ordinality);

  delete from public.project_images;

  delete from public.projects as existing_project
  where not exists (
    select 1
    from jsonb_array_elements(coalesce(content -> 'projects', '[]'::jsonb)) as incoming_project
    where incoming_project ->> 'id' = existing_project.slug
  );

  insert into public.projects (
    slug,
    title,
    summary,
    description,
    role,
    project_url,
    main_image_path,
    sort_order,
    published,
    updated_by
  )
  select
    project.value ->> 'id',
    project.value ->> 'title',
    coalesce(project.value ->> 'summary', ''),
    coalesce(project.value ->> 'description', ''),
    coalesce(project.value ->> 'role', ''),
    nullif(project.value ->> 'url', ''),
    nullif(project.value ->> 'img', ''),
    (project.ordinality - 1)::integer,
    true,
    auth.uid()
  from jsonb_array_elements(coalesce(content -> 'projects', '[]'::jsonb))
    with ordinality as project(value, ordinality)
  on conflict (slug) do update set
    title = excluded.title,
    summary = excluded.summary,
    description = excluded.description,
    role = excluded.role,
    project_url = excluded.project_url,
    main_image_path = excluded.main_image_path,
    sort_order = excluded.sort_order,
    published = excluded.published,
    updated_by = excluded.updated_by;

  insert into public.project_images (project_id, storage_path, alt_text, sort_order)
  select
    gallery.project_id,
    gallery.storage_path,
    gallery.project_title || ' gallery ' || (min(gallery.image_order) + 1)::text,
    min(gallery.image_order)::integer
  from (
    select
      stored_project.id as project_id,
      incoming_project.value ->> 'title' as project_title,
      gallery_image.value #>> '{}' as storage_path,
      (gallery_image.ordinality - 1)::integer as image_order
    from jsonb_array_elements(coalesce(content -> 'projects', '[]'::jsonb)) as incoming_project(value)
    join public.projects as stored_project
      on stored_project.slug = incoming_project.value ->> 'id'
    cross join lateral jsonb_array_elements(coalesce(incoming_project.value -> 'gallery', '[]'::jsonb))
      with ordinality as gallery_image(value, ordinality)
  ) as gallery
  where nullif(gallery.storage_path, '') is not null
  group by gallery.project_id, gallery.project_title, gallery.storage_path;
end;
$$;

revoke all on function public.save_cms_content(jsonb) from public, anon;
grant execute on function public.save_cms_content(jsonb) to authenticated;
