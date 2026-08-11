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

A specialized module (`src/components/icons/ServiceIcons.tsx`) that exports custom SVG components tailored for each service type: Websites, Software, AI, Business Systems, and Growth.

### Features
- Implements custom inline SVG elements with a uniform `1.4px` stroke width, matching the site's thin hairline aesthetic.
- Color set to inherit (`currentColor`) so they automatically adapt to parent styles.
- Avoids external dependencies like `lucide-react` or `react-icons` for service sections, optimizing load times and visual consistency.
- Includes a `getServiceIcon(slug)` helper to dynamically load service icons based on string identifiers.

