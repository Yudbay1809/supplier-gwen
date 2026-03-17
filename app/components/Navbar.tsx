"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Boxes,
  FileText,
  LayoutDashboard,
  Menu,
  Search,
  User,
  X,
  Megaphone,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AUTH_EVENT, isAuthed, logout } from "../lib/auth";
import Image from "next/image";
import { stockData } from "../data/stock";
import { kontrabonData } from "../data/kontrabon";
import { trackEvent } from "../lib/analytics";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [authed, setAuthed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isActive = (path: string) => pathname === path;
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/kontrabon", label: "Kontrabon", icon: FileText },
    { href: "/stock", label: "Stok", icon: Boxes },
    { href: "/promosi", label: "Promosi", icon: Megaphone },
  ];

  useEffect(() => {
    const sync = () => setAuthed(isAuthed());
    sync();
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleSearch = (value?: string) => {
    const raw = (value ?? searchQuery).trim();
    if (!raw) return;
    trackEvent("global_search", { query: raw });
    const query = raw.toLowerCase();

    const skuMatch = stockData
      .flatMap((brand) => brand.variants)
      .find((variant) => variant.sku.toLowerCase() === query);
    if (skuMatch) {
      router.push(`/stock/${skuMatch.sku}`);
      setMobileOpen(false);
      return;
    }

    const kontrabonMatch = kontrabonData.find((item) => item.id.toLowerCase() === query);
    if (kontrabonMatch) {
      router.push(`/kontrabon/${kontrabonMatch.id}`);
      setMobileOpen(false);
      return;
    }

    const brandMatch = stockData.find((brand) => brand.brand.toLowerCase() === query);
    if (brandMatch) {
      router.push(`/stock?brand=${encodeURIComponent(brandMatch.brand)}`);
      setMobileOpen(false);
      return;
    }

    const likelyKontrabon = kontrabonData.some((item) =>
      `${item.id} ${item.vendor} ${item.brand}`.toLowerCase().includes(query)
    );
    if (likelyKontrabon) {
      router.push(`/kontrabon?search=${encodeURIComponent(raw)}`);
      setMobileOpen(false);
      return;
    }

    router.push(`/stock?search=${encodeURIComponent(raw)}`);
    setMobileOpen(false);
  };

  const suggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const skuMatches = stockData
      .flatMap((brand) => brand.variants.map((variant) => ({
        type: "SKU",
        label: `${variant.sku} • ${variant.variant}`,
        value: variant.sku,
        href: `/stock/${variant.sku}`,
        meta: variant.warehouse,
      })))
      .filter((item) => item.value.toLowerCase().includes(query) || item.label.toLowerCase().includes(query))
      .slice(0, 4);

    const brandMatches = stockData
      .map((brand) => ({
        type: "Brand",
        label: brand.brand,
        value: brand.brand,
        href: `/stock?brand=${encodeURIComponent(brand.brand)}`,
        meta: "Stok per brand",
      }))
      .filter((item) => item.label.toLowerCase().includes(query))
      .slice(0, 3);

    const kontrabonMatches = kontrabonData
      .map((item) => ({
        type: "Kontrabon",
        label: `${item.id} • ${item.vendor}`,
        value: item.id,
        href: `/kontrabon/${item.id}`,
        meta: item.brand,
      }))
      .filter((item) => item.label.toLowerCase().includes(query))
      .slice(0, 4);

    const vendorMatches = Array.from(
      new Set(kontrabonData.map((item) => item.vendor))
    )
      .map((vendor) => ({
        type: "Vendor",
        label: vendor,
        value: vendor,
        href: `/kontrabon?search=${encodeURIComponent(vendor)}`,
        meta: "Kontrabon",
      }))
      .filter((item) => item.label.toLowerCase().includes(query))
      .slice(0, 3);

    const warehouseMatches = Array.from(
      new Set(stockData.flatMap((brand) => brand.variants.map((variant) => variant.warehouse)))
    )
      .map((warehouse) => ({
        type: "Gudang",
        label: warehouse,
        value: warehouse,
        href: `/stock?search=${encodeURIComponent(warehouse)}`,
        meta: "Lokasi stok",
      }))
      .filter((item) => item.label.toLowerCase().includes(query))
      .slice(0, 3);

    return [...skuMatches, ...kontrabonMatches, ...brandMatches, ...vendorMatches, ...warehouseMatches].slice(0, 8);
  }, [searchQuery]);

  useEffect(() => {
    const updateUnread = () => {
      try {
        const stored = localStorage.getItem("gwen_notifications");
        if (stored) {
          const parsed = JSON.parse(stored) as { status?: string }[];
          const count = Array.isArray(parsed)
            ? parsed.filter((item) => item.status === "unread").length
            : 0;
          setUnreadCount(count);
          return;
        }
      } catch {
        // ignore
      }
      setUnreadCount(0);
    };

    updateUnread();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "gwen_notifications") {
        updateUnread();
      }
    };
    const handleCustom = () => updateUnread();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("gwen-notifications-updated", handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("gwen-notifications-updated", handleCustom);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-[120px]">
        <Link href={authed ? "/dashboard" : "/login"} className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Image
              src="/brand/logo-gwen.png"
              alt="Supplier Gwen"
              width={32}
              height={32}
              className="h-6 w-auto object-contain sm:h-7 md:h-8"
              priority
            />
          </div>
          <span
            className="text-lg text-ink font-poppins sm:text-xl"
          >
            Supplier Gwen
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:ml-6 md:flex group">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-inter transition-all duration-200 group-hover:opacity-60 hover:opacity-100 hover:scale-[1.04] ${
                isActive(item.href)
                  ? "text-brand font-semibold after:scale-x-100"
                  : "text-ink hover:text-brand-dark"
              } after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-200 hover:after:scale-x-100 hover:-translate-y-0.5`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <form
          className="mx-4 hidden w-full max-w-md flex-1 md:flex lg:mx-8"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari SKU, kontrabon, brand..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              aria-label="Pencarian global"
              className="h-10 w-full rounded-lg border-none bg-gray-50 pl-10 pr-4 font-inter outline-none"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-11 z-50 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                {suggestions.map((item) => (
                  <button
                    key={`${item.type}-${item.value}`}
                    type="button"
                    onMouseDown={() => {
                      router.push(item.href);
                      setShowSuggestions(false);
                      setSearchQuery("");
                      setMobileOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-[#F7FFFD]"
                  >
                    <span className="text-ink">
                      {item.label}
                      <span className="ml-2 text-xs text-muted-foreground">{item.meta}</span>
                    </span>
                    <span className="rounded-full bg-[#F3FFFC] px-2 py-0.5 text-[10px] font-inter text-brand-dark">
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CDEEE8] bg-white text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <Link href="/notifications" className="relative hidden sm:block">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <div
                className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand px-1 text-[10px] text-white font-inter"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </div>
            )}
          </Link>

          <Link href="/dashboard">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>

          {authed ? (
            <button
              onClick={() => {
                logout();
                setAuthed(false);
                router.push("/login");
              }}
              className="brand-button rounded-full px-4 py-2 text-sm font-inter sm:px-6"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="brand-button rounded-full px-4 py-2 text-sm font-inter sm:px-6"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-white/80 bg-white/95 px-4 pb-4 pt-3 shadow-[0_16px_30px_rgba(46,35,48,0.08)] md:hidden">
          <div className="mb-3">
            <form
              className="relative"
              onSubmit={(event) => {
                event.preventDefault();
                handleSearch();
              }}
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari SKU, kontrabon, brand..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                aria-label="Pencarian global"
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm font-inter outline-none"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-11 z-50 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                  {suggestions.map((item) => (
                    <button
                      key={`${item.type}-${item.value}`}
                      type="button"
                      onMouseDown={() => {
                        router.push(item.href);
                        setShowSuggestions(false);
                        setSearchQuery("");
                        setMobileOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-[#F7FFFD]"
                    >
                      <span className="text-ink">
                        {item.label}
                        <span className="ml-2 text-xs text-muted-foreground">{item.meta}</span>
                      </span>
                      <span className="rounded-full bg-[#F3FFFC] px-2 py-0.5 text-[10px] font-inter text-brand-dark">
                        {item.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-inter ${isActive(item.href) ? "bg-brand-light text-brand-dark" : "text-ink hover:bg-gray-50"}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Link
              href="/profile"
              onClick={() => setMobileOpen(false)}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-center text-sm font-inter text-ink"
            >
              Profil
            </Link>
            {authed ? (
              <button
                onClick={() => {
                  logout();
                  setAuthed(false);
                  setMobileOpen(false);
                  router.push("/login");
                }}
                className="brand-button flex-1 rounded-xl px-3 py-2 text-sm font-inter"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="brand-button flex-1 rounded-xl px-3 py-2 text-center text-sm font-inter"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

