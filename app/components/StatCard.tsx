"use client";

import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: string;
};

export default function StatCard({ label, value, icon: Icon, tone }: StatCardProps) {
  const toneClassMap: Record<string, { bg: string; text: string }> = {
    brand: { bg: "bg-brand-light", text: "text-brand" },
    teal: { bg: "bg-teal-soft", text: "text-teal" },
    success: { bg: "bg-emerald-50", text: "text-emerald-500" },
    gold: { bg: "bg-gold-soft", text: "text-gold" },
    muted: { bg: "bg-gray-100", text: "text-gray-400" },
  };

  const toneClasses = toneClassMap[tone] ?? toneClassMap.brand;

  return (
    <div className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses.bg}`}>
          <Icon className={`h-6 w-6 ${toneClasses.text}`} />
        </div>
        <span className={`text-2xl font-poppins ${toneClasses.text}`}>
          {value}
        </span>
      </div>
      <p className="text-sm text-muted-foreground font-inter">
        {label}
      </p>
    </div>
  );
}
