"use client";

import Image from "next/image";
import { useCursorReveal } from "@/hooks/useCursorReveal";

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
  const wrapRef = useCursorReveal();

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
        priority
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
