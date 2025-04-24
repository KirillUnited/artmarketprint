import Link from 'next/link';
import { Button } from '@heroui/button';
import Image from 'next/image';

import BrandModalOffer from '../../ui/BrandModalOffer';

import ServiceListItems from './_ServiceListItems';

import { ServiceDetailsProps } from '@/types';
import Section, {
	SectionButton,
	SectionDescription,
	SectionHeading,
	SectionSubtitle,
	SectionTitle
} from '@/components/layout/Section';
import { SanityDocument } from 'next-sanity';
import { Alert } from '@heroui/alert';
import { PriceTable } from '@/components/ui/table';

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
	link?: { text: string; link: string };
}): Promise<JSX.Element | null> => {
	const { services } = props;

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
			<ServiceListItems services={services} />

			{/* Render the button to view all services if present. */}
			{props.link && <SectionButton className='self-start' href={`${props.link?.link}`} label={props.link?.text} />}
		</Section>
	);
};

export const ServiceDetails = ({ name, description, image, price, advantages, layoutRequirements, priceTable, children }: ServiceDetailsProps) => (
	<article className="flex flex-col gap-8 md:gap-16">
		<div className="flex flex-col gap-4 md:gap-6">
			<div className="flex flex-col gap-2">
				<span className="text-gray-600">О услуге</span>
				<h2 className="text-3xl md:text-4xl font-bold break-words">{name}</h2>
			</div>
			{description && <p className="text-foreground/70 text-balance leading-normal font-light">{description}</p>}
			{advantages && advantages.length > 0 && (
				<div className="flex flex-col gap-4">
					<h3 className="text-xl md:text-2xl font-bold text-gray-900">Преимущества</h3>
					<ul className="space-y-2 text-gray-600">
						{advantages?.map((advantage) => (
							<li key={advantage}>
								<span className="text-primary font-bold">✔</span> {advantage}
							</li>
						))}
					</ul>
				</div>
			)}
			<div className="prose max-w-3xl">{children}</div>
			{layoutRequirements && (
				<div className="flex flex-col gap-4">
					<h3 className="text-xl md:text-2xl font-bold text-gray-900">Дополнительная информация:</h3>
					<Alert className="prose flex-col max-w-full" color="default" icon="info">{layoutRequirements}</Alert></div>
			)}
			{price && (
				<div className="flex flex-col gap-4">
					<h3 className="text-xl md:text-2xl font-bold text-gray-900">Цены</h3>
					<p className="font-semibold text-secondary text-4xl">{price}</p>
				</div>
			)}
			{
				priceTable && (
					<PriceTable items={priceTable} />
				)
			}
		</div>
		<footer className="flex flex-wrap gap-2 md:gap-4">
			<BrandModalOffer id={name} />

			<Button as={Link} className="bg-brand-gradient text-fill-transparent font-semibold flex-1 min-w-40" color="secondary" href={'#contacts'} radius="sm" size="md" variant="ghost">
				КОНСУЛЬТАЦИЯ
			</Button>
		</footer>
	</article>
);
