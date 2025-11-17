import Hero from '@/components/Hero';
import About from '@/components/About';
import Work from '@/components/Work';
import CV from '@/components/CV';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Work />
      <CV />
      <Contact />
    </main>
  );
}
