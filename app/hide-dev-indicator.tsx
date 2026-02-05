"use client";

import { useEffect } from "react";

export function HideDevIndicator() {
  useEffect(() => {
    const hideIndicator = () => {
      // Hide by ID
      const byId = document.getElementById("__next-build-watcher");
      if (byId) {
        byId.style.display = "none";
        byId.style.visibility = "hidden";
        byId.style.opacity = "0";
        byId.style.pointerEvents = "none";
        byId.style.height = "0";
        byId.style.width = "0";
      }

      // Hide by data attributes
      const byData = document.querySelectorAll(
        '[data-nextjs-toast], [data-nextjs-dialog], [class*="__next-build-watcher"], [class*="nextjs"]'
      );
      byData.forEach((el) => {
        (el as HTMLElement).style.display = "none";
        (el as HTMLElement).style.visibility = "hidden";
        (el as HTMLElement).style.opacity = "0";
        (el as HTMLElement).style.pointerEvents = "none";
      });

      // Hide fixed position elements in bottom-left (Next.js dev indicator only)
      // Exclude Radix dialogs/sheets - they use role="dialog" or data-state
      const allDivs = document.querySelectorAll("div");
      allDivs.forEach((div) => {
        if (
          div.closest('[role="dialog"]') ||
          div.hasAttribute("data-state") ||
          div.closest("[data-radix-portal]")
        ) {
          return; // Never hide Radix UI dialogs/sheets
        }
        const style = window.getComputedStyle(div);
        if (style.position === "fixed") {
          const rect = div.getBoundingClientRect();
          // Check if it's in bottom-left corner (within 100px of bottom and left)
          if (
            rect.bottom > window.innerHeight - 100 &&
            rect.left < 100 &&
            (div.textContent?.includes("N") || div.textContent?.trim() === "N")
          ) {
            div.style.display = "none";
            div.style.visibility = "hidden";
            div.style.opacity = "0";
            div.style.pointerEvents = "none";
            div.style.height = "0";
            div.style.width = "0";
          }
        }
      });

      // Hide iframes
      const iframes = document.querySelectorAll('iframe[src*="__nextjs"], iframe[src*="nextjs"]');
      iframes.forEach((iframe) => {
        (iframe as HTMLElement).style.display = "none";
      });
    };

    // Run immediately
    hideIndicator();

    // Run on DOM ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", hideIndicator);
    }

    // Run on load
    window.addEventListener("load", hideIndicator);

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      hideIndicator();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "id"],
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
