import {Hero} from '@/components/shared/hero/Hero';
import {Benefits} from '@/components/shared/Benefits';
import {Services} from '@/components/shared/Services';
import {Catalog} from '@/components/shared/Catalog';
import About from '@/components/shared/About';
import {Projects} from '@/components/shared/Projects';
import {InstagramFeedSection} from '@/components/shared/InstagramFeed';
import {FAQSection} from '@/components/shared/faq';
import ContactUs, {MapFrame} from '@/components/shared/ContactUs';
import {Fragment} from "react";

interface PageBuilderProps {
	content?: any;
}

export function PageBuilder({content}: PageBuilderProps) {
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
								<Benefits />
							</Fragment>
						);
					case 'serviceList':
						return <Services key={block._key} />;
					case 'categoryList':
						return <Catalog key={block._key} />;
					case 'imageTextBlock':
						return <About key={block._key} />;
					case 'projectList':
						return (
							<Fragment key={block._key}	>
								<Projects />
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
