"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type AnimatedNumberProps = {
  /** e.g. "40+", "100%", "0" — parsed automatically, prefix/suffix preserved */
  value: string;
  duration?: number;
  className?: string;
};

export default function AnimatedNumber({
  value,
  duration = 1.1,
  className = "",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  // Split "40+" into target number 40, prefix "", suffix "+"
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const [, prefix, numStr, suffix] = match || ["", "", value, ""];
  const target = parseInt(numStr, 10);

  useEffect(() => {
    if (!inView || !match || Number.isNaN(target)) return;

    if (shouldReduce) {
      setDisplay(value);
      return;
    }

    let raf: number;
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo — starts fast, settles rather than overshoots
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const current = Math.round(from + (target - from) * eased);
      setDisplay(`${prefix}${current}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
