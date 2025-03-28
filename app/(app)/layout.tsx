import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import React from 'react';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  metadataBase: new URL('https://artmarketprint.by'),
  title: {
    default: `${siteConfig.name} - ArtMarketPrint`,
    template: `%s | ${siteConfig.name} - ArtMarketPrint`,
  },
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: `${siteConfig.name || ''}`,
    description: `${siteConfig.description}`,
    images: ['/apple-touch-icon.png'],
    type: 'website',
    locale: 'ru',
    siteName: 'Art Market Print',
		url: 'https://artmarketprint.by',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name || ''}`,
    description: `${siteConfig.description}`,
    images: ['/apple-touch-icon.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background text-foreground font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster richColors position='top-center' />
        </Providers>
      </body>
    </html>
  );
}
