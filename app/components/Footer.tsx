"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/80 bg-white/80 backdrop-blur">
      <div className="page-wrap py-12 lg:py-16">
        <div className="mb-8 rounded-[28px] bg-[linear-gradient(135deg,rgba(255,240,246,0.95),rgba(255,255,255,0.96))] p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-dark font-inter">
                Tetap terhubung
              </p>
              <h3 className="text-[#2E2330] font-poppins">
                Siap merencanakan kampanye berikutnya?
              </h3>
            </div>
            <Link
              href="/browse"
              className="brand-button inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-poppins"
            >
              Jelajah Media
            </Link>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <Image
                  src="/brand/logo-gwen.png"
                  alt="Supplier Gwen"
                  width={32}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span
                className="text-xl text-ink font-poppins"
              >
                Supplier Gwen
              </span>
            </Link>
            <p
              className="mb-4 text-sm text-muted-foreground font-inter"
            >
              Platform sewa media promosi terpercaya untuk brand Anda.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <Facebook className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <Instagram className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <Twitter className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-ink font-poppins">
              Tautan Cepat
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/browse"
                  className="text-sm text-muted-foreground font-inter transition-colors hover:text-primary"
                >
                  Jelajah Media
                </Link>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-sm text-muted-foreground font-inter transition-colors hover:text-primary"
                >
                  Kategori
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-muted-foreground font-inter transition-colors hover:text-primary"
                >
                  Cara Kerja
                </a>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground font-inter transition-colors hover:text-primary"
                >
                  Dasbor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-ink font-poppins">
              Bantuan
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground font-inter transition-colors hover:text-primary"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground font-inter transition-colors hover:text-primary"
                >
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground font-inter transition-colors hover:text-primary"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground font-inter transition-colors hover:text-primary"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-ink font-poppins">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span
                  className="text-sm text-muted-foreground font-inter"
                >
                  hello@beautyrack.com
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span
                  className="text-sm text-muted-foreground font-inter"
                >
                  +62 812 3456 7890
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                <span
                  className="text-sm text-muted-foreground font-inter"
                >
                  Jakarta, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200/80 pt-8 text-center">
          <p
            className="text-sm text-muted-foreground font-inter"
          >
            (c) 2026 Supplier Gwen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

