import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  githubUrl?: string;
  note: string;
}

const books: Book[] = [
  {
    id: 'hacking-art-of-exploitation',
    title: 'Hacking: The Art of Exploitation',
    author: 'Jon Erickson',
    cover: 'https://covers.openlibrary.org/b/id/1984286-L.jpg',
    githubUrl: 'https://github.com/stek765/Hacking_book-learning',
    note: 'Buffer overflows, shellcode, GDB',
  },
  {
    id: 'rust-book',
    title: 'The Rust Programming Language',
    author: 'Steve Klabnik & Carol Nichols',
    cover: 'https://covers.openlibrary.org/b/id/8508621-L.jpg',
    githubUrl: 'https://github.com/stek765/RUST-learning',
    note: 'Ownership, borrowing, systems programming',
  },
  {
    id: 'learn-assembly',
    title: 'Learn to Program with Assembly',
    author: 'Jonathan Bartlett',
    cover: 'https://covers.openlibrary.org/b/id/13499284-L.jpg',
    githubUrl: 'https://github.com/stek765/ASSEMBLY-learning',
    note: 'x86-64, syscalls, memory internals',
  },
  {
    id: 'k-and-r-c',
    title: 'The C Programming Language',
    author: 'Kernighan & Ritchie',
    cover: 'https://covers.openlibrary.org/b/id/6684943-L.jpg',
    githubUrl: 'https://github.com/stek765/C-learning',
    note: 'The classic — pointers, memory, low-level C',
  },
  {
    id: 'clean-code',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    cover: 'https://covers.openlibrary.org/b/id/8065615-L.jpg',
    note: 'Readable, maintainable software craftsmanship',
  },
  {
    id: 'making-embedded-systems',
    title: 'Making Embedded Systems',
    author: 'Elecia White',
    cover: 'https://covers.openlibrary.org/b/id/7643570-L.jpg',
    note: 'Design patterns for firmware',
  },
];

function BookCover({ book, index }: { book: Book; index: number }) {
  const cardRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { damping: 18, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-14, 14]), springConfig);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
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

  const Wrapper = book.githubUrl ? motion.a : motion.div;
  const linkProps = book.githubUrl
    ? { href: book.githubUrl, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      ref={cardRef as React.Ref<never>}
      {...linkProps}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative block shrink-0 w-40 sm:w-48"
      data-testid={`book-${book.id}`}
    >
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-primary/40 via-purple-500/40 to-cyan-500/40 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"
      />

      <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10">
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          width={300}
          height={450}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {book.githubUrl && (
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 bottom-0 p-3 flex items-center gap-1.5 text-xs font-mono text-white"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span>View my notes</span>
          </motion.div>
        )}
      </div>

      <div className="mt-3 space-y-0.5">
        <p className="text-sm font-semibold leading-snug" data-testid={`text-book-title-${book.id}`}>
          {book.title}
        </p>
        <p className="text-xs text-muted-foreground font-mono">{book.author}</p>
      </div>
    </Wrapper>
  );
}

export default function BooksSection() {
  return (
    <section id="books" className="relative py-32 px-6" data-testid="section-books">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 justify-center text-sm font-mono text-primary tracking-wider mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <BookOpen className="w-4 h-4" />
            CURRENTLY LEARNING FROM
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Books That Shaped My Code
            </span>
          </motion.h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-10" data-testid="grid-books">
          {books.map((book, index) => (
            <BookCover key={book.id} book={book} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
