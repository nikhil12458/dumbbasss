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

A standardized visual separator used between major sections of a page.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string?` | Additional classes |

### Behavior
Renders a full-width container with a top border (`border-[var(--line)]`). Typically used to add visual structure to pages lacking illustrations or heavy background changes.

---

## TechTag.tsx

A small visual indicator for a specific technology, featuring an icon and a label.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `React.ElementType` | The SVG icon component (e.g., from `lucide-react` or `react-icons`) |
| `label` | `string` | The text label for the technology |
| `className` | `string?` | Additional classes |

### Behavior
Renders a small flex pill with a dashed border (`border-[var(--line-strong)]`) and soft ink text. Designed to fit inline within service descriptions or project spec lists.

---

## AnimatedNumber.tsx

A number that animates (counts up) from zero to its target value when it scrolls into the viewport.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number \| string` | The target value. If a string (e.g., "40+"), it parses the number for animation and appends the non-numeric suffix ("+") automatically. |
| `className` | `string?` | Additional classes |

### Behavior
Uses `framer-motion`'s `useInView` and `animate()` to tween a numeric state from 0 to the parsed target value over a spring physics duration. Can handle raw numbers or suffixed strings like `15x` or `40+`.
