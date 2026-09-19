import { useEffect, useState } from "react";
import ParticleBackground from "./components/ParticleBackground";
import SplashScreen, { shouldShowSplash } from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  // Cinematic intro — shown once per browser session.
  const [showSplash, setShowSplash] = useState(shouldShowSplash);

  // Honour deep links (e.g. example.com/#contact) even when the cinematic
  // intro is active — the splash locks body scroll, so hash scroll can be
  // missed. Once the splash dismisses, scroll the target into view.
  useEffect(() => {
    if (showSplash) return undefined;
    const hash = window.location.hash;
    if (!hash) return undefined;
    const id = hash.slice(1);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ block: "start" });
    return undefined;
  }, [showSplash]);

  return (
    <div className="relative min-h-screen font-body text-zinc-100 antialiased">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <div className="ambient-light" aria-hidden="true" />

      {/* Fixed futuristic backdrop: gradient mesh + particles + grid */}
      <ParticleBackground />

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
