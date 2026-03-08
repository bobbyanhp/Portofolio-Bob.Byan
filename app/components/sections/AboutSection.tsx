import Image from "next/image";
import { techStacks } from "@/app/lib/portfolio-data";

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative mx-auto w-[260px] min-[480px]:w-[320px] sm:w-[380px]">
          <div className="absolute -left-6 bottom-10 h-24 w-24 rounded-full bg-indigo-800/90" />
          <div className="absolute -left-2 bottom-24 h-32 w-24 rounded-full bg-indigo-400/50" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white/60 p-2 shadow-sm backdrop-blur">
            <div className="overflow-hidden rounded-[1.6rem]">
              <Image src="/assets/FOTO.jpg" alt="Bob Byan profile" width={760} height={880} sizes="(min-width:1024px) 380px, (min-width:640px) 320px, 260px" className="h-auto w-full object-cover" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900">About Me</h2>
          <p className="mt-3 max-w-2xl text-justify leading-relaxed text-slate-600">
            Fresh Graduate from National Institute of Technology Bandung, majoring in Informatics with a focus on data science and software engineering. I have valuable internship experience in system and data analysis, as well as expertise in
            Python for data science, SQL, Machine Learning, and Laravel. I am highly motivated to continue developing my skills in the fields I pursue. I can work under pressure, both individually and in a team. I am confident that my abilities
            can provide significant and tangible contributions.
          </p>

          <p className="mt-4 text-slate-700">Here are the Technology Stacks that I am good at:</p>

          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techStacks.map((column, index) => (
              <ul key={index} className="space-y-3">
                {column.map((tech) => (
                  <li key={tech} className="relative pl-5 text-[15px] text-slate-800 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:text-sky-500 before:content-['▸']">
                    {tech}
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
