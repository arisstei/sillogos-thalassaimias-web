import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroOverlay, { INTRO_SKIP_KEY, INTRO_SEEN_KEY } from "@/components/IntroOverlay";
import { getSiteSettings, getNavPages } from "@/lib/sanity/queries";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "greek"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const title = settings?.title || "Σύλλογος Θαλασσαιμίας Ηρακλείου - Λασιθίου";
  const description =
    settings?.defaultSeo?.metaDescription ||
    settings?.tagline ||
    "Ενημερωτικός ιστότοπος του Συλλόγου Θαλασσαιμίας Ηρακλείου - Λασιθίου.";
  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, navPages] = await Promise.all([
    getSiteSettings().catch(() => null),
    getNavPages().catch(() => []),
  ]);

  const siteTitle = siteSettings?.title || "Σύλλογος Θαλασσαιμίας Ηρακλείου - Λασιθίου";

  return (
    <html
      lang="el"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Αν ο επισκέπτης έχει ήδη παραλείψει το intro, το κρύβουμε πριν ζωγραφιστεί η σελίδα. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('${INTRO_SKIP_KEY}')==='1'||sessionStorage.getItem('${INTRO_SEEN_KEY}')==='1')document.documentElement.setAttribute('data-intro','skip')}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`.intro-overlay{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-[color:var(--color-cream)]">
        <IntroOverlay title={siteTitle} />
        <Header siteSettings={siteSettings} navPages={navPages} />
        <main className="flex-1">{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
