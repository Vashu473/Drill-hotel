"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import { menuCategories } from "@/lib/data";
import type { MenuItemData } from "@/lib/fetchers";

const HOME_PREVIEW_LIMIT = 6;

function MenuCard({ item, index }: { item: MenuItemData; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-sm bg-charcoal-light"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />

        {item.popular && (
          <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wider text-charcoal">
            <Flame size={12} />
            Popular
          </div>
        )}

        <div className="absolute right-4 bottom-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-sm bg-gold/90 px-3 py-1.5 text-sm font-bold text-charcoal">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-cream transition-colors group-hover:text-gold">
            {item.name}
          </h3>
          <span className="shrink-0 font-semibold text-gold group-hover:hidden">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

interface MenuSectionProps {
  items: MenuItemData[];
  limit?: number;
  viewAllHref?: string;
}

export default function MenuSection({ items, limit, viewAllHref }: MenuSectionProps) {
  const isPreview = limit != null;
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = isPreview
    ? items.slice(0, limit ?? HOME_PREVIEW_LIMIT)
    : activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id={isPreview ? "menu-preview" : "menu"} className="section-padding bg-charcoal">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-gold">Culinary Craft</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-cream md:text-5xl">
            Our <span className="text-gradient-gold">Menu</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            {isPreview
              ? "A taste of our favorites. Explore the full menu for every signature dish."
              : "Every dish tells a story. Explore our signature creations, fire-grilled perfection, and New York classics."}
          </p>
        </motion.div>

        {!isPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-gold text-charcoal shadow-[0_0_20px_rgba(201,169,98,0.3)]"
                    : "border border-gold/20 text-muted hover:border-gold/50 hover:text-cream"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <p className="col-span-full text-center text-muted">No items in this category yet.</p>
            ) : (
              filtered.map((item, i) => <MenuCard key={item.id} item={item} index={i} />)
            )}
          </AnimatePresence>
        </motion.div>

        {isPreview && viewAllHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-gold/5 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold hover:text-charcoal"
            >
              View Full Menu
              <ArrowRight size={18} />
            </Link>
            {items.length > (limit ?? HOME_PREVIEW_LIMIT) && (
              <p className="mt-3 text-sm text-muted">
                +{items.length - (limit ?? HOME_PREVIEW_LIMIT)} more dishes
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
