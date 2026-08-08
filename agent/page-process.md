# Process Page

| Field | Value |
|-------|-------|
| **Path** | `src/app/process/page.tsx` |
| **Author** | 🤖 AI |
| **Category** | Page |

## Purpose

A timeline-style breakdown of the studio's 6-step engagement process.

## Sections

1. **Hero** — "Six steps. Drawn out like a blueprint, not a pitch."
2. **Timeline** — Vertical line with 6 numbered steps:

| Step | Title | Output |
|------|-------|--------|
| 01 | Consultation | A shared understanding, in writing |
| 02 | Define scope | A scope doc + rough timeline |
| 03 | Design | Approved design reference |
| 04 | Build | A live staging environment |
| 05 | Refine | A launch-ready build |
| 06 | Launch | A live product + handoff docs |

3. **CTA** — "Six steps is the whole process. No hidden seventh phase." → Start a consultation

## Design

- **Pinned Timeline Slider**: The entire section pins to the screen using a sticky container over a `600vh` scroll runway.
- **Scroll Tracking**: A single moving dot travels down the vertical line based on scroll progress.
- **Sliding Steps**: Steps are absolute-positioned and mapped to scroll progress to slide in vertically (from 400px to -400px). They plateau at 100% opacity in the center of the screen, ensuring readability without text overlap.
- **Transparent Texture**: The sticky container explicitly uses pointer-events logic and a transparent background so the global site texture remains uninterrupted.
- 3-column grid on desktop: number | content | output sidebar

## SEO & Metadata

Exports static metadata (including `openGraph` and `twitter` cards), ensuring correct title formatting and social sharing previews without falling back to site-wide defaults.
