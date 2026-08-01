import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Btn from "@/components/ui/Btn";

export const metadata = {
  title: "Process | dumbbasss",
  description: "How we work at dumbbasss.",
};

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Consultation",
      desc: "A short, direct conversation — what you're building, who it's for, and what \"done\" actually looks like.",
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

  return (
    <>
      <section className="wrap py-[80px] pb-[90px] max-w-[760px] mx-auto text-left">
        <ScrollReveal>
          <Eyebrow accent>— process —</Eyebrow>
          <h1 className="font-display font-bold text-[clamp(36px,6vw,64px)] leading-[1.08] tracking-[-0.01em]">
            Six steps. Drawn out<br />like a blueprint, not a pitch.
          </h1>
          <p className="section-lede mt-[22px] max-w-[520px]">
            No phase names invented to sound impressive. Just the actual sequence, in order, with what to expect at each one.
          </p>
        </ScrollReveal>
      </section>

      <section className="wrap pb-[120px] relative">
        {/* The vertical line */}
        <div className="absolute left-[calc(var(--gutter)+15px)] md:left-[calc(var(--gutter)+47px)] top-0 bottom-[80px] w-[1px] bg-[var(--line-strong)]"></div>
        
        {steps.map((step, i) => (
          <div key={i} className={`relative grid grid-cols-[40px_1fr] md:grid-cols-[96px_1fr_220px] gap-[32px] pt-[46px] pb-[46px] items-start ${i === 0 ? 'pt-0' : ''}`}>
            <ScrollReveal className="contents">
              <div className="relative z-10">
                <span className="font-mono text-[13px] text-[var(--ink)]">{step.num}</span>
                <div className={`absolute left-[15px] md:left-[47px] top-[8px] w-[10px] h-[10px] rounded-full border-[1.5px] -translate-x-1/2 transition-colors ${i === 0 ? 'bg-[var(--accent)] border-[var(--accent)]' : 'bg-[var(--paper)] border-[var(--ink)]'}`}></div>
              </div>
              <div>
                <h2 className="font-display text-[26px] font-bold tracking-[-0.01em] mb-[10px]">{step.title}</h2>
                <p className="text-[15px] text-[var(--ink-soft)] leading-[1.75] max-w-[48ch]">{step.desc}</p>
              </div>
              <div className="col-span-full md:col-span-1 font-mono text-[11.5px] text-[var(--ink-faint)] leading-[1.7] pt-[14px] md:pt-[6px] border-t md:border-t-0 md:border-l border-dashed border-[var(--line-strong)] mt-[6px] md:mt-0 md:pl-[18px]">
                <span className="text-[var(--ink-soft)] block mb-[2px] uppercase tracking-[0.06em] text-[10px]">Output</span>
                {step.output}
              </div>
            </ScrollReveal>
          </div>
        ))}
      </section>

      <section className="pb-[130px] text-center">
        <ScrollReveal className="wrap">
          <Eyebrow accent className="justify-center">— ready when you are —</Eyebrow>
          <h2 className="font-display font-bold text-[clamp(26px,3.6vw,40px)] leading-[1.08] tracking-[-0.01em] max-w-[640px] mx-auto mb-[30px]">
            Six steps is the whole process. No hidden seventh phase.
          </h2>
          <Btn href="/consultation" variant="filled">Start a consultation</Btn>
        </ScrollReveal>
      </section>
    </>
  );
}
