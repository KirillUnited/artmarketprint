'use client';
import React from 'react';
import {motion} from 'framer-motion';
import {PortableText, PortableTextComponents} from 'next-sanity';

import {HeroContentCTA} from '@/components/shared/hero/HeroContentCTA';

const components: PortableTextComponents = {
	marks: {
		em: ({children}) => <span className="font-extrabold bg-brand-gradient text-fill-transparent">{children}</span>,
		strong: ({children}) => <span className="font-extrabold">{children}</span>,
	},
};

interface HeroContentProps {
	title: any;
	description?: string;
	subtitle?: string;
	ctaButtonList?: Array<{
		_key?: string;
		buttonType?: string;
		text?: string;
		link?: string;
	}>;
}

export default function HeroContent({title, description, subtitle, ctaButtonList = []}: HeroContentProps) {
	return (
		<>
			<article className="flex flex-col gap-4 md:gap-6">
				{subtitle && (
					<motion.span
						className="text-primary uppercase text-base leading-normal font-bold"
						initial={{
							opacity: 0,
							translate: '0 -100%',
						}}
						transition={{duration: 2.5, ease: 'easeInOut'}}
						viewport={{once: true, amount: 0}}
						whileInView={{
							opacity: 1,
							translate: '0',
						}}
					>
						- <span>{subtitle}</span> -
					</motion.span>
				)}
				<motion.div
					className="text-4xl md:text-5xl lg:text-6xl leading-none font-medium break-words text-balance"
					initial={{
						opacity: 0,
						translate: '100% 0',
					}}
					transition={{duration: 2.5, ease: 'easeInOut'}}
					viewport={{once: true, amount: 0}}
					whileInView={{
						opacity: 1,
						translate: '0',
					}}
				>
					<PortableText components={components} value={title} />
				</motion.div>
				{description && <p className="text-foreground/70 text-base md:text-lg leading-normal font-medium">{description}</p>}
			</article>
			{ctaButtonList && ctaButtonList.length > 0 && <HeroContentCTA buttonList={ctaButtonList} />}
		</>
	);
}
