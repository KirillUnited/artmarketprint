import { SanityDocument } from 'next-sanity';

import { BrandCard } from '../ui/card';

import { siteConfig } from '@/config/site';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import Section, {
	SectionButton,
	SectionDescription,
	SectionHeading,
	SectionSubtitle,
	SectionTitle
} from '@/components/layout/Section';
import { getUrlFor } from '@/lib/utils';
const CATEGORIES_QUERY = `*[
  _type == "category"
  && defined(slug.current)
]|order(publishedAt desc)[0...4]{title,
    description,
    image, 
    price,
    "currentSlug": slug.current}`;

export const CatalogHeading = ({ categoryItemsCount }: { categoryItemsCount: number }) => (
	<div className="flex flex-wrap items-end justify-between gap-4">
		<SectionHeading>
			<SectionSubtitle>каталог</SectionSubtitle>
			<SectionTitle>{siteConfig.catalogSection.title}</SectionTitle>
			<SectionDescription>{siteConfig.catalogSection.description}</SectionDescription>
		</SectionHeading>

		{categoryItemsCount > 4 && <SectionButton className="hidden lg:flex" href={siteConfig.catalogSection.href} label="Все категории" />}
	</div>
);

export const CategoryList = ({ categories }: { categories: SanityDocument[] }) => (
	<ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
		{categories.map((category: SanityDocument) => (
			<li key={category.title}>
				<BrandCard
					description={category.description}
					href={`/catalog/${category.currentSlug}`}
					image={getUrlFor(category.image)}
					price={category.price}
					title={category.title}
					variant="product"
				/>
			</li>
		))}
	</ul>
);

export const Catalog = async () => {
	const categories: SanityDocument[] = await getSanityDocuments(CATEGORIES_QUERY);
	const categoryItemsCount = categories.length;

	return (
		<Section className="relative" id="catalog">
			<CatalogHeading categoryItemsCount={categoryItemsCount} />
			{categories && <CategoryList categories={categories} />}

			{categoryItemsCount > 4 && <SectionButton className="lg:hidden flex" href={siteConfig.catalogSection.href} label="Все категории" />}
		</Section>
	);
};
