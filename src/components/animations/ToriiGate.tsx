"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function ToriiGate() {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Very gentle parallax
  const y = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <motion.div
      ref={ref}
      style={{ y: shouldReduce ? 0 : y }}
      className="w-full max-w-[420px] opacity-90"
    >
      <svg
        viewBox="0 70 420 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        <defs>
          <linearGradient id="pillarShade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--torii-dark, #2A221B)" />
            <stop offset="25%" stopColor="#3d3228" />
            <stop offset="100%" stopColor="var(--torii-dark, #2A221B)" />
          </linearGradient>
          
          <linearGradient id="kasagiShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cb5936" />
            <stop offset="100%" stopColor="var(--torii-red, #B24A2A)" />
          </linearGradient>

          <filter id="groundShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Base layer: Shadow + ground + footings + accent caps */}
        <motion.g
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.66, ease: "easeOut" }}
        >
          {/* ground shadow */}
          <ellipse cx="210" cy="510" rx="130" ry="5" fill="#1C1712" opacity="0.65" filter="url(#groundShadow)" />
          
          {/* ground line */}
          <rect x="58" y="506" width="304" height="8" fill="var(--ink, #1C1712)" opacity="0.95" />
          
          {/* stone footings */}
          <rect x="84" y="486" width="42" height="12" fill="var(--ink, #1C1712)" opacity="0.9" />
          <rect x="294" y="486" width="42" height="12" fill="var(--ink, #1C1712)" opacity="0.9" />
          
          {/* accent caps at the base of pillars */}
          <rect x="98" y="466" width="30" height="16" fill="var(--torii-red, #B24A2A)" />
          <rect x="292" y="466" width="30" height="16" fill="var(--torii-red, #B24A2A)" />
        </motion.g>

        {/* Pillars layer */}
        <motion.g
          initial={shouldReduce ? { scaleY: 1 } : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "50% 476px" }}
        >
          {/* hashira — pillars */}
          <rect x="104" y="212" width="18" height="264" fill="url(#pillarShade)" />
          <rect x="298" y="212" width="18" height="264" fill="url(#pillarShade)" />
        </motion.g>

        {/* Beams layer */}
        <motion.g
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.54, ease: "easeOut" }}
        >
          {/* shimaki — secondary beam beneath the kasagi */}
          <rect x="78" y="142" width="264" height="14" fill="url(#pillarShade)" opacity="0.95" />
          
          {/* gakuzuka — center post */}
          <rect x="202" y="156" width="16" height="34" fill="url(#pillarShade)" />
          
          {/* nuki — lower crossbeam */}
          <rect x="90" y="194" width="240" height="18" fill="url(#pillarShade)" />
        </motion.g>

        {/* Kasagi layer (top beam) */}
        <motion.path
          d="M46 110 L74 78 L346 78 L374 110 L374 132 L346 100 L74 100 L46 132 Z"
          fill="url(#kasagiShade)"
          initial={shouldReduce ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </motion.div>
  );
}
