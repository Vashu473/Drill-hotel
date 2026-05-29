import { menuItems, galleryImages } from "@/lib/data";
import type { GalleryItemData, MenuItemData } from "@/lib/fetchers";

/** Demo until ENVIRONMENT=LIVE in .env — then MongoDB + real saves. */
export function isDemoMode(): boolean {
  return process.env.ENVIRONMENT?.trim().toUpperCase() !== "LIVE";
}

export function getStaticMenuItems(): MenuItemData[] {
  return menuItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    category: item.category,
    popular: item.popular,
    description: item.description,
  }));
}

export function getStaticGalleryItems(): GalleryItemData[] {
  return galleryImages.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
  }));
}

export const DEMO_WRITE_MESSAGE =
  "Preview mode: set ENVIRONMENT=LIVE and MongoDB to save changes.";
