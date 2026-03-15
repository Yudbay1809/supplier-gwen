"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SearchResultItemProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  href: string;
};

export default function SearchResultItem({ title, subtitle, href }: SearchResultItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 rounded-2xl bg-[#F3FFFC] p-4 transition hover:bg-[#E7FBF7]"
    >
      <div>
        <p className="font-poppins text-ink">{title}</p>
        <p className="text-xs text-muted-foreground font-inter">
          {subtitle}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 text-[#1C8F84]" />
    </Link>
  );
}
