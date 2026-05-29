"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials, restaurant } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="section-padding relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-gold">Guest Voices</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-cream md:text-5xl">
            What They <span className="text-gradient-gold">Say</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gold">{restaurant.rating.toFixed(1)}</span>
            <span className="text-muted">based on {restaurant.reviewCount} reviews</span>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-sm border border-gold/10 bg-charcoal-light p-8 transition-all hover:border-gold/30 hover:shadow-[0_8px_32px_rgba(201,169,98,0.1)]"
            >
              <Quote size={32} className="mb-4 text-gold/30 transition-colors group-hover:text-gold/50" />
              <p className="leading-relaxed text-cream/80 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <div className="mt-4 border-t border-gold/10 pt-4">
                <p className="font-display text-lg font-semibold text-cream">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
