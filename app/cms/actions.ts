"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { validateCmsContent, type CmsContent } from "@/data/cmsContent";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

export type SaveCmsContentResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
    };

export async function saveCmsContent(content: CmsContent): Promise<SaveCmsContentResult> {
  const validationMessage = validateCmsContent(content);
  if (validationMessage) return { ok: false, message: validationMessage };

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { ok: false, message: "Session admin sudah berakhir. Silakan login kembali." };

    const { error } = await supabase.rpc("save_cms_content", {
      content: content as unknown as Json,
    });

    if (error) {
      console.error("Saving CMS content failed", { code: error.code, message: error.message });
      return { ok: false, message: `Konten gagal disimpan ke Supabase (${error.code}: ${error.message}).` };
    }

    revalidatePath("/");
    revalidatePath("/portfolio/[id]", "page");
    revalidatePath("/cms");

    return { ok: true };
  } catch (error) {
    console.error("Supabase CMS request failed", error);
    return { ok: false, message: "Tidak dapat terhubung ke Supabase. Periksa koneksi lalu coba kembali." };
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
