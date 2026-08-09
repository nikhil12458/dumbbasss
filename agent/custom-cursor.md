# Custom Cursor — CustomCursor.tsx

| Field | Value |
|-------|-------|
| **Path** | `src/components/cursor/CustomCursor.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / UI Animation |

## Overview

The `CustomCursor` is a global UI component that replaces the standard browser pointer with a custom, physics-driven dot and ring setup built using Framer Motion. It aligns perfectly with the brand's physics-based aesthetic (similar to the kinetic typography) — favoring restraint, subtle weight, and precise trailing logic over exaggerated bounciness.

## Architecture

- **Root Rendering**: Rendered once globally within `src/app/layout.tsx`.
- **Attribute-driven**: Uses the `data-cursor` and `data-cursor-label` data attributes to dictate behavior across the app without needing a complex global React Context.
- **Responsive**: Will automatically hide on touch devices (via CSS media query fallback `(pointer: fine) and (hover: hover)` check).
- **Native text-caret fallback**: Automatically disappears and yields to the native browser text-caret when hovering over readable content tagged with `data-cursor="text"`, prioritizing accessibility and usability over aesthetic.
- **Theme aware**: Identifies `.section-dark` wrapper classes on hover, and inversely transitions its color palette from dark (`var(--ink)`) to light (`var(--paper)`) to maintain visibility on dark backgrounds.

## Usage

Any DOM element can trigger a cursor state simply by attaching `data-cursor="[state]"`. 

```tsx
// Default link state
<LinkArrow href="/projects" data-cursor="link">see the stuff →</LinkArrow>

// Button state with accent color and larger size
<Btn href="/consultation" variant="filled" data-cursor="button">start something →</Btn>

// Project / Service Viewfinders
<Link href={`/projects/${project.slug}`} data-cursor="view" data-cursor-label="VIEW CASE">

// Draggable physics (like kinetic word)
<div data-cursor="drag" data-cursor-label="DRAG">...</div>

// Body copy / text yield
<p data-cursor="text">...</p>
```

### Supported States

| State | Behavior |
|-------|----------|
| `default` | 30px ring, ink-colored. |
| `link` | Shrinks to 20px, tightens around the dot. |
| `button` | Grows to 52px, changes border/bg to accent color with 10% opacity fill. |
| `view` | Grows to 64px, morphs into a rounded rectangle (viewfinder), and displays the `data-cursor-label`. |
| `drag` | Dashed border, 38px, displays label. |
| `grabbing` | Smaller dashed border (24px) triggered on pointerdown inside a `drag` area. |
| `text` | Hides custom cursor, re-enables native text caret via CSS (`cursor: text !important`). |

## Global CSS Coupling

The `CustomCursor` component is intrinsically coupled with a few global styles in `globals.css`:

```css
.has-custom-cursor,
.has-custom-cursor * {
  cursor: none !important;
}
.has-custom-cursor [data-cursor="text"] {
  cursor: text !important;
}
```

The `.has-custom-cursor` class is automatically added to the `<html>` node when the component mounts successfully on a pointer-enabled device.

## Performance Architecture (Crucial)

To prevent severe browser jank and layout thrashing (since this component fires events constantly on mouse movement), it strictly adheres to a **React-Bypass Performance Model**:

1. **Direct DOM Mutation for High-Frequency Updates**: 
   Properties like `opacity`, which change rapidly when moving between the window and iframes, are NEVER stored in React state. They are mutated directly via DOM refs (`wrapperRef.current.style.opacity = "1"`).

2. **State Guards**:
   All React state updates (`setState`, `setLabel`) are guarded by `useRef` caches (e.g., `currentStateRef`, `currentLabelRef`). State is *only* updated if the new value differs from the ref cache. This prevents React from enqueuing useless re-renders when hovering inside a large `data-cursor` block.

3. **RequestAnimationFrame (rAF) Throttling**:
   Heavy DOM queries like `e.target.closest("[data-cursor]")` or `closest(".section-dark")` are NEVER run directly inside the `pointermove` event handler. They are pushed into a `requestAnimationFrame` loop to ensure they only execute once per frame, preventing event-queue flooding.
