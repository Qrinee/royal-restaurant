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
    default: 'Royal Restaurant - Restauracja i Catering',
    template: '%s | Royal Restaurant'
  },
  description: 'Royal Restaurant - W Royal Restaurant lubimy świętować razem z Gośćmi. Lubimy stoły, przy których zbiera się rodzina, przyjaciele albo współpracownicy i kiedy pojawiają się toasty i śmiech.',
  keywords: ['restauracja', 'warszawa', 'elegancka restauracja', 'najlepsza restauracja', 'kuchnia', 'rezerwacja stolika', 'uroczystości', 'imprezy okolicznościowe', 'menu', 'dania', 'desery', 'wina', 'obsługa', 'atmosfera', 'lokalizacja', 'opinie', 'kontakt', 'royal restaurant', 'fine dining', 'elegant restaurant', 'best restaurant', 'cuisine', 'table reservation', 'celebrations', 'events', 'menu', 'dishes', 'desserts', 'wines', 'service', 'atmosphere', 'location','contact', 'warsaw restaurant', 'polish cuisine', 'family dining', 'group events', 'romantic dinners', 'business lunches', 'private dining', 'seasonal menu', 'chef\'s specials', 'gourmet experience', 'culinary delights', 'food and wine pairing', 'restaurant reviews', 'dining experience', 'restauracja warszawa', 'kuchnia polska', 'dining with family', 'imprezy grupowe', 'romantyczne kolacje', 'lunch biznesowy', 'prywatne kolacje', 'menu sezonowe', 'specjalności szefa kuchni', 'doświadczenie gourmet', 'kulinarne przysmaki', 'parowanie jedzenia i wina', 'recenzje restauracji', 'doświadczenie kulinarne'],
  authors: [{ name: 'Royal Restaurant' }],
  creator: 'Royal Restaurant',
  publisher: 'Royal Restaurant',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://royal-restaurant.pl',
    siteName: 'Royal Restaurant',
    title: 'W Royal Restaurant lubimy świętować razem z Gośćmi. Lubimy stoły, przy których zbiera się rodzina, przyjaciele albo współpracownicy i kiedy pojawiają się toasty i śmiech.',
    images: [
      {
        url: '/logo.webp',
        alt: 'Royal Restaurant'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Restaurant',
    description: 'W Royal Restaurant lubimy świętować razem z Gośćmi. Lubimy stoły, przy których zbiera się rodzina, przyjaciele albo współpracownicy i kiedy pojawiają się toasty i śmiech.',
    images: ['/logo.webp']
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
      <head>
        <link rel="icon" href="/logo2.webp" type="image/webp" sizes="32x32" />
        <link rel="icon" href="/logo2.webp" type="image/webp" sizes="16x16" />
        <link rel="apple-touch-icon" href="/logo.webp" />
        <meta name="theme-color" content="#323179" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.min.js"></script>
        <SpeedInsights/>
        {children}
      </body>
    </html>
  );
}
