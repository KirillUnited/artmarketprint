'use client';

import {Card, CardFooter} from '@heroui/card';
import {Link} from '@heroui/link';
import {Image} from '@heroui/image';
import NextImage from 'next/image';
import clsx from 'clsx';
import {JSX} from 'react';
import {SanityDocument} from 'next-sanity';

import {urlFor} from '@/sanity/lib/image';
import {ProjectTagList} from '@/components/shared/project';
import {CURRENCIES_SYMBOLS} from '@/lib/products/companies';

export function ServicePreview({service}: {service: SanityDocument}): JSX.Element {
	return (
		<Card isFooterBlurred as={Link} className="group relative mx-2 h-full w-full" href={`/services/${service.currentSlug || service.slug?.current}`} radius="sm" shadow="none">
			<div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
				{service?.service_tags?.length > 0 && <ProjectTagList color="primary" tags={service.service_tags} />}
				{service?.category_tags?.length > 0 && <ProjectTagList color="secondary" tags={service.category_tags} />}
			</div>
			{service.imageUrl || service.image ? (
				<Image
					removeWrapper
					alt={service.title}
					as={NextImage}
					className="z-0 aspect-square h-full w-full object-cover"
					fallbackSrc="/images/product-no-image.jpg"
					height={0}
					quality={50}
					radius="sm"
					sizes="100vw"
					src={urlFor(service.image).width(320).height(320).url()}
					width={0}
				/>
			) : (
				<Image removeWrapper alt="No image" as={NextImage} className="z-0 aspect-square h-full w-full object-cover" height={220} radius="sm" src="/images/product-no-image.jpg" width={220} />
			)}
			<CardFooter className={clsx('absolute bottom-0 z-10 w-full bg-white/75 p-0 backdrop-blur-lg')}>
				<div className="flex w-full flex-col gap-2 p-3">
					<div className="flex flex-col gap-2">
						<p className="line-clamp-2 flex flex-col gap-2 leading-tight font-semibold" title={service.title}>
							{service.title}
							<span className="text-primary line-clamp-1 text-xl font-bold">
								{service.price} {CURRENCIES_SYMBOLS['BYN']}
							</span>
						</p>
						<p className={clsx('line-clamp-2 text-xs', 'grid grid-rows-[0fr] overflow-hidden transition-all duration-500 group-hover:grid-rows-[1fr]')} title={service.description}>
							<span className="line-clamp-4">{service.description}</span>
						</p>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
