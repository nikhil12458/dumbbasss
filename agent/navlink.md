# Navlink.tsx — Active-State Link

| Field | Value |
|-------|-------|
| **Path** | `src/utils/Navlink.tsx` |
| **Author** | 👤 User |
| **Category** | Utility / Navigation |

## Purpose

A client-side `Link` wrapper that compares the current `pathname` to its `href` and applies active styling — darker text and an animated bottom underline that scales from `0` to `100%`.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | The route to link to |
| `children` | `React.ReactNode` | Link label text |

## Styling

- Monospaced, uppercase, extra-small tracking
- Active state: `text-[var(--ink)]` + underline `scale-x-100`
- Inactive state: `text-[var(--ink-soft)]` + underline `scale-x-0`
- Transition: `duration-200` on transform
