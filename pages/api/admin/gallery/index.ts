import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-api";
import { runMiddleware } from "@/lib/run-middleware";
import { galleryUpload, getPublicUrl } from "@/lib/multer";
import { getUploadedFile } from "@/lib/multer-request";
import Gallery from "@/models/Gallery";
import { isDemoMode, DEMO_WRITE_MESSAGE } from "@/lib/demo";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!(await requireAdmin(req, res))) return;
  if (isDemoMode()) return res.status(503).json({ error: DEMO_WRITE_MESSAGE });

  try {
    await runMiddleware(req, res, galleryUpload.single("image"));
    await connectDB();

    const file = getUploadedFile(req);
    const { alt } = req.body;

    if (!file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const image = getPublicUrl("gallery", file.filename);

    const entry = await Gallery.create({
      image,
      alt: alt ? String(alt).trim() : "Gallery image",
      uploadedAt: new Date(),
    });

    return res.status(201).json({
      image: {
        id: String(entry._id),
        src: entry.image,
        alt: entry.alt,
        uploadedAt: entry.uploadedAt,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to add gallery image";
    return res.status(500).json({ error: message });
  }
}
