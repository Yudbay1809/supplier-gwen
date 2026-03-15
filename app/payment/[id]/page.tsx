"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Building2, CheckCircle, CreditCard, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import AuthGuard from "../../components/AuthGuard";

function PaymentPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const totalPrice = Number(searchParams.get("totalPrice") || 0);
  const duration = Number(searchParams.get("duration") || 0);
  const rackName = searchParams.get("rackName") || "Media";
  const startDate = searchParams.get("startDate") || "-";

  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const paymentMethods = [
    { id: "bank", name: "Transfer Bank", icon: Building2, options: ["BCA", "Mandiri", "BNI", "BRI"], hint: "Cocok untuk tim finance dan approval internal." },
    { id: "ewallet", name: "E-Wallet", icon: Smartphone, options: ["GoPay", "OVO", "Dana", "ShopeePay"], hint: "Paling cepat untuk checkout dari mobile." },
    { id: "credit", name: "Kartu Kredit/Debit", icon: CreditCard, options: ["Visa", "Mastercard"], hint: "Ringkas untuk transaksi langsung tanpa transfer manual." },
    { id: "retail", name: "Retail", icon: Wallet, options: ["Indomaret", "Alfamart"], hint: "Alternatif saat tim membutuhkan pembayaran offline." },
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      return;
    }

    const next = new URLSearchParams({
      paymentMethod: selectedMethod,
      totalPrice: String(totalPrice),
      rackName,
    });
    router.push(`/booking-success/${id}?${next.toString()}`);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD] pb-10">
        <div className="mx-auto max-w-[980px] px-4 pt-8 sm:px-8 lg:px-10">
          <div className="mb-6 flex items-center gap-4">
            <Link
              href={`/booking/${id}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 text-ink" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">
                Langkah pembayaran
              </p>
              <h1 className="text-2xl text-[#2E2330] sm:text-3xl font-poppins">Pembayaran</h1>
            </div>
          </div>

          <div className="mb-6 rounded-[32px] bg-[linear-gradient(135deg,#2E2330_0%,#0E5E56_55%,#2EC9B7_100%)] p-6 text-white shadow-[0_24px_60px_rgba(111,51,83,0.25)] sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
                  <ShieldCheck className="h-4 w-4" />
                  Pembayaran aman dan ringkas
                </div>
                <h2 className="mb-3 text-3xl font-poppins">
                  Satu langkah lagi menuju kampanye aktif.
                </h2>
                <p className="text-sm leading-7 text-white/80 font-inter">
                  Pilih metode pembayaran yang paling nyaman untuk tim kamu. Setelah transaksi selesai, booking akan langsung masuk ke tahap verifikasi.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Booking</p>
                  <p className="mt-2 text-lg font-poppins">
                    {rackName}
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Durasi</p>
                  <p className="mt-2 text-lg font-poppins">
                    {duration} bulan
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Total</p>
                  <p className="mt-2 text-lg font-poppins">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-4">
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-brand" />
                  <h3 className="text-ink font-poppins">Pilih Metode Pembayaran</h3>
                </div>

                <div className="space-y-3">
                  {paymentMethods.map((method, index) => {
                    const Icon = method.icon;
                    const selected = selectedMethod === method.name;
                    const buttonClass = selected
                      ? "border-2 border-[#2EC9B7] bg-[#E7FBF7]"
                      : "border border-[#F0E4EA] bg-[#F3FFFC]";
                    const iconWrapClass = selected ? "bg-[#D7F4EF]" : "bg-white";
                    const iconClass = selected ? "text-brand" : "text-muted-foreground";
                    return (
                      <motion.button
                        key={method.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        onClick={() => setSelectedMethod(method.name)}
                        className={`flex w-full items-start gap-4 rounded-[24px] p-4 text-left transition-all ${buttonClass}`}
                      >
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${iconWrapClass}`}
                        >
                          <Icon className={`h-6 w-6 ${iconClass}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-ink font-poppins">{method.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground font-inter">
                            {method.options.join(", ")}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground font-inter">
                            {method.hint}
                          </p>
                        </div>
                        {selected && <CheckCircle className="mt-1 h-5 w-5 text-brand" />}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[30px] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-ink font-poppins">
                  Ringkasan Pembayaran
                </h3>

                <div className="mb-4 rounded-[24px] bg-[#E7FBF7] p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-brand-dark">Booking kampanye</p>
                  <p className="mt-2 text-[#2E2330] font-poppins">
                    {rackName}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground font-inter">
                    Mulai {startDate}
                  </p>
                </div>

                <div className="mb-4 space-y-3 border-b border-gray-100 pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-inter">
                      Durasi
                    </span>
                    <span className="text-ink font-inter">
                      {duration} bulan
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-inter">
                      Metode
                    </span>
                    <span className="text-ink font-inter">
                      {selectedMethod || "Pilih di samping"}
                    </span>
                  </div>
                </div>

                <div className="mb-5 flex items-center justify-between">
                  <span className="text-ink font-poppins">Total Bayar</span>
                  <span className="text-3xl text-brand font-poppins">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="mb-5 rounded-[24px] bg-brand-light p-4">
                  <p className="text-sm text-success-dark font-poppins">
                    Setelah pembayaran berhasil, booking langsung masuk tahap verifikasi.
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  className={`w-full rounded-2xl py-4 text-white shadow-[0_16px_36px_rgba(255,107,154,0.28)] font-poppins ${selectedMethod ? "brand-button" : "bg-[#D8C5CE]"}`}
                  disabled={!selectedMethod}
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2FFFD]" />}>
      <PaymentPageContent />
    </Suspense>
  );
}
