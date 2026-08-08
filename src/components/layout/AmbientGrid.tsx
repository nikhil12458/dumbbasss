"use client";

import { useEffect, useRef } from "react";

/**
 * Mount once in layout.tsx, behind everything else:
 *   <AmbientGrid />
 *   <Navbar /> ... {children} ... <Footer />
 *
 * Deliberately not a canvas, not a per-frame animation loop, not React
 * state — this is one fixed div with a CSS radial-gradient mask, and the
 * only JS involved is updating two custom properties on pointer move,
 * throttled to one write per animation frame. The same "why does this
 * exist forever and cost nothing when idle" bar as everything else that
 * touches document-level pointer events on this site.
 */
export default function AmbientGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      raf = 0;
      if (!pending || !el) return;
      el.style.setProperty("--gx", `${pending.x}px`);
      el.style.setProperty("--gy", `${pending.y}px`);
    };

    const move = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    // Start the spotlight centered so there's no jarring jump-to-corner
    // before the first real pointer move.
    el.style.setProperty("--gx", `${window.innerWidth / 2}px`);
    el.style.setProperty("--gy", `${window.innerHeight / 2}px`);

    document.addEventListener("pointermove", move, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--ink-faint) 1px, transparent 5px)",
        backgroundSize: "28px 28px",
        // The grid is nearly invisible everywhere except a soft radius
        // around the cursor — this mask is what makes it feel alive
        // without ever being a distinct "thing" someone consciously sees.
        maskImage:
          "radial-gradient(220px circle at var(--gx, 50%) var(--gy, 50%), black, transparent)",
        WebkitMaskImage:
          "radial-gradient(220px circle at var(--gx, 50%) var(--gy, 50%), black, transparent)",
        opacity: 0.6,
      }}
    />
  );
}
