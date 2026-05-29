"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowRight } from "lucide-react";
import type { GalleryItemData } from "@/lib/fetchers";

const HOME_PREVIEW_LIMIT = 6;

interface GallerySectionProps {
  images: GalleryItemData[];
  limit?: number;
  viewAllHref?: string;
}

export default function GallerySection({ images, limit, viewAllHref }: GallerySectionProps) {
  const isPreview = limit != null;
  const displayImages = isPreview ? images.slice(0, limit ?? HOME_PREVIEW_LIMIT) : images;
  const [lightbox, setLightbox] = useState<string | null>(null);
  const selected = displayImages.find((img) => img.id === lightbox);

  return (
    <section id={isPreview ? "gallery-preview" : "gallery"} className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-gold">Visual Journey</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-cream md:text-5xl">
            The <span className="text-gradient-gold">Experience</span>
          </h2>
          {isPreview && (
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Glimpses of Deli Grill. See our full gallery for every moment.
            </p>
          )}
        </motion.div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {displayImages.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setLightbox(img.id)}
              className="group relative mb-4 block w-full overflow-hidden rounded-sm break-inside-avoid"
            >
              <div className="relative aspect-auto">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={i % 3 === 0 ? 600 : i % 3 === 1 ? 500 : 700}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-all duration-300 group-hover:bg-background/50">
                <ZoomIn
                  size={32}
                  className="scale-0 text-gold transition-transform duration-300 group-hover:scale-100"
                />
              </div>
            </motion.button>
          ))}
        </div>

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
              View Full Gallery
              <ArrowRight size={18} />
            </Link>
            {images.length > (limit ?? HOME_PREVIEW_LIMIT) && (
              <p className="mt-3 text-sm text-muted">
                +{images.length - (limit ?? HOME_PREVIEW_LIMIT)} more photos
              </p>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-cream transition-colors hover:text-gold"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
