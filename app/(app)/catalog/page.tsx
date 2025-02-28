import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { siteConfig } from '@/config/site';
import {BrandCard} from '@/components/ui/card';
import { FAQSection } from '@/components/shared/faq';
import ContactUs from '@/components/shared/ContactUs';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { client } from '@/sanity/client';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { CATEGORIES_QUERY, NAVIGATION_QUERY } from '@/sanity/lib/queries';
import Section from '@/components/layout/Section';

const builder = imageUrlBuilder(client);

export default async function CatalogPage() {
    const categories = await getSanityDocuments(CATEGORIES_QUERY);
    const breadcrumbs = (await getSanityDocuments(NAVIGATION_QUERY))[0].links;

    const urlFor = (source: SanityImageSource) => {
        return builder.image(source).url();
    }

    return (
        <>
            <section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                <Image
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

                    {/*<BrandButton as={Link} href="/#categoryList" state="primary" className={'self-center'}>ПОДРОБНЕЕ</BrandButton>*/}
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="mt-10 mb-6">
                        <BaseBreadcrumb items={breadcrumbs} section='catalog' />
                    </div>
                </div>
            </section>
            <Section innerClassname='pt-6 md:pt-6' id="categoryList">
                <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8">
                    {
                        categories.map((category) => (
                            <li key={category.title}>
                                <BrandCard description={category.description} href={`/catalog/${category.currentSlug}`} image={urlFor(category.image)} price={category.price} title={category.title} variant="product" />
                            </li>
                        ))
                    }
                </ul>
            </Section>
            <FAQSection />
            <ContactUs />
        </>
    );
}