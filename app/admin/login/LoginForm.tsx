"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams?.get("error");
    if (error === "invalid") toast.error("Invalid Admin ID or password");
    if (error === "missing") toast.error("Please enter Admin ID and password");
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-sm border border-gold/20 bg-charcoal p-8 shadow-[0_0_60px_rgba(201,169,98,0.15)]">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-gold">Deli Grill</h1>
          <p className="mt-2 text-sm text-muted">Admin Panel Login</p>
        </div>

        <form method="POST" action="/api/auth/login" className="space-y-4">
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
              defaultValue="admin"
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
            className="w-full rounded-sm bg-gold py-3.5 text-sm font-semibold uppercase tracking-wider text-charcoal transition-all hover:bg-gold-light"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">Default: admin / deligrill2024</p>
      </div>
    </div>
  );
}
