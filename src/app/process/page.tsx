import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Btn from "@/components/ui/Btn";
import Magnetic from "@/components/animations/Magnetic";
import SectionDivider from "@/components/ui/SectionDivider";
import ProcessSteps from "@/components/sections/ProcessSteps";

export const metadata = {
  title: "Process",
  description: "How we work at dumbbasss.",
  openGraph: {
    title: "Process | dumbbasss",
    description: "How we work at dumbbasss.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Process | dumbbasss",
    description: "How we work at dumbbasss.",
  },
};

export default function Process() {
  return (
    <>
      <section className="wrap py-[80px] pb-[90px] max-w-[760px] mx-auto text-left">
        <ScrollReveal>
          <Eyebrow accent>— process —</Eyebrow>
          <h1 className="font-display font-bold text-[clamp(36px,6vw,64px)] leading-[1.08] tracking-[-0.01em]">
            Six steps. Drawn out<br />like a blueprint, not a pitch.
          </h1>
          <p className="section-lede mt-[22px] max-w-[520px]" data-cursor="text">
            No phase names invented to sound impressive. Just the actual sequence, in order, with what to expect at each one.
          </p>
        </ScrollReveal>
      </section>

      <SectionDivider />

      <ProcessSteps />

      <SectionDivider />

      <section className="pb-[130px] text-center">
        <ScrollReveal className="wrap">
          <Eyebrow accent className="justify-center">— ready when you are —</Eyebrow>
          <h2 className="font-display font-bold text-[clamp(26px,3.6vw,40px)] leading-[1.08] tracking-[-0.01em] max-w-[640px] mx-auto mb-[30px]">
            Six steps is the whole process. No hidden seventh phase.
          </h2>
          <Magnetic>
            <Btn href="/consultation" variant="filled" data-cursor="button">Start a consultation</Btn>
          </Magnetic>
        </ScrollReveal>
      </section>
    </>
  );
}
