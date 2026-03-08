import { careerItems } from "@/app/lib/portfolio-data";

export default function CareerSection() {
  return (
    <section className="pb-14 pt-12 sm:pb-20 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="px-4 text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900">Career History</h2>

        <div className="relative mt-8 sm:mt-10">
          <div className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 bg-slate-200 md:block" />

          <ul className="space-y-10 md:space-y-24">
            {careerItems.map((item, index) => (
              <li key={`${item.title}-${index}`} className="relative">
                <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 md:block">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow ring-2 ring-white">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-violet-700 text-white">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                        <path d="M6 7V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1h1a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1h1zm2-1h8v1H8V6zm-2 4h12v8H6v-8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="absolute left-1/2 top-2 hidden -translate-x-1/2 -translate-y-[130%] whitespace-nowrap text-sm text-slate-400 md:block">{item.period}</div>

                <div className={["mx-4 md:mx-0 md:w-[46%]", item.side === "left" ? "md:ml-0 md:mr-auto" : "md:mr-0 md:ml-auto"].join(" ")}>
                  <div className="rounded-xl bg-white p-5 shadow-md ring-1 ring-slate-200 sm:p-6">
                    <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{item.title}</h3>
                    <p className="mt-1 font-semibold text-slate-700">{item.company}</p>
                    <p className="mt-3 text-justify leading-relaxed text-slate-600 sm:mt-4">{item.summary}</p>
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
