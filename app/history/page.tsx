"use client";

import { useState } from "react";
import { Calendar, Clock, Download, Package, ShieldCheck, TrendingUp } from "lucide-react";
import { mockBookings } from "../data/racks";
import { ImageWithFallback } from "../components/ImageWithFallback";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";
import { motion } from "framer-motion";
import AuthGuard from "../components/AuthGuard";

export default function BookingHistoryPage() {
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "cancelled">("all");

  const filteredBookings =
    filter === "all" ? mockBookings : mockBookings.filter((booking) => booking.status === filter);

  const filterOptions = [
    { value: "all", label: "Semua" },
    { value: "active", label: "Aktif" },
    { value: "completed", label: "Selesai" },
    { value: "cancelled", label: "Dibatalkan" },
  ] as const;

  const statusClassMap: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-600",
    completed: "bg-gray-200 text-gray-500",
    cancelled: "bg-red-100 text-red-500",
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD]">
        <Navbar />

        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-[120px]">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 rounded-[34px] bg-[linear-gradient(135deg,#2E2330_0%,#0E5E56_55%,#2EC9B7_100%)] p-6 text-white shadow-[0_24px_60px_rgba(111,51,83,0.25)] sm:p-8"
          >
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
                  <Package className="h-4 w-4" />
                  Arsip booking
                </div>
                <h1 className="mb-3 text-3xl font-poppins sm:text-4xl">
                  Riwayat booking kampanye kamu
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-white/80 font-inter sm:text-base">
                  Gunakan halaman ini untuk memantau kampanye aktif, mengecek histori budget, dan melihat pola lokasi yang paling layak diulang.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Total booking</p>
                  <p className="mt-2 text-lg font-poppins">
                    {mockBookings.length}
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Status aktif</p>
                  <p className="mt-2 text-lg font-poppins">
                    {mockBookings.filter((item) => item.status === "active").length}
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Spent</p>
                  <p className="mt-2 text-lg font-poppins">
                    Rp2.5M
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`rounded-full px-5 py-2.5 text-sm font-inter transition-all ${filter === option.value ? "bg-brand text-white" : "border border-gray-200 bg-white text-ink"}`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>

          {filteredBookings.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Tidak ada booking"
              description="Anda belum memiliki booking dengan status ini"
              actionLabel="Jelajah Media"
              actionHref="/browse"
            />
          ) : (
            <div className="space-y-5">
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <ImageWithFallback
                      src={booking.rackImage}
                      alt={booking.rackName}
                      className="h-40 w-full rounded-[24px] object-cover lg:h-36 lg:w-40"
                    />
                    <div className="flex-1">
                      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="mb-1 text-ink font-poppins">
                            {booking.rackName}
                          </h3>
                          <p className="text-sm text-muted-foreground font-inter">
                            ID: {booking.id}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-4 py-2 text-sm font-inter ${statusClassMap[booking.status] ?? "bg-gray-200 text-gray-500"}`}
                        >
                          {booking.status === "active"
                            ? "Aktif"
                            : booking.status === "completed"
                            ? "Selesai"
                            : "Dibatalkan"}
                        </span>
                      </div>

                      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl bg-[#F3FFFC] p-4">
                          <div className="mb-2 flex items-center gap-2 text-brand-dark">
                            <Calendar className="h-4 w-4" />
                            <span className="text-[11px] uppercase tracking-[0.18em] font-inter">
                              Mulai
                            </span>
                          </div>
                          <p className="text-[#2E2330] font-poppins">
                            {new Date(booking.startDate).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-[#F3FFFC] p-4">
                          <div className="mb-2 flex items-center gap-2 text-[#6D54D9]">
                            <Clock className="h-4 w-4" />
                            <span className="text-[11px] uppercase tracking-[0.18em] font-inter">
                              Durasi
                            </span>
                          </div>
                          <p className="text-[#2E2330] font-poppins">
                            {booking.duration} bulan
                          </p>
                        </div>
                        <div className="rounded-2xl bg-[#F3FFFC] p-4">
                          <div className="mb-2 flex items-center gap-2 text-[#12945A]">
                            <ShieldCheck className="h-4 w-4" />
                            <span className="text-[11px] uppercase tracking-[0.18em] font-inter">
                              Metode
                            </span>
                          </div>
                          <p className="text-[#2E2330] font-poppins">
                            {booking.paymentMethod}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-[#E7FBF7] p-4">
                          <div className="mb-2 flex items-center gap-2 text-brand-dark">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-[11px] uppercase tracking-[0.18em] font-inter">
                              Budget
                            </span>
                          </div>
                          <p className="text-[#2E2330] font-poppins">
                            Rp{booking.totalPrice.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          className="brand-button rounded-2xl px-4 py-3 text-sm font-poppins"
                        >
                          Lihat Detail
                        </button>
                        <button
                          className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink font-inter"
                        >
                          <Download className="h-4 w-4" />
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}

