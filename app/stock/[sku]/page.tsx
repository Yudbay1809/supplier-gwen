"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Package } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthGuard from "../../components/AuthGuard";
import { stockData, type StockVariant } from "../../data/stock";

const statusStyle: Record<StockVariant["status"], { bg: string; text: string }> = {
  Aman: { bg: "bg-brand-soft", text: "text-brand-dark" },
  Menipis: { bg: "bg-gold-soft", text: "text-gold" },
  Habis: { bg: "bg-danger-soft", text: "text-danger" },
};

export default function StockDetailPage({ params }: { params: { sku: string } }) {
  const variants = stockData.flatMap((brand) =>
    brand.variants.map((variant) => ({
      ...variant,
      brand: brand.brand,
    }))
  );
  const item = variants.find((variant) => variant.sku === params.sku);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!item) return;
    await navigator.clipboard.writeText(item.sku);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD]">
        <Navbar />

        <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 lg:px-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Link href="/stock" className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                <ArrowLeft className="h-5 w-5 text-ink" />
              </Link>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">
                  Detail Stok
                </p>
                <h1 className="font-poppins text-ink">
                  {item ? item.sku : "SKU Tidak Ditemukan"}
                </h1>
              </div>
            </div>
            <div className="text-sm text-muted-foreground font-inter">
              <Link href="/dashboard" className="hover:text-brand-dark">Dashboard</Link>
              <span className="px-2">/</span>
              <Link href="/stock" className="hover:text-brand-dark">Stok</Link>
              <span className="px-2">/</span>
              <span className="text-ink">{item ? item.sku : "Detail"}</span>
            </div>
          </div>

          {!item && (
            <div className="rounded-[24px] border border-dashed border-gray-200 bg-white/90 p-8 text-center shadow-sm">
              <p className="text-lg font-poppins text-ink">
                SKU tidak ditemukan.
              </p>
              <p className="mt-2 text-sm text-muted-foreground font-inter">
                Periksa kembali kode SKU atau kembali ke daftar.
              </p>
              <Link
                href="/stock"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-inter text-white"
              >
                Kembali ke stok
              </Link>
            </div>
          )}

          {item && (
            <div className="grid gap-6 md:grid-cols-[1fr_auto]">
              <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7FBF7]">
                    <Package className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Varian</p>
                    <p className="text-xl font-poppins text-ink">{item.variant}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-full border border-[#CDEEE8] bg-white px-4 py-2 text-xs font-inter text-brand-dark"
                  >
                    {copied ? "Tersalin" : "Copy SKU"}
                  </button>
                </div>

                <div className="mt-4 grid gap-4 text-sm text-muted-foreground font-inter sm:grid-cols-2">
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">Brand</span>
                    <span>{item.brand}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">SKU</span>
                    <span>{item.sku}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">Gudang</span>
                    <span>{item.warehouse}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">Status</span>
                    <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-inter ${statusStyle[item.status].bg} ${statusStyle[item.status].text}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Ringkasan stok</p>
                <p className="mt-3 text-3xl font-poppins text-ink">{item.qty}</p>
                <p className="mt-1 text-sm text-muted-foreground font-inter">Jumlah stok tersedia saat ini.</p>
                <Link
                  href="/stock"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#CDEEE8] bg-white px-4 py-2 text-sm font-inter text-brand-dark"
                >
                  Lihat daftar stok
                </Link>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}
