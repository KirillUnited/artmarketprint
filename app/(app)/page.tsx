import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { HOME_PAGE_QUERY } from '@/sanity/lib/page.query';
import { PageBuilder } from '@/components/PageBuilder';
import Script from 'next/script';

export default async function Home() {
	const data: any = await getSanityDocuments(HOME_PAGE_QUERY);

	if (!Array.isArray(data?.homePage?.content) || data?.homePage.length === 0) {
		console.warn('Нет данных о главной странице');

		return null;
	}

	return (
		<>
			<PageBuilder content={data?.homePage?.content} />
			<Script
			async
			src="https://static.elfsight.com/platform/platform.js"
			strategy="lazyOnload"
			/>
			<div data-elfsight-app-lazy className="elfsight-app-7f56de0f-7490-4845-801c-cf32d1a5aeb1" />
		</>
	);
}
