"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { restaurant } from "@/lib/data";
import { useReservation } from "@/components/providers/ReservationProvider";

const navLinks = [
  { href: "/#about", label: "Our Story" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openReservation } = useReservation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3 shadow-lg" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-wide text-cream transition-colors group-hover:text-gold md:text-3xl">
              {restaurant.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-widest text-cream/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${restaurant.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold"
            >
              <Phone size={14} />
              {restaurant.phone}
            </a>
            <button
              onClick={openReservation}
              className="rounded-sm bg-gold px-6 py-2.5 text-sm font-medium uppercase tracking-wider text-charcoal transition-all hover:bg-gold-light hover:shadow-[0_0_20px_rgba(201,169,98,0.4)]"
            >
              Reserve
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="text-cream lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold text-gold">{restaurant.name}</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={28} className="text-cream" />
                </button>
              </div>

              <nav className="mt-16 flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-3xl text-cream transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-4 pb-8">
                <a href={`tel:${restaurant.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-muted">
                  <Phone size={16} />
                  {restaurant.phone}
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openReservation();
                  }}
                  className="w-full rounded-sm bg-gold py-4 text-sm font-medium uppercase tracking-wider text-charcoal"
                >
                  Reserve a Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
