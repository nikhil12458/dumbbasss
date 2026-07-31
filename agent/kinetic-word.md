# KineticWord.tsx + kinetic-type.ts — Physics Typography

| Field | Value |
|-------|-------|
| **Paths** | `src/components/animations/KineticWord.tsx`, `src/utils/kinetic-type.ts` |
| **Author** | 🤖 AI & 👤 User |
| **Category** | Component + Utility / Animation |
| **Ported from** | `dumbbasss-studio-site-v2/kinetic-type.js` |

## Purpose

The hero interactive element of the site — the word "dumbbasss" rendered as a grid of characters that hang like cloth and react to mouse movement, gravity, wind, and a restorative spring force.

## Architecture

### `kinetic-type.ts` (utility)
A self-contained physics engine ported from the original vanilla JS and recently tweaked by the human user for a gentler, more spring-like feel:

- **`Vec2`** — 2D vector math
- **`Particle`** — A single character position with Verlet integration, gravity, wind, a restoring force (`restoreStrength`), and damping.
- **`Constraint`** — A spring connecting two particles (horizontal and vertical)
- **`Input`** — Mouse/pointer interaction: grab particles, push nearby ones away
- **`mountKineticWord()`** — The main entry point:
  1. Renders the word into an offscreen canvas
  2. Samples the alpha channel to create a grid of lit pixels
  3. Creates a `Particle` for each grid cell; top-row particles are pinned
  4. Connects particles with horizontal and vertical `Constraint`s
  5. Renders individual characters as pre-rasterized glyph atlas sprites
  6. Runs a `requestAnimationFrame` loop

### `KineticWord.tsx` (React wrapper)
A `"use client"` component that:
1. Waits for fonts to load (`document.fonts.load`)
2. Calls `mountKineticWord()` with the container ref
3. Cleans up on unmount (cancels RAF, removes event listeners)
4. *Note:* In `page.tsx`, this component is lazily loaded via `next/dynamic` to ensure rapid page loading and non-blocking HTML rendering.

## Props (KineticWord)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `word` | `string` | `"dumbbasss"` | The text to render |
| `widthFraction` | `number` | `0.88` | How much of the container width to fill |
| `windAmp` | `number` | `0.012` | Wind turbulence amplitude (gentle wobble) |
| `gravity` | `number` | `0.008` | Downward pull strength |
| `mouseStrength` | `number` | `2.2` | Mouse repulsion force |
| `spacing` | `number` | `7` | Grid pixel spacing |
| `className` | `string?` | `""` | Additional classes |

## Physics Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| Damping | 0.985 | Velocity decay per frame |
| Restore Strength | 0.035 | Pulls particles back toward their original home positions |
| Iterations | 5 | Constraint solver passes per frame |
| Compress V | 0.35 | Min vertical constraint ratio |
| Stretch V | 1.55 | Max vertical constraint ratio |
| Compress H | 0.55 | Min horizontal constraint ratio |
| Stretch H | 1.9 | Max horizontal constraint ratio |
| Mouse radius | 2600 (squared px) | Interaction falloff radius |
| Grab radius | 16px | Click-to-grab detection |
