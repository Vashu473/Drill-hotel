export interface MenuItemData {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  description: string;
}

export interface GalleryItemData {
  id: string;
  src: string;
  alt: string;
}

export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: string;
}

export async function fetchMenu(): Promise<MenuItemData[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/menu`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items ?? [];
  } catch {
    return [];
  }
}

export async function fetchGallery(): Promise<GalleryItemData[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/gallery`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.images ?? [];
  } catch {
    return [];
  }
}
