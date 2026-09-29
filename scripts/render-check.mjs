// ============================================================
// VELS TECH — pre-flight render check  ·  `npm run check`
// ------------------------------------------------------------
// Why this exists:
//   `vite build` only catches syntax errors. A missing import (or any
//   undefined identifier referenced at module scope) still builds fine
//   because bundlers treat it as a global — the app then dies in the
//   browser and the visitor sees a blank white page.
//   This script loads the real app through Vite and renders it to
//   HTML, so that class of bug fails loudly *before* you deploy.
//
// Uses only dependencies already installed (vite + react-dom/server).
// ============================================================

import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Every .js/.jsx file under a directory (CSS is irrelevant here). */
async function sourceFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await sourceFiles(full)));
    else if (/\.jsx?$/.test(entry.name)) found.push(full);
  }
  return found;
}

const failures = [];
const notes = [];

const pass = (label) => notes.push(`  \u2713 ${label}`);
const fail = (label) => failures.push(label);

/**
 * Vite prints module-load failures itself. We silence that so a failure is
 * reported once, by this script's own summary, and the exit code stays the
 * single source of truth for CI / pre-deploy hooks.
 */
const silentLogger = {
  info: () => {},
  warn: () => {},
  warnOnce: () => {},
  error: () => {},
  clearScreen: () => {},
  hasWarned: false,
};

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
  customLogger: silentLogger,
});

let html = "";

try {
  const appModule = await server.ssrLoadModule("/src/App.jsx");
  const App = appModule.default;

  if (typeof App !== "function") {
    fail("src/App.jsx does not default-export a React component.");
  } else {
    html = renderToString(React.createElement(App));
    if (html.length < 500) fail(`Rendered output looks empty (${html.length} chars).`);
    else pass(`App rendered to ${html.length.toLocaleString()} chars of HTML`);
  }

  // --- Every nav link must resolve to a section that actually exists ---
  const { NAV_LINKS } = await server.ssrLoadModule("/src/data/site.js");
  const missingAnchors = NAV_LINKS.map((link) => link.href)
    .filter((href) => href.startsWith("#"))
    .filter((href) => !html.includes(`id="${href.slice(1)}"`));

  if (missingAnchors.length) {
    fail(`Nav links pointing at missing sections: ${missingAnchors.join(", ")}`);
  } else {
    pass(`All ${NAV_LINKS.length} nav anchors resolve to a real section`);
  }

  // --- Core sections + WhatsApp wiring must be present ---
  const requiredIds = ["home", "services", "about", "contact"];
  const missingIds = requiredIds.filter((id) => !html.includes(`id="${id}"`));
  if (missingIds.length) fail(`Missing required section ids: ${missingIds.join(", ")}`);
  else pass(`Core sections present (${requiredIds.join(", ")})`);

  const { COMPANY, SOCIALS } = await server.ssrLoadModule("/src/data/site.js");
  if (!html.includes(`wa.me/${COMPANY.whatsapp}`)) {
    fail(`No WhatsApp link found for ${COMPANY.whatsapp}.`);
  } else {
    pass(`WhatsApp deep-link wired to ${COMPANY.whatsapp}`);
  }

  // --- Cinematic layers must actually be in the markup ---
  const layers = [
    ["hero stage", "stage__field"],
    ["perspective floor", "stage__floor"],
    ["core depth wrapper", "core-depth"],
    ["core aura", "aurora"],
    ["metric strip", "kpi__cell"],
    ["display scale", "display-hero"],
    ["scroll spine", "progress"],
    ["pointer aura", "aura"],
    ["scroll-drifting light", "page-light"],
    ["section lighting", "section--lit"],
  ];
  const missingLayers = layers.filter(([, token]) => !html.includes(token));
  if (missingLayers.length) {
    fail(`Missing cinematic layers: ${missingLayers.map(([name]) => name).join(", ")}`);
  } else {
    pass(`All ${layers.length} cinematic layers present`);
  }

  // --- Card hierarchy must be applied, not just defined ---
  const cards = ["card--feature", "card--primary", "card--info", "card--cta", "card--interactive"];
  const missingCards = cards.filter((token) => !html.includes(token));
  if (missingCards.length) {
    fail(`Card archetypes unused: ${missingCards.join(", ")}`);
  } else {
    pass(`All ${cards.length} card archetypes applied`);
  }

  // --- Reveal masks must not deadlock the IntersectionObserver ---------------
  // A `whileInView` target parked inside an `overflow: hidden` mask is clipped
  // out of its own observer: the browser intersects the target's rect against
  // every ancestor's overflow, so `isIntersecting` can never flip to true and
  // the reveal never plays. The heading then stays invisible forever while
  // still occupying its full layout box — a blank band on the page.
  //
  // The mask must therefore be the motion element carrying `whileInView`,
  // never a plain wrapper around it. This shipped once and blanked the entire
  // hero headline, so the shape is asserted rather than trusted to review.
  //
  // A plain `<span>` is matched only when it *itself* carries the
  // `overflow-hidden` mask class (`[^>]*` cannot cross the tag's closing `>`)
  // and a `whileInView` appears inside it, before its own `</span>`. That
  // distinguishes a real mask from a plain grouping wrapper that merely sits
  // next to one, and `<motion.span` cannot match at all.
  const maskDeadlock =
    /<span\b[^>]*overflow-hidden[^>]*>(?:(?!<\/span>)[\s\S]){0,400}?whileInView/;
  const deadlocked = [];

  for (const file of await sourceFiles(join(ROOT, "src"))) {
    if (maskDeadlock.test(await readFile(file, "utf8"))) {
      deadlocked.push(file.slice(ROOT.length));
    }
  }

  if (deadlocked.length) {
    fail(
      `Text hidden behind its own reveal mask — whileInView can never fire:\n    ${deadlocked.join("\n    ")}`
    );
  } else {
    pass("No reveal mask traps its own whileInView observer");
  }
  // --- Business facts ---------------------------------------------------
  // Two rules this project has already broken once, so they are asserted:
  //   1. every contact detail the UI renders must also be what index.html
  //      advertises (meta + JSON-LD) — one source of truth, no drift;
  //   2. nothing may ship that the business never published. The `forbidden`
  //      list is deliberately literal. If the business later confirms one of
  //      these numbers or fixes an address, delete its line here.
  const indexSrc = await readFile(join(ROOT, "index.html"), "utf8");
  const drifted = [
    ["email", COMPANY.email],
    ["phone", COMPANY.phoneTel],
  ].filter(([, value]) => !indexSrc.includes(value));

  if (drifted.length) {
    fail(`index.html disagrees with site.js on: ${drifted.map(([name]) => name).join(", ")}`);
  } else {
    pass("Contact details match index.html (meta + JSON-LD)");
  }

  // Every configured profile must link to a real profile — not a platform home
  // page — be wired into the markup, and be advertised in index.html. The
  // footer once hardcoded `https://www.linkedin.com`: an icon that looked live
  // and went nowhere, which the first check below is here to catch.
  const bareRoots = SOCIALS.filter((social) => {
    try {
      return !new URL(social.href).pathname.replace(/\/+$/, "");
    } catch {
      return true; // not a usable absolute URL
    }
  });
  const unwired = SOCIALS.filter((social) => !html.includes(social.href));
  const unlisted = SOCIALS.filter((social) => !indexSrc.includes(social.href));

  if (bareRoots.length) {
    fail(
      `Social links pointing at a platform home page, not a profile: ${bareRoots
        .map((social) => social.label)
        .join(", ")}`
    );
  } else if (unwired.length) {
    fail(`Social profiles defined but never rendered: ${unwired.map((social) => social.label).join(", ")}`);
  } else if (unlisted.length) {
    fail(`Social profiles missing from index.html sameAs: ${unlisted.map((social) => social.label).join(", ")}`);
  } else {
    pass(`All ${SOCIALS.length} social profiles are real links, rendered and listed in index.html`);
  }

  const published = [
    "Projects Completed",
    "Happy Clients",
    "Years Experience",
    "Client Satisfaction",
  ];
  const unpublished = published.filter((label) => !html.includes(label));

  if (unpublished.length) {
    fail(`Published metrics no longer rendered: ${unpublished.join(", ")}`);
  } else {
    pass(`All ${published.length} published metrics rendered`);
  }

  const forbidden = [
    ["4.9/5", "client-satisfaction score the business never published"],
    ["100% Commitment to Growth", "statistic the business never published"],
    ["v.elstechoffical", "mailbox that does not match index.html"],
    [
      'href="https://www.linkedin.com"',
      "social icon pointing at the platform home page, not the Vels Tech profile",
    ],
    [
      'href="https://www.youtube.com"',
      "social icon pointing at the platform home page, not a Vels Tech channel",
    ],
  ];
  const offenders = [];

  for (const file of await sourceFiles(join(ROOT, "src"))) {
    const text = await readFile(file, "utf8");
    for (const [token, why] of forbidden) {
      if (text.includes(token)) offenders.push(`${file.slice(ROOT.length)} — ${why}`);
    }
  }

  if (offenders.length) {
    fail(`Fabricated or stale business data:\n    ${offenders.join("\n    ")}`);
  } else {
    pass("No invented statistics or stale contact data in src/");
  }
} catch (error) {
  fail(`App failed to load/render:\n${error?.stack ?? error}`);
} finally {
  await server.close();
}

console.log("Vels Tech — render check\n");
notes.forEach((line) => console.log(line));

if (failures.length) {
  console.log("\nFAILED");
  failures.forEach((line) => console.log(`  \u2717 ${line}`));
  console.log(
    "\nThese are the failures `vite build` cannot see — a blank page or a wrong fact on a live site. Fix them before deploying."
  );
  process.exit(1);
}

console.log("\nPASSED — the app renders and every link resolves.");
