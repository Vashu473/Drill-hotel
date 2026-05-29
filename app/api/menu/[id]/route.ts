import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import MenuItem from "@/models/MenuItem";
import { jsonOk, jsonError } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, context: RouteContext) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const { id } = await context.params;
    const body = await req.json();

    await connectDB();

    const item = await MenuItem.findByIdAndUpdate(
      id,
      {
        ...(body.name != null && { name: String(body.name).trim() }),
        ...(body.price != null && { price: Number(body.price) }),
        ...(body.image != null && { image: String(body.image).trim() }),
        ...(body.category != null && { category: String(body.category).trim() }),
        ...(body.popular != null && { popular: Boolean(body.popular) }),
        ...(body.description != null && { description: String(body.description).trim() }),
      },
      { new: true }
    ).lean();

    if (!item) return jsonError("Menu item not found", 404);

    return jsonOk({
      item: {
        id: String(item._id),
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        popular: item.popular,
        description: item.description,
      },
    });
  } catch {
    return jsonError("Failed to update menu item", 500);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const { id } = await context.params;
    await connectDB();
    await MenuItem.findByIdAndDelete(id);
    return jsonOk({ success: true });
  } catch {
    return jsonError("Failed to delete menu item", 500);
  }
}
