"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function DealLandscape() {
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
      if (e.pointerType === "touch") return;
      pending = { x: e.pageX - rect.left, y: e.pageY - rect.top };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const enter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      el.dataset.hovering = "true";
    };

    const leave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      el.dataset.hovering = "false";
    };

    const touchStart = (e: TouchEvent) => {
      el.dataset.hovering = "true";
      const touch = e.touches[0];
      pending = { x: touch.pageX - rect.left, y: touch.pageY - rect.top };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const touchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      pending = { x: touch.pageX - rect.left, y: touch.pageY - rect.top };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const touchEnd = () => {
      el.dataset.hovering = "false";
    };

    updateRect();
    const ro = new ResizeObserver(updateRect);
    ro.observe(section);

    section.addEventListener("pointerenter", enter);
    section.addEventListener("pointerleave", leave);
    section.addEventListener("pointermove", move, { passive: true });
    
    section.addEventListener("touchstart", touchStart, { passive: true });
    section.addEventListener("touchmove", touchMove, { passive: true });
    section.addEventListener("touchend", touchEnd);
    section.addEventListener("touchcancel", touchEnd);

    return () => {
      ro.disconnect();
      section.removeEventListener("pointerenter", enter);
      section.removeEventListener("pointerleave", leave);
      section.removeEventListener("pointermove", move);
      
      section.removeEventListener("touchstart", touchStart);
      section.removeEventListener("touchmove", touchMove);
      section.removeEventListener("touchend", touchEnd);
      section.removeEventListener("touchcancel", touchEnd);
      cancelAnimationFrame(raf);
    };
  }, []);

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
