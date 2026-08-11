# AmbientGrid.tsx — Spotlight Dot Grid

| Field | Value |
|-------|-------|
| **Path** | `src/components/layout/AmbientGrid.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / Background Layout |

## Purpose

A background layout component mounted once globally in the root `layout.tsx`. It displays a subtle dot-grid background that glows in a small radius around the user's cursor.

## Mechanics

1. **Spotlight Effect**:
   - Uses a CSS `radial-gradient` to draw repeating dots (`background-size: 28px 28px`) in `--ink-faint` color.
   - Applies a second `radial-gradient` as a `mask-image` (and `-webkit-mask-image`) of size `220px`. The center of this mask is bound to `--gx` and `--gy` CSS variables.
2. **Direct Style Mutation**:
   - Updates `--gx` and `--gy` custom variables directly on the element ref on document-level `pointermove` events.
   - Centers the spotlight at `window.innerWidth / 2` and `window.innerHeight / 2` on mount so there is no jar on initial load.
3. **Performance Optimization**:
   - Restricts pointer-move listener mutations to a single `requestAnimationFrame` call per frame.
   - Uses `{ passive: true }` listener options to avoid scroll-performance degradation.
   - Set `pointer-events-none` so it sits behind interactive nodes without blocking clicks.
