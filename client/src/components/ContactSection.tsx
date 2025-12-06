import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Github, FileText } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 overflow-hidden"
      data-testid="section-contact"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-purple-500/20 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.span
            className="inline-block text-sm font-mono text-primary tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            GET IN TOUCH
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
            data-testid="text-contact-title"
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-foreground via-primary to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              Let's Build Something
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed"
            data-testid="text-contact-description"
          >
            Currently open to new opportunities. Whether you have a project in mind 
            or just want to connect, I'd love to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.a
              href="mailto:stek@example.com"
              data-testid="link-email"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="group gap-2 relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%]"
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Say Hello
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Button>
            </motion.a>

            <motion.a
              href="./cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-resume"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="gap-2">
                <FileText className="w-4 h-4" />
                Resume
              </Button>
            </motion.a>

            <motion.a
              href="https://github.com/stek765"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github-contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" size="lg" className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/5">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
