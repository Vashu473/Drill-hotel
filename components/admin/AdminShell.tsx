"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  Images,
  Mail,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarDays },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-gold/10 bg-charcoal lg:flex">
        <div className="border-b border-gold/10 p-6">
          <Link href="/admin" className="font-display text-2xl font-bold text-gold">
            Deli Grill
          </Link>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-sm px-4 py-3 text-sm transition-colors ${
                  active
                    ? "bg-gold/15 text-gold"
                    : "text-muted hover:bg-charcoal-light hover:text-cream"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gold/10 p-4">
          <Link
            href="/"
            target="_blank"
            className="mb-2 block px-4 py-2 text-sm text-muted hover:text-gold"
          >
            View Website →
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex h-full w-64 flex-col bg-charcoal">
            <div className="flex items-center justify-between border-b border-gold/10 p-4">
              <span className="font-display text-xl font-bold text-gold">Admin</span>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={22} className="text-cream" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-sm px-4 py-3 text-sm text-muted hover:text-gold"
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gold/10 bg-charcoal/50 px-6 py-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} className="text-cream" />
          </button>
          <span className="font-display text-lg font-bold text-gold">Admin</span>
          <button onClick={handleLogout}>
            <LogOut size={20} className="text-muted" />
          </button>
        </header>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
