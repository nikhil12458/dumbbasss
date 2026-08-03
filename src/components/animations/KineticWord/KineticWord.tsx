"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { mountKineticWord } from "./kinetic-type";
import type { KineticWordOptions, KineticWordInstance } from "./types";

export interface KineticWordProps extends KineticWordOptions {
  /** Extra class name(s) applied to the wrapping container. Optional —
   * this component ships no required stylesheet or CSS framework. */
  className?: string;
  /** Inline styles merged onto the wrapping container, applied after the
   * built-in base styles (width/height/position). */
  style?: CSSProperties;
  /** Accessible text for screen readers, since the word itself is drawn to
   * a <canvas> and has no real text content. Defaults to `word`. */
  ariaLabel?: string;
}

const visuallyHidden: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

export default function KineticWord({
  className = "",
  style,
  ariaLabel,
  ...options
}: KineticWordProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let instance: KineticWordInstance | undefined;
    let observer: IntersectionObserver | undefined;

    const displayFont = `${options.fontWeight ?? 700} 100px ${
      options.fontFamily ?? "'Space Grotesk', sans-serif"
    }`;
    const glyphFont = `${options.glyphFontWeight ?? 600} 16px ${
      options.glyphFontFamily ?? "'JetBrains Mono', monospace"
    }`;

    (async () => {
      try {
        // Wait for both fonts actually used to render/measure the mesh to
        // be ready — mounting before they load would sample the fallback
        // font's metrics instead of the intended one.
        await Promise.all([
          document.fonts.load(displayFont),
          document.fonts.load(glyphFont),
        ]);
      } catch {
        // Font Loading API unsupported, or a font failed to resolve.
        // Proceed anyway with whatever the browser falls back to rather
        // than never rendering at all.
      }
      if (cancelled) return;

      instance = mountKineticWord(container, options);

      // Pause the simulation while scrolled out of view — otherwise the
      // physics loop and canvas redraw keep running, invisibly, forever.
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) instance?.resume();
            else instance?.pause();
          });
        },
        { rootMargin: "50px" },
      );
      observer.observe(container);
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      instance?.destroy();
    };
    // `options` is a fresh object every render (it's built from rest-spread
    // props), so comparing by reference would re-mount on every render.
    // Everything in KineticWordOptions is a plain string/number/boolean,
    // so a stringified value comparison is a cheap, correct stand-in for
    // "did any option actually change".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)]);

  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel ?? options.word}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      {/* mountKineticWord() takes full imperative ownership of this node,
          including clearing and replacing its children on every
          rebuild — it must never be a node React also renders into,
          or the two will silently fight over the same DOM. */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {/* Belt-and-suspenders fallback: role="img" already gives this
          element an accessible name and tells assistive tech to treat its
          contents as replaced/decorative, but keeping real text here too
          means the word survives in a "view source" / no-CSS / crawler
          context even if the canvas itself never renders. */}
      <span style={visuallyHidden}>{ariaLabel ?? options.word}</span>
    </div>
  );
}
