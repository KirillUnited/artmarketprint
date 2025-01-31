import Link from 'next/link';
import {Button} from '@heroui/button';

import BrandCard from '../ui/BrandCard';

import {siteConfig} from '@/config/site';
import {BrandCardProps, ServiceDetailsProps} from '@/types';
import BrandButton from '@/components/ui/BrandButton';
import Image from 'next/image';
import BrandModalOffer from '../ui/BrandModalOffer';

export const Services = () => {
	return (
		<section className="relative" id="services">
			<div className="py-10 md:py-20 flex flex-col gap-10">
				<div className="container">
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div className="flex flex-col gap-4 max-w-[652px]">
							<h2 className="text-4xl md:text-5xl leading-[120%] font-bold">{siteConfig.serviceSection.title}</h2>
							<p className="text-base md:text-lg leading-normal font-normal text-foreground/70">{siteConfig.serviceSection.description}</p>
						</div>
						<Button
							as={Link}
							className=" flex-row gap-2 items-center font-semibold text-base md:text-xl px-2 h-auto hidden md:flex"
							color="primary"
							href={siteConfig.serviceSection.href}
							variant="light"
						>
							<span>Смотреть ещё</span>
							<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.70697 16.9496L15.414 11.2426L9.70697 5.53564L8.29297 6.94964L12.586 11.2426L8.29297 15.5356L9.70697 16.9496Z" fill="currentColor" />
							</svg>
						</Button>
					</div>
				</div>
				<div className="container">
					<div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
						{siteConfig?.serviceSection?.items.map((props: BrandCardProps, index) => (
							<BrandCard key={index} {...props} />
						))}
						<Button
							as={Link}
							className="bg-brand-gradient text-fill-transparent font-semibold md:hidden flex"
							color="secondary"
							href={siteConfig.serviceSection.href}
							radius="sm"
							size="lg"
							variant="ghost"
						>
							<span>Смотреть ещё</span>
							<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.70697 16.9496L15.414 11.2426L9.70697 5.53564L8.29297 6.94964L12.586 11.2426L8.29297 15.5356L9.70697 16.9496Z" fill="currentColor" />
							</svg>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export const ServiceDetails = ({name, description, image, price, advantages}: ServiceDetailsProps) => (
	<div className="grid md:grid-cols-2 items-center gap-x-10 gap-y-4">
		<div className="flex flex-col gap-8 md:gap-16">
			<div className="flex flex-col gap-4 md:gap-6">
				<div className="flex flex-col gap-2"><span className="text-gray-600">О услуге</span>
					<h2 className="text-3xl md:text-4xl font-bold hyphens-auto break-words">{name}</h2></div>
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
				{price && (
					<div className="flex flex-col gap-4">
						<h3 className="text-xl md:text-2xl font-bold text-gray-900">Цены</h3>
						<p className="font-semibold text-secondary text-4xl">{price}</p>
					</div>
				)}
			</div>
			<div className="flex flex-wrap gap-2 md:gap-4">
				<BrandModalOffer />

				<Button as={Link} href={'/#contacts'} className="bg-brand-gradient text-fill-transparent font-semibold flex-1 basis-36" color="secondary" radius="sm" size="lg" variant="ghost">
					КОНСУЛЬТАЦИЯ
				</Button>
			</div>
		</div>

		<Image alt={name} className="h-full object-cover flex-1 w-full" height={635} src={`/images/${image}`} width={640} />
	</div>
);
