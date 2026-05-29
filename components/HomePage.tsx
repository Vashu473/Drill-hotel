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
import type { GalleryItemData, MenuItemData } from "@/lib/fetchers";

interface HomePageProps {
  initialMenu: MenuItemData[];
  initialGallery: GalleryItemData[];
}

export default function HomePage({ initialMenu, initialGallery }: HomePageProps) {
  return (
    <ReservationProvider>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <MenuSection items={initialMenu} limit={6} viewAllHref="/menu" />
        <GallerySection images={initialGallery} limit={6} viewAllHref="/gallery" />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyOrderButton />
      <ReservationModal />
    </ReservationProvider>
  );
}
