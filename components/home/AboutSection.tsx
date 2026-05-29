"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, Clock } from "lucide-react";
import { MENU_IMAGES } from "@/lib/menu-images";

const stats = [
  { icon: Clock, value: "Since 1987", label: "Heritage" },
  { icon: Users, value: "50K+", label: "Happy Guests" },
  { icon: Award, value: "5.0 ★", label: "Rating" },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
                alt="Chef at Deli Grill"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="absolute -right-6 -bottom-6 hidden h-48 w-48 overflow-hidden rounded-sm border-4 border-background md:block">
              <Image
                src={MENU_IMAGES.classicReuben}
                alt="Signature Reuben sandwich"
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
            <div className="absolute -top-4 -left-4 h-24 w-24 border-t-2 border-l-2 border-gold" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-gold">Our Story</span>
            <h2 className="mt-4 font-display text-4xl leading-tight font-bold text-cream md:text-5xl">
              A New York Legacy,
              <br />
              <span className="text-gradient-gold">Reimagined</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              Born in the heart of West Village, Deli Grill has been serving New Yorkers since 1987.
              What started as a neighborhood deli has evolved into a culinary destination — where
              time-honored recipes meet modern craft.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Every sandwich is stacked with care. Every steak is fire-grilled to perfection. Every
              guest is treated like family. This is not just dining — it&apos;s an experience rooted
              in the soul of New York.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <stat.icon size={24} className="mx-auto mb-2 text-gold" />
                  <p className="font-display text-xl font-bold text-cream">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
