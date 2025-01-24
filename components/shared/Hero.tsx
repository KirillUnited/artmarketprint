import Image from 'next/image';

export default function Hero() {
	return (
		<section className="section">
			<div className="container">
				<div className="bg-[#ffffff] pt-[90px] pr-16 pb-[90px] pl-16 flex flex-row items-center justify-between shrink-0 relative overflow-hidden">
					<Image priority alt={'ArtMarketPrint'} className="shrink-0 w-[933px] h-[750px] absolute left-[507px] top-0 object-cover" height={750} src={'/images/hero.png'} width={930} />
					<div className="flex flex-col gap-6 items-start justify-center shrink-0 w-[869px] relative">
						<div className="bg-[rgba(255,255,255,0.50)] rounded-lg pt-[72px] pr-7 pb-[72px] flex flex-col gap-[72px] items-start justify-center self-stretch shrink-0 relative">
							<div className="flex flex-col gap-6 items-start justify-start self-stretch shrink-0 relative">
								<div className="rounded border-2 border-solid pr-2 pl-2 flex flex-row gap-2.5 items-center justify-center shrink-0 relative overflow-hidden">
									<div className="text-[#2563eb] text-left font-['Montserrat-Medium',_sans-serif] text-base leading-normal font-medium relative w-[259px]">
										Делаем Вашу жизнь приятнее
									</div>
								</div>
								<div className="text-left font-['-',_sans-serif] text-[58px] leading-none font-normal relative self-stretch">
									<span>
										<span className="medium-length-hero-headline-goes-here-span">Профессиональная печать на</span>
										<span className="medium-length-hero-headline-goes-here-span2"> любых материалах</span>
										<span className="medium-length-hero-headline-goes-here-span3">в</span>
										<span className="medium-length-hero-headline-goes-here-span4"> </span>
										<span className="medium-length-hero-headline-goes-here-span5">Минске</span>
									</span>
								</div>
								<div className="text-[#2b2a28] text-left font-['Montserrat-Regular',_sans-serif] text-xl leading-normal font-normal relative w-[728px]">
									Качественная УФ-печать, DTF-печать, гравировка и шелкография для ваших проектов
								</div>
							</div>
							<div className="flex flex-row gap-4 items-start justify-start shrink-0 relative">
								<div className="rounded border border-solid pt-3 pr-6 pb-3 pl-6 flex flex-row gap-2 items-center justify-center shrink-0 w-[210px] relative overflow-hidden">
									<div className="text-text-alternate text-left font-['Montserrat-SemiBold',_sans-serif] text-base leading-normal font-semibold relative">УЗНАТЬ ЦЕНЫ</div>
								</div>
								<div className="bg-[rgba(255,255,255,0.80)] rounded border-2 border-solid pt-3 pr-6 pb-3 pl-6 flex flex-row gap-2 items-center justify-center shrink-0 w-[210px] relative overflow-hidden">
									<div className="text-left font-['Montserrat-SemiBold',_sans-serif] text-base leading-normal font-semibold relative">КОНСУЛЬТАЦИЯ</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 items-center justify-center shrink-0 relative overflow-hidden">
						<div className="bg-border-alternate rounded-[50%] border-solid border-border-alternate border-2 shrink-0 w-6 h-[22.96px] relative"></div>
						<div className="rounded-[50%] border-solid border-border-alternate border-2 shrink-0 w-[17px] h-4 relative"></div>
						<div className="rounded-[50%] border-solid border-border-alternate border-2 shrink-0 w-[17px] h-4 relative"></div>
					</div>
				</div>
			</div>
		</section>
	);
}
