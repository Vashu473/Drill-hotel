import { NextRequest, NextResponse } from "next/server";
import {
  validateAdminCredentials,
  signToken,
  COOKIE_NAME,
  authCookieOptions,
} from "@/lib/auth";
import { jsonError } from "@/lib/api";

async function parseCredentials(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await req.json();
    return { adminId: body.adminId as string, password: body.password as string };
  }

  const form = await req.formData();
  return {
    adminId: form.get("adminId") as string,
    password: form.get("password") as string,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { adminId, password } = await parseCredentials(req);
    const wantsJson = req.headers.get("accept")?.includes("application/json");

    if (!adminId || !password) {
      if (wantsJson) return jsonError("Admin ID and password are required", 400);
      return NextResponse.redirect(new URL("/admin/login?error=missing", req.url));
    }

    if (!validateAdminCredentials(adminId, password)) {
      if (wantsJson) return jsonError("Invalid credentials", 401);
      return NextResponse.redirect(new URL("/admin/login?error=invalid", req.url));
    }

    const token = await signToken({ adminId });

    if (wantsJson) {
      const response = NextResponse.json({ success: true, adminId });
      response.cookies.set(COOKIE_NAME, token, authCookieOptions());
      return response;
    }

    const response = NextResponse.redirect(new URL("/admin", req.url), 303);
    response.cookies.set(COOKIE_NAME, token, authCookieOptions());
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return jsonError("Login failed", 500);
  }
}
