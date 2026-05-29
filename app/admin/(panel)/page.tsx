"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/admin/StatCard";
import type { ReservationData } from "@/lib/fetchers";

interface DashboardData {
  stats: {
    totalReservations: number;
    todayReservations: number;
    totalMenu: number;
    totalGallery: number;
    unreadMessages: number;
  };
  latestReservations: ReservationData[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-muted">Loading dashboard...</p>;
  }

  const stats = data?.stats;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-cream">Dashboard</h1>
      <p className="mt-1 text-muted">Overview of your restaurant</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Reservations" value={stats?.totalReservations ?? 0} />
        <StatCard label="Today's Bookings" value={stats?.todayReservations ?? 0} />
        <StatCard label="Menu Items" value={stats?.totalMenu ?? 0} />
        <StatCard label="Gallery Photos" value={stats?.totalGallery ?? 0} />
        <Link href="/admin/messages">
          <StatCard
            label="Unread Messages"
            value={stats?.unreadMessages ?? 0}
            accent={(stats?.unreadMessages ?? 0) > 0 ? "text-yellow-400" : "text-gold"}
          />
        </Link>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-cream">Latest Reservations</h2>
          <Link href="/admin/reservations" className="text-sm text-gold hover:underline">
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto rounded-sm border border-gold/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gold/10 bg-charcoal-light">
              <tr>
                <th className="px-4 py-3 font-medium text-muted">Name</th>
                <th className="px-4 py-3 font-medium text-muted">Phone</th>
                <th className="px-4 py-3 font-medium text-muted">Date</th>
                <th className="px-4 py-3 font-medium text-muted">Guests</th>
                <th className="px-4 py-3 font-medium text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {(data?.latestReservations ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    No reservations yet
                  </td>
                </tr>
              ) : (
                data?.latestReservations.map((r) => (
                  <tr key={r.id} className="border-b border-gold/5 hover:bg-charcoal-light/50">
                    <td className="px-4 py-3 text-cream">{r.name}</td>
                    <td className="px-4 py-3 text-muted">{r.phone}</td>
                    <td className="px-4 py-3 text-muted">
                      {r.date} · {r.time}
                    </td>
                    <td className="px-4 py-3 text-muted">{r.guests}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-500/15 text-yellow-400",
    confirmed: "bg-green-500/15 text-green-400",
    cancelled: "bg-red-500/15 text-red-400",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colors[status] || ""}`}>
      {status}
    </span>
  );
}
