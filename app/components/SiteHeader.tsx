"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Work Experience", href: "#experience" },
  { id: "portfolio", label: "Portfolio", href: "#portfolio" },
];

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");

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
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <a href="#home" className="shrink-0 text-xl font-black tracking-tight text-indigo-700 sm:text-2xl">
          Bob Byan Portfolio
        </a>

        <ul className="hidden items-center gap-8 text-sm font-bold text-slate-700 md:flex lg:gap-12">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={["block border-b-2 pb-2 transition-colors hover:text-indigo-700", activeSection === item.id ? "border-indigo-700 text-indigo-700" : "border-transparent"].join(" ")}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
