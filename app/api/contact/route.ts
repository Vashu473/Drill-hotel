import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import Contact from "@/models/Contact";
import { jsonOk, jsonError } from "@/lib/api";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    await connectDB();
    const messages = await Contact.find().sort({ createdAt: -1 }).lean();

    return jsonOk({
      messages: messages.map((m) => ({
        id: String(m._id),
        name: m.name,
        email: m.email,
        message: m.message,
        read: m.read,
        createdAt: m.createdAt,
      })),
    });
  } catch {
    return jsonError("Failed to fetch messages", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return jsonError("Name, email, and message are required", 400);
    }

    await connectDB();

    await Contact.create({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
    });

    return jsonOk({ message: "Message sent successfully" }, 201);
  } catch {
    return jsonError("Failed to send message", 500);
  }
}
