import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { HOME_PAGE_QUERY } from '@/sanity/lib/page.query';
import { PageBuilder } from '@/components/PageBuilder';

export default async function Home() {
	const data: any = await getSanityDocuments(HOME_PAGE_QUERY);

	if (!Array.isArray(data?.homePage?.content) || data?.homePage.length === 0) {
		console.warn('Нет данных о главной странице');

		return null;
	}

	return (
		<>
			<PageBuilder content={data?.homePage?.content} />
		</>
	);
}
