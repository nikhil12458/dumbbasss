"use client";

import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/animations/ScrollReveal";

type FaqItem = { q: string; a: string };

/**
 * These are genuinely fine to write yourself — unlike testimonials, an FAQ
 * is your own claims about your own business, not a fabricated third
 * party. Write real answers to what people actually ask you (check your
 * consultation/email threads for the real questions before inventing
 * ones). The five below are reasonable defaults but swap in your own.
 */
const faqs: FaqItem[] = [
  {
    q: "How much does a project usually cost?",
    a: "[Give a real range if you have one — even a rough 'most sites run ₹X–₹Y, most systems run ₹A–₹B' is more useful to a visitor than nothing, and filters out mismatched budgets before they book a call.]",
  },
  {
    q: "How long does a typical project take?",
    a: "[You already answer this per-project on case study pages — pull the pattern out here as a general range, e.g. '2–6 weeks depending on scope.']",
  },
  {
    q: "Do you work with clients outside India?",
    a: "[Answer honestly — this affects time zones, payment methods, and expectations, worth being upfront.]",
  },
  {
    q: "What do you need from me to get started?",
    a: "[Content? Brand assets? A rough idea is enough? Set expectations so the first call isn't spent explaining what you need.]",
  },
  {
    q: "What if I'm not sure what I need yet?",
    a: "That's what the consultation flow is for — five short questions, no pressure, and it'll point you somewhere even if 'somewhere' is just a clearer conversation.",
  },
];

export default function Faq() {
  return (
    <section className="py-[110px] border-t border-[var(--line)]">
      <ScrollReveal variant="up-strong" className="wrap">
        <Eyebrow accent>— before you ask —</Eyebrow>
        <SectionTitle>Questions people actually have.</SectionTitle>

        <div className="max-w-[820px] mt-[50px]">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="group border-b border-[var(--line)] py-[22px]"
            >
              <summary className="flex items-center justify-between gap-[20px] cursor-pointer list-none font-display font-semibold text-[17px] text-[var(--ink)]">
                {item.q}
                <span className="font-mono text-[20px] text-[var(--accent)] transition-transform duration-300 group-open:rotate-45 flex-none">
                  +
                </span>
              </summary>
              <p className="mt-[16px] text-[15px] leading-[1.75] text-[var(--ink-soft)] max-w-[65ch]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
