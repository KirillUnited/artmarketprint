import Image from 'next/image';
import Link from 'next/link';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText, SanityDocument } from 'next-sanity';

import { siteConfig } from '@/config/site';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import BrandButton from '@/components/ui/BrandButton';
import { ServiceDetails } from '@/components/shared/service';
import { client } from '@/sanity/client';
import { getUrlFor } from '@/lib/utils';
import Section, { SectionButton } from '@/components/layout/Section';
import { ProjectList, ProjectsHeading } from '@/components/shared/project';
import { NAVIGATION_QUERY, PROJECTS_BY_CATEGORY_QUERY } from '@/sanity/lib/queries';
import { OrderForm } from '@/components/ui/form';

type Props = {
	slug: string;
};

export function generateStaticParams() {
	return siteConfig?.catalogSection?.items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Props> }) {
	const { slug: paramsSlug } = await params;
	const data = siteConfig.catalogSection.items.find(({ slug }) => slug === paramsSlug);
	const { title = '', description = '', keywords = '' } = data?.seo || {};

	return {
		title: `${title || ''}`,
		description: `${description}`,
		keywords: `${keywords}`,
		openGraph: {
			title: `${title || ''}`,
			description: `${description}`,
			images: '/apple-touch-icon.png',
		},
	};
}

const CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0]`;
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? imageUrlBuilder({ projectId, dataset }).image(source)
		: null;

const options = { next: { revalidate: 30 } };

export default async function CategoryPage({ params }: { params: Promise<Props> }) {
	const category = await client.fetch<SanityDocument>(CATEGORY_QUERY, await params, options);
	const breadcrumbs = (await client.fetch<SanityDocument>(NAVIGATION_QUERY))[0].links;
	const categoryImageUrl = await category?.image
		? urlFor(category.image)?.width(550).height(310).url()
		: null;

	const relatedProjects = await client.fetch<SanityDocument>(PROJECTS_BY_CATEGORY_QUERY, await params, options);
	const relatedProjectsArray = Array.isArray(relatedProjects) ? relatedProjects : [relatedProjects];

	return (
		<>
			<section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
				{
					categoryImageUrl && (
						<Image priority alt={category.title} className="absolute inset-0 object-cover w-full h-full" height={1080} src={`${categoryImageUrl}`} width={1920} />
					)
				}
				<div className="container flex flex-col gap-10 max-w-4xl relative z-10">
					<div className="text-center">
						<h1 className="text-4xl font-extrabold text-background sm:text-6xl">{category.title}</h1>
						<p className="mt-4 text-xl text-white">{category.description}</p>
					</div>
					<BrandButton as={Link} className={'self-center'} href='#categoryDetails' state="primary">
						Подробнее
					</BrandButton>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="mt-10 my-6">
						<BaseBreadcrumb items={breadcrumbs} section='catalog' />
					</div>
				</div>
			</section>
			<section className="section relative overflow-hidden pb-10 md:pb-20 pt-3 md:pt-6" id='categoryDetails'>
				<div className="container">
					<ServiceDetails advantages={category.advantages} image={getUrlFor(category.image)} name={category.title} price={category.price}>
						{Array.isArray(category.body) && <PortableText value={category.body} onMissingComponent={false} />}
					</ServiceDetails>
				</div>
			</section>

			<Section className="bg-[#F9F9F9]">
				<ProjectsHeading description={'Портфолио выполненных работ'} subtitle={'галерея'} title='Примеры работ' />

				<ProjectList bentoGrid={false} projectList={relatedProjectsArray} />

				<SectionButton className='lg:hidden flex' href={'/projects'} label="Все проекты" />
			</Section >
			<Section id='contacts'>
				<OrderForm />
			</Section>
			{/*<section className="relative bg-[#F1F4FA]" id="catalog">*/}
			{/*	<div className="py-10 md:py-20 flex flex-col gap-10">*/}
			{/*		<div className="container">*/}
			{/*			<h2 className="text-2xl md:text-3xl leading-[120%] font-bold text-center">Похожие услуги</h2>*/}
			{/*		</div>*/}
			{/*		<div className="container">*/}
			{/*			<div className="grid grid-cols-[var(--grid-template-columns)] gap-8">*/}
			{/*				{siteConfig?.catalogSection?.items.map(({ title, variant, price, description, image, href }: BrandCardProps, index) => (*/}
			{/*					<BrandCard key={index} title={title} price={price} description={description} image={image} href={href} variant={variant} />*/}
			{/*				))}*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</section>*/}
		</>
	);
}
