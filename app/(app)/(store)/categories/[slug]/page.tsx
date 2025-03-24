import Section, { SectionHeading, SectionTitle } from "@/components/layout/Section";
import ProductsView from "@/components/shared/product/ProductsView";
import BaseBreadcrumb from "@/components/ui/Breadcrumb";
import { getProductsByCategory } from "@/lib/actions/product.actions";
import { getSanityDocuments } from "@/lib/fetch-sanity-data";
import { getUrlFor } from "@/lib/utils";
import { client } from "@/sanity/client";
import { CATEGORY_QUERY } from "@/sanity/lib/category.query";
import { NAVIGATION_QUERY } from "@/sanity/lib/page.query";
import { SanityDocument } from "next-sanity";
import Image from "next/image";

export interface Props {
    slug: string,
}
export default async function CategoryPage({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const category: any = await getSanityDocuments(CATEGORY_QUERY, { slug });
    const categoryTitle = category?.title;
    const products = await getProductsByCategory(categoryTitle);
    const breadcrumbs = (await client.fetch<SanityDocument>(NAVIGATION_QUERY))[0].links;
    const categoryImageUrl = await category?.image
        ? getUrlFor(category.image)
        : null;

    if (!Array.isArray(products) || products.length === 0) return <div className="text-center text-2xl my-10 ">Товары не найдены</div>

    return (
        <>
            <section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                {
                    categoryImageUrl && (
                        <Image priority alt={category.title} className="absolute inset-0 object-cover w-full h-full" height={1080} src={`${categoryImageUrl}`} width={1920} />
                    )
                }
                <div className="container flex flex-col gap-10 max-w-4xl relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-6xl">{category.title}</h1>
                        <p className="mt-4 text-xl text-white">{category.description}</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="mt-10 my-6">
                        <BaseBreadcrumb items={breadcrumbs} section='catalog' />
                    </div>
                </div>
            </section>
            <Section innerClassname="pt-0 md:pt-0">
                <SectionHeading>
                    <SectionTitle>{categoryTitle}</SectionTitle>
                </SectionHeading>

                <ProductsView products={products} />
            </Section>
        </>
    )
}
