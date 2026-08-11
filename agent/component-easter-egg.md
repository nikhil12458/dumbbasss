# EasterEgg.tsx — Interactive Easter Egg & Hints

| Field | Value |
|-------|-------|
| **Path** | `src/components/layout/EasterEgg.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / Interaction |

## Purpose

A fun interaction wrapper that triggers a hidden message when the user types the studio's name "dumbbasss" or clicks/taps the blinking cursor hint in the footer five times.

## Triggers

1. **Keyboard Discovery**:
   - Listens to document keydown events.
   - Ignores keydown if the user is currently typing in an input, textarea, or contenteditable element.
   - Stores typed characters in a rotating buffer matching the length of `"dumbbasss"`.
   - Clears the buffer if no key is pressed for 2.5 seconds.
2. **Click/Touch Discovery (Mobile Fallback)**:
   - `<EasterEggHint />` outputs a blinking terminal cursor glyph (`__`).
   - Tapping it 5 times within 1.5 seconds dispatches a custom window event (`dumbbasss:tap-trigger`) to fire the egg.
3. **Console Log Hint**:
   - Outputs a styled message in the developer console on mount: `"psst. try typing our name somewhere on this page."`

## Payoffs

- Picks a random message from a static list (e.g., `"found it. we weren't hiding it very well."`).
- Fades/slides the message card up from the bottom center (`fixed bottom-[28px] left-1/2 -translate-x-1/2`) using Framer Motion.
- Dismisses itself automatically after 3.2 seconds.
