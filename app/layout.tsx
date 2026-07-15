import type { Metadata } from 'next';
import { Bodoni_Moda, Libre_Franklin } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/config/site';
import './globals.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-bodoni',
  display: 'swap',
  // No fallback-metric override data exists for this display face; disabling
  // the auto-adjustment silences a build warning with negligible CLS impact.
  adjustFontFallback: false,
});

const franklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-franklin',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Outskirts Saloon — Everybody's Hometown Bar | Prescott, AZ",
    template: '%s · Outskirts Saloon',
  },
  description:
    "Outskirts Saloon — everybody's hometown bar in Prescott, Arizona. Live music, cold drinks, open late. 444 W Goodwin St, one block off Whiskey Row.",
  applicationName: 'Outskirts Saloon',
  keywords: [
    'Outskirts Saloon',
    'Prescott bar',
    'Whiskey Row',
    'live music Prescott',
    'Prescott Arizona bar',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Outskirts Saloon',
    locale: 'en_US',
    url: site.url,
    title: "Outskirts Saloon — Everybody's Hometown Bar",
    description:
      "Everybody's hometown bar in downtown Prescott, Arizona. Live music, cold drinks, open late.",
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: "Outskirts Saloon — Everybody's Hometown Bar, Prescott AZ",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Outskirts Saloon — Everybody's Hometown Bar",
    description:
      "Everybody's hometown bar in downtown Prescott, Arizona. Live music, cold drinks, open late.",
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${franklin.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
