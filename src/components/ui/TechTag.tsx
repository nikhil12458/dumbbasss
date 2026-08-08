import {
  SiKotlin, SiReact, SiNodedotjs, SiMongodb, SiTypescript,
  SiExpress, SiFastapi, SiSocketdotio, SiWhatsapp,
} from "react-icons/si";
import type { IconType } from "react-icons";

// Only real, recognizable brands get a logo — everything else (design
// system, copywriting, custom physics) stays text-only on purpose.
// Verify these export names against your installed react-icons version
// at simpleicons.org before shipping — icon naming shifts between versions.
const ICON_MAP: Record<string, IconType> = {
  "Kotlin": SiKotlin,
  "React": SiReact,
  "Node.js": SiNodedotjs,
  "MongoDB": SiMongodb,
  "TypeScript": SiTypescript,
  "Express": SiExpress,
  "FastAPI": SiFastapi,
  "Socket.IO": SiSocketdotio,
  "WhatsApp API": SiWhatsapp,
};

export default function TechTag({ tag }: { tag: string }) {
  const Icon = ICON_MAP[tag];
  return (
    <span className="inline-flex items-center gap-[6px] font-mono text-[11px] tracking-[0.04em] border border-[var(--line-strong)] py-[5px] px-[10px] text-[var(--ink-soft)]">
      {Icon && <Icon size={12} className="text-[var(--ink-faint)]" />}
      {tag}
    </span>
  );
}
