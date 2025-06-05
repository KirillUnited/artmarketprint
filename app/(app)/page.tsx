import { HOME_PAGE_QUERY } from '@/sanity/lib/queries/page.query';
import { PageBuilder } from '@/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const data: any = await sanityFetch({ query: HOME_PAGE_QUERY });

	return {
		title: data?.homePage?.seo?.title,
		description: data?.homePage?.seo?.description,
	};
}

export default async function Home() {
	const data: any = await sanityFetch({ query: HOME_PAGE_QUERY });

	return (
		<>
			<PageBuilder content={data?.homePage?.content} />
		</>
	);
}
