"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";
import { ArrowRightIcon, ExternalIcon } from "./Icons";
import { useCmsContent } from "./useCmsContent";

export default function PortfolioSection() {
  const { content } = useCmsContent();

  return (
    <section className="pb-20 pt-12" id="portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900">My Portfolio</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Explore a collection of my several projects, each crafted to deliver seamless, user-centred experiences.</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.projects.map((project) => (
            <WorkCard key={project.id} item={project} />
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-slate-600 sm:mt-20 md:mt-24">
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

function WorkCard({ item }: { item: Project }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
        <Image src={item.img} alt={item.title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">{item.role}</p>
        <h3 className="mt-2 text-lg font-extrabold text-slate-900 group-hover:text-indigo-700">{item.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 transition hover:text-sky-700">
            Link
            <ExternalIcon />
          </a>

          <a href={`/portfolio/${item.slug}`} className="inline-flex items-center gap-2 rounded-full bg-indigo-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-800">
            Details
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
