export interface Rack {
  id: string;
  name: string;
  size: string;
  price: number;
  location: string;
  category: "rak-display" | "kaca-mobil" | "billboard" | "booth" | "display-lantai";
  image: string;
  images: string[];
  facilities: string[];
  description: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  coordinates: { lat: number; lng: number };
  availability: { start: string; end: string }[];
  traffic?: string;
  minDuration?: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const racks: Rack[] = [
  {
    id: "1",
    name: "Rak A1",
    size: "40cm",
    price: 300000,
    location: "Mall Tunjungan Plaza, Surabaya",
    category: "rak-display",
    image:
      "https://images.unsplash.com/photo-1669829885466-075a9801f2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGRpc3BsYXklMjByYWNrJTIwc2hlbHZlcyUyMGJlYXV0eXxlbnwxfHx8fDE3NzMxNTUyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1669829885466-075a9801f2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGRpc3BsYXklMjByYWNrJTIwc2hlbHZlcyUyMGJlYXV0eXxlbnwxfHx8fDE3NzMxNTUyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1576940339483-54b140a30d47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBzaGVsZiUyMGRpc3BsYXklMjBtb2Rlcm58ZW58MXx8fHwxNzczMTU1MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    facilities: ["Pencahayaan LED", "Kunci Rak", "Display Card"],
    description: "Rak display mini cocok untuk brand kecil yang baru memulai.",
    rating: 4.5,
    reviewCount: 12,
    reviews: [
      {
        id: "r1",
        userName: "Siti Nurhaliza",
        userAvatar:
          "https://images.unsplash.com/photo-1729337531424-198f880cb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHdvbWFuJTIwYXNpYW58ZW58MXx8fHwxNzczMTY3NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 5,
        comment: "Lokasi strategis dan pelayanan sangat baik!",
        date: "2026-03-05",
      },
    ],
    coordinates: { lat: -7.265757, lng: 112.738542 },
    availability: [
      { start: "2026-04-01", end: "2026-06-30" },
      { start: "2026-08-01", end: "2026-12-15" },
    ],
  },
  {
    id: "2",
    name: "Rak B2",
    size: "60cm",
    price: 500000,
    location: "Grand Indonesia, Jakarta",
    category: "kaca-mobil",
    image:
      "https://images.unsplash.com/photo-1576940339483-54b140a30d47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBzaGVsZiUyMGRpc3BsYXklMjBtb2Rlcm58ZW58MXx8fHwxNzczMTU1MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1576940339483-54b140a30d47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBzaGVsZiUyMGRpc3BsYXklMjBtb2Rlcm58ZW58MXx8fHwxNzczMTU1MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1755196712073-a536f713aa45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0JTIwZGlzcGxheSUyMHN0YW5kfGVufDF8fHx8MTc3MzE1NTIzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    facilities: ["Pencahayaan LED", "Kunci Rak", "Display Card", "Cermin"],
    description: "Rak medium dengan fasilitas lengkap untuk brand menengah.",
    rating: 4.7,
    reviewCount: 24,
    reviews: [
      {
        id: "r2",
        userName: "Dewi Lestari",
        userAvatar:
          "https://images.unsplash.com/photo-1729337531424-198f880cb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHdvbWFuJTIwYXNpYW58ZW58MXx8fHwxNzczMTY3NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 5,
        comment: "Fasilitas lengkap dan area nya nyaman!",
        date: "2026-03-08",
      },
    ],
    coordinates: { lat: -6.195157, lng: 106.822857 },
    availability: [
      { start: "2026-03-20", end: "2026-06-20" },
      { start: "2026-07-10", end: "2026-12-31" },
    ],
  },
  {
    id: "3",
    name: "Rak Premium C3",
    size: "100cm",
    price: 800000,
    location: "Plaza Senayan, Jakarta",
    category: "billboard",
    image:
      "https://images.unsplash.com/photo-1755196712073-a536f713aa45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0JTIwZGlzcGxheSUyMHN0YW5kfGVufDF8fHx8MTc3MzE1NTIzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1755196712073-a536f713aa45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0JTIwZGlzcGxheSUyMHN0YW5kfGVufDF8fHx8MTc3MzE1NTIzOHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1760614034530-a0d34463e03d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHN0b3JlJTIwaW50ZXJpb3IlMjBzaGVsdmluZ3xlbnwxfHx8fDE3NzMxNTUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    facilities: [
      "Pencahayaan LED Premium",
      "Kunci Rak",
      "Display Card",
      "Cermin",
      "AC Area",
      "Security 24/7",
    ],
    description: "Rak premium dengan lokasi strategis dan fasilitas terbaik.",
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      {
        id: "r3",
        userName: "Amanda Putri",
        userAvatar:
          "https://images.unsplash.com/photo-1729337531424-198f880cb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHdvbWFuJTIwYXNpYW58ZW58MXx8fHwxNzczMTY3NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 5,
        comment: "Worth it! Sales naik drastis sejak pake rak ini.",
        date: "2026-03-09",
      },
    ],
    coordinates: { lat: -6.227708, lng: 106.799323 },
    availability: [
      { start: "2026-04-15", end: "2026-08-15" },
      { start: "2026-09-01", end: "2026-12-31" },
    ],
  },
  {
    id: "4",
    name: "Rak A4",
    size: "45cm",
    price: 350000,
    location: "Pakuwon Mall, Surabaya",
    category: "rak-display",
    image:
      "https://images.unsplash.com/photo-1760614034530-a0d34463e03d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHN0b3JlJTIwaW50ZXJpb3IlMjBzaGVsdmluZ3xlbnwxfHx8fDE3NzMxNTUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1760614034530-a0d34463e03d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHN0b3JlJTIwaW50ZXJpb3IlMjBzaGVsdmluZ3xlbnwxfHx8fDE3NzMxNTUyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    facilities: ["Pencahayaan LED", "Kunci Rak"],
    description: "Rak mini dengan desain minimalis dan modern.",
    rating: 4.3,
    reviewCount: 8,
    reviews: [],
    coordinates: { lat: -7.287717, lng: 112.737946 },
    availability: [
      { start: "2026-03-10", end: "2026-05-30" },
      { start: "2026-07-01", end: "2026-11-30" },
    ],
  },
  {
    id: "5",
    name: "Rak B5",
    size: "70cm",
    price: 550000,
    location: "Central Park, Jakarta",
    category: "booth",
    image:
      "https://images.unsplash.com/photo-1761474258114-8006f62cd35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBkaXNwbGF5JTIwY29zbWV0aWNzfGVufDF8fHx8MTc3MzE1NTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1761474258114-8006f62cd35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBkaXNwbGF5JTIwY29zbWV0aWNzfGVufDF8fHx8MTc3MzE1NTIzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    facilities: ["Pencahayaan LED", "Kunci Rak", "Display Card", "Cermin", "WiFi"],
    description: "Rak medium dengan lokasi strategis di pusat perbelanjaan.",
    rating: 4.6,
    reviewCount: 19,
    reviews: [],
    coordinates: { lat: -6.177157, lng: 106.790742 },
    availability: [
      { start: "2026-04-05", end: "2026-07-05" },
      { start: "2026-08-10", end: "2026-12-20" },
    ],
  },
  {
    id: "6",
    name: "Rak Premium D6",
    size: "120cm",
    price: 900000,
    location: "Pondok Indah Mall, Jakarta",
    category: "display-lantai",
    image:
      "https://images.unsplash.com/photo-1676570092589-a6c09ecbb373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwYmVhdXR5JTIwcHJvZHVjdHMlMjBzaGVsZnxlbnwxfHx8fDE3NzMxNTUyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1676570092589-a6c09ecbb373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwYmVhdXR5JTIwcHJvZHVjdHMlMjBzaGVsZnxlbnwxfHx8fDE3NzMxNTUyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    facilities: [
      "Pencahayaan LED Premium",
      "Kunci Rak",
      "Display Card",
      "Cermin",
      "AC Area",
      "Security 24/7",
      "Beauty Advisor Stand",
    ],
    description: "Rak premium terbesar dengan semua fasilitas eksklusif.",
    rating: 4.8,
    reviewCount: 42,
    reviews: [],
    coordinates: { lat: -6.265508, lng: 106.783997 },
    availability: [
      { start: "2026-05-01", end: "2026-08-31" },
      { start: "2026-09-15", end: "2026-12-31" },
    ],
  },
];

export interface Booking {
  id: string;
  rackId: string;
  rackName: string;
  rackImage: string;
  startDate: string;
  duration: number;
  totalPrice: number;
  status: "active" | "completed" | "cancelled";
  paymentMethod: string;
}

export const mockBookings: Booking[] = [
  {
    id: "b1",
    rackId: "1",
    rackName: "Rak A1",
    rackImage:
      "https://images.unsplash.com/photo-1669829885466-075a9801f2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGRpc3BsYXklMjByYWNrJTIwc2hlbHZlcyUyMGJlYXV0eXxlbnwxfHx8fDE3NzMxNTUyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    startDate: "2026-03-01",
    duration: 3,
    totalPrice: 900000,
    status: "active",
    paymentMethod: "Transfer Bank",
  },
  {
    id: "b2",
    rackId: "3",
    rackName: "Rak Premium C3",
    rackImage:
      "https://images.unsplash.com/photo-1755196712073-a536f713aa45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0JTIwZGlzcGxheSUyMHN0YW5kfGVufDF8fHx8MTc3MzE1NTIzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    startDate: "2026-01-15",
    duration: 2,
    totalPrice: 1600000,
    status: "completed",
    paymentMethod: "E-Wallet",
  },
];
