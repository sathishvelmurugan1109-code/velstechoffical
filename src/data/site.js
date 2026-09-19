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
  { label: "Portfolio", href: "#portfolio" },
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
    title: "Website Design & Development",
    tagline: "Business Sites · Landing Pages · CMS",
    description: "High-converting websites built to build trust and turn visitors into customers.",
    points: [
      "Custom Business Websites",
      "Lead Generation Pages",
      "SEO-Friendly Structure",
      "Fast Performance Builds",
    ],
    featured: true,
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Android · iOS · Cross Platform",
    description: "Modern mobile experiences designed for engagement, retention, and growth.",
    points: [
      "Smartphone App Design",
      "React Native / Flutter",
      "User-Focused UX",
      "App Store Readiness",
    ],
  },
  {
    icon: Megaphone,
    title: "Performance Marketing",
    tagline: "Meta Ads · Google Ads · Funnels",
    description: "Revenue-focused campaigns that bring qualified leads and measurable results.",
    points: [
      "Paid Ad Campaigns",
      "Landing Page Strategy",
      "Audience Targeting",
      "Conversion Tracking",
    ],
  },
  {
    icon: TrendingUp,
    title: "SEO & Local Growth",
    tagline: "Organic Reach · Visibility · Traffic",
    description: "Search-first growth systems that help brands get found and stay ahead.",
    points: [
      "Keyword Optimization",
      "Technical SEO",
      "Local Search Growth",
      "Monthly Performance Reports",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Growth",
    tagline: "Store Setup · Catalogs · Sales Funnels",
    description: "Conversion-ready commerce experiences that increase orders and repeat sales.",
    points: [
      "Store Design & Setup",
      "Product UX Optimization",
      "Payment & Checkout Flow",
      "Sales Growth Strategy",
    ],
  },
  {
    icon: PenTool,
    title: "Brand Identity & Design",
    tagline: "UI/UX · Visual Systems · Creative Direction",
    description: "Clean, premium brand experiences that make businesses feel credible and memorable.",
    points: [
      "Wireframes & Mockups",
      "Brand Style Systems",
      "Mobile-First Design",
      "Creative Visual Direction",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Hosting & DevOps",
    tagline: "AWS · Deployment · Security",
    description: "Reliable infrastructure support so your business stays online, fast, and scalable.",
    points: [
      "Website Deployment",
      "Domain & SSL Setup",
      "Cloud Optimization",
      "Monitoring & Updates",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Support & Maintenance",
    tagline: "Audit · Backup · Ongoing Care",
    description: "Continuous technical support to keep your platform secure, smooth, and always running.",
    points: [
      "Security Checks",
      "Regular Updates",
      "Backups & Recovery",
      "Priority Technical Support",
    ],
  },
];
