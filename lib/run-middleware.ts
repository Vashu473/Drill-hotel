import type { NextApiRequest, NextApiResponse } from "next";
import type { RequestHandler } from "express";

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: RequestHandler
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(
      req as unknown as Parameters<RequestHandler>[0],
      res as unknown as Parameters<RequestHandler>[1],
      (result: unknown) => {
      if (result instanceof Error) return reject(result);
      return resolve();
    });
  });
}
