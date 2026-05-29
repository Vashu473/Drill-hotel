import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import { deleteLocalFile } from "@/lib/files";
import Gallery from "@/models/Gallery";
import { jsonOk, jsonError } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, context: RouteContext) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const { id } = await context.params;
    await connectDB();

    const entry = await Gallery.findById(id);
    if (!entry) return jsonError("Gallery image not found", 404);

    deleteLocalFile(entry.image);
    await Gallery.findByIdAndDelete(id);

    return jsonOk({ success: true });
  } catch {
    return jsonError("Failed to delete gallery image", 500);
  }
}
