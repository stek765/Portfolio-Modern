import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard, { type Project } from './ProjectCard';

const projects: Project[] = [
  {
    id: 'shared-kb-audio',
    title: 'Shared KB for LLM Audio Recordings',
    description: 'Agentic pipeline that turns university lecture recordings into structured Obsidian notes, queryable via RAG and Claude.',
    image: `${import.meta.env.BASE_URL}audio-kb-network.svg`,
    technologies: ['Python', 'Claude', 'RAG', 'ChromaDB'],
    githubUrl: 'https://github.com/stek765/Shared-KB-for-LLM-audio-Recordings',
  },
  {
    id: 'firmbox',
    title: 'FirmBox-Gateway',
    description: 'IoT gateway bridging STM32 sensors with MQTT and a secure Flask dashboard for real-time monitoring.',
    image: 'https://github.com/user-attachments/assets/88ab8731-dce1-4559-97c1-71feca898e13',
    technologies: ['C', 'Python', 'MQTT', 'Flask'],
    githubUrl: 'https://github.com/stek765/FirmBox-Gateway',
  },
  {
    id: 'fourier-signal',
    title: 'Fourier Transform & DSP',
    description: 'Decomposing signals into their frequency components — real-time equalizer, phasors, and spectral analysis.',
    image: `${import.meta.env.BASE_URL}fourier-waves.jpg`,
    technologies: ['Python', 'NumPy/SciPy', 'DSP'],
    githubUrl: 'https://github.com/stek765/Sistemi-Segnali-ed-Elaborazione-immagini',
  },
  {
    id: 'visual-crypto',
    title: 'Visual Cryptography',
    description: 'Splitting images into random shares that reveal the original only when overlaid.',
    image: 'https://github.com/user-attachments/assets/9b9c47bc-6ef2-465e-b443-8a44740388eb',
    technologies: ['Python', 'Cryptography'],
    githubUrl: 'https://github.com/stek765/visual-cryptography',
  },
  {
    id: 'pgp',
    title: 'PGP Implementation',
    description: 'Secure email protocol ensuring confidentiality, integrity, and authenticity.',
    image: 'https://github.com/user-attachments/assets/c8882ba4-c2c5-4351-9f49-3359c6d18c4e',
    technologies: ['Python', 'Security', 'PGP'],
    githubUrl: 'https://github.com/stek765/PGP-implementation',
  },
  {
    id: 'crypto-notes',
    title: 'Cryptography & Network Security',
    description: 'Notes, diagrams, and summaries on the fundamentals of modern cryptography and network security.',
    image: 'https://github.com/user-attachments/assets/3edce1cf-e016-4763-99a5-88076f285b04',
    technologies: ['Cryptography', 'Security', 'Notes'],
    githubUrl: 'https://github.com/stek765/Crittografia-e-Network-Security',
  },
  {
    id: 'wifi-printers',
    title: 'Wi-Fi Printers',
    description: 'Enabling legacy printers to receive files and print wirelessly over LAN.',
    image: 'https://github.com/user-attachments/assets/a0946e1d-9718-4c6c-8316-e70fdceef021',
    technologies: ['Embedded', 'Networking'],
    githubUrl: 'https://github.com/stek765/Adding-Wi-Fi-to-Printers',
  },
  {
    id: 'assembly',
    title: 'Assembly Learning',
    description: 'Exploration of x86-64 Assembly, system calls, and memory management.',
    image: 'https://github.com/user-attachments/assets/8b054e0c-4a96-4ed8-8834-f7906385aa52',
    technologies: ['Assembly', 'x86-64'],
    githubUrl: 'https://github.com/stek765/ASSEMBLY-learning',
  },
  {
    id: 'rust-learning',
    title: 'Rust Learning',
    description: 'Memory safety, concurrency, and systems programming exercises.',
    image: 'https://github.com/user-attachments/assets/09f5b0d1-8f71-4bd1-aa74-dd95e0f52891',
    technologies: ['Rust', 'Systems'],
    githubUrl: 'https://github.com/stek765/RUST-learning',
  },
  {
    id: 'c-learning',
    title: 'C Deep Dive',
    description: 'Memory management, pointers, and system-level programming.',
    image: 'https://github.com/user-attachments/assets/b404ce45-e485-4583-b89d-a4dea663dbc4',
    technologies: ['C', 'Low-Level'],
    githubUrl: 'https://github.com/stek765/C-learning',
  },
  {
    id: 'calory-app',
    title: 'Calory App',
    description: 'Nutritional tracking integrating FatSecret API for food calculations.',
    image: 'https://github.com/user-attachments/assets/0983c65b-0ee6-4094-8fc7-1e5c219caefa',
    technologies: ['JavaScript', 'API'],
    githubUrl: 'https://github.com/stek765/Calory-App',
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-32 px-6"
      data-testid="section-projects"
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block text-sm font-mono text-primary tracking-wider mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            FEATURED WORK
          </motion.span>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Things I've Built & Learned
            </span>
          </motion.h2>
        </motion.div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-testid="grid-projects"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
