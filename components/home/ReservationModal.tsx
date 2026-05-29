"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, Users, Clock, Phone, User, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { useReservation } from "@/components/providers/ReservationProvider";

export default function ReservationModal() {
  const { isOpen, closeReservation } = useReservation();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Reservation request received! We'll confirm shortly.");
    setSubmitting(false);
    closeReservation();
    (e.target as HTMLFormElement).reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          onClick={closeReservation}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-sm border border-gold/20 bg-charcoal shadow-[0_0_60px_rgba(201,169,98,0.15)]"
          >
            <div className="relative bg-gradient-to-r from-gold/10 via-transparent to-gold/10 px-8 py-6">
              <button
                onClick={closeReservation}
                className="absolute top-4 right-4 text-muted transition-colors hover:text-cream"
                aria-label="Close reservation form"
              >
                <X size={22} />
              </button>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gold/15">
                  <CalendarDays size={22} className="text-gold" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-cream">Reserve a Table</h2>
                  <p className="text-sm text-muted">We&apos;ll confirm your booking shortly</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-8">
              <div className="relative">
                <User size={16} className="absolute top-3.5 left-4 text-muted" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  className="w-full rounded-sm border border-gold/15 bg-charcoal-light py-3 pr-4 pl-11 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-gold/50"
                />
              </div>

              <div className="relative">
                <Phone size={16} className="absolute top-3.5 left-4 text-muted" />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  className="w-full rounded-sm border border-gold/15 bg-charcoal-light py-3 pr-4 pl-11 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-gold/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Users size={16} className="absolute top-3.5 left-4 text-muted" />
                  <select
                    name="guests"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-sm border border-gold/15 bg-charcoal-light py-3 pr-4 pl-11 text-sm text-cream outline-none transition-colors focus:border-gold/50"
                  >
                    <option value="" disabled>
                      Guests
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <CalendarDays size={16} className="absolute top-3.5 left-4 text-muted" />
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-sm border border-gold/15 bg-charcoal-light py-3 pr-4 pl-11 text-sm text-cream outline-none transition-colors focus:border-gold/50"
                  />
                </div>
              </div>

              <div className="relative">
                <Clock size={16} className="absolute top-3.5 left-4 text-muted" />
                <select
                  name="time"
                  required
                  defaultValue=""
                  className="w-full appearance-none rounded-sm border border-gold/15 bg-charcoal-light py-3 pr-4 pl-11 text-sm text-cream outline-none transition-colors focus:border-gold/50"
                >
                  <option value="" disabled>
                    Select Time
                  </option>
                  {["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map(
                    (t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="relative">
                <MessageSquare size={16} className="absolute top-3.5 left-4 text-muted" />
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Special requests (optional)"
                  className="w-full resize-none rounded-sm border border-gold/15 bg-charcoal-light py-3 pr-4 pl-11 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-gold/50"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-sm bg-gold py-4 text-sm font-semibold uppercase tracking-widest text-charcoal transition-all hover:bg-gold-light hover:shadow-[0_0_24px_rgba(201,169,98,0.4)] disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Confirm Reservation"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
