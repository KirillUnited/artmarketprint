import Image from 'next/image';
import HeroImage from '../../public/images/hero.png';
import { Button } from '@heroui/button';
import BrandButton from '@/components/ui/BrandButton';
import BrandModalOffer from '../ui/BrandModalOffer';
import Link from 'next/link';

export default function Hero() {
	return (
		<section className="section relative overflow-hidden">
			<div className="container">
				<div className="py-10 md:py-20 flex flex-row items-center">
					<div className="bg-[rgba(255,255,255,0.50)] backdrop-blur-md rounded-lg py-10 md:py-16 pr-4 md:pr-7 flex flex-col gap-8 md:gap-16 z-10 max-w-full md:max-w-4xl">
						<div className="flex flex-col gap-4 md:gap-6">
							<span className="text-primary/70 text-base leading-normal font-medium">
								Делаем Вашу жизнь приятнее
							</span>
							<h1 className="text-4xl md:text-6xl leading-none font-medium hyphens-auto break-words">
								Профессиональная печать на
								<span className="font-extrabold"> любых материалах </span>
								в
								<span className="font-extrabold bg-brand-gradient text-fill-transparent"> Минске</span>
							</h1>
							<p className="text-foreground/70 text-base md:text-xl leading-normal font-normal">
								Качественная УФ-печать, DTF-печать, гравировка и шелкография для ваших проектов
							</p>
						</div>
						<div className="flex flex-col md:flex-row gap-2 md:gap-4">
							<BrandButton as={Link} href={'/#catalog'} state='primary'>УЗНАТЬ ЦЕНЫ</BrandButton>
							{/* <BrandModalOffer /> */}

							<Button color='secondary' size='lg' radius='sm' variant='ghost' className='bg-brand-gradient text-fill-transparent font-semibold'>КОНСУЛЬТАЦИЯ</Button>
						</div>
					</div>

					<Image priority alt={'ArtMarketPrint'} className="w-2/3 h-full absolute right-0 top-0 object-cover" height={750} src={HeroImage} placeholder="blur" width={930} quality={85} />
				</div>
			</div>
		</section>
	);
}
