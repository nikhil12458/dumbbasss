"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface ProjectCarouselProps {
  images: string[];
  liveLink?: string;
}

export default function ProjectCarousel({ images, liveLink }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  const content = (
    <div className="relative w-full aspect-video overflow-hidden bg-[var(--paper-deep)] border border-[var(--line-strong)] isolate group">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Project view ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-[20px] right-[20px] z-10 bg-[var(--paper)]/90 backdrop-blur-sm border border-[var(--line-strong)] px-[12px] py-[6px]">
          <span className="font-mono text-[11px] tracking-[0.08em] text-[var(--ink)]">
            {String(currentIndex + 1).padStart(2, '0')} <span className="text-[var(--ink-faint)]">/</span> {String(images.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );

  if (liveLink) {
    return (
      <Link href={liveLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        {content}
      </Link>
    );
  }

  return content;
}
