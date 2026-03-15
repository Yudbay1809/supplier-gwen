"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type DashboardActionCardProps = {
  href: string;
  label: string;
  hint: string;
  icon: LucideIcon;
};

export default function DashboardActionCard({ href, label, hint, icon: Icon }: DashboardActionCardProps) {
  return (
    <Link
      href={href}
      className="rounded-[20px] border border-white/20 bg-white/10 p-4 text-white transition hover:bg-white/20"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="font-poppins">{label}</p>
      <p className="mt-1 text-xs text-white/80 font-inter">
        {hint}
      </p>
      <div className="mt-3 inline-flex items-center gap-2 text-xs">
        Buka
        <span aria-hidden="true">-&gt;</span>
      </div>
    </Link>
  );
}
