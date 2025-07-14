import React, {JSX} from 'react';
import Section, {SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from '../../layout/Section';
import {Card, CardFooter} from '@heroui/card';
import clsx from 'clsx';
import Link from 'next/link';
import {Image} from '@heroui/image';
import NextImage from 'next/image';
import {getUrlFor} from '@/lib/utils';
import {Button} from '@heroui/button';
import {ArrowUpRightIcon} from 'lucide-react';
import {SanityDocument} from 'next-sanity';

/**
 * A function that fetches featured categories from Sanity and renders them.
 * @returns {JSX.Element | null} A JSX element or null if no categories are found.
 *
 * This function fetches a list of categories from Sanity using the CATEGORIES_QUERY.
 * It then filters out the categories that are not marked as featured.
 * Finally, it renders a Section component with a CatalogHeading, a FeaturedCategoryList,
 * and a SectionButton.
 */
export interface FeaturedCategoriesProps {
	isActive: boolean;
	services: SanityDocument[];
	title?: string;
	subtitle?: string;
	description?: string;
}

export default async function FeaturedCategories(props: FeaturedCategoriesProps): Promise<JSX.Element | null> {
	// If the component is not active, return null
	if (!props.isActive) return null;
	// If no featured categories are found, return null
	if (!Array.isArray(props.services) || props.services.length === 0) return null;

	const {title, subtitle, description} = props;
	const categoryItemsCount = props.services.length;

	// Render the section
	return (
		<Section className="relative" id="categories">
			{/* Render the heading with title, subtitle, and description */}
			<FeaturedCategoriesHeading title={title} subtitle={subtitle} description={description} />

			{/* Render the list of featured categories */}
			<FeaturedCategoryList items={props.services} />

			{/* If there are more than 4 categories, render a button to view all categories */}
			{categoryItemsCount > 1 && <SectionButton href={`/categories`} label="Все категории" className="self-start" />}
		</Section>
	);
}

const FeaturedCategoriesHeading = ({title, subtitle, description}: {title?: string; subtitle?: string; description?: string}) => {
	return (
		<div className="flex flex-wrap items-end justify-between gap-4">
			<SectionHeading>
				{subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
				{title && <SectionTitle>{title}</SectionTitle>}
				{description && <SectionDescription>{description}</SectionDescription>}
			</SectionHeading>
		</div>
	);
};

interface FeaturedCategoryThumbProps {
	item?: any;
}

export const FeaturedCategoryThumb = ({item}: FeaturedCategoryThumbProps) => {
	console.log(item);
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
				width={220}
				height={220}
				fallbackSrc="/images/product-no-image.jpg"
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

interface FeaturedCategoryListProps {
	items?: any;
}

export const FeaturedCategoryList = ({items}: FeaturedCategoryListProps) => {
	return (
		<ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
			{items?.map((item: any) => (
				<li key={item.title}>
					<FeaturedCategoryThumb item={item} />
				</li>
			))}
		</ul>
	);
};
