"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const adminId = form.get("adminId") as string;
    const password = form.get("password") as string;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Welcome back!");
      router.push("/admin");
      router.refresh();
    } catch {
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-sm border border-gold/20 bg-charcoal p-8 shadow-[0_0_60px_rgba(201,169,98,0.1)]">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-gold">Deli Grill</h1>
          <p className="mt-2 text-sm text-muted">Admin Panel Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adminId" className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Admin ID
            </label>
            <input
              id="adminId"
              name="adminId"
              type="text"
              required
              autoComplete="username"
              placeholder="admin"
              className="w-full rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-gold py-3.5 text-sm font-semibold uppercase tracking-wider text-charcoal transition-all hover:bg-gold-light disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Default: admin / deligrill2024
        </p>
      </div>
    </div>
  );
}
