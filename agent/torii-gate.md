# ToriiGate.tsx — Hero Animation

| Field | Value |
|-------|-------|
| **Path** | `src/components/animations/ToriiGate.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / Animations |

## Purpose

A decorative, animated SVG torii gate used in the left column of the homepage hero section. It replaces a static inline SVG to add depth, grounding, and a subtle entrance choreography.

## Features

1. **Grounded ViewBox**: The SVG `viewBox` is cropped tightly to the bottom (`0 70 420 460`), forcing the gate to sit firmly on its container's baseline rather than floating in vertical center.
2. **Depth & Texture**:
   - `pillarShade`: A subtle linear gradient simulating light falloff on the pillars and crossbeams.
   - `kasagiShade`: A top-to-bottom gradient on the red upper beam.
   - `groundShadow`: A Gaussian-blurred ellipse beneath the structure to ground it on the page.
3. **Entrance Choreography**:
   - Split into 4 logical layers (Kasagi, Beams, Pillars, Base).
   - Animates in sequentially using Framer Motion (dropping, growing, fading) with staggered delays.
   - `prefers-reduced-motion` is respected: animations are instantly completed for users with accessibility preferences.
4. **Scroll Parallax**:
   - Uses `useScroll` and `useTransform` to apply a very subtle `translateY` offset (-15px to +15px) to the wrapper, making the gate drift slightly out of sync with the surrounding text as the user scrolls.

## Dependencies
- `framer-motion`
