import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useTransform } from 'framer-motion';

const technologies = ['C', 'C++', 'Rust', 'Assembly', 'Python', 'Embedded'];

const stats = [
  { value: '10+', label: 'Projects' },
  { value: '5+', label: 'Languages' },
];

function ProfileImage() {
  return (
    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
      
      <div className="relative w-full max-w-sm mx-auto aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-card/50">
        <img
          src="https://avatars.githubusercontent.com/u/52193428?v=4"
          alt="Stefano Zanolli"
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
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
            <ProfileImage />

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
