import Section from '@/components/layout/Section';
import ProductsView from '@/components/shared/product/ProductsView';
import {collectCategoriesAndSubcategories} from '@/lib/products/collectCategories';
import {getAllProductsFromSanity} from "@/sanity/lib/product/getAllProductsFromSanity";

export default async function ProductsViewSection() {
	const products = await getAllProductsFromSanity();
	const categoriesWithSubcategories = collectCategoriesAndSubcategories(products);

	return (
		<Section id="products" innerClassname="pt-6 md:pt-6">
			<ProductsView products={products} categories={categoriesWithSubcategories} />
		</Section>
	);
}
