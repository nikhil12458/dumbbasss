# 🏯 dumbbasss studio

> **A very serious studio, unseriously named.**

Welcome to the codebase of **dumbbasss studio** — a highly interactive, immersive digital portfolio and web experience. Originally built as a legacy static HTML/CSS/JS site, it has been fully migrated into a modern, performance-optimized, and strongly-typed **Next.js 16** application.

The site showcases custom canvas physics (Verlet integration typography), dynamic layout designs, smooth animations, and a structured multi-step consultation intake system.

---

## 🛠️ Tech Stack & Key Layers

| Layer | Technology | Key Highlights |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16** (App Router) | React 19, Server & Client component boundaries, Static Site Generation (SSG) via `generateStaticParams`. |
| **Language** | **TypeScript** | Strongly-typed data definitions and configuration surfaces. |
| **Styling** | **TailwindCSS v4** | Integration with inline `@theme` declarations, CSS custom properties for unified design tokens, dark section overlays. |
| **Animations** | **Framer Motion** | Scroll reveals, panel drawer transitions, and interactive spring-driven components. |
| **Physics Engine** | **Custom Verlet Integration** | A canvas-based interactive letter-mesh engine (`kinetic-type.ts`) with custom physics constraints. |
| **Scrolling** | **Lenis Smooth Scroll** | Inertial scroll management integrated globally via React context. |
| **SEO & Metadata** | **App Router Metadata API** | Search-engine-optimized dynamic metadata, custom XML sitemaps, robots configurations, and OG previews. |

---

## 📂 Project Architecture

Here is a map of the repository's source code:

```
src/
├── app/                        # Next.js App Router pages & metadata configs
│   ├── font.ts                 # Google Fonts configuration (Space Grotesk, Inter, JetBrains Mono, Fraunces)
│   ├── globals.css             # Unified design system tokens, keyframe animations, & global resets
│   ├── layout.tsx              # Root layout wrapping metadata, fonts, custom cursor, & Lenis scroll provider
│   ├── not-found.tsx           # Custom 404 page
│   ├── page.tsx                # Homepage featuring the interactive canvas hero
│   ├── robots.ts               # Robots.txt configuration
│   ├── sitemap.ts              # XML sitemap mapping over pages, services, and projects
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   ├── consultation/page.tsx    # Consultation intake page (renders multi-step wizard)
│   ├── process/page.tsx        # Process page
│   ├── projects/               # Projects routing
│   │   ├── page.tsx            # Grid-based projects archive
│   │   └── [slug]/page.tsx      # Dynamic project detail views (SSG-rendered)
│   └── services/               # Services routing
│       ├── page.tsx            # Services listing
│       └── [slug]/page.tsx      # Dynamic service detail views (SSG-rendered)
├── components/                 # React UI Components
│   ├── DealLandscape.tsx       # Interactive landing image with cursor-coordinate reveal mask
│   ├── HeroLandscape.tsx       # Priority-loaded hero landscape illustration
│   ├── animations/             # High-fidelity animation wrappers
│   │   ├── AnimatedNumber.tsx  # Animated numeric counter/ticker
│   │   ├── IntroLoader.tsx     # Cinematic session intro loader and landing animation
│   │   ├── KineticWord.tsx     # React wrapper for the Verlet physics typography engine
│   │   ├── Magnetic.tsx        # Magnetic hover pull wrapper for CTAs/buttons
│   │   ├── Parallax.tsx        # Framer Motion scroll parallax wrapper
│   │   ├── ScrollReveal.tsx    # Scroll-triggered fade-in reveal wrapper
│   │   └── ToriiGate.tsx       # Custom SVG hero gate animation
│   ├── consultation/           # Multi-step intake flows
│   │   ├── ConsultFlow.tsx     # Interactive multi-step form wizard
│   │   └── ConsultPanel.tsx    # Floating slide-over console panel
│   ├── cursor/                 # Accessibility & input
│   │   └── CustomCursor.tsx    # Canvas-tracked custom pointer hover states
│   ├── dev/                    # Development overlays
│   │   └── AgentationProvider.tsx
│   ├── icons/                  # Inline SVG assets
│   │   └── ServiceIcons.tsx
│   ├── layout/                 # Layout landmarks & backgrounds
│   │   ├── AmbientGrid.tsx     # Moving grid overlay with radial spotlight
│   │   ├── EasterEgg.tsx       # Interactive keyboard & click-trigger easter eggs
│   │   ├── Footer.tsx          # Shared site footer
│   │   └── SmoothScrolling.tsx # Lenis scroll context provider
│   ├── sections/               # Custom sections
│   │   ├── Faq.tsx             # Interactive FAQ accordion
│   │   ├── ProcessSteps.tsx    # Pinned horizontal timeline scroll slider
│   │   └── Testimonials.tsx    # Swaying testimonials panel
│   └── ui/                     # Shared UI components
│       ├── Btn.tsx             # Core CTA button
│       ├── Eyebrow.tsx         # Section subtitle labels
│       ├── LinkArrow.tsx       # Hover-animated link arrow
│       └── ...
├── data/                       # Strongly typed data modules
│   ├── projects.ts             # Projects dataset
│   └── services.ts             # Services dataset
├── hooks/                      # React hooks
│   └── useCursorReveal.ts      # Custom cursor reveal coordinates hook
└── utils/                      # Utilities
    ├── cn.ts                   # Classname utility
    ├── kinetic-type.ts         # High-performance physics typography engine
    └── kinetic-type-utils.ts   # Helper math functions
```

---

## 🔮 Key Features

### 1. Verlet Physics Typography Engine
The homepage displays an interactive wordmark that reacts like cloth to wind, gravity, and user cursor movements. It is backed by a custom Verlet physics simulation in `src/utils/kinetic-type.ts`.
- **Pre-Rasterized Sprites**: Characters are generated into a glyph atlas for GPU-accelerated drawing.
- **Spring Constraints**: Particles are joined via horizontal and vertical distance constraints.
- **Viewport Observer**: The simulation automatically pauses via `IntersectionObserver` when scrolled out of view to minimize CPU/GPU load.

### 2. Custom Cursor Spotlight Masks
The site features custom cursor hover states (`src/components/cursor/CustomCursor.tsx`) and custom mask overlays (`src/components/DealLandscape.tsx`). Hovering over container elements clips/reveals full-fidelity color details using coordinates tracked by the `useCursorReveal` hook.

### 3. Consultation Flow
A multi-step intake wizard (`src/components/consultation/ConsultFlow.tsx`) guides clients through dynamic questions based on selected business services, offering tailored recommendations on completion.

---

## 📖 Deep-Dive Agent Documentation

For a comprehensive breakdown of specific components, files, and architectural layers, refer to the `/agent` documentation folder. It contains **37 detailed guides** written during the development process:

- **Core & Setup**:
  - [overview.md](file:///c:/Users/ektak/Desktop/dumbbasss/agent/overview.md) — Architectural goals, author legend, and design decisions.
  - [globals-css.md](file:///c:/Users/ektak/Desktop/dumbbasss/agent/globals-css.md) — CSS custom variables, typography classes, and animation keyframes.
  - [font.md](file:///c:/Users/ektak/Desktop/dumbbasss/agent/font.md) — Google font loader setup.
- **Components & Interactivity**:
  - [kinetic-word.md](file:///c:/Users/ektak/Desktop/dumbbasss/agent/kinetic-word.md) — The canvas Verlet physics configuration and parameters.
  - [custom-cursor.md](file:///c:/Users/ektak/Desktop/dumbbasss/agent/custom-cursor.md) — Cursor interactions, pointer event tracking, and styling.
  - [consultation.md](file:///c:/Users/ektak/Desktop/dumbbasss/agent/consultation.md) — Intake flow states and panel layout.
- **Sections & Visuals**:
  - [component-landscapes.md](file:///c:/Users/ektak/Desktop/dumbbasss/agent/component-landscapes.md) — SVG masks, background grids, and image reveals.
  - [component-process-steps.md](file:///c:/Users/ektak/Desktop/dumbbasss/agent/component-process-steps.md) — Pinned layouts and timelines.
  - [component-testimonials.md](file:///c:/Users/ektak/Desktop/dumbbasss/agent/component-testimonials.md) — Kakemono sway keyframes.

*(Click any of the files in your local workspace or check `/agent/` for the complete index).*

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies using npm:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
To build a production-optimized version:
```bash
npm run build
```

### 4. Code Quality & Linting
Run ESLint to check for stylistic or architectural issues:
```bash
npm run lint
```

---

## 🔍 Codebase Review Findings

A comprehensive audit of this codebase is available in [dumbbasss-code-review.md](file:///c:/Users/ektak/Desktop/dumbbasss/dumbbasss-code-review.md). Key items highlighted in the review include:

- **Critical Fixes**: Resolving the missing Open Graph image path, standardizing `sitemap.ts` and `robots.ts` generation, and eliminating risky `dangerouslySetInnerHTML` patterns.
- **Performance Optimizations**: Restricting Google Fonts weight configurations and throttling canvas window resize calls.
- **Accessibility Improvements**: Adding ARIA attributes (e.g. `aria-current`, `aria-expanded`, `aria-controls`), dialog roles, and focus traps for slide-over components.

For a detailed breakdown of codebase scores and remediation guides, read the full [code review report](file:///c:/Users/ektak/Desktop/dumbbasss/dumbbasss-code-review.md).
