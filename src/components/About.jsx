import {
  Award,
  CheckCircle2,
  Clock3,
  Headphones,
  Rocket,
  ShieldCheck,
  Star,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import AnimatedText from "./AnimatedText";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { useMagnetic } from "../lib/motion";
import logo from "../assets/profile.png";

// ============================================================
// ABOUT — story, commitments and the four existing metrics.
//
// The studio mockup and the three overlapping trust badges are replaced by
// one glass "system overview" panel plus a badge row. Every number, label
// and link is content the site already published.
// ============================================================

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
  const magneticPrimary = useMagnetic(0.28, 8);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section section-rule section--lit"
    >
      <div className="section-glow" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="amb-grid" />
      </div>

      <div className="shell">
        <div className="about__grid">
          {/* ---------- Story ---------- */}
          <div>
            <Reveal y={14}>
              <span className="kicker">About us</span>
            </Reveal>

            <h2
              id="about-heading"
              aria-label="Your Trusted Partner in Digital Transformation"
              className="display-2 about-title"
            >
              <AnimatedText
                aria-hidden="true"
                text="Your Trusted Partner in"
                as="span"
                mode="words"
                className="block"
                delay={0.06}
              />
              <AnimatedText
                aria-hidden="true"
                text="Digital Transformation"
                as="span"
                mode="words"
                className="gold-text block"
                delay={0.14}
              />
            </h2>

            <Reveal delay={0.12} y={18}>
              <p className="lead mt-6">
                Vels Tech is a full-stack technology services company helping
                startups and businesses launch world-class digital products.
              </p>
            </Reveal>

            <Reveal delay={0.18} y={18}>
              <p className="copy mt-4">
                From <span className="text-gold-soft">React websites</span> and{" "}
                <span className="text-gold-soft">mobile apps</span> to{" "}
                <span className="text-gold-soft">growth marketing</span> and{" "}
                <span className="text-gold-soft">SEO</span> — our expert team
                blends cutting-edge technology with creative strategy to build
                solutions that don't just look premium, they <em>perform</em>. We
                obsess over speed, design detail and measurable results for every
                client.
              </p>
            </Reveal>

            <ul className="about-list">
              {CHECKLIST.map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <Reveal
                    as="li"
                    key={item.title}
                    className="about-item card--info card--interactive"
                    delay={index * 0.06}
                    y={16}
                  >
                    <ItemIcon size={17} aria-hidden="true" />
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.detail}</small>
                    </span>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={0.12} y={18} className="about-actions">
              <a
                href="#contact"
                className="btn btn--gold"
                onPointerMove={magneticPrimary.onPointerMove}
                onPointerLeave={magneticPrimary.onPointerLeave}
              >
                Let's Work Together
                <Zap size={16} />
              </a>
              <a href="#portfolio" className="btn btn--ghost">
                See what we build
              </a>
            </Reveal>
          </div>

          {/* ---------- System overview panel ---------- */}
          <Reveal delay={0.1} y={24} amount={0.2}>
            <div>
              <div className="panel card card--primary">
                <div className="panel__bar">
                  <span className="flex items-center gap-2.5">
                    <img
                      src={logo}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-auto"
                      decoding="async"
                    />
                    <span className="label">Vels / System overview</span>
                  </span>
                  <span className="live">
                    <i aria-hidden="true" />
                    Live
                  </span>
                </div>

                <div className="metrics">
                  {STATS.map((stat) => {
                    const StatIcon = stat.icon;
                    return (
                      <div className="metric" key={stat.label}>
                        <StatIcon size={20} strokeWidth={1.7} aria-hidden="true" />
                        <p className="kpi__value">
                          <CountUp value={stat.value} />
                          <em>{stat.suffix}</em>
                        </p>
                        <p className="kpi__label">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="panel__foot">
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <b>Trust / Performance / Growth</b>
                </div>
              </div>

              <div className="badge-row">
                <div className="badge-card">
                  <Star size={17} fill="currentColor" aria-hidden="true" />
                  <span>
                    <strong>Client Satisfaction</strong>
                    <small>99% satisfaction across delivered projects.</small>
                  </span>
                </div>
                <div className="badge-card">
                  <ShieldCheck size={17} aria-hidden="true" />
                  <span>
                    <strong>Secure &amp; Supported</strong>
                    <small>Updates, backups and post-launch support included.</small>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
