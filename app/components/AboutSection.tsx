"use client";

import Image from "next/image";
import { usePreferences } from "./PreferencesProvider";
import { useCmsContent } from "./useCmsContent";

export default function AboutSection() {
  const { content } = useCmsContent();
  const { t, translateText } = usePreferences();
  const { profile } = content;

  const stackSkills = content.skills
    .filter((item) => item.section === "stack")
    .sort((left, right) => left.groupIndex - right.groupIndex || left.sortOrder - right.sortOrder);

  return (
    <section id="about" className="mx-auto max-w-7xl pb-14 pt-10 sm:pb-20 sm:pt-16">
      <div className="relative overflow-hidden rounded-3xl bg-[#eaf5ff] px-4 py-8 shadow-sm ring-1 ring-sky-100 transition-colors sm:px-6 sm:py-12 lg:rounded-[2rem] lg:px-10 xl:px-12 dark:bg-slate-900 dark:ring-slate-800">
        <div className="pointer-events-none absolute -left-28 top-12 hidden h-72 w-72 rounded-full border border-sky-200/60 sm:block dark:border-slate-700" />
        <div className="pointer-events-none absolute -right-40 bottom-8 hidden h-96 w-96 rounded-full border border-sky-200/60 lg:block dark:border-slate-700" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(250px,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-12">
          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[390px]">
            <div className="absolute -left-4 bottom-10 h-20 w-20 rounded-full bg-indigo-800/90 sm:-left-6 sm:h-24 sm:w-24" />
            <div className="absolute -left-1 bottom-24 h-28 w-20 rounded-full bg-indigo-400/50 sm:-left-2 sm:h-32 sm:w-24" />
            <div className="relative overflow-hidden rounded-3xl bg-white/70 p-2 shadow-sm backdrop-blur dark:bg-slate-800/80">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.35rem] sm:rounded-[1.6rem]">
                <Image src={profile.aboutImage} alt={profile.fullName} width={760} height={880} sizes="(min-width:1280px) 390px, (min-width:1024px) 34vw, (min-width:640px) 340px, 280px" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900 dark:text-slate-50">{t("aboutTitle")}</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-300">{translateText(profile.aboutText)}</p>

            <p className="mt-6 font-semibold text-slate-700 dark:text-slate-200">{t("aboutLead")}</p>

            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {stackSkills.map((skill) => (
                <li key={skill.id} className="flex min-h-12 min-w-0 items-center gap-3 rounded-lg border border-sky-100 bg-white/75 px-4 py-3 text-[15px] font-semibold leading-snug text-slate-800 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-200">
                  <span className="h-2 w-2 flex-none rounded-full bg-sky-500 dark:bg-sky-300" aria-hidden="true" />
                  <span className="min-w-0 break-words">{translateText(skill.name)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
