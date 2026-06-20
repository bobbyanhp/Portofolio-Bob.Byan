"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error: string | null;
};

export async function login(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error || !data.user) {
    return { error: getAuthErrorMessage(error?.code) };
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc("is_cms_admin");

  if (adminError) {
    console.error("CMS admin verification failed", {
      code: adminError.code,
      message: adminError.message,
    });
    await supabase.auth.signOut();
    return { error: "Akses admin gagal diverifikasi. Periksa migration RLS Supabase." };
  }

  if (!isAdmin) {
    await supabase.auth.signOut();
    return { error: "Login berhasil, tetapi UUID akun ini belum terdaftar sebagai admin CMS." };
  }

  redirect("/cms");
}

function getAuthErrorMessage(code?: string) {
  switch (code) {
    case "email_not_confirmed":
      return "Email Supabase belum dikonfirmasi.";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "Terlalu banyak percobaan login. Coba kembali beberapa saat lagi.";
    case "invalid_credentials":
      return "Email atau password tidak valid.";
    default:
      return "Login Supabase gagal. Periksa konfigurasi Auth dan coba kembali.";
  }
}
