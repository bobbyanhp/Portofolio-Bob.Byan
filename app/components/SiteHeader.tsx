"use client";

import { useEffect, useState } from "react";
import { LanguageIcon, MoonIcon, SunIcon } from "./Icons";
import { usePreferences } from "./PreferencesProvider";

const navItems = [
  { id: "home", labelKey: "home", href: "#home" },
  { id: "about", labelKey: "about", href: "#about" },
  { id: "experience", labelKey: "experience", href: "#experience" },
  { id: "portfolio", labelKey: "portfolio", href: "#portfolio" },
] as const;

const themeLabels = {
  dark: "Light",
  light: "Dark",
} as const;

const languageLabels = {
  en: "ID",
  id: "EN",
} as const;

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const { language, theme, t, toggleLanguage, toggleTheme } = usePreferences();

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    function updateActiveSection() {
      const current = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;

          return {
            id,
            distance: Math.abs(element.getBoundingClientRect().top - 110),
            isPassed: element.getBoundingClientRect().top <= 140,
          };
        })
        .filter(Boolean)
        .filter((section) => section?.isPassed)
        .sort((a, b) => (a?.distance ?? 0) - (b?.distance ?? 0))[0];

      if (current?.id) {
        setActiveSection(current.id);
      }
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="min-w-0 shrink text-lg font-black tracking-tight text-indigo-700 dark:text-indigo-300 sm:text-2xl">
          <span className="block truncate">Bob Byan Portfolio</span>
        </a>

        <div className="flex shrink-0 items-center gap-4 lg:gap-8">
          <ul className="hidden items-center gap-8 text-sm font-bold text-slate-700 dark:text-slate-300 md:flex lg:gap-12">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={["block border-b-2 pb-2 transition-colors hover:text-indigo-700 dark:hover:text-indigo-300", activeSection === item.id ? "border-indigo-700 text-indigo-700 dark:border-indigo-300 dark:text-indigo-300" : "border-transparent"].join(" ")}
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleTheme} className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-200" aria-label="Toggle dark mode">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span className="hidden sm:inline">{themeLabels[theme]}</span>
            </button>
            <button type="button" onClick={toggleLanguage} className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-200" aria-label="Toggle language">
              <LanguageIcon />
              <span>{languageLabels[language]}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
