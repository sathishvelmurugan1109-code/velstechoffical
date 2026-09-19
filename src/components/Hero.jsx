import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Code2,
  Smartphone,
  Megaphone,
  Lightbulb,
  Monitor,
  Users,
  TrendingUp,
  ShieldCheck,
  Star,
  ChevronDown,
  BadgeCheck,
  Wallet,
  Headphones,
} from "lucide-react";
import { DEFAULT_WA_MESSAGE, buildWhatsAppLink } from "../data/site";
import AnimatedText from "./AnimatedText";
import logo from "../assets/profile.png";

/* --- Trust badge (desktop floats in visual, mobile stacks below) --- */
const TRUST_INITIALS = ["SR", "VK", "AM"];

function TrustBadge({ className = "" }) {
  return (
    <div
      className={`items-center gap-3 rounded-2xl border border-white/8 bg-carbon/70 px-4 py-3 backdrop-blur-md ${className}`}
    >
      <div className="flex -space-x-2.5">
        {TRUST_INITIALS.map((ini) => (
          <span
            key={ini}
            className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 bg-graphite text-[10px] font-bold text-gold"
          >
            {ini}
          </span>
        ))}
      </div>
      <div className="leading-tight">
        <p className="text-xs font-semibold text-zinc-200">
          Trusted by 30+ businesses
        </p>
        <div className="mt-0.5 flex gap-0.5 text-gold">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Floating glass cards around the laptop --- */
const FLOAT_CARDS = [
  { icon: Monitor, label: "Web Development", cls: "fc-1" },
  { icon: Users, label: "People First", cls: "fc-2" },
  { icon: TrendingUp, label: "Business Growth", cls: "fc-3" },
  { icon: ShieldCheck, label: "Reliable Support", cls: "fc-4" },
];

/* --- Compact service strip under the hero content --- */
const SERVICE_STRIP = [
  { icon: Code2, label: "Web Development" },
  { icon: Smartphone, label: "Mobile App Development" },
  { icon: Megaphone, label: "Digital Marketing" },
  { icon: Lightbulb, label: "IT Consulting" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: "easeOut" },
  }),
};

/* --- Why-choose-us promise card (replaces old stats strip) --- */
const PROMISES = [
  { icon: BadgeCheck, label: "On-Time Delivery" },
  { icon: Wallet, label: "Transparent Pricing" },
  { icon: Headphones, label: "Dedicated Support" },
];

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="hero-home relative flex min-h-screen items-center overflow-hidden pb-16 pt-32 lg:pt-36"
    >
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* ============ LEFT — CONTENT COLUMN ============ */}
          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                Premium Digital Solutions
              </span>
            </motion.div>

            {/* Headline */}
            {/* Headline — the visible text is split into per-letter spans for the
                reveal animation, so an explicit aria-label keeps the accessible
                name readable (otherwise AT announces "W e   B u i l d …"). */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.08}
              aria-label="We Build Digital Experiences That Dominate."
              className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.2rem]"
            >
              <span className="hero-animated-line block" aria-hidden="true">
                <AnimatedText
                  text="We Build Digital"
                  as="span"
                  mode="words"
                  className="hero-animated-heading"
                  delay={0.18}
                />
              </span>
              <span className="hero-animated-line block text-gold-soft text-gold-glow" aria-hidden="true">
                <AnimatedText
                  text="Experiences"
                  as="span"
                  mode="words"
                  className="hero-animated-heading hero-animated-highlight"
                  delay={0.38}
                />
              </span>
              <span className="hero-animated-line block" aria-hidden="true">
                <AnimatedText
                  text="That Dominate."
                  as="span"
                  mode="words"
                  className="hero-animated-heading"
                  delay={0.58}
                />
              </span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
            >
              From stunning websites to high-converting digital solutions —
              Vels Tech turns your ideas into powerful products that grow your
              business.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.32}
              className="relative z-20 mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full sm:w-auto"
              >
                Start Your Project
                <ArrowRight size={18} />
              </a>
              <a href="#portfolio" className="btn-ghost w-full sm:w-auto">
                View Our Work
                <PlayCircle size={20} />
              </a>
            </motion.div>

            {/* Services strip */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="hero-services mt-12 border-t border-white/8 pt-8"
            >
              {SERVICE_STRIP.map((s) => (
                <div key={s.label} className="hs-item">
                  <span className="hs-icon">
                    <s.icon size={24} strokeWidth={1.6} />
                  </span>
                  <span className="hs-label">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Why choose us — promise card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.58}
              className="glass mt-10 rounded-2xl px-7 py-6"
            >
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold">
                Why Choose Vels Tech?
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {PROMISES.map((p) => (
                  <li key={p.label} className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-gold/30 bg-graphite text-gold">
                      <p.icon size={16} strokeWidth={1.8} />
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 sm:text-[0.8rem]">
                      {p.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/8 pt-4">
                <p className="text-xs text-mist">
                  Free consultation · No hidden charges
                </p>
                <a
                  href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold transition-colors hover:text-gold-deep"
                >
                  Get a Free Quote
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ============ RIGHT — CINEMATIC VISUAL ============ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            className="hero-visual"
            aria-hidden="true"
          >
            {/* Depth: dark architectural monolith forms */}
            <div className="monolith monolith-1" />
            <div className="monolith monolith-2" />
            <div className="side-pillar" />

            {/* Faint gold circuit traces with glowing nodes */}
            <svg
              className="circuit-trace"
              viewBox="0 0 600 600"
              fill="none"
              aria-hidden="true"
            >
              <path d="M40 120 H180 L220 160 V240" />
              <path d="M560 90 H460 L420 130 V210" />
              <path d="M560 480 H470 L440 450" />
              <circle cx="40" cy="120" r="4" />
              <circle cx="220" cy="240" r="4" />
              <circle cx="560" cy="90" r="4" />
              <circle cx="420" cy="210" r="4" />
            </svg>

            {/* Gold orbital light */}
            <div className="orbit" />
            <div className="orbit orbit-2" />
            <span className="orbit-node node-a" />
            <span className="orbit-node node-b" />

            {/* Laptop — screen shows ONLY the Vels Tech logo */}
            <div className="laptop">
              <div className="laptop-lid">
                <div className="laptop-notch" />
                <div className="laptop-screen">
                  <img
                    src={logo}
                    alt=""
                    loading="eager"
                    width={420}
                    height={420}
                  />
                </div>
              </div>
              <div className="laptop-base" />
              <div className="light-bar" />
            </div>

            <div className="floor-glow" />

            {/* Floating glass cards */}
            {FLOAT_CARDS.map((card) => (
              <div key={card.label} className={`float-card ${card.cls}`}>
                <span className="fc-icon">
                  <card.icon size={17} strokeWidth={1.7} />
                </span>
                <span className="fc-label">{card.label}</span>
              </div>
            ))}

            {/* Trust element — lower right, visually secondary */}
            <TrustBadge className="absolute bottom-0 right-0 hidden sm:flex" />
          </motion.div>
        </div>

        {/* Trust element — mobile only (desktop version floats in the visual) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.68}
          className="mt-8 flex justify-center sm:hidden"
        >
          <TrustBadge className="flex" />
        </motion.div>

        {/* Scroll to Explore */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.75}
          className="mt-14 lg:-mt-2"
        >
          <a href="#services" className="scroll-hint">
            <span className="sh-circle">
              <ChevronDown size={16} />
            </span>
            Scroll to Explore
            <span className="h-px w-14 bg-gradient-to-r from-gold/40 to-transparent" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}