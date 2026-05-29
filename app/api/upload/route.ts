import { NextRequest } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api";

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return jsonError("No file provided", 400);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return jsonError(
        "Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET, or use an image URL instead.",
        503
      );
    }

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: uploadForm,
    });

    if (!response.ok) {
      return jsonError("Upload failed", 500);
    }

    const data = await response.json();
    return jsonOk({ url: data.secure_url as string });
  } catch {
    return jsonError("Upload failed", 500);
  }
}
