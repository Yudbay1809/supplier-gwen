"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, CheckCircle, Clock, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthGuard from "../components/AuthGuard";
import { mockNotifications, type NotificationItem } from "../data/notifications";

const channelIcon = (channel: NotificationItem["channel"]) => {
  switch (channel) {
    case "email":
      return Mail;
    case "whatsapp":
      return MessageSquare;
    default:
      return Bell;
  }
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [items, setItems] = useState<NotificationItem[]>(() => {
    if (typeof window === "undefined") {
      return mockNotifications;
    }
    try {
      const stored = localStorage.getItem("gwen_notifications");
      const parsed = stored ? (JSON.parse(stored) as NotificationItem[]) : null;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Ignore malformed storage and keep defaults.
    }
    return mockNotifications;
  });

  const toneClassMap: Record<NotificationItem["tone"], { bg: string; text: string }> = {
    brand: { bg: "bg-brand-light", text: "text-brand" },
    gold: { bg: "bg-gold-soft", text: "text-gold" },
    teal: { bg: "bg-teal-soft", text: "text-teal" },
  };

  const targetBadgeClassMap: Record<NonNullable<NotificationItem["targetType"]>, string> = {
    Media: "bg-brand-light text-brand-dark",
    Booking: "bg-gold-soft text-gold",
    Payment: "bg-teal-soft text-teal",
  };

  useEffect(() => {
    localStorage.setItem("gwen_notifications", JSON.stringify(items));
    window.dispatchEvent(new Event("gwen-notifications-updated"));
  }, [items]);

  const filtered = items.filter((item) =>
    filter === "all" ? true : item.status === filter
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD]">
        <Navbar />

        <div className="mx-auto max-w-[980px] px-4 py-8 sm:px-8 lg:px-10">
          <div className="mb-6 flex items-center gap-4">
            <Link href="/profile" className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
              <ArrowLeft className="h-5 w-5 text-ink" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-dark font-inter" >
                Notifikasi
              </p>
              <h1 className="font-poppins text-ink">
                Riwayat In-App
              </h1>
            </div>
          </div>

          <div className="mb-6 rounded-[28px] bg-white/90 p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand" />
                <p className="text-sm text-muted-foreground font-inter">
                  Pantau approval, pembayaran, dan status kampanye dalam satu tempat.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((item) => ({
                        ...item,
                        status: "read",
                      }))
                    )
                  }
                  className="rounded-full border border-[#CDEEE8] bg-white px-4 py-2 text-xs font-inter text-brand-dark"
                >
                  Tandai semua dibaca
                </button>
                <button
                  onClick={() => setItems([])}
                  className="rounded-full border border-[#F0E4EA] bg-white px-4 py-2 text-xs font-inter text-[#9B3B5A]"
                >
                  Hapus semua
                </button>
                {[
                  { id: "all", label: "Semua" },
                  { id: "unread", label: "Belum dibaca" },
                  { id: "read", label: "Sudah dibaca" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id as typeof filter)}
                    className={`rounded-full px-4 py-2 text-xs font-inter ${filter === item.id ? "bg-brand-light text-brand-dark" : "text-ink"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((item) => {
              const Icon = channelIcon(item.channel);
              const toneClasses = toneClassMap[item.tone] ?? toneClassMap.brand;
              const targetBadgeClasses = item.targetType ? targetBadgeClassMap[item.targetType] : "bg-brand-light text-brand-dark";
              return (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${toneClasses.bg}`}
                      >
                        <Icon className={`h-5 w-5 ${toneClasses.text}`} />
                      </div>
                      <div>
                        <p className="font-poppins text-ink">{item.title}</p>
                        {item.targetType && (
                          <span
                            className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-inter ${targetBadgeClasses}`}
                          >
                            {item.targetType}
                          </span>
                        )}
                        <p className="text-sm text-muted-foreground font-inter">
                          {item.detail}
                        </p>
                        {item.href && (
                          <Link
                            href={item.href}
                          className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#CDEEE8] bg-white px-3 py-1 text-[11px] font-inter text-brand-dark"
                        >
                            Open detail
                            <ArrowLeft className="h-3 w-3 rotate-180" />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground font-inter">
                        {item.time}
                      </p>
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <p
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-inter ${item.status === "unread" ? "bg-gold-soft text-gold" : "bg-brand-light text-brand-dark"}`}
                        >
                          {item.status === "unread" ? "Baru" : "Terbaca"}
                          {item.status === "read" && <CheckCircle className="h-3 w-3" />}
                        </p>
                        {item.status === "unread" && (
                          <button
                            onClick={() =>
                              setItems((prev) =>
                                prev.map((entry) =>
                                  entry.id === item.id ? { ...entry, status: "read" } : entry
                                )
                              )
                            }
                            className="rounded-full border border-[#CDEEE8] bg-white px-3 py-1 text-[10px] font-inter text-brand-dark"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-inter">
                    <Clock className="h-3.5 w-3.5" />
                    Status terakhir diperbarui otomatis.
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="rounded-[24px] border border-dashed border-gray-200 bg-white/80 p-8 text-center">
                <p className="font-poppins text-ink">
                  Belum ada notifikasi pada filter ini.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Coba pilih kategori lain untuk melihat riwayat notifikasi.
                </p>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}
