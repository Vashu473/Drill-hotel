import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-api";
import { runMiddleware } from "@/lib/run-middleware";
import { menuUpload, getPublicUrl } from "@/lib/multer";
import { deleteLocalFile } from "@/lib/files";
import { getUploadedFile } from "@/lib/multer-request";
import MenuItem from "@/models/MenuItem";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdmin(req, res)) return;

  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    await connectDB();

    if (req.method === "PUT") {
      await runMiddleware(req, res, menuUpload.single("image"));

      const existing = await MenuItem.findById(id);
      if (!existing) return res.status(404).json({ error: "Menu item not found" });

      const { name, price, category, popular, description } = req.body;
      const file = getUploadedFile(req);

      if (file) {
        deleteLocalFile(existing.image);
        existing.image = getPublicUrl("menu", file.filename);
      }

      if (name != null) existing.name = String(name).trim();
      if (price != null) existing.price = Number(price);
      if (category != null) existing.category = String(category).trim();
      if (popular != null) existing.popular = popular === "true" || popular === true;
      if (description != null) existing.description = String(description).trim();

      await existing.save();

      return res.status(200).json({
        item: {
          id: String(existing._id),
          name: existing.name,
          price: existing.price,
          image: existing.image,
          category: existing.category,
          popular: existing.popular,
          description: existing.description,
        },
      });
    }

    if (req.method === "DELETE") {
      const existing = await MenuItem.findById(id);
      if (!existing) return res.status(404).json({ error: "Menu item not found" });

      deleteLocalFile(existing.image);
      await MenuItem.findByIdAndDelete(id);

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    return res.status(500).json({ error: message });
  }
}
