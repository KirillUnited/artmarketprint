import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

import { siteConfig } from '@/config/site';
import BrandCard from '@/components/ui/BrandCard';
import { FAQ } from '@/components/shared/FAQ';
import Contacts from '@/components/shared/Contacts';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { client } from '@/sanity/client';
import {getSanityDocuments} from '@/lib/getData';
import {InstagramFeedSection} from '@/components/shared/InstagramFeed';

const SERVICES_QUERY = `*[
  _type == "service"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{title,
    description,
    image, 
    price,
    "currentSlug": slug.current}`;
const builder = imageUrlBuilder(client);

export default async function ServicesPage() {
    const services = await getSanityDocuments(SERVICES_QUERY);
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
			<section className="py-16" id="serviceList">
				<div className="container">
					<BaseBreadcrumb section="services" />
					<ul className="grid grid-cols-[var(--grid-template-columns)] gap-8 mt-4">
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
				</div>
			</section>
			<FAQ />
			<Contacts />
			<InstagramFeedSection/>
		</>
	);
}