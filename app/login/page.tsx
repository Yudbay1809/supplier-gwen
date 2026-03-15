"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { login } from "../lib/auth";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    login(email);
    const next = searchParams.get("next");
    const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
    router.push(safeNext || "/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F2FFFD] px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1180px] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="rounded-[36px] bg-[linear-gradient(135deg,#2E2330_0%,#0E5E56_55%,#2EC9B7_100%)] p-8 text-white shadow-[0_28px_70px_rgba(111,51,83,0.26)] sm:p-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
            <ShieldCheck className="h-4 w-4" />
            Secure brand login
          </div>

          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/12 backdrop-blur">
            <Sparkles className="h-10 w-10 text-white" />
          </div>

          <h1 className="mb-4 text-4xl leading-tight font-poppins">
            Masuk untuk lanjut kelola kampanye dengan lebih rapi.
          </h1>
          <p className="max-w-xl text-sm leading-7 text-white/80 font-inter sm:text-base">
            Akses dasbor, favorit media, histori booking, dan progres kampanye dalam satu alur yang konsisten.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Kampanye</p>
              <p className="mt-2 text-lg font-poppins">On track</p>
            </div>
            <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Approval</p>
              <p className="mt-2 text-lg font-poppins">&lt; 24 jam</p>
            </div>
            <div className="rounded-[24px] bg-white/10 p-4 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Flow</p>
              <p className="mt-2 text-lg font-poppins">More organized</p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {[
              "Favorit media yang relevan tanpa kehilangan konteks kampanye.",
              "Pantau histori booking dan payment flow dengan lebih jelas.",
              "Lanjut dari browse ke booking tanpa alur yang terasa patah.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/8 p-4">
                <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D8F3EF]" />
                <p className="text-sm text-white/80 font-inter">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="flex items-center"
        >
          <div className="w-full rounded-[36px] border border-white/80 bg-white/92 p-8 shadow-[0_20px_60px_rgba(216,83,130,0.14)] sm:p-10">
            <div className="mb-8">
              <p className="mb-2 text-sm uppercase tracking-[0.2em] text-brand-dark font-inter">
                Welcome back
              </p>
              <h2 className="text-[#2E2330] font-poppins">Login ke akun brand</h2>
              <p className="mt-2 text-sm text-muted-foreground font-inter">
                Gunakan email kerja agar progres booking dan notifikasi kampanye tetap sinkron.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-[#0E5E56] font-inter">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nama@email.com"
                    className="w-full rounded-2xl border border-transparent bg-[#F3FFFC] py-4 pl-12 pr-4 font-inter outline-none transition focus:border-[#9FE7DC] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#0E5E56] font-inter">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-transparent bg-[#F3FFFC] py-4 pl-12 pr-4 font-inter outline-none transition focus:border-[#9FE7DC] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="brand-button inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-poppins"
              >
                Login
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 rounded-[24px] bg-[#F3FFFC] p-4">
              <p className="text-sm text-muted-foreground font-inter">
                Belum punya akun? <span className="text-brand font-poppins">Daftar di sini</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2FFFD]" />}>
      <LoginPageContent />
    </Suspense>
  );
}

