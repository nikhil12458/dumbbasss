"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Mount ONLY inside the home page's hero <section> — not layout.tsx, not
 * global. This is deliberately the opposite of the last two attempts:
 * scoped to exactly one section, absolutely positioned within it, so it
 * is structurally incapable of bleeding into any other section no matter
 * what's above or below it on the page.
 *
 * Usage in src/app/page.tsx:
 *
 *   <section className="pt-[64px] pb-[40px] relative overflow-hidden">
 *     <HeroLandscape />
 *     <div className="relative z-10 wrap grid ...">
 *       ...existing hero content (ToriiGate, kinetic word, copy)...
 *     </div>
 *   </section>
 *
 * That z-10 on the existing content wrapper matters — without it,
 * stacking order between this absolutely-positioned layer and your
 * normal-flow hero content isn't guaranteed.
 */
export default function HeroLandscape() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const section = el?.closest("section");
    if (!el || !section) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;
    let rect = { left: 0, top: 0, width: 0, height: 0 };

    const updateRect = () => {
      const r = section.getBoundingClientRect();
      rect = {
        left: r.left + window.scrollX,
        top: r.top + window.scrollY,
        width: r.width,
        height: r.height,
      };
      if (el.dataset.hovering !== "true") {
        el.style.setProperty("--hx", `${rect.width / 2}px`);
        el.style.setProperty("--hy", `${rect.height / 2}px`);
      }
    };

    const apply = () => {
      raf = 0;
      if (!pending || !el) return;
      el.style.setProperty("--hx", `${pending.x}px`);
      el.style.setProperty("--hy", `${pending.y}px`);
    };

    const move = (e: PointerEvent) => {
      pending = { x: e.pageX - rect.left, y: e.pageY - rect.top };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const enter = () => {
      el.dataset.hovering = "true";
    };

    const leave = () => {
      el.dataset.hovering = "false";
    };

    updateRect();
    const ro = new ResizeObserver(updateRect);
    ro.observe(section);

    section.addEventListener("pointerenter", enter);
    section.addEventListener("pointerleave", leave);
    section.addEventListener("pointermove", move, { passive: true });

    return () => {
      ro.disconnect();
      section.removeEventListener("pointerenter", enter);
      section.removeEventListener("pointerleave", leave);
      section.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="group absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* revealed — full color (red accents intact), masked
          to a soft radius around the cursor. appears on hover only. */}
      <Image
        src="/home_bg_img.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-0 group-data-[hovering=true]:opacity-[1] transition-opacity duration-500 ease-[var(--ease)]"
        style={{
          mixBlendMode: "multiply",
          objectPosition: "center",
          maskImage:
            "radial-gradient(150px circle at var(--hx, 50%) var(--hy, 50%), black, transparent)",
          WebkitMaskImage:
            "radial-gradient(150px circle at var(--hx, 50%) var(--hy, 50%), black, transparent)",
        }}
      />
    </div>
  );
}
