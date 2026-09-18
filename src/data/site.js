// ============================================================
// VELS TECH — Central site configuration & content data
// Edit this single file to update company info everywhere.
// ============================================================
import {
  Code2,
  Smartphone,
  Megaphone,
  TrendingUp,
  ShoppingCart,
  PenTool,
  Cloud,
  ShieldCheck,
} from "lucide-react";

export const COMPANY = {
  name: "Vels Tech",
  tagline: "Premium Technology Services",
  phoneDisplay: "+91 95977 68607",
  phoneTel: "+919597768607",
  whatsapp: "919597768607",
  email: "hello@velstech.in", // placeholder — update with real email
  hours: "Mon – Sat · 9:00 AM – 9:00 PM",
  facebook: "https://www.facebook.com/velstechoffical",
  facebookLabel: "velstech offical",
  instagram: "https://www.instagram.com/vels_tech_offical",
  instagramLabel: "vels_tech_offical",
};

/** Build a WhatsApp deep-link with a pre-filled inquiry message. */
export const buildWhatsAppLink = (message) =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;

export const DEFAULT_WA_MESSAGE =
  "Hi Vels Tech! 👋 I'd like a free consultation for my project.";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "15+", label: "Technologies" },
  { value: "24/7", label: "Support" },
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
    tagline: "React JS · Next.js · E-Commerce",
    description:
      "Blazing-fast, SEO-ready websites & web apps built with React JS and Next.js — from business sites to full-scale e-commerce stores.",
    points: [
      "React JS & Next.js builds",
      "E-commerce development",
      "CMS & landing pages",
      "Core Web Vitals optimized",
    ],
    featured: true,
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Android · iOS · Cross-Platform",
    description:
      "Beautiful, high-performance mobile apps for Android & iOS with smooth UX, offline support and store deployment included.",
    points: [
      "Android & iOS apps",
      "React Native / Flutter",
      "Push notifications",
      "Play Store & App Store launch",
    ],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    tagline: "Social Ads · Branding",
    description:
      "Data-driven campaigns on Meta & Google that turn scrolls into sales — plus complete brand identity design.",
    points: [
      "Meta & Google Ads",
      "Social media management",
      "Brand identity & logos",
      "Conversion tracking",
    ],
  },
  {
    icon: TrendingUp,
    title: "SEO Services",
    tagline: "On-Page · Off-Page · Rank Boosting",
    description:
      "Rank higher, get found faster. Complete technical, on-page and off-page SEO that compounds traffic month after month.",
    points: [
      "Keyword research & on-page SEO",
      "High-authority backlinks",
      "Local SEO / Google Business",
      "Monthly rank reports",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    tagline: "Shopify · WooCommerce · Custom",
    description:
      "Sell everywhere with secure payment gateways, inventory management and conversion-optimized product pages.",
    points: [
      "Shopify & WooCommerce",
      "Payment gateway setup",
      "Product page optimization",
      "Sales analytics",
    ],
  },
  {
    icon: PenTool,
    title: "UI / UX Design",
    tagline: "Figma · Prototyping · Design Systems",
    description:
      "Pixel-perfect interfaces designed around your users — wireframes to interactive prototypes that developers love.",
    points: [
      "User research & wireframes",
      "Interactive prototypes",
      "Design systems",
      "Mobile-first layouts",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    tagline: "AWS · CI/CD · Scaling",
    description:
      "Ship faster with reliable cloud infrastructure, automated deployments and 99.9% uptime monitoring.",
    points: [
      "AWS / cloud hosting",
      "CI/CD pipelines",
      "Domain & SSL setup",
      "Performance monitoring",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & Security",
    tagline: "Audits · Backups · 24/7 Support",
    description:
      "Sleep easy — regular updates, security audits, daily backups and priority support keep your product safe.",
    points: [
      "Security audits & SSL",
      "Automated daily backups",
      "Speed optimization",
      "24/7 priority support",
    ],
  },
];
