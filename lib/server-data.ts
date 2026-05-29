import { connectDB } from "@/lib/db";
import { seedDatabaseIfEmpty } from "@/lib/seed";
import MenuItem from "@/models/MenuItem";
import Gallery from "@/models/Gallery";
import {
  menuItems as fallbackMenu,
  galleryImages as fallbackGallery,
} from "@/lib/data";
import type { GalleryItemData, MenuItemData } from "@/lib/fetchers";

export async function getMenuItems(): Promise<MenuItemData[]> {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();
    const items = await MenuItem.find().sort({ createdAt: 1 }).lean();
    if (items.length === 0) return mapFallbackMenu();

    return items.map((item) => ({
      id: String(item._id),
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      popular: item.popular,
      description: item.description,
    }));
  } catch {
    return mapFallbackMenu();
  }
}

export async function getGalleryImages(): Promise<GalleryItemData[]> {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();
    const images = await Gallery.find().sort({ uploadedAt: -1 }).lean();
    if (images.length === 0) return mapFallbackGallery();

    return images.map((img) => ({
      id: String(img._id),
      src: img.image,
      alt: img.alt,
    }));
  } catch {
    return mapFallbackGallery();
  }
}

function mapFallbackMenu(): MenuItemData[] {
  return fallbackMenu.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    category: item.category,
    popular: item.popular,
    description: item.description,
  }));
}

function mapFallbackGallery(): GalleryItemData[] {
  return fallbackGallery.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
  }));
}
