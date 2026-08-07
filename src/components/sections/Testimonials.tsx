"use client";

import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/animations/ScrollReveal";

/**
 * IMPORTANT — read before filling this in:
 * Every `quote` below is a placeholder, written to be obviously a
 * placeholder rather than a plausible-sounding fake review. Do not ship
 * this with invented client names or invented quotes — fabricated
 * testimonials are a real trust problem the moment anyone checks, and on
 * a site whose whole voice is "we don't do the fake agency thing," it's a
 * particularly bad look to get caught doing exactly that.
 *
 * If you don't have real client testimonials yet, better options than
 * faking it:
 *   - Ask 1–2 people you've actually built something for (even informally,
 *     even unpaid/practice work) for two honest sentences.
 *   - Swap this section out for something that doesn't require a third
 *     party's words — e.g. a short "why work with someone starting out"
 *     block, in your own voice, the same way About handles "why the name."
 *   - Just leave this section out of the homepage until you have 1–2 real
 *     ones. A shorter honest homepage beats a longer dishonest one.
 */

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "[Ask a real client/collaborator for 1–2 honest sentences about working with you — what the problem was, what changed]",
    name: "[Real name]",
    role: "[Their actual role / company]",
  },
  {
    quote: "[Second real quote goes here — don't duplicate the tone of the first, use their actual words]",
    name: "[Real name]",
    role: "[Their actual role / company]",
  },
  {
    quote: "[Third, optional — three is a good number for this layout, but two is fine too]",
    name: "[Real name]",
    role: "[Their actual role / company]",
  },
];

export default function Testimonials() {
  return (
    <section className="py-[110px] bg-[var(--paper-deep)] relative overflow-hidden">
      <ScrollReveal variant="up-strong" className="wrap relative z-10">
        <Eyebrow accent>— kind words —</Eyebrow>
        <SectionTitle>People we've built for.</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] mt-[60px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[var(--paper)] border border-[var(--line-strong)] shadow-[0_24px_40px_-24px_rgba(28,23,18,0.3)] motion-safe:animate-[kakemono-sway_6s_ease-in-out_infinite]"
              style={{
                transformOrigin: "top center",
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <div className="h-[10px] bg-[var(--ink)]" />
              <div className="px-[26px] pt-[38px] pb-[30px]">
                <p className="font-serif italic text-[16.5px] leading-[1.75] text-[var(--ink)]">
                  "{t.quote}"
                </p>
                <p className="mt-[22px] font-mono text-[11.5px] tracking-[0.06em] uppercase text-[var(--ink-soft)]">
                  {t.name} — {t.role}
                </p>
              </div>
              <div className="w-[14px] h-[14px] bg-[var(--accent)] rounded-[2px] mx-auto translate-y-[7px] rotate-45" />
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* subtle wave texture, same device used on the original static build's
          testimonials section — keep it faint, it's atmosphere not decoration */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='30'%3E%3Cpath d='M0 30 Q15 0 30 30 Q45 0 60 30' fill='none' stroke='%23CBBE9E' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 30px",
        }}
      />
    </section>
  );
}
