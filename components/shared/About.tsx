import Image from 'next/image';
import Section, { SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { PortableText, PortableTextComponents } from 'next-sanity';
import { ContentCTA } from './ContentCTA';

const components: PortableTextComponents = {
	marks: {
		em: ({ children }) => <span className="font-extrabold bg-brand-gradient text-fill-transparent">{children}</span>,
		strong: ({ children }) => <span className="font-extrabold">{children}</span>,
	},
};

interface AboutProps {
	isActive: boolean;
	title?: any;
	subtitle?: string;
	description?: string;
	imageUrl?: string;
	ctaButtonList?: Array<{
		_key?: string;
		buttonType?: string;
		text?: string;
		link?: string;
	}>;
}

/**
 * A function that renders an about section with a title, subtitle, description, image, and CTA buttons.
 * @param props - An object with the following properties:
 *   - isActive: A boolean indicating if the component should be rendered.
 *   - title: The title content to display.
 *   - subtitle: An optional subtitle to display.
 *   - description: An optional description to display.
 *   - imageUrl: An optional image URL to display.
 *   - ctaButtonList: An optional array of CTA buttons.
 * @returns A JSX element or null if the component is not active or required props are missing.
 */
export default function About(props: AboutProps): JSX.Element | null {
	// If the component is not active, return null
	if (!props.isActive) return null;

	if (!props.title || !props.subtitle || !props.description) return null;

	return (
		<Section className="section relative overflow-hidden bg-[#F1F4FA]">
			<div className="grid md:grid-cols-2 items-center gap-8">
				{props.imageUrl && <Image alt={'ArtMarketPrint'} className="max-h-max h-full object-cover flex-1 w-full rounded-small" height={640} src={`${props?.imageUrl}`} width={640} />}
				<div className="flex flex-col gap-8 md:gap-16">
					<SectionHeading className="max-w-full">
						{props.subtitle && <SectionSubtitle>{props.subtitle}</SectionSubtitle>}
						{
							props.title && <SectionTitle>
								<PortableText value={props.title} components={components} />
							</SectionTitle>
						}
						{props.description && <SectionDescription>{props.description}</SectionDescription>}
					</SectionHeading>
					{
						props.ctaButtonList &&
						<ContentCTA buttonList={props.ctaButtonList} />
					}
				</div>
			</div>
		</Section>
	);
}
