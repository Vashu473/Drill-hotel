import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
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

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const body = await req.json();
    const { name, price, image, category, popular, description } = body;

    if (!name || price == null || !image || !category) {
      return jsonError("Name, price, image, and category are required", 400);
    }

    await connectDB();

    const item = await MenuItem.create({
      name: String(name).trim(),
      price: Number(price),
      image: String(image).trim(),
      category: String(category).trim(),
      popular: Boolean(popular),
      description: description ? String(description).trim() : "",
    });

    return jsonOk(
      {
        item: {
          id: String(item._id),
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          popular: item.popular,
          description: item.description,
        },
      },
      201
    );
  } catch {
    return jsonError("Failed to create menu item", 500);
  }
}
