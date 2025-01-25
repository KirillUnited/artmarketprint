import { siteConfig } from '@/config/site';

export const Benefits = () => {
	return (
		<section className="bg-primary-50 flex flex-col">
			<div className="container">
				<div className="flex flex-wrap gap-4 md:gap-8 py-7 justify-between">
					{
						siteConfig?.benefitItems?.map(({ icon, title, description }: any, index) => (
							<div
								key={index}
								className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 max-w-sm py-4 md:py-8 basis-60"
							>
								<div className="shrink-0 text-primary">{icon({ fill: 'currentColor'})}</div>
								<div className="flex flex-col gap-2">
									<h2 className="text-base md:text-2xl leading-[120%] font-bold">{title}</h2>
									<p className="text-foreground/70 text-sm leading-normal font-light">
										{description}
									</p>
								</div>
							</div>
						))
					}
				</div>
			</div>	
		</section>
	);
};
