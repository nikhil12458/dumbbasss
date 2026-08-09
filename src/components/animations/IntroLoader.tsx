"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic intro — zoom-to-fill reveal:
 *
 * 1. Dark screen, letters dance in.
 * 2. Settle.
 * 3. Reveal: The text scales up massively (scale: 200).
 *    We dynamically calculate the transform-origin to target the solid
 *    stem of the center letter ('b').
 *    As it zooms, the letter's color (var(--paper)) expands to fill
 *    the entire viewport. Since this perfectly matches the site's
 *    background color, we just unmount the intro once the screen is
 *    full of var(--paper), creating a seamless, opacity-free transition.
 *
 * Session-guarded.
 */

const LETTERS = ["d", "u", "m", "b", "b", "a", "s", "s", "s"];

const STAGGER = 80;
const DANCE_ANIM = 900;
const DANCE_TOTAL = LETTERS.length * STAGGER + DANCE_ANIM;
const SETTLE = 800;
const ZOOM_DURATION = 1200;

export default function IntroLoader() {
  const [phase, setPhase] = useState<"check" | "dance" | "reveal" | "done">("check");
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const wordRef = useRef<HTMLDivElement>(null);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    try {
      if (sessionStorage.getItem("intro-played")) {
        setPhase("done");
        return;
      }
    } catch {}

    document.documentElement.classList.add("intro-active");
    setPhase("dance");

    // Calculate exact transform origin to hit the solid stem of the center 'b'
    // Do this after a short delay so fonts have rendered
    setTimeout(() => {
      if (wordRef.current) {
        const letterElements = wordRef.current.querySelectorAll(".intro-letter");
        const centerLetter = letterElements[4]; // the second 'b'
        if (centerLetter) {
          const wordRect = wordRef.current.getBoundingClientRect();
          const letterRect = centerLetter.getBoundingClientRect();
          
          // Target the left 20% of the 'b' (the solid vertical stem)
          const targetX = letterRect.left - wordRect.left + letterRect.width * 0.2;
          const targetY = letterRect.top - wordRect.top + letterRect.height * 0.5;
          
          const originX = (targetX / wordRect.width) * 100;
          const originY = (targetY / wordRect.height) * 100;
          
          setZoomOrigin(`${originX}% ${originY}%`);
        }
      }
    }, 100);

    const startReveal = () => {
      setPhase("reveal");
      setTimeout(() => {
        setPhase("done");
        document.documentElement.classList.remove("intro-active");
        try {
          sessionStorage.setItem("intro-played", "1");
        } catch {}
      }, ZOOM_DURATION + 100);
    };

    const timer = setTimeout(() => {
      if (document.readyState === "complete") {
        startReveal();
      } else {
        window.addEventListener("load", startReveal, { once: true });
      }
    }, DANCE_TOTAL + SETTLE);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("intro-active");
    };
  }, []);

  if (phase === "done") return null;

  if (phase === "check") {
    return (
      <div className="intro-screen" aria-hidden="true" />
    );
  }

  return (
    <div className="intro-screen" data-phase={phase} aria-hidden="true">
      <div
        ref={wordRef}
        className="intro-word"
        data-phase={phase}
        style={
          {
            fontSize: "clamp(40px, 9vw, 90px)",
            transformOrigin: zoomOrigin,
          } as React.CSSProperties
        }
      >
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="intro-letter"
            style={{ animationDelay: `${i * STAGGER}ms` }}
          >
            {letter}
          </span>
        ))}
        <span
          className="intro-dot"
          style={{
            animationDelay: `${LETTERS.length * STAGGER}ms`,
            fontSize: "clamp(40px, 9vw, 90px)",
          }}
        />
      </div>
    </div>
  );
}
