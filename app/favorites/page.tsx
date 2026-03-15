"use client";

import { useState } from "react";
import { Heart, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import RackCard from "../components/RackCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";
import { racks } from "../data/racks";
import AuthGuard from "../components/AuthGuard";

export default function FavoritesPage() {
  const [favorites] = useState(racks.slice(0, 3));

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
                  <Heart className="h-4 w-4" />
                  Favorit tersimpan
                </div>
                <h1 className="mb-3 text-3xl font-poppins sm:text-4xl">
                  Semua media favoritmu ada di satu tempat.
                </h1>
                <p
                  className="max-w-2xl text-sm leading-7 text-white/80 font-inter sm:text-base"
                >
                  Gunakan halaman ini untuk menyimpan opsi yang paling layak dibandingkan sebelum masuk ke tahap booking atau pitching internal.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
                <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Favorit</p>
                  <p className="mt-2 text-lg font-poppins">
                    {favorites.length} media
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Use case</p>
                  <p className="mt-2 text-lg font-poppins">
                    Launch ready
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Action</p>
                  <p className="mt-2 text-lg font-poppins">
                    Compare fast
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {favorites.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="Belum ada favorit"
              description="Simpan media promosi yang Anda minati untuk akses cepat di kemudian hari"
              actionLabel="Jelajah Media"
              actionHref="/browse"
            />
          ) : (
            <>
              <div className="mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-dark">Siap dibandingkan</p>
                  <h2 className="text-ink font-poppins">Media pilihan kamu</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((rack, index) => (
                  <motion.div
                    key={rack.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <RackCard rack={rack} />
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-xs uppercase tracking-[0.18em] text-brand-dark font-inter">
                      <Sparkles className="h-3.5 w-3.5" />
                      Next step
                    </p>
                    <h3 className="text-ink font-poppins">
                      Lanjutkan dari favorit ke evaluasi detail
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground font-inter">
                      Buka detail tiap media untuk melihat trafik, kesiapan kampanye, dan ringkasan booking sebelum pembayaran.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-brand-soft px-4 py-3 text-sm text-[#0E5E56] font-inter">
                    Favorit membantu tim memilih lebih cepat
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}

