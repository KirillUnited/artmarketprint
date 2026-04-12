import '@/styles/globals.css';
import {Metadata, Viewport} from 'next';
import clsx from 'clsx';
import React from 'react';


declare global {
	interface Window {
		dataLayer: Record<string, any>[];
	}
}

const GTM_ID = 'GTM-NR2HZ5DC';

import Script from 'next/script';

import {siteConfig} from '@/config/site';
import {fontSans} from '@/config/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {Toaster} from '@/components/ui/sonner';
import {LocalBusinessJsonLd} from '@/config/ld-json';

import {Providers} from './(app)/providers';

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://artmarketprint.by';
const SITE_LOCALE = process.env.NEXT_PUBLIC_LOCALE || 'ru_BY';

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
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
		locale: SITE_LOCALE,
		siteName: 'ArtMarketPrint',
		url: SITE_URL,
	},
	twitter: {
		card: 'summary_large_image',
		title: `${siteConfig.name || ''}`,
		description: `${siteConfig.description}`,
		images: ['/apple-touch-icon.png'],
	},
	alternates: {
		canonical: SITE_URL,
		languages: {
			'ru-BY': SITE_URL,
			'ru-RU': 'https://artmarketprint.ru/',
			'x-default': SITE_URL,
		},
	},
	verification: {
		google: '8YlcgzL83D40BFHx5ZMIaLjwHnFMG_kQ9XU_GJa4AaI',
		yandex: 'ab836662e7e48a90',
		other: {
			'algolia-site-verification': '04FE8CF3E01395C5',
		},
	},
};

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html suppressHydrationWarning lang="ru">
			<body className={clsx('min-h-screen bg-background text-foreground font-sans antialiased light', fontSans.variable)}>
				{/* Google Tag Manager (noscript) */}
				<noscript>
					<iframe height="0" src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} style={{display: 'none', visibility: 'hidden'}} title="Google Tag Manager" width="0" />
				</noscript>
				{/* End Google Tag Manager (noscript) */}
				<Providers themeProps={{attribute: 'class', defaultTheme: 'light'}}>
					<div className="min-h-screen flex flex-col">
						<Header />
						<main className="grow">{children}</main>
						<Footer />
					</div>
				</Providers>
				<Toaster richColors position="top-center" />
				<script dangerouslySetInnerHTML={{__html: JSON.stringify(LocalBusinessJsonLd)}} type="application/ld+json" />
				{/* <!-- Google tag (gtag.js) --> */}
				<Script src="https://www.googletagmanager.com/gtag/js?id=G-RB8S8ECQ97" strategy="afterInteractive" />
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
