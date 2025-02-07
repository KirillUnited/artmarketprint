import OrderForm from '@/components/ui/OrderForm';
import Image from 'next/image';
import { Image as HeroImage } from '@heroui/image';
import { siteConfig } from '@/config/site';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { BrandCardProps } from '@/types';
import BrandCard from '@/components/ui/BrandCard';
import BrandButton from '@/components/ui/BrandButton';
import { ServiceDetails } from "@/components/shared/Services";
import { getCatalogData } from "@/lib/actions/services.actions";
import Link from 'next/link';
import { client } from '@/sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from "@sanity/image-url";
import { PortableText, SanityDocument } from 'next-sanity';
import { getUrlFor } from '@/lib/utils';

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
	const categoryImageUrl = await category.image
		? urlFor(category.image)?.width(550).height(310).url()
		: null;

	return (
		<>
			<section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
				{
					categoryImageUrl && (
						<Image priority src={`${categoryImageUrl}`} alt={category.title} className="absolute inset-0 object-cover w-full h-full" width={1920} height={1080} />
					)
				}
				<div className="container flex flex-col gap-10 max-w-4xl relative z-10">
					<div className="text-center">
						<h1 className="text-4xl font-extrabold text-background sm:text-6xl">{category.title}</h1>
						<p className="mt-4 text-xl text-white">{category.description}</p>
					</div>
					<BrandButton as={Link} href='#categoryDetails' state="primary" className={'self-center'}>
						УЗНАТЬ
					</BrandButton>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="my-6">
						<BaseBreadcrumb section='catalog' />
					</div>
				</div>
			</section>
			<section id='categoryDetails' className="section relative overflow-hidden pb-10 md:pb-20 pt-3 md:pt-6">
				<div className="container">
					<ServiceDetails name={category.title} image={getUrlFor(category.image)} price={category.price} advantages={category.advantages}>
						{Array.isArray(category.body) && <PortableText value={category.body} onMissingComponent={false} />}
					</ServiceDetails>
				</div>
			</section>
			{/*// TODO add price table*/}
			{/*<section className="py-10 md:py-20 bg-[#F1F4FA]">*/}
			{/*	<div className="container">*/}
			{/*		<div className="flex flex-col gap-10">*/}
			{/*			<h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Цены</h2>*/}
			{/*			<PriceTable />*/}

			{/*			<BrandButton state="primary" className={'self-center'}>*/}
			{/*				ЗАКАЗАТЬ*/}
			{/*			</BrandButton>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</section>*/}
			<section className="py-10 md:py-20 bg-[#F1F4FA]">
				<div className="container">
					<div className="flex flex-col gap-10">
						<h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Примеры работ</h2>
						<div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							<HeroImage loading="lazy" isZoomed src="/images/social-1.jpg" alt="Пример работы" width={'100%'} height={300} className="w-full" />
							<HeroImage loading="lazy" isZoomed src="/images/social-3.jpg" alt="Пример работы" width={'100%'} height={300} className="w-full" />
							<HeroImage loading="lazy" isZoomed src="/images/social-2.jpg" alt="Пример работы" width={'100%'} height={300} className="w-full" />
						</div>
					</div>
				</div>
			</section>
			<section className={'py-10 md:py-20'}>
				<div className="container flex flex-col">
					<div className="w-full max-w-2xl self-center bg-background shadow-lg py-6 px-4 md:px-6 rounded-medium">
						<OrderForm className={'items-center'} />
					</div>
				</div>
			</section>
			<section className="relative bg-[#F1F4FA]" id="catalog">
				<div className="py-10 md:py-20 flex flex-col gap-10">
					<div className="container">
						<h2 className="text-2xl md:text-3xl leading-[120%] font-bold text-center">Похожие услуги</h2>
					</div>
					<div className="container">
						<div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
							{siteConfig?.catalogSection?.items.map(({ title, variant, price, description, image, href }: BrandCardProps, index) => (
								<BrandCard key={index} title={title} price={price} description={description} image={image} href={href} variant={variant} />
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
