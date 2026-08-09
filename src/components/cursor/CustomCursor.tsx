"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [isText, setIsText] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Use refs for hot-path values that don't need React re-renders on every
  // mouse pixel. The `active` flag only controls opacity — a ref + direct
  // DOM mutation is far cheaper than setState on every pointermove.
  const activeRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cache last-known values to skip no-op setState calls
  const lastState = useRef<CursorState>("default");
  const lastLabel = useRef("");
  const lastIsText = useRef(false);
  const lastIsDark = useRef(false);
  const rafId = useRef(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springCfg = prefersReducedMotion
    ? { stiffness: 1000, damping: 100, mass: 0.2 }
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

  // Set opacity directly on the DOM node — no React re-render needed
  const setActive = useCallback((value: boolean) => {
    if (activeRef.current === value) return;
    activeRef.current = value;
    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = value && !lastIsText.current ? "1" : "0";
    }
  }, []);

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

    // Throttle the DOM-heavy work (closest() walks) to one per frame.
    // The motion value updates (mx/my) still fire immediately for smooth dot tracking.
    let lastEvent: PointerEvent | null = null;

    const processFrame = () => {
      rafId.current = 0;
      const e = lastEvent;
      if (!e) return;

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      const rawCursor = target?.dataset.cursor;

      // Compute next values
      const nextIsText = rawCursor === "text";
      const nextState: CursorState = nextIsText ? "default" : (rawCursor as CursorState) || "default";
      const nextLabel = target?.dataset.cursorLabel || "";
      const nextIsDark = !!(e.target as HTMLElement)?.closest(".section-dark");

      // Only trigger React re-renders when something actually changed
      if (nextState !== lastState.current) {
        lastState.current = nextState;
        setState(nextState);
      }
      if (nextLabel !== lastLabel.current) {
        lastLabel.current = nextLabel;
        setLabel(nextLabel);
      }
      if (nextIsText !== lastIsText.current) {
        lastIsText.current = nextIsText;
        setIsText(nextIsText);
        // Update opacity when isText changes
        if (wrapperRef.current) {
          wrapperRef.current.style.opacity = activeRef.current && !nextIsText ? "1" : "0";
        }
      }
      if (nextIsDark !== lastIsDark.current) {
        lastIsDark.current = nextIsDark;
        setIsDark(nextIsDark);
      }
    };

    const move = (e: PointerEvent) => {
      // Always update position immediately — this drives the spring, not React
      mx.set(e.clientX);
      my.set(e.clientY);

      if (!activeRef.current) setActive(true);

      // Batch the expensive DOM queries to one per frame
      lastEvent = e;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(processFrame);
      }
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
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [ready, mx, my, setActive]);

  if (!ready) return null;

  const ringSize = RING_SIZE[state];
  const primaryColor = isDark ? "var(--paper)" : "var(--ink)";

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
      style={{ opacity: 0 }}
    >
      <motion.div
        className="absolute rounded-full transition-colors duration-300"
        style={{ width: 6, height: 6, x: mx, y: my, translateX: "-50%", translateY: "-50%", backgroundColor: primaryColor }}
      />
      <motion.div
        className="absolute flex items-center justify-center border transition-[width,height,border-radius,background-color,border-color,color] duration-300 ease-out"
        style={{
          width: state === "view" ? "auto" : ringSize,
          height: state === "view" ? "auto" : ringSize,
          padding: state === "view" ? "8px 14px" : 0,
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
          backgroundColor: "transparent",
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
