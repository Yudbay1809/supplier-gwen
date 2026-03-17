"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Download,
  LayoutDashboard,
  LineChart,
  MapPin,
  ArrowRight,
  Rocket,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import RackCard from "../components/RackCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { racks, mockBookings } from "../data/racks";
import DashboardActionCard from "../components/DashboardActionCard";
import DashboardNotificationItem from "../components/DashboardNotificationItem";
import StatCard from "../components/StatCard";
import AlertItem from "../components/AlertItem";
import SearchResultItem from "../components/SearchResultItem";
import {
  campaignTimeline,
  activityFeed,
  alerts,
  dashboardNotifications,
  trendData,
  trendLabels,
  stockTrendData,
  stockTrendLabels,
  stockCriticalItems,
  quickActions,
  statCards,
  insightCards,
} from "../data/dashboard";
import { buildDashboardSearchResults, highlightText } from "../lib/dashboardSearch";
import { quickActionIconMap, statIconMap, timelineIconMap } from "../lib/iconMap";
import { ImageWithFallback } from "../components/ImageWithFallback";
import AuthGuard from "../components/AuthGuard";
import PageMotion from "../components/PageMotion";
import { supplierProfiles } from "../data/supplier";
import InstallHint from "../components/InstallHint";

export default function DashboardPage() {
  const supplier = supplierProfiles[0];
  const featuredRacks = racks.slice(0, 3);
  const recentBookings = mockBookings.slice(0, 2);
  const activeSpotlight = featuredRacks[0];
  const activeCount = mockBookings.filter((booking) => booking.status === "active").length;
  const totalBookings = mockBookings.length;
  const totalSpent = mockBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const [period, setPeriod] = useState("Bulan ini");
  const [activeTrendIndex, setActiveTrendIndex] = useState<number | null>(null);
  const [activeStockTrendIndex, setActiveStockTrendIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [welcomeText, setWelcomeText] = useState("");

  const statValues: Record<string, string> = {
    "Promosi Aktif": String(activeCount),
    "Total Booking": String(totalBookings),
    "Total Belanja": `Rp${totalSpent.toLocaleString("id-ID")}`,
  };

  const timelineToneClassMap: Record<string, { bg: string; text: string }> = {
    success: { bg: "bg-emerald-50", text: "text-emerald-500" },
    brand: { bg: "bg-brand-light", text: "text-brand" },
    muted: { bg: "bg-gray-100", text: "text-gray-400" },
    teal: { bg: "bg-teal-soft", text: "text-teal" },
    gold: { bg: "bg-gold-soft", text: "text-gold" },
  };


  const searchResults = useMemo(() => buildDashboardSearchResults(searchQuery, racks), [searchQuery]);

  useEffect(() => {
    const fullText = "Selamat datang kembali, BeautyBrand.";
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setWelcomeText(fullText.slice(0, index));
      if (index >= fullText.length) {
        window.clearInterval(interval);
      }
    }, 35);
    return () => window.clearInterval(interval);
  }, []);

  const renderHighlight = (text: string) => {
    const highlight = highlightText(text, searchQuery);
    if (typeof highlight === "string") return highlight;
    return (
      <span>
        {highlight.before}
        <span className="rounded-sm bg-gold-soft px-1 text-gold">
          {highlight.match}
        </span>
        {highlight.after}
      </span>
    );
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD]">
        <Navbar />

        <PageMotion>
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-[120px]">
          <InstallHint />
          <div className="sticky top-20 z-40 mb-8 rounded-[24px] border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">Pencarian global</p>
                <h3 className="font-poppins text-ink">
                  Cari SKU, kontrabon, atau brand
                </h3>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-2 md:justify-end">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Contoh: KB-2403-001, Gwen, GW-LIP-01"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm font-inter"
                  />
                </div>
                {["Bulan ini", "3 bulan", "12 bulan", "Custom"].map((label) => (
                  <button
                    key={label}
                    onClick={() => setPeriod(label)}
                    className={`filter-pill rounded-full border px-3 py-2 text-xs font-inter transition-transform duration-200 hover:-translate-y-0.5 ${period === label ? "bg-brand-light text-brand-dark border-[#CDEEE8]" : "bg-white text-[#0E5E56] border-[#F0F0F0]"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {(searchResults.length > 0 || searchQuery.trim()) && (
            <div className="mb-8 rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-sm">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-brand-dark">Hasil pencarian</p>
              {searchResults.length === 0 ? (
                <div className="rounded-2xl bg-[#F7FFFD] p-6 text-center">
                  <p className="font-poppins text-ink">Tidak ditemukan</p>
                  <p className="mt-2 text-sm text-muted-foreground font-inter">
                    Coba kata kunci lain, SKU, atau ID kontrabon.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((item) => (
                    <SearchResultItem
                      key={`${item.href}-${item.id}`}
                      href={item.href}
                      title={renderHighlight(item.title)}
                      subtitle={renderHighlight(item.subtitle)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 rounded-[34px] bg-[linear-gradient(135deg,#2E2330_0%,#0E5E56_50%,#2EC9B7_100%)] p-6 text-white shadow-[0_26px_70px_rgba(111,51,83,0.24)] sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard supplier
                </div>
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-inter">
                  <span className="badge badge-brand">Brand fokus: {supplier.brandFocus}</span>
                  {supplier.warehouses.map((warehouse) => (
                    <span key={warehouse} className="badge badge-teal">
                      {warehouse}
                    </span>
                  ))}
                </div>
                <h1 className="mb-3 text-3xl font-poppins sm:text-4xl">
                  {welcomeText}
                  <span className="inline-block w-[6px] animate-pulse text-white/80">|</span>
                </h1>
                <p
                  className="max-w-2xl text-sm font-inter leading-7 text-white/80 sm:text-base"
                >
                  Pilih alur utama yang ingin kamu kerjakan hari ini: kontrabon, stok per brand, atau promosi Gwen.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {quickActions.map((item) => (
                    <DashboardActionCard
                      key={item.label}
                      href={item.href}
                      label={item.label}
                      hint={item.hint}
                      icon={quickActionIconMap[item.icon as keyof typeof quickActionIconMap]}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-white/10 p-5 backdrop-blur">
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/65">Sorotan promosi</p>
                <h3 className="text-2xl font-poppins">
                  {activeSpotlight.name}
                </h3>
                <p
                  className="mt-2 flex items-center gap-2 text-sm font-inter text-white/80"
                >
                  <MapPin className="h-4 w-4" />
                  {activeSpotlight.location}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Eksposur</p>
                    <p className="mt-2 text-lg font-poppins">
                      450K / bulan
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Status</p>
                    <p className="mt-2 text-lg font-poppins">
                      Sesuai rencana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ x: (index - 1.5) * 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <StatCard
                  label={stat.label}
                  value={statValues[stat.label]}
                  icon={statIconMap[stat.icon as keyof typeof statIconMap]}
                  tone={stat.tone}
                />
              </motion.div>
            ))}
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">Ringkasan supplier</p>
                  <h3 className="font-poppins text-ink">Kontrabon & stok</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-3 py-2 text-xs text-brand-dark font-inter">
                  <Calendar className="h-3.5 w-3.5" />
                  Bulan ini
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#F3FFFC] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-dark">Kontrabon pending</p>
                  <p className="mt-2 text-2xl font-poppins text-ink">2</p>
                </div>
                <div className="rounded-2xl bg-[#FFF6E6] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">Total tagihan</p>
                  <p className="mt-2 text-2xl font-poppins text-ink">Rp43,3M</p>
                </div>
                <div className="rounded-2xl bg-[#E7FBF7] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-dark">Varian menipis</p>
                  <p className="mt-2 text-2xl font-poppins text-ink">3</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">Alert tindakan cepat</p>
                  <h3 className="font-poppins text-ink">Perlu ditangani</h3>
                </div>
                <Link href="/notifications" className="text-xs font-inter text-brand-dark">
                  Lihat semua
                </Link>
              </div>
              <div className="space-y-3">
                {alerts.map((item) => (
                  <AlertItem
                    key={item.title}
                    title={item.title}
                    action={item.action}
                    href={item.href}
                    tone={item.tone}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="grid gap-4">
              {insightCards.map((item, index) => {
                const toneClasses: Record<string, string> = {
                  danger: "badge badge-danger",
                  gold: "badge badge-gold",
                  brand: "badge badge-brand",
                };
                return (
                  <motion.div
                    key={item.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    className="rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-sm"
                  >
                    <div className={toneClasses[item.tone]}>
                      {item.title}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground font-inter">{item.detail}</p>
                    <Link href={item.href} className="mt-4 inline-flex text-sm font-inter text-brand">
                      {item.action}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">Aktivitas terbaru</p>
                  <h3 className="font-poppins text-ink">Timeline aktivitas</h3>
                </div>
                <Link href="/notifications" className="text-xs font-inter text-brand-dark">
                  Lihat detail
                </Link>
              </div>
              <div className="space-y-4">
                {activityFeed.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-[#F3FFFC] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-poppins text-ink">{item.title}</p>
                      <span className="text-xs text-muted-foreground font-inter">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground font-inter">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">Alert stok kritis</p>
                  <h3 className="font-poppins text-ink">Top 3 varian menipis</h3>
                </div>
                <Link href="/stock" className="text-xs font-inter text-brand-dark">
                  Lihat semua
                </Link>
              </div>
              <div className="space-y-3">
                {stockCriticalItems.map((item) => {
                  const statusClass =
                    item.status === "Habis"
                      ? "bg-danger-soft text-danger"
                      : "bg-gold-soft text-gold";
                  const brandToneClassMap: Record<string, string> = {
                    brand: "bg-brand text-white",
                    indigo: "bg-[#6D54D9] text-white",
                    deep: "bg-[#0E5E56] text-white",
                  };
                  const brandToneClass = brandToneClassMap[item.brandTone] ?? "bg-brand text-white";

                  return (
                    <Link
                      key={item.sku}
                      href={item.href}
                      className="block rounded-2xl bg-[#F3FFFC] p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_34px_rgba(46,201,183,0.14)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {item.logoSrc ? (
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                              <ImageWithFallback
                                src={item.logoSrc}
                                alt={item.brand}
                                className="h-8 w-8 rounded-full object-contain"
                              />
                            </div>
                          ) : (
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-poppins shadow-sm ${brandToneClass}`}
                            >
                              {item.brandInitials}
                            </div>
                          )}
                          <div>
                            <p className="font-poppins text-ink">{item.name}</p>
                            <p className="text-xs text-muted-foreground font-inter">
                              {item.brand} - {item.sku} - {item.warehouse}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`rounded-full px-3 py-1 text-[10px] font-inter ${statusClass}`}>
                            {item.status}
                          </span>
                          <span className="rounded-full bg-teal-soft px-3 py-1 text-xs text-teal font-inter">
                            {item.stock} pcs
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">Insight singkat</p>
                  <h3 className="font-poppins text-ink">Trend stok per bulan</h3>
                </div>
                <TrendingUp className="h-5 w-5 text-brand" />
              </div>
              <div className="rounded-2xl bg-[#F7FFFD] p-4">
                <div className="relative h-28 w-full">
                  <svg viewBox="0 0 320 120" className="h-full w-full">
                    <defs>
                      <linearGradient id="stockStroke" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#2EC9B7" />
                        <stop offset="100%" stopColor="#2E9AA2" />
                      </linearGradient>
                      <linearGradient id="stockFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(46,201,183,0.3)" />
                        <stop offset="100%" stopColor="rgba(46,201,183,0)" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="url(#stockStroke)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="chart-line"
                      points={stockTrendData
                        .map((value, index) => {
                          const x = (index / (stockTrendData.length - 1)) * 300 + 10;
                          const y = 110 - (value / 80) * 90;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />
                    {stockTrendData.map((value, index) => {
                      const x = (index / (stockTrendData.length - 1)) * 300 + 10;
                      const y = 110 - (value / 80) * 90;
                      return (
                        <circle
                          key={`stock-${index}`}
                          cx={x}
                          cy={y}
                          r={activeStockTrendIndex === index ? 5 : 3}
                          className="fill-brand"
                          onMouseEnter={() => setActiveStockTrendIndex(index)}
                          onMouseLeave={() => setActiveStockTrendIndex(null)}
                        />
                      );
                    })}
                    {activeStockTrendIndex !== null && (
                      <g>
                        <rect x="190" y="6" width="115" height="40" rx="10" fill="#ffffff" stroke="#E5E7EB" />
                        <text x="200" y="28" fontSize="10" fill="#0E5E56">
                          {stockTrendLabels[activeStockTrendIndex]}: {stockTrendData[activeStockTrendIndex]}
                        </text>
                      </g>
                    )}
                    <polygon
                      fill="url(#stockFill)"
                      className="chart-fill"
                      points={[
                        ...stockTrendData.map((value, index) => {
                          const x = (index / (stockTrendData.length - 1)) * 300 + 10;
                          const y = 110 - (value / 80) * 90;
                          return `${x},${y}`;
                        }),
                        "310,110",
                        "10,110",
                      ].join(" ")}
                    />
                  </svg>
                </div>
                <div className="mt-3 flex justify-between text-xs text-muted-foreground font-inter">
                  {stockTrendLabels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">Export</p>
                <h3 className="font-poppins text-ink">Unduh laporan</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-[#CDEEE8] bg-white px-4 py-2 text-xs font-inter text-brand-dark"
                >
                  <Download className="h-4 w-4" />
                  Export Kontrabon (CSV)
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-[#CDEEE8] bg-white px-4 py-2 text-xs font-inter text-brand-dark"
                >
                  <Download className="h-4 w-4" />
                  Export Stok (CSV)
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-[#CDEEE8] bg-white px-4 py-2 text-xs font-inter text-brand-dark"
                >
                  <Download className="h-4 w-4" />
                  Export Promosi (PDF)
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-[30px] bg-white p-6 shadow-sm lg:col-span-2"
          >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-dark">Linimasa kampanye</p>
                  <h3 className="font-poppins text-ink">
                    Progres kampanye aktif
                  </h3>
                </div>
                <span
                  className="rounded-full bg-[#E6FBF8] px-4 py-2 text-sm font-inter text-[#12945A]"
                >
                  75% siap tayang
                </span>
              </div>
                <div className="space-y-6">
                  {campaignTimeline.map((item, index) => {
                    const Icon = timelineIconMap[item.icon as keyof typeof timelineIconMap];
                    const toneClasses = timelineToneClassMap[item.tone] ?? timelineToneClassMap.brand;
                    return (
                    <div key={item.title} className="flex gap-4">
                      <div className="relative">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-full ${toneClasses.bg}`}
                          >
                            <Icon className={`h-5 w-5 ${toneClasses.text}`} />
                          </div>
                          {index < campaignTimeline.length - 1 && (
                            <div
                              className="absolute left-[21px] top-11 h-11 w-0.5 bg-gray-200"
                            />
                          )}
                      </div>
                      <div className="flex-1 rounded-3xl bg-[#F3FFFC] p-4">
                        <div className="mb-1 flex items-center justify-between gap-4">
                          <h4 className="font-poppins text-ink">
                            {item.title}
                          </h4>
                          <span
                            className="text-xs text-muted-foreground font-inter"
                          >
                            {item.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground font-inter">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="rounded-[30px] bg-white p-6 shadow-sm"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-dark">Ringkasan</p>
              <h3 className="mb-6 font-poppins text-ink">
                Notifikasi & catatan
              </h3>

              <div className="rounded-[24px] bg-[#2E2330] p-5 text-white">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/75">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Catatan tim
                </div>
                <p className="text-lg font-poppins">
                  Brief desain paling cepat lolos saat format headline, CTA, dan ukuran file sudah konsisten.
                </p>
              </div>

              <div className="mt-6 rounded-[24px] border border-gray-100 bg-white p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-brand-dark">Notifikasi</p>
                <div className="space-y-3">
                  {dashboardNotifications.map((item) => (
                    <DashboardNotificationItem
                      key={item.title}
                      title={item.title}
                      detail={item.detail}
                      time={item.time}
                      tone={item.tone}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-dark">Aktivitas terbaru</p>
                <h3 className="font-poppins text-ink">
                  Booking terbaru
                </h3>
              </div>
              <Link
                href="/history"
                className="text-sm font-inter text-brand"
              >
                Lihat semua
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex gap-4 rounded-[28px] border border-white/80 bg-white/90 p-4 shadow-sm"
                >
                  <ImageWithFallback
                    src={booking.rackImage}
                    alt={booking.rackName}
                    className="h-24 w-24 rounded-[22px] object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-poppins text-ink">
                      {booking.rackName}
                    </h4>
                    <p className="mb-3 text-sm text-muted-foreground font-inter">
                      {new Date(booking.startDate).toLocaleDateString("id-ID")} - {booking.duration} bulan
                    </p>
                      <div className="mb-3 grid grid-cols-2 gap-2">
                        <div className="rounded-2xl bg-brand-light p-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-brand-dark">Status</p>
                          <p className="mt-1 text-sm font-poppins text-ink">
                            {booking.status === "active" ? "Aktif" : "Selesai"}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-brand-light p-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#12945A]">Budget</p>
                          <p className="mt-1 text-sm font-poppins text-ink">
                            Rp{booking.totalPrice.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${booking.status === "active" ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-500"}`}
                      >
                        {booking.status === "active" ? "Aktif" : "Selesai"}
                      </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div>
            <div className="mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">Rekomendasi berikutnya</p>
                <h3 className="font-poppins text-ink">
                  Media Rekomendasi
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredRacks.map((rack, index) => (
                <motion.div
                  key={rack.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <RackCard rack={rack} />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#E7FBF7] px-4 py-2 text-xs uppercase tracking-[0.18em] text-brand-dark">
                  <Rocket className="h-3.5 w-3.5" />
                  Langkah berikutnya
                </p>
                <h4 className="font-poppins text-ink">
                  Mau tambah channel exposure untuk kampanye berikutnya?
                </h4>
                <p className="mt-2 text-sm text-muted-foreground font-inter">
                  Telusuri media lain yang punya trafik tinggi dan brief desain yang lebih mudah diadaptasi.
                </p>
              </div>
                <Link
                  href="/browse"
                  className="brand-button inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-inter"
                >
                  Lihat Semua Media
                  <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
          </div>
        </div>
        </PageMotion>

        <Footer />
      </div>
    </AuthGuard>
  );
}

