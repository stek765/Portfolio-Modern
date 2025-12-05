import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const technologies = ['C', 'C++', 'Rust', 'Assembly', 'Python', 'Embedded'];

const stats = [
  { value: '10+', label: 'Projects' },
  { value: '5+', label: 'Languages' },
];

const photos = [
  { src: 'https://avatars.githubusercontent.com/u/52193428?v=4', alt: 'Stefano Zanolli' },
  { src: 'https://i.ibb.co/dnNfhj9/fdfcc6c8-c099-4301-8f00-7cf40e867c56.jpg', alt: 'Portfolio Highlight' },
  { src: 'https://i.ibb.co/JRSqrDq8/50211851-9113-4ff6-a96a-e137a386a3fb.jpg', alt: 'Portfolio Highlight' },
];

function NetflixCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = photos.length - 1;
      if (nextIndex >= photos.length) nextIndex = 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const handleManualNav = (dir: number) => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    paginate(dir);
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, 5000);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
      
      <div className="relative w-full max-w-sm mx-auto aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-card/50">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentIndex}
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleManualNav(1);
              } else if (swipe > swipeConfidenceThreshold) {
                handleManualNav(-1);
              }
            }}
            className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm hover:bg-black/40"
          onClick={() => handleManualNav(-1)}
          data-testid="button-carousel-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm hover:bg-black/40"
          onClick={() => handleManualNav(1)}
          data-testid="button-carousel-next"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-6'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              data-testid={`button-carousel-dot-${index}`}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-xl -z-10"
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/50 rounded-xl -z-10"
        animate={{ rotate: [0, -5, 0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden"
      data-testid="section-about"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ y: imageY }}
            className="relative order-2 lg:order-1"
          >
            <NetflixCarousel />

            <div className="flex justify-center gap-6 mt-16">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    className="text-3xl font-bold text-primary"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ y: textY }}
            className="space-y-8 order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-mono text-primary tracking-wider">
                ABOUT ME
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Passionate about the{' '}
                <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  low-level
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p data-testid="text-about-intro">
                Computer Science graduate from the{' '}
                <span className="text-foreground font-medium">University of Verona</span>. 
                I enjoy creating practical solutions, especially with microcontrollers.
              </p>

              <p data-testid="text-about-passion">
                I'm fascinated by how things work at the{' '}
                <span className="text-foreground font-medium">hardware level</span>. 
                From firmware to security, I love exploring the depths of system internals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2 pt-4"
              data-testid="list-technologies"
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.3 + index * 0.08,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Badge
                    variant="outline"
                    className="font-mono text-sm px-4 py-1.5 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all cursor-default"
                    data-testid={`tech-${tech.toLowerCase()}`}
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
