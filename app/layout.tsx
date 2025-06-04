import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import React from 'react';

import { Providers } from './(app)/providers';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import Script from 'next/script';
import { LocalBusinessJsonLd } from '@/config/ld-json';

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
  alternates: {
    canonical: 'https://artmarketprint.by',
  },
  verification: {
    google: '8YlcgzL83D40BFHx5ZMIaLjwHnFMG_kQ9XU_GJa4AaI',
    yandex: 'ab836662e7e48a90',
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
      <head>
        {/* Yandex.Metrika counter */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
               (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                ym(101251200, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });

            `,
          }}
        />
      </head>
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
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/101251200"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LocalBusinessJsonLd) }}
        />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RB8S8ECQ97"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RB8S8ECQ97');
          `}
        </Script>
      </body>
    </html>
  );
}
