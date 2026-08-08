import React from "react";
import { cn } from "@/utils/cn";
import TechTag from "./TechTag";

type TagRowProps = {
  tags: string[];
  className?: string;
};

export default function TagRow({ tags, className }: TagRowProps) {
  return (
    <div className={cn("flex flex-wrap gap-[8px]", className)}>
      {tags.map((tag, index) => (
        <TechTag key={index} tag={tag} />
      ))}
    </div>
  );
}
