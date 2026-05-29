import fs from "fs";
import path from "path";

export function isLocalUpload(url: string) {
  return url.startsWith("/uploads/");
}

export function getLocalFilePath(url: string) {
  if (!isLocalUpload(url)) return null;
  return path.join(process.cwd(), "public", url);
}

export function deleteLocalFile(url: string) {
  const filePath = getLocalFilePath(url);
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
