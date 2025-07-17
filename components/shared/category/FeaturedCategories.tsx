import React, {JSX} from 'react';
import Section, {SectionButton} from '../../layout/Section';
import {SanityDocument} from 'next-sanity';
import {FeaturedCategoriesHeading} from "@/components/shared/category/ui";
import {Carousel} from "@/components/shared/carousel";

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
			<Carousel items={props.services} type='category' />

			{/* If there are more than 4 categories, render a button to view all categories */}
			{categoryItemsCount > 1 && <SectionButton href={`/categories`} label="Все категории" className="self-start" />}
		</Section>
	);
}