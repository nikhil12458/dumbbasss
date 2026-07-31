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
- Left column: decorative SVG illustration (desktop only)
- Right column: mono tagline → KineticWord canvas → subtitle → two CTAs
- Bottom-left: "grab a letter" hint

### 2. Services Preview ("Five ways in")
- 5-column grid of service cards, each linking to its detail page
- Numbered 01–05 with accent color
- Hover: background darkens to `paper-deep`

### 3. Dark Stats Section ("The deal")
- `.section-dark` inverted palette
- Serif italic pull quote with accent highlight
- Three stat blocks: "40+ screens shipped", "100% self-taught", "0 ten-slide decks"

### 4. Projects Preview ("A few recent ones")
- 2-column grid showing GuardianTrack and Vastraa
- Hover: background scale-up effect
- "See the full archive" link

### 5. CTA Band ("Start here")
- Centered headline + two buttons (consultation + contact)

## Dependencies

- `KineticWord`, `ScrollReveal`, `Btn`, `LinkArrow`, `Eyebrow`, `SectionTitle`
