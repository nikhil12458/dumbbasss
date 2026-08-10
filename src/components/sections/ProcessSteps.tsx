"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Step = {
  num: string;
  title: string;
  desc: string;
  output: string;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Consultation",
    desc: 'A short, direct conversation — what you\'re building, who it\'s for, and what "done" actually looks like.',
    output: "a shared understanding, in writing"
  },
  {
    num: "02",
    title: "Define scope",
    desc: "Turning the conversation into a concrete list — pages, features, systems, and a timeline everyone agrees to.",
    output: "a scope doc + rough timeline"
  },
  {
    num: "03",
    title: "Design",
    desc: "A real design — layout, type, motion — reviewed and approved before a single line of production code exists.",
    output: "approved design reference"
  },
  {
    num: "04",
    title: "Build",
    desc: "Built in the open, with a staging link from week one — you can watch it come together instead of waiting for a reveal.",
    output: "a live staging environment"
  },
  {
    num: "05",
    title: "Refine",
    desc: "A focused round of feedback and adjustment — the small things that only show up once it's real.",
    output: "a launch-ready build"
  },
  {
    num: "06",
    title: "Launch",
    desc: "Shipped, monitored, and handed off with documentation a human can actually read — not a wall of jargon.",
    output: "a live product + handoff docs"
  }
];

function StepItem({ step, i, totalSteps, scrollYProgress }: { step: Step; i: number; totalSteps: number; scrollYProgress: MotionValue<number> }) {
  const start = i / totalSteps;
  const end = (i + 1) / totalSteps;
  
  // Generous buffer ensures long plateaus where the text is perfectly still.
  const buffer = 0.05;
  
  let opacityInput = [start - buffer, start + buffer, end - buffer, end + buffer];
  let opacityOutput = [0, 1, 1, 0];
  
  // Huge y translation (400px) guarantees no text overlaps on screen during crossfade.
  let yInput = [start - buffer, start + buffer, end - buffer, end + buffer];
  let yOutput = [400, 0, 0, -400];

  // Clamp first and last steps so they are solid when entering/leaving the section
  if (i === 0) {
    opacityInput = [0, end - buffer, end + buffer];
    opacityOutput = [1, 1, 0];
    yInput = [0, end - buffer, end + buffer];
    yOutput = [0, 0, -400];
  }
  if (i === totalSteps - 1) {
    opacityInput = [start - buffer, start + buffer, 1];
    opacityOutput = [0, 1, 1];
    yInput = [start - buffer, start + buffer, 1];
    yOutput = [400, 0, 0];
  }

  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
  const y = useTransform(scrollYProgress, yInput, yOutput);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none"
    >
      <div className="mb-[16px]">
        <span className="font-mono text-[14px] text-[var(--accent)]">{step.num}</span>
      </div>
      <div>
        <h2 className="font-display text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.01em] mb-[16px]">{step.title}</h2>
        <p className="text-[16px] md:text-[18px] text-[var(--ink-soft)] leading-[1.6] max-w-[48ch]">{step.desc}</p>
      </div>
      <div className="font-mono text-[11.5px] text-[var(--ink-faint)] leading-[1.7] pt-[20px] border-t border-dashed border-[var(--line-strong)] mt-[24px] max-w-[48ch]">
        <span className="text-[var(--ink-soft)] block mb-[4px] uppercase tracking-[0.06em] text-[10px]">Output</span>
        {step.output}
      </div>
    </motion.div>
  );
}

export default function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const totalSteps = steps.length;
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative w-full h-[600vh]">
      {/* Sticky container uses completely transparent background to keep global texture */}
      <div className="sticky top-0 w-full h-screen flex items-start pt-[15vh] overflow-hidden pointer-events-none">
        
        <div className="wrap w-full relative grid grid-cols-[40px_1fr] md:grid-cols-[96px_1fr] gap-[32px] md:gap-[64px]">
          
          {/* Left Column: The Line & Dot */}
          <div className="relative h-[60vh] flex flex-col items-center justify-start">
            <div className="absolute top-0 bottom-0 w-[1px] bg-[var(--line-strong)]"></div>
            <motion.div 
              style={{ top: dotY }}
              className="absolute w-[10px] h-[10px] rounded-full bg-[var(--accent)] border-[1.5px] border-[var(--accent)] -translate-x-1/2 left-1/2 z-10 -mt-[5px]"
            />
          </div>

          {/* Right Column: The Steps Slider */}
          <div className="relative h-[60vh] w-full max-w-[700px]">
            {steps.map((step, i) => (
              <StepItem key={i} step={step} i={i} totalSteps={totalSteps} scrollYProgress={scrollYProgress} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
