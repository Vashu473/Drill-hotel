import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import Reservation from "@/models/Reservation";
import { jsonOk, jsonError } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, guests, date, time, notes } = body;

    if (!name || !phone || !guests || !date || !time) {
      return jsonError("All required fields must be provided", 400);
    }

    await connectDB();

    const reservation = await Reservation.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      guests: Number(guests),
      date: String(date),
      time: String(time),
      notes: notes ? String(notes).trim() : "",
      status: "pending",
    });

    return jsonOk(
      {
        id: String(reservation._id),
        message: "Reservation request received",
      },
      201
    );
  } catch {
    return jsonError("Failed to create reservation", 500);
  }
}

export async function GET(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    await connectDB();
    const reservations = await Reservation.find().sort({ createdAt: -1 }).lean();

    return jsonOk({
      reservations: reservations.map((r) => ({
        id: String(r._id),
        name: r.name,
        phone: r.phone,
        guests: r.guests,
        date: r.date,
        time: r.time,
        notes: r.notes,
        status: r.status,
        createdAt: r.createdAt,
      })),
    });
  } catch {
    return jsonError("Failed to fetch reservations", 500);
  }
}
