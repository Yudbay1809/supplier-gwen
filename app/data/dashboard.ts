export const alerts = [
  { title: "2 kontrabon perlu approval", action: "Buka kontrabon", href: "/kontrabon", tone: "gold" },
  { title: "3 SKU menipis", action: "Cek stok", href: "/stock", tone: "brand" },
  { title: "1 promosi perlu review", action: "Lihat promosi", href: "/promosi", tone: "teal" },
];

export const statCards = [
  { label: "Promosi Aktif", icon: "Play", tone: "brand" },
  { label: "Total Booking", icon: "Package", tone: "teal" },
  { label: "Total Belanja", icon: "DollarSign", tone: "success" },
];

export const quickActions = [
  { href: "/kontrabon", label: "Cek Kontrabon", hint: "Rekap tagihan supplier", icon: "FileText", bg: "#E7FBF7", color: "#2EC9B7" },
  { href: "/stock", label: "Stok per Brand", hint: "Pantau varian & gudang", icon: "Boxes", bg: "#FFF6E6", color: "#C9A24A" },
  { href: "/promosi", label: "Promosi Gwen", hint: "Kelola media promosi", icon: "Search", bg: "#E8F7F5", color: "#2E9AA2" },
];

export const activityFeed = [
  { title: "Kontrabon KB-2403-001 updated", time: "2 jam lalu", detail: "Status berubah menjadi Proses." },
  { title: "Stok Lip Cream Rose menipis", time: "Kemarin", detail: "Qty tersisa 140 di WH Jakarta." },
  { title: "Promosi Rak B2 tayang", time: "2 hari lalu", detail: "Promosi aktif sesuai jadwal." },
];

export const trendData = [38, 52, 44, 66, 58, 72, 61];
export const trendLabels = ["Sep", "Okt", "Nov", "Des", "Jan", "Feb", "Mar"];

export const stockTrendData = [62, 58, 55, 49, 53, 47, 42];
export const stockTrendLabels = ["Sep", "Okt", "Nov", "Des", "Jan", "Feb", "Mar"];

export const stockCriticalItems = [
  {
    sku: "GW-LIP-01",
    name: "Gwen Lip Cream Nude 04",
    brand: "Gwen",
    brandInitials: "GW",
    brandTone: "brand",
    logoSrc: "",
    warehouse: "WH Jakarta",
    stock: 72,
    status: "Menipis",
    href: "/stock?brand=Gwen",
  },
  {
    sku: "LM-SPF-01",
    name: "Lumiere Sunscreen Gel SPF50",
    brand: "Lumiere",
    brandInitials: "LM",
    brandTone: "indigo",
    logoSrc: "",
    warehouse: "WH Bandung",
    stock: 28,
    status: "Habis",
    href: "/stock?brand=Lumiere",
  },
  {
    sku: "NG-TNR-02",
    name: "NaturaGlow Toner Balance 120ml",
    brand: "NaturaGlow",
    brandInitials: "NG",
    brandTone: "deep",
    logoSrc: "",
    warehouse: "WH Surabaya",
    stock: 64,
    status: "Menipis",
    href: "/stock?brand=NaturaGlow",
  },
];

export const kontrabonSearchItems = [
  { id: "KB-2403-001", title: "Kontrabon KB-2403-001", subtitle: "Status Proses - Mar 2026", href: "/kontrabon" },
  { id: "KB-2402-007", title: "Kontrabon KB-2402-007", subtitle: "Approved - Feb 2026", href: "/kontrabon" },
  { id: "KB-2401-003", title: "Kontrabon KB-2401-003", subtitle: "Dibayar - Jan 2026", href: "/kontrabon" },
];

export const stockSearchItems = [
  { id: "GW-LIP-01", title: "SKU GW-LIP-01", subtitle: "Lip Cream Nude - WH Jakarta", href: "/stock" },
  { id: "LM-SPF-01", title: "SKU LM-SPF-01", subtitle: "Sunscreen Gel - WH Bandung", href: "/stock" },
  { id: "NG-TNR-02", title: "SKU NG-TNR-02", subtitle: "Toner Balance - WH Surabaya", href: "/stock" },
];

export const dashboardNotifications = [
  {
    title: "Booking terkonfirmasi",
    detail: "Pembayaran berhasil diverifikasi.",
    time: "2 jam lalu",
    tone: "brand",
  },
  {
    title: "Approval desain dibutuhkan",
    detail: "Cek materi untuk Rak Premium C3.",
    time: "Kemarin",
    tone: "gold",
  },
  {
    title: "Slot tersedia dibuka",
    detail: "Rak A4 tersedia mulai 10 Apr.",
    time: "2 hari lalu",
    tone: "teal",
  },
];

export const campaignTimeline = [
  {
    status: "completed",
    title: "Booking Terkonfirmasi",
    description: "Pembayaran berhasil diverifikasi",
    date: "10 Mar 2026",
    icon: "CheckCircle",
    tone: "success",
  },
  {
    status: "completed",
    title: "Desain Terunggah",
    description: "Desain iklan telah diunggah",
    date: "11 Mar 2026",
    icon: "Upload",
    tone: "success",
  },
  {
    status: "active",
    title: "Promosi Dimulai",
    description: "Promosi mulai ditampilkan",
    date: "12 Mar 2026",
    icon: "Play",
    tone: "brand",
  },
  {
    status: "pending",
    title: "Promosi Selesai",
    description: "Estimasi selesai promosi",
    date: "12 Apr 2026",
    icon: "Clock",
    tone: "muted",
  },
];

export const insightCards = [
  {
    title: "Prediksi stok kritis",
    detail: "2 varian diperkirakan habis dalam 14 hari.",
    action: "Lihat rekomendasi",
    href: "/stock",
    tone: "danger",
  },
  {
    title: "Kontrabon tertunda",
    detail: "1 kontrabon pending > 7 hari perlu follow-up.",
    action: "Cek kontrabon",
    href: "/kontrabon",
    tone: "gold",
  },
  {
    title: "Efektivitas promosi",
    detail: "2 media promosi berada di atas performa rata-rata.",
    action: "Lihat promosi",
    href: "/promosi",
    tone: "brand",
  },
];
