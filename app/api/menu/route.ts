import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { seedDatabaseIfEmpty } from "@/lib/seed";
import MenuItem from "@/models/MenuItem";
import { jsonOk, jsonError } from "@/lib/api";

export async function GET() {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();

    const items = await MenuItem.find().sort({ createdAt: 1 }).lean();

    return jsonOk({
      items: items.map((item) => ({
        id: String(item._id),
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        popular: item.popular,
        description: item.description,
      })),
    });
  } catch {
    return jsonError("Failed to fetch menu", 500);
  }
}
