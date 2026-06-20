import { CmsContentProvider } from "@/app/components/CmsContentProvider";
import { getCmsContent } from "@/lib/cms/queries";
import ProjectDetailClient from "./ProjectDetailClient";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Project Detail | Bob Portfolio",
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const content = await getCmsContent();

  return (
    <CmsContentProvider initialContent={content}>
      <ProjectDetailClient id={id} />
    </CmsContentProvider>
  );
}
