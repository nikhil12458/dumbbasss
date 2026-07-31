# Footer.tsx — Site Footer

| Field | Value |
|-------|-------|
| **Path** | `src/components/layout/Footer.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / Layout |

## Purpose

The global site footer rendered on every page via `layout.tsx`. Three-column link layout + a bottom copyright bar.

## Structure

```
┌──────────────────────────────────────────────────┐
│  Studio            Work              Say hello   │
│  ├ About           ├ Projects        ├ Email     │
│  ├ Process         └ Services        └ Consult   │
│  └ Contact                                       │
├──────────────────────────────────────────────────┤
│  © 2026 dumbbasss studio    an unserious name... │
└──────────────────────────────────────────────────┘
```

## Styling

- Top border, `.wrap` container, flexbox with wrapping
- Column headers: mono, uppercase, faint
- Links: soft ink color with hover-to-ink transition
- Bottom bar: thin top border, mono 11px, space-between
