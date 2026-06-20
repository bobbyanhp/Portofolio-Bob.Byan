"use client";

import { useId, useMemo, useState, type ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/client";

const bucketName = "portfolio-assets";
const maxFileSize = 10 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export default function ImageUploadField({ label, value, folder, onChange }: { label: string; value: string; folder: string; onChange: (value: string) => void }) {
  const inputId = useId();
  const supabase = useMemo(() => createClient(), []);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!allowedTypes.has(file.type)) {
      setMessage({ tone: "error", text: "Gunakan gambar JPEG, PNG, WebP, atau GIF." });
      return;
    }

    if (file.size > maxFileSize) {
      setMessage({ tone: "error", text: "Ukuran gambar maksimum 10 MB." });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const objectPath = `${folder}/${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage.from(bucketName).upload(objectPath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

      if (error) {
        setMessage({ tone: "error", text: `Upload gagal: ${error.message}` });
        return;
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(objectPath);
      onChange(data.publicUrl);
      setMessage({ tone: "success", text: "Upload selesai. Tekan Save Changes untuk menyimpan URL." });
    } catch {
      setMessage({ tone: "error", text: "Upload gagal karena koneksi ke Supabase terputus." });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">{label.replaceAll("_", " ")}</p>
          <div className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-700">
            <span className={["h-2.5 w-2.5 rounded-full", value ? "bg-emerald-500" : "bg-slate-300"].join(" ")} />
            {value ? "Image available" : "No image selected"}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {value && (
            <a href={value} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-700">
              View
            </a>
          )}
          <label htmlFor={inputId} className={["cursor-pointer rounded-lg bg-indigo-700 px-3 py-2 text-sm font-black text-white hover:bg-indigo-800", isUploading ? "pointer-events-none opacity-50" : ""].join(" ")}>
            {isUploading ? "Uploading..." : value ? "Replace" : "Upload"}
          </label>
          {value && (
            <button type="button" onClick={() => onChange("")} disabled={isUploading} className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50">
              Clear
            </button>
          )}
        </div>
        <input id={inputId} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadImage} disabled={isUploading} className="sr-only" />
      </div>

      <div aria-live="polite" className={["mt-2 min-h-4 text-xs font-bold", message?.tone === "error" ? "text-rose-700" : "text-emerald-700"].join(" ")}>
        {message?.text}
      </div>
    </div>
  );
}
