import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { COMPANY, SERVICES, buildWhatsAppLink } from "../data/site";

const INITIAL_FORM = { name: "", phone: "", service: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  /** Compose the WhatsApp message from the form and open it. */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      setError("Please fill in your name, phone number and required service.");
      return;
    }

    const text =
      `*New Inquiry — Vels Tech Website* 🚀\n\n` +
      `👤 *Name:* ${form.name.trim()}\n` +
      `📞 *Phone:* ${form.phone.trim()}\n` +
      `🛠️ *Service Required:* ${form.service}\n` +
      `💬 *Message:* ${form.message.trim() || "—"}`;

    window.open(buildWhatsAppLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
    setForm(INITIAL_FORM);
  };

  const infoCards = [
    {
      icon: Phone,
      label: "Call Us",
      value: COMPANY.phoneDisplay,
      href: `tel:${COMPANY.phoneTel}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: COMPANY.phoneDisplay,
      href: buildWhatsAppLink("Hi Vels Tech! I have an inquiry."),
    },
    {
      icon: Mail,
      label: "Email",
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: COMPANY.hours,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="contact-heading"
          tag="Get In Touch"
          title="Let's Build Something"
          highlight="Amazing Together"
          description="Tell us about your project — your inquiry goes straight to our WhatsApp for the fastest response."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 lg:col-span-2"
          >
            {infoCards.map((item) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-neon/20 bg-neon/10 text-neon transition-all duration-300 group-hover:bg-neon group-hover:text-void">
                    <Icon size={22} />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {item.label}
                    </span>
                    <span className="block text-sm font-semibold text-zinc-100">
                      {item.value}
                    </span>
                  </span>
                </>
              );

              const cardClass =
                "group glass flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:border-neon/40 hover:shadow-[0_0_28px_rgba(204,255,0,0.12)]";

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {inner}
                </a>
              ) : (
                <div key={item.label} className={cardClass}>
                  {inner}
                </div>
              );
            })}

            {/* Socials */}
            <div className="glass flex items-center justify-between rounded-2xl p-4">
              <span className="text-sm font-semibold text-zinc-300">
                Follow Us
              </span>
              <div className="flex gap-3">
                <a
                  href={COMPANY.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vels Tech on Facebook (velstech offical)"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-300 transition-all duration-300 hover:border-neon hover:bg-neon hover:text-void"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={COMPANY.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vels Tech on Instagram (vels_tech_offical)"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-300 transition-all duration-300 hover:border-neon hover:bg-neon hover:text-void"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Inquiry form → WhatsApp */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6 sm:p-8 lg:col-span-3"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Arun Kumar"
                  className="input-dark"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="input-dark"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="service"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Service Required *
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="input-dark appearance-none"
                  required
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Other / Not sure yet">
                    Other / Not sure yet
                  </option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your project, budget or timeline…"
                  className="input-dark resize-none"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                {error}
              </p>
            )}

            {sent && (
              <p className="mt-4 flex items-center gap-2 rounded-xl border border-neon/30 bg-neon/10 px-4 py-2.5 text-sm text-neon">
                <CheckCircle2 size={16} />
                WhatsApp opened with your inquiry — just press Send there!
              </p>
            )}

            <button type="submit" className="btn-neon mt-6 w-full">
              Send Inquiry on WhatsApp
              <Send size={17} />
            </button>

            <p className="mt-3 text-center text-xs text-zinc-500">
              Submitting opens WhatsApp with your details pre-filled to{" "}
              <span className="text-neon">{COMPANY.phoneDisplay}</span>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
