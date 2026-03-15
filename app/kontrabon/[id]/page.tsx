import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, Clock3, Download, FileText } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthGuard from "../../components/AuthGuard";
import { kontrabonData, type KontrabonStatus } from "../../data/kontrabon";

const statusStyle: Record<KontrabonStatus, { bg: string; text: string }> = {
  Draft: { bg: "bg-teal-soft", text: "text-teal" },
  Proses: { bg: "bg-gold-soft", text: "text-gold" },
  Approved: { bg: "bg-brand-soft", text: "text-brand-dark" },
  Dibayar: { bg: "bg-brand-light", text: "text-brand" },
};

const timelineSteps: KontrabonStatus[] = ["Draft", "Proses", "Approved", "Dibayar"];
const timelineIconClass = "h-4 w-4";

export default function KontrabonDetailPage({ params }: { params: { id: string } }) {
  const item = kontrabonData.find((entry) => entry.id === params.id);

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
            <Link href="/kontrabon" className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
              <ArrowLeft className="h-5 w-5 text-ink" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">
                Detail Kontrabon
              </p>
              <h1 className="font-poppins text-ink">
                {item ? item.id : "Kontrabon Tidak Ditemukan"}
              </h1>
            </div>
          </motion.div>

          {!item && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-[24px] border border-dashed border-gray-200 bg-white/90 p-8 text-center shadow-sm"
            >
              <p className="text-lg font-poppins text-ink">
                Kontrabon tidak ditemukan.
              </p>
              <p className="mt-2 text-sm text-muted-foreground font-inter">
                Periksa kembali ID kontrabon atau kembali ke daftar.
              </p>
              <Link
                href="/kontrabon"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-inter text-white"
              >
                Kembali ke daftar
              </Link>
            </motion.div>
          )}

          {item && (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="rounded-[24px] bg-white/90 p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Status kontrabon</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
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
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.18em] text-brand-dark">Nilai kontrabon</p>
                    <p className="mt-1 text-2xl font-poppins text-ink">
                      Rp{item.amount.toLocaleString("id-ID")}
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="grid gap-4 md:grid-cols-[1fr_auto]"
              >
                <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Detail ringkas</p>
                  <div className="mt-4 grid gap-4 text-sm text-muted-foreground font-inter sm:grid-cols-2">
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
                  <div className="mt-4">
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-brand-dark">Catatan</span>
                    <p className="mt-1 text-sm text-muted-foreground font-inter">
                      {item.note}
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] bg-white/90 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Aksi cepat</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <Link
                      href={item.fileUrl ?? "#"}
                      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#CDEEE8] px-4 py-2 text-sm font-inter ${
                        item.fileUrl ? "bg-white text-brand-dark" : "bg-gray-100 text-gray-400 pointer-events-none"
                      }`}
                    >
                      <Download className="h-4 w-4" />
                      Unduh PDF
                    </Link>
                    {(item.status === "Draft" || item.status === "Proses") && (
                      <button className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-inter text-white">
                        Ajukan Approval
                      </button>
                    )}
                    <Link
                      href="/kontrabon"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#CDEEE8] bg-white px-4 py-2 text-sm font-inter text-brand-dark"
                    >
                      <FileText className="h-4 w-4" />
                      Lihat daftar kontrabon
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}
