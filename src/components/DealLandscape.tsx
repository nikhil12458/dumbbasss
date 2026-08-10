"use client";

import Image from "next/image";
import { useCursorReveal } from "@/hooks/useCursorReveal";

export default function DealLandscape() {
  const wrapRef = useCursorReveal();

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="group absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <Image
        src="/mount_fuji_dark.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-0 group-data-[hovering=true]:opacity-[1] transition-opacity duration-500 ease-[var(--ease)]"
        style={{
          mixBlendMode: "screen",
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
