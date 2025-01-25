import Image from 'next/image';
import AboutImage from '../../public/images/about.jpg';
import { Button } from '@heroui/button';
import BrandButton from '@/components/ui/BrandButton';
import Link from 'next/link';

export default function About() {
	return (
		<section className="section relative overflow-hidden">
			<div className="container">
				<div className="py-10 md:py-20 grid md:grid-cols-2 items-center gap-x-20 gap-y-4">
					<Image alt={'ArtMarketPrint'} className="h-full object-cover flex-1" height={635} src={AboutImage} placeholder="blur" width={640} />

					<div className="flex flex-col gap-8 md:gap-16 py-10 md:py-20">
						<div className="flex flex-col gap-4 md:gap-6">
							<span className="text-lg font-semibold">
								О нас
							</span>
							<h2 className="text-4xl md:text-6xl font-medium hyphens-auto break-words">
								<span className="font-extrabold bg-brand-gradient text-fill-transparent">Art Market Print</span>
								<br />
								Печать в Минске
							</h2>
							<p className="text-foreground/70 text-base md:text-lg leading-normal font-light">
								Наши услуги обеспечивают высокое качество печати и гравировки, что позволяет вам выделяться на фоне конкурентов. Мы используем современные технологии, чтобы гарантировать долговечность и яркость ваших изделий.
							</p>
						</div>
						<div className="flex flex-col md:flex-row gap-2 md:gap-4">
							<BrandButton as={Link} href={'/#catalog'} state='primary'>УЗНАТЬ ЦЕНЫ</BrandButton>

							<Button color='secondary' size='lg' radius='sm' variant='ghost' className='bg-brand-gradient text-fill-transparent font-semibold'>КОНСУЛЬТАЦИЯ</Button>
						</div>
					</div>

				</div>
			</div>
		</section>
	);
}
