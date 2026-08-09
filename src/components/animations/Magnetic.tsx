"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  /** how far the button can be pulled, in px — keep this small, this is a
   * "has weight" cue, not a slingshot */
  strength?: number;
  className?: string;
};

/**
 * Wrap any single interactive child (a Btn, an icon-button, a nav link) to
 * give it a magnetic pull toward the cursor within its own bounding box.
 * Snaps back on pointer leave via the same spring physics language the
 * rest of this site already uses (kinetic word, custom cursor ring).
 *
 * Usage:
 *   <Magnetic><Btn href="/consultation" variant="filled">start something →</Btn></Magnetic>
 */
export default function Magnetic({ children, strength = 18, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
