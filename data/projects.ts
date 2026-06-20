export type ProjectImage = {
  id: string;
  path: string;
  altText: string;
  sortOrder: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  url: string;
  img: string;
  summary: string;
  description: string;
  role: string;
  sortOrder: number;
  published: boolean;
  gallery: ProjectImage[];
};

export const projects: Project[] = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    slug: "save-dental-ai",
    title: "Website Save Dental AI",
    url: "https://github.com/bobbyanhp",
    img: "/assets/savedental.jpg",
    summary: "Save Dental AI adalah website yang membantu pengguna mendapatkan pengalaman konsultasi dan informasi kesehatan gigi secara lebih praktis melalui tampilan yang bersih dan mudah digunakan.",
    description:
      "Save Dental AI adalah website yang dirancang untuk membantu pengguna memahami kebutuhan kesehatan gigi dengan alur digital yang sederhana. Project ini berfokus pada tampilan yang bersih, struktur informasi yang mudah dipindai, dan pengalaman pengguna yang nyaman pada perangkat desktop maupun mobile.",
    role: "Full-stack Development",
    sortOrder: 0,
    published: true,
    gallery: [
      { id: "30000000-0000-4000-8000-000000000001", path: "/assets/savedental.jpg", altText: "Save Dental AI preview", sortOrder: 0 },
      { id: "30000000-0000-4000-8000-000000000002", path: "/assets/winni.jpg", altText: "Save Dental AI gallery 2", sortOrder: 1 },
      { id: "30000000-0000-4000-8000-000000000003", path: "/assets/fishfeed.jpg", altText: "Save Dental AI gallery 3", sortOrder: 2 },
    ],
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    slug: "winni-news-network",
    title: "Website Portal Berita Winni News Network",
    url: "https://github.com/bobbyanhp/wnn",
    img: "/assets/winni.jpg",
    summary: "Winni News Network adalah portal berita full-stack yang menampilkan konten berita, kategori, dan pengalaman membaca yang responsif untuk berbagai ukuran layar.",
    description:
      "Winni News Network adalah portal berita yang dikembangkan dari tahap perancangan hingga implementasi. Fokus utama project ini adalah membangun sistem publikasi konten yang rapi, navigasi yang jelas, dan tampilan berita yang konsisten agar pembaca dapat menemukan informasi dengan cepat.",
    role: "Full-stack Development",
    sortOrder: 1,
    published: true,
    gallery: [
      { id: "30000000-0000-4000-8000-000000000004", path: "/assets/winni.jpg", altText: "Winni News Network preview", sortOrder: 0 },
      { id: "30000000-0000-4000-8000-000000000005", path: "/assets/savedental.jpg", altText: "Winni News Network gallery 2", sortOrder: 1 },
      { id: "30000000-0000-4000-8000-000000000006", path: "/assets/fishfeed.jpg", altText: "Winni News Network gallery 3", sortOrder: 2 },
    ],
  },
  {
    id: "20000000-0000-4000-8000-000000000003",
    slug: "fish-feeder",
    title: "Website Fish Feeder",
    url: "https://github.com/bobbyanhp",
    img: "/assets/fishfeed.jpg",
    summary: "Fish Feeder adalah web app dengan layout responsif untuk membantu pengguna memantau dan mengelola fitur pemberian pakan ikan secara digital.",
    description:
      "Fish Feeder adalah web app yang dibuat dengan HTML, CSS, dan JavaScript. Project ini menekankan desain UI yang responsif, susunan informasi yang jelas, dan tampilan dashboard sederhana agar fitur monitoring dan kontrol lebih mudah digunakan.",
    role: "Front-end Development",
    sortOrder: 2,
    published: true,
    gallery: [
      { id: "30000000-0000-4000-8000-000000000007", path: "/assets/fishfeed.jpg", altText: "Fish Feeder preview", sortOrder: 0 },
      { id: "30000000-0000-4000-8000-000000000008", path: "/assets/savedental.jpg", altText: "Fish Feeder gallery 2", sortOrder: 1 },
      { id: "30000000-0000-4000-8000-000000000009", path: "/assets/winni.jpg", altText: "Fish Feeder gallery 3", sortOrder: 2 },
    ],
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.slug === id);
}
