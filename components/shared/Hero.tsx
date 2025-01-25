import Image from 'next/image';
import HeroImage from '../../public/images/hero.png';
import { Button } from '@heroui/button';
import BrandButton from '@/components/ui/BrandButton';

export default function Hero() {
	return (
		<section className="section relative overflow-hidden">
			<div className="container">
				<div className="py-20 flex flex-row items-center">
					<div className="bg-[rgba(255,255,255,0.50)] rounded-lg py-16 flex flex-col gap-16 z-10 max-w-4xl">
						<div className="flex flex-col gap-6">
							<span className="text-primary/70 text-base leading-normal font-medium">
								Делаем Вашу жизнь приятнее
							</span>
							<h1 className="text-6xl leading-none font-medium">
								Профессиональная печать на
								<span className="font-extrabold"> любых материалах </span>
								в
								<span className="font-extrabold bg-brand-gradient text-fill-transparent"> Минске</span>
							</h1>
							<p className="text-foreground/70 text-xl leading-normal font-normal">
								Качественная УФ-печать, DTF-печать, гравировка и шелкография для ваших проектов
							</p>
						</div>
						<div className="flex flex-row gap-4">
							<BrandButton state='primary'>УЗНАТЬ ЦЕНЫ</BrandButton>
							<Button color='primary'size='lg' radius='sm' variant='ghost'>КОНСУЛЬТАЦИЯ</Button>
						</div>
					</div>

					<Image priority alt={'ArtMarketPrint'} className="w-2/3 h-full absolute right-0 top-0 object-cover" height={750} src={HeroImage} placeholder="blur" width={930} quality={85} />
				</div>
			</div>
		</section>
	);
}
