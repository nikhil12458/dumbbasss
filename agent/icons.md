# Icons Architecture

| Field | Value |
|-------|-------|
| **Path** | `src/components/icons/` |
| **Author** | 🤖 AI |
| **Category** | Assets / SVG |

## Philosophy

The site strictly uses "thin single-stroke line" icons (1.4px to 1.5px stroke weight). Icons must have rounded caps, no fills, and generally adopt the `var(--ink-faint)` color unless active.

## Libraries

- **`lucide-react`**: The primary icon library. Provides highly customizable SVG icons that perfectly match the site's thin, minimal aesthetic when configured correctly.
- **`react-icons`**: Used selectively as a fallback or for specialized brand logos (e.g., `react-icons/fi` for Feather Icons, or specific brand icons).

## ServiceIcons.tsx

A specialized component (`src/components/icons/ServiceIcons.tsx`) that exports semantic icon wrappers for the Services section.

### Features
- Pre-configured with the standard `strokeWidth={1.5}` and `size={24}`.
- Colors mapped to `text-[var(--ink-faint)]` by default.
- Uses `lucide-react` for all structural services (Websites, Software, AI, Design).
