import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-api";
import { runMiddleware } from "@/lib/run-middleware";
import { menuUpload, getPublicUrl } from "@/lib/multer";
import { getUploadedFile } from "@/lib/multer-request";
import MenuItem from "@/models/MenuItem";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdmin(req, res)) return;

  try {
    await runMiddleware(req, res, menuUpload.single("image"));
    await connectDB();

    const file = getUploadedFile(req);
    const { name, price, category, popular, description } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "Name, price, and category are required" });
    }

    if (!file) {
      return res.status(400).json({ error: "Food image is required" });
    }

    const image = getPublicUrl("menu", file.filename);

    const item = await MenuItem.create({
      name: String(name).trim(),
      price: Number(price),
      image,
      category: String(category).trim(),
      popular: popular === "true" || popular === true,
      description: description ? String(description).trim() : "",
    });

    return res.status(201).json({
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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create menu item";
    return res.status(500).json({ error: message });
  }
}
