import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Star } from "lucide-react";
import { HERO_STATS, DEFAULT_WA_MESSAGE, buildWhatsAppLink } from "../data/site";
import logo from "../assets/profile.png";

const ROTATING_WORDS = [
  "Websites",
  "Mobile Apps",
  "E-Commerce Stores",
  "SEO Rankings",
  "Brands",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: "easeOut" },
  }),
};

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Rotating headline word
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING_WORDS.length),
      2200
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-24 pt-32"
    >
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        {/* Brand logo */}
        <motion.img
          src={logo}
          alt="Vels Tech logo"
          width={112}
          height={112}
          loading="eager"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="animate-float mx-auto mb-6 h-20 w-20 rounded-2xl sm:h-28 sm:w-28 glow-neon"
        />

        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neon"
        >
          <Sparkles size={14} />
          Premium Technology Services
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl"
        >
          We Build Digital
          <span className="block min-h-[1.15em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -26 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-gradient inline-block"
              >
                {ROTATING_WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </span>
          That Dominate.
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          From stunning React websites to high-converting SEO &amp; marketing —
          Vels Tech turns your ideas into powerful digital products that grow
          your business <span className="font-semibold text-neon">24/7</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#services" className="btn-neon w-full sm:w-auto">
            Explore Services
            <ArrowRight size={18} />
          </a>
          <a
            href={buildWhatsAppLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full sm:w-auto"
          >
            Get Free Consultation
          </a>
        </motion.div>

        {/* Rating */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-7 flex items-center justify-center gap-2 text-sm text-zinc-400"
        >
          <span className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          Rated 4.9/5 by 30+ happy clients
        </motion.div>

        {/* Stats */}
        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.65}
          className="glass mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-y-8 rounded-3xl px-6 py-8 sm:grid-cols-4"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-neon">
                {stat.value}
              </dd>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll hint */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500 transition hover:text-neon"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
