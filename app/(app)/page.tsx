import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { HOME_PAGE_QUERY } from '@/sanity/lib/queries/page.query';
import { PageBuilder } from '@/components/PageBuilder';
export default async function Home() {
	const data: any = await getSanityDocuments(HOME_PAGE_QUERY);

	return (
		<>
			<PageBuilder content={data?.homePage?.content} />
		</>
	);
}
