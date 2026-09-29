import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Code2,
  Lightbulb,
  Megaphone,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import AnimatedText from "./AnimatedText";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { EASE, fadeUp, useMagnetic, useStageMotion } from "../lib/motion";
import logo from "../assets/profile.png";

// ============================================================
// HERO — "the Vels Tech core".
//
// The laptop/phone mockups are replaced by an abstract system: concentric
// gold rings, a glass core holding the real brand mark, orbiting service
// nodes and two light trails. Every CTA, statistic and label is content the
// site already had — nothing invented.
// ============================================================

/** Service names cycled in the eyebrow — all real entries from site.js. */
const ROTATING = [
  "Website Development",
  "Mobile App Development",
  "Digital Marketing",
  "SEO Optimization",
];

const CORE_NODES = [
  { icon: Code2, label: "Website Development", cls: "core__chip--1" },
  { icon: Smartphone, label: "Mobile Apps", cls: "core__chip--2" },
  { icon: Megaphone, label: "Digital Marketing", cls: "core__chip--3" },
  { icon: Search, label: "SEO Growth", cls: "core__chip--4" },
];

const SERVICE_STRIP = [
  { icon: Code2, label: "Web Development" },
  { icon: Smartphone, label: "Mobile App Development" },
  { icon: Megaphone, label: "Digital Marketing" },
  { icon: Search, label: "SEO Optimization" },
  { icon: Lightbulb, label: "IT Consulting" },
];

/* The four metrics the site already published in the About section — same
   values, same labels, nothing invented. An earlier draft of this strip
   carried a review score and a commitment figure the business never
   published, which also contradicted the About panel. Both are gone, and
   scripts/render-check.mjs now guards against them coming back. */
const STATS = [
  { icon: Rocket, value: 50, suffix: "+", label: "Projects Completed" },
  { icon: Users, value: 30, suffix: "+", label: "Happy Clients" },
  { icon: ShieldCheck, value: 5, suffix: "+", label: "Years Experience" },
  { icon: CheckCircle2, value: 99, suffix: "%", label: "Client Satisfaction" },
];

const TRUST_INDICATORS = [
  { icon: Sparkles, label: "Innovative Solutions" },
  { icon: Users, label: "Expert Team" },
  { icon: BadgeCheck, label: "On-Time Delivery" },
  { icon: TrendingUp, label: "Business Growth" },
];

/** Rotating service name — motion-free users simply see the first one. */
function RotatingWord({ words, interval = 2600 }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(
      () => setIndex((value) => (value + 1) % words.length),
      interval
    );
    return () => window.clearInterval(id);
  }, [interval, reduceMotion, words.length]);

  if (reduceMotion) return <span>{words[0]}</span>;

  return (
    <span className="relative inline-flex min-w-[11ch] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.42, ease: EASE }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const magneticPrimary = useMagnetic(0.3, 9);
  const magneticSecondary = useMagnetic(0.26, 8);
  // One rAF scheduler publishes --px/--py (pointer) and --scrolly (scroll)
  // for every stage layer. Desktop fine-pointer only; mobile stays static.
  const stageRef = useStageMotion(240);

  return (
    <section
      ref={stageRef}
      id="home"
      aria-label="Hero"
      className="hero section--lit"
    >
      {/* ---------- Cinematic stage: light field, beams, perspective floor,
           floating shards and a focus vignette. Purely decorative. ---------- */}
      <div className="stage" aria-hidden="true">
        <span className="stage__field" />
        <span className="stage__floor">
          <span className="stage__grid" />
        </span>
        <span className="stage__horizon" />
        <span className="stage__beam stage__beam--a" />
        <span className="stage__beam stage__beam--b" />
        <span className="stage__shard stage__shard--1" />
        <span className="stage__shard stage__shard--2" />
        <span className="stage__shard stage__shard--3" />
        <span className="stage__vignette" />
      </div>

      <div className="shell">
        <div className="hero__grid">
          {/* ============ COPY ============ */}
          <div className="hero__copy">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="hero__meta"
            >
              <span className="kicker">Premium Digital Solutions</span>
              <span className="chip chip--gold">
                <Sparkles size={13} />
                <RotatingWord words={ROTATING} />
              </span>
            </motion.div>

            {/* Per-word reveal; the h1 keeps one clean accessible name */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.06}
              aria-label="We Build Digital Experiences That Dominate."
              className="display-hero hero-title"
            >
              <AnimatedText
                aria-hidden="true"
                text="We Build"
                as="span"
                mode="lines"
                className="display-hero__line"
              />
              <AnimatedText
                aria-hidden="true"
                text="Digital Experiences"
                as="span"
                mode="lines"
                className="display-hero__line display-hero__accent"
                delay={0.14}
              />
              <AnimatedText
                aria-hidden="true"
                text="That Dominate."
                as="span"
                mode="lines"
                className="display-hero__line"
                delay={0.28}
              />
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.26}
              className="lead hero-sub"
            >
              Websites, mobile apps, digital marketing and SEO — engineered with
              modern technology and a premium eye for detail.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.34}
              className="hero__cta"
            >
              <a
                href="#contact"
                className="btn btn--gold"
                onPointerMove={magneticPrimary.onPointerMove}
                onPointerLeave={magneticPrimary.onPointerLeave}
              >
                Get Free Consultation
                <ArrowUpRight size={17} className="btn__arrow--up" />
              </a>
              <a
                href="#portfolio"
                className="btn btn--ghost"
                onPointerMove={magneticSecondary.onPointerMove}
                onPointerLeave={magneticSecondary.onPointerLeave}
              >
                View Our Work
                <ArrowRight size={17} />
              </a>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.42}
              className="hero__trust"
              aria-label="Vels Tech commitments"
            >
              {TRUST_INDICATORS.map(({ icon: TrustIcon, label }) => (
                <li key={label}>
                  <TrustIcon size={15} strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ============ CORE VISUAL ============ */}
          <div className="core-depth" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.05, delay: 0.18, ease: EASE }}
              className="core"
            >
              <span className="aurora" />
              <span className="core__glow" />
              <span className="core__ring core__ring--outer" />
              <span className="core__ring core__ring--mid">
                <span className="core__node" />
              </span>
              <span className="core__ring core__ring--inner" />
              <span className="core__trail core__trail--a" />
              <span className="core__trail core__trail--b" />

              <span className="core__disc">
                <img
                  src={logo}
                  alt=""
                  width={148}
                  height={148}
                  fetchpriority="high"
                  decoding="async"
                />
              </span>

              {CORE_NODES.map(({ icon: NodeIcon, label, cls }) => (
                <span key={label} className={`core__chip ${cls}`}>
                  <NodeIcon size={15} strokeWidth={1.8} />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

        </div>

        {/* ============ SERVICE STRIP ============ */}
        <Reveal delay={0.1} y={18}>
          <nav className="mt-12 flex flex-wrap gap-2" aria-label="Our services">
            {SERVICE_STRIP.map(({ icon: ServiceIcon, label }) => (
              <a key={label} href="#services" className="chip">
                <ServiceIcon size={15} strokeWidth={1.7} />
                {label}
              </a>
            ))}
          </nav>
        </Reveal>

        {/* ============ KPI STRIP ============ */}
        <Reveal delay={0.16} y={22} className="kpi mt-6">
          {STATS.map((stat) => (
            <div className="kpi__cell" key={stat.label}>
              <stat.icon size={18} strokeWidth={1.7} aria-hidden="true" />
              <span className="kpi__value">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="kpi__label">{stat.label}</span>
            </div>
          ))}
        </Reveal>

        {/* Single scroll affordance for the whole page — the Services section
            no longer repeats it. */}
        <Reveal delay={0.22} y={12}>
          <a href="#services" className="hero__scroll scroll-cue">
            <span className="hero__scroll-rail" aria-hidden="true" />
            <i aria-hidden="true">
              <ChevronDown size={15} />
            </i>
            Scroll to explore
            <span className="hero__scroll-rail" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
