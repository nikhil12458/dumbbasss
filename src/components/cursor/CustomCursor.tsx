"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

type CursorState = "default" | "link" | "button" | "view" | "drag" | "grabbing";

const RING_SIZE: Record<CursorState, number> = {
  default: 30,
  link: 20,
  button: 52,
  view: 64,
  drag: 38,
  grabbing: 24,
};

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [isText, setIsText] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springCfg = prefersReducedMotion
    ? { stiffness: 1000, damping: 100, mass: 0.2 } // effectively rigid, no visible lag
    : { stiffness: 300, damping: 30, mass: 0.5 };

  const ringX = useSpring(mx, springCfg);
  const ringY = useSpring(my, springCfg);

  const vx = useVelocity(ringX);
  const vy = useVelocity(ringY);

  // Velocity-derived stretch — capped small on purpose. This should read
  // as "has a little weight," never as squash-and-stretch cartoon motion.
  const stretch = useTransform([vx, vy], (latest) => {
    const [lx, ly] = latest as number[];
    return Math.min(Math.hypot(lx, ly) / 2500, 0.2);
  });
  const angle = useTransform([vx, vy], (latest) => {
    const [lx, ly] = latest as number[];
    return (Math.atan2(ly, lx) * 180) / Math.PI;
  });
  const scaleX = useTransform(stretch, (s) => 1 + s);
  const scaleY = useTransform(stretch, (s) => 1 - s * 0.6);

  // Only ever activate on devices that actually have a real cursor.
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    setReady(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReady(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setActive(true);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      const rawCursor = target?.dataset.cursor;
      const next = (rawCursor as CursorState) || "default";
      
      setIsText(rawCursor === "text");
      setState(rawCursor === "text" ? "default" : next);
      setLabel(target?.dataset.cursorLabel || "");

      // Check if cursor is over a dark section
      const isOverDark = !!(e.target as HTMLElement)?.closest(".section-dark");
      setIsDark(isOverDark);
    };

    const down = () => setState((s) => (s === "drag" ? "grabbing" : s));
    const up = () => setState((s) => (s === "grabbing" ? "drag" : s));
    const leave = () => setActive(false);
    const enter = () => setActive(true);

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [ready, mx, my]);

  if (!ready) return null;

  const ringSize = RING_SIZE[state];
  const primaryColor = isDark ? "var(--paper)" : "var(--ink)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
      style={{ opacity: active && !isText ? 1 : 0 }}
    >
      <motion.div
        className="absolute rounded-full transition-colors duration-300"
        style={{ width: 6, height: 6, x: mx, y: my, translateX: "-50%", translateY: "-50%", backgroundColor: primaryColor }}
      />
      <motion.div
        className="absolute flex items-center justify-center border transition-[width,height,border-radius,background-color,border-color,color] duration-300 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scaleX: prefersReducedMotion ? 1 : scaleX,
          scaleY: prefersReducedMotion ? 1 : scaleY,
          rotate: prefersReducedMotion ? 0 : angle,
          borderRadius: state === "view" ? 6 : 999,
          borderStyle: state === "drag" || state === "grabbing" ? "dashed" : "solid",
          borderColor: state === "button" ? "var(--accent)" : primaryColor,
          backgroundColor: state === "button" ? "var(--accent)" : "transparent",
          opacity: state === "button" ? undefined : 1,
        }}
      >
        {state === "button" && (
          <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-10" />
        )}
        {label && (
          <span className="relative font-mono text-[9px] tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-300" style={{ color: primaryColor }}>
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
