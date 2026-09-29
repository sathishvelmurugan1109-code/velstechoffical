import { useEffect, useState } from "react";
import ParticleBackground from "./components/ParticleBackground";
import CursorAura from "./components/CursorAura";
import ScrollProgress from "./components/ScrollProgress";
import PageIntro, { shouldShowIntro } from "./components/PageIntro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  // Short premium intro — shown once per browser session.
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  // Honour deep links (e.g. example.com/#contact). The intro briefly locks
  // body scroll, which can swallow the browser's own hash scroll, so once
  // the intro dismisses we scroll the target into view ourselves.
  useEffect(() => {
    if (showIntro) return undefined;

    const hash = window.location.hash;
    if (!hash) return undefined;

    const target = document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ block: "start" });

    return undefined;
  }, [showIntro]);

  return (
    <div className="relative min-h-screen font-body text-zinc-100 antialiased">
      {showIntro && <PageIntro onFinish={() => setShowIntro(false)} />}

      {/* Interaction layer: progress spine + pointer light */}
      <ScrollProgress />
      <CursorAura />

      {/* Fixed futuristic backdrop: gradient mesh, drifting grid and particles */}
      <ParticleBackground />

      {/* Scroll-drifting page light — behind the content, above the backdrop */}
      <span className="page-light" aria-hidden="true" />

      <Navbar />

      {/* Semantic main landmark for SEO & accessibility */}
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <About />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
