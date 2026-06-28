"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ExternalIcon, LanguageIcon, MoonIcon, SunIcon } from "@/app/components/Icons";
import { usePreferences } from "@/app/components/PreferencesProvider";
import { useCmsContent } from "@/app/components/useCmsContent";

export default function ProjectDetailClient({ id }: { id: string }) {
  const { content } = useCmsContent();
  const { language, theme, t, toggleLanguage, toggleTheme, translateText } = usePreferences();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<string | null>(null);
  const project = content.projects.find((item) => item.slug === id);

  useEffect(() => {
    setSelectedImage(null);
    setShowImage(null);
  }, [id]);

  if (!project) {
    return (
      <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8 lg:py-14 dark:bg-slate-950 dark:text-slate-50">
        <section className="mx-auto max-w-3xl rounded-[1.5rem] bg-slate-50 p-8 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <a href="/#portfolio" className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-bold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-indigo-500 dark:hover:text-indigo-300">
            <ArrowLeftIcon />
            {t("back")}
          </a>
          <h1 className="mt-8 text-3xl font-black text-slate-950 dark:text-slate-50">{t("projectNotFoundTitle")}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{t("projectNotFoundBody")}</p>
        </section>
      </main>
    );
  }

  const activeImage = selectedImage ?? project.img;
  const galleryImages = Array.from(new Set([project.img, ...project.gallery.map((image) => image.path)]));
  const projectUrl = project.url.trim();
  const projectRole = project.role.trim();

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8 lg:py-14 dark:bg-slate-950 dark:text-slate-50">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400">
          <a href="/#portfolio" className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-bold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-indigo-500 dark:hover:text-indigo-300">
            <ArrowLeftIcon />
            {t("back")}
          </a>
          <span className="font-bold">{t("projects")}</span>
          <ArrowRightIcon />
          <span className="font-bold uppercase text-slate-900 dark:text-slate-50">{translateText(project.title)}</span>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" onClick={toggleTheme} className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-200" aria-label="Toggle dark mode">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
            <button type="button" onClick={toggleLanguage} className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-200" aria-label="Toggle language">
              <LanguageIcon />
              <span>{language === "en" ? "ID" : "EN"}</span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div>
            <h1 className="text-[clamp(3rem,7vw,5.8rem)] font-black uppercase leading-[0.92] tracking-normal text-slate-900 dark:text-slate-50">{translateText(project.title)}</h1>
            <div className="mt-8 h-1.5 w-32 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 shadow-[0_10px_30px_rgba(79,70,229,0.25)]" />
            <p className="mt-10 max-w-3xl text-lg font-medium leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">{translateText(project.description)}</p>

            {projectUrl && (
              <div className="mt-9 flex flex-wrap gap-4">
                {projectRole && <span className="rounded-full border border-indigo-100 bg-indigo-50 px-5 py-3 text-sm font-bold text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200">{translateText(projectRole)}</span>}
                <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-bold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200 dark:hover:border-sky-400/50">
                  {t("projectLink")}
                  <ExternalIcon />
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowImage(activeImage)}
              className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left shadow-xl shadow-slate-200/70 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:focus:ring-indigo-500/30"
              aria-label={`Show ${project.title} image`}
            >
              <Image src={activeImage} alt={`${project.title} preview`} fill priority sizes="(min-width:1024px) 620px, 90vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" />
              <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950/90 dark:text-slate-100 dark:ring-slate-700">{t("show")}</span>
            </button>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(image)}
                  onDoubleClick={() => setShowImage(image)}
                  className={["relative aspect-[16/9] overflow-hidden rounded-xl border bg-slate-50 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:bg-slate-900 dark:focus:ring-indigo-500/30", activeImage === image ? "border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-500/30" : "border-slate-200 hover:border-indigo-300 dark:border-slate-800 dark:hover:border-indigo-500"].join(" ")}
                  aria-label={`Select ${project.title} gallery ${index + 1}`}
                >
                  <Image src={image} alt={`${project.title} gallery ${index + 1}`} fill sizes="(min-width:1024px) 150px, 45vw" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showImage && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <button type="button" aria-label="Close image preview" onClick={() => setShowImage(null)} className="absolute inset-0 cursor-default" />
          <div className="relative z-10 w-full max-w-6xl">
            <button type="button" onClick={() => setShowImage(null)} className="mb-4 rounded-full bg-white px-5 py-2 text-sm font-black text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100">
              {t("close")}
            </button>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
              <Image src={showImage} alt={`${project.title} full preview`} fill sizes="95vw" className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
