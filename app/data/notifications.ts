export type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  channel: "email" | "whatsapp" | "in-app";
  status: "unread" | "read";
  tone: "brand" | "gold" | "teal";
  href?: string;
  targetType?: "Media" | "Booking" | "Payment";
};

export const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Booking terkonfirmasi",
    detail: "Pembayaran untuk Rak Premium C3 berhasil diverifikasi.",
    time: "2 jam lalu",
    channel: "in-app",
    status: "unread",
    tone: "brand",
    href: "/booking-success/3",
    targetType: "Payment",
  },
  {
    id: "n2",
    title: "Approval desain dibutuhkan",
    detail: "Mohon review materi untuk Rak A1 sebelum 15 Mar.",
    time: "Kemarin",
    channel: "email",
    status: "unread",
    tone: "gold",
    href: "/booking/1",
    targetType: "Booking",
  },
  {
    id: "n3",
    title: "Slot tersedia dibuka",
    detail: "Rak A4 tersedia mulai 10 Apr. Lihat detail dan lakukan booking.",
    time: "2 hari lalu",
    channel: "whatsapp",
    status: "read",
    tone: "teal",
    href: "/media/4",
    targetType: "Media",
  },
  {
    id: "n4",
    title: "Promosi dimulai",
    detail: "Kampanye untuk Rak B2 mulai tayang hari ini.",
    time: "3 hari lalu",
    channel: "in-app",
    status: "read",
    tone: "brand",
    href: "/media/2",
    targetType: "Media",
  },
];
