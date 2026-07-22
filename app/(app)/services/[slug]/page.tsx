import { defineQuery, PortableText } from 'next-sanity';
import { Card } from '@heroui/card';
import { clsx } from 'clsx';
import { JSX } from 'react';

import { ServiceBreadcrumb } from '@/components/ui/Breadcrumb';
import { ServiceDetails } from '@/components/shared/service';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { getUrlFor } from '@/lib/utils';
import { ProjectList } from '@/components/shared/project';
import { PROJECTS_BY_SERVICE_QUERY } from '@/sanity/lib/queries';
import Section, {
  SectionDescription,
  SectionHeading,
  SectionSubtitle,
  SectionTitle,
} from '@/components/layout/Section';
import { OrderForm } from '@/components/ui/form';
import { FAQSection } from '@/components/shared/faq';
import { SECTION_FIELDS } from '@/sanity/lib/queries/page.query';
import { JsonLd } from '@/components/shared/seo/JsonLd';
import { buildBreadcrumbListJsonLd, buildServiceJsonLd, toAbsoluteUrl } from '@/lib/seo/jsonld';
import { SERVICE_QUERY } from '@/sanity/lib/queries/service.query';
import { PackageCalculator } from '@/components/shared/сalculator';
import { SectionButton } from '@/components/layout/SectionButton';
import NotFound from '@/app/not-found';
import {
  AdvantagesSection,
  ApplicationsSection,
  CalculatorSection,
  ContactsSection,
  CTASection,
  GallerySection,
  HeroSection,
  MaterialsSection,
  PricingSection,
  ProcessSection,
  ProductionSection,
  ProductsSection,
  TestimonialsSection,
} from '../components';
import '@/styles/themes/yellow.css';

type Props = {
  slug: string;
};

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

export async function generateMetadata({ params }: { params: Promise<Props> }) {
  const { slug } = await params;
  const service = await sanityFetch({ query: SERVICE_QUERY, params: await params });
  const { title = '', description = '', ogImage = '' } = service?.seo || {};

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/services/${slug}`;

  if (!service) return {};

  return {
    title: `${title || ''}`,
    description: `${description}`,
    openGraph: {
      title: `${title || ''}`,
      description: `${description}`,
      images: [
        {
          url: ogImage ? ogImage : '/apple-touch-icon.png',
          width: 1200,
          height: 630,
          alt: `Изображение для сервиса ${title || ''}`,
        },
      ],
    },
    twitter: {
      title: `${title || ''}`,
      description: `${description}`,
      images: [ogImage ? ogImage : '/apple-touch-icon.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        'ru-BY': url,
        'ru-RU': 'https://artmarketprint.ru/services/' + slug,
        'x-default': url,
      },
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Props>;
}): Promise<JSX.Element> {
  const { slug } = await params;
  // Fetch data in parallel for better performance
  const [service, faq, relatedProjects] = await Promise.all([
    sanityFetch({ query: SERVICE_QUERY, params: await params }),
    sanityFetch({ query: FAQ_QUERY }),
    sanityFetch({ query: PROJECTS_BY_SERVICE_QUERY, params: await params }),
  ]);
  if (!service) return <NotFound />;
  const relatedProjectsArray = Array.isArray(relatedProjects) ? relatedProjects : [relatedProjects];

  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://artmarketprint.by';
  const canonicalUrl = toAbsoluteUrl(`/services/${slug}`, siteUrl);
  const imageUrl = service?.seo?.ogImage || (service.image ? getUrlFor(service.image) : undefined);

  const breadcrumbJsonLd = buildBreadcrumbListJsonLd([
    { name: 'Главная', url: toAbsoluteUrl('/', siteUrl) },
    { name: 'Услуги', url: toAbsoluteUrl('/services', siteUrl) },
    { name: service.title, url: canonicalUrl },
  ]);

  const serviceJsonLd = buildServiceJsonLd({
    name: service.title,
    description: service.description,
    url: canonicalUrl,
    imageUrl,
    price: service.price,
    priceCurrency: 'BYN',
  });
  console.log('service', service);

  return (
    <>
      <JsonLd id="service-breadcrumbs-jsonld" data={breadcrumbJsonLd} />
      <JsonLd id="service-jsonld" data={serviceJsonLd} />
      {/* Main content wrapper */}
      <HeroSection service={service} />
      <AdvantagesSection />
      <ApplicationsSection />
      <ProductsSection />
      <CalculatorSection />
      <PricingSection />
      <GallerySection items={service?.gallery || []} />
      <ProcessSection />
      <MaterialsSection />
      <ProductionSection />
      {/* <TestimonialsSection /> */}
      <FAQSection
        className="bg-surface"
        faqs={service?.faqs}
        isActive
        title="Частые вопросы"
        description="Ответы до первого звонка."
      />
      <CTASection />
      <ContactsSection />
    </>
  );
}
