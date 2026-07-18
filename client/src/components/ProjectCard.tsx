import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, type LucideIcon } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
  technologies: string[];
  githubUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.githubUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group block relative rounded-2xl overflow-hidden h-full"
      data-testid={`card-project-${project.id}`}
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-purple-500/50 to-cyan-500/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500"
        animate={{
          backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%'
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ backgroundSize: '200% 200%' }}
      />

      <div className="relative h-full flex flex-col bg-card/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
        {project.image && (
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              width={640}
              height={480}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {!project.image && project.icon && (
          <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/15 via-purple-500/10 to-cyan-500/10">
            <motion.div
              animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? -6 : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <project.icon className="w-16 h-16 text-primary/70" strokeWidth={1.25} />
            </motion.div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <motion.h3
            className="font-semibold text-lg"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
            data-testid={`text-project-title-${project.id}`}
          >
            {project.title}
          </motion.h3>

          <p
            className="text-sm text-muted-foreground leading-relaxed"
            data-testid={`text-project-description-${project.id}`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2 mt-auto" data-testid={`list-technologies-${project.id}`}>
            {project.technologies.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs font-mono bg-primary/10 border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
}
