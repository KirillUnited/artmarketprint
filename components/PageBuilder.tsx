import { Fragment } from 'react';

import { FeaturedProducts } from '@/components/shared/product/FeaturedProducts';

import { Hero } from '@/components/shared/hero/Hero';
import { FeaturesSection } from '@/components/shared/FeaturesSection';
import { Services } from '@/components/shared/service';
import About from '@/components/shared/About';
import { Projects } from '@/components/shared/project/Projects';
import { InstagramFeedSection } from '@/components/shared/socials/InstagramFeed';
import { FAQSection } from '@/components/shared/faq';
import ContactUs, { MapFrame } from '@/components/shared/ContactUs';
import { FeaturedCategories } from './shared/category';

interface PageBuilderProps {
	content?: any;
}

export function PageBuilder({ content }: PageBuilderProps) {
	if (!Array.isArray(content)) {
		return null;
	}

	return (
		<>
			{content.map((block) => {
				switch (block._type) {
					case 'hero':
						return (
							<Fragment key={block._key}>
								<Hero />
								<FeaturesSection />
							</Fragment>
						);
					case 'serviceList':
						return (
							<Fragment key={block._key}>
								<Services {...block} />
								<FeaturedProducts />
							</Fragment>
						);
					case 'categoryList':
						return <FeaturedCategories key={block._key} {...block} />;
					case 'imageTextBlock':
						return <About key={block._key} {...block} />;
					case 'projectList':
						return (
							<Fragment key={block._key}	>
								<Projects {...block} className='bg-[#F1F4FA]' />
								<InstagramFeedSection id="instagram" />
							</Fragment>
						);
					case 'faqs':
						return <FAQSection key={block._key} className="bg-[#F1F4FA]" />;
					case 'contactUsBlock':
						return (
							<Fragment key={block._key}>
								<ContactUs className="bg-background" id="contacts" />
								<MapFrame />
							</Fragment>
						);
					default:
						// This is a fallback for when we don't have a block type
						return <div key={block._key}>Block not found: {block._type}</div>;
				}
			})}
		</>
	);
}
