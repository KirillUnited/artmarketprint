import Image from "next/image";
import BaseBreadcrumb from "@/components/ui/Breadcrumb";
import BrandButton from "@/components/ui/BrandButton";
import { ServiceDetails } from "@/components/shared/Services";
import Link from "next/link";
import { PortableText, SanityDocument } from "next-sanity";
import { getSanityDocuments } from "@/lib/fetch-sanity-data";
import { NAVIGATION_QUERY, PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import Section from "@/components/layout/Section";
import { ProjectTagList } from "@/components/shared/Projects";
import { client } from "@/sanity/client";

type Props = {
    slug: string
}

export async function generateStaticParams() {
    const projects = await getSanityDocuments(PROJECT_SLUGS_QUERY);

    return projects.map((document) => {
        return {
            projects: document.projects.map((project: SanityDocument) => {
                return {
                    slug: project.slug.current,
                };
            }),
        };
    });
}

export async function generateMetadata({ params }: { params: Promise<Props> }) {
    const data = await getSanityDocuments(PROJECT_QUERY, await params);
    const { title = '', shortDescription = '', keywords = '' } = data?.[0]?.projects[0] || {};

    return {
        title: `${title || ''}`,
        description: `${shortDescription}`,
        keywords: `${keywords}`,
        openGraph: {
            title: `${title || ''}`,
            description: `${shortDescription}`,
            images: '/apple-touch-icon.png'
        }
    }
}

export default async function ProjectPage({ params }: { params: Promise<Props> }) {
    const data = await getSanityDocuments(PROJECT_QUERY, await params);
    const breadcrumbs = (await client.fetch(NAVIGATION_QUERY))[0].links;
    const project = data?.[0]?.projects[0] || {};

    if (!data || data.length === 0) {
        console.warn("Нет данных о проекте");

        return <p className="text-center text-gray-500 mt-10">Нет данных о проекте</p>
    }

    return (
        <>
            <section
                className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                {project.imageUrl && (
                    <Image
                        priority
                        src={`${project.imageUrl}`}
                        alt={project.title}
                        className="absolute inset-0 object-cover w-full h-full"
                        width={1920}
                        height={1080}
                    />
                )}
                <div className="container flex flex-col gap-10 max-w-4xl relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-5xl text-balance">
                            {project.title}
                        </h1>
                        <p className="mt-4 text-xl text-white line-clamp-3">
                            {project.shortDescription}
                        </p>
                    </div>

                    <BrandButton as={Link} href={'#serviceDetails'} state="primary" className={'self-center'}>УЗНАТЬ</BrandButton>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="mt-10 mb-6">
                        <BaseBreadcrumb items={breadcrumbs} section='services' />
                    </div>
                </div>
            </section>
            <Section id="serviceDetails" innerClassname='pt-6 md:pt-6'>
                <div className="flex flex-wrap gap-4 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">Услуги:</p>
                        {
                            project?.service_tags?.length > 0 && (
                                <ProjectTagList tags={project.service_tags} />
                            )
                        }
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">Категории:</p>
                        {
                            project?.category_tags?.length > 0 && (
                                <ProjectTagList tags={project.category_tags} />
                            )
                        }
                    </div>
                </div>
                <ServiceDetails name={project.title} image={project.imageUrl}>
                    {Array.isArray(project.description) && <PortableText value={project.description} onMissingComponent={false} />}
                </ServiceDetails>
            </Section>
        </>
    );
}