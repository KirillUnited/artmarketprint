import React from 'react'
import clsx from 'clsx';

import {SectionProps} from '@/types';

export default function Section({className, containerFluid, props, children}: SectionProps) {
    return (
		<section className={clsx(className)} {...props}>
			<div
				className={clsx('container', {
					['max-w-full px-0']: containerFluid,
				})}
			>
				<div className="py-10 md:py-20 flex flex-col gap-10">{children}</div>
			</div>
		</section>
	);
}

export const SectionHeading = ({ children }: SectionProps) => (
	<div className="flex flex-col gap-4 max-w-[652px]">
		{children}
	</div>
);

export const SectionTitle = ({ children }: SectionProps) => (
	<h2 className="text-4xl md:text-5xl leading-[120%] font-bold">{children}</h2>
);

export const SectionDescription = ({children}: SectionProps) => (
	<p className="text-base md:text-lg leading-normal font-normal text-foreground/70">
		{children}
	</p>
);