"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useReservation } from "@/components/providers/ReservationProvider";

export default function StickyOrderButton() {
  const { openReservation } = useReservation();

  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
      onClick={openReservation}
      className="fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-wider text-charcoal shadow-[0_4px_24px_rgba(201,169,98,0.5)] transition-transform hover:scale-105 active:scale-95 md:hidden"
    >
      <CalendarDays size={18} />
      Reserve
    </motion.button>
  );
}
