'use client';
import { Image } from '@heroui/image';
import NextImage from 'next/image';
import { Card, CardFooter } from '@heroui/card';
import { Link } from '@heroui/link';
import clsx from 'clsx';

import { ProjectTagList } from '@/components/shared/project';
import { urlFor } from '@/sanity/lib/image';
import { CURRENCIES_SYMBOLS } from '@/lib/products/companies';
import CalcLinkButton from '@/components/shared/сalculator/ui/CalcLinkButton';
import { BySymbol } from '@/components/ui/symbols/currencies';
export default function ServiceListItems({ services }: any) {
	return (
		<ul className="grid grid-cols-(--grid-template-columns) gap-8">
			{services?.map((service: any) => (
				<li key={service.title}>
					<Card isFooterBlurred className="h-full group relative" radius="sm">
						<Link
							aria-label={service.title}
							className="absolute inset-0 z-0"
							href={`/services/${service.currentSlug || service.slug?.current}`}
						/>
						<div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2 pointer-events-none">
							{service?.service_tags?.length > 0 && <ProjectTagList color="primary" tags={service.service_tags} />}
							{service?.category_tags?.length > 0 && <ProjectTagList color="secondary" tags={service.category_tags} />}
						</div>
						<Image
							removeWrapper
							alt={service.title}
							as={NextImage}
							className="z-0 w-full h-full object-cover aspect-square pointer-events-none"
							height={0}
							quality={75}
							radius="sm"
							sizes="100vw"
							src={service.imageUrl ? service.imageUrl : urlFor(service.image).width(320).height(320).url()}
							width={0}
						/>
						<CardFooter className={clsx('absolute bg-white/75 bottom-0 w-full z-10 p-0 backdrop-blur-lg')}>
							<div className="flex flex-col gap-2 p-3 w-full">
								<div className="flex flex-col">
									<p className="flex flex-col font-semibold line-clamp-2 leading-normal" title={service.title}>
										{service.title}
										{service.price && <span className="text-primary font-bold line-clamp-1">
											{service.price}&nbsp;{CURRENCIES_SYMBOLS['BYN'] && <BySymbol/>}</span>}
									</p>
									{service.description && <p className={clsx('text-xs', 'grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 overflow-hidden')} title={service.description}>
										<span className="line-clamp-2 leading-normal">{service.description}</span>
									</p>}
								</div>
								{service.calculator && (
										<CalcLinkButton><span>Рассчитать стоимость</span></CalcLinkButton>
								)}
							</div>
						</CardFooter>
					</Card>
				</li>
			))}
		</ul>
	);
}
