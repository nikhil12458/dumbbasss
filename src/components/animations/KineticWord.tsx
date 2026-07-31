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
  windAmp = 0.028,
  gravity = 0.05,
  mouseStrength = 2.2,
  spacing = 7,
  className = ""
}: KineticWordProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Wait for fonts to load
    let isCancelled = false;
    
    const init = async () => {
      try {
        await document.fonts.load(`700 100px "Space Grotesk"`);
        await document.fonts.load(`600 16px "JetBrains Mono"`);
      } catch(e) {
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
        fontFamily: "'Space Grotesk', sans-serif"
      });

      return kinetic;
    };

    let kineticInstance: any;
    init().then(instance => {
      kineticInstance = instance;
    });

    return () => {
      isCancelled = true;
      if (kineticInstance) {
        kineticInstance.destroy();
      }
    };
  }, [mounted, word, widthFraction, windAmp, gravity, mouseStrength, spacing]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}></div>
  );
}
