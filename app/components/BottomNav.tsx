"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, Package, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/browse", icon: Package, label: "Media" },
    { path: "/favorites", icon: Heart, label: "Favorit" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/80 bg-white/92 shadow-[0_-10px_30px_rgba(46,35,48,0.08)] backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.path ||
            (item.path === "/browse" && pathname.startsWith("/media")) ||
            (item.path === "/dashboard" && pathname === "/");

          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex h-full flex-1 flex-col items-center justify-center transition-colors"
            >
              <div
                className={`mb-1 flex h-10 w-10 items-center justify-center rounded-2xl ${isActive ? "bg-brand-light" : "bg-transparent"}`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-brand" : "text-muted-foreground"}`} />
              </div>
              <span
                className={`text-xs font-inter ${isActive ? "text-brand" : "text-muted-foreground"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

