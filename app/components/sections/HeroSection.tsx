import Image from "next/image";
import { socialLinks } from "@/app/lib/portfolio-data";
import Sprinkles from "@/app/components/ui/Sprinkles";

const socialIcons = {
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.24 8.03h4.9V24H.24V8.03zM8 8h4.7v2.2h.1C13.5 8.9 15.2 7.5 17.7 7.5c5.2 0 6.2 3.4 6.2 7.9V24h-4.9v-7.9c0-1.9 0-4.4-2.7-4.4s-3.1 2.1-3.1 4.2V24H8V8z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.19-3.37-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.41.2 2.45.1 2.71.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.69.92.69 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  ),
} as const;

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-[#eaf5ff] shadow-sm">
      <nav className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-10">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-indigo-600" aria-hidden>
              <path d="M5 4h6v6H5zM13 12h6v6h-6z" fill="currentColor" />
              <path d="M5 14h6v6H5zM13 4h6v6h-6z" fill="currentColor" opacity=".35" />
            </svg>
          </div>
        </div>

        <a
          href="https://drive.google.com/file/d/1LudW7KcUZPiI6hibKvVeQH8OiGmm-3cb/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:px-5"
        >
          CV
        </a>
      </nav>

      <section className="relative grid gap-8 px-4 pb-10 pt-2 sm:px-6 md:grid-cols-2 md:gap-0 md:px-10 md:pb-16">
        <div className="z-10 max-w-xl py-6 sm:py-10">
          <p className="font-semibold text-slate-700">Hi I&apos;m</p>
          <h1 className="mt-2 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-indigo-800">
            Bob Byan Handoko Putra
          </h1>
          <p className="mt-4 max-w-prose text-slate-600 sm:mt-6">I&apos;m a software developer based in West Java, specializing in building amazing websites, and everything in between.</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
            <a
              href="https://wa.me/6282120569078?text=Hai%20saya%20tertarik%20untuk%20diskusi%20%F0%9F%91%8B"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-indigo-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:px-6"
            >
              Contact Me
            </a>

            <a href="#portfolio" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-400 sm:px-6">
              Portfolio
            </a>
          </div>
        </div>

        <div className="relative order-first md:order-none">
          <div className="absolute inset-0 -right-28 top-6 hidden md:block" aria-hidden>
            <div className="absolute right-16 top-8 h-[520px] w-[520px] rounded-full border border-slate-300/60" />
            <div className="absolute right-8 top-20 h-[440px] w-[440px] rounded-full border border-slate-300/50" />
            <div className="absolute right-0 top-28 h-[360px] w-[360px] rounded-full border border-slate-300/40" />
          </div>

          <div className="relative z-10 mx-auto mt-4 w-[260px] min-[480px]:w-[300px] sm:w-[360px] md:w-[420px]">
            <div className="relative rounded-[2rem] bg-white/60 p-2 shadow-sm backdrop-blur">
              <div className="overflow-hidden rounded-[1.6rem]">
                <Image src="/assets/bob.jpg" alt="Bob Byan portrait" width={840} height={980} priority sizes="(min-width:1024px) 420px, (min-width:640px) 360px, 260px" className="h-auto w-full object-cover" />
              </div>
            </div>

            <div className="absolute -right-3 bottom-4 hidden md:block sm:-right-5 sm:bottom-6">
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2 shadow-lg">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    aria-label={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-8 w-8 place-items-center rounded-full bg-[#eaf5ff] text-slate-700 hover:ring-2 hover:ring-indigo-200"
                    title={social.label}
                  >
                    {socialIcons[social.icon]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Sprinkles className="absolute left-4 top-1/3 hidden md:block" />
        <Sprinkles className="absolute right-8 top-20 hidden rotate-12 md:block" />
      </section>
    </div>
  );
}
