"use client";

import Link from "next/link";

type AlertItemProps = {
  title: string;
  action: string;
  href: string;
  tone: string;
};

export default function AlertItem({ title, action, href, tone }: AlertItemProps) {
  const toneClassMap: Record<string, string> = {
    brand: "bg-brand-soft text-brand",
    gold: "bg-gold-soft text-gold",
    teal: "bg-teal-soft text-teal",
  };

  const toneClasses = toneClassMap[tone] ?? "bg-brand-soft text-brand";

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#F3FFFC] p-4">
      <div>
        <p className="font-poppins text-ink">{title}</p>
        <p className="text-xs text-muted-foreground font-inter">
          Prioritas tinggi
        </p>
      </div>
      <Link
        href={href}
        className={`rounded-full px-3 py-2 text-xs ${toneClasses}`}
      >
        {action}
      </Link>
    </div>
  );
}
