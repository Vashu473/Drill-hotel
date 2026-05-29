"use client";

import { useEffect, useState, type FormEvent, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Plus, Trash2, Upload } from "lucide-react";
import type { GalleryItemData } from "@/lib/fetchers";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [alt, setAlt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => setImages(d.images ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("alt", alt);

    try {
      const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Upload failed");
        return;
      }

      toast.success("Photo added");
      setAlt("");
      setImageFile(null);
      setPreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      load();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    } else {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-cream">Gallery Manager</h1>
      <p className="mt-1 text-muted">Upload and manage restaurant photos (Multer local storage)</p>

      <form onSubmit={handleAdd} className="mt-8 rounded-sm border border-gold/10 bg-charcoal-light p-6">
        <h2 className="mb-4 font-display text-lg font-semibold text-cream">Add Photo</h2>

        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-gold/30 px-6 py-8 text-sm text-gold hover:bg-gold/5">
          <Upload size={20} />
          {uploading ? "Uploading..." : "Choose image from device"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>

        {preview && (
          <div className="relative mx-auto mt-4 aspect-video max-w-sm overflow-hidden rounded-sm">
            <Image src={preview} alt="Preview" fill className="object-cover" sizes="400px" unoptimized />
          </div>
        )}

        <input
          placeholder="Alt text (optional)"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className="mt-4 w-full rounded-sm border border-gold/15 bg-charcoal px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
        />

        <button
          type="submit"
          disabled={uploading || !imageFile}
          className="mt-4 flex items-center gap-2 rounded-sm bg-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-charcoal hover:bg-gold-light disabled:opacity-50"
        >
          <Plus size={16} />
          Add to Gallery
        </button>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <div key={img.id} className="overflow-hidden rounded-sm border border-gold/10">
            <div className="relative aspect-[4/3]">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="400px" />
            </div>
            <div className="flex items-center justify-between bg-charcoal-light p-3">
              <span className="truncate text-sm text-muted">{img.alt}</span>
              <button
                onClick={() => handleDelete(img.id)}
                className="rounded-sm p-2 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
