"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";
import { restaurant } from "@/lib/data";
import { useReservation } from "@/components/providers/ReservationProvider";

export default function ContactSection() {
  const { openReservation } = useReservation();
  const [sending, setSending] = useState(false);

  const handleContact = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to send message");
        return;
      }

      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-gold">Visit Us</span>
            <h2 className="mt-4 font-display text-4xl font-bold text-cream md:text-5xl">
              Find <span className="text-gradient-gold">Deli Grill</span>
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-gold/10">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-cream">Address</p>
                  <p className="text-muted">{restaurant.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-gold/10">
                  <Phone size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-cream">Phone</p>
                  <a href={`tel:${restaurant.phone.replace(/\D/g, "")}`} className="text-muted hover:text-gold">
                    {restaurant.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-gold/10">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-cream">Email</p>
                  <a href={`mailto:${restaurant.email}`} className="text-muted hover:text-gold">
                    {restaurant.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-gold/10">
                  <Clock size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-cream">Hours</p>
                  <ul className="space-y-1">
                    {restaurant.hours.map((h) => (
                      <li key={h.day} className="text-sm text-muted">
                        <span className="text-cream/70">{h.day}:</span> {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={openReservation}
              className="mt-8 rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-charcoal transition-all hover:bg-gold-light hover:shadow-[0_0_24px_rgba(201,169,98,0.4)]"
            >
              Book Your Table
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="overflow-hidden rounded-sm border border-gold/10">
              <iframe
                title="Deli Grill Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.987654321!2d-74.002939!3d40.734234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzAzLjIiTiA3NMKwMDAnMTAuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="280"
                style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <form onSubmit={handleContact} className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-cream">Send a Message</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-gold/50"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-gold/50"
                />
              </div>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Your message..."
                className="w-full resize-none rounded-sm border border-gold/15 bg-charcoal-light px-4 py-3 text-sm text-cream placeholder:text-muted/60 outline-none transition-colors focus:border-gold/50"
              />
              <button
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 rounded-sm border border-gold/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:bg-gold hover:text-charcoal disabled:opacity-50"
              >
                <Send size={16} />
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
