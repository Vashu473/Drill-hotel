"use client";

import { ReservationProvider } from "@/components/providers/ReservationProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyOrderButton from "@/components/layout/StickyOrderButton";
import ReservationModal from "@/components/home/ReservationModal";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReservationProvider>
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
      <StickyOrderButton />
      <ReservationModal />
    </ReservationProvider>
  );
}
