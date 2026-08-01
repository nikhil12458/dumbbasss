# Navbar.tsx — Navigation Bar

| Field | Value |
|-------|-------|
| **Path** | `src/components/nav/Navbar.tsx` |
| **Author** | 🤖 AI (upgraded from 👤 User original) |
| **Category** | Component / Navigation |

## Purpose

The sticky top navigation bar with a desktop link row and an animated mobile hamburger menu.

## History

The user created the initial Navbar with desktop-only navigation links. The AI agent then rewrote it to add:
- A mobile hamburger toggle (three animated bars via Framer Motion)
- A slide-down mobile nav panel using `AnimatePresence`
- The ™ superscript on the logo
- Proper backdrop blur and border styling matching the reference design

## Features

- **Sticky header** — `sticky top-0 z-200` with a semi-transparent paper background and backdrop blur
- **Desktop nav** — Hidden below `md` breakpoint; shows 6 NavLink items
- **Mobile toggle** — Three `<motion.span>` bars that animate into an X when open. Includes `aria-controls` and `aria-expanded` for accessibility.
- **Mobile panel** — `AnimatePresence` + `motion.nav` with height/opacity animation
- **Auto-close** — Clicking any link in mobile nav closes the menu

## Dependencies

- `@/utils/Navlink` (NavLink component by user)
- `framer-motion`
