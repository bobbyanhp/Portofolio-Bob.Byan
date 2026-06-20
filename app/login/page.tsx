import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "CMS Access | Bob Portfolio",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: isAdmin } = await supabase.rpc("is_cms_admin");
    if (isAdmin) redirect("/cms");
  }

  return (
    <main className="min-h-screen bg-[#f7fbff] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
        <div>
          <Link href="/" className="text-sm font-bold text-indigo-700 hover:text-indigo-900">
            Back to portfolio
          </Link>
          <h1 className="mt-8 max-w-xl text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-normal text-slate-950">CMS Access</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">Masuk menggunakan akun admin untuk mengelola konten portfolio.</p>
        </div>

        <div className="rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">Admin Area</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">Sign in</h2>
          </div>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}
