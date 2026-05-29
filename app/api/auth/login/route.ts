import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest, validateAdminCredentials, signToken, COOKIE_NAME } from "@/lib/auth";
import { jsonError } from "@/lib/api";

function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  };
}

export async function POST(req: NextRequest) {
  try {
    const { adminId, password } = await req.json();

    if (!adminId || !password) {
      return jsonError("Admin ID and password are required", 400);
    }

    if (!validateAdminCredentials(adminId, password)) {
      return jsonError("Invalid credentials", 401);
    }

    const token = signToken({ adminId });

    const response = NextResponse.json({ success: true, adminId });
    response.cookies.set(COOKIE_NAME, token, authCookieOptions());

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return jsonError("Login failed", 500);
  }
}

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);
  return NextResponse.json({ authenticated: true, adminId: auth.adminId });
}
