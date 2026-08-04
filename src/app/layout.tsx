import type { Metadata, Viewport } from 'next';

import { site } from '@/core/config/site';
import { displayFont, textFont } from '@/design-system/fonts';
import { colorTokens } from '@/design-system/tokens';

import { Providers } from './Providers';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.owner}, ${site.role}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.owner }],
  creator: site.owner,
  category: 'portfolio',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: 'summary',
    title: site.name,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: colorTokens.ink['950'] },
    { media: '(prefers-color-scheme: light)', color: colorTokens.paper['50'] },
  ],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.owner,
  jobTitle: site.role,
  url: site.url,
  description: `${site.claimLine1} ${site.claimLine2}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${displayFont.variable} ${textFont.variable}`}>
      <body>
        {/* Story gating contract (SCENE-001): flags that JavaScript is live
            before first paint, so elements never flash before the machine
            takes over. No-JS keeps the complete semantic floor. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js='1'" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
