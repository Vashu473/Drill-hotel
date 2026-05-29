import MenuItem from "@/models/MenuItem";
import Gallery from "@/models/Gallery";
import { menuItems as defaultMenu, galleryImages as defaultGallery } from "@/lib/data";

export async function seedDatabaseIfEmpty() {
  const menuCount = await MenuItem.countDocuments();
  if (menuCount === 0) {
    await MenuItem.insertMany(
      defaultMenu.map((item) => ({
        name: item.name,
        price: item.price,
        category: item.category,
        popular: item.popular,
        description: item.description,
        image: item.image,
      }))
    );
  }

  const galleryCount = await Gallery.countDocuments();
  if (galleryCount === 0) {
    await Gallery.insertMany(
      defaultGallery.map((img) => ({
        image: img.src,
        alt: img.alt,
      }))
    );
  }
}
