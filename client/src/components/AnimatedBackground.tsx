import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function Particle({ delay }: { delay: number }) {
  const randomX = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 20;
  const randomSize = 2 + Math.random() * 4;
  
  return (
    <motion.div
      className="absolute rounded-full bg-primary/30"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        bottom: '-10px',
      }}
      animate={{
        y: [0, -window.innerHeight - 100],
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
  size, 
  color,
  animate 
}: { 
  className: string; 
  size: number; 
  color: string;
  animate: any;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-2xl will-change-transform ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
      }}
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
  const [particles] = useState(() => 
    Array.from({ length: 15 }, (_, i) => ({ id: i, delay: i * 0.5 }))
  );

  useEffect(() => {
    // Disable mouse parallax on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 20);
      mouseY.set((clientY - innerHeight / 2) / 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      
      <motion.div
        className="absolute inset-0"
        style={{ x: smoothX, y: smoothY }}
      >
        <GlowOrb
          className="top-1/4 -left-20"
          size={500}
          color="rgba(59, 130, 246, 0.15)"
          animate={{
            x: [0, 100, 50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
        />
        
        <GlowOrb
          className="top-1/2 -right-20"
          size={400}
          color="rgba(139, 92, 246, 0.12)"
          animate={{
            x: [0, -80, -20, 0],
            y: [0, 60, -40, 0],
            scale: [1.1, 0.9, 1.2, 1.1],
          }}
        />
        
        <GlowOrb
          className="bottom-1/4 left-1/3"
          size={350}
          color="rgba(6, 182, 212, 0.1)"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -80, 40, 0],
            scale: [0.9, 1.1, 1, 0.9],
          }}
        />

        <GlowOrb
          className="-bottom-20 right-1/4"
          size={300}
          color="rgba(236, 72, 153, 0.08)"
          animate={{
            x: [0, -40, 60, 0],
            y: [0, -60, 20, 0],
            scale: [1, 1.3, 0.8, 1],
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
