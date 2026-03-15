"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  CheckCircle,
  Clock3,
  LayoutGrid,
  MapPinned,
  Megaphone,
  Package,
  Play,
  Search,
  ShieldCheck,
  Star,
  Store,
  TrendingUp,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { racks } from "../data/racks";

export default function Home() {
  const categories = [
    {
      id: "rak-display",
      name: "Rak Display",
      Icon: Package,
      image:
        "https://images.unsplash.com/photo-1669829885466-075a9801f2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGRpc3BsYXklMjByYWNrJTIwc2hlbHZlcyUyMGJlYXV0eXxlbnwxfHx8fDE3NzMxNTUyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "kaca-mobil",
      name: "Kaca Mobil",
      Icon: Car,
      image:
        "https://images.unsplash.com/photo-1751267464812-0bb7764e87f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3aW5kb3clMjBzdGlja2VyJTIwYWR2ZXJ0aXNlbWVudHxlbnwxfHx8fDE3NzMyMjQ3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "billboard",
      name: "Billboard",
      Icon: Megaphone,
      image:
        "https://images.unsplash.com/photo-1763671727638-5bc55bb9c980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWxsYm9hcmQlMjBhZHZlcnRpc2VtZW50JTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzMyMjQ3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "booth",
      name: "Booth Event",
      Icon: Store,
      image:
        "https://images.unsplash.com/photo-1762028892701-692dc360db08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGhpYml0aW9uJTIwYm9vdGglMjBldmVudHxlbnwxfHx8fDE3NzMyMDgwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "display-lantai",
      name: "Display Lantai",
      Icon: LayoutGrid,
      image:
        "https://images.unsplash.com/photo-1676570092589-a6c09ecbb373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwYmVhdXR5JTIwcHJvZHVjdHMlMjBzaGVsZnxlbnwxfHx8fDE3NzMxNTUyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const featuredMedia = racks.slice(0, 4);
  const topMedia = racks[2];

  const howItWorks = [
    {
      step: "1",
      title: "Pilih Media",
      description:
        "Cari dan pilih media promosi yang sesuai dengan kebutuhan brand Anda",
      icon: Search,
    },
    {
      step: "2",
      title: "Booking",
      description:
        "Tentukan durasi sewa dan isi formulir booking dengan lengkap",
      icon: Package,
    },
    {
      step: "3",
      title: "Bayar",
      description: "Lakukan pembayaran melalui metode yang tersedia",
      icon: CheckCircle,
    },
    {
      step: "4",
      title: "Promosi Aktif",
      description:
        "Media promosi Anda siap ditampilkan dan menjangkau target audience",
      icon: Play,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Wijaya",
      role: "Founder, GlowBeauty",
      comment:
        "Platform yang sangat membantu brand kecil seperti kami. Proses mudah dan lokasi strategis!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1770627000564-3feb36aecbcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGJ1c2luZXNzJTIwd29tYW4lMjB0ZXN0aW1vbmlhbHxlbnwxfHx8fDE3NzMyMjQ3MTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Budi Santoso",
      role: "Marketing Manager, BeautyLux",
      comment:
        "Sales meningkat 40% setelah menggunakan Supplier Gwen. Highly recommended!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1661704450248-87df8749d823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG93bmVyJTIwc2F0aXNmaWVkJTIwY3VzdG9tZXJ8ZW58MXx8fHwxNzczMjI0NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const trustStats = [
    { label: "Brand Aktif", value: "240+" },
    { label: "Kota Premium", value: "18" },
    { label: "Avg. Approval", value: "< 24 jam" },
  ];

  const benefitPillars = [
    {
      title: "Lokasi Dengan Traffic Nyata",
      description: "Pilih media berdasarkan eksposur, bukan feeling.",
      icon: TrendingUp,
    },
    {
      title: "Approval Lebih Cepat",
      description: "Alur booking, upload desain, dan pembayaran lebih ringkas.",
      icon: Clock3,
    },
    {
      title: "Terasa Aman Untuk Brand",
      description: "Ada verifikasi lokasi, rating, dan ringkasan kebutuhan file.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-[120px] lg:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[#7A3655] font-inter shadow-sm backdrop-blur"
            >
              <ShieldCheck className="h-4 w-4" />
              Lokasi terkurasi untuk brand activation yang lebih rapi
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-5 text-4xl text-[#2E2330] font-poppins leading-tight sm:text-5xl lg:text-6xl"
            >
              Booking media promosi
              <span className="block text-[#2EC9B7]">yang terasa premium,</span>
              bukan sekadar tersedia.
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8 max-w-xl text-base leading-8 text-muted-foreground font-inter sm:text-lg"
            >
              Cari rak display, booth event, billboard, dan media retail dengan
              konteks trafik, kesiapan desain, serta alur booking yang lebih
              cepat untuk tim marketing.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex max-w-2xl flex-col gap-4 rounded-[28px] border border-white/80 bg-white/85 p-4 shadow-[0_24px_70px_rgba(216,83,130,0.12)] backdrop-blur sm:flex-row"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari lokasi, kategori, atau kota..."
                  className="h-14 w-full rounded-2xl border border-transparent bg-[#EEFDFB] pl-12 pr-4 font-inter outline-none transition focus:border-[#9FE7DC] focus:bg-white"
                />
              </div>
              <Link
                href="/browse"
                className="brand-button flex h-14 items-center justify-center gap-2 rounded-2xl px-8 font-poppins shadow-[0_14px_30px_rgba(255,107,154,0.28)]"
              >
                Lihat Media
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-inter"
            >
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>1000+ media siap booking</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>approval rata-rata di bawah 24 jam</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>brief desain lebih terstruktur</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="grid max-w-2xl grid-cols-3 gap-3"
            >
              {trustStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur"
                >
                  <p
                    className="text-2xl text-[#2E2330] font-poppins sm:text-3xl"
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-1 text-sm text-muted-foreground font-inter"
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-[#CFEFEA] blur-3xl" />
            <div className="absolute -right-4 bottom-8 h-36 w-36 rounded-full bg-[#F5D0FE] blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-[#2E2330] p-5 text-white shadow-[0_30px_80px_rgba(41,25,39,0.28)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-white/60">
                    Ringkasan kampanye
                  </p>
                  <h3 className="mt-2 text-2xl font-poppins">
                    Plaza Senayan Beauty Lane
                  </h3>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-2 text-sm text-white/90">
                  Hot spot
                </div>
              </div>

              <div className="relative mb-5 overflow-hidden rounded-[24px]">
                <ImageWithFallback
                  src={topMedia.image}
                  alt={topMedia.name}
                  className="h-[260px] w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E2330] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                      Best performing zone
                    </p>
                    <p className="mt-2 text-xl font-poppins">
                      {topMedia.name}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/12 px-4 py-3 backdrop-blur">
                    <p className="text-xs text-white/70">Est. Monthly Views</p>
                    <p className="text-lg font-poppins">
                      450K
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                  <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
                    <MapPinned className="h-4 w-4" />
                    Traffic quality
                  </div>
                  <p className="text-3xl font-poppins">
                    High
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    Cocok untuk peluncuran, promo mingguan, dan shelf takeover.
                  </p>
                </div>
                <div className="rounded-3xl bg-[#2EC9B7] p-4 text-white shadow-[0_18px_40px_rgba(255,107,154,0.35)]">
                  <div className="mb-3 flex items-center gap-2 text-sm text-white/80">
                    <Star className="h-4 w-4" />
                    Recommended setup
                  </div>
                  <p className="text-3xl font-poppins">
                    3 Bulan
                  </p>
                  <p className="mt-1 text-sm text-white/85">
                    Waktu ideal untuk awareness, testing visual, dan retargeting.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-4 sm:px-8 lg:px-[120px]">
        <div className="grid gap-4 md:grid-cols-3">
          {benefitPillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="rounded-[28px] border border-white/80 bg-white/85 p-6 shadow-sm backdrop-blur"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light">
                  <Icon className="h-6 w-6 text-brand" />
                </div>
                <h3
                  className="mb-2 text-lg text-[#2E2330] font-poppins"
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-7 text-muted-foreground font-inter"
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-[120px]">
        <p
          className="mb-3 text-center text-sm uppercase tracking-[0.24em] text-brand-dark font-inter"
        >
          Pilih format promosi
        </p>
        <h2
          className="mb-3 text-center text-[#2E2330] font-poppins"
        >
          Kategori Media Promosi
        </h2>
        <p
          className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground font-inter"
        >
          Dari retail activation sampai outdoor exposure, semua kategori dibuat
          agar tim kamu cepat memilih channel yang paling relevan.
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => {
            const CategoryIcon = category.Icon;
            return (
              <motion.div
                key={category.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/browse?category=${category.id}`}
                  className="group block overflow-hidden rounded-[26px] border border-white/80 bg-white/90 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(216,83,130,0.16)]"
                >
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <div className="mb-3 flex items-center justify-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light">
                        <CategoryIcon className="h-5 w-5 text-brand" />
                      </span>
                    </div>
                    <h3 className="text-sm text-ink font-poppins">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-[120px]">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p
              className="mb-2 text-sm uppercase tracking-[0.24em] text-brand-dark font-inter"
            >
              Favorit cepat
            </p>
            <h2 className="text-[#2E2330] font-poppins">
              Media Promosi Populer
            </h2>
          </div>
          <Link
            href="/browse"
            className="flex items-center gap-2 text-sm text-brand font-inter"
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredMedia.map((media, index) => (
            <motion.div
              key={media.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/media/${media.id}`}
                className="block overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(216,83,130,0.16)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={media.image}
                    alt={media.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs shadow-sm backdrop-blur">
                    Traffic tinggi
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span
                      className="rounded-full bg-brand-light px-3 py-1 text-xs text-brand-dark font-inter"
                    >
                      {media.category}
                    </span>
                    <span
                      className="rounded-full bg-teal-soft px-3 py-1 text-xs text-[#6D54D9] font-inter"
                    >
                      Min. {media.minDuration || 1} bulan
                    </span>
                  </div>
                  <h3 className="mb-1 text-ink font-poppins">
                    {media.name}
                  </h3>
                  <p
                    className="mb-2 text-sm text-muted-foreground font-inter"
                  >
                    {media.location}
                  </p>
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className="text-lg text-brand font-poppins"
                    >
                      Rp{media.price.toLocaleString("id-ID")}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-[#D4A84A]" fill="currentColor" />
                      <span
                        className="text-sm text-ink font-inter"
                      >
                        {media.rating}
                      </span>
                    </div>
                  </div>
                  <button
                    className="brand-button w-full rounded-2xl py-3 text-sm font-inter"
                  >
                    Lihat Detail
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-[120px]">
        <h2 className="mb-12 text-center text-ink font-poppins">
          Cara Kerja Supplier Gwen
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F2FFFD]"
                >
                  <Icon className="h-10 w-10 text-brand" />
                </div>
                <div
                  className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-xl text-white font-poppins"
                >
                  {item.step}
                </div>
                <h3
                  className="mb-2 text-ink font-poppins"
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-inter">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-[120px]">
        <h2
          className="mb-12 text-center text-[#2E2330] font-poppins"
        >
          Apa Kata Mereka?
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-[28px] border border-white/80 bg-white/90 p-8 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-4">
                <ImageWithFallback
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-ink font-poppins">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground font-inter">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="mb-3 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#D4A84A]" fill="currentColor" />
                ))}
              </div>
              <p className="text-muted-foreground font-inter">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="rounded-[34px] bg-[linear-gradient(135deg,#2E2330_0%,#0E5E56_48%,#2EC9B7_100%)] p-8 text-center text-white shadow-[0_30px_70px_rgba(111,51,83,0.28)] sm:p-12 lg:p-16">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-white/70">Siap tayang</p>
          <h2 className="mb-4 text-white font-poppins">
            Siap Mulai Promosi Brand Anda?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80 font-inter">
            Pilih media, upload desain, dan jalankan kampanye dengan brief yang
            lebih rapi untuk tim internal maupun klien.
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm font-inter">
            <span className="rounded-full bg-white/10 px-4 py-2 text-white/85">Booking flow terstruktur</span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-white/85">Data lokasi lebih jelas</span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-white/85">Approval lebih cepat</span>
          </div>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg text-[#0E5E56] font-poppins shadow-lg"
          >
            Mulai Favorit Media
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

