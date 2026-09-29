import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Code2,
  Compass,
  PenTool,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { SERVICES, DEFAULT_WA_MESSAGE, buildWhatsAppLink } from "../data/site";
import { serviceAnchorId } from "../lib/interactions";
import { stagger, useSpotlight } from "../lib/motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// ============================================================
// SERVICES — 8 capabilities on one card system.
// Anchor ids, the featured flag, the line-art visuals, the WhatsApp CTA and
// the 01→04 delivery flow are all preserved from the previous build.
// ============================================================

/* Minimal gold line-art — one per service, used as a hover watermark. */
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

const WebVisual = () => (
  <svg {...svgProps}>
    <path d="M18 30h84a4 4 0 0 1 4 4v48H14V34a4 4 0 0 1 4-4Z" />
    <path d="M6 82h108l-4 8a3 3 0 0 1-2.7 1.8H12.7A3 3 0 0 1 10 90l-4-8Z" />
    <path d="M28 46h24M28 56h36M28 66h18" />
    <circle cx="88" cy="56" r="13" />
    <path d="M83 56.5l4 4 7-8" />
  </svg>
);

const MobileVisual = () => (
  <svg {...svgProps}>
    <rect x="26" y="16" width="36" height="88" rx="8" />
    <rect x="56" y="34" width="38" height="70" rx="8" />
    <path d="M38 26h12M36 84h16M36 92h10" />
    <path d="M67 46h16M65 84h20M65 92h12" />
    <circle cx="44" cy="94" r="1.8" />
  </svg>
);

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

const CartVisual = () => (
  <svg {...svgProps}>
    <path d="M12 28h12l12 48h52l11-34H32" />
    <circle cx="44" cy="92" r="6.5" />
    <circle cx="84" cy="92" r="6.5" />
    <rect x="62" y="36" width="30" height="22" rx="4" />
    <path d="M67 47h20" />
  </svg>
);

const UiVisual = () => (
  <svg {...svgProps}>
    <rect x="12" y="20" width="62" height="46" rx="6" />
    <rect x="30" y="44" width="72" height="54" rx="6" />
    <path d="M40 56h34M40 66h48M40 78h26" />
    <path d="M96 20v18M90 26h12" />
  </svg>
);

const CloudVisual = () => (
  <svg {...svgProps}>
    <path d="M40 60a17 17 0 0 1 1.5-33 23 23 0 0 1 43 6.5A15 15 0 0 1 82 60H40Z" />
    <rect x="22" y="72" width="76" height="16" rx="4" />
    <rect x="22" y="94" width="76" height="16" rx="4" />
    <path d="M32 80h7M32 102h7M82 80h7M82 102h7" />
  </svg>
);

const ShieldVisual = () => (
  <svg {...svgProps}>
    <path d="M60 14l36 14v30c0 23-15 38-36 46-21-8-36-23-36-46V28l36-14Z" />
    <path d="M45 59l11 11 21-23" />
    <path d="M42 37a21 21 0 0 1 36 0M37 45v11h9V44h-4M83 45v11h-9V44h4" />
    <path d="M78 69c-4 6-10 9-18 9" />
  </svg>
);

const VISUALS = {
  "Website Development": WebVisual,
  "Mobile App Development": MobileVisual,
  "Digital Marketing": GrowthVisual,
  "SEO Optimization": SeoVisual,
  "E-Commerce Growth": CartVisual,
  "UI/UX Design": UiVisual,
  "Cloud Hosting & DevOps": CloudVisual,
  "Support & Maintenance": ShieldVisual,
};

/* Delivery flow: 01 → 04 (unchanged copy) */
const PROCESS = [
  {
    icon: Compass,
    copyTitle: "Discover",
    copy: "A free call to map your goals, audience, scope and budget.",
  },
  {
    icon: PenTool,
    copyTitle: "Design",
    copy: "Wireframes and a gold-standard UI you approve before code.",
  },
  {
    icon: Code2,
    copyTitle: "Develop",
    copy: "Clean, fast, tested build shipped in weekly review sprints.",
  },
  {
    icon: TrendingUp,
    copyTitle: "Grow",
    copy: "Launch, then SEO, ads and support to keep the numbers rising.",
  },
];

const ASSURANCES = [
  { icon: ShieldCheck, label: "Fixed-price quotes" },
  { icon: CalendarCheck, label: "Weekly progress demos" },
  { icon: BadgeCheck, label: "Post-launch support" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function ServiceCard({ service, index }) {
  const onSpotlight = useSpotlight();
  const Visual = VISUALS[service.title] ?? WebVisual;
  const Icon = service.icon;
  const titleWords = service.title.split(" ");

  return (
    <motion.article
      id={serviceAnchorId(service.title)}
      variants={cardVariant}
      onPointerMove={onSpotlight}
      className={`svc-card card card--interactive${
        service.featured ? " card--feature" : ""
      }`}
    >
      <span className="card__bloom" aria-hidden="true" />

      <div className="svc-card__top">
        <span className="svc-card__num">{String(index + 1).padStart(2, "0")}</span>
        <span className="icon-chip">
          <Icon size={21} strokeWidth={1.6} />
        </span>
      </div>

      {service.featured && (
        <span className="svc-flag">
          <Sparkles size={10} strokeWidth={2} />
          Most Popular
        </span>
      )}

      <p className="svc-card__cat">{service.tagline}</p>

      <h3 className="svc-card__title display-3">
        {titleWords.map((word, wordIndex) => (
          <span
            key={`${service.title}-${wordIndex}`}
            className={wordIndex === titleWords.length - 1 ? "is-accent" : undefined}
          >
            {word}
            {wordIndex < titleWords.length - 1 ? " " : ""}
          </span>
        ))}
      </h3>

      <p className="svc-card__desc">{service.description}</p>

      <ul className="svc-card__list">
        {service.points.map((point) => (
          <li key={point}>
            <CheckCircle2 size={14} strokeWidth={1.8} aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="svc-card__foot">
        <a href="#contact" className="link-arrow">
          Learn more
          <ArrowRight size={14} />
        </a>
        <ArrowUpRight size={15} className="text-dim" aria-hidden="true" />
      </div>

      <span className="svc-card__art" aria-hidden="true">
        <Visual />
      </span>
    </motion.article>
  );
}

export default function Services() {
  const whatsappLink = buildWhatsAppLink(DEFAULT_WA_MESSAGE);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section section-rule section--lit"
    >
      <div className="section-glow" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="amb-grid" />
      </div>

      <div className="shell">
        <SectionHeading
          id="services-title"
          tag="Our Services"
          title="Tech Solutions That"
          highlight="Scale Your Business"
          description="End-to-end digital services engineered with modern technologies — one partner for everything your business needs to win online."
        />

        <motion.div
          className="svc-grid"
          variants={stagger(0.07, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>

        {/* ---------- Delivery flow: 01 → 04 ---------- */}
        <Reveal className="flow" delay={0.05} y={26} amount={0.15}>
          <div className="flow__head">
            <span className="kicker">How we work</span>
            <h3 className="flow__title display-2">
              From first call to growth — <span className="gold-text">in four clean steps.</span>
            </h3>
            <p className="copy">Built around your goals, with clarity at every step.</p>
          </div>

          <ol className="flow__steps">
            {PROCESS.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <li key={step.copyTitle} className="flow__step">
                  <div className="flow__step-top">
                    <span className="flow__num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="icon-chip icon-chip--ghost">
                      <StepIcon size={18} strokeWidth={1.6} />
                    </span>
                  </div>
                  <h4 className="flow__name">{step.copyTitle}</h4>
                  <p className="flow__copy">{step.copy}</p>
                </li>
              );
            })}
          </ol>

          <div className="svc-assure">
            <ul className="svc-assure__list">
              {ASSURANCES.map((item) => {
                const AssureIcon = item.icon;
                return (
                  <li key={item.label} className="chip">
                    <AssureIcon size={14} strokeWidth={1.9} />
                    {item.label}
                  </li>
                );
              })}
            </ul>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              Plan my project
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
