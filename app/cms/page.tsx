import { redirect } from "next/navigation";
import { CmsContentProvider } from "@/app/components/CmsContentProvider";
import { getCmsContent } from "@/lib/cms/queries";
import { createClient } from "@/lib/supabase/server";
import CmsDashboard from "./CmsDashboard";

export const metadata = {
  title: "CMS Dashboard | Bob Portfolio",
};

export default async function CmsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: isAdmin, error: adminError } = await supabase.rpc("is_cms_admin");
  if (adminError || !isAdmin) redirect("/login");

  const content = await getCmsContent();

  return (
    <CmsContentProvider initialContent={content}>
      <CmsDashboard adminEmail={user.email ?? "Admin"} />
    </CmsContentProvider>
  );
}
