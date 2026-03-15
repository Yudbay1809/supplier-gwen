"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Package,
  Search,
  SlidersHorizontal,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { racks } from "../data/racks";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { motion } from "framer-motion";
import { MediaGridSkeleton } from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import Breadcrumb from "../components/Breadcrumb";

function BrowsePageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const priceMin = Math.min(...racks.map((rack) => rack.price));
  const priceMax = Math.max(...racks.map((rack) => rack.price));

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "all"
  );
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [budgetMin, setBudgetMin] = useState<number>(priceMin);
  const [budgetMax, setBudgetMax] = useState<number>(priceMax);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "price-low" | "price-high" | "rating" | "newest" | "distance"
  >("rating");
  const [isLoading] = useState(false);

  const locationCenters: Record<string, { lat: number; lng: number }> = {
    jakarta: { lat: -6.200000, lng: 106.816666 },
    surabaya: { lat: -7.257472, lng: 112.752090 },
  };

  const toRad = (value: number) => (value * Math.PI) / 180;
  const getDistanceKm = (rack: typeof racks[number]) => {
    if (selectedLocation === "all") {
      return null;
    }
    const center = locationCenters[selectedLocation];
    if (!center) {
      return null;
    }
    const dLat = toRad(rack.coordinates.lat - center.lat);
    const dLng = toRad(rack.coordinates.lng - center.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(center.lat)) *
        Math.cos(toRad(rack.coordinates.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 6371 * c;
  };

  let filteredRacks =
    selectedCategory === "all"
      ? racks
      : racks.filter((rack) => rack.category === selectedCategory);

  if (selectedLocation !== "all") {
    filteredRacks = filteredRacks.filter((rack) => {
      if (!rack.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      const distance = getDistanceKm(rack);
      return distance === null ? true : distance <= radiusKm;
    });
  }

  filteredRacks = filteredRacks.filter(
    (rack) => rack.price >= budgetMin && rack.price <= budgetMax
  );

  if (availabilityDate) {
    const target = new Date(availabilityDate);
    filteredRacks = filteredRacks.filter((rack) =>
      rack.availability.some((range) => {
        const start = new Date(range.start);
        const end = new Date(range.end);
        return target >= start && target <= end;
      })
    );
  }

  if (minRating > 0) {
    filteredRacks = filteredRacks.filter((rack) => rack.rating >= minRating);
  }

  if (searchQuery.trim()) {
    filteredRacks = filteredRacks.filter((rack) =>
      `${rack.name} ${rack.location} ${rack.category}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }

  filteredRacks = [...filteredRacks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return 0;
      case "distance": {
        const distanceA = getDistanceKm(a) ?? Number.POSITIVE_INFINITY;
        const distanceB = getDistanceKm(b) ?? Number.POSITIVE_INFINITY;
        return distanceA - distanceB;
      }
      default:
        return 0;
    }
  });

  const categories = [
    { id: "all", name: "Semua Kategori" },
    { id: "rak-display", name: "Rak Display" },
    { id: "kaca-mobil", name: "Kaca Mobil" },
    { id: "billboard", name: "Billboard" },
    { id: "booth", name: "Booth Event" },
    { id: "display-lantai", name: "Display Lantai" },
  ];

  const locations = [
    { id: "all", name: "Semua Lokasi" },
    { id: "jakarta", name: "Jakarta" },
    { id: "surabaya", name: "Surabaya" },
  ];

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Jelajah Media" }];
  const activeFilters = [
    selectedCategory !== "all"
      ? {
          key: "category",
          label: categories.find((item) => item.id === selectedCategory)?.name || selectedCategory,
          clear: () => setSelectedCategory("all"),
        }
      : null,
    selectedLocation !== "all"
      ? {
          key: "location",
          label: locations.find((item) => item.id === selectedLocation)?.name || selectedLocation,
          clear: () => setSelectedLocation("all"),
        }
      : null,
    budgetMin !== priceMin || budgetMax !== priceMax
      ? {
          key: "budget",
          label: `Budget Rp${budgetMin.toLocaleString("id-ID")} - Rp${budgetMax.toLocaleString("id-ID")}`,
          clear: () => {
            setBudgetMin(priceMin);
            setBudgetMax(priceMax);
          },
        }
      : null,
    availabilityDate
      ? {
          key: "availability",
          label: `Tanggal ${availabilityDate}`,
          clear: () => setAvailabilityDate(""),
        }
      : null,
    selectedLocation !== "all"
      ? {
          key: "radius",
          label: `Radius ${radiusKm} km`,
          clear: () => setRadiusKm(10),
        }
      : null,
    minRating > 0
      ? {
          key: "rating",
          label: `Rating ${minRating}+`,
          clear: () => setMinRating(0),
        }
      : null,
    searchQuery.trim()
      ? {
          key: "search",
          label: `Cari: ${searchQuery}`,
          clear: () => setSearchQuery(""),
        }
      : null,
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  return (
    <div className="min-h-screen bg-[#F2FFFD]">
      <Navbar />

      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-[120px]">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-8 rounded-[32px] border border-white/80 bg-white/85 p-6 shadow-[0_20px_60px_rgba(216,83,130,0.12)] backdrop-blur sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p
                className="mb-3 text-sm uppercase tracking-[0.24em] text-brand-dark font-inter"
              >
                Favorit pintar
              </p>
              <h1
                className="mb-3 text-3xl text-[#2E2330] font-poppins sm:text-4xl"
              >
                Cari media yang paling pas untuk tujuan kampanye kamu.
              </h1>
              <p
                className="max-w-2xl text-sm leading-7 text-muted-foreground font-inter sm:text-base"
              >
                Filter berdasarkan kategori, kota, harga, dan rating. Fokusnya bukan
                cuma banyak pilihan, tapi cepat sampai ke opsi yang paling layak diuji.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-[#E7FBF7] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#1C8F84]">Pilihan aktif</p>
                <p className="mt-2 text-3xl text-[#2E2330] font-poppins">
                  {filteredRacks.length}
                </p>
              </div>
              <div className="rounded-3xl bg-[#E8F7F5] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#6D54D9]">Kota tersedia</p>
                <p className="mt-2 text-3xl text-[#2E2330] font-poppins">
                  18
                </p>
              </div>
              <div className="rounded-3xl bg-[#E6FBF8] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#12945A]">Approval</p>
                <p className="mt-2 text-3xl text-[#2E2330] font-poppins">
                  &lt;24h
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari nama media, lokasi, atau kategori..."
                className="h-14 w-full rounded-2xl border border-transparent bg-[#EEFDFB] pl-12 pr-4 font-inter outline-none transition focus:border-[#9FE7DC] focus:bg-white"
              />
            </div>
            <Link
              href="/dashboard"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#CDEEE8] bg-white px-6 text-sm text-[#0E5E56] font-inter"
            >
              Lihat Dasbor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={filter.clear}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-sm text-brand-dark font-inter"
                >
                  {filter.label}
                  <X className="h-4 w-4" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full flex-shrink-0 lg:w-64">
            <div className="rounded-[28px] bg-white/90 p-6 shadow-sm lg:sticky lg:top-24">
              <div className="mb-6 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-brand" />
                <h3 className="text-ink font-poppins">Filter</h3>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm text-ink font-poppins">
                  Kategori
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="h-4 w-4 accent-[#2EC9B7]"
                      />
                      <span className="text-sm text-ink font-inter">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm text-ink font-poppins">
                  Lokasi
                </h4>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <label key={location.id} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="location"
                        checked={selectedLocation === location.id}
                        onChange={() => setSelectedLocation(location.id)}
                        className="h-4 w-4 accent-[#2EC9B7]"
                      />
                      <span className="text-sm text-ink font-inter">
                        {location.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm text-ink font-poppins">
                  Radius dari lokasi
                </h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={radiusKm}
                    onChange={(event) => setRadiusKm(Number(event.target.value))}
                    className="w-full accent-[#2EC9B7]"
                    disabled={selectedLocation === "all"}
                  />
                  <p className="text-xs text-muted-foreground font-inter">
                    {selectedLocation === "all"
                      ? "Pilih lokasi untuk mengaktifkan radius."
                      : `Maksimal ${radiusKm} km dari lokasi terpilih`}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm text-ink font-poppins">
                  Ketersediaan
                </h4>
                <input
                  type="date"
                  value={availabilityDate}
                  onChange={(event) => setAvailabilityDate(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-inter"
                />
                <p className="mt-2 text-xs text-muted-foreground font-inter">
                  Tampilkan media yang tersedia di tanggal tersebut.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm text-ink font-poppins">
                  Budget
                </h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground font-inter">
                        Min
                      </label>
                      <input
                        type="number"
                        min={priceMin}
                        max={priceMax}
                        step={50000}
                        value={budgetMin}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          setBudgetMin(Math.min(value, budgetMax));
                        }}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-inter"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-inter">
                        Max
                      </label>
                      <input
                        type="number"
                        min={priceMin}
                        max={priceMax}
                        step={50000}
                        value={budgetMax}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          setBudgetMax(Math.max(value, budgetMin));
                        }}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-inter"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min={priceMin}
                    max={priceMax}
                    step={50000}
                    value={budgetMin}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setBudgetMin(Math.min(value, budgetMax));
                    }}
                    className="w-full accent-[#2EC9B7]"
                  />
                  <input
                    type="range"
                    min={priceMin}
                    max={priceMax}
                    step={50000}
                    value={budgetMax}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setBudgetMax(Math.max(value, budgetMin));
                    }}
                    className="w-full accent-[#2EC9B7]"
                  />
                  <p className="text-xs text-muted-foreground font-inter">
                    Rp{budgetMin.toLocaleString("id-ID")} - Rp{budgetMax.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm text-ink font-poppins">
                  Rating Minimum
                </h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 0].map((rating) => (
                    <label key={rating} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="h-4 w-4 accent-[#2EC9B7]"
                      />
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-[#D4A84A]" fill="currentColor" />
                        <span className="text-sm text-ink font-inter">
                          {rating > 0 ? `${rating}+` : "Semua"}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLocation("all");
                  setRadiusKm(10);
                  setAvailabilityDate("");
                  setBudgetMin(priceMin);
                  setBudgetMax(priceMax);
                  setMinRating(0);
                }}
                className="w-full rounded-lg border border-gray-200 py-2 text-sm text-ink font-inter transition-colors hover:border-pink-200"
              >
                Reset Filter
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-inter">
                  Menampilkan favorit dengan konteks rating, trafik, dan harga.
                </p>
                <p className="mt-1 text-lg text-[#2E2330] font-poppins">
                  {filteredRacks.length} media ditemukan
                </p>
              </div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#0E5E56] font-inter shadow-sm">
                <TrendingUp className="h-4 w-4" />
                Favorit disusun untuk keputusan lebih cepat
              </p>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-inter">
                {filteredRacks.length} media ditemukan
              </p>
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as "price-low" | "price-high" | "rating" | "newest"
                  )
                }
                className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-inter"
              >
                <option value="rating">Rating Tertinggi</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="distance" disabled={selectedLocation === "all"}>
                  Terdekat
                </option>
                <option value="newest">Terbaru</option>
              </select>
            </div>

            {isLoading ? (
              <MediaGridSkeleton />
            ) : filteredRacks.length === 0 ? (
              <EmptyState
                icon={Package}
                title="Tidak ada media ditemukan"
                description="Coba ubah filter atau kata kunci pencarian Anda untuk menemukan media promosi yang sesuai"
                actionLabel="Reset Filter"
                onAction={() => {
                  setSelectedCategory("all");
                  setSelectedLocation("all");
                  setRadiusKm(10);
                  setAvailabilityDate("");
                  setBudgetMin(priceMin);
                  setBudgetMax(priceMax);
                  setMinRating(0);
                }}
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRacks.map((media, index) => {
                  const distance = getDistanceKm(media);
                  return (
                    <motion.div
                      key={media.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/media/${media.id}`}
                        className="group block overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(216,83,130,0.16)]"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <ImageWithFallback
                            src={media.image}
                            alt={media.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {index < 2 && (
                            <div
                              className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#2EC9B7] to-[#2E9AA2] px-3 py-1 text-xs text-white font-inter"
                            >
                              Featured
                            </div>
                          )}
                          <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs text-[#0E5E56] font-inter shadow-sm backdrop-blur">
                            <MapPin className="h-3.5 w-3.5" />
                            {distance !== null ? `${distance.toFixed(1)} km` : "Zona trafik tinggi"}
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="mb-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-brand-light px-3 py-1 text-xs text-brand-dark font-inter">
                              {categories.find((item) => item.id === media.category)?.name || media.category}
                            </span>
                            <span className="rounded-full bg-teal-soft px-3 py-1 text-xs text-[#6D54D9] font-inter">
                              Min. {media.minDuration || 1} bulan
                            </span>
                          </div>
                          <h3 className="mb-1 text-ink font-poppins">
                            {media.name}
                          </h3>
                          <p className="mb-2 text-sm text-muted-foreground font-inter">
                            {media.location}
                          </p>
                          <div className="mb-3 grid grid-cols-2 gap-2">
                            <div className="rounded-2xl bg-[#EEFDFB] p-3">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-[#197A72]">Trafik</p>
                              <p className="mt-1 text-sm text-[#2E2330] font-poppins">
                                Tinggi
                              </p>
                            </div>
                            <div className="rounded-2xl bg-[#F6F3FF] p-3">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-[#6D54D9]">Setup</p>
                              <p className="mt-1 text-sm text-[#2E2330] font-poppins">
                                Siap upload
                              </p>
                            </div>
                          </div>
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-lg text-brand font-poppins">
                              Rp{media.price.toLocaleString("id-ID")}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-[#D4A84A]" fill="currentColor" />
                              <span className="text-sm text-ink font-inter">
                                {media.rating}
                              </span>
                            </div>
                          </div>
                          <button
                            className="brand-button w-full rounded-2xl py-3 text-sm font-inter transition-transform group-hover:scale-[1.02]"
                          >
                            Evaluasi Media
                          </button>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2FFFD]" />}>
      <BrowsePageContent />
    </Suspense>
  );
}

