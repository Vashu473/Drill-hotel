import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import Reservation from "@/models/Reservation";
import { jsonOk, jsonError } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const { id } = await context.params;
    const { status } = await req.json();

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return jsonError("Invalid status", 400);
    }

    await connectDB();

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!reservation) return jsonError("Reservation not found", 404);

    return jsonOk({
      reservation: {
        id: String(reservation._id),
        name: reservation.name,
        phone: reservation.phone,
        guests: reservation.guests,
        date: reservation.date,
        time: reservation.time,
        notes: reservation.notes,
        status: reservation.status,
      },
    });
  } catch {
    return jsonError("Failed to update reservation", 500);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    const { id } = await context.params;
    await connectDB();
    await Reservation.findByIdAndDelete(id);
    return jsonOk({ success: true });
  } catch {
    return jsonError("Failed to delete reservation", 500);
  }
}
