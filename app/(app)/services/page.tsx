import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

import { siteConfig } from '@/config/site';
import BrandCard from '@/components/ui/card';
import { FAQSection } from '@/components/shared/faq';
import ContactUs from '@/components/shared/ContactUs';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { client } from '@/sanity/client';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { NAVIGATION_QUERY, SERVICES_QUERY } from '@/sanity/lib/queries';
import Section from '@/components/layout/Section';

const builder = imageUrlBuilder(client);

export default async function ServicesPage() {
	const services = await getSanityDocuments(SERVICES_QUERY);
	const breadcrumbs = (await client.fetch(NAVIGATION_QUERY))[0].links;
	const urlFor = (source: SanityImageSource) => {
		return builder.image(source).url();
	}

	return (
		<>
			<section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
				<Image priority alt={`${siteConfig?.seo?.title}`} className="absolute inset-0 object-cover w-full h-full" height={1080} src="/images/service-2.jpg" width={1920} />
				<div className="container flex flex-col gap-8 max-w-2xl relative z-10">
					<div className="text-center">
						<h1 className="text-4xl font-extrabold text-background sm:text-5xl">{siteConfig.serviceSection.title}</h1>
						<p className="mt-4 text-xl text-white">{siteConfig.serviceSection.description}</p>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="mt-10 mb-6">
						<BaseBreadcrumb items={breadcrumbs} section="services" />
					</div>
				</div>
			</section>
			<Section innerClassname='pt-6 md:pt-6' id="serviceList">
				<ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
					{services.map((service) => (
						<li key={service.title}>
							<BrandCard
								description={service.description}
								href={`/services/${service.currentSlug}`}
								image={urlFor(service.image)}
								price={service.price}
								title={service.title}
								variant="service"
							/>
						</li>
					))}
				</ul>
			</Section>
			<FAQSection />
			<ContactUs />
		</>
	);
}