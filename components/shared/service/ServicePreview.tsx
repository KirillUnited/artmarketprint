'use client';

import {Card, CardFooter} from '@heroui/card';
import {Link} from '@heroui/link';
import {ProjectTagList} from '@/components/shared/project';
import {Image} from '@heroui/image';
import NextImage from 'next/image';
import {urlFor} from '@/sanity/lib/image';
import clsx from 'clsx';
import {JSX} from 'react';
import {SanityDocument} from 'next-sanity';

export function ServicePreview({service}: {service: SanityDocument}): JSX.Element {
	return (
		<Card shadow="none" isFooterBlurred as={Link} className="h-full group relative mx-2" href={`/services/${service.currentSlug || service.slug?.current}`} radius="sm">
			<div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
				{service?.service_tags?.length > 0 && <ProjectTagList color="primary" tags={service.service_tags} />}
				{service?.category_tags?.length > 0 && <ProjectTagList color="secondary" tags={service.category_tags} />}
			</div>
			{service.imageUrl || service.image ? (
				<Image
					as={NextImage}
					removeWrapper
					alt={service.title}
					className="z-0 w-full h-full object-cover aspect-square"
					radius="sm"
					src={urlFor(service.image).width(320).height(320).url()}
					width={220}
					height={220}
					fallbackSrc="/images/product-no-image.jpg"
				/>
			) : (
				<Image as={NextImage} removeWrapper alt="No image" className="z-0 w-full h-full object-cover aspect-square" radius="sm" src="/images/product-no-image.jpg" width={220} height={220} />
			)}
			<CardFooter className={clsx('absolute bg-white/75 bottom-0 w-full z-10 p-0 backdrop-blur-lg')}>
				<div className="flex flex-col gap-2 p-3 w-full">
					<div className="flex flex-col gap-2">
						<p className="flex flex-col gap-2 font-semibold line-clamp-2 leading-tight" title={service.title}>
							{service.title}
							<span className="text-primary text-xl font-bold line-clamp-1">{service.price}</span>
						</p>
						<p className={clsx('text-xs line-clamp-2', 'grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 overflow-hidden')} title={service.description}>
							<span className="line-clamp-4">{service.description}</span>
						</p>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
