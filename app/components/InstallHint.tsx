"use client";

import { useEffect, useState } from "react";

export default function InstallHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 5000);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="install-hint">
      Tambahkan ke layar utama untuk akses cepat.
    </div>
  );
}
