# Parallax.tsx

| Field | Value |
|-------|-------|
| **Path** | `src/components/animations/Parallax.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / Animations |

## Purpose

A reusable wrapper component that creates a scroll-based parallax effect using `framer-motion`.

## Features
- Reads scroll progression natively using `useScroll` from framer-motion.
- Fully compatible with `Lenis` smooth scrolling.
- Accepts `offset` to determine how many pixels the element should travel.
- Accepts `startScroll` and `endScroll` intersecting options so that elements at the very top of the page (like a hero graphic) can have their scroll bounds customized to prevent sudden jumps on mount.
