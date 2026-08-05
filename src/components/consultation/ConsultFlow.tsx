"use client";

import { useState } from "react";
import LinkArrow from "../ui/LinkArrow";
import Btn from "../ui/Btn";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    key: 'need',
    q: "What are you here to build?",
    options: ["A website", "A software system", "AI or automation", "A business system", "Not sure yet"]
  },
  {
    key: 'business',
    q: "What kind of business is this for?",
    options: ["Restaurant / hospitality", "Retail or ecommerce", "Startup / SaaS", "Personal brand", "Something else"]
  },
  {
    key: 'help',
    q: "What do you need most?",
    options: ["Design", "Development", "SEO", "A chatbot", "AI integration", "The whole build"]
  },
  {
    key: 'content',
    q: "Do you already have content — copy, images, branding?",
    options: ["Yes, all of it", "Some of it", "Starting from scratch"]
  },
  {
    key: 'timeline',
    q: "Rough timeline?",
    options: ["As soon as possible", "3-5 days", "1–2 months", "Flexible, no rush"]
  }
];

export default function ConsultFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (key: string, val: string) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
    setStepIndex(prev => prev + 1);
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(prev => prev - 1);
  };

  const isComplete = stepIndex >= STEPS.length;

  // Suggestion logic based on answer
  const routeSuggestion = () => {
    if (answers.need === "A business system") return { label: "Business systems", href: "/services/business-systems" };
    if (answers.need === "AI or automation") return { label: "AI & automation services", href: "/services/ai" };
    if (answers.need === "A software system") return { label: "Software systems", href: "/services/software" };
    if (answers.need === "A website") return { label: "Web design & development", href: "/services/websites" };
    return { label: "All services", href: "/services" };
  };
  const suggestion = routeSuggestion();

  const mailtoLink = () => {
    const subject = encodeURIComponent(`New project inquiry — ${answers.need || ''}`);
    const bodyText = encodeURIComponent(
      STEPS.map(s => `${s.q}\n${answers[s.key] || '—'}`).join('\n\n')
    );
    return `mailto:hello@dumbbasss.studio?subject=${subject}&body=${bodyText}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Progress Bar */}
      <div className="flex gap-[6px] mb-[22px]">
        {STEPS.map((_, i) => (
          <span key={i} className={`h-[2px] flex-1 ${i <= Math.min(stepIndex, STEPS.length - 1) ? 'bg-[var(--ink)]' : 'bg-[var(--line-strong)]'}`} />
        ))}
        <span className={`h-[2px] flex-1 ${isComplete ? 'bg-[var(--ink)]' : 'bg-[var(--line-strong)]'}`} />
      </div>

      {/* Body Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-[300px]">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
            >
              <div id="question-label" className="text-[18px] sm:text-[22px] font-display font-bold mb-[18px] leading-[1.3]">{STEPS[stepIndex].q}</div>
              <div role="radiogroup" aria-labelledby="question-label" className="flex flex-col gap-[10px]">
                {STEPS[stepIndex].options.map((o) => (
                  <button
                    key={o}
                    role="radio"
                    aria-checked={answers[STEPS[stepIndex].key] === o}
                    onClick={() => handleSelect(STEPS[stepIndex].key, o)}
                    className="text-left bg-transparent border border-[var(--line-strong)] p-[14px_16px] font-sans text-[14px] sm:text-[15px] text-[var(--ink)] cursor-pointer transition-colors duration-250 hover:border-[var(--ink)]"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="text-[22px] font-display font-bold mb-[18px] leading-[1.3]">Here's what we heard.</div>
              <div className="text-[14px] leading-[1.8] text-[var(--ink-soft)]">
                {STEPS.map((s) => (
                  <div key={s.key} className="flex justify-between gap-[10px] py-[10px] border-b border-[var(--line)]">
                    <span>{s.q.replace('?', '')}</span>
                    <strong className="text-[var(--ink)] font-semibold text-right">{answers[s.key] || '—'}</strong>
                  </div>
                ))}
              </div>
              <div className="mt-[26px] flex flex-col gap-[12px]">
                <Btn href={mailtoLink()} variant="filled" className="justify-center">Send this to us →</Btn>
                <div className="flex justify-center mt-[4px]">
                  <LinkArrow href={suggestion.href}>Or browse {suggestion.label} →</LinkArrow>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Footer */}
      <div className="flex justify-between items-center mt-[22px] pt-[18px] border-t border-[var(--line)]">
        <button
          onClick={handleBack}
          className={`bg-transparent border-none font-mono text-[11.5px] text-[var(--ink-soft)] cursor-pointer uppercase tracking-[0.06em] hover:text-[var(--ink)] transition-colors ${stepIndex === 0 ? 'invisible' : 'visible'}`}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
