import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Timer,
  Youtube,
} from "lucide-react";
import {
  COMPANY,
  NAV_LINKS,
  SERVICES,
  buildWhatsAppLink,
  DEFAULT_WA_MESSAGE,
} from "../data/site";
import Reveal from "./Reveal";
import WhatsAppMark from "./WhatsAppMark";
import logo from "../assets/profile.png";

// ============================================================
// FOOTER — the closing premium section.
//
// No device mockups: abstract gold light waves, a faint grid, large
// typography and one branded CTA panel. Every link, the newsletter form
// (with its subscribe state) and the contact cards behave exactly as before.
// ============================================================

function FooterWaves() {
  return (
    <svg
      className="footer__wave"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ animation: "float 15s ease-in-out infinite" }}
    >
      <defs>
        <linearGradient id="vt-wave-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFD000" stopOpacity="0" />
          <stop offset="45%" stopColor="#FFD000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFD000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vt-wave-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M0 214C160 150 320 262 480 226C640 190 800 96 960 118C1120 140 1280 236 1440 196"
        fill="none"
        stroke="url(#vt-wave-a)"
        strokeWidth="1.6"
      />
      <path
        d="M0 258C180 200 340 288 520 262C700 236 860 152 1040 176C1220 200 1330 268 1440 246"
        fill="none"
        stroke="url(#vt-wave-b)"
        strokeWidth="1.2"
      />
      <path
        d="M0 296C200 258 380 312 560 300C740 288 900 226 1080 244C1240 260 1350 302 1440 292"
        fill="none"
        stroke="url(#vt-wave-a)"
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="480" cy="226" r="3" fill="#FFD000" />
      <circle cx="960" cy="118" r="3" fill="#FFD000" />
      <circle cx="1040" cy="176" r="2.5" fill="#FFD000" opacity="0.7" />
    </svg>
  );
}

const CTA_TRUST = [
  { icon: Timer, label: "Quick Response" },
  { icon: ShieldCheck, label: "No Obligations" },
  { icon: BadgeCheck, label: "Expert Guidance" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <footer className="footer section--lit">
      <span className="footer__watermark" aria-hidden="true">
        VT
      </span>
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="amb-grid" />
      </div>
      <FooterWaves />

      <div className="relative z-10">
        <div className="shell pt-16 lg:pt-20">
          {/* ---------- Closing CTA ---------- */}
          <Reveal className="cta-panel" y={26} amount={0.2}>
            <div>
              <span className="kicker">A new digital chapter starts here</span>
              <h2 className="display-1">
                Let's Build Something
                <span>Great Together</span>
              </h2>
              <p className="lead mt-5 max-w-[48ch]">
                Have an idea or project in mind? Let's turn it into a powerful
                digital solution.
              </p>
            </div>

            <div className="cta-panel__action">
              <a href="#contact" className="btn btn--gold">
                Get Free Consultation
                <ArrowUpRight size={18} className="btn__arrow--up" />
              </a>
              <ul className="cta-trust" aria-label="Our commitments">
                {CTA_TRUST.map(({ icon: TrustIcon, label }) => (
                  <li className="chip" key={label}>
                    <TrustIcon size={14} strokeWidth={1.8} aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="f-grid">
            {/* ---------- Brand ---------- */}
            <section className="f-col">
              <a href="#home" className="brand" aria-label="Vels Tech home">
                <img
                  src={logo}
                  alt="Vels Tech logo"
                  width={180}
                  height={180}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <p className="label mt-4">TECH / PEOPLE / POSSIBILITY</p>
              <p className="f-about">
                Premium technology services — websites, mobile apps, digital
                marketing &amp; SEO that help your business dominate online.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href={COMPANY.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-round"
                  aria-label="Vels Tech on Facebook"
                >
                  <Facebook size={17} />
                </a>
                <a
                  href={COMPANY.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-round"
                  aria-label="Vels Tech on Instagram"
                >
                  <Instagram size={17} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-round"
                  aria-label="Vels Tech on LinkedIn"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-round"
                  aria-label="Vels Tech on YouTube"
                >
                  <Youtube size={17} />
                </a>
              </div>
            </section>

            {/* ---------- Quick links ---------- */}
            <nav className="f-col" aria-label="Footer quick links">
              <p className="label">Explore</p>
              <h3>Quick Links</h3>
              <ul className="f-links">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>
                      <ArrowUpRight size={14} aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ---------- Services ---------- */}
            <nav className="f-col" aria-label="Footer services">
              <p className="label">What we do</p>
              <h3>What We Do</h3>
              <ul className="f-links">
                {SERVICES.slice(0, 6).map((service) => (
                  <li key={service.title}>
                    <a href="#services">
                      <ArrowUpRight size={14} aria-hidden="true" />
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ---------- Contact ---------- */}
            <section className="f-col">
              <p className="label">Start a conversation</p>
              <h3>Contact Us</h3>
              <div className="f-cards">
                <a href={`tel:${COMPANY.phoneTel}`} className="f-card">
                  <Phone size={17} aria-hidden="true" />
                  <span>
                    <strong>Mobile</strong>
                    <small>95977 68607</small>
                  </span>
                </a>
                <a
                  href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f-card"
                >
                  <WhatsAppMark size={17} className="shrink-0" />
                  <span>
                    <strong>Chat on WhatsApp</strong>
                    <small>We usually reply quickly</small>
                  </span>
                </a>
                <a href={`mailto:${COMPANY.email}`} className="f-card">
                  <Mail size={17} aria-hidden="true" />
                  <span>
                    <strong>{COMPANY.email}</strong>
                    <small>Send us your brief</small>
                  </span>
                </a>
                <div className="f-card">
                  <Clock3 size={17} aria-hidden="true" />
                  <span>
                    <strong>Working Hours</strong>
                    <small>{COMPANY.hours}</small>
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* ---------- Newsletter (#blog anchor) ---------- */}
          <section id="blog" className="f-col scroll-mt-28 mt-12">
            <div className="card card--cta p-6 sm:p-7 lg:flex lg:items-center lg:gap-10">
              <div className="lg:flex-1">
                <p className="label">The signal</p>
                <h3 className="display-3 mt-2">Stay Updated</h3>
                <p className="copy mt-2 max-w-[46ch]">
                  Get the latest updates, insights and tech tips from Vels Tech.
                </p>
              </div>

              <div className="mt-6 lg:mt-0 lg:w-[26rem]">
                <form onSubmit={handleSubscribe} className="f-news">
                  <label className="sr-only" htmlFor="footer-email">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    aria-label="Enter your email"
                    className="field"
                  />
                  <button
                    type="submit"
                    className="f-news__submit"
                    aria-label={isSubscribed ? "Subscribed" : "Subscribe to updates"}
                  >
                    {isSubscribed ? <Check size={19} /> : <Send size={19} />}
                  </button>
                </form>
                <p className="f-note">
                  {isSubscribed
                    ? "You're on the list. Welcome to the signal."
                    : "No spam. Only valuable content."}
                </p>
              </div>
            </div>
          </section>

          {/* ---------- Bottom bar ---------- */}
          <div className="f-bottom">
            <p>
              © {year} <span>{COMPANY.name}</span>. All rights reserved.
            </p>
            <p>
              Designed &amp; Developed with <b>⚡</b> by Vels Tech
            </p>
            <a href="#home">
              Back to top
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
