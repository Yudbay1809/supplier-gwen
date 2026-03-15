"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, CheckCircle, Clock, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { racks } from "../../data/racks";
import AuthGuard from "../../components/AuthGuard";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const rack = racks.find((item) => item.id === id);

  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [designFileName, setDesignFileName] = useState("");
  const [brief, setBrief] = useState("");

  if (!rack) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2FFFD]">
        <p className="font-inter text-ink">Media tidak ditemukan</p>
      </div>
    );
  }

  const totalPrice = rack.price * duration;

  const handleCheckout = (event: React.FormEvent) => {
    event.preventDefault();
    const search = new URLSearchParams({
      totalPrice: String(totalPrice),
      duration: String(duration),
      startDate,
      rackName: rack.name,
    });
    router.push(`/payment/${rack.id}?${search.toString()}`);
  };

  const goToPayment = () => {
    const search = new URLSearchParams({
      totalPrice: String(totalPrice),
      duration: String(duration),
      startDate,
      rackName: rack.name,
    });
    router.push(`/payment/${rack.id}?${search.toString()}`);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD] pb-10">
        <div className="mx-auto max-w-[980px] px-4 pt-8 sm:px-8 lg:px-10">
          <div className="mb-6 flex items-center gap-4">
            <Link
              href={`/media/${rack.id}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 text-ink" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">
                Alur booking
              </p>
              <h1 className="text-2xl text-[#2E2330] sm:text-3xl font-poppins">Booking Media</h1>
            </div>
          </div>

          <div className="mb-6 rounded-[32px] bg-[linear-gradient(135deg,#2E2330_0%,#0E5E56_55%,#2EC9B7_100%)] p-6 text-white shadow-[0_24px_60px_rgba(111,51,83,0.25)] sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
                  <ShieldCheck className="h-4 w-4" />
                  Booking dengan brief yang lebih terstruktur
                </div>
                <h2 className="mb-3 text-3xl font-poppins">
                  {rack.name}
                </h2>
                <p className="flex items-center gap-2 text-sm text-white/80 font-inter">
                  <MapPin className="h-4 w-4" />
                  {rack.location}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Kategori</p>
                  <p className="mt-2 text-lg font-poppins">
                    {rack.category}
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Min. durasi</p>
                  <p className="mt-2 text-lg font-poppins">
                    {rack.minDuration || 1} bulan
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Approval target</p>
                  <p className="mt-2 text-lg font-poppins">
                    &lt; 24 jam
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brand" />
                  <h3 className="text-ink font-poppins">Tanggal Mulai</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground font-inter">
                  Pilih kapan kampanye mulai aktif ditampilkan di lokasi ini.
                </p>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-2xl border border-gray-200 bg-[#F3FFFC] px-4 py-3 font-inter outline-none focus:border-[#9FE7DC]"
                  required
                />
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-teal" />
                  <h3 className="text-ink font-poppins">Durasi Sewa</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground font-inter">
                  Semakin panjang durasi, biasanya semakin stabil untuk evaluasi awareness dan performa visual.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDuration(Math.max(1, duration - 1))}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-ink font-poppins"
                  >
                    -
                  </button>
                  <div className="flex-1 rounded-[24px] bg-[#F3FFFC] py-4 text-center">
                    <p className="text-3xl text-[#2E2330] font-poppins">
                      {duration}
                    </p>
                    <p className="text-sm text-muted-foreground font-inter">
                      bulan
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDuration(duration + 1)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2EC9B7] text-white font-poppins"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-ink font-poppins">Yang akan terjadi setelah ini</h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Kamu pilih metode pembayaran yang paling nyaman.",
                    "Setelah pembayaran, kampanye masuk ke tahap verifikasi.",
                    "Tim bisa langsung lanjut upload desain dan briefing materi.",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-[#F3FFFC] p-4">
                      <p className="text-sm text-muted-foreground font-inter">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand" />
                  <h3 className="text-ink font-poppins">Materi & Brief Desain</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground font-inter">
                  Unggah materi desain dan jelaskan brief singkat agar tim bisa menilai kesiapan konten lebih cepat.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-ink font-inter">
                      File desain (PDF/JPG/PNG)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        setDesignFileName(file ? file.name : "");
                      }}
                      className="w-full rounded-2xl border border-gray-200 bg-[#F3FFFC] px-4 py-3 text-sm font-inter"
                    />
                    {designFileName && (
                      <p className="mt-2 text-xs text-muted-foreground font-inter">
                        File terpilih: {designFileName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-ink font-inter">
                      Brief desain
                    </label>
                    <textarea
                      value={brief}
                      onChange={(event) => setBrief(event.target.value)}
                      placeholder="Contoh: Fokus pada display rak A1, highlight hero product, tone premium, target audience wanita 20-35."
                      rows={4}
                      className="w-full rounded-2xl border border-gray-200 bg-[#F3FFFC] px-4 py-3 text-sm font-inter outline-none focus:border-[#9FE7DC]"
                    />
                  </div>
                </div>
              </div>
            </form>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[30px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-brand" />
                  <h3 className="text-ink font-poppins">Ringkasan Harga</h3>
                </div>

                <div className="mb-4 rounded-[24px] bg-[#E7FBF7] p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-brand-dark">Booking untuk</p>
                  <p className="mt-2 text-[#2E2330] font-poppins">
                    {rack.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground font-inter">
                    {rack.location}
                  </p>
                </div>

                <div className="mb-4 space-y-3 border-b border-gray-100 pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-inter">
                      Harga per bulan
                    </span>
                    <span className="text-ink font-inter">
                      Rp{rack.price.toLocaleString("id-ID")}
                    </span>
                  </div>
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
                      Materi desain
                    </span>
                    <span className="text-ink font-inter">
                      {designFileName ? "Terunggah" : "Belum ada"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-inter">
                      Brief
                    </span>
                    <span className="text-ink font-inter">
                      {brief.trim() ? "Terisi" : "Belum ada"}
                    </span>
                  </div>
                </div>

                <div className="mb-5 flex items-center justify-between">
                  <p className="text-ink font-poppins">Total</p>
                  <p className="text-3xl text-brand font-poppins">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={goToPayment}
                  className="brand-button w-full rounded-2xl py-4 font-poppins"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
