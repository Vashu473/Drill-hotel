import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "deli-grill-dev-secret-change-in-production";
export const COOKIE_NAME = "admin_token";

export interface AdminPayload {
  adminId: string;
}

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

export async function signToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ adminId: payload.adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.adminId !== "string") return null;
    return { adminId: payload.adminId };
  } catch {
    return null;
  }
}

export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  };
}

export async function getAuthFromRequest(req: NextRequest): Promise<AdminPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function validateAdminCredentials(adminId: string, password: string) {
  const expectedId = process.env.ADMIN_ID || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "deligrill2024";
  return adminId === expectedId && password === expectedPassword;
}
