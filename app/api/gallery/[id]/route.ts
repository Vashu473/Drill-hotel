import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import Gallery from "@/models/Gallery";
import { jsonOk, jsonError } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, context: RouteContext) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const { id } = await context.params;
    await connectDB();
    await Gallery.findByIdAndDelete(id);
    return jsonOk({ success: true });
  } catch {
    return jsonError("Failed to delete gallery image", 500);
  }
}
