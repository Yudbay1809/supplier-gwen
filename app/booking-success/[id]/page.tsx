"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Home, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AuthGuard from "../../components/AuthGuard";

function BookingSuccessPageContent() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("paymentMethod") || "Transfer Bank";
  const totalPrice = Number(searchParams.get("totalPrice") || 0);
  const rackName = searchParams.get("rackName") || "Media";

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD] px-4 py-10">
        <div className="mx-auto max-w-[920px]">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="rounded-[36px] bg-[linear-gradient(135deg,#2E2330_0%,#0E5E56_55%,#2EC9B7_100%)] p-8 text-white shadow-[0_28px_70px_rgba(111,51,83,0.24)] sm:p-10"
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
                className="flex h-28 w-28 items-center justify-center rounded-full bg-white/12 backdrop-blur"
              >
                <CheckCircle2 className="h-16 w-16 text-[#7EE7D6]" />
              </motion.div>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
                <ShieldCheck className="h-4 w-4" />
                Pembayaran terkonfirmasi
              </div>
              <h1 className="mb-3 text-3xl sm:text-4xl font-poppins">
                Booking Berhasil!
              </h1>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-white/80 sm:text-base font-inter">
                Pembayaran berhasil diproses. Booking kamu sekarang masuk ke tahap verifikasi dan tim bisa melanjutkan materi kampanye dengan lebih cepat.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Media</p>
                <p className="mt-2 text-lg font-poppins">
                  {rackName}
                </p>
              </div>
              <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Metode</p>
                <p className="mt-2 text-lg font-poppins">
                  {paymentMethod}
                </p>
              </div>
              <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Total</p>
                <p className="mt-2 text-lg font-poppins">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]"
          >
            <div className="rounded-[30px] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand" />
                <h3 className="text-ink font-poppins">
                  Berikutnya apa?
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  "Booking akan direview untuk memastikan slot dan materi sesuai.",
                  "Tim kamu bisa lanjut memantau status di riwayat booking.",
                  "Jika perlu, kampanye berikutnya bisa disusun dari dasbor atau favorit.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-[#F3FFFC] p-4">
                    <p className="text-sm text-muted-foreground font-inter">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-teal" />
                <h3 className="text-ink font-poppins">
                  Detail Pembayaran
                </h3>
              </div>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-inter">
                    Media
                  </span>
                  <span className="text-sm text-ink font-inter">
                    {rackName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-inter">
                    Metode Pembayaran
                  </span>
                  <span className="text-sm text-ink font-inter">
                    {paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-3">
                  <span className="text-ink font-poppins">Total</span>
                  <span className="text-brand font-poppins">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/history"
                  className="brand-button flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-poppins"
                >
                  Lihat Riwayat Booking
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-4 text-ink font-poppins"
                >
                  <Home className="h-5 w-5" />
                  Kembali ke Dasbor
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2FFFD]" />}>
      <BookingSuccessPageContent />
    </Suspense>
  );
}
