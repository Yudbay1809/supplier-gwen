"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Heart,
  MapPin,
  Rocket,
  Ruler,
  Star,
  TrendingUp,
  Upload,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { racks } from "../../data/racks";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/Breadcrumb";
import AvailabilityCalendar from "../../components/AvailabilityCalendar";
import { ImageWithFallback } from "../../components/ImageWithFallback";
import AuthGuard from "../../components/AuthGuard";

export default function MediaDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const rack = racks.find((item) => item.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!rack) {
    return (
      <div className="min-h-screen bg-[#F2FFFD]">
        <Navbar />
        <div className="mx-auto max-w-[1440px] px-[120px] py-12">
          <p className="font-inter text-ink">Media tidak ditemukan</p>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Jelajah Media", href: "/browse" },
    {
      label: rack.category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      href: `/browse?category=${rack.category}`,
    },
    { label: rack.name },
  ];

  const bookedDates = [
    "2026-03-15",
    "2026-03-16",
    "2026-03-17",
    "2026-04-10",
    "2026-04-11",
    "2026-04-12",
  ];

  const readinessItems = [
    "Ukuran file desain akan direview sebelum tayang",
    `Minimum booking ${rack.minDuration || 1} bulan`,
    "Approval visual diprioritaskan dalam 24 jam kerja",
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F2FFFD]">
        <Navbar />

        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-[120px]">
          <div className="mb-6 rounded-[28px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,240,246,0.92))] p-5 shadow-sm">
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#12945A] font-inter shadow-sm">
                <BadgeCheck className="h-4 w-4" />
                Lokasi terverifikasi
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#6D54D9] font-inter shadow-sm">
                <Clock3 className="h-4 w-4" />
                Approval target &lt; 24 jam
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-brand-dark font-inter shadow-sm">
                <Rocket className="h-4 w-4" />
                Siap untuk peluncuran kampanye
              </span>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
            <div className="relative mb-4 overflow-hidden rounded-[28px] bg-white shadow-sm">
              <div className="absolute left-4 top-4 z-10 flex gap-2">
                <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                  <BadgeCheck className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs text-emerald-500 font-inter">
                    Verified Location
                  </span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-[4/3]"
                >
                  <ImageWithFallback
                    src={rack.images[currentImageIndex]}
                    alt={rack.name}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {rack.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) => (prev - 1 + rack.images.length) % rack.images.length
                      )
                    }
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110"
                  >
                    <ChevronLeft className="h-5 w-5 text-ink" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev + 1) % rack.images.length)
                    }
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110"
                  >
                    <ChevronRight className="h-5 w-5 text-ink" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {rack.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${index === currentImageIndex ? "bg-brand opacity-100" : "bg-white opacity-60"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {rack.images.length > 1 && (
              <div className="mb-6 grid grid-cols-4 gap-2">
                {rack.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 ${index === currentImageIndex ? "border-[#2EC9B7]" : "border-transparent"}`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${rack.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mb-6 rounded-[28px] bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-ink font-poppins">
                Traffic & Analytics
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div
                    className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2FFFD]"
                  >
                    <Users className="h-6 w-6 text-brand" />
                  </div>
                  <p className="mb-1 text-2xl text-ink font-poppins">
                    15K+
                  </p>
                  <p className="text-xs text-muted-foreground font-inter">
                    Daily Traffic
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#F0ECFF]"
                  >
                    <Eye className="h-6 w-6 text-teal" />
                  </div>
                  <p className="mb-1 text-2xl text-ink font-poppins">
                    450K
                  </p>
                  <p className="text-xs text-muted-foreground font-inter">
                    Est. Monthly Views
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]"
                  >
                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                  </div>
                  <p className="mb-1 text-2xl text-ink font-poppins">
                    High
                  </p>
                  <p className="text-xs text-muted-foreground font-inter">
                    Area Traffic
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <h4 className="mb-4 text-ink font-poppins">
                  Preview Desain Anda
                </h4>
                <div
                  className="cursor-pointer rounded-[24px] border-2 border-dashed border-gray-200 p-8 text-center transition-colors hover:border-pink-300"
                >
                  <input
                    type="file"
                    id="design-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(event) => {
                      if (event.target.files && event.target.files[0]) {
                        setSelectedFile(event.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="design-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-3 h-10 w-10 text-brand" />
                    <p className="mb-1 text-sm text-ink font-poppins">
                      {selectedFile ? selectedFile.name : "Upload Banner Design"}
                    </p>
                    <p className="text-xs text-muted-foreground font-inter">
                      PNG, JPG up to 10MB
                    </p>
                  </label>
                </div>
              </div>

              <div className="rounded-[28px] bg-[#2E2330] p-6 text-white shadow-[0_22px_52px_rgba(46,35,48,0.22)]">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/60">Kesiapan kampanye</p>
                <h4 className="mb-4 text-2xl font-poppins">
                  Semua info penting sebelum checkout ada di sini.
                </h4>
                <div className="space-y-3">
                  {readinessItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/8 p-3">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                      <p className="text-sm text-white/80 font-inter">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>

            <div>
            <div className="mb-6 rounded-[30px] bg-white p-8 shadow-sm lg:sticky lg:top-24">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="mb-2 text-ink font-poppins">
                    {rack.name}
                  </h2>
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="inline-block rounded-full bg-[#F2FFFD] px-3 py-1 text-sm text-brand font-inter"
                    >
                      {rack.category
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-[#D4A84A]" fill="currentColor" />
                      <span className="text-ink font-inter">
                        {rack.rating} ({rack.reviewCount} ulasan)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite((value) => !value)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 transition-colors hover:bg-gray-100"
                >
                  <Heart
                    className="h-6 w-6 text-brand"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-[#E7FBF7] p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#1C8F84]">Traffic</p>
                  <p className="mt-2 text-lg text-[#2E2330] font-poppins">
                    High
                  </p>
                </div>
                <div className="rounded-3xl bg-[#E8F7F5] p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D54D9]">Views</p>
                  <p className="mt-2 text-lg text-[#2E2330] font-poppins">
                    450K / bulan
                  </p>
                </div>
                <div className="rounded-3xl bg-[#E6FBF8] p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#12945A]">Fit</p>
                  <p className="mt-2 text-lg text-[#2E2330] font-poppins">
                    Launch ready
                  </p>
                </div>
              </div>

              <div className="mb-6 flex items-start gap-2 border-b border-gray-100 pb-6">
                <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-ink font-inter">{rack.location}</p>
                  <p className="mt-1 text-sm text-muted-foreground font-inter">
                    Area ramai dengan intensitas kunjungan tinggi pada jam pulang kerja dan akhir pekan.
                  </p>
                </div>
              </div>

            <div className="mb-6 border-b border-gray-100 pb-6">
                <h4 className="mb-3 text-ink font-poppins">
                  Spesifikasi
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-ink font-inter">
                      Ukuran: {rack.size}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6 border-b border-gray-100 pb-6">
                <h4 className="mb-3 text-ink font-poppins">
                  Fasilitas
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {rack.facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-ink font-inter">
                        {facility}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-ink font-poppins">
                  Deskripsi
                </h4>
                <p className="text-sm text-muted-foreground font-inter">
                  {rack.description}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground font-inter">
                      Harga per bulan
                    </p>
                    <span className="text-3xl text-brand font-poppins">
                      Rp{rack.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                <div className="mb-4 rounded-[24px] bg-[#E7FBF7] p-4">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 text-brand" />
                    <div>
                      <p className="text-[#2E2330] font-poppins">
                        Cocok untuk kampanye 2-3 bulan
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground font-inter">
                        Durasi ini biasanya cukup untuk awareness, refresh visual, dan evaluasi performa.
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/booking/${rack.id}`}
                  className="brand-button block w-full rounded-2xl py-4 text-center text-lg font-poppins shadow-[0_16px_36px_rgba(255,107,154,0.28)]"
                >
                  Lanjut Booking
                </Link>
              </div>
            </div>

            <AvailabilityCalendar bookedDates={bookedDates} />
            </div>
          </div>

        {rack.reviews.length > 0 && (
          <div className="rounded-[28px] bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-ink font-poppins">
              Review Pengguna
            </h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {rack.reviews.map((review) => (
                <div key={review.id} className="rounded-lg bg-gray-50 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <ImageWithFallback
                      src={review.userAvatar}
                      alt={review.userName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-ink font-poppins">
                        {review.userName}
                      </p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className="h-4 w-4 text-[#D4A84A]"
                            fill={index < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-inter">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#CDEEE8] bg-white/96 p-4 shadow-[0_-10px_30px_rgba(46,35,48,0.08)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-[1440px] items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-dark font-inter">
                Mulai dari
              </p>
              <p className="truncate text-lg text-[#2E2330] font-poppins">
                Rp{rack.price.toLocaleString("id-ID")} / bulan
              </p>
            </div>
            <Link
              href={`/booking/${rack.id}`}
              className="brand-button inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-poppins"
            >
              Booking
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}
