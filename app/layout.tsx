import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://aba-marketplace.com"),
  title: {
    default: "ABA Marketplace - Connect ABA Professionals with Employers",
    template: "%s | ABA Marketplace",
  },
  description: "Find qualified Registered Behavior Technicians (RBT) and Board Certified Behavior Analysts (BCBA) for your ABA therapy organization. Connect with top ABA professionals in the Atlanta area.",
  keywords: ["ABA therapy", "RBT jobs", "BCBA jobs", "behavior analyst", "autism therapy", "ABA professionals", "Atlanta ABA", "behavior technician", "ABA careers", "behavioral health jobs"],
  authors: [{ name: "ABA Marketplace" }],
  creator: "ABA Marketplace",
  publisher: "ABA Marketplace",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aba-marketplace.com",
    title: "ABA Marketplace - Connect ABA Professionals with Employers",
    description: "Find qualified ABA professionals for your organization or discover career opportunities in Applied Behavior Analysis.",
    siteName: "ABA Marketplace",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABA Marketplace - Connect ABA Professionals with Employers",
    description: "Find qualified ABA professionals for your organization or discover career opportunities in Applied Behavior Analysis.",
  },
  icons: {
    icon: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769601522620x869156922294223900/favicon.png",
    shortcut: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769601522620x869156922294223900/favicon.png",
    apple: "https://e47b698e59208764aee00d1d8e14313c.cdn.bubble.io/f1769601522620x869156922294223900/favicon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Hide Next.js development indicator
                function hideNextIndicator() {
                  const indicators = document.querySelectorAll(
                    '#__next-build-watcher, [data-nextjs-toast], [data-nextjs-dialog], .nextjs-toast-root, [class*="__next-build-watcher"]'
                  );
                  indicators.forEach(el => {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                    el.style.opacity = '0';
                    el.style.pointerEvents = 'none';
                  });
                  
                  // Hide any fixed position elements in bottom-left
                  const fixedElements = document.querySelectorAll('div[style*="position: fixed"]');
                  fixedElements.forEach(el => {
                    const style = el.getAttribute('style') || '';
                    if ((style.includes('bottom') && style.includes('left')) || 
                        (style.includes('bottom: 0') && style.includes('left: 0'))) {
                      el.style.display = 'none';
                    }
                  });
                }
                
                // Run immediately and on DOM ready
                if (typeof window !== 'undefined') {
                  hideNextIndicator();
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', hideNextIndicator);
                  }
                  window.addEventListener('load', hideNextIndicator);
                  
                  // Use MutationObserver to catch dynamically added elements
                  const observer = new MutationObserver(hideNextIndicator);
                  observer.observe(document.body, { childList: true, subtree: true });
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
