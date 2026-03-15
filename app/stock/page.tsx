"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Boxes, ArrowLeft, RefreshCcw, Search, ShieldCheck, ShieldX, Store, Warehouse } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthGuard from "../components/AuthGuard";
import { stockData, type StockVariant } from "../data/stock";

const statusStyle: Record<StockVariant["status"], { bg: string; text: string }> = {
  Aman: { bg: "bg-brand-soft", text: "text-brand-dark" },
  Menipis: { bg: "bg-gold-soft", text: "text-gold" },
  Habis: { bg: "bg-danger-soft", text: "text-danger" },
};

export default function StockPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState<StockVariant["status"] | "Semua">("Semua");
  const [warehouseFilter, setWarehouseFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState<"qty-asc" | "qty-desc">("qty-asc");

  const filteredBrands = useMemo(() => {
    const brands = brandFilter === "Semua" ? stockData : stockData.filter((item) => item.brand === brandFilter);
    return brands.map((brand) => {
      const variants = brand.variants.filter((variant) => {
        const matchesQuery = `${variant.sku} ${variant.variant} ${variant.warehouse}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesStatus = statusFilter === "Semua" ? true : variant.status === statusFilter;
        const matchesWarehouse = warehouseFilter === "Semua" ? true : variant.warehouse === warehouseFilter;
        return matchesQuery && matchesStatus && matchesWarehouse;
      });
      const sortedVariants = variants.sort((a, b) => {
        if (sortBy === "qty-desc") {
          return b.qty - a.qty;
        }
        return a.qty - b.qty;
      });
      return {
        ...brand,
        variants: sortedVariants,
      };
    });
  }, [query, brandFilter, statusFilter, warehouseFilter, sortBy]);

  const brandOptions = ["Semua", ...stockData.map((item) => item.brand)];
  const warehouseOptions = ["Semua", ...Array.from(new Set(stockData.flatMap((item) => item.variants.map((v) => v.warehouse))))];
  const warehouseStyle: Record<string, { bg: string; text: string }> = {
    "WH Jakarta": { bg: "bg-brand-soft", text: "text-brand-dark" },
    "WH Surabaya": { bg: "bg-teal-soft", text: "text-teal" },
    "WH Bandung": { bg: "bg-gold-soft", text: "text-gold" },
  };
  const highlightText = (text: string, value: string) => {
    if (!value.trim()) {
      return text;
    }
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "ig");
    return text.split(regex).map((part, index) => (
      part.toLowerCase() === value.toLowerCase()
        ? <mark key={`${part}-${index}`} className="rounded bg-[#D7FFF4] px-1 text-ink">{part}</mark>
        : <span key={`${part}-${index}`}>{part}</span>
    ));
  };

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    const brand = searchParams.get("brand") ?? "Semua";
    if (search) {
      setQuery(search);
    }
    if (brandOptions.includes(brand)) {
      setBrandFilter(brand);
    }
  }, [searchParams, brandOptions]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD]">
        <Navbar />

        <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 lg:px-10">
          <div className="mb-6 flex items-center gap-4">
            <Link href="/dashboard" className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
              <ArrowLeft className="h-5 w-5 text-ink" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">
                Stok per brand
              </p>
              <h1 className="font-poppins text-ink">
                Ketersediaan Varian Produk
              </h1>
            </div>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Total brand</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                  <Store className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-poppins text-ink">
                {stockData.length}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#F3FFFC] px-3 py-1 text-xs font-inter text-brand-dark">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Brand aktif
              </span>
            </div>
            <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Total stok</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                  <Boxes className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-poppins text-ink">
                {stockData.reduce((sum, item) => sum + item.total, 0)}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#F3FFFC] px-3 py-1 text-xs font-inter text-brand-dark">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Total qty
              </span>
            </div>
            <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Gudang aktif</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                  <Warehouse className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-poppins text-ink">
                3
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#F3FFFC] px-3 py-1 text-xs font-inter text-brand-dark">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Terhubung
              </span>
            </div>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Status aman</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                  <ShieldCheck className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-poppins text-ink">
                {stockData.reduce((sum, brand) => sum + brand.variants.filter((item) => item.status === "Aman").length, 0)}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-inter text-brand-dark">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Aman
              </span>
            </div>
            <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Status menipis</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-soft text-gold">
                  <Boxes className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-poppins text-ink">
                {stockData.reduce((sum, brand) => sum + brand.variants.filter((item) => item.status === "Menipis").length, 0)}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-xs font-inter text-gold">
                <span className="h-2 w-2 rounded-full bg-gold" />
                Menipis
              </span>
            </div>
            <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Status habis</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-danger-soft text-danger">
                  <ShieldX className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-poppins text-ink">
                {stockData.reduce((sum, brand) => sum + brand.variants.filter((item) => item.status === "Habis").length, 0)}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-danger-soft px-3 py-1 text-xs font-inter text-danger">
                <span className="h-2 w-2 rounded-full bg-danger" />
                Habis
              </span>
            </div>
          </div>

          <div className="mb-6 rounded-[24px] bg-white/90 p-5 shadow-sm overflow-hidden">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:min-w-0">
              <div className="relative w-full min-w-[220px] md:w-[360px] md:flex-none">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari SKU, varian, atau gudang..."
                  className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm font-inter"
                />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pr-8">
                  <select
                    value={brandFilter}
                    onChange={(event) => setBrandFilter(event.target.value)}
                    className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-inter"
                  >
                  {brandOptions.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand === "Semua" ? "Semua brand" : brand}
                    </option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as StockVariant["status"] | "Semua")}
                  className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-inter"
                >
                  <option value="Semua">Semua status</option>
                  <option value="Aman">Aman</option>
                  <option value="Menipis">Menipis</option>
                  <option value="Habis">Habis</option>
                </select>
                <select
                  value={warehouseFilter}
                  onChange={(event) => setWarehouseFilter(event.target.value)}
                  className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-inter"
                >
                  {warehouseOptions.map((warehouse) => (
                    <option key={warehouse} value={warehouse}>
                      {warehouse === "Semua" ? "Semua gudang" : warehouse}
                    </option>
                  ))}
                </select>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as "qty-asc" | "qty-desc")}
                    className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-inter"
                  >
                    <option value="qty-asc">Urutkan: qty terendah</option>
                    <option value="qty-desc">Urutkan: qty tertinggi</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setBrandFilter("Semua");
                      setStatusFilter("Semua");
                      setWarehouseFilter("Semua");
                      setSortBy("qty-asc");
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#CDEEE8] bg-[#F3FFFC] text-brand-dark"
                    aria-label="Reset filter"
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </button>
                </div>
                <span className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white/90 to-transparent" />
                <span className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/90 to-transparent" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {filteredBrands.every((brand) => brand.variants.length === 0) && (
              <div className="rounded-[24px] border border-dashed border-gray-200 bg-white/90 p-8 text-center shadow-sm">
                <p className="text-lg font-poppins text-ink">
                  Tidak ada stok yang cocok dengan filter.
                </p>
                <p className="mt-2 text-sm text-muted-foreground font-inter">
                  Coba ubah kata kunci, status, atau gudang yang dipilih.
                </p>
              </div>
            )}
            {filteredBrands.map((brand) => {
              const brandSource = stockData.find((item) => item.brand === brand.brand) ?? brand;
              const statusCounts = brandSource.variants.reduce(
                (acc, variant) => {
                  acc[variant.status] += 1;
                  return acc;
                },
                { Aman: 0, Menipis: 0, Habis: 0 }
              );
              const totalVariants = statusCounts.Aman + statusCounts.Menipis + statusCounts.Habis || 1;
              return (
              <div key={brand.brand} className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7FBF7]">
                      <Warehouse className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Brand</p>
                      <p className="text-lg font-poppins text-ink">
                        {brand.brand}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {statusCounts.Menipis > 0 && (
                          <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-inter text-gold">
                            Menipis {statusCounts.Menipis}
                          </span>
                        )}
                        {statusCounts.Habis > 0 && (
                          <span className="rounded-full bg-danger-soft px-3 py-1 text-xs font-inter text-danger">
                            Habis {statusCounts.Habis}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#F3FFFC] px-4 py-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Total stok</p>
                    <p className="mt-1 text-lg font-poppins text-ink">
                      {brand.total}
                    </p>
                  </div>
                </div>

                <div className="mb-4 rounded-2xl bg-[#F7FFFD] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-dark font-inter">Distribusi status</p>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
                    <div className="flex h-full">
                      <div
                        className="bg-brand"
                        style={{ width: `${(statusCounts.Aman / totalVariants) * 100}%` }}
                      />
                      <div
                        className="bg-gold"
                        style={{ width: `${(statusCounts.Menipis / totalVariants) * 100}%` }}
                      />
                      <div
                        className="bg-danger"
                        style={{ width: `${(statusCounts.Habis / totalVariants) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground font-inter">
                    <span>Aman {statusCounts.Aman}</span>
                    <span>Menipis {statusCounts.Menipis}</span>
                    <span>Habis {statusCounts.Habis}</span>
                  </div>
                </div>

                <div className="max-h-[260px] overflow-y-auto rounded-2xl border border-gray-100">
                  <div className="sticky top-0 z-10 grid grid-cols-4 gap-3 bg-[#F7FFFD] px-4 py-3 text-xs uppercase tracking-[0.18em] text-brand-dark font-inter">
                    <span>SKU</span>
                    <span>Varian</span>
                    <span>Gudang</span>
                    <span>Status</span>
                  </div>
                  {brand.variants.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-muted-foreground font-inter">
                      Tidak ada varian yang cocok dengan filter ini.
                    </div>
                  ) : (
                    brand.variants.map((variant) => (
                      <Link
                        key={variant.sku}
                        href={`/stock/${variant.sku}`}
                        className="grid grid-cols-4 gap-3 border-t border-gray-100 px-4 py-3 text-sm transition hover:bg-[#F7FFFD]"
                      >
                        <span className="font-inter text-ink">{highlightText(variant.sku, query)}</span>
                        <div>
                          <p className="font-poppins text-ink">{highlightText(variant.variant, query)}</p>
                          <p className="text-xs text-muted-foreground font-inter">
                            Qty {variant.qty}
                          </p>
                        </div>
                        <span
                          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-inter ${
                            warehouseStyle[variant.warehouse]?.bg ?? "bg-[#F3FFFC]"
                          } ${warehouseStyle[variant.warehouse]?.text ?? "text-brand-dark"}`}
                        >
                          {highlightText(variant.warehouse, query)}
                        </span>
                        <span
                          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-inter ${statusStyle[variant.status].bg} ${statusStyle[variant.status].text}`}
                        >
                          {variant.status}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            );
            })}
          </div>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}
