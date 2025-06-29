import { HOME_PAGE_QUERY } from '@/sanity/lib/queries/page.query';
import { PageBuilder } from '@/components/PageBuilder';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { Metadata } from 'next';
import {getXmlDataJSON} from "@/lib/products/data";
import {Companies} from "@/lib/products/companies";

export async function generateMetadata(): Promise<Metadata> {
	const data: any = await sanityFetch({ query: HOME_PAGE_QUERY });

	return {
		title: data?.homePage?.seo?.title,
		description: data?.homePage?.seo?.description,
	};
}

export default async function Home() {
	const _data = await getXmlDataJSON(Companies.MARKLI.product_data_url);
	const data: any = await sanityFetch({ query: HOME_PAGE_QUERY });

	console.log(_data?.xml_catalog?.shop[0]);

	return (
		<>
			<PageBuilder content={data?.homePage?.content} />
		</>
	);
}
