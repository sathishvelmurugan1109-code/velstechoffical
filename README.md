# ⚡ Vels Tech — Premium Technology Services Website

A fully responsive, high-end React.js website for **Vels Tech** — dark-mode futuristic design with neon-yellow accents, glassmorphism cards, particle background, smooth Framer Motion animations, and direct **WhatsApp inquiry integration**.

![Tech](https://img.shields.io/badge/React-18-0F0F0F?logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-0F0F0F?logo=tailwindcss) ![Motion](https://img.shields.io/badge/Framer_Motion-11-0F0F0F?logo=framer)

---

## ✨ Features

| Category | Details |
|---|---|
| 🎨 **Design** | Premium black (#0F0F0F / #1A1A1A) + Neon Yellow (#CCFF00 / #FFD700), glassmorphism, glow buttons, gradient-mesh + interactive particle canvas background |
| 🧩 **Sections** | Hero (rotating headline + CTAs), Tech-stack marquee, 8 Service cards with cursor-spotlight glow, About with animated counters, Contact form → WhatsApp, Footer |
| 💬 **WhatsApp** | Contact form + floating button deep-link to `wa.me/919597768607` with pre-filled inquiry details |
| 🔍 **SEO** | Meta tags, Open Graph, Twitter cards, JSON-LD structured data, semantic HTML (`header/main/section/footer`), SVG favicon |
| 📱 **Responsive** | Mobile-first — animated hamburger menu, fluid grids, optimized typography at every breakpoint |

## 🛠 Tech Stack

- **React 18** (Functional Components + Hooks)
- **Vite 6** — instant dev server & optimized builds
- **Tailwind CSS v4** — custom black/neon theme tokens
- **Framer Motion** — scroll reveals, staggered cards, animated menus
- **lucide-react** — crisp icon set

## 🚀 Getting Started

> Requires **Node.js 18+**

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build & local preview
npm run build
npm run preview
```

## 📁 Project Structure

```
vels-tech/
├── index.html                  # SEO meta tags, OG tags, JSON-LD, fonts
├── vite.config.js              # React + Tailwind v4 plugins
└── src/
    ├── main.jsx                # App entry
    ├── index.css               # Tailwind theme tokens + custom effects
    ├── data/
    │   └── site.js             # ⭐ Single source of truth (phone, links, services)
    ├── App.jsx                 # Page composition
    └── components/
        ├── ParticleBackground.jsx   # Interactive particle network + gradient mesh
        ├── Navbar.jsx               # Glass navbar + animated mobile menu
        ├── Hero.jsx                 # Headline, CTAs, stats, rotating words
        ├── TechMarquee.jsx          # Infinite tech-stack ticker
        ├── SectionHeading.jsx       # Reusable animated section headers
        ├── Services.jsx             # 8 interactive service cards
        ├── About.jsx                # Story, checklist, animated counters
        ├── Contact.jsx              # Inquiry form → WhatsApp deep-link
        ├── Footer.jsx               # Links, socials, contact, copyright
        └── WhatsAppFloat.jsx        # Floating "Chat on WhatsApp" button
```

## ⚙️ Customization

Everything business-specific lives in **`src/data/site.js`**:

- Phone / WhatsApp number (`COMPANY.whatsapp`)
- Facebook & Instagram URLs
- Email & working hours
- Services list, hero stats, tech stack

Change brand colors in `src/index.css` under the `@theme` block.

## 🌐 Deployment

Works out-of-the-box on **Vercel**, **Netlify**, or any static host:

```bash
npm run build   # outputs to dist/
```

> Tip: after deploying, update the `og:url` / `canonical` URLs in `index.html` and replace the placeholder `og:image` with a real 1200×630 brand image.

---

© Vels Tech · Mobile: +91 95977 68607 · [Facebook](https://www.facebook.com/velstechoffical) · [Instagram](https://www.instagram.com/vels_tech_offical)
