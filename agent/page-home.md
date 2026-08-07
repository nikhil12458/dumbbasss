# Home Page — page.tsx

| Field | Value |
|-------|-------|
| **Path** | `src/app/page.tsx` |
| **Author** | 🤖 AI |
| **Category** | Page |

## Purpose

The landing page of the site — the first thing visitors see.

## Sections

### 1. Hero
- Left column: `<ToriiGate />` animated SVG illustration (desktop only)
- Right column: mono tagline → KineticWord canvas → subtitle → two CTAs
- Bottom-left: "grab a letter" hint
- **Note:** The `KineticWord` component is lazily loaded via `next/dynamic` to ensure a rapid First Contentful Paint.

### 2. Services Preview ("Five ways in")
- 5-column grid of service cards, each linking to its detail page
- Dynamically populated by slicing the first 5 entries from `src/data/services.ts`
- Hover: background darkens to `paper-deep`

### 3. Dark Stats Section ("The deal")
- `.section-dark` inverted palette
- Serif italic pull quote with accent highlight
- Three stat blocks: "40+ screens shipped", "100% self-taught", "0 ten-slide decks"

### 4. Projects Preview ("A few recent ones")
- 2-column grid showing recent work
- Dynamically populated by slicing the first 2 entries from `src/data/projects.ts`
- Hover: background scale-up effect
- "See the full archive" link

### 5. Testimonials ("Kind words")
- 3-column hanging kakemono-card layout swaying gently
- Real quotes from clients

### 6. FAQ ("Questions people actually have")
- Accordion list of common questions (e.g., pricing, timelines)

### 7. CTA Band ("Start here")
- Centered headline + two buttons (consultation + contact)

## Dependencies

- `KineticWord` (Dynamic), `ToriiGate`, `ScrollReveal`, `Btn`, `LinkArrow`, `Eyebrow`, `SectionTitle`, `Testimonials`, `Faq`
