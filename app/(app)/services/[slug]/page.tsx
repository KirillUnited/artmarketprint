import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';
import { defineQuery, PortableText } from 'next-sanity';
import { Card } from '@heroui/card';
import { clsx } from 'clsx';

import { ServiceBreadcrumb } from '@/components/ui/Breadcrumb';
import { ServiceDetails, ServiceHero } from '@/components/shared/service';
import { client } from '@/sanity/client';
import { sanityFetch } from "@/sanity/lib/sanityFetch";
import { getUrlFor } from '@/lib/utils';
import { ProjectList } from '@/components/shared/project';
import { PROJECTS_BY_SERVICE_QUERY } from '@/sanity/lib/queries';
import Section, { SectionButton, SectionDescription, SectionHeading, SectionSubtitle, SectionTitle } from '@/components/layout/Section';
import { OrderForm } from '@/components/ui/form';
import { FAQSection } from '@/components/shared/faq';
import { SECTION_FIELDS } from '@/sanity/lib/queries/page.query';
import ServiceJsonLd, { BreadcrumbListJsonLd } from '@/components/ServiceJsonLd';
import { SERVICE_QUERY } from '@/sanity/lib/queries/service.query';

type Props = {
    slug: string
}

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


export async function generateMetadata({ params }: { params: Promise<Props> }) {
    const { slug } = await params;
    const service = await sanityFetch({query: SERVICE_QUERY, params: await params});
    const { title = '', description = '' } = service?.seo || {};

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
    // Fetch data in parallel for better performance
    const [service, faq, relatedProjects] = await Promise.all([
        sanityFetch({query: SERVICE_QUERY, params: await params}),
        sanityFetch({query: FAQ_QUERY}),
        sanityFetch({query: PROJECTS_BY_SERVICE_QUERY, params: await params})
    ]);
    const serviceImageUrl = service.image
        ? urlFor(service.image)?.width(1200).height(400).url()
        : null;
    const relatedProjectsArray = Array.isArray(relatedProjects) ? relatedProjects : [relatedProjects];

    return (
        <>
            {/* Hero section with background image and gradient overlay */}
            <ServiceHero
                description={service.description}
                image={serviceImageUrl || ''}
                mediaBlock={service.mediaBlock}
                title={service.title}
            />

            {/* Main content wrapper */}
            <div className='max-w-3xl mx-auto'>
                {/* Breadcrumb navigation */}
                <section>
                    <div className="container">
                        <div className="mt-10 mb-6">
                            <BreadcrumbListJsonLd name={service.title} />
                            <ServiceBreadcrumb service='Услуги' serviceSlug='services' title={service.title}  />
                        </div>
                    </div>
                </section>

                {/* Service details section */}
                <Section id="serviceDetails" innerClassname='pt-6 md:pt-6'>
                    <ServiceDetails
                        advantages={service.advantages}
                        image={getUrlFor(service.image)}
                        layoutRequirements={service.layoutRequirements &&
                            <PortableText value={service.layoutRequirements} onMissingComponent={false} />
                        }
                        name={service.title}
                        paymentMethods={service.paymentOptions}
                        price={service.price}
                        priceTable={service.priceTable}
                    >
                        {Array.isArray(service.body) &&
                            <PortableText value={service.body} onMissingComponent={false} />
                        }
                    </ServiceDetails>
                </Section>
            </div>

            {/* Portfolio section */}
            <Section className="bg-[#F9F9F9]">
                <div className='max-w-3xl w-full mx-auto flex flex-col gap-6 px-4'>
                    <SectionHeading className='items-center text-center mx-auto'>
                        <SectionSubtitle>{'галерея'}</SectionSubtitle>
                        <SectionTitle>{'Примеры работ'}</SectionTitle>
                        <SectionDescription>{'Портфолио выполненных работ'}</SectionDescription>
                    </SectionHeading>

                    <ProjectList bentoGrid={false} projectList={relatedProjectsArray} />

                    {/* Mobile-only projects button */}
                    <SectionButton className='lg:hidden flex' href={'/projects'} label="Все проекты" />
                </div>
            </Section>

            {/* FAQ section */}
            <FAQSection className='bg-[#F9F9F9]' {...faq.homePage.content[0]} />

            {/* Contact form section */}
            <Section className='max-w-3xl mx-auto' id="contacts">
                <SectionHeading className='items-center text-center mx-auto'>
                    <SectionSubtitle>{'обратная связь'}</SectionSubtitle>
                    <SectionTitle>{'Оставить заявку'}</SectionTitle>
                    <SectionDescription>{'Оставьте заявку и мы свяжемся с Вами в ближайшее время'}</SectionDescription>
                </SectionHeading>
                <Card className={clsx(
                    'flex flex-col gap-6',
                    'p-4 bg-background sticky top-16'
                )} radius='sm' shadow='sm'>
                    <OrderForm className="w-full" />
                </Card>
            </Section>

            {/* Structured data for service */}
            <ServiceJsonLd
                description={service.description}
                name={service.title}
                url={`https://artmarketprint.by/services/${slug}`}
            />
        </>
    );
}