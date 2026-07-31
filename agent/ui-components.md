# UI Components — Btn, Eyebrow, LinkArrow, SectionTitle, TagRow

| Field | Value |
|-------|-------|
| **Path** | `src/components/ui/` |
| **Author** | 🤖 AI |
| **Category** | Component / UI Primitives |

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

An animated inline link with monospaced uppercase styling and a gap that expands on hover.

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
