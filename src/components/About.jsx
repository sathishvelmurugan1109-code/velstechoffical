import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, CheckCircle2, Rocket, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

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
  "Certified developers & designers",
  "On-time delivery, every time",
  "Transparent, fixed pricing",
  "Dedicated post-launch support",
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
      className="relative scroll-mt-24 py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        {/* Text column */}
        <div>
          <SectionHeading
            id="about-heading"
            tag="About Us"
            title="Your Trusted Partner in"
            highlight="Digital Transformation"
            description="Vels Tech is a full-stack technology services company helping startups and businesses launch world-class digital products."
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="-mt-8 leading-relaxed text-zinc-400"
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
            className="mt-7 grid gap-3 sm:grid-cols-2"
          >
            {CHECKLIST.map((item) => (
              <motion.li
                key={item}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex items-center gap-2.5 text-sm text-zinc-200"
              >
                <CheckCircle2 size={18} className="shrink-0 text-neon" />
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9"
          >
            <a href="#contact" className="btn-neon">
              Let's Work Together
            </a>
          </motion.div>
        </div>

        {/* Stats / visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="glass relative rounded-3xl p-8 sm:p-10">
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center transition-colors duration-300 hover:border-neon/30"
                  >
                    <Icon size={24} className="mx-auto text-neon" />
                    <p className="mt-3 font-display text-3xl font-bold text-white">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating accent cards */}
          <div className="glass animate-float absolute -top-5 -right-3 hidden rounded-2xl px-5 py-3 sm:block">
            <p className="font-display text-sm font-bold text-neon">
              100% Client Satisfaction
            </p>
          </div>
          <div className="glass animate-float-slow absolute -bottom-5 -left-3 hidden rounded-2xl px-5 py-3 sm:block">
            <p className="font-display text-sm font-bold text-gold">
              ⚡ Lightning-Fast Delivery
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
