import { JSX } from 'react';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { getUrlFor } from '@/lib/utils';
import { PROJECTS_BY_SERVICE_QUERY } from '@/sanity/lib/queries';
import { FAQSection } from '@/components/shared/faq';
import { JsonLd } from '@/components/shared/seo/JsonLd';
import { buildBreadcrumbListJsonLd, buildServiceJsonLd, toAbsoluteUrl } from '@/lib/seo/jsonld';
import { RELATED_SERVICES_QUERY, SERVICE_QUERY } from '@/sanity/lib/queries/service.query';
import { PackageCalculator } from '@/components/shared/сalculator';
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
import { Fade, SectionEyebrow } from '../components/primitives';

type Props = {
  slug: string;
};

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
  const [service, services] = await Promise.all([
    sanityFetch({ query: SERVICE_QUERY, params: await params }),
    // sanityFetch({ query: PROJECTS_BY_SERVICE_QUERY, params: await params }),
    sanityFetch({ query: RELATED_SERVICES_QUERY, params: await params }),
  ]);
  if (!service) return <NotFound />;
  // const relatedProjectsArray = Array.isArray(relatedProjects) ? relatedProjects : [relatedProjects];

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

  return (
    <>
      <JsonLd id="service-breadcrumbs-jsonld" data={breadcrumbJsonLd} />
      <JsonLd id="service-jsonld" data={serviceJsonLd} />
      {/* Main content wrapper */}
      <HeroSection service={service} />
      <AdvantagesSection />
      <ApplicationsSection />
      <ProductsSection />
      {service.calculator ? (
        <section id="calculator" className="py-20">
          <div className="container">
            <Fade>
              <SectionEyebrow n="05" label="калькулятор" />
              <h2 className="heading-2">Расчёт за 30 секунд</h2>
              <p className="text-muted">
                Параметры совпадают со структурой CMS — легко подключить справочники из Sanity.
              </p>
            </Fade>
            <PackageCalculator />
          </div>
        </section>
      ) : (
        <CalculatorSection />
      )}
      <PricingSection />
      <GallerySection items={service?.gallery || []} />
      <ProcessSection />
      <MaterialsSection items={services || []} />
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
      <ContactsSection serviceTitle={service.title} />
    </>
  );
}
