# Magnetic Wrapper

| Field | Value |
|-------|-------|
| **Path** | `src/components/animations/Magnetic.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / Animation |

## Purpose

A reusable framer-motion wrapper component that adds a "magnetic" physical hover effect to interactive elements (like buttons). When the user's cursor approaches or hovers over the element, the element slightly pulls towards the cursor.

## Usage

Simply wrap any interactive UI component in `<Magnetic>`:

```tsx
import Magnetic from "@/components/animations/Magnetic";
import Btn from "@/components/ui/Btn";

<Magnetic>
  <Btn href="/contact" variant="filled">start something →</Btn>
</Magnetic>
```

## Behavior

- Hooks into `onMouseMove` and `onMouseLeave`.
- Calculates the bounding client rect of the wrapped element.
- Derives a `clientX` and `clientY` offset from the center of the element.
- Translates the element via `motion.div` slightly towards the cursor using a spring animation (`type: "spring", stiffness: 150, damping: 15, mass: 0.1`).
- Instantly snaps back to `x: 0, y: 0` on mouse leave.
