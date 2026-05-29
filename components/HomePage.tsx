"use client";

import { ReservationProvider } from "@/components/providers/ReservationProvider";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyOrderButton from "@/components/layout/StickyOrderButton";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import MenuSection from "@/components/home/MenuSection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import ReservationModal from "@/components/home/ReservationModal";

export default function HomePage() {
  return (
    <ReservationProvider>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyOrderButton />
      <ReservationModal />
    </ReservationProvider>
  );
}
