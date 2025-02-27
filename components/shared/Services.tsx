import Link from 'next/link';
import {Button} from '@heroui/button';
import Image from 'next/image';
import {SanityImageSource} from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';
import {ArrowUpRightIcon} from 'lucide-react';

import BrandCard from '../ui/BrandCard';
import BrandModalOffer from '../ui/BrandModalOffer';

import {siteConfig} from '@/config/site';
import {ServiceDetailsProps} from '@/types';
import {client} from '@/sanity/client';
import {getSanityDocuments} from '@/lib/fetch-sanity-data';
import Section, {SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from '@/components/layout/Section';

export const Services = async () => {
	const services = await getSanityDocuments();
	const builder = imageUrlBuilder(client);
	const urlFor = (source: SanityImageSource) => {
		return builder.image(source).url();
	};

	return (
		<Section className="relative" id="services">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<SectionHeading>
					<SectionSubtitle>наши услуги печати</SectionSubtitle>
					<SectionTitle>Популярные услуги</SectionTitle>
					<SectionDescription>{siteConfig.serviceSection.description}</SectionDescription>
				</SectionHeading>
				<Button
					as={Link}
					className="bg-brand-gradient text-fill-transparent font-semibold border-1 hidden lg:flex"
					color="secondary"
					href={siteConfig.serviceSection.href}
					radius="sm"
					size="md"
					target="_blank"
					variant="bordered"
				>
					<span className="leading-none">Все услуги</span>
					<ArrowUpRightIcon className="text-secondary" size={18} />
				</Button>
			</div>

			<div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
				{services.map((service) => (
					<BrandCard
						key={service.title}
						description={service.description}
						href={`/services/${service.currentSlug}`}
						image={urlFor(service.image)}
						price={service.price}
						title={service.title}
						variant="service"
					/>
				))}
			</div>

			<Button
				as={Link}
				className="bg-brand-gradient text-fill-transparent font-semibold border-1 lg:hidden flex"
				color="secondary"
				href={siteConfig.serviceSection.href}
				radius="sm"
				size="md"
				target="_blank"
				variant="bordered"
			>
				<span className="leading-none">Все услуги</span>
				<ArrowUpRightIcon className="text-secondary" size={18} />
			</Button>
		</Section>
	);
};

export const ServiceDetails = ({name, description, image, price, advantages, children}: ServiceDetailsProps) => (
	<div className="grid md:grid-cols-2 items-center gap-12">
		{image && <Image alt={name} className="h-full object-cover w-full aspect-video" height={640} src={`${image}`} width={640} />}
		<div className="flex flex-col gap-8 md:gap-16">
			<div className="flex flex-col gap-4 md:gap-6">
				<div className="flex flex-col gap-2">
					<span className="text-gray-600">О услуге</span>
					<h2 className="text-3xl md:text-4xl font-bold hyphens-auto break-words">{name}</h2>
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
				<article className="prose text-balance">{children}</article>
				{price && (
					<div className="flex flex-col gap-4">
						<h3 className="text-xl md:text-2xl font-bold text-gray-900">Цены</h3>
						<p className="font-semibold text-secondary text-4xl">{price}</p>
					</div>
				)}
			</div>
			<div className="flex flex-wrap gap-2 md:gap-4">
				<BrandModalOffer />

				<Button as={Link} className="bg-brand-gradient text-fill-transparent font-semibold flex-1 basis-36" color="secondary" href={'#contacts'} radius="sm" size="lg" variant="ghost">
					КОНСУЛЬТАЦИЯ
				</Button>
			</div>
		</div>
	</div>
);
