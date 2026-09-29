import { useCallback, useEffect, useRef, useState } from "react";
import { COMPANY } from "../data/site";
import logo from "../assets/profile.png";

// ============================================================
// Premium page intro — short by design (~1.4s, was ~5.4s).
//   • brand mark + gold light sweep + hairline progress
//   • skippable by click, Escape, Enter or the Skip button
//   • one intro per browser session, same storage key as before so
//     returning visitors see the site immediately
//   • `?splash=1` forces it (handy for demos), `?nosplash=1` skips it
//   • reduced-motion users get a near-instant hand-off
// ============================================================

const SESSION_KEY = "vels-splash-seen";
const DURATION_MS = 1200;
const CLOSE_MS = 400;

/** Show the intro once per session; `?splash=1` forces it, `?nosplash=1` skips. */
export function shouldShowIntro() {
  if (typeof window === "undefined") return false;

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has("splash")) return true;
    if (params.has("nosplash")) return false;
    return window.sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    // Storage blocked (private mode) — still greet the visitor once.
    return true;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* Ignore — the intro simply replays on the next load. */
  }
}

export default function PageIntro({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);

  const finishedRef = useRef(false);
  const rafRef = useRef(0);
  const doneTimerRef = useRef(0);

  // Keep the latest callback in a ref so `close` stays referentially stable.
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const close = useCallback((immediate = false) => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    markSeen();
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

  /* Lock scroll (brief), allow skip, clean up every timer on unmount. */
  useEffect(() => {
    document.body.classList.add("is-intro-open");

    const onKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Enter") close(true);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("is-intro-open");
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(doneTimerRef.current);
    };
  }, [close]);

  /* Progress sweep → hand over to the page. */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setProgress(100);
      doneTimerRef.current = window.setTimeout(() => close(true), 240);
      return () => window.clearTimeout(doneTimerRef.current);
    }

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      setProgress(Math.round((1 - (1 - t) ** 2) * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        doneTimerRef.current = window.setTimeout(() => close(), 140);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(doneTimerRef.current);
    };
  }, [close]);

  if (hidden) return null;

  return (
    <div
      className={`intro${closing ? " is-closing" : ""}`}
      onClick={() => close(true)}
      data-testid="page-intro"
    >
      <span className="intro__sweep" aria-hidden="true" />

      <div className="intro__inner">
        <span className="intro__mark">
          <img
            src={logo}
            alt=""
            width={86}
            height={86}
            draggable={false}
            fetchpriority="high"
          />
        </span>

        <p className="intro__brand">{COMPANY.name}</p>
        <p className="intro__tag">{COMPANY.tagline}</p>

        <span
          className="intro__bar"
          role="progressbar"
          aria-label={`Loading ${COMPANY.name}`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${progress}%` }} />
        </span>
      </div>

      <button
        type="button"
        className="intro__skip"
        onClick={(event) => {
          event.stopPropagation();
          close(true);
        }}
      >
        Skip intro
      </button>
    </div>
  );
}
