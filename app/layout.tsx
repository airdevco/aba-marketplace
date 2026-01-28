import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ABA Marketplace",
  description: "ABA Marketplace Application",
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
