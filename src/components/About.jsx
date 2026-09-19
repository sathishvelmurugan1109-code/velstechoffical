import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock3,
  Headphones,
  Play,
  Rocket,
  ShieldCheck,
  Star,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import AnimatedText from "./AnimatedText";
import logo from "../assets/profile.png";

/** Animated number counter that starts when scrolled into view. */
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const CHECKLIST = [
  {
    icon: Users,
    title: "Certified developers & designers",
    detail: "Skilled team with real-world experience",
  },
  {
    icon: Clock3,
    title: "On-time delivery, every time",
    detail: "Commitment you can count on",
  },
  {
    icon: Tag,
    title: "Transparent, fixed pricing",
    detail: "No hidden costs, no surprises",
  },
  {
    icon: Headphones,
    title: "Dedicated post-launch support",
    detail: "We're here even after you go live",
  },
];

const STATS = [
  { icon: Rocket, value: 50, suffix: "+", label: "Projects Completed" },
  { icon: Award, value: 30, suffix: "+", label: "Happy Clients" },
  { icon: ShieldCheck, value: 5, suffix: "+", label: "Years Experience" },
  { icon: CheckCircle2, value: 99, suffix: "%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="about-section relative scroll-mt-24"
    >
      <div className="about-ambient" aria-hidden="true">
        <div className="about-grid" />
        <div className="about-glow about-glow-left" />
        <div className="about-glow about-glow-right" />
        <div className="about-line about-line-top" />
        <div className="about-line about-line-bottom" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-32">
        <div className="about-copy">
          <span className="script-accent" aria-hidden="true">
            Innovation · Delivered
          </span>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="about-badge"
          >
            <span /> ABOUT US
          </motion.div>

          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.06 }}
            className="about-title font-display"
          >
            <AnimatedText text="Your Trusted Partner in" as="span" className="block" delay={0.12} />
            <AnimatedText text="Digital Transformation" as="span" className="block text-gold-soft text-gold-glow" delay={0.2} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="about-lead"
          >
            Vels Tech is a full-stack technology services company helping startups and businesses launch world-class digital products.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="about-description"
          >
            From <span className="text-neon">React websites</span> and{" "}
            <span className="text-neon">mobile apps</span> to{" "}
            <span className="text-neon">growth marketing</span> and{" "}
            <span className="text-neon">SEO</span> — our expert team blends
            cutting-edge technology with creative strategy to build solutions
            that don't just look premium, they <em>perform</em>. We obsess over
            speed, design detail and measurable results for every client.
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="about-benefits"
          >
            {CHECKLIST.map((item) => (
              <motion.li
                key={item.title}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="about-benefit"
              >
                <span className="about-benefit-icon"><item.icon size={17} /></span>
                <span><strong>{item.title}</strong><small>{item.detail}</small></span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="about-actions"
          >
            <a href="#contact" className="about-primary-cta">
              Let's Work Together <ArrowUpRight size={17} />
            </a>
            <a href="#portfolio" className="about-story-cta"><span><Play size={13} fill="currentColor" /></span> Watch Our Story</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="about-visual"
        >
          <div className="about-studio" aria-hidden="true">
            <div className="about-wall-line" />
            <div className="about-wall-logo"><img src={logo} alt="" width="220" height="220" /></div>
            <div className="about-desk" />
            <div className="about-light-column" />
          </div>

          <div className="about-dashboard">
            <div className="about-dashboard-top">
              <span>VELS / SYSTEM OVERVIEW</span>
              <span className="about-live"><i /> LIVE</span>
            </div>
            <div className="about-stat-grid">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="about-stat"
                  >
                    <Icon size={21} />
                    <p className="font-display">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p>
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="about-dashboard-footer"><span /><span /><span /><b>TRUST / PERFORMANCE / GROWTH</b></div>
          </div>

          <div className="about-trust-badge">
            <Star size={16} fill="currentColor" />
            <span>100% Client Satisfaction</span>
          </div>
          <div className="about-delivery-badge">
            <Zap size={18} fill="currentColor" />
            <span><strong>Lightning-Fast Delivery</strong><small>From idea to launch, we move faster.</small></span>
          </div>
          <div className="about-info-bar">
            <div><Zap size={18} /><span><strong>Lightning-Fast Delivery</strong><small>From idea to launch, we move faster.</small></span></div>
            <i />
            <div><span className="about-globe">◎</span><span><strong>Global Client Base</strong><small>Serving clients across the world.</small></span></div>
          </div>
        </motion.div>
      </div>
      <div className="about-statement"><span /> TECH <b>|</b> PEOPLE <b>|</b> POSSIBILITY</div>
    </section>
  );
}
