# globals.css — Design System

| Field | Value |
|-------|-------|
| **Path** | `src/app/globals.css` |
| **Author** | 🤖 AI |
| **Category** | Foundation / Styling |
| **Ported from** | `dumbbasss-studio-site-v2/shared.css` |

## Purpose

The central stylesheet that defines the entire visual identity of the site. It replaces the legacy `shared.css` while integrating with TailwindCSS v4's `@theme inline` directive.

## What it contains

### CSS Custom Properties (Design Tokens)
- **Color palette**: `--paper`, `--paper-deep`, `--paper-line`, `--ink`, `--ink-soft`, `--ink-faint`, `--accent`, `--ink-900`
- **Layout**: `--container` (1280px), `--gutter` (48px desktop / 22px mobile)
- **Motion**: `--ease` cubic-bezier curve

### TailwindCSS v4 Theme Binding
Maps CSS font variables to Tailwind's `font-sans`, `font-display`, `font-mono`, `font-serif` utilities. Also defines `--color-*` properties so standard Tailwind utilities (e.g. `bg-ink`, `text-paper`) can be used securely across the app without resorting to arbitrary values.

### Global Resets & Base Styles
- Box-sizing, smooth scroll, reduced-motion support
- Body: paper background, ink text, anti-aliased rendering
- A subtle fixed SVG noise overlay via `body::before` (positioned with `z-index: -1` and `body` `z-index: 0` so it sits nicely behind the content)
- Selection colors, focus-visible outlines

### Shared Utility Classes
- `.wrap` — centered container with gutter padding
- `.section-title`, `.section-lede` — typography helpers
- `.hairline` — thin horizontal rule
- `.section-dark` — inverted dark theme section with full color overrides
- `.serif-display`, `.serif-italic`, `.poster-title` — editorial typography
- `.detail-back`, `.proj-meta`, `.proj-next` — project/service detail page chrome

### Keyframe Animations
- `@keyframes kakemono-sway` — gentle swaying animation used for hanging elements like testimonial cards

## Key Decision

We kept design tokens as CSS custom properties rather than converting them to Tailwind `@theme` values. This preserves the exact reference site look while allowing Tailwind utilities to coexist freely.
