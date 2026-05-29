import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthFromRequest, validateAdminCredentials, signToken, setAuthCookie } from "@/lib/auth";
import { jsonOk, jsonError } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const { adminId, password } = await req.json();

    if (!adminId || !password) {
      return jsonError("Admin ID and password are required", 400);
    }

    if (!validateAdminCredentials(adminId, password)) {
      return jsonError("Invalid credentials", 401);
    }

    await connectDB();
    const token = signToken({ adminId });
    await setAuthCookie(token);

    return jsonOk({ success: true, adminId });
  } catch {
    return jsonError("Login failed", 500);
  }
}

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError("Unauthorized", 401);
  return jsonOk({ authenticated: true, adminId: auth.adminId });
}
