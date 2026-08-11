# HeroLandscape.tsx & DealLandscape.tsx — Cursor-Reveal Images

| Field | Value |
|-------|-------|
| **Paths** | `src/components/HeroLandscape.tsx`, `src/components/DealLandscape.tsx` |
| **Author** | 🤖 AI |
| **Category** | Components / Visual Effects |

## Purpose

Two companion components that render background images masked to a circular spotlight around the user's cursor position. They fade in only on active mouse/touch hover states, introducing interactive visual depth.

## Details

### 1. `HeroLandscape.tsx`
- **Location**: Mounted inside the Homepage Hero section.
- **Image Source**: `/home_bg_img.webp`
- **Blend Mode**: `mixBlendMode: "multiply"`
- **Interaction**: Displays behind the hero text and animated Torii Gate, blending the background graphic into the light theme background.

### 2. `DealLandscape.tsx`
- **Location**: Mounted inside the Homepage Dark Stats section (`.section-dark`).
- **Image Source**: `/mount_fuji_dark.webp`
- **Blend Mode**: `mixBlendMode: "screen"`
- **Interaction**: Displays behind the white stat numbers and text, blending the dark landscape graphic into the dark theme background.

## Mechanics

- Both utilize the custom `useCursorReveal()` hook to retrieve a container ref.
- The overlay contains an absolutely-positioned `next/image` with `fill` attribute.
- The image uses a CSS radial gradient mask:
  ```css
  mask-image: radial-gradient(150px circle at var(--hx, 50%) var(--hy, 50%), black, transparent)
  ```
- Uses CSS Tailwind group attributes (`group-data-[hovering=true]:opacity-100`) to transition the visibility smoothly when the pointer enters the section.
- Uses `pointer-events-none` so that cursor coordinates flow through to underlying nodes and no clicks are intercepted.
