import Image from 'next/image';
import HeroContent from './HeroContent';
import clsx from 'clsx';

import { motion } from 'framer-motion';

export default function HeroSection(props: any) {
	const { title, orientation, imageUrl } = props || {};

	if (!title) return null;

	return (
		<section className="section relative overflow-hidden">
			<div className="container">
				<div className={clsx("py-10 md:py-20 flex flex-row items-center",
					{
						['flex-row-reverse']: orientation === 'textRight',
						['justify-center']: orientation === 'textCenter',
					}
				)}>
					<motion.header
						data-orientation={orientation || 'textLeft'}
						className={clsx("bg-[rgba(255,255,255,0.50)] backdrop-blur-md rounded-lg py-10 md:py-16 pr-4 md:pr-7 flex flex-col gap-8 md:gap-16 z-10 max-w-full md:max-w-4xl overflow-hidden",
							{
								['text-right md:items-end data-[orientation="textRight"]:pr-0 data-[orientation="textRight"]:md:pr-0 pl-4 md:pl-7']: orientation === 'textRight',
								['text-center md:items-center pl-4 md:pl-7']: orientation === 'textCenter',
							}
						)}
						initial={{
							opacity: 0,
							translate: '-100%',
						}}
						transition={{ duration: 1, ease: 'easeInOut' }}
						viewport={{ once: true, amount: 0 }}
						whileInView={{
							opacity: 1,
							translate: '0',
						}}
					>
						<HeroContent {...props} />
					</motion.header>
					{imageUrl && <Image
						alt={'ArtMarketPrint'}
						className={clsx("w-2/3 h-full absolute right-0 top-0 object-cover",
							{
								['left-0']: orientation === 'textRight',
								['w-full']: orientation === 'textCenter',
							}
						)}
						height={750}
						quality={85}
						src={imageUrl}
						width={930}
					/>}
				</div>
			</div>
		</section>
	);
}