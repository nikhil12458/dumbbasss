# UI Components — Btn, Eyebrow, LinkArrow, ProjectCarousel, SectionTitle, TagRow

| Field | Value |
|-------|-------|
| **Path** | `src/components/ui/` |
| **Author** | 🤖 AI |
| **Category** | Component / UI Primitives |

*Note: All UI components use the `cn()` utility from `@/utils/cn` to safely merge default tailwind classes with optional `className` props.*

---

## Btn.tsx

A polymorphic button/link component used for all CTAs across the site.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string?` | — | If provided, renders as a Next.js `Link`; otherwise a `<button>` |
| `variant` | `"outline" \| "filled"` | `"outline"` | Visual style |
| `children` | `ReactNode` | — | Button label |
| `className` | `string?` | `""` | Additional classes |
| `onClick` | `() => void?` | — | Click handler |

*(Additionally accepts all standard HTML `<button>` and `<a>` attributes via spread, defaulting to `type="button"` when used as a button).*

### Variants
- **Outline**: `border-ink` and `text-ink`. Hover triggers `bg-ink` and `text-paper`.
- **Filled**: `bg-ink` and `text-paper`. Hover triggers `bg-accent`, `border-accent`, and `text-paper`.

*(Note: Tailwind standard utility classes are used directly to guarantee CSS specificity over browser base link styles).*

---

## Eyebrow.tsx

A small mono-font section label with a leading horizontal dash.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accent` | `boolean` | `false` | If true, uses accent color instead of soft ink |
| `children` | `ReactNode` | — | Label text |
| `className` | `string?` | `""` | Additional classes |

### Output
```
—— LABEL TEXT
```

---

## LinkArrow.tsx

An inline link with monospaced uppercase styling.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | Destination URL |
| `children` | `ReactNode` | Link text |
| `className` | `string?` | Additional classes |

---

## SectionTitle.tsx

A reusable `<h2>` heading with display font, bold weight, and clamped responsive sizing.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Title text |
| `className` | `string?` | Additional classes |

---

## TagRow.tsx

A row of bordered tag chips, used for project technology stacks and service categories.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `tags` | `string[]` | Array of tag labels |
| `className` | `string?` | Additional classes |

---

## ProjectCarousel.tsx

An automated image slideshow component built with Framer Motion, used for project detail pages. 

### Props

| Prop | Type | Description |
|------|------|-------------|
| `images` | `string[]` | Array of image URLs |
| `liveLink` | `string?` | Optional URL. If provided, the entire carousel becomes a clickable link. |

### Features
- **Auto-play**: Automatically cycles through images every 4 seconds.
- **Crossfade**: Uses `AnimatePresence` to crossfade smoothly between images.
- **Pagination**: Displays a floating counter (e.g., `01 / 03`) in the bottom right corner if multiple images exist.
- **Scale effect**: Includes a slow, continuous scale-up effect (`group-hover:scale-105`) while hovering over the image.
- **Single image fallback**: If only one image is passed, it renders statically without the crossfade interval or pagination counter.

---

## SectionDivider.tsx

A stylized hairline rule broken by a small inline SVG torii gate symbol in the center, used to divide major content sections.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string?` | Additional classes |

### Behavior
Renders a horizontal rule built with flex layout, thin hairlines (`h-px bg-[var(--line)]`), and a custom center SVG drawing (`28x16` viewbox) replicating the Torii Gate motif in a minimal wireframe style. Set with `aria-hidden="true"`.

---

## TechTag.tsx

A technology badge that displays a specific brand name along with its official brand logo.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `tag` | `string` | The technology brand name (e.g., `"Kotlin"`, `"TypeScript"`, `"React"`) |

### Behavior
- Renders a small inline flex pill with a solid border (`border-[var(--line-strong)]`) and soft ink text.
- Maps the `tag` string to its respective React Simple Icon (e.g., `SiKotlin` for `"Kotlin"`, `SiReact` for `"React"`) using an internal `ICON_MAP`.
- Renders only the text label if the brand does not exist in `ICON_MAP`.

---

## AnimatedNumber.tsx

A custom number counter ticker that animates from `0` to its target value once scrolled into the viewport.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | The string value to animate (e.g., `"40+"`, `"100%"`, `"0"`). |
| `duration` | `number?` | The animation length in seconds. Defaults to `1.1`. |
| `className` | `string?` | Additional classes |

### Behavior
- Uses Framer Motion's `useInView` to trigger the count-up sequence once.
- Parses the target string using regex `^(\D*)(\d+)(\D*)$` to isolate prefixes, target numbers, and suffixes (e.g. `100` and `%` from `100%`).
- Tweens the count-up frame by frame using `requestAnimationFrame` and an `easeOutExpo` timing curve.
- Hides the animation and outputs the raw value instantly if `useReducedMotion()` returns true.
