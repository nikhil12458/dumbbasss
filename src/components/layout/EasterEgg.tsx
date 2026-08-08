"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TRIGGER = "dumbbasss";

const MESSAGES = [
  "found it. we weren't hiding it very well.",
  "yes, that's the name. we know.",
  "you typed it. we're proud of you.",
  "okay, you're clearly paying attention. hi.",
];

/**
 * Mount once, globally, next to AmbientGrid.
 *
 * Three discovery paths, none of them spelling out the answer outright:
 *   1. A styled console.log on mount — the real primary path. Anyone
 *      technical enough to have devtools open (a good chunk of this
 *      site's actual audience) sees it immediately.
 *   2. A blinking terminal-cursor glyph in the footer, exported below as
 *      <EasterEggHint /> — mount it next to your copyright line. Signals
 *      "something expects input here" without saying what.
 *   3. A tap-5-times fallback on that same footer element, so this isn't
 *      entirely undiscoverable on a phone with no keyboard.
 *
 * A completely unhinted easter egg has a real-world discovery rate close
 * to zero — this trades a little of the "purity" of blind discovery for
 * an actual chance anyone ever sees the payoff.
 */
export default function EasterEgg() {
  const [message, setMessage] = useState<string | null>(null);
  const bufferRef = useRef("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fire = () => {
    setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
    setTimeout(() => setMessage(null), 3200);
  };

  useEffect(() => {
    // Discovery path 1: console hint.
    console.log(
      "%cpsst.%c\ntry typing our name somewhere on this page.",
      "font-family: monospace; font-size: 14px; color: #9c4a2c; font-weight: bold;",
      "font-family: monospace; font-size: 12px; color: #6e6656;"
    );

    const isTypingContext = (el: EventTarget | null) => {
      const tag = (el as HTMLElement)?.tagName?.toLowerCase();
      return tag === "input" || tag === "textarea" || (el as HTMLElement)?.isContentEditable;
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (isTypingContext(document.activeElement)) return;
      if (e.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-TRIGGER.length);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        bufferRef.current = "";
      }, 2500);

      if (bufferRef.current === TRIGGER) {
        bufferRef.current = "";
        fire();
      }
    };

    // Discovery path 3: tap-fallback, dispatched from <EasterEggHint />.
    const onTapTrigger = () => fire();

    document.addEventListener("keydown", onKeydown);
    window.addEventListener("dumbbasss:tap-trigger", onTapTrigger);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      window.removeEventListener("dumbbasss:tap-trigger", onTapTrigger);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          className="fixed bottom-[28px] left-1/2 -translate-x-1/2 z-[9998] font-mono text-[12px] tracking-[0.04em] bg-[var(--ink)] text-[var(--paper)] px-[18px] py-[12px] shadow-[0_18px_36px_-18px_rgba(24,20,15,0.45)]"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Discovery path 2 — mount this in Footer.tsx next to your copyright
 * line, e.g.:
 *
 *   <span className="footer-mark">© {new Date().getFullYear()} dumbbasss studio</span>
 *   <EasterEggHint />
 *
 * Renders a blinking terminal-cursor glyph in your existing mono label
 * style. Tapping/clicking it 5 times fires the same payoff as typing the
 * brand name — the visual tell for anyone visually scanning the footer,
 * and the actual trigger for anyone on a touch device.
 */
export function EasterEggHint() {
  const tapsRef = useRef(0);
  const resetRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleTap = () => {
    tapsRef.current += 1;
    clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => {
      tapsRef.current = 0;
    }, 1500);

    if (tapsRef.current >= 5) {
      tapsRef.current = 0;
      window.dispatchEvent(new Event("dumbbasss:tap-trigger"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleTap}
      aria-hidden="true"
      tabIndex={-1}
      className="font-mono text-[11px] text-[var(--ink-faint)] ml-[6px] animate-[blink_1.1s_steps(1)_infinite] cursor-default select-none"
    >
      __
    </button>
  );
}
