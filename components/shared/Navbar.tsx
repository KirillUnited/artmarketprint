import Image from 'next/image';

export default function Navbar() {
	return (
		<div className="bg-background-color-primary border-solid border-[#f1f4fa] border pr-16 pl-16 flex flex-col gap-0 items-center justify-center shrink-0 h-[72px] relative">
			<div className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
				<div className="shrink-0 w-[184px] h-10 static">
					<div className="text-left font-['Montserrat-Black',_sans-serif] text-base leading-normal font-black absolute left-[51px] top-2">ArtMarketPrint</div>
					<Image alt={'ArtMarketPrint'} className="flex flex-row gap-0 items-center justify-center w-[35px] h-10 absolute left-0 top-0" height={40} src="/images/logo.png"  width={40}/>
				</div>
				<div className="flex flex-row gap-8 items-center justify-end shrink-0 relative">
					<div className="flex flex-row gap-1 items-center justify-center shrink-0 relative">
						<div className="text-[#2b2a28] text-left font-['Montserrat-SemiBold',_sans-serif] text-base leading-normal font-semibold relative">Услуги</div>
					</div>
					<div className="flex flex-row gap-1 items-center justify-center shrink-0 relative">
						<div className="text-[#2b2a28] text-left font-['Montserrat-SemiBold',_sans-serif] text-base leading-normal font-semibold relative">Каталог/Цены</div>
					</div>
					<div className="bg-[#ffffff] flex flex-row gap-1 items-center justify-center shrink-0 relative">
						<div className="text-[#3265ed] text-left font-['Montserrat-Bold',_sans-serif] text-base leading-normal font-bold relative">Проекты</div>
					</div>
					<div className="flex flex-row gap-1 items-center justify-center shrink-0 relative">
						<div className="text-[#2b2a28] text-left font-['Montserrat-SemiBold',_sans-serif] text-base leading-normal font-semibold relative">Отзывы</div>
					</div>
					<div className="flex flex-row gap-1 items-center justify-center shrink-0 relative">
						<div className="text-[#2b2a28] text-left font-['Montserrat-SemiBold',_sans-serif] text-base leading-normal font-semibold relative">Контакты</div>
					</div>
				</div>
				<div className="flex flex-row gap-8 items-center justify-center shrink-0 relative">
					<div className="flex flex-row gap-4 items-center justify-center shrink-0 relative">
						<div className="bg-[#2563eb] rounded-lg pt-1 pr-4 pb-1 pl-4 flex flex-row gap-2 items-center justify-start shrink-0 relative">
							<div className="text-text-alternate text-left font-['Roboto-SemiBold',_sans-serif] text-base leading-normal font-semibold relative">+375 (29) 999-99-99</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
