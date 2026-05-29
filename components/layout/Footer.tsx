import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Share2, Globe } from "lucide-react";
import { restaurant } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-gold">{restaurant.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              New York&apos;s destination for premium deli and grill dining. Crafted with passion since
              1987.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-muted transition-colors hover:text-gold" aria-label="Social media">
                <Share2 size={20} />
              </a>
              <a href="#" className="text-muted transition-colors hover:text-gold" aria-label="Website">
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-cream">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Our Story", href: "#about" },
                { label: "Menu", href: "#menu" },
                { label: "Gallery", href: "#gallery" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-cream">Hours</h4>
            <ul className="space-y-2">
              {restaurant.hours.map((h) => (
                <li key={h.day} className="flex justify-between text-sm">
                  <span className="text-muted">{h.day}</span>
                  <span className="text-cream/80">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-cream">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                {restaurant.address}
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href={`tel:${restaurant.phone.replace(/\D/g, "")}`} className="hover:text-gold">
                  {restaurant.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <Mail size={16} className="shrink-0 text-gold" />
                <a href={`mailto:${restaurant.email}`} className="hover:text-gold">
                  {restaurant.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-8 md:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {restaurant.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted">
            <Clock size={12} />
            West Village, New York City
          </p>
        </div>
      </div>
    </footer>
  );
}
