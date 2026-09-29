import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Youtube,
  Zap,
} from "lucide-react";
import AnimatedText from "./AnimatedText";
import Reveal from "./Reveal";
import WhatsAppMark from "./WhatsAppMark";
import { COMPANY, SOCIALS, buildWhatsAppLink } from "../data/site";
import { buildInquiryText, validateInquiry } from "../lib/interactions";

// ============================================================
// CONTACT — presentation rebuilt, behaviour untouched.
//
// Unchanged: the inquiry form fields and their ids/names/autocomplete,
// validateInquiry + buildInquiryText, the WhatsApp deep link opened with
// window.open, the popup-blocked fallback link, the submit lock, the sent
// state, and every aria-invalid / aria-describedby pairing.
// ============================================================

const INITIAL_FORM = { name: "", phone: "", service: "", message: "" };

/** Social icon per configured platform id (see SOCIALS in data/site.js). */
const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

/** How long the submit button stays disabled — blocks duplicate WhatsApp tabs. */
const SUBMIT_LOCK_MS = 1600;

const TRUST_POINTS = [
  { icon: Zap, label: "Fast Response" },
  { icon: Users, label: "100% Client Focus" },
  { icon: ShieldCheck, label: "Secure Process" },
  { icon: Sparkles, label: "Great Ideas" },
];

const TRUST_BAR = [
  { icon: Zap, title: "Fast Response", detail: "We reply quickly" },
  { icon: ShieldCheck, title: "Secure & Private", detail: "Your information is safe" },
  { icon: Users, title: "Dedicated Support", detail: "We're here for you" },
];

const SERVICE_OPTIONS = [
  "Website Development",
  "Mobile App Development",
  "Digital Marketing",
  "SEO Optimization",
  "E-Commerce Development",
  "UI/UX Design",
  "Cloud Hosting & DevOps",
  "Support & Maintenance",
];

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [blockedLink, setBlockedLink] = useState("");

  const formRef = useRef(null);
  const lockTimerRef = useRef(null);

  /* Clear the submit lock if the section unmounts mid-lock. */
  useEffect(() => () => window.clearTimeout(lockTimerRef.current), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFormError("");
    setSent(false);
    setBlockedLink("");
  };

  /** Compose the WhatsApp message from the form and open it. */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Guard against double-clicks / double Enters opening two WhatsApp tabs.
    if (submitting) return;

    const nextErrors = validateInquiry(form);
    setErrors(nextErrors);
    setSent(false);
    setBlockedLink("");

    if (Object.keys(nextErrors).length > 0) {
      setFormError("Please check the highlighted fields and try again.");
      const firstInvalid = Object.keys(nextErrors)[0];
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setFormError("");
    setSubmitting(true);

    const link = buildWhatsAppLink(buildInquiryText(form));
    const popup =
      typeof window !== "undefined"
        ? window.open(link, "_blank", "noopener,noreferrer")
        : null;

    if (!popup) {
      // Popup blocked (common in iOS Safari / strict blockers) — never fail
      // silently: hand the visitor a real, tappable link instead.
      setBlockedLink(link);
      setSubmitting(false);
      return;
    }

    setSent(true);
    setForm(INITIAL_FORM);
    setErrors({});
    lockTimerRef.current = window.setTimeout(
      () => setSubmitting(false),
      SUBMIT_LOCK_MS
    );
  };

  const infoCards = [
    {
      icon: Phone,
      label: "Call Us",
      value: COMPANY.phoneDisplay,
      href: `tel:${COMPANY.phoneTel}`,
      note: "Get instant support",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: COMPANY.phoneDisplay,
      href: buildWhatsAppLink("Hi Vels Tech! I have an inquiry."),
      note: "Chat with our team",
    },
    {
      icon: Mail,
      label: "Email",
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
      note: "We'll reply within 24 hours",
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: COMPANY.hours,
      note: "We're here when you need us",
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section section-rule section--lit"
    >
      <div className="section-glow" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="amb-grid" />
        <div className="amb-orb amb-orb--gold bottom-[-12%] left-[-8%] h-[22rem] w-[22rem]" />
        <div className="trail left-[10%] right-[30%] top-[8%]" />
      </div>

      <div className="shell">
        <div className="contact__grid">
          {/* ---------- Intro + contact channels ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Reveal y={14}>
              <span className="kicker">Let's connect</span>
            </Reveal>

            <h2
              id="contact-heading"
              aria-label="Let's Build Something Amazing Together."
              className="display-2 contact-title"
            >
              <AnimatedText aria-hidden="true" text="Let's Build" as="span" mode="mask" className="block" />
              <AnimatedText
                aria-hidden="true"
                text="Something"
                as="span"
                mode="mask"
                className="block"
                delay={0.07}
              />
              <AnimatedText
                aria-hidden="true"
                text="Amazing"
                as="span"
                mode="mask"
                className="gold-text block"
                delay={0.14}
              />
              <AnimatedText
                aria-hidden="true"
                text="Together."
                as="span"
                mode="mask"
                className="block"
                delay={0.21}
              />
            </h2>

            <Reveal delay={0.1} y={18}>
              <p className="lead mt-6 max-w-[46ch]">
                Tell us about your project — your inquiry goes straight to our
                WhatsApp for the fastest response.
              </p>
            </Reveal>

            <Reveal delay={0.14} y={16}>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="What you can expect">
                {TRUST_POINTS.map(({ icon: TrustIcon, label }) => (
                  <li key={label} className="chip">
                    <TrustIcon size={14} strokeWidth={1.8} aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="contact-info">
              {infoCards.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                    <span>
                      <small>{item.label}</small>
                      <strong>{item.value}</strong>
                      <em>
                        {item.note}
                        {item.href && <ArrowRight size={13} aria-hidden="true" />}
                      </em>
                    </span>
                  </>
                );

                const entrance = {
                  initial: { opacity: 0, y: 14 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: {
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  },
                };

                return item.href ? (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="icard card--info card--interactive"
                    {...entrance}
                  >
                    {content}
                  </motion.a>
                ) : (
                  <motion.div
                    key={item.label}
                    className="icard card--info"
                    {...entrance}
                  >
                    {content}
                  </motion.div>
                );
              })}
            </div>

            <Reveal delay={0.1} y={16} className="social-row">
              <div>
                <strong>Follow Us</strong>
                <small>Stay connected with Vels Tech</small>
              </div>
              <div className="social-row__links">
                {SOCIALS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.id];
                  return Icon ? (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-round"
                      aria-label={`Vels Tech on ${social.label}`}
                    >
                      <Icon size={16} />
                    </a>
                  ) : null;
                })}
              </div>
            </Reveal>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="form-panel card card--primary"
            noValidate
          >
            <div className="form-head">
              <span className="icon-chip">
                <Send size={18} strokeWidth={1.7} />
              </span>
              <div>
                <h3>Send Us a Message</h3>
                <p>
                  Fill in the details and we'll get back to you on WhatsApp
                  shortly.
                </p>
              </div>
              <small className="form-head__status">
                <i aria-hidden="true" />
                Direct line
              </small>
            </div>

            <div className="form-grid">
              <div>
                <label htmlFor="name" className="field-label">
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFormError("")}
                  placeholder="Enter your name"
                  className="field"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  required
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="field-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="field-label">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() => setFormError("")}
                  placeholder="+91 XXXXX XXXXX"
                  className="field"
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  required
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className="field-error">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="service" className="field-label">
                  Service Required *
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  onBlur={() => setFormError("")}
                  className="field"
                  aria-invalid={errors.service ? "true" : "false"}
                  aria-describedby={errors.service ? "service-error" : undefined}
                  required
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p id="service-error" role="alert" className="field-error">
                    {errors.service}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="field-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your project, budget or timeline…"
                  className="field"
                />
              </div>
            </div>

            {formError && (
              <p role="alert" className="alert alert--error">
                {formError}
              </p>
            )}

            {sent && (
              <p className="alert alert--ok">
                <CheckCircle2 size={16} aria-hidden="true" />
                WhatsApp opened with your inquiry — just press Send there!
              </p>
            )}

            {blockedLink && (
              <p role="alert" className="alert alert--error">
                <span>
                  Your browser blocked the WhatsApp tab.{" "}
                  <a href={blockedLink} target="_blank" rel="noopener noreferrer">
                    Open WhatsApp manually
                  </a>
                  .
                </span>
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="btn btn--gold btn--block form-submit"
            >
              {submitting ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Opening WhatsApp…
                </>
              ) : (
                <>
                  <WhatsAppMark size={18} />
                  Send Inquiry on WhatsApp
                  <ArrowRight size={17} />
                </>
              )}
            </button>

            <p className="form-note">
              Submitting opens WhatsApp with your details pre-filled.
            </p>
          </motion.form>
        </div>

        <motion.div
          className="trustbar card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {TRUST_BAR.map(({ icon: Icon, title, detail }) => (
            <div className="trustbar__item" key={title}>
              <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
              <span>
                <strong>{title}</strong>
                <small>{detail}</small>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
