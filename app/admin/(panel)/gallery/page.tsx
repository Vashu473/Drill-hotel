"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Plus, Trash2, Upload } from "lucide-react";
import type { GalleryItemData } from "@/lib/fetchers";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = () => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => setImages(d.images ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageUrl, alt }),
    });

    if (res.ok) {
      toast.success("Image added");
      setImageUrl("");
      setAlt("");
      load();
    } else {
      toast.error("Failed to add image");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.url);
        toast.success("Uploaded! Review and save below.");
      } else {
        toast.error(data.error || "Upload failed");
      }
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
    }
  };

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-cream">Gallery Manager</h1>
      <p className="mt-1 text-muted">Upload and manage restaurant photos</p>

      <form onSubmit={handleAdd} className="mt-8 rounded-sm border border-gold/10 bg-charcoal-light p-6">
        <h2 className="mb-4 font-display text-lg font-semibold text-cream">Add Photo</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-gold/30 px-6 py-4 text-sm text-gold hover:bg-gold/5">
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload to Cloudinary"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="rounded-sm border border-gold/15 bg-charcoal px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
          />
          <input
            placeholder="Alt text (optional)"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="rounded-sm border border-gold/15 bg-charcoal px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
          />
        </div>
        <button
          type="submit"
          className="mt-4 flex items-center gap-2 rounded-sm bg-gold px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-charcoal hover:bg-gold-light"
        >
          <Plus size={16} />
          Add to Gallery
        </button>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <div key={img.id} className="group relative overflow-hidden rounded-sm border border-gold/10">
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
