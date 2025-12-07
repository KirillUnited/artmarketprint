import Section, {SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from '@/components/layout/Section';
import {SanityDocument} from 'next-sanity';
import {JSX} from 'react';
import {Carousel} from '@/components/shared/carousel';
import {SectionButton} from '@/components/layout/SectionButton';

/**
 * A function that renders a section with a list of services and a button to view all services.
 * @param props - An object with the following properties:
 *   - services: An array of Sanity documents representing services.
 *   - subtitle: An optional subtitle for the section.
 *   - title: An optional title for the section.
 *   - description: An optional description for the section.
 *   - link: An optional object with a text and a link property.
 * @returns A JSX element or null if no services are found.
 */
export const Services = async (props: {
	isActive: boolean;
	services: SanityDocument[];
	subtitle?: string;
	title?: string;
	description?: string;
	link?: {text: string; link: string};
}): Promise<JSX.Element | null> => {
	const {services} = props;

	// If the component is not active, return null
	if (!props.isActive) return null;

	// If no services are found, return null.
	if (!Array.isArray(services) || services.length === 0) {
		return null;
	}

	return (
		<Section className="relative" id="services">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<SectionHeading>
					{/* Render the subtitle, title, and description if present. */}
					{props.subtitle && <SectionSubtitle>{props.subtitle}</SectionSubtitle>}
					{props.title && <SectionTitle>{props.title}</SectionTitle>}
					{props.description && <SectionDescription>{props.description}</SectionDescription>}
				</SectionHeading>
			</div>

			{/* Render the list of services. */}
			<Carousel items={services} type="service" />

			{/* Render the button to view all services if present. */}
			{props.link && <SectionButton className="self-start" href={`${props.link?.link}`} label={props.link?.text} />}
		</Section>
	);
};
