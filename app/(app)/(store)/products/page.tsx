import Image from 'next/image';

import { siteConfig } from '@/config/site';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import Section from '@/components/layout/Section';
import ProductsView from '@/components/shared/product/ProductsView';
import { getAllProductCategories } from '@/sanity/lib/product/getAllProductCategories';
import { getAllProductsFromSanity } from '@/sanity/lib/product/getAllProductsFromSanity';

export default async function ProductsPage(
    {
        searchParams,
    }: {
        searchParams: Promise<{
            query?: string,
            page?: string,
        }>
    }
) {
    // Fetch data in parallel using Promise.all for better performance
    const [categories, breadcrumbs, products] = await Promise.all([
        getAllProductCategories(),
        getSanityDocuments(NAVIGATION_QUERY),
        getAllProductsFromSanity(),
    ]);

    return (
        <>
            <section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                <Image
                    priority
                    alt={siteConfig.catalogSection.title}
                    className="absolute inset-0 object-cover w-full h-full"
                    height={1080}
                    src="/images/catalog-3.jpg"
                    width={1920}
                />
                <div className="container flex flex-col gap-8 max-w-2xl relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-5xl">
                            {'Каталог'}
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            {'Наш каталог товаров'}
                        </p>

                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="mt-10 mb-6">
                        <BaseBreadcrumb items={breadcrumbs[0].links} section='catalog' />
                    </div>
                </div>
            </section>
            <Section id="products" innerClassname='pt-6 md:pt-6'>
                <ProductsView products={products} categories={categories} />
            </Section>
        </>
    );
}