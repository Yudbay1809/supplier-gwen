"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Boxes,
  ChevronRight,
  CreditCard,
  Crown,
  FileText,
  HelpCircle,
  LogOut,
  Mail,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { AUTH_EVENT, getUserEmail, logout } from "../lib/auth";
import AuthGuard from "../components/AuthGuard";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("beautybrand@email.com");
  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    whatsapp: false,
    inApp: true,
  });

  const menuToneClassMap: Record<string, { bg: string; text: string }> = {
    brand: { bg: "bg-brand-light", text: "text-brand" },
    teal: { bg: "bg-teal-soft", text: "text-teal" },
  };

  useEffect(() => {
    const sync = () => {
      const stored = getUserEmail();
      if (stored) {
        setEmail(stored);
      }
    };
    sync();
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const menuGroups = [
    [
      {
        href: "/kontrabon",
        label: "Kontrabon",
        description: "Pantau status kontrabon dan total tagihan bulanan.",
        icon: FileText,
        tone: "brand",
      },
      {
        href: "/stock",
        label: "Stok per Brand",
        description: "Cek stok varian per brand dan gudang.",
        icon: Boxes,
        tone: "teal",
      },
      {
        href: "/history",
        label: "Riwayat Booking",
        description: "Pantau kampanye aktif dan kampanye yang sudah selesai.",
        icon: Package,
        tone: "brand",
      },
      {
        label: "Metode Pembayaran",
        description: "Kelola metode pembayaran yang dipakai tim Anda.",
        icon: CreditCard,
        tone: "teal",
      },
    ],
    [
      {
        href: "/notifications",
        label: "Notifikasi",
        description: "Atur pengingat approval, tayang, dan pembayaran.",
        icon: Bell,
        tone: "brand",
      },
      {
        label: "Bantuan",
        description: "Butuh bantuan? Semua panduan dan kontak ada di sini.",
        icon: HelpCircle,
        tone: "teal",
      },
    ],
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD] pb-24">
        <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-6 sm:px-8 lg:px-[120px]">
          <div className="rounded-[34px] bg-[linear-gradient(135deg,#2E2330_0%,#0E5E56_50%,#2EC9B7_100%)] p-6 text-white shadow-[0_24px_60px_rgba(111,51,83,0.25)] sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1729337531424-198f880cb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHdvbWFuJTIwYXNpYW58ZW58MXx8fHwxNzczMTY3NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile"
                className="h-20 w-20 rounded-[26px] object-cover shadow-lg"
              />

              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/85">
                  <Crown className="h-4 w-4" />
                  Brand account
                </div>
                <h1 className="text-3xl font-poppins">
                  BeautyBrand
                </h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/80 font-inter">
                  <Mail className="h-4 w-4" />
                  {email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Account</p>
                  <p className="mt-2 text-lg font-poppins">
                    Verified
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Kampanye</p>
                  <p className="mt-2 text-lg font-poppins">
                    5 total
                  </p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Tier</p>
                  <p className="mt-2 text-lg font-poppins">
                    Priority
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-[24px] bg-white/10 p-4">
                <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/80">
                  <ShieldCheck className="h-4 w-4" />
                  Safety
                </div>
                <p className="text-sm text-white/75 font-inter">
                  Data akun dan payment flow kamu sudah siap dipakai untuk booking berikutnya.
                </p>
              </div>
              <div className="rounded-[24px] bg-white/10 p-4">
                <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/80">
                  <Sparkles className="h-4 w-4" />
                  Team flow
                </div>
                <p className="text-sm text-white/75 font-inter">
                  Brief desain dan histori kampanye tersimpan lebih rapi untuk tim internal.
                </p>
              </div>
              <div className="rounded-[24px] bg-white/10 p-4">
                <div className="mb-2 inline-flex items-center gap-2 text-sm text-white/80">
                  <Star className="h-4 w-4" />
                  Priority support
                </div>
                <p className="text-sm text-white/75 font-inter">
                  Cocok untuk brand yang sering butuh approval cepat sebelum tayang.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              {menuGroups.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-sm"
                >
                  {group.map((item, itemIndex) => {
                    const Icon = item.icon;
                    const toneClasses = menuToneClassMap[item.tone] ?? menuToneClassMap.brand;
                    const content = (
                      <>
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClasses.bg}`}>
                          <Icon className={`h-5 w-5 ${toneClasses.text}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-ink font-poppins">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground font-inter">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </>
                    );

                    if (item.href) {
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`flex items-center gap-4 p-5 transition-colors hover:bg-[#F3FFFC] ${
                            itemIndex < group.length - 1 ? "border-b border-gray-100" : ""
                          }`}
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={item.label}
                        className={`flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-[#F3FFFC] ${
                          itemIndex < group.length - 1 ? "border-b border-gray-100" : ""
                        }`}
                      >
                        {content}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] bg-white/90 p-6 shadow-sm">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Preferensi notifikasi</p>
                <h3 className="mb-4 text-ink font-poppins">
                  Status booking & approval
                </h3>
                <div className="space-y-3">
                  {[
                    { key: "email", label: "Email", desc: "Update status booking dan approval ke email utama." },
                    { key: "whatsapp", label: "WhatsApp", desc: "Notifikasi cepat untuk perubahan status penting." },
                    { key: "inApp", label: "In-app", desc: "Badge dan notifikasi di dashboard." },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-100 bg-[#F3FFFC] p-4"
                    >
                      <input
                        type="checkbox"
                        checked={notifPrefs[item.key as keyof typeof notifPrefs]}
                        onChange={(event) =>
                          setNotifPrefs((prev) => ({ ...prev, [item.key]: event.target.checked }))
                        }
                        className="mt-1 h-4 w-4 accent-[#2EC9B7]"
                      />
                      <div>
                        <p className="text-ink font-poppins">{item.label}</p>
                        <p className="text-sm text-muted-foreground font-inter">
                          {item.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-white/90 p-6 shadow-sm">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">Account readiness</p>
                <h3 className="mb-5 text-ink font-poppins">
                  Semua hal penting untuk booking berikutnya
                </h3>
                <div className="space-y-3">
                  {[
                    "Email akun sudah tersimpan dan siap dipakai untuk notifikasi kampanye.",
                    "Riwayat booking bisa dipakai ulang untuk evaluasi budget dan lokasi.",
                    "Logout tersedia langsung dari profile saat perlu ganti akun.",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-[#F3FFFC] p-4">
                      <p className="text-sm text-muted-foreground font-inter">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="flex w-full items-center gap-4 rounded-[28px] bg-white p-5 text-left shadow-sm transition-colors hover:bg-[#EAFBF8]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-danger-soft">
                  <LogOut className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-red-500 font-poppins">Keluar dari akun</p>
                  <p className="mt-1 text-sm text-muted-foreground font-inter">
                    Gunakan ini saat ingin berganti akun brand atau menghentikan sesi kerja.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}

