export type KontrabonStatus = "Draft" | "Proses" | "Approved" | "Dibayar";

export type KontrabonItem = {
  id: string;
  vendor: string;
  brand: string;
  period: string;
  amount: number;
  status: KontrabonStatus;
  dueDate: string;
  note: string;
  fileUrl?: string;
};

export const kontrabonData: KontrabonItem[] = [
  {
    id: "KB-2403-001",
    vendor: "PT Gwen Distribusi",
    brand: "Gwen",
    period: "Mar 2026",
    amount: 24500000,
    status: "Proses",
    dueDate: "2026-03-28",
    note: "Menunggu verifikasi dokumen.",
    fileUrl: "/files/kontrabon/KB-2403-001.pdf",
  },
  {
    id: "KB-2402-007",
    vendor: "PT Gwen Distribusi",
    brand: "Gwen",
    period: "Feb 2026",
    amount: 18750000,
    status: "Approved",
    dueDate: "2026-03-10",
    note: "Approved, siap diproses pembayaran.",
    fileUrl: "/files/kontrabon/KB-2402-007.pdf",
  },
  {
    id: "KB-2401-003",
    vendor: "PT Gwen Distribusi",
    brand: "Gwen",
    period: "Jan 2026",
    amount: 21350000,
    status: "Dibayar",
    dueDate: "2026-02-05",
    note: "Pembayaran selesai.",
    fileUrl: "/files/kontrabon/KB-2401-003.pdf",
  },
  {
    id: "KB-2403-002",
    vendor: "Lumiere Cosmetics",
    brand: "Lumiere",
    period: "Mar 2026",
    amount: 9800000,
    status: "Draft",
    dueDate: "2026-03-30",
    note: "Menunggu input lampiran.",
    fileUrl: "/files/kontrabon/KB-2403-002.pdf",
  },
];
