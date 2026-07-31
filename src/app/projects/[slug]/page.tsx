import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import TagRow from "@/components/ui/TagRow";
import Btn from "@/components/ui/Btn";

// Generate static params for all project slugs
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: project.title,
    description: project.context,
    openGraph: {
      title: `${project.title} | dumbbasss`,
      description: project.context,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | dumbbasss`,
      description: project.context,
    },
  };
}

export default async function ProjectDetail(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <div className="wrap">
        <Link href="/projects" className="detail-back">← Back to archive</Link>
      </div>

      <section className="wrap py-[20px] pb-[70px]">
        <ScrollReveal>
          <Eyebrow accent>— project {project.index} · systems map —</Eyebrow>
          <h1 className="poster-title text-[clamp(44px,8vw,110px)] leading-[0.95] whitespace-pre-line" dangerouslySetInnerHTML={{ __html: project.title.replace(' ', '<br/>') }}></h1>
          <p className="mt-[26px] max-w-[640px] text-[17px] text-[var(--ink-soft)] leading-[1.75]">{project.context}</p>
          <TagRow tags={project.tags} className="mt-[26px]" />
        </ScrollReveal>
      </section>

      <section className="wrap">
        <ScrollReveal>
          <div className="proj-meta">
            <div><span className="k">Category</span><span className="v">{project.meta.category}</span></div>
            <div><span className="k">Role</span><span className="v">{project.meta.role}</span></div>
            <div><span className="k">Timeline</span><span className="v">{project.meta.timeline}</span></div>
            <div><span className="k">Outcome</span><span className="v">{project.meta.outcome}</span></div>
          </div>
        </ScrollReveal>
      </section>

      {project.systemMap && (
        <section className="wrap py-[70px] pb-[100px] border-t border-[var(--line)]">
          <ScrollReveal>
            <Eyebrow>— the system —</Eyebrow>
            <h2 className="section-title">{project.systemMap.title}</h2>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-[26px] mt-[50px] pt-[40px] before:hidden md:before:block before:absolute before:top-[14px] before:left-[16.5%] before:right-[16.5%] before:h-[1px] before:bg-[var(--line-strong)]">
              {project.systemMap.nodes.map((node, i) => (
                <div key={i} className="border border-[var(--line-strong)] p-[28px_22px] relative bg-[var(--paper)] before:content-[''] before:absolute before:-top-[27px] before:left-1/2 before:-translate-x-1/2 before:w-[9px] before:h-[9px] before:rounded-full before:bg-[var(--paper)] before:border-[1.5px] before:border-[var(--ink)]">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--accent)]">{node.tag}</span>
                  <h3 className="text-[19px] m-[14px_0_10px]">{node.title}</h3>
                  <p className="text-[13.5px] text-[var(--ink-soft)] leading-[1.65]">{node.desc}</p>
                  <ul className="m-[14px_0_0] pl-[16px] text-[12.5px] text-[var(--ink-soft)] leading-[1.8] list-disc marker:text-[var(--ink-faint)]">
                    {node.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {project.narrative.map((narr, i) => (
        <section key={i} className={`wrap py-[90px] grid grid-cols-1 md:grid-cols-[0.4fr_1fr] gap-[50px] ${i > 0 || !project.systemMap ? 'border-t border-[var(--line)]' : ''}`}>
          <ScrollReveal className="contents">
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">{narr.label}</div>
            <div>
              {narr.content.map((p, j) => (
                <p key={j} className={`text-[17px] leading-[1.8] text-[var(--ink)] max-w-[60ch] font-light ${j > 0 ? 'mt-[20px]' : ''}`}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
        </section>
      ))}

      {project.nextProject && (
        <section className="wrap proj-next">
          <ScrollReveal className="w-full flex justify-between items-center gap-[20px] flex-wrap">
            <div>
              <span className="label">Next project</span>
              <h3>{project.nextProject.title}</h3>
            </div>
            <Btn href={`/projects/${project.nextProject.slug}`}>View case →</Btn>
          </ScrollReveal>
        </section>
      )}
    </>
  );
}
