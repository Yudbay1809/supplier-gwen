"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2200);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F2FFFD] px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,229,0.9),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(243,222,255,0.82),transparent_26%),linear-gradient(135deg,#2E2330_0%,#0E5E56_54%,#2EC9B7_100%)]" />
      <div className="absolute -left-10 top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-10 bottom-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

      <div className="relative text-center text-white">
        <motion.div
          initial={{ scale: 0.78, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-[32px] bg-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
            <ShieldCheck className="h-4 w-4" />
            Platform kampanye
          </p>
          <h1 className="mb-2 text-4xl font-poppins sm:text-5xl">
            Supplier Gwen
          </h1>
          <p className="mx-auto max-w-md text-sm leading-7 text-white/80 font-inter sm:text-base">
            Menyiapkan alur booking media promosi yang lebih rapi, cepat, dan siap dipakai tim brand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex justify-center"
        >
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/20">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full w-full rounded-full bg-white"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

