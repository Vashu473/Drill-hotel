import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import Reservation from "@/models/Reservation";
import Contact from "@/models/Contact";
import MenuItem from "@/models/MenuItem";
import Gallery from "@/models/Gallery";
import { jsonOk, jsonError } from "@/lib/api";

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);

  try {
    await connectDB();

    const today = new Date().toISOString().split("T")[0];

    const [totalReservations, todayReservations, latestReservations, totalMenu, totalGallery, unreadMessages] =
      await Promise.all([
        Reservation.countDocuments(),
        Reservation.countDocuments({ date: today, status: { $ne: "cancelled" } }),
        Reservation.find().sort({ createdAt: -1 }).limit(5).lean(),
        MenuItem.countDocuments(),
        Gallery.countDocuments(),
        Contact.countDocuments({ read: false }),
      ]);

    return jsonOk({
      stats: {
        totalReservations,
        todayReservations,
        totalMenu,
        totalGallery,
        unreadMessages,
      },
      latestReservations: latestReservations.map((r) => ({
        id: String(r._id),
        name: r.name,
        phone: r.phone,
        guests: r.guests,
        date: r.date,
        time: r.time,
        status: r.status,
        createdAt: r.createdAt,
      })),
    });
  } catch {
    return jsonError("Failed to load dashboard", 500);
  }
}
