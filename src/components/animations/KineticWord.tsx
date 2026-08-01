"use client";

import React, { useEffect, useRef, useState } from "react";
import { mountKineticWord } from "@/utils/kinetic-type";

type KineticWordProps = {
  word?: string;
  widthFraction?: number;
  windAmp?: number;
  gravity?: number;
  mouseStrength?: number;
  spacing?: number;
  className?: string;
};

export default function KineticWord({
  word = "dumbbasss",
  widthFraction = 0.88,

  windAmp = 0.012,
  gravity = 0.008,

  mouseStrength = 2.2,
  spacing = 7,
  className = "",
}: KineticWordProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Wait for fonts to load
    let isCancelled = false;

    const init = async () => {
      try {
        await document.fonts.load(`700 100px "Space Grotesk"`);
        await document.fonts.load(`600 16px "JetBrains Mono"`);
      } catch (e) {
        // ignore
      }

      if (isCancelled) return;

      const kinetic = mountKineticWord(containerRef.current!, {
        word,
        widthFraction,
        windAmp,
        gravity,
        mouseStrength,
        spacing,
        fontFamily: "'Space Grotesk', sans-serif",
      });

      return kinetic;
    };

    let kineticInstance: any;
    init().then((instance) => {
      if (!instance) return;
      kineticInstance = instance;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            kineticInstance.resume();
          } else {
            kineticInstance.pause();
          }
        });
      }, { rootMargin: "50px" });
      
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      kineticInstance._observer = observer;
    });

    return () => {
      isCancelled = true;
      if (kineticInstance) {
        if (kineticInstance._observer) kineticInstance._observer.disconnect();
        kineticInstance.destroy();
      }
    };
  }, [word, widthFraction, windAmp, gravity, mouseStrength, spacing]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}></div>
  );
}
