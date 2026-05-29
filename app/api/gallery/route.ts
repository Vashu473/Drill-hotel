import { NextRequest } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";
import { getGalleryImages } from "@/lib/server-data";
import { isDemoMode, DEMO_WRITE_MESSAGE } from "@/lib/demo";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/Gallery";
import { jsonOk, jsonError } from "@/lib/api";

export async function GET() {
  const images = await getGalleryImages();
  return jsonOk({
    images: images.map((img) => ({
      id: img.id,
      src: img.src,
      alt: img.alt,
    })),
  });
}

export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  if (isDemoMode()) return jsonError(DEMO_WRITE_MESSAGE, 503);

  try {
    const body = await req.json();
    const { image, alt } = body;

    if (!image) return jsonError("Image URL is required", 400);

    await connectDB();

    const entry = await Gallery.create({
      image: String(image).trim(),
      alt: alt ? String(alt).trim() : "Gallery image",
      uploadedAt: new Date(),
    });

    return jsonOk(
      {
        image: {
          id: String(entry._id),
          src: entry.image,
          alt: entry.alt,
          uploadedAt: entry.uploadedAt,
        },
      },
      201
    );
  } catch {
    return jsonError("Failed to add gallery image", 500);
  }
}
