"use client";

import Image from "next/image";
import { useCmsContent } from "./useCmsContent";

export default function AboutSection() {
  const { content } = useCmsContent();
  const { profile } = content;
  const groupedSkills = new Map<number, typeof content.skills>();

  for (const skill of content.skills.filter((item) => item.section === "stack")) {
    groupedSkills.set(skill.groupIndex, [...(groupedSkills.get(skill.groupIndex) ?? []), skill]);
  }

  const skillGroups = Array.from(groupedSkills)
    .sort(([left], [right]) => left - right)
    .map(([, skills]) => skills.sort((left, right) => left.sortOrder - right.sortOrder));

  return (
    <section id="about" className="mx-auto max-w-7xl pb-14 pt-12 sm:pb-20 sm:pt-16">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#eaf5ff] px-4 py-10 shadow-sm ring-1 ring-sky-100 sm:px-6 sm:py-14 lg:px-12">
        <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full border border-sky-200/70" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full border border-sky-200/70" />

        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div className="relative mx-auto w-[260px] sm:w-[380px]">
            <div className="absolute -left-6 bottom-10 h-24 w-24 rounded-full bg-indigo-800/90" />
            <div className="absolute -left-2 bottom-24 h-32 w-24 rounded-full bg-indigo-400/50" />
            <div className="relative overflow-hidden rounded-[2rem] bg-white/70 p-2 shadow-sm backdrop-blur">
              <div className="overflow-hidden rounded-[1.6rem]">
                <Image src={profile.aboutImage} alt={profile.fullName} width={760} height={880} sizes="(min-width:1024px) 380px, (min-width:640px) 320px, 260px" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900">About Me</h2>
            <p className="mt-3 max-w-2xl text-justify leading-relaxed text-slate-600">{profile.aboutText}</p>

            <p className="mt-4 text-slate-700">Here are the Technology Stacks that I am good at:</p>

            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((col, i) => (
                <ul key={i} className="space-y-3">
                  {col.map((skill) => (
                    <li key={skill.id} className="relative pl-5 text-[15px] text-slate-800 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:text-sky-500 before:content-['▸']">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
