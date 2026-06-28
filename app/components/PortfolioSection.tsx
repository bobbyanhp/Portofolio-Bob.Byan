"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import { ArrowRightIcon } from "./Icons";
import { usePreferences } from "./PreferencesProvider";
import { useCmsContent } from "./useCmsContent";

const PROJECTS_PER_PAGE = 6;

export default function PortfolioSection() {
  const { content } = useCmsContent();
  const { t, translateText } = usePreferences();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(content.projects.length / PROJECTS_PER_PAGE));
  const linkedIn = content.profile.socials.find((social) => social.label === "LinkedIn")?.href.trim() ?? "";

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const visibleProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return content.projects.slice(start, start + PROJECTS_PER_PAGE);
  }, [content.projects, currentPage]);

  return (
    <section className="pb-20 pt-12" id="portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900 dark:text-slate-50">{t("portfolioTitle")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{t("portfolioIntro")}</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <WorkCard key={project.id} item={project} detailsLabel={t("details")} translateText={translateText} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="inline-flex min-h-11 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-200">
              {t("previous")}
            </button>
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              {t("page")} {currentPage} / {totalPages}
            </span>
            <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} className="inline-flex min-h-11 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-200">
              {t("next")}
            </button>
          </div>
        )}

        <div className="mt-16 text-center text-sm text-slate-600 sm:mt-20 md:mt-24 dark:text-slate-400">
          {t("footerBuilt")}{" "}
          {linkedIn ? (
            <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 hover:text-indigo-700 dark:text-slate-100 dark:hover:text-indigo-300">
              Bob Byan Handoko Putra
            </a>
          ) : (
            <span className="font-semibold text-slate-900 dark:text-slate-100">Bob Byan Handoko Putra</span>
          )}{" "}
          {t("footerWith")} <span className="align-middle">💜</span>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ item, detailsLabel, translateText }: { item: Project; detailsLabel: string; translateText: (text: string) => string }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md dark:bg-slate-900 dark:ring-slate-800">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
        <Image src={item.img} alt={item.title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
      </div>

      <div className="p-5">
        {item.role.trim() && <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">{translateText(item.role)}</p>}
        <h3 className="mt-2 text-lg font-extrabold text-slate-900 group-hover:text-indigo-700 dark:text-slate-50 dark:group-hover:text-indigo-300">{translateText(item.title)}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{translateText(item.summary)}</p>

        <div className="mt-5 flex justify-end">
          <a href={`/portfolio/${item.slug}`} className="inline-flex items-center gap-2 rounded-lg bg-indigo-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-800">
            {detailsLabel}
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
