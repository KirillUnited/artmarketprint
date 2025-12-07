'use client';
import {Alert} from '@heroui/alert';
import {PriceTable} from '@/components/ui/table';
import Link from 'next/link';
import {Button} from '@heroui/button';
import Image from 'next/image';
import BrandModalOffer from '../../ui/BrandModalOffer';
import {ServiceDetailsProps} from '@/types';
import {memo} from 'react';
import {FC} from 'react';
import {ServiceCarousel} from '@/components/shared/service/ServiceCarousel';
import clsx from 'clsx';

const ServiceAdvantages: FC<{advantages: string[]}> = memo(({advantages}) => (
	<div className="flex flex-col gap-4">
		<h3 className="text-xl md:text-2xl font-bold text-gray-900">Преимущества</h3>
		<ul className="space-y-2 text-gray-600">
			{advantages.map((advantage) => (
				<li key={advantage}>
					<span className="text-primary font-bold">✔</span> {advantage}
				</li>
			))}
		</ul>
	</div>
));
ServiceAdvantages.displayName = 'ServiceAdvantages';

const ServiceRequirements: FC<{layoutRequirements: string}> = memo(({layoutRequirements}) => (
	<div className="flex flex-col gap-4">
		<h3 className="text-xl md:text-2xl font-bold text-gray-900">Дополнительная информация:</h3>
		<Alert className="prose flex-col max-w-full" color="default" icon="info">
			{layoutRequirements}
		</Alert>
	</div>
));
ServiceRequirements.displayName = 'ServiceRequirements';

const ServicePrice: FC<{price: string}> = memo(({price}) => (
	<div className="flex flex-col gap-4">
		<h3 className="text-xl md:text-2xl font-bold text-gray-900">Цены</h3>
		<p className="font-semibold text-secondary text-4xl">{price}</p>
	</div>
));
ServicePrice.displayName = 'ServicePrice';

export const ServiceDetails: FC<ServiceDetailsProps> = memo(({name, description, image, gallery, price, advantages, layoutRequirements, priceTable, paymentMethods, children}) => {
	const hasGallery = Array.isArray(gallery) && gallery?.length > 0;

	return (
		<article className="flex flex-col gap-8 md:gap-16">
			<div className="flex flex-col gap-4 md:gap-6">
				<div className="flex flex-col gap-2">
					<h2 className="text-3xl md:text-4xl font-bold break-words">{name}</h2>
				</div>
				<div
					className={clsx('grid grid-cols-1 gap-8 items-start', {
						['lg:grid-cols-2']: hasGallery,
					})}
				>
					<div className="flex flex-col gap-4 md:gap-6">
						{description && <p className="text-foreground/70 text-balance leading-normal font-light">{description}</p>}

						{Array.isArray(advantages) && advantages?.length > 0 && <ServiceAdvantages advantages={advantages} />}

						<div className="prose max-w-full">{children}</div>
					</div>
					{hasGallery && <ServiceCarousel items={gallery} className={`sticky top-20`} />}
				</div>

				{layoutRequirements && <ServiceRequirements layoutRequirements={layoutRequirements} />}

				{price && <ServicePrice price={price} />}

				{priceTable && <PriceTable items={priceTable} />}
				{paymentMethods && (
					<Alert
						color="warning"
						icon="warning"
						title={`${paymentMethods.title}`}
						description={`${paymentMethods.description}`}
						className="border-1 border-warning-300 shadow-md text-pretty"
						radius="sm"
					/>
				)}
			</div>

			<footer className="flex flex-wrap gap-2 md:gap-4">
				<BrandModalOffer id={name} />
				<Button as={Link} className="bg-brand-gradient text-fill-transparent font-semibold flex-1 min-w-40" color="secondary" href="#contacts" radius="sm" size="md" variant="ghost">
					КОНСУЛЬТАЦИЯ
				</Button>
			</footer>
		</article>
	);
});
ServiceDetails.displayName = 'ServiceDetails';
