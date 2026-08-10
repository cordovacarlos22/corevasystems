"use client";

import { useEffect } from "react";

// The root layout renders <html lang="en"> because it sits above the
// [lang] route segment and can't read the active locale directly. This
// keeps the lang attribute correct for /es pages (screen readers,
// translation tools, and search engines all rely on it).
export default function HtmlLangSync({ lang }) {
  useEffect(() => {
    if (lang && document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return null;
}
