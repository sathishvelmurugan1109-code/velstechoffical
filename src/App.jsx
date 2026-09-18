import ParticleBackground from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  return (
    <div className="relative min-h-screen font-body text-zinc-100 antialiased">
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
