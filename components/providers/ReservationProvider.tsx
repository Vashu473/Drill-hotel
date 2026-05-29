"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ReservationContextValue {
  isOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openReservation = useCallback(() => setIsOpen(true), []);
  const closeReservation = useCallback(() => setIsOpen(false), []);

  return (
    <ReservationContext.Provider value={{ isOpen, openReservation, closeReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservation must be used within ReservationProvider");
  return ctx;
}
