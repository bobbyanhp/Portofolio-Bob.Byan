"use client";

import { BriefcaseIcon } from "./Icons";
import { useCmsContent } from "./useCmsContent";

export default function CareerHistory() {
  const { content } = useCmsContent();

  return (
    <section id="experience" className="pb-14 pt-12 sm:pb-20 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="px-4 text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900">Career History</h2>

        <div className="relative mt-8 sm:mt-10">
          <div className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 bg-slate-200 md:block" />

          <ul className="space-y-10 md:space-y-24">
            {content.experiences.map((item) => (
              <li key={item.id} className="relative">
                <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 md:block">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow ring-2 ring-white">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-violet-700 text-white">
                      <BriefcaseIcon />
                    </div>
                  </div>
                </div>

                <div className="absolute left-1/2 top-2 hidden -translate-x-1/2 translate-y-[-130%] whitespace-nowrap text-sm text-slate-400 md:block">{item.period}</div>

                <div className={["mx-4 md:mx-0 md:w-[46%]", item.side === "left" ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"].join(" ")}>
                  <div className="rounded-xl bg-white p-5 shadow-md ring-1 ring-slate-200 sm:p-6">
                    <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{item.title}</h3>
                    <p className="mt-1 font-semibold text-slate-700">{item.company}</p>
                    <p className="mt-3 text-justify leading-relaxed text-slate-600 sm:mt-4">{item.description}</p>
                    <p className="mt-3 text-sm text-slate-400 md:hidden">{item.period}</p>
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
