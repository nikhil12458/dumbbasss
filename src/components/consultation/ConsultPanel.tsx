"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultFlow from "./ConsultFlow";

export default function ConsultPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevIsOpen = useRef(isOpen);

  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { root: null, threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    } else if (prevIsOpen.current) {
      triggerRef.current?.focus();
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className={`fixed right-[28px] bottom-[28px] z-[500] flex items-center gap-[10px] bg-[var(--ink)] text-[var(--paper)] font-mono text-[12px] tracking-[0.06em] uppercase p-[15px_20px] border-none cursor-pointer shadow-[0_18px_36px_-18px_rgba(24,20,15,0.45)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[var(--accent)] group ${isFooterVisible ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100'}`}
      >
        <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] group-hover:bg-[var(--paper)] transition-colors duration-300" />
        Start a project
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[600] flex items-end justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[rgba(24,20,15,0.28)] backdrop-blur-[2px]"
            />
            
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="consult-title"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              className="relative z-10 w-full sm:w-[420px] h-full bg-[var(--paper)] border-l border-[var(--line-strong)] flex flex-col p-[28px_30px_24px]"
            >
              <div className="flex justify-between items-start mb-[20px]">
                <div>
                  <h3 id="consult-title" className="text-[19px] font-display font-bold tracking-[-0.01em]">Let's figure out what you need.</h3>
                  <p className="font-mono text-[11px] text-[var(--ink-soft)] mt-[6px] tracking-[0.04em]">five quick questions — no pressure</p>
                </div>
                <button
                  ref={closeRef}
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent border-none font-mono text-[12px] text-[var(--ink-soft)] cursor-pointer p-[6px] hover:text-[var(--ink)] transition-colors"
                >
                  Close ✕
                </button>
              </div>
              
              <ConsultFlow />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
