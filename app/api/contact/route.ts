import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { jsonOk, jsonError } from "@/lib/api";

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
