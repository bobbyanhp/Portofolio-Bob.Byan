"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { ExternalIcon, GitHubIcon, LinkedInIcon } from "./Icons";
import { usePreferences } from "./PreferencesProvider";
import { useCmsContent } from "./useCmsContent";

export default function HeroSection() {
  const { content } = useCmsContent();
  const { t, translateText } = usePreferences();
  const { profile } = content;
  const heroSkills = content.skills
    .filter((skill) => skill.section === "hero")
    .sort((left, right) => left.sortOrder - right.sortOrder);
  const linkedIn = profile.socials.find((social) => social.label === "LinkedIn")?.href.trim() ?? "";
  const gitHub = profile.socials.find((social) => social.label === "GitHub")?.href.trim() ?? "";
  const cvUrl = profile.cvUrl.trim();

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-[#eaf5ff] shadow-sm transition-colors dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
      <section id="home" className="relative grid gap-8 px-4 pb-10 pt-2 sm:px-6 md:grid-cols-2 md:gap-0 md:px-10 md:pb-16">
        <div className="z-10 max-w-xl py-6 sm:py-10">
          <p className="font-semibold text-slate-700 dark:text-slate-300">{t("hiIm")}</p>
          <h1 className="mt-2 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-indigo-800 dark:text-indigo-300">{profile.name}</h1>
          <p className="mt-4 max-w-prose text-[clamp(1.35rem,2.8vw,2.1rem)] font-semibold leading-tight text-slate-800 sm:mt-6 dark:text-slate-100">{translateText(profile.intro)}</p>

          <div className="mt-7 flex max-w-3xl flex-wrap gap-3 sm:gap-4">
            {heroSkills.map((item) => (
              <span key={item.id} className="inline-flex items-center gap-3 rounded-full border-2 border-indigo-200/90 bg-white/45 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur sm:text-base dark:border-indigo-400/40 dark:bg-slate-950/45 dark:text-slate-200">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                {translateText(item.name)}
              </span>
            ))}
          </div>

          {cvUrl && (
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
              <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-lg border border-indigo-300/50 bg-indigo-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-700/20 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                CV
                <ExternalIcon />
              </a>
            </div>
          )}
        </div>

        <div className="relative order-first md:order-none">
          <div className="absolute inset-0 -right-28 top-6 hidden md:block" aria-hidden="true">
            <div className="absolute right-16 top-8 h-[520px] w-[520px] rounded-full border border-slate-300/60" />
            <div className="absolute right-8 top-20 h-[440px] w-[440px] rounded-full border border-slate-300/50" />
            <div className="absolute right-0 top-28 h-[360px] w-[360px] rounded-full border border-slate-300/40" />
          </div>

          <div className="relative z-10 mx-auto mt-4 w-[260px] sm:w-[360px] md:w-[420px]">
            <div className="relative rounded-[2rem] bg-white/60 p-2 shadow-sm backdrop-blur dark:bg-slate-800/80">
              <div className="overflow-hidden rounded-[1.6rem]">
                <Image src={profile.heroImage} alt={profile.fullName} width={840} height={980} priority sizes="(min-width:1024px) 420px, (min-width:640px) 360px, 260px" className="h-auto w-full object-cover" />
              </div>
            </div>

            {(linkedIn || gitHub) && (
              <div className="absolute -right-3 bottom-4 hidden sm:-right-5 sm:bottom-6 md:block">
                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2 shadow-lg dark:bg-slate-900">
                  {linkedIn && (
                    <SocialButton label="LinkedIn" href={linkedIn}>
                      <LinkedInIcon />
                    </SocialButton>
                  )}
                  {gitHub && (
                    <SocialButton label="GitHub" href={gitHub}>
                      <GitHubIcon />
                    </SocialButton>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function SocialButton({ label, href, children }: { label: string; href: string; children: ReactNode }) {
  return (
    <a aria-label={label} href={href} target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-full bg-[#eaf5ff] text-slate-700 hover:ring-2 hover:ring-indigo-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:ring-indigo-500" title={label}>
      {children}
    </a>
  );
}
