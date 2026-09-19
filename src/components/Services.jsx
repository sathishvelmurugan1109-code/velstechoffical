import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  SERVICES,
  HERO_STATS,
  DEFAULT_WA_MESSAGE,
  buildWhatsAppLink,
} from "../data/site";

/* ============================================================
   Minimal gold line-art visuals — one per service.
   Rendered as a low-opacity watermark inside each card so the
   artwork adds depth without competing with the copy.
   ============================================================ */
const svgProps = {
  viewBox: "0 0 120 120",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "block h-auto w-full",
  "aria-hidden": "true",
  focusable: "false",
};

/* 01 — laptop / code interface */
const WebVisual = () => (
  <svg {...svgProps}>
    <path d="M18 30h84a4 4 0 0 1 4 4v48H14V34a4 4 0 0 1 4-4Z" />
    <path d="M6 82h108l-4 8a3 3 0 0 1-2.7 1.8H12.7A3 3 0 0 1 10 90l-4-8Z" />
    <path d="M28 46h24M28 56h36M28 66h18" />
    <circle cx="88" cy="56" r="13" />
    <path d="M83 56.5l4 4 7-8" />
  </svg>
);

/* 02 — smartphone devices */
const MobileVisual = () => (
  <svg {...svgProps}>
    <rect x="26" y="16" width="36" height="88" rx="8" />
    <rect x="56" y="34" width="38" height="70" rx="8" />
    <path d="M38 26h12M36 84h16M36 92h10" />
    <path d="M67 46h16M65 84h20M65 92h12" />
    <circle cx="44" cy="94" r="1.8" />
  </svg>
);

/* 03 — growth chart */
const GrowthVisual = () => (
  <svg {...svgProps}>
    <path d="M16 16v90h90" />
    <rect x="28" y="74" width="14" height="32" rx="3" />
    <rect x="50" y="58" width="14" height="48" rx="3" />
    <rect x="72" y="40" width="14" height="66" rx="3" />
    <path d="M26 62l24-16 20 8 30-32" />
    <path d="M88 22h12v12" />
  </svg>
);

/* 04 — browser / search results */
const SeoVisual = () => (
  <svg {...svgProps}>
    <rect x="12" y="24" width="96" height="72" rx="9" />
    <path d="M12 42h96" />
    <circle cx="26" cy="33" r="2" />
    <circle cx="34" cy="33" r="2" />
    <circle cx="42" cy="33" r="2" />
    <circle cx="44" cy="60" r="11" />
    <path d="M52 68l9 9" />
    <path d="M66 56h28M66 68h22M66 80h16" />
  </svg>
);

/* 05 — shopping cart / commerce */
const CartVisual = () => (
  <svg {...svgProps}>
    <path d="M12 28h12l12 48h52l11-34H32" />
    <circle cx="44" cy="92" r="6.5" />
    <circle cx="84" cy="92" r="6.5" />
    <rect x="62" y="36" width="30" height="22" rx="4" />
    <path d="M67 47h20" />
  </svg>
);

/* 06 — UI / UX design screens */
const UiVisual = () => (
  <svg {...svgProps}>
    <rect x="12" y="20" width="62" height="46" rx="6" />
    <rect x="30" y="44" width="72" height="54" rx="6" />
    <path d="M40 56h34M40 66h48M40 78h26" />
    <path d="M96 20v18M90 26h12" />
  </svg>
);

/* 07 — cloud / server infrastructure */
const CloudVisual = () => (
  <svg {...svgProps}>
    <path d="M40 60a17 17 0 0 1 1.5-33 23 23 0 0 1 43 6.5A15 15 0 0 1 82 60H40Z" />
    <rect x="22" y="72" width="76" height="16" rx="4" />
    <rect x="22" y="94" width="76" height="16" rx="4" />
    <path d="M32 80h7M32 102h7M82 80h7M82 102h7" />
  </svg>
);

/* 08 — shield / security system */
const ShieldVisual = () => (
  <svg {...svgProps}>
    <path d="M60 14l36 14v30c0 23-15 38-36 46-21-8-36-23-36-46V28l36-14Z" />
    <path d="M45 59l11 11 21-23" />
  </svg>
);

const VISUALS = {
  "Website Development": WebVisual,
  "Mobile App Development": MobileVisual,
  "Digital Marketing": GrowthVisual,
  "SEO Services": SeoVisual,
  "E-Commerce Solutions": CartVisual,
  "UI / UX Design": UiVisual,
  "Cloud & DevOps": CloudVisual,
  "Maintenance & Security": ShieldVisual,
};

/* Client/avatar placeholders for the trust strip */
const CLIENT_MARKS = ["VC", "NX", "AP", "BR", "KT"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: "easeOut" },
  }),
};

/** Move the card's gold spotlight to follow the cursor. */
const trackSpotlight = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

export default function Services() {
  const whatsappLink = buildWhatsAppLink(DEFAULT_WA_MESSAGE);

  return (
    <section id="services" aria-labelledby="services-title" className="svc-section">
      {/* ---------- Ambient background ---------- */}
      <div className="svc-ambient" aria-hidden="true">
        <div className="svc-gridbg" />
        <svg
          className="svc-circuit"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M-20 640h360l60-60h300l70 70h280l80-80h330" />
          <path d="M-20 200h240l70 70h260l60-60h300l90 90h420" />
          <path d="M240 200v-90M800 270v-140M1180 290v-120M180 640v130M1080 650v120" />
          <circle cx="360" cy="580" r="5" />
          <circle cx="800" cy="270" r="5" />
          <circle cx="1180" cy="290" r="5" />
          <circle cx="620" cy="650" r="5" />
        </svg>
        <div className="svc-glow g1" />
        <div className="svc-glow g2" />
        <div className="svc-glow g3" />
        <div className="svc-edge svc-edge-top" />
        <div className="svc-edge svc-edge-bottom" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        {/* ---------- Section header ---------- */}
        <header className="svc-header">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="svc-badge"
          >
            <i />
            Our Services
          </motion.span>

          <motion.h2
            id="services-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            custom={0.08}
            className="svc-title font-display text-white"
          >
            Tech Solutions That <span className="text-gradient">Scale</span> Your
            Business
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            custom={0.16}
            className="svc-lead"
          >
            End-to-end digital services engineered with modern technologies — one
            partner for everything your business needs to win online.
          </motion.p>
        </header>

        {/* ---------- 4 × 2 service grid ---------- */}
        <div className="svc-grid">
          {SERVICES.map((service, index) => {
            const Visual = VISUALS[service.title] ?? WebVisual;
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={(index % 4) * 0.07}
                onMouseMove={trackSpotlight}
                className="svc-card"
              >
                {service.featured && (
                  <span className="svc-flag">
                    <Sparkles size={10} strokeWidth={2} />
                    Most Popular
                  </span>
                )}

                <div className="svc-top">
                  <span className="svc-icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <span className="svc-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="svc-cat">{service.tagline}</p>
                <h3 className="svc-name font-display">{service.title}</h3>
                <p className="svc-desc">{service.description}</p>

                <ul className="svc-list">
                  {service.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={14} strokeWidth={1.8} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="svc-foot">
                  <a href="#contact" className="svc-more">
                    Learn More
                    <ArrowRight size={14} />
                  </a>
                  <ArrowUpRight size={14} className="svc-arrow" />
                </div>

                <span className="svc-vis">
                  <Visual />
                </span>
              </motion.article>
            );
          })}
        </div>

        {/* ---------- Bottom statistics bar ---------- */}
        <motion.dl
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="svc-stats"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="st">
              <dt className="st-v">{stat.value}</dt>
              <dd className="st-l">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>

        {/* ---------- Consultation CTA + trust ---------- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.1}
          className="svc-cta"
        >
          <div className="svc-cta-copy">
            <h3 className="font-display">Ready to scale your business?</h3>
            <p>
              Tell us about your project and get a free strategy call — a clear
              roadmap, honest timelines and no obligation.
            </p>
          </div>

          <div className="svc-cta-actions">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Get Free Consultation
              <ArrowRight size={16} />
            </a>

            <div className="svc-trust">
              <div className="svc-avatars" aria-hidden="true">
                {CLIENT_MARKS.map((mark) => (
                  <span key={mark}>{mark}</span>
                ))}
              </div>
              <div className="svc-trust-copy">
                <p>Trusted by 30+ businesses</p>
                <div className="svc-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                  ))}
                  <small>5.0 average rating</small>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
