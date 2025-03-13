import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText, SanityDocument } from 'next-sanity';

import { siteConfig } from '@/config/site';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import BrandButton from '@/components/ui/BrandButton';
import { ServiceDetails } from '@/components/shared/service';
import { client } from '@/sanity/client';
import { getUrlFor } from '@/lib/utils';
import { ProjectList, ProjectsHeading } from '@/components/shared/project';
import { NAVIGATION_QUERY, PROJECTS_BY_SERVICE_QUERY } from '@/sanity/lib/queries';
import Section, { SectionButton } from '@/components/layout/Section';
import { OrderForm } from '@/components/ui/form';

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

const SERVICE_QUERY = '*[_type == "service" && slug.current == $slug][0]';
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export default async function ServicePage({ params }: { params: Promise<Props> }) {
    const service = await client.fetch<SanityDocument>(SERVICE_QUERY, await params, options);
    const breadcrumbs = (await client.fetch(NAVIGATION_QUERY))[0].links;
    const serviceImageUrl = service.image
        ? urlFor(service.image)?.width(550).height(310).url()
        : null;

    const relatedProjects = await client.fetch<SanityDocument>(PROJECTS_BY_SERVICE_QUERY, await params, options);
    const relatedProjectsArray = Array.isArray(relatedProjects) ? relatedProjects : [relatedProjects];

    return (
        <>
            <section
                className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
                {serviceImageUrl && (
                    <Image
                        priority
                        alt={service.title}
                        className="absolute inset-0 object-cover w-full h-full"
                        height={1080}
                        src={`${serviceImageUrl}`}
                        width={1920}
                    />
                )}
                <div className="container flex flex-col gap-10 max-w-2xl relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-background sm:text-5xl">
                            {service.title}
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            {service.description}
                        </p>
                    </div>

                    <BrandButton as={Link} className={'self-center'} href={'#serviceDetails'} state="primary">Подробнее</BrandButton>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="mt-10 mb-6">
                        <BaseBreadcrumb items={breadcrumbs} section="services" />
                    </div>
                </div>
            </section>
            <Section id="serviceDetails" innerClassname='pt-6 md:pt-6'>
                <ServiceDetails advantages={service.advantages} image={getUrlFor(service.image)} name={service.title} price={service.price}>
                    {Array.isArray(service.body) && <PortableText value={service.body} onMissingComponent={false} />}
                </ServiceDetails>
            </Section>
            <Section className="bg-[#F9F9F9]">
                <ProjectsHeading description={'Портфолио выполненных работ'} subtitle={'галерея'} title='Примеры работ' />

                <ProjectList bentoGrid={false} projectList={relatedProjectsArray} />

                <SectionButton className='lg:hidden flex' href={'/projects'} label="Все проекты" />
            </Section >
            <Section id="contacts">
                <OrderForm />
            </Section>
        </>
    );
}