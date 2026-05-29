"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Check, X, Trash2 } from "lucide-react";
import type { ReservationData } from "@/lib/fetchers";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/reservations")
      .then((r) => r.json())
      .then((d) => setReservations(d.reservations ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      toast.success(`Reservation ${status}`);
      load();
    } else {
      toast.error("Update failed");
    }
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("Delete this reservation?")) return;
    const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    }
  };

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-cream">Reservations</h1>
      <p className="mt-1 text-muted">Manage customer bookings</p>

      <div className="mt-8 overflow-x-auto rounded-sm border border-gold/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gold/10 bg-charcoal-light">
            <tr>
              <th className="px-4 py-3 font-medium text-muted">Name</th>
              <th className="px-4 py-3 font-medium text-muted">Phone</th>
              <th className="px-4 py-3 font-medium text-muted">Date & Time</th>
              <th className="px-4 py-3 font-medium text-muted">Guests</th>
              <th className="px-4 py-3 font-medium text-muted">Notes</th>
              <th className="px-4 py-3 font-medium text-muted">Status</th>
              <th className="px-4 py-3 font-medium text-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-muted">
                  No reservations yet
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr key={r.id} className="border-b border-gold/5">
                  <td className="px-4 py-3 font-medium text-cream">{r.name}</td>
                  <td className="px-4 py-3 text-muted">{r.phone}</td>
                  <td className="px-4 py-3 text-muted">
                    {r.date}
                    <br />
                    <span className="text-xs">{r.time}</span>
                  </td>
                  <td className="px-4 py-3 text-muted">{r.guests}</td>
                  <td className="max-w-[150px] truncate px-4 py-3 text-muted">{r.notes || "—"}</td>
                  <td className="px-4 py-3 capitalize text-cream">{r.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {r.status !== "confirmed" && (
                        <button
                          onClick={() => updateStatus(r.id, "confirmed")}
                          className="rounded-sm bg-green-500/15 p-2 text-green-400 hover:bg-green-500/25"
                          title="Confirm"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {r.status !== "cancelled" && (
                        <button
                          onClick={() => updateStatus(r.id, "cancelled")}
                          className="rounded-sm bg-red-500/15 p-2 text-red-400 hover:bg-red-500/25"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteReservation(r.id)}
                        className="rounded-sm bg-charcoal p-2 text-muted hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
