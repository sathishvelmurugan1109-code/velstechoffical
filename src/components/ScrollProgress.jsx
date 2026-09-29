import { useScrollProgress } from "../lib/motion";

/**
 * Hairline gold progress spine pinned to the very top of the viewport.
 * The value is published on <html> by useScrollProgress, so this component
 * renders no state at all — it never re-renders on scroll.
 */
export default function ScrollProgress() {
  useScrollProgress();
  return <div className="progress" aria-hidden="true" />;
}
