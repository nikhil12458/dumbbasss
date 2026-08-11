# ProcessSteps.tsx — Pinned Timeline Slider

| Field | Value |
|-------|-------|
| **Path** | `src/components/sections/ProcessSteps.tsx` |
| **Author** | 🤖 AI |
| **Category** | Component / Interactive Sections |

## Purpose

A key component rendered on the `/process` page. It creates a vertical timeline section where steps slide and crossfade in and out based on the user's scroll progression down the page.

## Mechanics

1. **Sticky Scroll Runway**:
   - The container block spans a total scroll runway height of `600vh`.
   - Mounts a sticky child block (`sticky top-0 w-full h-screen`) that captures the viewport scroll window.
2. **Left Timeline Track**:
   - Displays a vertical hairline (`w-[1px] bg-[var(--line-strong)]`) running down the center of the column.
   - An indicator dot tracks the user's viewport scroll percentage (`scrollYProgress` mapped to `top` position from `0%` to `100%`).
3. **Right Sliding Steps**:
   - Contains six absolute-positioned `StepItem` cards corresponding to the steps of the engagement process.
   - Maps `scrollYProgress` values to each card's opacity and translation Y (`y`) values:
     - **Inactive / Below**: `y: 400px`, `opacity: 0`
     - **Active / Visible**: `y: 0px`, `opacity: 1`
     - **Inactive / Above**: `y: -400px`, `opacity: 0`
   - Maps plateaus with a `0.05` scroll buffer to ensure each step rests still and fully legible in the center of the screen before the next fade begins.
   - Special casing clamps the first card (01 Consultation) to start fully visible and the last card (06 Launch) to remain visible at the end of the scroll runway.
