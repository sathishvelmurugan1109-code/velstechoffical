import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Facebook,
  FileText,
  Grid2x2,
  Instagram,
  Lightbulb,
  Linkedin,
  Lock,
  Mail,
  MessageCircle,
  MessagesSquare,
        Phone,
  Rocket,
  Send,
  ShieldCheck,
  User,
  Users,
  Youtube,
  Zap,
} from "lucide-react";
import AnimatedText from "./AnimatedText";
import {
  COMPANY,
  SERVICES,
  SOCIALS,
  buildWhatsAppLink,
} from "../data/site";
import { buildInquiryText, validateInquiry } from "../lib/interactions";
import logo from "../assets/profile.png";

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

const PROCESS = [
  { number: "01", icon: MessagesSquare, title: "Discuss", detail: "Your Idea" },
  { number: "02", icon: Users, title: "Get Expert", detail: "Guidance" },
  { number: "03", icon: Lightbulb, title: "Receive Best", detail: "Solution" },
  { number: "04", icon: Rocket, title: "Start Your", detail: "Project" },
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
      formRef.current
        ?.querySelector(`[name="${firstInvalid}"]`)
        ?.focus();
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
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: COMPANY.phoneDisplay,
      href: buildWhatsAppLink("Hi Vels Tech! I have an inquiry."),
    },
    {
      icon: Mail,
      label: "Email",
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: COMPANY.hours,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-command">
      <div className="contact-ambient" aria-hidden="true">
        <div className="contact-grid" />
        <div className="contact-glow contact-glow-main" />
        <div className="contact-glow contact-glow-edge" />
        <div className="contact-trace contact-trace-one" />
        <div className="contact-trace contact-trace-two" />
        <div className="contact-particle particle-one" />
        <div className="contact-particle particle-two" />
        <div className="contact-particle particle-three" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="contact-layout">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="contact-intro"
          >
            <span className="script-accent" aria-hidden="true">
              Let's Talk
            </span>
            <p className="contact-eyebrow">LET’S CONNECT <span /></p>
            <h2 id="contact-heading" aria-label="Let’s Build Something Amazing Together">
              <AnimatedText aria-hidden="true" text="Let’s Build Something" as="span" className="block" delay={0.14} />
              <AnimatedText aria-hidden="true" text="Amazing Together" as="strong" className="block text-gold-soft text-gold-glow" delay={0.28} />
            </h2>
            <p className="contact-lead">Tell us about your project — your inquiry goes straight to our WhatsApp for the fastest response.</p>

            <div className="contact-process" aria-label="How we work">
              {PROCESS.map((step, index) => (
                <div key={step.number} className="contact-process-step">
                  <span>{step.number}</span><strong>{step.title}<small>{step.detail}</small></strong>
                  {index < PROCESS.length - 1 && <i />}
                </div>
              ))}
            </div>

            <div className="contact-info-list">
              {infoCards.map((item) => {
                const Icon = item.icon;
                const content = <><span className="contact-info-icon"><Icon size={21} /></span><span className="contact-info-copy"><small>{item.label}</small><strong>{item.value}</strong><em>{item.label === "Call Us" ? "Get instant support" : item.label === "WhatsApp" ? "Chat with our team" : item.label === "Email" ? "We reply within 24 hours" : "We’re here when you need us"}</em></span><ArrowUpRight className="contact-info-arrow" size={17} /></>;
                return item.href ? <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="contact-info-card">{content}</a> : <div key={item.label} className="contact-info-card">{content}</div>;
              })}
            </div>

            <div className="contact-social-row">
              <div><strong>Follow Us</strong><small>Stay connected for latest updates</small></div>
                            <div className="contact-socials">
                {SOCIALS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.id];
                  return Icon ? (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Vels Tech on ${social.label}`}
                    >
                      <Icon size={16} />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </motion.div>

          <div className="contact-command-visual">
            <div className="contact-studio" aria-hidden="true">
              <div className="contact-studio-logo"><img src={logo} alt="" width="300" height="300" /></div>
              <div className="contact-studio-screen"><img src={logo} alt="" width="100" height="100" /></div>
              <div className="contact-studio-desk" />
              <div className="contact-studio-strip strip-one" /><div className="contact-studio-strip strip-two" />
              <div className="contact-globe-orbit" />
            </div>

                                                <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="contact-form-panel"
              noValidate
            >
              <div className="contact-form-heading"><span><Send size={20} /></span><div><h3>Send Us a Message</h3><p>Fill in the details and we’ll get back to you on WhatsApp right away.</p></div></div>
              <div className="contact-form-grid">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
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
                  placeholder="e.g. Arun Kumar"
                  className="contact-field"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  required
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="contact-error">
                    {errors.name}
                  </p>
                )}
              </div>

                            <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
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
                  placeholder="e.g. +91 98765 43210"
                  className="contact-field"
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  required
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className="contact-error">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="service"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Service Required *
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  onBlur={() => setFormError("")}
                  className="contact-field appearance-none"
                  aria-invalid={errors.service ? "true" : "false"}
                  aria-describedby={errors.service ? "service-error" : undefined}
                  required
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Other / Not sure yet">
                    Other / Not sure yet
                  </option>
                </select>
                {errors.service && (
                  <p id="service-error" role="alert" className="contact-error">
                    {errors.service}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your project, budget or timeline…"
                  className="contact-field contact-message resize-none"
                />
              </div>
              </div>

                        {formError && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
              >
                {formError}
              </p>
            )}

            {sent && (
              <p className="mt-4 flex items-center gap-2 rounded-xl border border-neon/30 bg-neon/10 px-4 py-2.5 text-sm text-neon">
                <CheckCircle2 size={16} />
                WhatsApp opened with your inquiry — just press Send there!
              </p>
            )}

                          {blockedLink && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
              >
                Your browser blocked the WhatsApp tab.{" "}
                <a
                  href={blockedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-blocked-link font-semibold underline"
                >
                  Open WhatsApp manually
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="contact-submit"
            >
              {submitting ? (
                <>
                  <span aria-hidden="true" className="contact-spinner" />
                  Opening WhatsApp…
                </>
              ) : (
                <>
                  Send Inquiry on WhatsApp
                  <ArrowRight size={17} />
                </>
              )}
            </button>

              <p className="contact-form-note">
                Submitting opens WhatsApp with your details pre-filled to{" "}
                <span className="text-neon">{COMPANY.phoneDisplay}</span>
              </p>
            </motion.form>
          </div>
        </div>

        <div className="contact-trust-bar">
          <div><Zap size={20} /><span><strong>Fast Response</strong><small>We reply quickly</small></span></div>
          <i />
          <div><ShieldCheck size={20} /><span><strong>Secure &amp; Private</strong><small>Your information is safe</small></span></div>
          <i />
          <div><Users size={20} /><span><strong>Dedicated Support</strong><small>We’re here for you</small></span></div>
          <b>TECH <em>|</em> PEOPLE <em>|</em> POSSIBILITY</b>
        </div>
      </div>
    </section>
  );
}
