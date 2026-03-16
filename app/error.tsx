"use client";

import Link from "next/link";
import { useEffect } from "react";
import { logError } from "./lib/monitoring";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    logError(error, "app-error");
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F2FFFD] px-4 py-10">
      <div className="mx-auto max-w-[720px] rounded-[28px] border border-white/80 bg-white/90 p-8 text-center shadow-sm">
        <h1 className="text-2xl font-poppins text-ink">Terjadi kesalahan</h1>
        <p className="mt-2 text-sm text-muted-foreground font-inter">
          Maaf, sistem sedang mengalami kendala. Silakan coba lagi.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="brand-button rounded-full px-4 py-2 text-sm font-inter"
          >
            Coba lagi
          </button>
          <Link
            href="/dashboard"
            className="rounded-full border border-[#CDEEE8] bg-white px-4 py-2 text-sm font-inter text-brand-dark"
          >
            Kembali ke dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
