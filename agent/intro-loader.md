# Intro Loader — IntroLoader.tsx

| Field | Value |
|-------|-------|
| **Path** | `src/components/animations/IntroLoader.tsx` & `src/app/globals.css` |
| **Author** | 🤖 AI |
| **Category** | Component / Cinematic Animation |

## Overview

The `IntroLoader` is a highly cinematic, once-per-session intro sequence that acts as the front door to the studio's aesthetic. Instead of a typical fade-out loading screen, it uses a true "Zoom-to-Fill" camera fly-through effect where the viewer flies directly into the center letter of the brand name, and the letter's solid color perfectly merges with the site's background color to reveal the site seamlessly.

## Architecture

- **Session Guarded**: Runs once per session via `sessionStorage.getItem("intro-played")`.
- **Top Level**: Rendered inside `layout.tsx` at the root, maintaining `z-index: 9998`.
- **Scroll Locking**: Attaches `.intro-active` to `<html>` to completely freeze the viewport during the sequence.
- **Dynamic Calculation**: Calculates the exact sub-pixel coordinates of the solid stem of the center 'b' to set the `transform-origin`, ensuring the zoom flawlessly hits a solid color regardless of viewport size or font rendering differences.

## The Zoom-to-Fill Sequence (Crucial)

To achieve the punchy, cinematic cut without ugly semi-transparent masks or ghosting letters, the animation relies on a precise two-phase timing structure defined in `globals.css`:

### Phase 1: The Dance & Settle (0 -> 1.7s)
The letters stagger in from the bottom with a slight bounce and rotation (`@keyframes intro-dance`), then hold still for 800ms so the user can read the name.

### Phase 2: The Fast Zoom (1.7s -> 2.6s)
The `intro-word` fires `@keyframes intro-text-zoom-fill`:
- **Fast & Solid**: The text zooms from `scale(1)` to `scale(300)` over `0.9s`. 
- **Easing**: It uses an `ease-in` curve (`cubic-bezier(0.5, 0, 1, 1)`) so it continuously *accelerates* into the camera, preventing any feeling of "lag" at the end of the zoom.
- **No Opacity Fades**: The text opacity remains at `1` the entire time. This guarantees the color of the letter (`var(--paper)`) fully covers the screen as a solid color.

### Phase 3: The Seamless Fade (2.6s -> 2.9s)
The `intro-screen` container fires `@keyframes intro-screen-fade`:
- This animation is `1.2s` long, but it explicitly holds `opacity: 1` until `75%` (which is exactly `0.9s`).
- Only *after* the text has fully covered the page (at 0.9s), the container smoothly fades to `opacity: 0` over the final `0.3s`.
- Because the text color is `var(--paper)` and the underlying site background is also `var(--paper)`, this fade is entirely invisible except for revealing the site content beneath it.

## Important Maintenance Rules
1. **Never use `clip-path` masks or opacity fades ON the zooming text**. Doing so creates a translucent ghost text overlay that looks broken. Keep the text solid (`opacity: 1`) and fade the parent container only *after* the screen is filled.
2. If the site's background color changes from `var(--paper)`, the `intro-letter` color MUST be updated to match it exactly, otherwise the transition will flash.
