import { experiences, type Experience } from "./experiences";
import { profile, heroSkills, skillGroups } from "./profile";
import { projects, type Project } from "./projects";

export type CmsProfile = typeof profile & {
  aboutText: string;
};

export type CmsSkill = {
  id: string;
  name: string;
  section: "hero" | "stack";
  groupIndex: number;
  sortOrder: number;
};

export type CmsContent = {
  profile: CmsProfile;
  skills: CmsSkill[];
  experiences: Experience[];
  projects: Project[];
};

export const defaultCmsContent: CmsContent = {
  profile: {
    ...profile,
    aboutText:
      "Fresh Graduate from National Institute of Technology Bandung, majoring in Informatics with a focus on data science and software engineering. I have valuable internship experience in system and data analysis, as well as expertise in Python for data science, SQL, Machine Learning, and Laravel. I am highly motivated to continue developing my skills in the fields I pursue. I can work under pressure, both individually and in a team. I am confident that my abilities can provide significant and tangible contributions.",
  },
  skills: [
    ...heroSkills.map((name, index) => ({ id: `00000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`, name, section: "hero" as const, groupIndex: 0, sortOrder: index })),
    ...skillGroups.flatMap((group, groupIndex) =>
      group.map((name, sortOrder) => {
        const id = heroSkills.length + skillGroups.slice(0, groupIndex).flat().length + sortOrder + 1;
        return { id: `00000000-0000-4000-8000-${String(id).padStart(12, "0")}`, name, section: "stack" as const, groupIndex, sortOrder };
      }),
    ),
  ],
  experiences,
  projects,
};

export function validateCmsContent(content: CmsContent) {
  if (!content.profile.name.trim() || !content.profile.fullName.trim()) return "Name dan Full Name wajib diisi.";
  if (content.experiences.some((item) => !item.title.trim() || !item.company.trim())) return "Setiap career history wajib memiliki title dan company.";
  if (content.skills.some((item) => !item.name.trim())) return "Setiap skill wajib memiliki nama.";
  if (content.projects.some((item) => !item.slug.trim() || !item.title.trim())) return "Setiap project wajib memiliki slug dan title.";
  if (content.projects.some((item) => item.gallery.some((image) => !image.path.trim()))) return "Setiap gallery image wajib memiliki storage_path.";

  const slugs = content.projects.map((item) => item.slug);
  if (new Set(slugs).size !== slugs.length) return "Slug project harus unik.";

  const recordIds = [
    ...content.skills.map((item) => item.id),
    ...content.experiences.map((item) => item.id),
    ...content.projects.flatMap((item) => [item.id, ...item.gallery.map((image) => image.id)]),
  ];
  if (recordIds.some((id) => !id.trim()) || new Set(recordIds).size !== recordIds.length) return "UUID setiap record wajib diisi dan unik.";

  return null;
}
