import { services } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Btn from "@/components/ui/Btn";
import SectionTitle from "@/components/ui/SectionTitle";
import { WebsiteIcon, SoftwareIcon, AiIcon, BusinessSystemsIcon, GrowthIcon } from "@/components/icons/ServiceIcons";
import { Check } from "lucide-react";

const getServiceIcon = (slug: string) => {
  switch (slug) {
    case "websites": return <WebsiteIcon />;
    case "software": return <SoftwareIcon />;
    case "ai": return <AiIcon />;
    case "business-systems": return <BusinessSystemsIcon />;
    case "growth": return <GrowthIcon />;
    default: return null;
  }
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = services.find((s) => s.slug === params.slug);
  
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: service.title,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | dumbbasss`,
      description: service.shortDesc,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | dumbbasss`,
      description: service.shortDesc,
    },
  };
}

export default async function ServiceDetail(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <div className="wrap">
        <Link href="/services" className="detail-back">← Back to services</Link>
      </div>

      <section className="wrap py-[26px] pb-[70px]">
        <ScrollReveal>
          <Eyebrow accent>— service {service.index} · 05 —</Eyebrow>
          <h1 className="poster-title text-[clamp(44px,8vw,100px)] leading-[0.94] flex items-center gap-[24px]">
            <span className="text-[var(--ink-faint)] [&>svg]:w-[1em] [&>svg]:h-[1em]">
              {getServiceIcon(service.slug)}
            </span>
            {service.title}
          </h1>
          <p className="mt-[24px] max-w-[600px] text-[16.5px] text-[var(--ink-soft)] leading-[1.75]">
            {service.detail.heroLede}
          </p>
        </ScrollReveal>
      </section>

      <section className="wrap py-[70px] border-t border-[var(--line)]">
        <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-[50px]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-faint)] mb-[14px]">What this is</div>
            <p className="text-[15.5px] leading-[1.8] font-light whitespace-pre-wrap">{service.detail.whatIsIt}</p>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-faint)] mb-[14px]">Who it's for</div>
            <p className="text-[15.5px] leading-[1.8] font-light whitespace-pre-wrap">{service.detail.whoIsItFor}</p>
          </div>
        </ScrollReveal>
      </section>

      <section className="wrap py-[70px] border-t border-[var(--line)]">
        <ScrollReveal>
          <Eyebrow>— what's included —</Eyebrow>
          <SectionTitle>Everything from layout to launch.</SectionTitle>
          <div className="mt-[30px] grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[var(--line)] border border-[var(--line)]">
            {service.detail.included.map((item, i) => (
              <div key={i} className="bg-[var(--paper)] p-[22px_24px] text-[14.5px] text-[var(--ink)] flex gap-[14px] items-start">
                <span className="text-[var(--accent)] shrink-0 pt-[2px]">
                  <Check size={16} strokeWidth={1.5} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="wrap py-[70px] border-t border-[var(--line)]">
        <ScrollReveal>
          <Eyebrow>— how it works —</Eyebrow>
          <SectionTitle>Same six steps as everything else here.</SectionTitle>
          <Link href="/process" className="mt-[36px] flex items-center gap-0 group max-w-[560px]">
            {["Consult", "Scope", "Design", "Build", "Refine", "Launch"].map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-[8px] flex-1">
                  <div className="w-[8px] h-[8px] rounded-full border-[1.5px] border-[var(--ink-faint)] group-hover:border-[var(--accent)] transition-colors" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-[var(--ink-faint)]">{step}</span>
                </div>
                {i < 5 && <div className="h-px flex-1 bg-[var(--line)] -mt-[16px]" />}
              </div>
            ))}
          </Link>
        </ScrollReveal>
      </section>

      {service.detail.extraSection && (
        <section className="wrap py-[70px] border-t border-[var(--line)]">
          <ScrollReveal>
            <Eyebrow>{service.detail.extraSection.title}</Eyebrow>
            <SectionTitle>{service.detail.extraSection.desc}</SectionTitle>
            <div className="mt-[30px] grid grid-cols-1 sm:grid-cols-2 bg-[var(--line)] border border-[var(--line)] gap-[1px]">
              {service.detail.extraSection.items.map((item, i) => (
                <div key={i} className="bg-[var(--paper)] p-[22px_24px] text-[14.5px] text-[var(--ink)] flex gap-[12px] items-center">
                  {item}
                </div>
              ))}
            </div>
            {service.detail.extraSection.footer && (
              <p className="mt-[30px] text-[15px] text-[var(--ink-soft)] font-light italic">
                {service.detail.extraSection.footer}
              </p>
            )}
          </ScrollReveal>
        </section>
      )}

      {service.detail.outcomes.length > 0 && (
        <section className="wrap py-[70px] border-t border-[var(--line)]">
          <ScrollReveal>
            <Eyebrow>— seen in the wild —</Eyebrow>
            <div className="mt-[30px] flex gap-[20px] flex-wrap">
              {service.detail.outcomes.map((out, i) => (
                <Link key={i} href={out.link} className="flex-1 min-w-[220px] border border-[var(--line-strong)] p-[18px_20px] text-[14px] hover:border-[var(--ink)] transition-colors">
                  <span className="font-mono text-[10px] uppercase text-[var(--ink-faint)] block mb-[6px] tracking-[0.1em]">{out.label}</span>
                  {out.title}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {service.detail.nextService && (
        <section className="wrap proj-next">
          <ScrollReveal className="w-full flex justify-between items-center gap-[20px] flex-wrap">
            <div>
              <span className="label">Next service</span>
              <h3>{service.detail.nextService.title}</h3>
            </div>
            <Btn href={`/services/${service.detail.nextService.slug}`}>See service →</Btn>
          </ScrollReveal>
        </section>
      )}
    </>
  );
}
