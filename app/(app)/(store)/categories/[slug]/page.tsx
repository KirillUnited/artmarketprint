import Section, { SectionHeading, SectionTitle } from "@/components/layout/Section";
import ProductsView from "@/components/shared/product/ProductsView";
import { getProductsByCategory } from "@/lib/actions/product.actions";
import { getSanityDocuments } from "@/lib/fetch-sanity-data";
import { CATEGORY_QUERY } from "@/sanity/lib/category.query";

export interface Props {
    slug: string,
}
export default async function CategoryPage({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const category: any = await getSanityDocuments(CATEGORY_QUERY, { slug });
    const categoryTitle = category?.title;
    const products = await getProductsByCategory(categoryTitle);

    console.log(products);

    if (!Array.isArray(products) || products.length === 0) return <div className="text-center text-2xl mt-10 ">Товары не найдены</div>

    return (
        <Section>
            <SectionHeading>
                <SectionTitle>{slug}</SectionTitle>
            </SectionHeading>

            <ProductsView products={products} />
        </Section>
    )
}
