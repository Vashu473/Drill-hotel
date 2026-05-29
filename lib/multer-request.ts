import type { NextApiRequest } from "next";

export type MulterNextApiRequest = NextApiRequest & {
  file?: Express.Multer.File;
};

export function getUploadedFile(req: NextApiRequest) {
  return (req as MulterNextApiRequest).file;
}
