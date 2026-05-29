import mongoose, { Schema, models, model } from "mongoose";

export interface IMenuItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    popular: { type: Boolean, default: false },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.MenuItem || model<IMenuItem>("MenuItem", MenuItemSchema);
