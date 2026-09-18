import { Phone, Mail, Facebook, Instagram } from "lucide-react";
import {
  COMPANY,
  NAV_LINKS,
  SERVICES,
  buildWhatsAppLink,
  DEFAULT_WA_MESSAGE,
} from "../data/site";
import logo from "../assets/profile.png";

/** Inline WhatsApp brand glyph (lucide has no brand icon). */
function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-onyx/70 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <img
                src={logo}
                alt="Vels Tech logo"
                width={56}
                height={56}
                loading="lazy"
                className="glow-neon h-14 w-14 rounded-xl transition-transform duration-300 hover:scale-105"
              />
              <span className="font-display text-xl font-bold tracking-tight">
                VELS<span className="text-neon">TECH</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Premium technology services — websites, mobile apps, digital
              marketing &amp; SEO that help your business dominate online.
            </p>
            <div className="mt-5 flex gap-3">
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

          {/* Quick links */}
          <nav aria-label="Footer quick links">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-neon">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-neon"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-neon">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-zinc-400 transition-colors hover:text-neon"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-neon">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li>
                <a
                  href={`tel:${COMPANY.phoneTel}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-neon"
                >
                  <Phone size={16} className="shrink-0 text-neon" />
                  Mobile: 95977 68607
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-neon"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-neon" />
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-neon"
                >
                  <Mail size={16} className="shrink-0 text-neon" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="pt-1 text-xs text-zinc-500">{COMPANY.hours}</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-zinc-500 sm:flex-row lg:px-8">
          <p>
            © {year}{" "}
            <span className="font-semibold text-zinc-300">{COMPANY.name}</span>.
            All rights reserved.
          </p>
          <p>
            Designed &amp; Developed with{" "}
            <span className="text-neon">⚡</span> by Vels Tech
          </p>
          <a href="#home" className="transition-colors hover:text-neon">
            Back to Top ↑
          </a>
        </div>
      </div>

    </footer>
  );
}
