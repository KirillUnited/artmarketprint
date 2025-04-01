import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { siteConfig } from '@/config/site';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { CATEGORIES_QUERY } from '@/sanity/lib/category.query';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import NextImage from 'next/image';
import React from 'react';
import Section from '@/components/layout/Section';
import { FeaturedCategoryList } from '@/components/shared/category';

export default async function CategoriesPage() {
    const categories = await getSanityDocuments(CATEGORIES_QUERY);
    const breadcrumbs = (await getSanityDocuments(NAVIGATION_QUERY))[0].links;

    return (
        <>
            <section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                <NextImage
                    priority
                    alt={siteConfig.catalogSection.title}
                    className="absolute inset-0 object-cover w-full h-full"
                    height={1080}
                    src="/images/catalog-1.jpeg"
                    width={1920}
                />
                <div className="container flex flex-col gap-8 max-w-2xl relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-5xl">
                            {siteConfig.catalogSection.title}
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            {siteConfig.catalogSection.description}
                        </p>

                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="mt-10 mb-6">
                        <BaseBreadcrumb items={breadcrumbs} section='catalog' />
                    </div>
                </div>
            </section>
            <Section id="categoryList" innerClassname='pt-6 md:pt-6'>
                <FeaturedCategoryList items={categories} />
            </Section>
        </>
    );
}
