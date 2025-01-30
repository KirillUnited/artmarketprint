import Link from 'next/link';
import { Button } from '@heroui/button';

import BrandCard from '../ui/BrandCard';

import { siteConfig } from '@/config/site';
import { BrandCardProps } from '@/types';

export const Services = () => {
	return (
		<section className="relative" id="services">
			<div className="py-10 md:py-20 flex flex-col gap-10">
				<div className="container">
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div className="flex flex-col gap-4 max-w-[652px]">
							<h2 className="text-4xl md:text-5xl leading-[120%] font-bold">{siteConfig.serviceSection.title}</h2>
							<p className="text-base md:text-lg leading-normal font-normal text-foreground/70">
								{siteConfig.serviceSection.description}
							</p>
						</div>
						<Button as={Link} className=" flex-row gap-2 items-center font-semibold text-base md:text-xl px-2 h-auto hidden md:flex" color="primary" href={siteConfig.serviceSection.href} variant="light">
							<span>Смотреть ещё</span>
							<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.70697 16.9496L15.414 11.2426L9.70697 5.53564L8.29297 6.94964L12.586 11.2426L8.29297 15.5356L9.70697 16.9496Z" fill="currentColor" />
							</svg>
						</Button>
					</div>
				</div>
				<div className="container">
					<div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
						{
							siteConfig?.serviceSection?.items.map((props: BrandCardProps, index) => (
								<BrandCard key={index} {...props} />
							))
						}
						<Button as={Link} className='bg-brand-gradient text-fill-transparent font-semibold md:hidden flex' color='secondary' href={siteConfig.serviceSection.href} radius='sm' size='lg' variant='ghost'>
							<span>Смотреть ещё</span>
							<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.70697 16.9496L15.414 11.2426L9.70697 5.53564L8.29297 6.94964L12.586 11.2426L8.29297 15.5356L9.70697 16.9496Z" fill="currentColor" />
							</svg>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
