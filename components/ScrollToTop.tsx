"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Scroll to top immediately on mount (page load/reload)
    window.scrollTo(0, 0);

    // Also handle history navigation
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}
