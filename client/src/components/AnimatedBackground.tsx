import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function Particle({ delay }: { delay: number }) {
  const randomX = Math.random() * 100;
  const randomDuration = 18 + Math.random() * 20;
  const randomSize = 2 + Math.random() * 3;

  return (
    <motion.div
      className="absolute rounded-full bg-primary/30 will-change-transform"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        bottom: '-10px',
      }}
      animate={{
        y: ['0vh', '-110vh'],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  );
}

function GlowOrb({
  className,
  color,
  animate
}: {
  className: string;
  color: string;
  animate: any;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-2xl will-change-transform ${className}`}
      style={{ background: color }}
      animate={animate}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  const [particleCount] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches ? 6 : 14
  );
  const [particles] = useState(() =>
    Array.from({ length: particleCount }, (_, i) => ({ id: i, delay: i * 0.6 }))
  );

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX - innerWidth / 2) / 20);
        mouseY.set((clientY - innerHeight / 2) / 20);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />

      <motion.div
        className="absolute inset-0"
        style={{ x: smoothX, y: smoothY }}
      >
        <GlowOrb
          className="top-1/4 -left-20 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px]"
          color="rgba(59, 130, 246, 0.15)"
          animate={{
            x: [0, 100, 50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
        />

        <GlowOrb
          className="top-1/2 -right-20 w-[220px] h-[220px] sm:w-[400px] sm:h-[400px]"
          color="rgba(139, 92, 246, 0.12)"
          animate={{
            x: [0, -80, -20, 0],
            y: [0, 60, -40, 0],
            scale: [1.1, 0.9, 1.2, 1.1],
          }}
        />

        <GlowOrb
          className="bottom-1/4 left-1/3 hidden sm:block sm:w-[350px] sm:h-[350px]"
          color="rgba(6, 182, 212, 0.1)"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -80, 40, 0],
            scale: [0.9, 1.1, 1, 0.9],
          }}
        />
      </motion.div>

      {particles.map((particle) => (
        <Particle key={particle.id} delay={particle.delay} />
      ))}

      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  );
}
