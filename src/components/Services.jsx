import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { SERVICES, buildWhatsAppLink } from "../data/site";

/** Cursor-tracking spotlight glow for each card. */
const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-24 py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="services-heading"
          tag="Our Services"
          title="Tech Solutions That"
          highlight="Scale Your Business"
          description="End-to-end digital services engineered with modern technologies — one partner for everything your business needs to win online."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const waLink = buildWhatsAppLink(
              `Hi Vels Tech! 👋 I'm interested in your *${service.title}* service.\n\nPlease share more details and pricing.`
            );

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.1 }}
                onMouseMove={handleMouseMove}
                className={`service-card group glass relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-neon/40 hover:shadow-[0_0_36px_rgba(204,255,0,0.14)] ${
                  service.featured ? "border-neon/30" : ""
                }`}
              >
                {/* Featured badge */}
                {service.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-neon px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-void">
                    Most Popular
                  </span>
                )}

                {/* Icon */}
                <div className="mb-5 inline-grid h-13 w-13 place-items-center rounded-xl border border-neon/20 bg-neon/10 p-3 text-neon transition-all duration-300 group-hover:bg-neon group-hover:text-void group-hover:shadow-[0_0_22px_rgba(204,255,0,0.45)]">
                  <Icon size={26} strokeWidth={1.9} />
                </div>

                <h3 className="font-display text-lg font-bold leading-snug">
                  {service.title}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-neon/80">
                  {service.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>

                {/* Feature list */}
                <ul className="mt-4 space-y-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-zinc-300"
                    >
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-neon"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* WhatsApp inquiry CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-zinc-300 transition-colors duration-300 hover:text-neon"
                  aria-label={`Enquire about ${service.title} on WhatsApp`}
                >
                  Enquire Now
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
