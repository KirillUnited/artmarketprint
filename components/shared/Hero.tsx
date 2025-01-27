'use client';
import Image from 'next/image';
import { Button } from '@heroui/button';
import Link from 'next/link';

import {motion} from 'framer-motion';
import HeroImage from '../../public/images/hero.png';

import BrandButton from '@/components/ui/BrandButton';



export default function Hero() {
	return (
		<section className="section relative overflow-hidden">
			<div className="container">
				<div className="py-10 md:py-20 flex flex-row items-center">
					<motion.div
						whileInView={{
							opacity: 1,
							translate: '0',
						}}
						initial={{
							opacity: 0,
							translate: '-100%'
						}}
						transition={{duration: 1, ease: 'easeInOut'}}
						viewport={{once: true,amount: 0}}
						className="bg-[rgba(255,255,255,0.50)] backdrop-blur-md rounded-lg py-10 md:py-16 pr-4 md:pr-7 flex flex-col gap-8 md:gap-16 z-10 max-w-full md:max-w-4xl overflow-hidden">
						<div className="flex flex-col gap-4 md:gap-6">
							<motion.span
								whileInView={{
									opacity: 1,
									translate: '0',
								}}
								initial={{
									opacity: 0,
									translate: '0 -100%'
								}}
								transition={{duration: 2.5, ease: 'easeInOut'}}
								viewport={{once: true,amount: 0}}
								className="text-primary/70 text-base leading-normal font-medium">
								Делаем Вашу жизнь приятнее
							</motion.span>
							<motion.h1
								whileInView={{
									opacity: 1,
									translate: '0',
								}}
								initial={{
									opacity: 0,
									translate: '100% 0'
								}}
								transition={{duration: 2.5, ease: 'easeInOut'}}
								viewport={{once: true,amount: 0}}
								className="text-4xl md:text-6xl leading-none font-medium hyphens-auto break-words">
								<span className="hidden md:inline">Профессиональная</span> <span className='hidden md:inline'>печать</span> <span className='md:hidden'>Печать</span> на
								<span className="font-extrabold"> любых материалах </span>
								в
								<span className="font-extrabold bg-brand-gradient text-fill-transparent"> Минске</span>
							</motion.h1>
							<p className="text-foreground/70 text-base md:text-xl leading-normal font-normal">
								Качественная УФ-печать, DTF-печать, гравировка и шелкография для ваших проектов
							</p>
						</div>
						<div className="flex flex-col md:flex-row gap-2 md:gap-4">
							<BrandButton as={Link} href={'/#catalog'} state='primary'>УЗНАТЬ ЦЕНЫ</BrandButton>
							{/* <BrandModalOffer /> */}

							<Button className='bg-brand-gradient text-fill-transparent font-semibold' color='secondary' radius='sm' size='lg' variant='ghost'>КОНСУЛЬТАЦИЯ</Button>
						</div>
					</motion.div>

					<Image priority alt={'ArtMarketPrint'} className="w-2/3 h-full absolute right-0 top-0 object-cover" height={750} placeholder="blur" quality={85} src={HeroImage} width={930} />
				</div>
			</div>
		</section>
	);
}
