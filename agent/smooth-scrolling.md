# SmoothScrolling.tsx

| Field | Value |
|-------|-------|
| **Path** | `src/components/layout/SmoothScrolling.tsx` |
| **Author** | 🤖 AI |
| **Category** | Foundation / Layout |

## Purpose

A provider component that enables smooth scrolling across the entire application using the `lenis` library.

## What it does

- Wraps the application inside `ReactLenis`.
- Enforces smooth scrolling via JS interpolation (`lerp`) overriding native scroll.
- Configurations (`lerp: 0.1`, `duration: 1.5`, `smoothWheel: true`) provide a weighty, premium scroll feel consistent with the site's physics.

## Note
In `globals.css`, the native CSS rule `scroll-behavior: smooth;` was removed because native smooth scrolling clashes with Lenis's JavaScript-based scroll interpolation.
