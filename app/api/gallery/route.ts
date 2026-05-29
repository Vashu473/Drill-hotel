import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import { seedDatabaseIfEmpty } from "@/lib/seed";
import Gallery from "@/models/Gallery";
import { jsonOk, jsonError } from "@/lib/api";

export async function GET() {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();

    const images = await Gallery.find().sort({ uploadedAt: -1 }).lean();

    return jsonOk({
      images: images.map((img) => ({
        id: String(img._id),
        src: img.image,
        alt: img.alt,
        uploadedAt: img.uploadedAt,
      })),
    });
  } catch {
    return jsonError("Failed to fetch gallery", 500);
  }
}

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

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
