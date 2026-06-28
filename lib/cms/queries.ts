import "server-only";

import type { CmsContent } from "@/data/cmsContent";
import type { Tables } from "@/types/database";
import { createClient } from "@/lib/supabase/server";

type ProjectWithImages = Pick<
  Tables<"projects">,
  "id" | "slug" | "title" | "project_url" | "main_image_path" | "summary" | "description" | "role" | "sort_order" | "published"
> & {
  project_images: Pick<Tables<"project_images">, "id" | "storage_path" | "alt_text" | "sort_order">[];
};

export async function getCmsContent({ publicOnly = false }: { publicOnly?: boolean } = {}): Promise<CmsContent> {
  const supabase = await createClient();
  let experiencesQuery = supabase.from("experiences").select("*").order("sort_order");
  let projectsQuery = supabase
    .from("projects")
    .select("id,slug,title,project_url,main_image_path,summary,description,role,sort_order,published,project_images(id,storage_path,alt_text,sort_order)")
    .order("sort_order")
    .order("sort_order", { referencedTable: "project_images" });

  if (publicOnly) {
    experiencesQuery = experiencesQuery.eq("published", true);
    projectsQuery = projectsQuery.eq("published", true);
  }

  const [profileResult, skillsResult, experiencesResult, projectsResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", "main").maybeSingle(),
    supabase.from("skills").select("*").order("group_index").order("sort_order"),
    experiencesQuery,
    projectsQuery,
  ]);

  const error = profileResult.error ?? skillsResult.error ?? experiencesResult.error ?? projectsResult.error;
  if (error) throw new Error(`Failed to load CMS content: ${error.message}`);
  if (!profileResult.data) throw new Error("CMS profile has not been seeded.");

  return mapCmsContent(
    profileResult.data,
    skillsResult.data ?? [],
    experiencesResult.data ?? [],
    (projectsResult.data ?? []) as ProjectWithImages[],
  );
}

function mapCmsContent(
  profile: Tables<"profiles">,
  skills: Tables<"skills">[],
  experiences: Tables<"experiences">[],
  projects: ProjectWithImages[],
): CmsContent {
  return {
    profile: {
      name: profile.name,
      fullName: profile.full_name,
      intro: profile.intro,
      aboutText: profile.about_text,
      heroImage: profile.hero_image_path ?? "",
      aboutImage: profile.about_image_path ?? "",
      cvUrl: profile.cv_url ?? "",
      socials: [
        { label: "LinkedIn", href: profile.linkedin_url ?? "" },
        { label: "GitHub", href: profile.github_url ?? "" },
      ],
    },
    skills: skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      section: skill.section === "hero" ? "hero" : "stack",
      groupIndex: skill.group_index,
      sortOrder: skill.sort_order,
    })),
    experiences: experiences.map((experience) => ({
      id: experience.id,
      side: experience.timeline_side === "right" ? "right" : "left",
      title: experience.title,
      company: experience.company,
      description: experience.description,
      period: experience.period,
      sortOrder: experience.sort_order,
      published: experience.published,
    })),
    projects: projects.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      url: project.project_url ?? "",
      img: project.main_image_path ?? "",
      summary: project.summary,
      description: project.description,
      role: project.role,
      sortOrder: project.sort_order,
      published: project.published,
      gallery: project.project_images.map((image) => ({
        id: image.id,
        path: image.storage_path,
        altText: image.alt_text,
        sortOrder: image.sort_order,
      })),
    })),
  };
}
