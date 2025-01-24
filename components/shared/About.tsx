export const About = () => {
	return (
		<div className="bg-background-color-primary pr-16 pl-16 flex flex-col gap-20 items-center justify-start shrink-0 relative overflow-hidden">
			<div className="flex flex-row gap-20 items-center justify-start self-stretch shrink-0 relative">
				<img className="shrink-0 w-[640px] h-[635px] relative" />
				<div className="pt-[90px] pb-[90px] flex flex-col gap-[55px] items-start justify-start self-stretch flex-1 relative">
					<div className="flex flex-col gap-4 items-start justify-start self-stretch shrink-0 relative">
						<div className="flex flex-row gap-0 items-center justify-start shrink-0 relative">
							<div className="text-[#2b2a28] text-left font-['Montserrat-SemiBold',_sans-serif] text-xl leading-normal font-semibold relative">О нас</div>
						</div>
						<div className="flex flex-col gap-6 items-start justify-start self-stretch shrink-0 relative">
							<div className="text-left font-['-',_sans-serif] text-5xl leading-[120%] font-normal relative self-stretch">
								<span>
									<span className="heading-span">Art Market Print</span>
									<span className="heading-span2">-</span>
									<span className="heading-span3">Профессиональная печать</span>
								</span>
							</div>
							<div className="text-[#2b2a28] text-left font-['Montserrat-Light',_sans-serif] text-lg leading-normal font-light relative self-stretch">
								Наши услуги обеспечивают высокое качество печати и гравировки, что позволяет вам выделяться на фоне конкурентов. Мы используем современные технологии, чтобы
								гарантировать долговечность и яркость ваших изделий.
							</div>
						</div>
					</div>
					<div className="flex flex-row gap-4 items-start justify-start shrink-0 relative">
						<div
							className="rounded border-solid border-[#2563eb] border pt-3 pr-6 pb-3 pl-6 flex flex-row gap-2 items-center justify-center shrink-0 w-[210px] relative overflow-hidden"
													>
							<div className="text-text-alternate text-left font-['Montserrat-SemiBold',_sans-serif] text-base leading-normal font-semibold relative">
								УЗНАТЬ ЦЕНЫ
							</div>
						</div>
						<div
							className="bg-[rgba(255,255,255,0.80)] rounded border-2 border-solid pt-3 pr-6 pb-3 pl-6 flex flex-row gap-2 items-center justify-center shrink-0 w-[210px] relative overflow-hidden"
													>
							<div
								className="text-left font-['Montserrat-SemiBold',_sans-serif] text-base leading-normal font-semibold relative"
									>
								КАТАЛОГ
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
