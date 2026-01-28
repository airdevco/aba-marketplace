"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";

const pages = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Onboarding", path: "/onboarding" },
  { name: "Professional Portal", path: "/professional-portal?tab=dashboard" },
  { name: "Search Jobs", path: "/search" },
  { name: "Employer Portal", path: "/employer-portal?tab=dashboard" },
  { name: "New Listing", path: "/listing/new" },
  { name: "Directory", path: "/directory" },
  { name: "Sample Profile", path: "/profile/1" },
  { name: "Sample Listing", path: "/listing/1" },
];

export default function DevNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentPage = pages.find((p) => {
    const basePath = p.path.split("?")[0];
    return pathname === basePath || pathname.startsWith(basePath + "/");
  }) || { name: pathname, path: pathname };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div
        className="bg-gray-900 text-white rounded-lg shadow-2xl overflow-hidden"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        {isOpen && (
          <div className="max-h-64 overflow-y-auto border-b border-gray-700">
            {pages.map((page) => {
              const basePath = page.path.split("?")[0];
              const isActive = pathname === basePath || pathname.startsWith(basePath + "/");
              return (
                <Link
                  key={page.path}
                  href={page.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                    isActive ? "bg-gray-800 text-blue-400" : "text-gray-300"
                  }`}
                >
                  {page.name}
                </Link>
              );
            })}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-gray-800 transition-colors min-w-[180px]"
        >
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {currentPage.name}
          </span>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}
