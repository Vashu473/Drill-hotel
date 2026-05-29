"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { restaurant } from "@/lib/data";
import { useReservation } from "@/components/providers/ReservationProvider";

export default function Hero() {
  const { openReservation } = useReservation();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Deli Grill restaurant ambiance"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/40" />
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gold/30 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gold/20 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.5 }}
          className="font-display text-5xl leading-tight font-bold tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-cream">Where </span>
          <span className="text-gradient-gold">Tradition</span>
          <br />
          <span className="text-cream">Meets </span>
          <span className="shimmer-text">Excellence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.7 }}
          className="mx-auto mt-6 max-w-xl text-lg text-cream/70 md:text-xl"
        >
          {restaurant.tagline}. Handcrafted sandwiches, prime cuts, and unforgettable moments in the
          heart of Manhattan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.9 }}
          className="mt-6 flex items-center justify-center gap-2"
        >
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="fill-gold text-gold" />
            ))}
          </div>
          <span className="font-semibold text-gold">{restaurant.rating.toFixed(1)}</span>
          <span className="text-muted">({restaurant.reviewCount} reviews)</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={openReservation}
            className="group relative overflow-hidden rounded-sm bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-widest text-charcoal transition-all hover:shadow-[0_0_30px_rgba(201,169,98,0.5)]"
          >
            <span className="relative z-10">Reserve a Table</span>
            <span className="absolute inset-0 -translate-x-full bg-gold-light transition-transform duration-300 group-hover:translate-x-0" />
          </button>
          <a
            href="/menu"
            className="rounded-sm border border-gold/40 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-cream transition-all hover:border-gold hover:bg-gold/10"
          >
            View Menu
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-gold"
        >
          <span className="text-xs uppercase tracking-widest">Discover</span>
          <ChevronDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
