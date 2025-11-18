import Hero from '@/components/Hero';
import About from '@/components/About';
import Work from '@/components/Work';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import ScrollTextCarousel from '@/components/ScrollTextCarousel';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <Hero />
      <ScrollTextCarousel />
      <About />
      <Work />
      <Experience />
      <Contact />
    </main>
  );
}
