begin;

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
  github_url
)
values (
  'main',
  'Bob Byan Handoko',
  'Bob Byan Handoko Putra',
  'I''m a software developer based in West Java, specializing in building amazing websites, and everything in between.',
  'Fresh Graduate from National Institute of Technology Bandung, majoring in Informatics with a focus on data science and software engineering. I have valuable internship experience in system and data analysis, as well as expertise in Python for data science, SQL, Machine Learning, and Laravel. I am highly motivated to continue developing my skills in the fields I pursue. I can work under pressure, both individually and in a team. I am confident that my abilities can provide significant and tangible contributions.',
  '/assets/Bob Byan Handoko Putra 6.JPG',
  '/assets/Bob Byan Handoko Putra 4.JPG',
  'https://drive.google.com/file/d/1H8Ofo_M8GodtlyjCThxqxKRGy80pM6Yg/view?usp=sharing',
  'https://www.linkedin.com/in/bobbyanhp/',
  'https://github.com/bobbyanhp'
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
  github_url = excluded.github_url;

insert into public.skills (id, name, section, group_index, sort_order)
values
  ('00000000-0000-4000-8000-000000000001', 'Web Development', 'hero', 0, 0),
  ('00000000-0000-4000-8000-000000000002', 'Full Stack', 'hero', 0, 1),
  ('00000000-0000-4000-8000-000000000003', 'Data Science', 'hero', 0, 2),
  ('00000000-0000-4000-8000-000000000004', 'CMS Ready', 'hero', 0, 3),
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

insert into public.experiences (
  id,
  title,
  company,
  description,
  period,
  timeline_side,
  sort_order,
  published
)
values
  (
    '10000000-0000-4000-8000-000000000001',
    'Project Support Staff Intern',
    'PT. Bhakti Unggul Teknovasi - Bandung, Indonesia',
    'Support the provision of IT services including software license management, server maintenance, and web application implementation to meet user and company project requirements, while also managing procurement processes by ensuring the accuracy of quotations and purchase orders, verifying distributor stock availability, and confirming the completeness of client contract or purchase order documents before processing orders.',
    'November 2025 - May 2026',
    'left',
    0,
    true
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'Full-stack Development Intern',
    'PT. Winnicode Garuda Teknologi - Bandung, Indonesia',
    'Designed, developed, and implemented a full-stack news portal, participating end to end from conceptualization through launch while continuously analyzing the platform to identify opportunities for improvement and innovation.',
    'September 2024 - Desember 2024',
    'right',
    1,
    true
  ),
  (
    '10000000-0000-4000-8000-000000000003',
    'Front-End Development Intern',
    'PT. Xirka Dama Persada - Bandung, Indonesia',
    'Designed the UI for the Fish Feeder web app using HTML, CSS, and JavaScript, and developed a responsive layout optimized for desktop, tablet, and mobile.',
    'July 2024 - September 2024',
    'left',
    2,
    true
  ),
  (
    '10000000-0000-4000-8000-000000000004',
    'Insurance Administration Part Time',
    'PT. Asuransi Allianz Utama - Bandung, Indonesia',
    'Processed and entered travel insurance policy data for 50-70 customers each month, ensuring accuracy and completeness by cross-verifying information with agents and customers.',
    'January 2022 - January 2024',
    'right',
    3,
    true
  ),
  (
    '10000000-0000-4000-8000-000000000005',
    'Technical Data Administrator Intern',
    'PT. Perusahaan Listrik Negara (PLN) - Bandung, Indonesia',
    'Processed and input data for electricity meter changes from analog to token for more than 200 customers per month, handled power increase and decrease requests for about 100 customers each month, and organized customer physical documents chronologically and systematically to streamline searching and archiving.',
    'January 2020 - March 2020',
    'left',
    4,
    true
  )
on conflict (id) do update set
  title = excluded.title,
  company = excluded.company,
  description = excluded.description,
  period = excluded.period,
  timeline_side = excluded.timeline_side,
  sort_order = excluded.sort_order,
  published = excluded.published;

insert into public.projects (
  id,
  slug,
  title,
  summary,
  description,
  role,
  project_url,
  main_image_path,
  sort_order,
  published
)
values
  (
    '20000000-0000-4000-8000-000000000001',
    'save-dental-ai',
    'Website Save Dental AI',
    'Save Dental AI adalah website yang membantu pengguna mendapatkan pengalaman konsultasi dan informasi kesehatan gigi secara lebih praktis melalui tampilan yang bersih dan mudah digunakan.',
    'Save Dental AI adalah website yang dirancang untuk membantu pengguna memahami kebutuhan kesehatan gigi dengan alur digital yang sederhana. Project ini berfokus pada tampilan yang bersih, struktur informasi yang mudah dipindai, dan pengalaman pengguna yang nyaman pada perangkat desktop maupun mobile.',
    'Full-stack Development',
    'https://github.com/bobbyanhp',
    '/assets/savedental.jpg',
    0,
    true
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    'winni-news-network',
    'Website Portal Berita Winni News Network',
    'Winni News Network adalah portal berita full-stack yang menampilkan konten berita, kategori, dan pengalaman membaca yang responsif untuk berbagai ukuran layar.',
    'Winni News Network adalah portal berita yang dikembangkan dari tahap perancangan hingga implementasi. Fokus utama project ini adalah membangun sistem publikasi konten yang rapi, navigasi yang jelas, dan tampilan berita yang konsisten agar pembaca dapat menemukan informasi dengan cepat.',
    'Full-stack Development',
    'https://github.com/bobbyanhp/wnn',
    '/assets/winni.jpg',
    1,
    true
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    'fish-feeder',
    'Website Fish Feeder',
    'Fish Feeder adalah web app dengan layout responsif untuk membantu pengguna memantau dan mengelola fitur pemberian pakan ikan secara digital.',
    'Fish Feeder adalah web app yang dibuat dengan HTML, CSS, dan JavaScript. Project ini menekankan desain UI yang responsif, susunan informasi yang jelas, dan tampilan dashboard sederhana agar fitur monitoring dan kontrol lebih mudah digunakan.',
    'Front-end Development',
    'https://github.com/bobbyanhp',
    '/assets/fishfeed.jpg',
    2,
    true
  )
on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  summary = excluded.summary,
  description = excluded.description,
  role = excluded.role,
  project_url = excluded.project_url,
  main_image_path = excluded.main_image_path,
  sort_order = excluded.sort_order,
  published = excluded.published;

insert into public.project_images (
  id,
  project_id,
  storage_path,
  alt_text,
  sort_order
)
values
  ('30000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', '/assets/savedental.jpg', 'Save Dental AI preview', 0),
  ('30000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', '/assets/winni.jpg', 'Save Dental AI gallery 2', 1),
  ('30000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', '/assets/fishfeed.jpg', 'Save Dental AI gallery 3', 2),
  ('30000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000002', '/assets/winni.jpg', 'Winni News Network preview', 0),
  ('30000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000002', '/assets/savedental.jpg', 'Winni News Network gallery 2', 1),
  ('30000000-0000-4000-8000-000000000006', '20000000-0000-4000-8000-000000000002', '/assets/fishfeed.jpg', 'Winni News Network gallery 3', 2),
  ('30000000-0000-4000-8000-000000000007', '20000000-0000-4000-8000-000000000003', '/assets/fishfeed.jpg', 'Fish Feeder preview', 0),
  ('30000000-0000-4000-8000-000000000008', '20000000-0000-4000-8000-000000000003', '/assets/savedental.jpg', 'Fish Feeder gallery 2', 1),
  ('30000000-0000-4000-8000-000000000009', '20000000-0000-4000-8000-000000000003', '/assets/winni.jpg', 'Fish Feeder gallery 3', 2)
on conflict (id) do update set
  project_id = excluded.project_id,
  storage_path = excluded.storage_path,
  alt_text = excluded.alt_text,
  sort_order = excluded.sort_order;

commit;
