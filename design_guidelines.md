# Design Guidelines: Modern Developer Portfolio

## Design Approach
**Reference-Based**: Drawing inspiration from Vercel, Linear, and modern developer portfolio aesthetics - clean, technical, minimalist with purposeful visual impact.

## Typography System
- **Primary Font**: Inter or IBM Plex Sans (Google Fonts)
- **Monospace Font**: JetBrains Mono or Fira Code for technical elements
- **Scale**: 
  - Hero Title: 4xl-6xl (responsive)
  - Section Headings: 2xl-3xl
  - Body: base-lg
  - Labels/Tags: sm-xs

## Layout & Spacing
**Spacing Primitives**: Tailwind units of 4, 8, 12, 16, 20 (p-4, m-8, gap-12, py-16, py-20)
- Consistent section padding: py-20 desktop, py-12 mobile
- Content max-width: max-w-6xl for sections, max-w-7xl for full-width
- Grid gaps: gap-8 for project cards, gap-4 for smaller elements

## Core Sections Structure

### 1. Hero Section (Full viewport impact)
- Large animated name reveal with gradient text effect
- Tagline: "Graduate Computer Science Student | Low-Level Programming & Security"
- Minimal, centered layout with subtle background grid/gradient
- CTA: "View Projects" smooth scroll button
- Include floating/subtle geometric shapes or code snippets in background

### 2. About Me Section
- Two-column layout (desktop): Text left, profile image right
- Professional photo in rounded container with subtle border
- Tech stack displayed as pill badges with icons (Heroicons)
- Grid: C/C++, Rust, Assembly, Python, JavaScript, Embedded Systems
- Concise bio emphasizing embedded systems, security, low-level passion

### 3. Projects Showcase (Primary Focus)
- **Masonry/Bento grid layout** for visual interest (avoid standard 3-column grid)
- 13+ project cards with varying sizes for hierarchy:
  - Featured projects (FirmBox, Visual Crypto, PGP): Larger cards
  - Learning projects: Compact cards
  - Mix of aspect ratios for dynamic layout
- Each card includes:
  - Project image (use provided GitHub images)
  - Title overlay or below image
  - Brief description (1-2 lines)
  - Tech tags as small pills
  - Subtle hover lift effect
- Section divided by categories: "Featured Projects" and "Learning & Experiments"

### 4. Contact Section
- Clean, centered design
- Heading: "Let's Connect"
- Subtext: "Open to new opportunities"
- Email button with blur background
- GitHub profile link with icon
- Minimal footer with copyright

## Component Library

### Navigation
- Fixed header with blur background (backdrop-filter)
- Logo/Name left, nav links right
- Smooth scroll to sections
- Mobile: Hamburger menu

### Buttons
- Primary: Solid with hover brightness change
- Secondary: Outlined with hover fill
- On images: Blur background (backdrop-blur-md), no hover interactions

### Project Cards
- Image: aspect-video or aspect-square
- Rounded corners (rounded-lg)
- Shadow on hover (shadow-xl transition)
- Tech tags: Small, rounded-full pills with mr-2 spacing

### Tech Stack Pills
- Small rounded badges (px-3 py-1 rounded-full)
- Monospace font for tech names
- Grid or flex-wrap layout

## Animations & Interactions
**Use Sparingly**:
- Hero text: Subtle fade-in and slide-up on load
- Projects: Fade-in on scroll (stagger effect)
- Cards: Gentle lift on hover (translate-y-1)
- Navigation: Smooth scroll behavior
- NO complex scroll-triggered animations, NO parallax

## Icons
- **Heroicons** via CDN (outline style for consistency)
- Use for: GitHub link, email, tech stack icons, navigation
- Size: w-5 h-5 for inline, w-6 h-6 for standalone

## Images
**Primary Images**:
- Profile photo in About section (circular, size w-64 h-64)
- All 13+ project images from GitHub (maintain aspect ratios)
- Optional: Subtle background pattern/grid in hero

**Image Treatment**:
- Hero: Optional subtle gradient overlay or geometric pattern background
- Projects: Use actual project screenshots/images provided
- About: Professional headshot (GitHub avatar)

## Accessibility
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- Focus states on interactive elements
- Sufficient color contrast for text
- Keyboard navigation support

## Mobile Responsiveness
- Hero: Stack vertically, reduce font sizes
- About: Single column, image above text
- Projects: Single column masonry on mobile
- Navigation: Hamburger menu
- Spacing: Reduce section padding to py-12

## Visual Hierarchy
1. Hero name (largest, gradient)
2. Section headings (consistent size across sections)
3. Project titles (medium-large)
4. Body text (readable, good line-height)
5. Tech tags (smallest, subtle)

**Key Design Principle**: Clean, technical aesthetic with purposeful use of space. Let projects shine through quality images and clear organization. Minimal but impactful - every element has a purpose.