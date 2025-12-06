import { motion } from 'framer-motion';
import { Github, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative py-12 px-6 border-t border-white/5"
      data-testid="footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.p 
          className="text-sm text-muted-foreground/60 font-mono"
          data-testid="text-copyright"
          whileHover={{ color: 'hsl(var(--primary))' }}
        >
          Designed & Built by Stefano Zanolli
        </motion.p>

        <div className="flex items-center gap-6">
          <motion.a
            href="./cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/60 hover:text-primary transition-colors flex items-center gap-2 text-sm font-mono"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </motion.a>

          <motion.a
            href="https://github.com/stek765"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/60 hover:text-primary transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}
