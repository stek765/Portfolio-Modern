import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from 'framer-motion';

const words = ["embedded systems", "low-level code", "security", "firmware", "microcontrollers"];

function TypeWriter() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="text-primary">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  );
}

function FloatingImage({ src, alt, className, delay, mouseX, mouseY }: { src: string; alt: string; className: string; delay: number; mouseX: MotionValue; mouseY: MotionValue }) {
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  return (
    <motion.div
      className={`absolute ${className} will-change-transform`}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{ x: smoothX, y: smoothY }}
    >
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.05, rotate: 2 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.3 },
          rotate: { duration: 0.3 }
        }}
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity" />
        <img
          src={src}
          alt={alt}
          className="relative w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-xl drop-shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Disable mouse parallax on mobile/touch devices to save performance
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 30);
      mouseY.set((clientY - innerHeight / 2) / 30);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projectImages = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python", className: "hidden lg:block top-1/4 left-[8%]", delay: 0.8 },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", alt: "C", className: "hidden lg:block top-1/3 right-[8%]", delay: 1 },
    { src: `${import.meta.env.BASE_URL}assembly.svg`, alt: "Assembly", className: "hidden lg:block bottom-1/4 left-[12%]", delay: 1.2 },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", alt: "Rust", className: "hidden lg:block bottom-1/3 right-[12%] invert", delay: 1.4 },

  ];


  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      {projectImages.map((img, i) => (
        <FloatingImage key={i} {...img} mouseX={mouseX} mouseY={mouseY} />
      ))}

      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="px-4 py-2 text-xs font-mono text-primary/80 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
              Available for work
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          data-testid="text-name"
        >
          <motion.span 
            className="inline-block bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]"
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            Stefano Zanolli
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 h-[60px] flex items-center justify-center"
          data-testid="text-description"
        >
          <span className="mr-2">I build</span>
          <TypeWriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="group relative overflow-hidden"
            data-testid="button-view-projects"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%]"
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative flex items-center gap-2">
              Explore Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </motion.div>

    </section>
  );
}
