import { useCallback, useEffect, useRef, useState } from "react";
import { COMPANY, SERVICES } from "../data/site";
import logo from "../assets/profile.png";

// ============================================================
// Cinematic intro — dark gold studio splash
// Plays once per browser session, skippable, motion-aware.
// ============================================================

const SESSION_KEY = "vels-splash-seen";

const INTRO_MS = 4200; // full progress sweep
const CLOSE_MS = 1150; // curtain sweep + fade out
const WORD_MS = 1000; // promise-word rotation

const PROMISE_WORDS = ["Build", "Innovate", "Grow", "Together"];

/** Short labels for the right-hand service rail (keeps the rail compact). */
const SERVICE_LABELS = [
  "Website Design",
  "Mobile Apps",
  "Performance Ads",
  "SEO Growth",
];
const RAIL_SERVICES = SERVICES.slice(0, SERVICE_LABELS.length).map(
  (service, index) => ({ ...service, short: SERVICE_LABELS[index] })
);

const STAGES = [
  { upTo: 28, label: "Warming up the studio" },
  { upTo: 62, label: "Loading brand experience" },
  { upTo: 90, label: "Fine-tuning the details" },
  { upTo: Infinity, label: "Ready to launch" },
];

const statusFor = (progress) =>
  (STAGES.find((stage) => progress < stage.upTo) ?? STAGES[STAGES.length - 1])
    .label;

/** Show the intro once per session; `?splash=1` forces it, `?nosplash=1` skips it. */
export function shouldShowSplash() {
  if (typeof window === "undefined") return false;

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has("splash")) return true;
    if (params.has("nosplash")) return false;
    return window.sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    // Storage blocked (private mode) — still show the intro.
    return true;
  }
}

function markSplashSeen() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* Ignore — the intro simply replays on the next load. */
  }
}

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);

  const finishedRef = useRef(false);
  const rafRef = useRef(null);
  const closeTimerRef = useRef(null);
  const doneTimerRef = useRef(null);

  // Keep the latest callback in a ref so `close` stays referentially stable.
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const close = useCallback((immediate = false) => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    markSplashSeen();
    setProgress(100);
    setClosing(true);

    doneTimerRef.current = window.setTimeout(
      () => {
        setHidden(true);
        onFinishRef.current?.();
      },
      immediate ? 40 : CLOSE_MS
    );
  }, []);

  /* Lock page scroll, allow Esc-to-skip, clean up every timer on unmount. */
  useEffect(() => {
    document.body.classList.add("is-splash-open");

    const onKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Enter") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("is-splash-open");
      window.removeEventListener("keydown", onKeyDown);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.clearTimeout(closeTimerRef.current);
      window.clearTimeout(doneTimerRef.current);
    };
  }, [close]);

  /* Boot loader: eased 0 → 100 sweep, then hand over to the curtain exit. */
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setProgress(100);
      doneTimerRef.current = window.setTimeout(() => close(true), 900);
      return () => window.clearTimeout(doneTimerRef.current);
    }

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / INTRO_MS, 1);
      const eased = 1 - Math.pow(1 - t, 1.9);
      setProgress(Math.min(100, Math.round(eased * 100)));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        closeTimerRef.current = window.setTimeout(() => close(), 360);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.clearTimeout(closeTimerRef.current);
    };
  }, [close]);

  /* Promise-word roller. */
  useEffect(() => {
    if (closing) return undefined;

    const id = window.setInterval(
      () => setWordIndex((index) => (index + 1) % PROMISE_WORDS.length),
      WORD_MS
    );

    return () => window.clearInterval(id);
  }, [closing]);

  if (hidden) return null;

  return (
    <div
      className={`splash-root${closing ? " is-closing" : ""}`}
      onClick={() => close()}
      role="dialog"
      aria-modal="true"
      aria-label={`${COMPANY.name} — ${COMPANY.tagline}`}
    >
      {/* --- backdrop: ambient gold wash, vignette, LED beams, marble floor --- */}
      <div className="splash-ambient" aria-hidden="true" />
      <div className="splash-vignette" aria-hidden="true" />

      <span className="splash-beam b1" aria-hidden="true" />
      <span className="splash-beam b2" aria-hidden="true" />
      <span className="splash-beam b3" aria-hidden="true" />
      <span className="splash-beam b4" aria-hidden="true" />
      <span className="splash-beam b5" aria-hidden="true" />
      <div className="splash-floor" aria-hidden="true" />

      {/* --- left rail: studio promise stack --- */}
      <div className="splash-rail splash-rail-left" aria-hidden="true">
        <p>Design</p>
        <p>Develop</p>
        <p>Grow</p>
        <span className="splash-rail-rule" />
      </div>

      {/* --- right rail: service wall --- */}
      <div className="splash-rail splash-rail-right" aria-hidden="true">
        {RAIL_SERVICES.map(({ icon: Icon, short }) => (
          <div className="splash-service" key={short}>
            <span className="splash-service-icon">
              <Icon size={15} strokeWidth={2} />
            </span>
            <span>{short}</span>
          </div>
        ))}
      </div>

      {/* --- centre stage: logo lockup + wordmark + promise roller --- */}
      <div className="splash-stage">
        <div className="splash-emblem">
          <span className="splash-emblem-glow" aria-hidden="true" />
          <img
            className="splash-logo"
            src={logo}
            alt="Vels Tech logo"
            width={152}
            height={152}
            draggable={false}
          />
          <span className="splash-sheen" aria-hidden="true" />
        </div>

        <h1 className="splash-wordmark">
          <span className="splash-wordmark-main">{COMPANY.name}</span>
          <span className="splash-wordmark-sub">Digital Studio</span>
        </h1>

        <p className="splash-divider">{COMPANY.tagline}</p>

        <div className="splash-roller" aria-hidden="true">
          {PROMISE_WORDS.map((word, index) => (
            <span
              key={word}
              className={index === wordIndex ? "is-active" : undefined}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* --- boot loader --- */}
      <div className="splash-progress" role="status" aria-live="polite">
        <div className="splash-progress-meta">
          <span>{statusFor(progress)}</span>
          <span>{progress}%</span>
        </div>
        <div className="splash-progress-track">
          <span
            className="splash-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        className="splash-skip"
        onClick={(event) => {
          event.stopPropagation();
          close();
        }}
      >
        Skip intro
      </button>

      {/* --- exit curtain --- */}
      <div className="splash-curtain" aria-hidden="true">
        <span />
        <span />
      </div>
    </div>
  );
}