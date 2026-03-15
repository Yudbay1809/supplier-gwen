"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Rack } from "../data/racks";
import { ImageWithFallback } from "./ImageWithFallback";

interface RackCardProps {
  rack: Rack;
}

export default function RackCard({ rack }: RackCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link
      href={`/media/${rack.id}`}
      className="surface-card relative block overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(216,83,130,0.16)]"
    >
      <button
        onClick={(event) => {
          event.preventDefault();
          setIsFavorite((value) => !value);
        }}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
        aria-label="Toggle favorite"
      >
        <Heart
          className="h-5 w-5 text-brand"
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>

      <div className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={rack.image}
          alt={rack.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span
            className="pill-badge bg-brand-light px-3 py-1 text-xs text-brand-dark font-inter"
          >
            {rack.category}
          </span>
          <span
            className="pill-badge bg-teal-soft px-3 py-1 text-xs text-[#6D54D9] font-inter"
          >
            Min. {rack.minDuration || 1} bulan
          </span>
        </div>
        <h3 className="mb-1 text-ink font-poppins">
          {rack.name}
        </h3>
        <p
          className="mb-2 text-sm text-muted-foreground font-inter"
        >
          {rack.location}
        </p>
        <div className="mb-2 flex items-center gap-1">
          <Star className="h-4 w-4 text-[#D4A84A]" fill="currentColor" />
          <span className="text-sm text-ink font-inter">
            {rack.rating} ({rack.reviewCount})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg text-brand font-poppins">
            Rp{rack.price.toLocaleString("id-ID")}
          </span>
          <span
            className="pill-badge bg-brand-light px-3 py-1 text-xs text-[#12945A] font-inter"
          >
            Traffic tinggi
          </span>
        </div>
      </div>
    </Link>
  );
}

