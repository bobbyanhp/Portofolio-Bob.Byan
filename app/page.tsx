"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function Page() {
  return (
    <main className="min-h-screen bg-white antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Card container with big rounded corners */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#eaf5ff] shadow-sm">
          {/* Top Navigation */}
          <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-5">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-indigo-600">
                  <path d="M5 4h6v6H5zM13 12h6v6h-6z" fill="currentColor" />
                  <path d="M5 14h6v6H5zM13 4h6v6h-6z" fill="currentColor" opacity=".35" />
                </svg>
              </div>
            </div>

            <ul className="hidden md:flex items-center gap-8 text-sm text-slate-700">
              {[""].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-indigo-700">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="https://drive.google.com/file/d/1ZCHK6CzIJ2S1yQU4NzWDysU1jfyqbTR2/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-indigo-700 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              CV
            </a>
          </nav>

          {/* HERO */}
          <section className="relative grid gap-8 px-4 sm:px-6 md:px-10 pb-10 md:pb-16 pt-2 md:grid-cols-2 md:gap-0">
            {/* Left copy */}
            <div className="z-10 max-w-xl py-6 sm:py-10">
              <p className="text-slate-700 font-semibold">Hi I&apos;m</p>
              <h1 className="mt-2 font-extrabold leading-tight text-[clamp(2rem,5vw,3.5rem)] text-indigo-800">
                Bob Byan Handoko Putra
                <br />
                <span className="text-indigo-700"></span>
              </h1>
              <p className="mt-4 sm:mt-6 max-w-prose text-slate-600">I&apos;m a software developer based in West Java, specializing in building amazing websites, and everything in between.</p>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="https://wa.me/6282120569078?text=Hai%20saya%20tertarik%20untuk%20diskusi%20UI%2FUX%20%F0%9F%91%8B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-indigo-700 px-5 sm:px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Contact Me
                </a>

                <a href="#portfolio" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 sm:px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-400">
                  Portfolio
                </a>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative order-first md:order-none">
              {/* Concentric circles (hide on small) */}
              <div className="absolute inset-0 -right-28 top-6 hidden md:block" aria-hidden>
                <div className="absolute right-16 top-8 h-[520px] w-[520px] rounded-full border border-slate-300/60" />
                <div className="absolute right-8 top-20 h-[440px] w-[440px] rounded-full border border-slate-300/50" />
                <div className="absolute right-0 top-28 h-[360px] w-[360px] rounded-full border border-slate-300/40" />
              </div>

              {/* Person image */}
              <div className="relative z-10 mx-auto mt-4 w-[260px] xs:w-[300px] sm:w-[360px] md:w-[420px]">
                <div className="relative rounded-[2rem] bg-white/60 p-2 shadow-sm backdrop-blur">
                  <div className="overflow-hidden rounded-[1.6rem]">
                    <Image src="/assets/bob.jpg" alt="Designer photo" width={840} height={980} priority sizes="(min-width:1024px) 420px, (min-width:640px) 360px, 260px" className="h-auto w-full object-cover" />
                  </div>
                </div>

                {/* Social pill */}
                <div className="absolute -right-3 sm:-right-5 bottom-4 sm:bottom-6 hidden md:block">
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2 shadow-lg">
                    {[
                      {
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/in/bobbyanhp/",
                        icon: (
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                            <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.24 8.03h4.9V24H.24V8.03zM8 8h4.7v2.2h.1C13.5 8.9 15.2 7.5 17.7 7.5c5.2 0 6.2 3.4 6.2 7.9V24h-4.9v-7.9c0-1.9 0-4.4-2.7-4.4s-3.1 2.1-3.1 4.2V24H8V8z" />
                          </svg>
                        ),
                      },
                      {
                        label: "GitHub",
                        href: "https://github.com/bobbyanhp",
                        icon: (
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.41.2 2.45.1 2.71.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.69.92.69 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
                          </svg>
                        ),
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        aria-label={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-8 w-8 place-items-center rounded-full bg-[#eaf5ff] text-slate-700 hover:ring-2 hover:ring-indigo-200"
                        title={s.label}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative sprinkles */}
            <Sprinkles className="absolute left-4 top-1/3 hidden md:block" />
            <Sprinkles className="absolute right-8 top-20 hidden md:block rotate-12" />
          </section>
        </div>

        {/* About Me */}
        <AboutMe />

        {/* Career History */}
        <CareerHistory />

        {/* Portfolio */}
        <Portfolio />
      </div>
    </main>
  );
}

/* =======================
   About Me + Tech Points
   ======================= */
function AboutMe() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pt-16 sm:pb-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* Left: photo with blobs */}
        <div className="relative mx-auto w-[260px] xs:w-[320px] sm:w-[380px]">
          <div className="absolute -left-6 bottom-10 h-24 w-24 rounded-full bg-indigo-800/90" />
          <div className="absolute -left-2 bottom-24 h-32 w-24 rounded-full bg-indigo-400/50" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white/60 p-2 shadow-sm backdrop-blur">
            <div className="overflow-hidden rounded-[1.6rem]">
              <Image src="/assets/FOTO.jpg" alt="Designer photo" width={760} height={880} sizes="(min-width:1024px) 380px, (min-width:640px) 320px, 260px" className="h-auto w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Right: text + points */}
        <div>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900">About Me</h2>
          <p className="mt-3 max-w-2xl text-slate-600 text-justify leading-relaxed">
            Fresh Graduate from National Institute of Technology Bandung, majoring in Informatics with a focus on data science and software engineering. I have valuable internship experience in system and data analysis, as well as expertise
            in Python for data science, SQL, Machine Learning, and Laravel. I am highly motivated to continue developing my skills in the fields I pursue. I can work under pressure, both individually and in a team. I am confident that my
            abilities can provide significant and tangible contributions.
          </p>

          <p className="mt-4 text-slate-700">Here are the Technology Stacks that I am good at:</p>

          {/* Tech points */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["PHP", "Java", "JavaScript", "React", "Python", "Git"],
              ["HTML", "CSS", "Laravel", "Next.js", "MySQL", "MS Word"],
              ["MS Excel", "Visual Studio Code", "PyCharm", "Figma", "Canva", "Spreadsheets"],
            ].map((col, i) => (
              <ul key={i} className="space-y-3">
                {col.map((t) => (
                  <li key={t} className="relative pl-5 text-[15px] text-slate-800 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:text-sky-500 before:content-['▸']">
                    {t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =======================
   Career History (responsive)
   ======================= */
function CareerHistory() {
  const items = [
    {
      side: "left" as const,
      title: "Technical Data Administrator Intern",
      company: "PT. Perusahaan Listrik Negara (PLN) - Bandung, Indonesia ",
      tags: "processed and input data for electricity meter changes from analog to token for more than 200 customers per month, handled power increase and decrease requests for about 100 customers each month, and organized customer physical documents chronologically and systematically to streamline searching and archiving.",
      period: "January 2020 - March 2020",
    },
    {
      side: "right" as const,
      title: "Insurance Administration Part Time",
      company: "PT. Asuransi Allianz Utama - Bandung, Indonesia",
      tags: "Processed and entered travel insurance policy data for 50–70 customers each month, ensuring accuracy and completeness by cross-verifying information with agents and customers.",
      period: "January 2022 - January 2024",
    },
    {
      side: "left" as const,
      title: "Front-End Development Intern",
      company: "PT. Xirka Dama Persada - Bandung, Indonesia",
      tags: "Designed the UI for the Fish Feeder web app using HTML, CSS, and JavaScript, and developed a responsive layout optimized for desktop, tablet, and mobile.",
      period: "July 2024 - September 2024",
    },
    {
      side: "right" as const,
      title: "Full-stack Development Intern",
      company: "PT. Winnicode Garuda Teknologi - Bandung, Indonesia",
      tags: "Designed, developed, and implemented a full-stack news portal, participating end to end from conceptualization through launch while continuously analyzing the platform to identify opportunities for improvement and innovation.",
      period: "September 2024 - Desember 2024",
    },
  ];

  return (
    <section className="pt-12 pb-14 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="px-4 text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900">Career History</h2>

        <div className="relative mt-8 sm:mt-10">
          {/* vertical line only on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-slate-200" />

          <ul className="space-y-10 md:space-y-24">
            {items.map((it, idx) => (
              <li key={idx} className="relative">
                {/* Timeline icon md+ */}
                <div className="hidden md:block absolute left-1/2 top-0 z-10 -translate-x-1/2">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white shadow ring-2 ring-white">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-violet-700 text-white">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                        <path d="M6 7V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1h1a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1h1zm2-1h8v1H8V6zm-2 4h12v8H6v-8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Period text */}
                <div className="hidden md:block absolute left-1/2 top-2 -translate-x-1/2 translate-y-[-130%] whitespace-nowrap text-sm text-slate-400">{it.period}</div>

                {/* Card */}
                <div className={["mx-4 md:mx-0 md:w-[46%]", it.side === "left" ? "md:ml-0 md:mr-auto" : "md:mr-0 md:ml-auto"].join(" ")}>
                  <div className="rounded-xl bg-white p-5 sm:p-6 shadow-md ring-1 ring-slate-200">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{it.title}</h3>
                    <p className="mt-1 font-semibold text-slate-700">{it.company}</p>
                    {/* tags: justify */}
                    <p className="mt-3 sm:mt-4 text-slate-600 text-justify leading-relaxed">{it.tags}</p>
                    {/* period for mobile */}
                    <p className="md:hidden mt-3 text-sm text-slate-400">{it.period}</p>
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

/* =======================
   My Portfolio (clickable cards)
   ======================= */
function Portfolio() {
  // Tambahkan URL repo GitHub di tiap item
  const items = [
    { id: 1, title: "Website Save Dental AI", url: "https://github.com/bobbyanhp", tag: "", category: "", img: "/assets/savedental.jpg" },
    { id: 2, title: "Website Portal Berita Winni News Network", url: "https://github.com/bobbyanhp/wnn", tag: "", category: "", img: "/assets/winni.jpg" },
    { id: 3, title: "Website Fish Feeder", url: "https://github.com/bobbyanhp", tag: "", category: "", img: "/assets/fishfeed.jpg" },
  ];

  return (
    <section className="pt-12 pb-20" id="portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900">My Portfolio</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Explore a collection of my several projects, each crafted to deliver seamless, user-centred experiences.</p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <WorkCard key={it.id} img={it.img} tag={it.tag} title={it.title} url={it.url} />
          ))}
        </div>

        {/* Credit line */}
        <div className="mt-16 sm:mt-20 md:mt-24 text-center text-sm text-slate-600">
          A portfolio designed &amp; built by{" "}
          <a href="https://www.linkedin.com/in/bobbyanhp/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 hover:text-indigo-700">
            Bob Byan Handoko Putra
          </a>{" "}
          with <span className="align-middle">💜</span>
        </div>
      </div>
    </section>
  );
}

/* =======================
   WorkCard component (anchor wraps the whole card)
   ======================= */
function WorkCard({ img, tag, title, url }: { img: string; tag?: string; title: string; url?: string }) {
  const Card = (
    <article className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition group hover:shadow-md">
      <div className="overflow-hidden rounded-t-2xl relative aspect-[16/10]">
        <Image src={img} alt={title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
      </div>
      <div className="p-4">
        {tag && <span className="text-xs font-semibold text-amber-600">{tag}</span>}
        <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:text-indigo-700">{title}</h3>
      </div>
    </article>
  );

  // Jadikan seluruh kartu sebagai link ke GitHub
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={title} className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400" title={title}>
      {Card}
    </a>
  ) : (
    Card
  );
}

/* =======================
   Sprinkles deco
   ======================= */
function Sprinkles({ className = "" }: { className?: string }) {
  return (
    <div className={"pointer-events-none select-none text-cyan-500/70 " + className}>
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
        {Array.from({ length: 28 }).map((_, i) => {
          const x = (i * 23) % 120;
          const y = (i * 37) % 90;
          return <rect key={i} x={x} y={y} width="6" height="2" rx="1" ry="1" fill="currentColor" />;
        })}
      </svg>
    </div>
  );
}
