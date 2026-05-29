import mongoose, { Schema, models, model } from "mongoose";

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export interface IReservation {
  _id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    guests: { type: Number, required: true, min: 1, max: 20 },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Reservation || model<IReservation>("Reservation", ReservationSchema);
