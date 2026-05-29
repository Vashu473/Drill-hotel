import { connectDB } from "@/lib/db";
import { isDemoMode, getStaticMenuItems, getStaticGalleryItems } from "@/lib/demo";
import { seedDatabaseIfEmpty } from "@/lib/seed";
import MenuItem from "@/models/MenuItem";
import Gallery from "@/models/Gallery";
import type { GalleryItemData, MenuItemData } from "@/lib/fetchers";
import { resolveMenuImage } from "@/lib/menu-images";

export async function getMenuItems(): Promise<MenuItemData[]> {
  if (isDemoMode()) return getStaticMenuItems();

  try {
    await connectDB();
    await seedDatabaseIfEmpty();
    const items = await MenuItem.find().sort({ createdAt: 1 }).lean();
    if (items.length === 0) return getStaticMenuItems();

    return items.map((item) => ({
      id: String(item._id),
      name: item.name,
      price: item.price,
      image: resolveMenuImage(item.image, item.name),
      category: item.category,
      popular: item.popular,
      description: item.description,
    }));
  } catch {
    return getStaticMenuItems();
  }
}

export async function getGalleryImages(): Promise<GalleryItemData[]> {
  if (isDemoMode()) return getStaticGalleryItems();

  try {
    await connectDB();
    await seedDatabaseIfEmpty();
    const images = await Gallery.find().sort({ uploadedAt: -1 }).lean();
    if (images.length === 0) return getStaticGalleryItems();

    return images.map((img) => ({
      id: String(img._id),
      src: img.image,
      alt: img.alt,
    }));
  } catch {
    return getStaticGalleryItems();
  }
}
