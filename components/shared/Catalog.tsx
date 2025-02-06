import Link from 'next/link';
import {Button} from '@heroui/button';
import imageUrlBuilder from '@sanity/image-url';
import {SanityImageSource} from '@sanity/image-url/lib/types/types';

import BrandCard from '../ui/BrandCard';

import {siteConfig} from '@/config/site';
import {getSanityDocuments} from '@/lib/getData';
import {client} from '@/sanity/client';
import Section, {SectionDescription, SectionHeading, SectionSubtitle, SectionTitle} from '@/components/layout/Section';
import {ArrowUpRightIcon} from 'lucide-react';
import {getUrlFor} from "@/lib/getUrlFor";

const CATEGORIES_QUERY = `*[
  _type == "category"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{title,
    description,
    image, 
    price,
    "currentSlug": slug.current}`;


export const CatalogHeading = ()=> (
	<div className="flex flex-wrap items-end justify-between gap-4">
		<SectionHeading>
			<SectionSubtitle>- каталог -</SectionSubtitle>
			<SectionTitle>{siteConfig.catalogSection.title}</SectionTitle>
			<SectionDescription>{siteConfig.catalogSection.description}</SectionDescription>
		</SectionHeading>
		<Button
			as={Link}
			className="bg-brand-gradient text-fill-transparent font-semibold border-1 hidden lg:flex"
			color="secondary"
			href={siteConfig.catalogSection.href}
			radius="sm"
			size="md"
			target="_blank"
			variant="bordered"
		>
			<span className="leading-none">Все категории</span>
			<ArrowUpRightIcon className="text-secondary" size={18}/>
		</Button>
	</div>
);

export const CategoryList = ({categories}) => (
	<div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
		{categories.map((category) => (
			<BrandCard
				key={category.title}
				description={category.description}
				href={`/catalog/${category.currentSlug}`}
				image={getUrlFor(category.image)}
				price={category.price}
				title={category.title}
				variant="product"
			/>
		))}
	</div>
);

export const Catalog = async () => {
	const categories = await getSanityDocuments(CATEGORIES_QUERY);

	return (
		<Section className="relative" id="catalog" innerClassname="md:pt-0">
			<CatalogHeading />
			<CategoryList categories={categories} />
			<Button
				as={Link}
				className="bg-brand-gradient text-fill-transparent font-semibold border-1 lg:hidden flex"
				color="secondary"
				href={siteConfig.catalogSection.href}
				radius="sm"
				size="md"
				target="_blank"
				variant="bordered"
			>
				<span className="leading-none">Все категории</span>
				<ArrowUpRightIcon className="text-secondary" size={18} />
			</Button>
		</Section>
	);
};
