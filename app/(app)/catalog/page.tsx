import Image from "next/image";
import { siteConfig } from "@/config/site";
import BrandCard from "@/components/ui/BrandCard";
import { BrandCardProps } from "@/types";
import { FAQ } from "@/components/shared/FAQ";
import Contacts from "@/components/shared/Contacts";
import SocialWidget from "@/components/shared/SocialWidget";
import BaseBreadcrumb from "@/components/ui/Breadcrumb";
import BrandButton from "@/components/ui/BrandButton";

export default function CatalogPage() {
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

                    <BrandButton state="primary" className={'self-center'}>ЗАКАЗАТЬ</BrandButton>
                </div>
            </section>
            <section className="py-16">
                <div className="container">
                    <BaseBreadcrumb section='catalog' />
                    <div className="grid grid-cols-[var(--grid-template-columns)] gap-8 mt-4">
                        {
                            siteConfig?.catalogSection?.items.map((props: BrandCardProps, index) => (
                                <BrandCard key={index} {...props} />
                            ))
                        }
                    </div>
                </div>
            </section>
            <FAQ />
            <Contacts />
            <SocialWidget />
        </>
    );
}