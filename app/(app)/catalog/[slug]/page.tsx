import OrderForm from '@/components/ui/OrderForm';
import Image from 'next/image';
import {Image as HeroImage} from '@heroui/image';
import {siteConfig} from '@/config/site';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import {Button} from '@heroui/button';
import {BrandCardProps} from '@/types';
import BrandCard from '@/components/ui/BrandCard';
import BrandButton from '@/components/ui/BrandButton';
import PriceTable from '@/components/shared/PriceTable';

type Props = {
	slug: string;
};

export function generateStaticParams() {
	return siteConfig?.catalogSection?.items.map(({slug}) => ({slug}));
}

export async function generateMetadata({params}: {params: Promise<Props>}) {
	const {slug: paramsSlug} = await params;
	const data = siteConfig.catalogSection.items.find(({slug}) => slug === paramsSlug);
	const {title = '', description = '', keywords = ''} = data?.seo || {};

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

export default async function ProductPage({params}: {params: Promise<Props>}) {
	const {slug: paramsSlug} = await params;

	const data = siteConfig.catalogSection.items.find(({slug}) => slug === paramsSlug);
	const {title = '', description = '', image = ''} = data || {};

	return (
		<>
			<section className="py-12 md:py-24 relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
				<Image priority src={`${image}`} alt={title} className="absolute inset-0 object-cover w-full h-full" width={1920} height={1080} />
				<div className="container flex flex-col gap-10 max-w-4xl relative z-10">
					<div className="text-center">
						<h1 className="text-4xl font-extrabold text-background sm:text-6xl">{title}</h1>
						<p className="mt-4 text-xl text-white">{description}</p>
					</div>
					<BrandButton state="primary" className={'self-center'}>
						ЗАКАЗАТЬ
					</BrandButton>
				</div>
			</section>
			<section className="section relative overflow-hidden py-10 md:py-20 ">
				<div className="container">
					<div className="mb-4">
						<BaseBreadcrumb />
					</div>
					<div className="grid md:grid-cols-2 items-center gap-x-10 gap-y-4">
						<div className="flex flex-col gap-8 md:gap-16 py-5 md:py-10">
							<div className="flex flex-col gap-4 md:gap-6">
								<span className="text-gray-600">О услуге</span>
								<h2 className="text-3xl md:text-4xl font-bold hyphens-auto break-words">УФ-печать</h2>
								<p className="text-foreground/70 text-balance leading-normal font-light">
									Это современная технология, которая позволяет наносить изображения на различные материалы, такие как пластик, стекло, металл, дерево и другие. Благодаря
									использованию ультрафиолетовых ламп, краска мгновенно затвердевает, что обеспечивает высокое качество и долговечность изображения.
								</p>
								<div className="flex flex-col gap-4">
									<h3 className="text-xl md:text-2xl font-bold text-gray-900">Преимущества</h3>
									<ul className="space-y-2 text-gray-600">
										<li>
											<span className="text-primary font-bold">✔</span> Высокое качество печати
										</li>
										<li>
											<span className="text-primary font-bold">✔</span> Возможность печати на различных материалах
										</li>
										<li>
											<span className="text-primary font-bold">✔</span> Быстрое затвердевание краски
										</li>
										<li>
											<span className="text-primary font-bold">✔</span> Устойчивость к внешним воздействиям
										</li>
									</ul>
								</div>
							</div>
							<div className="flex flex-col md:flex-row gap-2 md:gap-4">
								<BrandButton state="primary">ЗАКАЗАТЬ</BrandButton>

								<Button className="bg-brand-gradient text-fill-transparent font-semibold" color="secondary" radius="sm" size="lg" variant="ghost">
									КОНСУЛЬТАЦИЯ
								</Button>
							</div>
						</div>

						<Image alt={'ArtMarketPrint'} className="h-full object-cover flex-1 w-full" height={635} src={'/images/about.jpg'} width={640} />
					</div>
				</div>
			</section>
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
			<section className={'py-10 md:py-20 bg-[#F1F4FA]'}>
				<div className="container flex flex-col">
					<div className="w-full max-w-2xl self-center bg-background shadow-lg p-6 rounded-medium">
						<OrderForm className={'items-center'} />
					</div>
				</div>
			</section>
			<section className="relative" id="catalog">
				<div className="py-10 md:py-20 flex flex-col gap-10">
					<div className="container">
						<h2 className="text-2xl md:text-3xl leading-[120%] font-bold text-center">Похожие услуги</h2>
					</div>
					<div className="container">
						<div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
							{siteConfig?.catalogSection?.items.map(({title, variant, price, description, image, href}: BrandCardProps, index) => (
								<BrandCard key={index} title={title} price={price} description={description} image={image} href={href} variant={variant} />
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
