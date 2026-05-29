"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Flame } from "lucide-react";
import type { MenuItemData } from "@/lib/fetchers";
import { menuCategories } from "@/lib/data";

const categories = menuCategories.filter((c) => c !== "All");

const emptyForm = {
  name: "",
  price: "",
  image: "",
  category: "Signature",
  popular: false,
  description: "",
};

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: MenuItemData) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      price: String(item.price),
      image: item.image,
      category: item.category,
      popular: item.popular,
      description: item.description,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      image: form.image,
      category: form.category,
      popular: form.popular,
      description: form.description,
    };

    try {
      const res = editingId
        ? await fetch(`/api/menu/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) throw new Error();
      toast.success(editingId ? "Item updated" : "Item added");
      setModalOpen(false);
      load();
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    }
  };

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-cream">Menu Manager</h1>
          <p className="mt-1 text-muted">Add, edit, or remove menu items</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-sm bg-gold px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-charcoal hover:bg-gold-light"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-sm border border-gold/10 bg-charcoal-light">
            <div className="relative aspect-video">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="400px" />
              {item.popular && (
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-charcoal">
                  <Flame size={10} /> Popular
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-cream">{item.name}</h3>
                  <p className="text-sm text-muted">{item.category}</p>
                </div>
                <span className="font-semibold text-gold">${item.price.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="flex flex-1 items-center justify-center gap-1 rounded-sm border border-gold/20 py-2 text-sm text-gold hover:bg-gold/10"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-sm border border-red-500/20 px-3 py-2 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm border border-gold/20 bg-charcoal p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-cream">
                {editingId ? "Edit Item" : "Add Item"}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <X size={20} className="text-muted" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <input
                required
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
              />
              <textarea
                placeholder="Description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full resize-none rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
              />
              <label className="flex items-center gap-2 text-sm text-cream">
                <input
                  type="checkbox"
                  checked={form.popular}
                  onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                  className="accent-gold"
                />
                Mark as Popular
              </label>
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-sm bg-gold py-3 text-sm font-semibold uppercase tracking-wider text-charcoal disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update Item" : "Add Item"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
