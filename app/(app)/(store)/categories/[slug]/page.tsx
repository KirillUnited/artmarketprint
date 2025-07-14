import Section, { SectionHeading, SectionTitle } from "@/components/layout/Section";
import ProductsView from "@/components/shared/product/ProductsView";
import { getCTAButton } from "@/components/ui/BrandButton";
import BaseBreadcrumb from "@/components/ui/Breadcrumb";
import { getSanityDocuments } from "@/sanity/lib/fetch-sanity-data";
import { getUrlFor } from "@/lib/utils";
import { client } from "@/sanity/client";
import { CATEGORY_QUERY } from "@/sanity/lib/queries/category.query";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import { Button } from "@heroui/button";
import {ArrowLeftIcon, ArrowUpRightIcon, ShoppingCartIcon} from "lucide-react";
import {PortableText, SanityDocument} from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { getAllProductsByCategory } from "@/sanity/lib/product/getAllProductsByCategory";
import { ProductsNotFound } from "@/components/shared/product";
import ProductSearchForm from "@/components/shared/product/ProductSearchForm";
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import {collectCategoriesAndSubcategories} from "@/lib/products/collectCategories";

export interface Props {
    slug: string,
}
export async function generateMetadata({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const category = await sanityFetch({ query: CATEGORY_QUERY, params: { slug } });
    const { title = '', description = '' } = category?.seo || {};

    const url = `https://artmarketprint.by/categories/${slug}`;

    return {
        title: `${title || ''}`,
        description: `${description}`,
        openGraph: {
            title: `${title || ''}`,
            description: `${description}`,
            images: '/apple-touch-icon.png'
        },
        alternates: {
            canonical: url,
        },
    }
}

const ctaButtonList = [
    {
        _key: "1",
        buttonType: "ctaModal",
        text: "Заказать печать",
    },
    {
        _key: "2",
        buttonType: "secondary",
        text: "Все Услуги",
        link: "/services",
    }
];

export default async function CategoryPage({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const category: any = await getSanityDocuments(CATEGORY_QUERY, { slug });
    const categoryTitle = category?.title;
    const products = await getAllProductsByCategory(categoryTitle);
    const breadcrumbs = (await client.fetch<SanityDocument>(NAVIGATION_QUERY))[0].links;
    const categoryImageUrl = await category?.image
        ? getUrlFor(category.image)
        : null;

    if (!Array.isArray(products) || products.length === 0) {
        return (
            <ProductsNotFound />
        );
    }

    const categoriesWithSubcategories = collectCategoriesAndSubcategories(products);

    return (
        <>
            <section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-black/70">
                {
                    categoryImageUrl && (
                        <Image priority alt={category.title} className="absolute inset-0 object-cover w-full h-full" height={1080} src={`${categoryImageUrl}`} width={1920} />
                    )
                }
                <div className="container flex flex-col gap-10 max-w-4xl relative z-10">
                    <article className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-6xl">{category.title}</h1>
                        <p className="mt-4 text-lg text-white text-pretty">{category.description}</p>
                    </article>
                    {
                        ctaButtonList.length > 0
                        &&
                        <footer className="flex flex-col md:flex-row gap-4">
                            {
                                getCTAButton(ctaButtonList[0]._key, ctaButtonList[0].buttonType as 'cta' | 'secondary' | 'ctaModal', ctaButtonList[0].text, '', 'md', category.title)}
                            <Button as={Link} href={ctaButtonList[1].link} className="uppercase" color="default" size="md" radius="sm">
                                {ctaButtonList[1].text}
                                <ArrowUpRightIcon className="text-secondary group-hover:translate-x-1 transition-transform" size={18} />
                            </Button>
                        </footer>
                    }

                </div>
            </section>
            <section>
                <div className="container">
                    <div className="mt-10 my-6">
                        <BaseBreadcrumb items={breadcrumbs} section='catalog' />
                    </div>
                </div>
            </section>
            {category.body && (
                <Section innerClassname='pt-0 md:pt-0'>
                    <div className='prose max-w-full'><PortableText value={category.body}/></div>
                </Section>
            )}
            <Section id="products" innerClassname="pt-0 md:pt-0">
                <>
                    <SectionTitle><span className='font-normal'>Товары в категории</span><br/>{categoryTitle}</SectionTitle>
                    <div className="flex flex-col md:flex-row gap-2 w-full">
                        <ProductSearchForm />
                        <Button className='border-1' as={Link} href="/products" radius='sm' variant='bordered'>
                            <ShoppingCartIcon size='18' />
                            <span>Все товары</span>
                        </Button>
                    </div>
                </>

                <ProductsView products={products} categories={categoriesWithSubcategories} />
            </Section>
        </>
    )
}
