import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import Contact from "@/models/Contact";
import { jsonOk, jsonError } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const { id } = await context.params;
    const { read } = await req.json();

    await connectDB();

    const message = await Contact.findByIdAndUpdate(id, { read: Boolean(read) }, { new: true }).lean();
    if (!message) return jsonError("Message not found", 404);

    return jsonOk({
      message: {
        id: String(message._id),
        read: message.read,
      },
    });
  } catch {
    return jsonError("Failed to update message", 500);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const { id } = await context.params;
    await connectDB();
    await Contact.findByIdAndDelete(id);
    return jsonOk({ success: true });
  } catch {
    return jsonError("Failed to delete message", 500);
  }
}
