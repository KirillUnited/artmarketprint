import Image from "next/image";
import { siteConfig } from "@/config/site";
import BrandCard from "@/components/ui/BrandCard";
import { FAQ } from "@/components/shared/FAQ";
import Contacts from "@/components/shared/Contacts";
import SocialWidget from "@/components/shared/SocialWidget";
import BaseBreadcrumb from "@/components/ui/Breadcrumb";
import imageUrlBuilder from "@sanity/image-url";
import {client} from "@/sanity/client";
import type {SanityDocument} from "next-sanity";
import {SanityImageSource} from "@sanity/image-url/lib/types/types";
import {getSanityDocuments} from "@/lib/getSanityData";


const CATEGORIES_QUERY = `*[
  _type == "category"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{title,
    description,
    image, 
    price,
    "currentSlug": slug.current}`;
const options = { next: { revalidate: 30 } };
const builder = imageUrlBuilder(client);

export default async function CatalogPage() {
    const categories = await getSanityDocuments(CATEGORIES_QUERY);
    const urlFor = (source: SanityImageSource) => {
        return builder.image(source).url();
    }
    
    return (
        <>
            <section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                <Image
                    priority
                    src="/images/catalog-1.jpeg"
                    alt={siteConfig.catalogSection.title}
                    className="absolute inset-0 object-cover w-full h-full"
                    width={1920}
                    height={1080}
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
            <section id="categoryList" className="py-16">
                <div className="container">
                    <BaseBreadcrumb section='catalog' />
                    <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8 mt-4">
                        {
                            categories.map((category) => (
                                <li key={category.title}>
                                    <BrandCard description={category.description} href={`/catalog/${category.currentSlug}`} image={urlFor(category.image)} price={category.price} title={category.title} variant="product" />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
            <FAQ />
            <Contacts />
            <SocialWidget />
        </>
    );
}