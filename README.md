# ⚡ Vels Tech — Premium Technology Services Website

A fully responsive, high-end React.js website for **Vels Tech** — a premium 2026 dark-luxury design system with deep-black surfaces, strategic gold accents, glassmorphism, a particle backdrop, advanced but restrained Framer Motion animation, and direct **WhatsApp inquiry integration**.

![Tech](https://img.shields.io/badge/React-18-0F0F0F?logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-0F0F0F?logo=tailwindcss) ![Motion](https://img.shields.io/badge/Framer_Motion-11-0F0F0F?logo=framer)

---

## ✨ Features

| Category | Details |
|---|---|
| 🎨 **Design system** | One dark luxury system — `#040406` void → `#0D0D11` carbon surfaces, strategic gold (`#FFD000` + `#FFE9A3` for accessible text), soft white, muted grey. Gold is reserved for CTAs, active states, key numbers, hairlines and light trails |
| 🖋 **Typography** | Space Grotesk (display) + Inter (text) only, on a single fluid scale (`display-1/2/3`, `lead`, `copy`, `kicker`, `label`) |
| 🧩 **Sections** | Hero ("Vels Tech core": orbiting gold rings + glass brand disc + light trails), capability band (`#portfolio`), 8 service cards + 01→04 delivery flow, About story + live metrics panel, Contact (4 channels + WhatsApp form), premium footer with gold light waves |
| 🎬 **Cinematic graphics** | Layered hero stage — atmospheric light field, volumetric beams, a CSS 3D perspective floor with a glowing horizon, floating glass shards, focus vignette, and an orbit-core with an aurora halo; plus a page-wide light that drifts with scroll depth |
| ✨ **Animation** | ~1.4 s skippable intro (gold sweep + hairline), Framer Motion scroll reveals, word/mask/blur text reveals, magnetic buttons, card cursor bloom, pointer-tilt hero core, gold reading spine, travelling section hairlines, footer light waves — `prefers-reduced-motion` respected everywhere |
| 💬 **WhatsApp** | Contact form + floating button + navbar + footer deep-link to `wa.me/919597768607` with pre-filled inquiry details, plus a popup-blocked fallback link |
| 🔍 **SEO** | Meta tags, Open Graph, Twitter cards, JSON-LD structured data, semantic HTML (`header/main/section/footer`), PNG favicon, canonical config preserved |
| 📱 **Responsive** | Purpose-built compositions for 320 / 375 / 390 / 430 px, tablet, laptop, desktop and large desktop — hero rings become a stacked grid on phones, services go 1 → 2 → 4 columns, no desktop shrink-down |

## 🛠 Tech Stack

- **React 18** (Functional Components + Hooks)
- **Vite 6** — instant dev server & optimized builds
- **Tailwind CSS v4** — design tokens via `@theme`, utilities for layout
- **Framer Motion** — scroll reveals, text reveals, the intro and the drawer
- **lucide-react** — crisp icon set

## 🎛 Design System

Everything visual lives in **`src/index.css`** (one file, 17 numbered sections):

| Layer | What it gives you |
|---|---|
| **Tokens** (`@theme`) | Surface ladder `void → onyx → carbon → graphite → edge`, gold `gold / gold-deep / gold-soft`, neutrals `mist / dim`, one radius scale, elevation, `ease-out-expo`, named animations |
| **Type scale** | `.display-hero` (hero), `.display-1/2/3`, `.lead`, `.copy`, `.kicker`, `.label`, `.gold-text`, `.num` — fluid `clamp()`, never hand-tuned per section |
| **Layout** | `.shell`, `.section` rhythm, `.section-rule` (gold hairline with a slow travelling highlight), `.amb-grid`, `.amb-orb`, `.trail` |
| **§18 Lighting & continuity** | One light field per section (`--lit-x/y/size/strength/hue`), so the light source *moves* as you scroll — plus `.page-light`, which drifts with scroll depth behind all content |
| **§19 Card hierarchy** | Five archetypes: `.card`, `--feature` (gold rim + corner bloom), `--primary` (animated gradient rim), `--info` (flat, left light accent), `--cta`; with `.card--interactive` + `.card__bloom` cursor glow |
| **§20 Hero stage** | `.stage__field` (atmosphere), `__beam` (volumetric), `__floor`/`__grid` (CSS 3D perspective floor), `__horizon`, `__shard`, `__vignette`, `.core-depth` (pointer tilt), `.aurora` (core halo), `.kpi` (metric strip) |
| **§21 Interaction layer** | `.progress` reading spine, `.aura` pointer light |
| **Primitives & buttons** | `.chip`, `.icon-chip`, `.live`; one `.btn` with `--gold`, `--outline`, `--ghost`, `--sm`, `--block` |
| **Sections** | `.nav`/`.drawer`, `.hero`/`.core`, `.band`, `.svc-card`/`.flow`, `.about-*`, `.contact-*`/`.field`, `.footer`/`.cta-panel`, `.intro`, `.wa-float` |

**Motion rules the whole site follows:** only `transform`/`opacity` are animated — never layout properties; every ambient loop is a single named keyframe; hover styles live behind `@media (hover: hover) and (pointer: fine)` so touch devices get clean `:active` feedback instead of dead styles; and one global `prefers-reduced-motion` block stops every loop for users who ask for it.

**Performance contract for the new layers:** the whole hero stage is driven by *one* rAF scheduler (`useStageMotion`) that publishes `--px`/`--py`/`--scrolly` as CSS custom properties, so React never re-renders during scroll or pointer movement. It self-disables on small screens and for reduced-motion users. The cursor aura's lerp loop cancels itself once settled, the scan/beams/shards are hidden on touch, the particle canvas adapts its population to the device and pauses when the tab is hidden, and the KPI/stat counters animate only once in view.

**Breakpoints:** 400 (small phones) · 640 · 768 (tablet) · 1024 (laptop) · 1200 · 1536 (large desktop).

## 🚀 Getting Started

> Requires **Node.js 18+**

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Sanity-check the app before deploying (see "Blank page?" below)
npm run check

# 4. Production build & local preview
npm run build
npm run preview
```

### 🩺 Blank page? "Website not opening?"

A white/blank screen almost always means JavaScript crashed **before React mounted** —
usually a missing import. `vite build` cannot catch this: bundlers treat an unknown
identifier as a global, so the build passes and the browser dies at runtime.

Run the render check, which loads the real app through Vite and reports the exact
error (non-zero exit code, so it can gate a deploy):

```bash
npm run check
```

Real example it catches:

```
✗ App failed to load/render:
ReferenceError: Youtube is not defined
```

## 🧾 Business-facts guard

A wrong fact on a live site is as damaging as a blank page, so `npm run check` also
asserts that the numbers and contact details are the ones the business actually gave us:

```
✓ Contact details match index.html (meta + JSON-LD)   # phone + email, no drift
✓ All 4 published metrics rendered                    # 50+ · 30+ · 5+ · 99%
✓ No invented statistics or stale contact data in src/
```

The last check scans `src/` for claims nobody approved. Its `forbidden` list is
deliberately literal and lives at the bottom of `scripts/render-check.mjs` — when the
business confirms such a number, delete that one line there. Two real regressions this
already blocks: a `4.9/5` satisfaction score that contradicted the About panel's `99%`,
and a mistyped mailbox that no longer matched `index.html`.

Other causes of a blank page:

| Symptom | Cause | Fix |
|---|---|---|
| Blank page after double-clicking `dist/index.html` | Vite emits `<script type="module">`, which browsers block on the `file://` protocol | Serve it: `npm run preview` (http://localhost:4173) |
| Blank page only in production | Stale cached HTML pointing at an old asset hash | Hard-refresh (Ctrl+Shift+R); hosts set `must-revalidate` after a redeploy |
| `localhost:5173` refuses to connect | Port already in use by another app | Vite auto-increments the port — check the terminal for the real URL |

## 📁 Project Structure

```
vels-tech/
├── index.html                  # SEO meta tags, OG tags, JSON-LD, Google Fonts (Inter + Space Grotesk)
├── vite.config.js              # React + Tailwind v4 plugins, dev/preview server
├── scripts/
│   └── render-check.mjs        # `npm run check` — renders the app, fails on blank-page bugs and unapproved business facts
└── src/
    ├── main.jsx                # App entry
    ├── index.css               # ⭐ The whole design system (tokens → components → responsive)
    ├── data/
    │   └── site.js             # ⭐ Single source of truth (phone, links, services, nav)
    ├── lib/
    │   ├── interactions.js     # Pure logic: WhatsApp/mailto builders, validation
    │   └── motion.js           # Easing + reveal variants + hooks: magnetic, spotlight,
    │                           # tilt, stage motion (--px/--py/--scrolly), scroll progress
    ├── App.jsx                 # Page composition
    └── components/
        ├── PageIntro.jsx            # ~1.4s skippable brand intro (session-scoped)
        ├── ParticleBackground.jsx   # Fixed backdrop: orbs, drifting grid, particle canvas
        ├── CursorAura.jsx           # Desktop pointer light (self-cancelling lerp loop)
        ├── ScrollProgress.jsx       # Gold reading spine pinned to the viewport top
        ├── Navbar.jsx               # Glass navbar, active-section tracking, mobile drawer
        ├── Hero.jsx                 # Headline, rotating service word, CTAs, core visual, stats
        ├── TechMarquee.jsx          # #portfolio capability band (tech ticker + service links)
        ├── SectionHeading.jsx       # Reusable animated section header
        ├── Services.jsx             # 8 service cards + 01→04 delivery flow + WhatsApp CTA
        ├── About.jsx                # Story, commitments, live metrics panel
        ├── Contact.jsx              # 4 contact channels + inquiry form → WhatsApp
        ├── Footer.jsx               # CTA panel, gold light waves, columns, newsletter
        ├── WhatsAppFloat.jsx        # Floating "Chat on WhatsApp" button
        ├── WhatsAppMark.jsx         # Shared WhatsApp brand glyph
        ├── AnimatedText.jsx         # chars / words / lines / mask text reveals
        ├── CountUp.jsx              # Shared in-view number counter
        └── Reveal.jsx               # Reusable scroll-reveal wrapper
```

## ⚙️ Customization

Everything business-specific lives in **`src/data/site.js`**:

- Phone / WhatsApp number (`COMPANY.whatsapp`, `phoneTel`, `phoneDisplay`)
- Facebook / Instagram / LinkedIn / YouTube URLs — `SOCIALS` only renders platforms that have a real URL
- Email & working hours
- Services list (drives the hero chips, service cards, footer links and the `#portfolio` capability chips), nav links, tech stack, hero stats

Design changes happen in **`src/index.css`**:

| To change… | Edit |
|---|---|
| Brand gold | `--color-gold`, `--color-gold-deep`, `--color-gold-soft` in `@theme` |
| Background ladder | `--color-void`, `--color-onyx`, `--color-carbon`, `--color-graphite` |
| Text greys | `--color-mist` (secondary), `--color-dim` (labels) |
| Corner rounding | `--radius-xs/sm/md/lg` — every card, field and chip inherits them |
| Glow strength | `--shadow-glow` and the `rgba(255, 208, 0, …)` values in the component blocks |
| Animation speed | `--animate-*` tokens plus the `@keyframes` block |
| Intro length | `DURATION_MS` / `CLOSE_MS` in `src/components/PageIntro.jsx` |

The intro is session-scoped: append `?splash=1` to force it or `?nosplash=1` to skip it.

## 🌐 Deployment

Works out-of-the-box on **Vercel**, **Netlify**, or any static host:

```bash
npm run build   # outputs to dist/
```

> Tip: after deploying, update the `og:url` / `canonical` URLs in `index.html` and replace the placeholder `og:image` with a real 1200×630 brand image.

---

© Vels Tech · Mobile: +91 95977 68607 · [Facebook](https://www.facebook.com/velstechoffical) · [Instagram](https://www.instagram.com/vels_tech_offical)
