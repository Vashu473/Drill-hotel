import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies[COOKIE_NAME];
  const auth = token ? verifyToken(token) : null;

  if (!auth) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}
