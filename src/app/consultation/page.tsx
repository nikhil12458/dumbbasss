import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Link from "next/link";
import ConsultFlow from "@/components/consultation/ConsultFlow";

export default function Consultation() {
  return (
    <main className="max-w-[640px] mx-auto px-[var(--gutter)] py-[90px] pb-[140px]">
      <div className="text-center mb-[56px]">
        <ScrollReveal>
          <Eyebrow accent className="justify-center">— consultation —</Eyebrow>
          <h1 className="font-display font-bold text-[clamp(30px,4.4vw,44px)] leading-[1.08] tracking-[-0.01em] mt-[16px]">
            Let's figure out what you actually need.
          </h1>
          <p className="mt-[16px] text-[var(--ink-soft)] text-[15px] leading-[1.7] max-w-[46ch] mx-auto">
            Five short questions. No pricing tiers, no pressure — just enough to point you at the right place, or to have a real conversation ready to go.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="border border-[var(--line-strong)] p-[40px_36px]">
        <ConsultFlow />
      </ScrollReveal>

      <p className="text-center mt-[30px] font-mono text-[11.5px] text-[var(--ink-faint)]">
        prefer to just talk? <a href="mailto:hello@dumbbasss.studio" className="text-[var(--ink-soft)] border-b border-[var(--line-strong)] pb-px">email us directly</a>
      </p>
    </main>
  );
}
