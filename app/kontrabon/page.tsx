"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Circle,
  Clock3,
  Download,
  FileText,
  Filter,
  RefreshCcw,
  ScrollText,
  Search,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthGuard from "../components/AuthGuard";
import { kontrabonData, type KontrabonStatus } from "../data/kontrabon";

const statusStyle: Record<KontrabonStatus, { bg: string; text: string }> = {
  Draft: { bg: "bg-teal-soft", text: "text-teal" },
  Proses: { bg: "bg-gold-soft", text: "text-gold" },
  Approved: { bg: "bg-brand-soft", text: "text-brand-dark" },
  Dibayar: { bg: "bg-brand-light", text: "text-brand" },
};

function KontrabonPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("search") ?? "");
  const [statusFilter, setStatusFilter] = useState<KontrabonStatus | "Semua">("Semua");
  const [vendorFilter, setVendorFilter] = useState("Semua");
  const [brandFilter, setBrandFilter] = useState("Semua");
  const [periodFilter, setPeriodFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState<"due" | "amount">("due");

  const vendors = useMemo(
    () => ["Semua", ...Array.from(new Set(kontrabonData.map((item) => item.vendor)))],
    []
  );
  const periods = useMemo(
    () => ["Semua", ...Array.from(new Set(kontrabonData.map((item) => item.period)))],
    []
  );
  const brands = useMemo(
    () => ["Semua", ...Array.from(new Set(kontrabonData.map((item) => item.brand)))],
    []
  );

  const filtered = useMemo(() => {
    const filteredItems = kontrabonData.filter((item) => {
      const matchesQuery = `${item.id} ${item.vendor} ${item.brand} ${item.period}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus = statusFilter === "Semua" ? true : item.status === statusFilter;
      const matchesVendor = vendorFilter === "Semua" ? true : item.vendor === vendorFilter;
      const matchesBrand = brandFilter === "Semua" ? true : item.brand === brandFilter;
      const matchesPeriod = periodFilter === "Semua" ? true : item.period === periodFilter;
      return matchesQuery && matchesStatus && matchesVendor && matchesBrand && matchesPeriod;
    });
    return filteredItems.sort((a, b) => {
      if (sortBy === "amount") {
        return b.amount - a.amount;
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [query, statusFilter, vendorFilter, brandFilter, periodFilter, sortBy]);

  const summaryBase = periodFilter === "Semua"
    ? kontrabonData
    : kontrabonData.filter((item) => item.period === periodFilter);
  const pendingItems = summaryBase.filter((item) => item.status === "Draft" || item.status === "Proses");
  const approvedItems = summaryBase.filter((item) => item.status === "Approved");
  const paidItems = summaryBase.filter((item) => item.status === "Dibayar");
  const pendingTotal = pendingItems.reduce((sum, item) => sum + item.amount, 0);
  const approvedTotal = approvedItems.reduce((sum, item) => sum + item.amount, 0);
  const paidTotal = paidItems.reduce((sum, item) => sum + item.amount, 0);

  const timelineSteps: KontrabonStatus[] = ["Draft", "Proses", "Approved", "Dibayar"];
  const timelineIconClass = "h-4 w-4";

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD]">
        <Navbar />

        <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center gap-4"
          >
            <Link href="/dashboard" className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
              <ArrowLeft className="h-5 w-5 text-ink" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">
                Kontrabon
              </p>
              <h1 className="font-poppins text-ink">
                Ringkasan Kontrabon Supplier
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-6 grid gap-4 md:grid-cols-3"
          >
            <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Pending bulan ini</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-danger-soft text-danger">
                  <ScrollText className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-poppins text-ink">
                {pendingItems.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground font-inter">
                Rp{pendingTotal.toLocaleString("id-ID")}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-danger-soft px-3 py-1 text-xs font-inter text-danger">
                <span className="h-2 w-2 rounded-full bg-danger" />
                Draft + Proses
              </span>
            </div>
            <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Approved bulan ini</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-soft text-gold">
                  <BadgeCheck className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-poppins text-ink">
                {approvedItems.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground font-inter">
                Rp{approvedTotal.toLocaleString("id-ID")}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-xs font-inter text-gold">
                <span className="h-2 w-2 rounded-full bg-gold" />
                Approved
              </span>
            </div>
            <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Paid bulan ini</p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                  <BadgeCheck className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-poppins text-ink">
                {paidItems.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground font-inter">
                Rp{paidTotal.toLocaleString("id-ID")}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-inter text-brand-dark">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Paid
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6 rounded-[24px] bg-white/90 p-5 shadow-sm overflow-hidden"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:min-w-0">
              <div className="relative w-full min-w-[220px] md:w-[360px] md:flex-none">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari ID, vendor, brand, periode..."
                  className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm font-inter"
                />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pr-8">
                  <Filter className="h-4 w-4 text-brand" />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as KontrabonStatus | "Semua")}
                  className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-inter"
                >
                  <option value="Semua">Semua status</option>
                  <option value="Draft">Draft</option>
                  <option value="Proses">Proses</option>
                  <option value="Approved">Approved</option>
                  <option value="Dibayar">Dibayar</option>
                </select>
                <select
                  value={vendorFilter}
                  onChange={(event) => setVendorFilter(event.target.value)}
                  className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-inter"
                >
                  {vendors.map((vendor) => (
                    <option key={vendor} value={vendor}>
                      {vendor === "Semua" ? "Semua vendor" : vendor}
                    </option>
                  ))}
                </select>
                <select
                  value={brandFilter}
                  onChange={(event) => setBrandFilter(event.target.value)}
                  className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-inter"
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand === "Semua" ? "Semua brand" : brand}
                    </option>
                  ))}
                </select>
                <select
                  value={periodFilter}
                  onChange={(event) => setPeriodFilter(event.target.value)}
                  className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-inter"
                >
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      {period === "Semua" ? "Semua periode" : period}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as "due" | "amount")}
                  className="h-12 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-inter"
                >
                  <option value="due">Urutkan: due date</option>
                  <option value="amount">Urutkan: nilai terbesar</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setStatusFilter("Semua");
                    setVendorFilter("Semua");
                    setBrandFilter("Semua");
                    setPeriodFilter("Semua");
                    setSortBy("due");
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
          </motion.div>

          <div className="space-y-4">
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-[24px] border border-dashed border-gray-200 bg-white/90 p-8 text-center shadow-sm"
              >
                <p className="text-lg font-poppins text-ink">
                  Tidak ada kontrabon sesuai filter.
                </p>
                <p className="mt-2 text-sm text-muted-foreground font-inter">
                  Coba ubah status, vendor, atau periode yang dipilih.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setStatusFilter("Semua");
                    setVendorFilter("Semua");
                    setBrandFilter("Semua");
                    setPeriodFilter("Semua");
                    setSortBy("due");
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-inter text-white"
                >
                  Reset filter
                </button>
              </motion.div>
            )}
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
                className="rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">ID Kontrabon</p>
                    <p className="mt-1 text-lg font-poppins text-ink">
                      {item.id}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground font-inter">
                      {item.vendor} - {item.brand} - Periode {item.period}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-inter ${statusStyle[item.status].bg} ${statusStyle[item.status].text}`}
                    >
                      {item.status}
                    </span>
                    <p className="text-sm text-muted-foreground font-inter">
                      Jatuh tempo {new Date(item.dueDate).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-[#F6FFFD] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-dark font-inter">Timeline status</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {timelineSteps.map((step) => {
                      const stepIndex = timelineSteps.indexOf(step);
                      const currentIndex = timelineSteps.indexOf(item.status);
                      const isPast = stepIndex < currentIndex;
                      const isCurrent = stepIndex === currentIndex;
                      const icon = isPast
                        ? <CheckCircle2 className={`${timelineIconClass} text-brand`} />
                        : isCurrent
                        ? <Clock3 className={`${timelineIconClass} text-gold`} />
                        : <Circle className={`${timelineIconClass} text-gray-300`} />;
                      return (
                        <div key={step} className="flex items-center gap-2">
                          {icon}
                          <span className="text-xs font-inter text-muted-foreground">{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="rounded-2xl bg-[#F3FFFC] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-brand-dark font-inter">Detail ringkas</p>
                    <div className="mt-3 grid gap-3 text-sm text-muted-foreground font-inter sm:grid-cols-2">
                      <div>
                        <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">Vendor</span>
                        <span>{item.vendor}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">Brand</span>
                        <span>{item.brand}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">Periode</span>
                        <span>{item.period}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">Jatuh tempo</span>
                        <span>{new Date(item.dueDate).toLocaleDateString("id-ID")}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">Catatan</span>
                      <p className="mt-1 text-sm text-muted-foreground font-inter">
                        {item.note}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.18em] text-brand-dark">Nilai kontrabon</p>
                    <p className="mt-1 text-xl font-poppins text-ink">
                      Rp{item.amount.toLocaleString("id-ID")}
                    </p>
                    <div className="mt-3 flex flex-wrap justify-end gap-2">
                      <Link
                        href={item.fileUrl ?? "#"}
                        className={`inline-flex items-center gap-2 rounded-full border border-[#CDEEE8] px-4 py-2 text-xs font-inter ${
                          item.fileUrl ? "bg-white text-brand-dark" : "bg-gray-100 text-gray-400 pointer-events-none"
                        }`}
                      >
                        <Download className="h-4 w-4" />
                        Unduh PDF
                      </Link>
                      {(item.status === "Draft" || item.status === "Proses") && (
                        <button className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-inter text-white">
                          Ajukan Approval
                        </button>
                      )}
                      <Link
                        href={`/kontrabon/${item.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#CDEEE8] bg-white px-4 py-2 text-xs font-inter text-brand-dark"
                      >
                        <FileText className="h-4 w-4" />
                        Lihat detail
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}

export default function KontrabonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2FFFD]" />}>
      <KontrabonPageContent />
    </Suspense>
  );
}
