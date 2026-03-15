"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_EVENT, isAuthed } from "../lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const authed = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") {
        return () => {};
      }
      window.addEventListener(AUTH_EVENT, callback);
      window.addEventListener("storage", callback);
      return () => {
        window.removeEventListener(AUTH_EVENT, callback);
        window.removeEventListener("storage", callback);
      };
    },
    () => isAuthed(),
    () => false
  );

  useEffect(() => {
    if (!authed) {
      const next = encodeURIComponent(pathname || "/");
      router.replace(`/login?next=${next}`);
    }
  }, [authed, pathname, router]);

  if (!authed) {
    return null;
  }

  return <>{children}</>;
}
