import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import { defineQuery, PortableText, SanityDocument } from 'next-sanity';

import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import BrandButton from '@/components/ui/BrandButton';
import { ServiceDetails } from '@/components/shared/service';
import { client } from '@/sanity/client';
import { getUrlFor } from '@/lib/utils';
import { ProjectList, ProjectsHeading } from '@/components/shared/project';
import { NAVIGATION_QUERY, PROJECTS_BY_SERVICE_QUERY } from '@/sanity/lib/queries';
import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { OrderForm } from '@/components/ui/form';
import { Card } from '@heroui/card';
import { clsx } from 'clsx';
import { FAQSection } from '@/components/shared/faq';
import { SECTION_FIELDS } from '@/sanity/lib/queries/page.query';
import ServiceJsonLd from '@/components/ServiceJsonLd';

type Props = {
    slug: string
}

const SERVICE_QUERY = '*[_type == "service" && slug.current == $slug][0]';
const FAQ_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
    homePage->{
      content[][_type == "faqs"] {
          _key,
          _type,
          ${SECTION_FIELDS},
          faqs[]->,
      }
    }
  }`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const service = await client.fetch<SanityDocument>(SERVICE_QUERY, await params, options);
    const { title = '', description = '' } = service || {};

    const url = `https://artmarketprint.by/services/${slug}`;

    return {
        title: `${title || ''}`,
        description: `${description}`,
        keywords: `${title.split(' ').join(', ')}, ${description.split(' ').join(', ')}`,
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

export default async function ServicePage({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const service = await client.fetch<SanityDocument>(SERVICE_QUERY, await params, options);
    const breadcrumbs = (await client.fetch(NAVIGATION_QUERY))[0].links;
    const faq = await client.fetch<SanityDocument>(FAQ_QUERY, {}, options);
    const serviceImageUrl = service.image
        ? urlFor(service.image)?.width(1200).height(400).url()
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
                        <p className="mt-4 text-xl text-white text-balance">
                            {service.description}
                        </p>
                    </div>

                    <BrandButton as={Link} className={'self-center'} href={'#serviceDetails'} state="primary">Подробнее</BrandButton>
                </div>
            </section>
            <div className='max-w-3xl mx-auto'>
                <section>
                    <div className="container">
                        <div className="mt-10 mb-6">
                            <BaseBreadcrumb items={breadcrumbs} section="services" />
                        </div>
                    </div>
                </section>
                <Section id="serviceDetails" innerClassname='pt-6 md:pt-6'>
                    <ServiceDetails advantages={service.advantages} image={getUrlFor(service.image)} name={service.title} price={service.price}
                        layoutRequirements={service.layoutRequirements && <PortableText value={service.layoutRequirements} onMissingComponent={false} />}
                        priceTable={service.priceTable}
                    >
                        {Array.isArray(service.body) && <PortableText value={service.body} onMissingComponent={false} />}
                    </ServiceDetails>
                </Section>
            </div>
            <Section className="bg-[#F9F9F9]">
                <div className='max-w-3xl w-full mx-auto flex flex-col gap-6 px-4'>
                    <SectionHeading className='items-center text-center mx-auto'>
                        <SectionSubtitle>{'галерея'}</SectionSubtitle>
                        <SectionTitle>{'Примеры работ'}</SectionTitle>
                        <SectionDescription>{'Портфолио выполненных работ'}</SectionDescription>
                    </SectionHeading>

                    <ProjectList bentoGrid={false} projectList={relatedProjectsArray} />

                    <SectionButton className='lg:hidden flex' href={'/projects'} label="Все проекты" />
                </div>
            </Section >
            <FAQSection className='bg-[#F9F9F9]' {...faq.homePage.content[0]} />
            <Section id="contacts" className='max-w-3xl mx-auto'>
                <SectionHeading className='items-center text-center mx-auto'>
                    <SectionSubtitle>{'обратная связь'}</SectionSubtitle>
                    <SectionTitle>{'Оставить заявку'}</SectionTitle>
                    <SectionDescription>{'Оставьте заявку и мы свяжемся с Вами в ближайшее время'}</SectionDescription>
                </SectionHeading>
                <Card className={clsx(
                    'flex flex-col gap-6',
                    'p-4 bg-background sticky top-16'
                )} radius='sm' shadow='sm'>
                    <OrderForm className="w-full" />
                </Card>
            </Section>

            <ServiceJsonLd name={service.title} url={`https://artmarketprint.by/services/${slug}`} description={service.description} />
        </>
    );
}