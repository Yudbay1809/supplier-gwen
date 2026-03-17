"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type DashboardActionCardProps = {
  href: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  variant?: "light" | "dark";
};

export default function DashboardActionCard({
  href,
  label,
  hint,
  icon: Icon,
  variant = "dark",
}: DashboardActionCardProps) {
  const isLight = variant === "light";
  return (
    <Link
      href={href}
      className={
        isLight
          ? "group rounded-[20px] border border-gray-100 bg-[#F7FFFD] p-4 text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_34px_rgba(46,201,183,0.12)]"
          : "group rounded-[20px] border border-white/20 bg-white/10 p-4 text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white/15 hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
      }
    >
      <div
        className={
          isLight
            ? "mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-light transition-transform duration-200 group-hover:scale-105"
            : "mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 transition-transform duration-200 group-hover:scale-105"
        }
      >
        <Icon className={isLight ? "h-5 w-5 text-brand" : "h-5 w-5 text-white"} />
      </div>
      <p className="font-poppins">{label}</p>
      <p className={`mt-1 text-xs font-inter ${isLight ? "text-muted-foreground" : "text-white/80"}`}>
        {hint}
      </p>
      <div className={`mt-3 inline-flex items-center gap-2 text-xs ${isLight ? "text-brand-dark" : ""}`}>
        Buka
        <span aria-hidden="true">-&gt;</span>
      </div>
    </Link>
  );
}
