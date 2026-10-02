import Script from "next/script";
import { analytics } from "../data/content";
import "./globals.css";

// plain Google Fonts stylesheet (next/font/google breaks under Turbopack dev here)
const FONTS =
  "https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Kiwi+Maru:wght@300;400;500&family=Hachi+Maru+Pop&display=swap";

export const metadata = {
  title: "katrinaadewale.dev",
  description: "Katrina Adewale - software engineer, STEM advocate, creator and cat-lover.",
};

export const viewport = { themeColor: "#fbf5e8" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
        {/* hide reveal-on-scroll content only when JS is running, before first paint */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        {analytics.umamiWebsiteId && (
          <Script src="https://cloud.umami.is/script.js" strategy="afterInteractive"
            data-website-id={analytics.umamiWebsiteId} data-domains={analytics.domain} />
        )}
        {analytics.goatcounterCode && (
          <Script src="https://gc.zgo.at/count.js" strategy="afterInteractive"
            data-goatcounter={`https://${analytics.goatcounterCode}.goatcounter.com/count`} />
        )}
      </body>
    </html>
  );
}
