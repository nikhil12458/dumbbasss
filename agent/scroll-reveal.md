# ScrollReveal.tsx — GSAP Scroll Animation

| Field | Value |
|-------|-------|
| **Path** | `src/components/animations/ScrollReveal.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / Animation |

## Purpose

A wrapper component that fades and slides its children into view when they enter the viewport, powered by GSAP ScrollTrigger.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Content to reveal |
| `variant` | `"up" \| "up-strong"` | `"up"` | `"up"` = 16px travel, `"up-strong"` = 46px travel |
| `className` | `string?` | `""` | Additional classes |

## How it works

1. The container starts with `opacity: 0`
2. On mount, GSAP `fromTo` animates from `{ opacity: 0, y: offset }` to `{ opacity: 1, y: 0 }`
3. The animation triggers when the element's top crosses `88%` of the viewport
4. Uses `@gsap/react`'s `useGSAP` hook for proper cleanup

## Dependencies

- `gsap`
- `gsap/ScrollTrigger`
- `@gsap/react`
