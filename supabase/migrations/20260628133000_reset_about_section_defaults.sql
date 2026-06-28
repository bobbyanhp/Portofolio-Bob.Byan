begin;

update public.profiles
set
  about_text = 'Fresh Graduate from National Institute of Technology Bandung, majoring in Informatics with a focus on data science and software engineering. I have valuable internship experience in system and data analysis, as well as expertise in Python for data science, SQL, Machine Learning, and Laravel. I am highly motivated to continue developing my skills in the fields I pursue. I can work under pressure, both individually and in a team. I am confident that my abilities can provide significant and tangible contributions.',
  about_image_path = '/assets/Bob Byan Handoko Putra 4.JPG',
  updated_at = now()
where id = 'main';

delete from public.skills
where section = 'stack';

insert into public.skills (id, name, section, group_index, sort_order)
values
  ('00000000-0000-4000-8000-000000000005', 'PHP', 'stack', 0, 0),
  ('00000000-0000-4000-8000-000000000006', 'Java', 'stack', 0, 1),
  ('00000000-0000-4000-8000-000000000007', 'JavaScript', 'stack', 0, 2),
  ('00000000-0000-4000-8000-000000000008', 'React', 'stack', 0, 3),
  ('00000000-0000-4000-8000-000000000009', 'Python', 'stack', 0, 4),
  ('00000000-0000-4000-8000-000000000010', 'Git', 'stack', 0, 5),
  ('00000000-0000-4000-8000-000000000011', 'HTML', 'stack', 1, 0),
  ('00000000-0000-4000-8000-000000000012', 'CSS', 'stack', 1, 1),
  ('00000000-0000-4000-8000-000000000013', 'Laravel', 'stack', 1, 2),
  ('00000000-0000-4000-8000-000000000014', 'Next.js', 'stack', 1, 3),
  ('00000000-0000-4000-8000-000000000015', 'MySQL', 'stack', 1, 4),
  ('00000000-0000-4000-8000-000000000016', 'MS Word', 'stack', 1, 5),
  ('00000000-0000-4000-8000-000000000017', 'MS Excel', 'stack', 2, 0),
  ('00000000-0000-4000-8000-000000000018', 'Visual Studio Code', 'stack', 2, 1),
  ('00000000-0000-4000-8000-000000000019', 'PyCharm', 'stack', 2, 2),
  ('00000000-0000-4000-8000-000000000020', 'Figma', 'stack', 2, 3),
  ('00000000-0000-4000-8000-000000000021', 'Canva', 'stack', 2, 4),
  ('00000000-0000-4000-8000-000000000022', 'Google Workspace', 'stack', 2, 5)
on conflict (id) do update set
  name = excluded.name,
  section = excluded.section,
  group_index = excluded.group_index,
  sort_order = excluded.sort_order;

commit;
