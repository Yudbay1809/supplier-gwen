"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F2FFFD]"
      >
        <Icon className="h-10 w-10 text-brand" />
      </div>
      <h3 className="mb-2 text-center text-ink font-poppins">
        {title}
      </h3>
      <p
        className="mb-6 max-w-md text-center text-sm text-muted-foreground font-inter"
      >
        {description}
      </p>
      {actionLabel ? (
        actionHref ? (
          <Link
            href={actionHref}
            className="brand-button rounded-lg px-6 py-3 font-inter"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="brand-button rounded-lg px-6 py-3 font-inter"
          >
            {actionLabel}
          </button>
        )
      ) : null}
    </div>
  );
}

