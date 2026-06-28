"use client";

import { BriefcaseIcon } from "./Icons";
import { usePreferences } from "./PreferencesProvider";
import { useCmsContent } from "./useCmsContent";

export default function CareerHistory() {
  const { content } = useCmsContent();
  const { t, translateText } = usePreferences();

  return (
    <section id="experience" className="scroll-mt-24 pb-14 pt-12 sm:pb-20 sm:pt-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">{t("experience")}</p>
          <h2 className="mt-2 text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900 dark:text-slate-50">{t("careerHistory")}</h2>
          <p className="mt-3 leading-relaxed text-slate-600"></p>
        </div>

        <div className="relative mt-8 sm:mt-12">
          <div className="absolute bottom-6 left-7 top-6 w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2 dark:bg-slate-800" />

          <ul className="space-y-8 md:space-y-12">
            {content.experiences.map((item) => (
              <li key={item.id} className="relative">
                <div className="absolute left-7 top-5 z-10 -translate-x-1/2 md:left-1/2">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm ring-4 ring-white md:h-14 md:w-14 dark:bg-slate-900 dark:ring-slate-950">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-700 text-white md:h-10 md:w-10">
                      <BriefcaseIcon />
                    </div>
                  </div>
                </div>

                <div className={["ml-16 md:ml-0 md:w-[calc(50%-3.5rem)]", item.side === "left" ? "md:mr-auto" : "md:ml-auto"].join(" ")}>
                  <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md sm:p-6 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/60">
                    <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200">{translateText(item.period)}</span>
                    <h3 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-slate-50">{translateText(item.title)}</h3>
                    <p className="mt-2 font-semibold leading-relaxed text-slate-700 dark:text-slate-200">{translateText(item.company)}</p>
                    <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{translateText(item.description)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
