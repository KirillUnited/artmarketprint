import '@/styles/globals.css';
import '@/styles/currency.css';
import {Metadata, Viewport} from 'next';
import clsx from 'clsx';
import React from 'react';

import {siteConfig} from '@/config/site';
import {fontInter, fontSans} from '@/config/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {Toaster} from '@/components/ui/sonner';
import {buildLocalBusinessJsonLd} from '@/config/ld-json';
import {JsonLd} from '@/components/shared/seo/JsonLd';
import {buildWebSiteJsonLd} from '@/lib/seo/jsonld';
import ClarityInit from '@/components/shared/clarity/ClarityInit';
import {SITE_SETTINGS_QUERY} from '@/sanity/lib/queries/site.query';
import {sanityFetch} from '@/sanity/lib/sanityFetch';
import {GoogleTagManager} from '@next/third-parties/google';

import {Providers} from './(app)/providers';

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://artmarketprint.by';
const SITE_LOCALE = process.env.NEXT_PUBLIC_LOCALE || 'ru_BY';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '';
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'production';
const IS_STAGING = APP_ENV === 'staging';

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: `${siteConfig.seo.title} - ArtMarketPrint`,
		template: `%s - ArtMarketPrint`,
	},
	description: siteConfig.seo.description,
	keywords: siteConfig.seo.keywords,
	icons: {
		icon: '/favicon.ico',
	},
	openGraph: {
		title: `${siteConfig.seo.title || ''}`,
		description: `${siteConfig.seo.description}`,
		images: ['/apple-touch-icon.png'],
		type: 'website',
		locale: SITE_LOCALE,
		siteName: 'ArtMarketPrint',
		url: SITE_URL,
	},
	twitter: {
		card: 'summary_large_image',
		title: `${siteConfig.seo.title || ''}`,
		description: `${siteConfig.seo.description}`,
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
	robots: IS_STAGING
		? {
				index: false,
				follow: false,
				googleBot: {
					index: false,
					follow: false,
					noimageindex: true,
				},
			}
		: {
				index: true,
				follow: true,
			},
};

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
	const siteSettings: any = await sanityFetch({query: SITE_SETTINGS_QUERY});
	const structuredDataEnabled = siteSettings?.seo?.structuredDataEnabled !== false && !IS_STAGING;
	const webSiteJsonLd = buildWebSiteJsonLd({
		url: SITE_URL,
		name: 'ArtMarketPrint',
	});
	const localBusinessJsonLd = buildLocalBusinessJsonLd({
		url: SITE_URL,
		contactInfo: siteSettings?.siteContactInfo,
	});

	return (
		<html suppressHydrationWarning lang="ru">
			{/* Google Tag Manager */}
			<GoogleTagManager gtmId={GTM_ID} />
			<head>
				{/* <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','${GTM_ID}');`}}></script> */}
				{structuredDataEnabled && (
					<>
						<JsonLd id="localbusiness-jsonld" data={localBusinessJsonLd} />
						<JsonLd id="website-jsonld" data={webSiteJsonLd} />
					</>
				)}
			</head>
			<body className={clsx('bg-background text-foreground light min-h-screen font-sans antialiased', fontSans.variable, fontInter.variable)}>
				{/* Google Tag Manager (noscript) */}
				<noscript>
					<iframe height="0" src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} style={{display: 'none', visibility: 'hidden'}} title="Google Tag Manager" width="0" />
				</noscript>
				{/* End Google Tag Manager (noscript) */}
				<ClarityInit enabled={!IS_STAGING} projectId={CLARITY_PROJECT_ID} />
				<Providers themeProps={{attribute: 'class', defaultTheme: 'light'}}>
					<div className="flex min-h-screen flex-col">
						<Header />
						<main className="grow">{children}</main>
						<Footer />
					</div>
				</Providers>
				<Toaster richColors position="top-center" />
			</body>
		</html>
	);
}
