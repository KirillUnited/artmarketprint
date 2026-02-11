'use client';
import {Card, CardFooter} from '@heroui/card';
import Link from 'next/link';
import {Image} from '@heroui/image';
import NextImage from 'next/image';
import {getUrlFor} from '@/lib/utils';
import clsx from 'clsx';
import {Button} from '@heroui/button';
import {ArrowUpRightIcon} from 'lucide-react';
import React from 'react';

interface FeaturedCategoryThumbProps {
	item?: any;
}

export const FeaturedCategoryThumb = ({item}: FeaturedCategoryThumbProps) => {
	return (
		<Card isFooterBlurred as={Link} className="h-full group relative" href={`/categories/${item?.slug?.current || item.currentSlug}`} radius="sm">
			<Image
				as={NextImage}
				isZoomed
				removeWrapper
				alt={item.title}
				className="z-0 w-full h-full object-cover aspect-square"
				radius="sm"
				src={item.imageUrl ? item.imageUrl : item.image ? getUrlFor(item.image) : '/images/product-no-image.jpg'}
				width={0}
				height={0}
				sizes="100vw"
				fallbackSrc="/images/product-no-image.jpg"
				quality={50}
			/>
			<CardFooter className={clsx('absolute bg-black/40 bottom-0 w-full z-10 p-0')}>
				<div className="flex flex-col gap-2 p-3 w-full">
					<div className="flex flex-col gap-2">
						<p className="text-lg font-semibold text-white/80 line-clamp-2 leading-tight" title={item.title}>
							{item.title}
						</p>
						<p className={clsx('text-xs text-white/80', 'grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 overflow-hidden')} title={item.description}>
							<span className="line-clamp-4">{item.description}</span>
						</p>
					</div>
					<Button as={'span'} className="group/button self-start" color="secondary" radius="sm" role="presentation" size="sm">
						<span>Подробнее</span>
						<ArrowUpRightIcon className="group-hover/button:translate-x-1 transition-transform" size={18} />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};
