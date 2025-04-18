import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { HOME_PAGE_QUERY } from '@/sanity/lib/queries/page.query';
import { PageBuilder } from '@/components/PageBuilder';
import { client } from '@/sanity/client';
const DOC_TYPE = 'product';
export default async function Home() {
	const data: any = await getSanityDocuments(HOME_PAGE_QUERY);
	try {
		// Fetch all document IDs of the specified type
		const docs = await client.fetch<{_id: string}[]>(
		  `*[_type == $type]{_id}`,
		  { type: DOC_TYPE }
		);
	
		if (docs.length === 0) {
		  console.log(`No documents of type "${DOC_TYPE}" found.`);
		  return;
		}
	
		console.log(`All documents of type "${DOC_TYPE}" : ${docs.length}.`);
	  } catch (err) {
		console.error('Error deleting documents:', err);
	  }

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
