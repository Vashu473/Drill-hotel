import HomePage from "@/components/HomePage";
import { getGalleryImages, getMenuItems } from "@/lib/server-data";

export default async function Page() {
  const [menuItems, galleryImages] = await Promise.all([getMenuItems(), getGalleryImages()]);

  return <HomePage initialMenu={menuItems} initialGallery={galleryImages} />;
}
