import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PrayerTimesProvider } from "@/lib/prayer-times";
import TopBar from "@/components/TopBar";
import LiveBanner from "@/components/LiveBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuranPlayer from "@/components/QuranPlayer";
import RevealOnScroll from "@/components/RevealOnScroll";
import { REVEAL_BOOTSTRAP } from "@/lib/reveal";
import { getQuranAudioCatalog } from "@/lib/quran-audio";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Arabic text (the greeting and surah names); Cormorant and Instrument Sans have no Arabic glyphs.
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

// KFGQPC Uthmanic Script Hafs (King Fahd Glorious Quran Printing Complex), the Madinah
// Mushaf typeface used by quran.com — for the homepage greeting.
const uthmanic = localFont({
  src: "./fonts/UthmanicHafs1Ver18.woff2",
  variable: "--font-uthmanic",
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "IABAT",
  description: "Islamic Ahlulbayt Association of the Triangle",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const quranAudio = await getQuranAudioCatalog();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
      </head>
      <body className={`${cormorant.variable} ${instrument.variable} ${amiri.variable} ${uthmanic.variable} antialiased`}>
        <PrayerTimesProvider>
          <div className="min-h-screen bg-cream">
            <LiveBanner />
            <TopBar />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
          <RevealOnScroll />
          {quranAudio && <QuranPlayer surahs={quranAudio.surahs} reciters={quranAudio.reciters} />}
        </PrayerTimesProvider>
      </body>
    </html>
  );
}
