import multer from "multer";
import path from "path";
import fs from "fs";

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function imageFilter(
  _req: unknown,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
}

function createStorage(subdir: "menu" | "gallery") {
  const uploadPath = path.join(process.cwd(), "public", "uploads", subdir);
  ensureDir(uploadPath);

  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadPath),
    filename: (_req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname) || ".jpg";
      cb(null, `${unique}${ext}`);
    },
  });
}

export const menuUpload = multer({
  storage: createStorage("menu"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter,
});

export const galleryUpload = multer({
  storage: createStorage("gallery"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter,
});

export function getPublicUrl(subdir: "menu" | "gallery", filename: string) {
  return `/uploads/${subdir}/${filename}`;
}
