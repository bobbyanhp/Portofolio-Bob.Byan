"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { defaultCmsContent, validateCmsContent, type CmsSkill } from "@/data/cmsContent";
import type { Experience } from "@/data/experiences";
import type { Project, ProjectImage } from "@/data/projects";
import { useCmsContent } from "@/app/components/useCmsContent";
import { logout, saveCmsContent } from "./actions";
import ImageUploadField from "./ImageUploadField";

type Tab = "profile" | "skills" | "experiences" | "projects";

const tabs: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "experiences", label: "Career History" },
  { id: "projects", label: "Projects" },
];

export default function CmsDashboard({ adminEmail }: { adminEmail: string }) {
  const { content, isReady, setContent } = useCmsContent();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [draft, setDraft] = useState(content);
  const [notice, setNotice] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [isSaving, startSaving] = useTransition();

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const isDirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [content, draft]);

  useEffect(() => {
    function warnBeforeLeaving(event: BeforeUnloadEvent) {
      if (!isDirty) return;
      event.preventDefault();
    }

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [isDirty]);

  const counts = useMemo(
    () => ({
      profile: 1,
      skills: draft.skills.length,
      experiences: draft.experiences.length,
      projects: draft.projects.length,
    }),
    [draft],
  );

  function saveDraft() {
    const validationMessage = validateCmsContent(draft);
    if (validationMessage) {
      setNotice({ tone: "error", text: validationMessage });
      return;
    }

    startSaving(async () => {
      const result = await saveCmsContent(draft);

      if (!result.ok) {
        setNotice({ tone: "error", text: result.message });
        return;
      }

      setContent(draft);
      setNotice({ tone: "success", text: "Perubahan berhasil disimpan ke Supabase." });
    });
  }

  function discardDraft() {
    if (isDirty && !window.confirm("Buang semua perubahan yang belum disimpan?")) return;
    setDraft(content);
    setNotice(null);
  }

  function resetToDefault() {
    if (!window.confirm("Ganti draft dengan data bawaan? Perubahan baru tersimpan setelah menekan Save Changes.")) return;
    setDraft(defaultCmsContent);
    setNotice({ tone: "success", text: "Draft diisi data bawaan. Tekan Save Changes untuk menyimpan." });
  }

  if (!isReady) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 text-sm font-bold text-slate-500">Memuat CMS...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-600">CMS</p>
            <h1 className="mt-1 text-2xl font-black text-slate-950">Bob Byan Portofolio</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="self-center text-sm font-bold text-slate-500">{adminEmail}</span>
            <button type="button" onClick={resetToDefault} className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-50">
              Reset Content
            </button>
            <Link href="/" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700">
              View Site
            </Link>
            <form action={logout}>
              <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 border-y border-sky-200 bg-sky-50 px-4 py-4 text-sm text-sky-950 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-black">Supabase CMS</p>
            <p className="mt-1 text-sky-800">Konten publik dan perubahan dashboard tersimpan di database Supabase.</p>
          </div>
          <span className={["w-fit font-black", isDirty ? "text-amber-700" : "text-emerald-700"].join(" ")}>{isSaving ? "Saving..." : isDirty ? "Unsaved changes" : "All changes saved"}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={["rounded-2xl border p-5 text-left transition", activeTab === tab.id ? "border-indigo-200 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white hover:border-indigo-200"].join(" ")}
            >
              <p className="text-3xl font-black">{counts[tab.id]}</p>
              <p className="mt-2 font-black">{tab.label}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          {activeTab === "profile" && (
            <ProfileEditor
              content={draft}
              updateProfile={(patch) => setDraft({ ...draft, profile: { ...draft.profile, ...patch } })}
            />
          )}

          {activeTab === "skills" && (
            <SkillsEditor
              skills={draft.skills}
              setSkills={(skills) => setDraft({ ...draft, skills })}
            />
          )}

          {activeTab === "experiences" && (
            <ExperienceEditor
              experiences={draft.experiences}
              setExperiences={(experiences) => setDraft({ ...draft, experiences })}
            />
          )}

          {activeTab === "projects" && (
            <ProjectEditor
              projects={draft.projects}
              setProjects={(projects) => setDraft({ ...draft, projects })}
            />
          )}
        </div>

        <div className="sticky bottom-4 z-20 mt-6 flex flex-col gap-3 border border-slate-200 bg-white p-4 shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div aria-live="polite" className="min-h-5 text-sm font-bold">
            {notice && <span className={notice.tone === "success" ? "text-emerald-700" : "text-rose-700"}>{notice.text}</span>}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={discardDraft} disabled={!isDirty || isSaving} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-40">
              Discard
            </button>
            <button type="button" onClick={saveDraft} disabled={!isDirty || isSaving} className="rounded-xl bg-indigo-700 px-5 py-2 text-sm font-black text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:bg-slate-300">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileEditor({ content, updateProfile }: { content: ReturnType<typeof useCmsContent>["content"]; updateProfile: (patch: Partial<ReturnType<typeof useCmsContent>["content"]["profile"]>) => void }) {
  const linkedIn = content.profile.socials.find((social) => social.label === "LinkedIn")?.href ?? "";
  const gitHub = content.profile.socials.find((social) => social.label === "GitHub")?.href ?? "";

  function updateSocial(label: "LinkedIn" | "GitHub", href: string) {
    const nextSocials = content.profile.socials.map((social) => (social.label === label ? { ...social, href } : social));
    updateProfile({ socials: nextSocials });
  }

  return (
    <div>
      <SectionTitle title="Profile Content" description="Konten ini tampil di hero dan About Me." />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <TextInput label="id" value="main" onChange={() => undefined} disabled />
        <TextInput label="name" value={content.profile.name} onChange={(value) => updateProfile({ name: value })} />
        <TextInput label="full_name" value={content.profile.fullName} onChange={(value) => updateProfile({ fullName: value })} />
        <ImageUploadField label="hero_image_path" value={content.profile.heroImage} folder="profiles/hero" onChange={(heroImage) => updateProfile({ heroImage })} />
        <ImageUploadField label="about_image_path" value={content.profile.aboutImage} folder="profiles/about" onChange={(aboutImage) => updateProfile({ aboutImage })} />
        <TextInput label="cv_url" value={content.profile.cvUrl} onChange={(value) => updateProfile({ cvUrl: value })} />
        <TextInput label="linkedin_url" value={linkedIn} onChange={(value) => updateSocial("LinkedIn", value)} />
        <TextInput label="github_url" value={gitHub} onChange={(value) => updateSocial("GitHub", value)} />
      </div>
      <div className="mt-5 grid gap-5">
        <TextArea label="intro" value={content.profile.intro} onChange={(value) => updateProfile({ intro: value })} />
        <TextArea label="about_text" value={content.profile.aboutText} onChange={(value) => updateProfile({ aboutText: value })} />
      </div>
    </div>
  );
}

function SkillsEditor({ skills, setSkills }: { skills: CmsSkill[]; setSkills: (skills: CmsSkill[]) => void }) {
  function update(index: number, patch: Partial<CmsSkill>) {
    setSkills(skills.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionTitle title="Skills" description="Field mengikuti tabel public.skills." />
        <button type="button" onClick={() => setSkills([...skills, { id: crypto.randomUUID(), name: "New Skill", section: "stack", groupIndex: 0, sortOrder: skills.length }])} className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-black text-white hover:bg-indigo-800">
          Add Skill
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {skills.map((item, index) => (
          <article key={item.id} className="border border-slate-200 p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TextInput label="id" value={item.id} onChange={() => undefined} disabled />
              <TextInput label="name" value={item.name} onChange={(value) => update(index, { name: value })} />
              <label className="block">
                <span className="text-sm font-bold text-slate-700">section</span>
                <select value={item.section} onChange={(event) => update(index, { section: event.target.value as CmsSkill["section"] })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100">
                  <option value="hero">hero</option>
                  <option value="stack">stack</option>
                </select>
              </label>
              <NumberInput label="group_index" value={item.groupIndex} onChange={(value) => update(index, { groupIndex: value })} />
              <NumberInput label="sort_order" value={item.sortOrder} onChange={(value) => update(index, { sortOrder: value })} />
            </div>
            <button type="button" onClick={() => window.confirm(`Hapus skill ${item.name}?`) && setSkills(skills.filter((_, itemIndex) => itemIndex !== index))} className="mt-4 rounded-xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50">
              Delete
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function ExperienceEditor({ experiences, setExperiences }: { experiences: Experience[]; setExperiences: (experiences: Experience[]) => void }) {
  function update(index: number, patch: Partial<Experience>) {
    setExperiences(experiences.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionTitle title="Career History CRUD" description="Tambah, ubah, hapus, dan atur konten pengalaman kerja." />
        <button
          type="button"
          onClick={() =>
            setExperiences([
              ...experiences,
              { id: crypto.randomUUID(), side: "left", title: "New Experience", company: "", description: "", period: "", sortOrder: experiences.length, published: false },
            ])
          }
          className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-black text-white hover:bg-indigo-800"
        >
          Add Experience
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {experiences.map((item, index) => (
          <article key={item.id} className="border border-slate-200 p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TextInput label="id" value={item.id} onChange={() => undefined} disabled />
              <TextInput label="title" value={item.title} onChange={(value) => update(index, { title: value })} />
              <TextInput label="company" value={item.company} onChange={(value) => update(index, { company: value })} />
              <TextInput label="period" value={item.period} onChange={(value) => update(index, { period: value })} />
              <label className="block">
                <span className="text-sm font-bold text-slate-700">timeline_side</span>
                <select value={item.side} onChange={(event) => update(index, { side: event.target.value as Experience["side"] })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100">
                  <option value="left">left</option>
                  <option value="right">right</option>
                </select>
              </label>
              <NumberInput label="sort_order" value={item.sortOrder} onChange={(value) => update(index, { sortOrder: value })} />
              <CheckboxInput label="published" checked={item.published} onChange={(published) => update(index, { published })} />
            </div>
            <div className="mt-4">
              <TextArea label="description" value={item.description} onChange={(value) => update(index, { description: value })} />
            </div>
            <button type="button" onClick={() => window.confirm(`Hapus pengalaman ${item.title}?`) && setExperiences(experiences.filter((_, itemIndex) => itemIndex !== index))} className="mt-4 rounded-xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50">
              Delete
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectEditor({ projects, setProjects }: { projects: Project[]; setProjects: (projects: Project[]) => void }) {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  function update(index: number, patch: Partial<Project>) {
    setProjects(projects.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  function updateGallery(projectIndex: number, imageIndex: number, patch: Partial<ProjectImage>) {
    const project = projects[projectIndex];
    update(projectIndex, {
      gallery: project.gallery.map((image, currentIndex) => (currentIndex === imageIndex ? { ...image, ...patch } : image)),
    });
  }

  function addProject() {
    const projectId = crypto.randomUUID();
    setProjects([
      {
        id: projectId,
        slug: `project-${Date.now()}`,
        title: "New Project",
        url: "",
        img: "/assets/savedental.jpg",
        summary: "",
        description: "",
        role: "Project Role",
        sortOrder: projects.length,
        published: false,
        gallery: [{ id: crypto.randomUUID(), path: "/assets/savedental.jpg", altText: "New Project preview", sortOrder: 0 }],
      },
      ...projects,
    ]);
    setExpandedProjectId(projectId);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionTitle title="Portfolio CRUD" description="Daftar ringkas project. Buka detail hanya saat diperlukan." />
        <button type="button" onClick={addProject} className="rounded-lg bg-indigo-700 px-4 py-2 text-sm font-black text-white hover:bg-indigo-800">
          Add Project
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {projects.map((item, index) => (
          <article key={item.id} className="border border-slate-200 bg-white">
            <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-black text-slate-950">{item.title}</h3>
                  <span className={item.published ? "text-xs font-bold text-emerald-700" : "text-xs font-bold text-amber-700"}>{item.published ? "Published" : "Draft"}</span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-500">/{item.slug} · order {item.sortOrder} · {item.gallery.length} images</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setExpandedProjectId(expandedProjectId === item.id ? null : item.id)} className="rounded-lg border border-indigo-200 px-3 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-50">
                  {expandedProjectId === item.id ? "Close Detail" : "Edit Detail"}
                </button>
                <Link href={`/portfolio/${item.slug}`} target="_blank" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-700">
                  View Detail
                </Link>
                <button type="button" onClick={() => window.confirm(`Hapus project ${item.title}?`) && setProjects(projects.filter((_, itemIndex) => itemIndex !== index))} className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50">
                  Delete
                </button>
              </div>
            </div>

            {expandedProjectId === item.id && (
              <div className="border-t border-slate-200 bg-slate-50/60 p-4 sm:p-5">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <TextInput label="id" value={item.id} onChange={() => undefined} disabled />
                  <TextInput label="slug" value={item.slug} onChange={(value) => update(index, { slug: slugify(value) })} />
                  <TextInput label="title" value={item.title} onChange={(value) => update(index, { title: value })} />
                  <TextInput label="role" value={item.role} onChange={(value) => update(index, { role: value })} />
                  <TextInput label="project_url" value={item.url} onChange={(value) => update(index, { url: value })} />
                  <ImageUploadField label="main_image_path" value={item.img} folder={`projects/${item.id}/main`} onChange={(img) => update(index, { img })} />
                  <NumberInput label="sort_order" value={item.sortOrder} onChange={(value) => update(index, { sortOrder: value })} />
                  <CheckboxInput label="published" checked={item.published} onChange={(published) => update(index, { published })} />
                </div>
                <div className="mt-4 grid gap-4">
                  <TextArea label="summary" value={item.summary} onChange={(value) => update(index, { summary: value })} />
                  <TextArea label="description" value={item.description} onChange={(value) => update(index, { description: value })} />
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="font-black text-slate-900">project_images</h4>
                    <button type="button" onClick={() => update(index, { gallery: [...item.gallery, { id: crypto.randomUUID(), path: "", altText: "", sortOrder: item.gallery.length }] })} className="rounded-lg border border-indigo-200 px-3 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-50">
                      Add Image
                    </button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {item.gallery.map((image, imageIndex) => (
                      <div key={image.id} className="bg-white p-4 ring-1 ring-slate-200">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <TextInput label="id" value={image.id} onChange={() => undefined} disabled />
                          <ImageUploadField label="storage_path" value={image.path} folder={`projects/${item.id}/gallery`} onChange={(path) => updateGallery(index, imageIndex, { path })} />
                          <TextInput label="alt_text" value={image.altText} onChange={(altText) => updateGallery(index, imageIndex, { altText })} />
                          <NumberInput label="sort_order" value={image.sortOrder} onChange={(sortOrder) => updateGallery(index, imageIndex, { sortOrder })} />
                        </div>
                        <button type="button" onClick={() => window.confirm("Hapus gambar gallery ini?") && update(index, { gallery: item.gallery.filter((_, currentIndex) => currentIndex !== imageIndex) })} className="mt-3 text-sm font-bold text-rose-700 hover:text-rose-900">
                          Delete Image
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function TextInput({ label, value, onChange, disabled = false }: { label: string; value: string; onChange: (value: string) => void; disabled?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60" />
    </label>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input type="number" min={0} step={1} value={value} onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" />
    </label>
  );
}

function CheckboxInput({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex min-h-[46px] items-center gap-3 self-end rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-indigo-700" />
      <span className="text-sm font-bold text-slate-700">{label}</span>
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" />
    </label>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
