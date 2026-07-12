import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import TechMarquee from '@/components/TechMarquee';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import BooksSection from '@/components/BooksSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatedBackground />
      <ScrollProgress />
      <Navigation />
      <main>
        <HeroSection />
        <TechMarquee />
        <ProjectsSection />
        <AboutSection />
        <BooksSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
