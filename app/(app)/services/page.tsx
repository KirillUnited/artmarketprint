import Image from "next/image";
import { siteConfig } from "@/config/site";
import BrandCard from "@/components/ui/BrandCard";
import { BrandCardProps } from "@/types";
import { FAQ } from "@/components/shared/FAQ";
import Contacts from "@/components/shared/Contacts";
import SocialWidget from "@/components/shared/SocialWidget";
import BaseBreadcrumb from "@/components/ui/Breadcrumb";

import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "service"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;
const options = { next: { revalidate: 30 } };

export default async function ServicesPage() {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

    return (
        <>
            <section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                <Image
                    priority
                    src="/images/service-2.jpg"
                    alt="УФ-печать"
                    className="absolute inset-0 object-cover w-full h-full"
                    width={1920}
                    height={1080}
                />
                <div className="container flex flex-col gap-8 max-w-2xl relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-5xl">
                            {siteConfig.serviceSection.title}
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            {siteConfig.serviceSection.description}
                        </p>

                    </div>

                    {/*<BrandButton as={Link} href="/#serviceList" state="primary" className={'self-center'}>ЗАКАЗАТЬ</BrandButton>*/}
                </div>
            </section>
            <section id="serviceList" className="py-16">
                <div className="container">
                    <BaseBreadcrumb section='services' />
                    <ul className="grid grid-cols-[var(--grid-template-columns)] gap-8 mt-4">
                        {/* {
                            siteConfig?.serviceSection?.items.map((props: BrandCardProps, index) => (
                                <BrandCard key={index} {...props} />
                            ))
                        } */}
                        {
                            posts.map((post) => (
                                <li key={post._id}>
                                    <BrandCard title={post.title} variant="service" price="" description="" image="" href={`/services/${post.slug.current}`} />
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