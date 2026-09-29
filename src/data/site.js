// ============================================================
// VELS TECH — Central site configuration & content data
// Edit this single file to update company info everywhere.
// ============================================================
import {
  Code2,
  Smartphone,
  Megaphone,
  Search,
  ShoppingCart,
  PenTool,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import { buildWhatsAppUrl } from "../lib/interactions";

export const COMPANY = {
  name: "Vels Tech",
  tagline: "Premium Digital Solutions",
  phoneDisplay: "+91 95977 68607",
  phoneTel: "+919597768607",
  whatsapp: "919597768607",
  email: "velstechoffical@gmail.com", // official business email (matches index.html JSON-LD)
  hours: "Mon – Sat · 9:00 AM – 9:00 PM",
  facebook: "https://www.facebook.com/velstechoffical",
  facebookLabel: "velstech offical",
  instagram: "https://www.instagram.com/vels_tech_offical",
  instagramLabel: "vels_tech_offical",
  // Not configured yet — leave empty and the icon stays hidden.
  // Add the real profile URL (e.g. "https://www.linkedin.com/company/vels-tech")
  // and the social icon appears automatically in the footer + contact section.
  linkedin: "",
  youtube: "",
};

/** Build a WhatsApp deep-link with a pre-filled inquiry message. */
export const buildWhatsAppLink = (message) =>
  buildWhatsAppUrl(COMPANY.whatsapp, message);

/**
 * Social profiles that are actually configured.
 * Every entry here is a real destination — nothing is fabricated, and
 * platforms without a configured URL are not rendered at all.
 */
export const SOCIALS = [
  { id: "facebook", label: "Facebook", href: COMPANY.facebook },
  { id: "instagram", label: "Instagram", href: COMPANY.instagram },
  { id: "linkedin", label: "LinkedIn", href: COMPANY.linkedin },
  { id: "youtube", label: "YouTube", href: COMPANY.youtube },
].filter((social) => Boolean(social.href));

/** Optional newsletter backend. See Footer.jsx for the fallback path. */
const envNewsletterEndpoint = import.meta.env?.VITE_NEWSLETTER_ENDPOINT ?? "";

export const NEWSLETTER = {
  /**
   * Paste a real subscription endpoint (Formspree, Buttondown, a Mailchimp
   * proxy, ...) or set VITE_NEWSLETTER_ENDPOINT to POST signups to it.
   * While this is empty the form opens the visitor's mail app with a
   * pre-filled subscription request to COMPANY.email — a real submission
   * the studio can action, never a fake success state.
   */
  endpoint: String(envNewsletterEndpoint).trim(),
  subject: "The Signal — newsletter subscription",
};

export const DEFAULT_WA_MESSAGE =
  "Hi Vels Tech! 👋 I'd like a free consultation for my project.";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const TECH_STACK = [
  "React JS",
  "Next.js",
  "Node JS",
  "React Native",
  "Flutter",
  "Tailwind CSS",
  "MongoDB",
  "Firebase",
  "AWS",
  "Figma",
  "WordPress",
  "Google Ads",
  "Meta Ads",
  "SEO",
];

export const SERVICES = [
  {
    icon: Code2,
    title: "Website Development",
    tagline: "Modern · Responsive · Fast",
    description: "Custom websites that look amazing, perform flawlessly and grow your brand online.",
    points: [
      "Business Websites",
      "E-commerce Stores",
      "Landing Pages",
    ],
    featured: true,
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "iOS | Android | Cross Platform",
    description: "Powerful mobile apps that deliver seamless experiences and real business value.",
    points: [
      "iOS & Android Apps",
      "Cross Platform Apps",
      "UI/UX Design",
    ],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    tagline: "More Reach · More Leads",
    description: "Strategic digital marketing to boost brand visibility and drive quality leads.",
    points: [
      "Social Media Marketing",
      "Content Marketing",
      "Paid Ad Campaigns",
    ],
  },
  {
    icon: Search,
    title: "SEO Optimization",
    tagline: "Rank Higher · Grow Faster",
    description: "Data-driven SEO strategies to improve search rankings and organic traffic.",
    points: [
      "Keyword Research",
      "On-Page & Off-Page SEO",
      "Local SEO",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Growth",
    tagline: "Store Setup · Catalogs · Sales Funnels",
    description: "Conversion-ready commerce experiences that increase orders and repeat sales.",
    points: [
      "Shopify / WooCommerce",
      "Product Catalogs",
      "Payment Integration",
    ],
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    tagline: "Creative · User Focused · Modern",
    description: "Thoughtful digital interfaces that make every interaction feel clear, intuitive and distinctly yours.",
    points: [
      "Website UI/UX",
      "Mobile App UI/UX",
      "Brand Identity Design",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Hosting & DevOps",
    tagline: "Secure · Scalable · Reliable",
    description: "Reliable infrastructure support so your business stays online, fast, and scalable.",
    points: [
      "Web Hosting",
      "Domain & SSL Setup",
      "Cloud Optimization",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Support & Maintenance",
    tagline: "Secure · Smooth · Always On",
    description: "Continuous technical support to keep your platform secure, smooth, and always running.",
    points: [
      "Security Checks",
      "Regular Updates",
      "Backup & Recovery",
    ],
  },
];
