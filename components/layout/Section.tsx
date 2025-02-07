import React from 'react'
import clsx from 'clsx';

import { SectionProps } from '@/types';
import { Button } from '@heroui/button';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function Section({ className, containerFluid, innerClassname, children, ...props }: SectionProps) {
	return (
		<section className={clsx(className)} {...props}>
			<div
				className={clsx('container', {
					['max-w-full px-0']: containerFluid,
				})}
			>
				<SectionInner className={innerClassname}>
					{children}
				</SectionInner>
			</div>
		</section>
	);
}

export const SectionHeading = ({ className, children }: SectionProps) => (
	<div className={clsx('flex flex-col gap-4 max-w-[652px]', className)}>
		{children}
	</div>
);

export const SectionTitle = ({ children }: SectionProps) => (
	<h2 className="text-3xl md:text-4xl lg:text-5xl leading-[120%] font-bold">{children}</h2>
);

export const SectionSubtitle = ({ children }: SectionProps) => (
	<p className="text-base uppercase font-bold text-primary">{children}</p>
);

export const SectionDescription = ({ children }: SectionProps) => (
	<p className="text-sm md:text-base leading-normal font-normal text-foreground/70 text-balance">
		{children}
	</p>
);

export const SectionInner = ({ className, children }: SectionProps) => (
	<div className={clsx('py-10 md:py-20 flex flex-col gap-10', className)}>{children}</div>
);

export const SectionButton = ({ label, href, className }: SectionProps) => (
	<Button
		as={Link}
		className={clsx("bg-brand-gradient text-fill-transparent font-semibold border-1", className)}
		color="secondary"
		href={href}
		radius="sm"
		size="md"
		target="_blank"
		variant="bordered"
	>
		<span className="leading-none">{label}</span>
		<ArrowUpRightIcon className="text-secondary" size={18} />
	</Button>
);