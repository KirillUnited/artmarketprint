import OrderForm from "@/components/ui/OrderForm";
import Image from "next/image";
import { Image as HeroImage } from "@heroui/image";
import { siteConfig } from "@/config/site";
import BaseBreadcrumb from "@/components/ui/Breadcrumb";
import BrandButton from "@/components/ui/BrandButton";
import { ServiceDetails } from "@/components/shared/Services";
import Link from "next/link";
import { client } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText, SanityDocument } from "next-sanity";
import ProductionStepList from "@/components/shared/ProductionStepList";
import { getUrlFor } from "@/lib/utils";

type Props = {
    slug: string
}

export function generateStaticParams() {
    return siteConfig?.serviceSection?.items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Props> }) {
    const { slug: paramsSlug } = await params;
    const data = siteConfig.serviceSection.items.find(({ slug }) => slug === paramsSlug);
    const { title = '', description = '', keywords = '' } = data?.seo || {};

    return {
        title: `${title || ''}`,
        description: `${description}`,
        keywords: `${keywords}`,
        openGraph: {
            title: `${title || ''}`,
            description: `${description}`,
            images: '/apple-touch-icon.png'
        }
    }
}

const SERVICE_QUERY = `*[_type == "completedProjects" && slug.current == $slug][0]`;
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export default async function ProjectPage({ params }: { params: Promise<Props> }) {
    const project = await client.fetch<SanityDocument>(SERVICE_QUERY, await params, options);
    const serviceImageUrl = project.image
        ? urlFor(project.image)?.width(550).height(310).url()
        : null;

    return (
        <>
            <section
                className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                {serviceImageUrl && (
                    <Image
                        priority
                        src={`${serviceImageUrl}`}
                        alt={project.title}
                        className="absolute inset-0 object-cover w-full h-full"
                        width={1920}
                        height={1080}
                    />
                )}
                <div className="container flex flex-col gap-10 max-w-2xl relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-5xl">
                            {project.title}
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            {project.description}
                        </p>
                    </div>

                    <BrandButton as={Link} href={'#projectDetails'} state="primary" className={'self-center'}>УЗНАТЬ</BrandButton>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="my-6">
                        <BaseBreadcrumb section='services' />
                    </div>
                </div>
            </section>
            <section id="projectDetails" className="section relative overflow-hidden pb-10 md:pb-20 pt-3 md:pt-6">
                <div className="container">
                    <ServiceDetails name={project.title} image={getUrlFor(project.image)} price={project.price} advantages={project.advantages}>
                        {Array.isArray(project.body) && <PortableText value={project.body} onMissingComponent={false}/>}
                    </ServiceDetails>
                </div>
            </section>
            <section className="py-10 md:py-20 bg-[#F9F9F9]">
                <div className="container flex flex-col gap-16">

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Примеры работ</h2>
                        
                    </div>
                </div>
            </section>
        </>
    );
}