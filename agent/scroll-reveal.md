# ScrollReveal.tsx — Scroll Animation

| Field | Value |
|-------|-------|
| **Path** | `src/components/animations/ScrollReveal.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / Animation |

## Purpose

A wrapper component that fades and slides its children into view when they enter the viewport, powered by Framer Motion.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Content to reveal |
| `variant` | `"up" \| "up-strong"` | `"up"` | `"up"` = 16px travel, `"up-strong"` = 46px travel |
| `className` | `string?` | `""` | Additional classes |

## How it works

1. The container uses `<motion.div>`
2. On mount, it sets `initial={{ opacity: 0, y: offset }}`
3. When the component enters the viewport (`whileInView`), it animates to `{ opacity: 1, y: 0 }`
4. Uses a `margin` of `-12%` on the viewport to trigger slightly before it enters the screen.
5. The animation only runs once per component mount (`once: true`).

## Dependencies

- `framer-motion`
