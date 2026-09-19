// ============================================================
// VELS TECH — pure interaction helpers
// ------------------------------------------------------------
// Deliberately free of React / icon / browser imports so the
// critical interaction logic can be unit tested with the built-in
// Node test runner (`npm test`) — no extra dependencies required.
// Browser-only side effects stay inside the components.
// ============================================================

/** Strip everything except digits (wa.me + tel: need a bare number). */
export const normalisePhone = (value) => String(value ?? "").replace(/\D/g, "");

/** Build a WhatsApp deep-link with a pre-filled message. */
export const buildWhatsAppUrl = (phone, message) =>
  `https://wa.me/${normalisePhone(phone)}?text=${encodeURIComponent(
    String(message ?? "")
  )}`;

/** Build a mailto: link with an encoded subject + body. */
export const buildMailtoUrl = ({ to, subject = "", body = "" }) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body
  )}`;

/**
 * URL-safe anchor id for a service title.
 * "SEO & Local Growth" -> "seo-and-local-growth"
 */
export const serviceAnchorId = (title) =>
  String(title ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Reasonable email check (native `type="email"` shape, no spaces). */
export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(value ?? "").trim());

/**
 * Accepts international formats with optional +, spaces, dashes,
 * dots, slashes and brackets — requires 7–15 actual digits.
 */
export const isValidPhone = (value) => {
  const raw = String(value ?? "").trim();
  if (!/^\+?[\d\s().\-/]{7,}$/.test(raw)) return false;
  const digits = normalisePhone(raw);
  return digits.length >= 7 && digits.length <= 15;
};

/** Compose the inquiry message the contact form hands over to WhatsApp. */
export const buildInquiryText = ({
  name = "",
  phone = "",
  service = "",
  message = "",
} = {}) =>
  `*New Inquiry — Vels Tech Website* 🚀\n\n` +
  `👤 *Name:* ${String(name).trim()}\n` +
  `📞 *Phone:* ${String(phone).trim()}\n` +
  `🛠️ *Service Required:* ${service}\n` +
  `💬 *Message:* ${String(message).trim() || "—"}`;

/**
 * Validate the inquiry form.
 * @returns {Record<string, string>} field -> message map (empty = valid)
 */
export const validateInquiry = (form = {}) => {
  const errors = {};
  const name = String(form.name ?? "").trim();
  const phone = String(form.phone ?? "").trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!phone) errors.phone = "Please enter your phone number.";
  else if (!isValidPhone(phone))
    errors.phone = "Enter a valid phone number (7–15 digits).";
  if (!String(form.service ?? "").trim())
    errors.service = "Please select the service you need.";

  return errors;
};

/** Body sent to the studio inbox when the newsletter has no API endpoint. */
export const buildNewsletterBody = (email) =>
  [
    "New newsletter subscriber for The Signal.",
    "",
    `Email: ${String(email).trim()}`,
    `Signed up from: ${typeof window === "undefined" ? "Vels Tech website" : window.location.href}`,
    "",
    "Please add this address to the Vels Tech newsletter list.",
  ].join("\n");