import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://royal-restaurant.pl'),
  title: {
    default: 'Royal Restaurant - Fine Dining & Elegantna Restauracja',
    template: '%s | Royal Restaurant'
  },
  description: 'Royal Restaurant - ekskluzywna restauracja fine dining. Najlepsza kuchnia fusion w eleganckim wnętrzu. Rezerwacje stolików online. Od 1975 roku.',
  keywords: ['restauracja', 'fine dining', 'elegancka restauracja', 'najlepsza restauracja', 'kuchnia fusion', 'rezerwacja stolika', 'uroczystości', 'imprezy okolicznościowe'],
  authors: [{ name: 'Royal Restaurant' }],
  creator: 'Royal Restaurant',
  publisher: 'Royal Restaurant',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://royal-restaurant.pl',
    siteName: 'Royal Restaurant',
    title: 'Royal Restaurant - Fine Dining & Elegantna Restauracja',
    description: 'Ekskluzywna restauracja fine dining. Najlepsza kuchnia fusion w eleganckim wnętrzu. Rezerwacje stolików online.',
    images: [
      {
        url: '/logo.png',
        alt: 'Royal Restaurant'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Restaurant - Fine Dining',
    description: 'Ekskluzywna restauracja fine dining. Rezerwacje stolików online.',
    images: ['/logo.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <SpeedInsights/>
        {children}
      </body>
    </html>
  );
}
