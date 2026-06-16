import Image from 'next/image';

import { siteConfig } from '@/config/site';
import ContactUs from '@/components/shared/ContactUs';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { client } from '@/sanity/client';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { NAVIGATION_QUERY, SERVICES_QUERY } from '@/sanity/lib/queries';
import Section, { SectionHeading } from '@/components/layout/Section';
import { ServiceListItems } from '@/components/shared/service';
import { Search } from '@/components/shared/Search';

export async function generateMetadata() {

	const url = 'https://artmarketprint.by/services';

	return {
		alternates: {
			canonical: url,
			languages: {
				'ru-BY': url,
				'ru-RU': 'https://artmarketprint.ru/services/',
				'x-default': url,
			},
		},
	}
}

export default async function ServicesPage() {
	const services = await getSanityDocuments(SERVICES_QUERY);
	const breadcrumbs = (await client.fetch(NAVIGATION_QUERY))[0].links;

	return (
		<>
			<section>
				<div className="container">
					<div className="mt-10 mb-6">
						<BaseBreadcrumb items={breadcrumbs} section="services" />
					</div>
					<SectionHeading>
						<h1 className="text-3xl font-bold">{siteConfig.serviceSection.title}</h1>
					</SectionHeading>
				</div>
			</section>
			<Section id="serviceList" innerClassname='pt-6 md:pt-10'>
				<ServiceListItems services={services} />
			</Section>
			<ContactUs />
		</>
	);
}