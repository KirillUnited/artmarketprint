// noinspection JSAnnotator

import React from 'react';
import Image from 'next/image';
import { Button } from '@heroui/button';
import Link from 'next/link';
import clsx from 'clsx';
import { ShoppingCartIcon } from 'lucide-react';

import BrandModalOffer from '../BrandModalOffer';

import { BrandCardProps } from '@/types';
import { ProjectTagList } from '@/components/shared/project';

export const BrandCardLink = ({ href }: { href: string }) => (
	<Button
		as={Link}
		className={clsx(
			'self-center',
			'group',
			'border-small rounded-small'
		)}
		color="primary"
		href={href}
		variant="bordered"
	>
		<span>Подробнее</span>
		<svg className="group-hover:translate-x-1 transition-all" fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
			<path d="M9.70697 16.9496L15.414 11.2426L9.70697 5.53564L8.29297 6.94964L12.586 11.2426L8.29297 15.5356L9.70697 16.9496Z" fill="currentColor" />
		</svg>
	</Button>
);
export const BrandCardFooter = ({ variant, href, buttonLabel }: { variant: string; href: string, buttonLabel?: string }) => (
	<>
		{/* {variant === 'service' && (
			<div className="flex flex-row gap-2 items-center">
				<BrandCardLink href={href} />
			</div>
		)} */}
		{variant === 'product' && (
			<div className="flex flex-wrap gap-3 items-center justify-center border-t-1 border-foreground/20 pt-6 overflow-hidden">
				{/* <BrandCardLink href={href} /> */}
				<BrandModalOffer buttonLabel={buttonLabel || ''} icon={<ShoppingCartIcon size={18} />} />
			</div>
		)}
	</>
);

export default function BrandCard({
	title,
	variant,
	price,
	description,
	image,
	tags,
	href,
	imageFit = 'cover',
	className,
	buttonLabel
}: BrandCardProps) {
	return (
		<div className={clsx(
			'h-full overflow-hidden rounded-small shadow-small hover:shadow-large transition-all flex flex-col group relative',
			className
		)}>
			<div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
				{tags && <ProjectTagList color='warning' tags={tags} />}
			</div>
			<Link
				className={clsx('overflow-hidden', {
					'absolute inset-0': variant === 'service',
				})}
				href={`${href}`}
				title={title}
			>
				{
					image &&
					<picture>
						<Image
							alt={title}
							className={clsx('w-full group-hover:scale-110 transition-all duration-400', {
								'object-cover': imageFit === 'cover',
								'object-contain': imageFit === 'contain',
								'h-full': variant === 'service',
								'aspect-square max-h-60': variant === 'product',
							})}
							height={320}
							src={`${image}`}
							width={270}
						/>
					</picture>
				}
			</Link>
			<div
				className={clsx('p-4 flex flex-col gap-4', {
					'bg-background flex-1 ': variant === 'product',
					'bg-product-gradient relative min-h-[50%] grow-0 mt-auto': variant === 'service',
				})}
			>
				<Link className={clsx(
					'flex flex-col gap-1 grow',
					{
						'pt-20': variant === 'service'
					}
				)} href={href || ''}
					title={title}
				>
					<span className="text-xl md:text-2xl text-primary font-semibold">{price}</span>
					<h3 className="leading-[120%] font-semibold line-clamp-2" title={`${title} - ${price}`}>
						{title}
					</h3>
					<p className="text-xs text-foreground/90 leading-normal font-medium line-clamp-2" title={description}>{description}</p>
				</Link>
				{variant === 'product' && <BrandCardFooter buttonLabel={buttonLabel || ''} href={href || ''} variant={variant || ''} />}
			</div>
		</div>
	);
}
