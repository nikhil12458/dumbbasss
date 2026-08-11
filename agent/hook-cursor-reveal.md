# useCursorReveal.ts — Spotlight Image Reveal Hook

| Field | Value |
|-------|-------|
| **Path** | `src/hooks/useCursorReveal.ts` |
| **Author** | 🤖 AI |
| **Category** | Custom React Hook / Interaction |

## Purpose

A high-performance custom hook that tracks mouse/pointer coordinates relative to the nearest `<section>` container and updates custom CSS variables (`--hx` and `--hy`) on a target wrapper element. This drives circular spotlight hover reveal effects in real-time.

## Behavior

1. **Section Tracking**: Attaches listeners to the closest `<section>` element of the returned ref node using standard `closest("section")`.
2. **Resize/Scroll Sensitivity**: Installs a `ResizeObserver` to recalculate container bounding rects on resize or page scroll, ensuring mouse page offset conversions remain accurate.
3. **Throttled Updates**: Batches update mutations using `requestAnimationFrame` (rAF) to prevent layout thrashing and maintain 60+ FPS during pointer movement.
4. **CSS Custom Properties**: Mutates two document properties directly on the wrapper element:
   - `--hx`: Pointer X coordinate (in pixels) relative to the top-left of the section.
   - `--hy`: Pointer Y coordinate (in pixels) relative to the top-left of the section.
5. **Touch Fallback Support**:
   - Skips mouse hover handlers on pointer type `"touch"` to avoid weird hover behaviors on mobile devices.
   - Listens to `touchstart`, `touchmove`, and `touchend`/`touchcancel` to dynamically update coordinates and set the `data-hovering="true"` attribute on the wrapper during active touches.

## Usage

Currently utilized by:
- `HeroLandscape.tsx` (Homepage light hero background reveal)
- `DealLandscape.tsx` (Homepage dark stats background reveal)
