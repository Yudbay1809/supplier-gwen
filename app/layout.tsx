import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Supplier Gwen",
  keywords: ["supplier", "kontrabon", "stok", "promosi", "gwen", "dashboard"],
  title: {
    default: "Supplier Gwen",
    template: "%s | Supplier Gwen",
  },
  description: "Platform supplier untuk pantau kontrabon, stok per brand, dan promosi Gwen.",
  openGraph: {
    title: "Supplier Gwen | Dashboard Supplier",
    description: "Platform supplier untuk pantau kontrabon, stok per brand, dan promosi Gwen.",
    url: siteUrl,
    siteName: "Supplier Gwen",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/brand/og-supplier-gwen.svg",
        width: 512,
        height: 512,
        alt: "Supplier Gwen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supplier Gwen | Dashboard Supplier",
    description: "Platform supplier untuk pantau kontrabon, stok per brand, dan promosi Gwen.",
    images: ["/brand/og-supplier-gwen.svg"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: "Supplier Gwen | Dashboard Supplier",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/brand/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/brand/favicon-32x32.png",
    apple: "/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2EC9B7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
