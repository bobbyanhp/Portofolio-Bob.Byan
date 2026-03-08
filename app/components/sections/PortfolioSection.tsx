import Image from "next/image";
import { portfolioItems } from "@/app/lib/portfolio-data";

type WorkCardProps = {
  img: string;
  tag?: string;
  title: string;
  url?: string;
};

function WorkCard({ img, tag, title, url }: WorkCardProps) {
  const card = (
    <article className="group rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
        <Image src={img} alt={title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
      </div>
      <div className="p-4">
        {tag ? <span className="text-xs font-semibold text-amber-600">{tag}</span> : null}
        <h3 className="mt-1 text-base font-semibold text-slate-900 group-hover:text-indigo-700">{title}</h3>
      </div>
    </article>
  );

  if (!url) {
    return card;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={title} className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400" title={title}>
      {card}
    </a>
  );
}

export default function PortfolioSection() {
  return (
    <section className="pb-20 pt-12" id="portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-slate-900">My Portfolio</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Explore a collection of my several projects, each crafted to deliver seamless, user-centred experiences.</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <WorkCard key={item.id} img={item.img} tag={item.tag} title={item.title} url={item.url} />
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
