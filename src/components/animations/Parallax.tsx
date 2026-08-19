"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type UseScrollOptions,
} from "framer-motion";

type ScrollOffset = NonNullable<UseScrollOptions["offset"]>[number];

export default function Parallax({
  children,
  offset = 50,
  className = "",
  startScroll = "start end",
  endScroll = "end start",
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  startScroll?: ScrollOffset;
  endScroll?: ScrollOffset;
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [startScroll, endScroll],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
