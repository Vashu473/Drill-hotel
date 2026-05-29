import mongoose, { Schema, models, model } from "mongoose";

export interface IGallery {
  _id: string;
  image: string;
  alt: string;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    image: { type: String, required: true },
    alt: { type: String, default: "Gallery image" },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Gallery || model<IGallery>("Gallery", GallerySchema);
