"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ExternalIcon } from "@/app/components/Icons";
import { useCmsContent } from "@/app/components/useCmsContent";

export default function ProjectDetailClient({ id }: { id: string }) {
  const { content } = useCmsContent();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<string | null>(null);
  const project = content.projects.find((item) => item.slug === id);

  useEffect(() => {
    setSelectedImage(null);
    setShowImage(null);
  }, [id]);

  if (!project) {
    return (
      <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
        <section className="mx-auto max-w-3xl rounded-[1.5rem] bg-slate-50 p-8 ring-1 ring-slate-200">
          <a href="/#portfolio" className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-bold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700">
            <ArrowLeftIcon />
            Back
          </a>
          <h1 className="mt-8 text-3xl font-black text-slate-950">Project tidak ditemukan</h1>
          <p className="mt-3 text-slate-600">Project ini belum ada di data CMS browser ini.</p>
        </section>
      </main>
    );
  }

  const activeImage = selectedImage ?? project.img;
  const galleryImages = Array.from(new Set([project.img, ...project.gallery.map((image) => image.path)]));

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-4 text-slate-500">
          <a href="/#portfolio" className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-bold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700">
            <ArrowLeftIcon />
            Back
          </a>
          <span className="font-bold">Projects</span>
          <ArrowRightIcon />
          <span className="font-bold uppercase text-slate-900">{project.title}</span>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div>
            <h1 className="text-[clamp(3rem,7vw,5.8rem)] font-black uppercase leading-[0.92] tracking-normal text-slate-900">{project.title}</h1>
            <div className="mt-8 h-1.5 w-32 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 shadow-[0_10px_30px_rgba(79,70,229,0.25)]" />
            <p className="mt-10 max-w-3xl text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">{project.description}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <span className="rounded-full border border-indigo-100 bg-indigo-50 px-5 py-3 text-sm font-bold text-indigo-700">{project.role}</span>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-bold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100">
                Project Link
                <ExternalIcon />
              </a>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowImage(activeImage)}
              className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left shadow-xl shadow-slate-200/70 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              aria-label={`Show ${project.title} image`}
            >
              <Image src={activeImage} alt={`${project.title} preview`} fill priority sizes="(min-width:1024px) 620px, 90vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" />
              <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200">Show</span>
            </button>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(image)}
                  onDoubleClick={() => setShowImage(image)}
                  className={["relative aspect-[16/9] overflow-hidden rounded-xl border bg-slate-50 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-100", activeImage === image ? "border-indigo-500 ring-2 ring-indigo-100" : "border-slate-200 hover:border-indigo-300"].join(" ")}
                  aria-label={`Select ${project.title} gallery ${index + 1}`}
                >
                  <Image src={image} alt={`${project.title} gallery ${index + 1}`} fill sizes="(min-width:1024px) 150px, 45vw" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showImage && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <button type="button" aria-label="Close image preview" onClick={() => setShowImage(null)} className="absolute inset-0 cursor-default" />
          <div className="relative z-10 w-full max-w-6xl">
            <button type="button" onClick={() => setShowImage(null)} className="mb-4 rounded-full bg-white px-5 py-2 text-sm font-black text-slate-900 shadow-sm">
              Close
            </button>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white shadow-2xl">
              <Image src={showImage} alt={`${project.title} full preview`} fill sizes="95vw" className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
