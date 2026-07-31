"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultFlow from "./ConsultFlow";

export default function ConsultPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-[28px] bottom-[28px] z-[500] flex items-center gap-[10px] bg-[var(--ink)] text-[var(--paper)] font-mono text-[12px] tracking-[0.06em] uppercase p-[15px_20px] border-none cursor-pointer shadow-[0_18px_36px_-18px_rgba(24,20,15,0.45)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[var(--accent)] group"
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
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              className="relative z-10 w-full sm:w-[420px] h-full bg-[var(--paper)] border-l border-[var(--line-strong)] flex flex-col p-[28px_30px_24px]"
            >
              <div className="flex justify-between items-start mb-[20px]">
                <div>
                  <h3 className="text-[19px] font-display font-bold tracking-[-0.01em]">Let's figure out what you need.</h3>
                  <p className="font-mono text-[11px] text-[var(--ink-soft)] mt-[6px] tracking-[0.04em]">five quick questions — no pressure</p>
                </div>
                <button
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
