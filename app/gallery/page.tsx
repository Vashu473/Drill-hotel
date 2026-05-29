import SiteLayout from "@/components/layout/SiteLayout";
import GallerySection from "@/components/home/GallerySection";
import { getGalleryImages } from "@/lib/server-data";

export const metadata = {
  title: "Gallery | Deli Grill",
  description: "Photos of Deli Grill — ambiance, food, and the full dining experience.",
};

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();

  return (
    <SiteLayout>
      <GallerySection images={galleryImages} />
    </SiteLayout>
  );
}
