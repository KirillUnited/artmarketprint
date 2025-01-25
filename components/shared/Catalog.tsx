import { siteConfig } from "@/config/site";
import BrandCard from "../ui/BrandCard";
import Link from "next/link";
import { Button } from "@heroui/button";
import { BrandCardProps } from "@/types";

export const Catalog = () => {
	return (
		<section id="catalog" className="relative">
			<div className="py-10 md:py-20 flex flex-col gap-10">
				<div className="container">
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div className="flex flex-col gap-4 max-w-[652px]">
							<h2 className="text-4xl md:text-5xl leading-[120%] font-bold">{siteConfig.catalogSection.title}</h2>
							<p className="text-base md:text-lg leading-normal font-normal text-foreground/70">
								{siteConfig.catalogSection.description}
							</p>
						</div>
						<Button as={Link} color="primary" variant="light" href={siteConfig.catalogSection.href} className="flex flex-row gap-2 items-center font-semibold text-base md:text-xl px-2 h-auto">
							<span>Смотреть ещё</span>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.70697 16.9496L15.414 11.2426L9.70697 5.53564L8.29297 6.94964L12.586 11.2426L8.29297 15.5356L9.70697 16.9496Z" fill="currentColor" />
							</svg>
						</Button>
					</div>
				</div>
				<div className="container">
					<div className="grid grid-cols-[var(--grid-template-columns)] gap-8">
						{
							siteConfig?.catalogSection?.items.map((props: BrandCardProps, index) => (
								<BrandCard key={index} {...props}/>
							))
						}
					</div>
				</div>
			</div>
		</section>
	);
};
