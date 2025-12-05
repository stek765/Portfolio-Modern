import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={project.githubUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block relative rounded-2xl overflow-hidden"
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

      <div className="relative bg-card/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
        {project.image && (
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
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

        <div className="p-6 space-y-4">
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

          <div className="flex flex-wrap gap-2 pt-2" data-testid={`list-technologies-${project.id}`}>
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
