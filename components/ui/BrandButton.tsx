// noinspection TypeScriptValidateTypes

import {Button} from '@heroui/button';
import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import {ArrowUpRightIcon} from 'lucide-react';

import {BrandButtonProps} from '@/types';
import BrandModalOffer from './BrandModalOffer';

export default function BrandButton({state, className, onPress, children, ...props}: BrandButtonProps) {
	return (
		<Button
			className={clsx({'bg-brand-gradient font-semibold': state === 'primary'}, {'brand-gradient-border bg-brand-gradient text-fill-transparent': state === 'secondary'}, className)}
			color={state !== null ? state : undefined}
			radius="sm"
			size="lg"
			variant={'shadow'}
			onPress={onPress}
			{...props}
		>
			{children}
		</Button>
	);
}

export const getCTAButton = (_key: string, buttonType: 'cta' | 'secondary' | 'ctaModal', text: string, link: string, size: 'lg' | 'md' = 'lg', serviceId = '') => {
	const CTAButtons = {
		cta: (text: string, link: string) => (
			<Link href={link} key={_key}>
				<BrandButton className="uppercase" state="primary">
					{text}
				</BrandButton>
			</Link>
		),
		secondary: (text: string, link: string) => (
			<Link href={link || ''} key={_key}>
				<Button className={clsx('bg-brand-gradient text-fill-transparent', 'font-semibold uppercase', 'group')} color="secondary" radius="sm" size={size} variant="bordered">
					<span className="leading-none">{text}</span>
					<ArrowUpRightIcon className="text-secondary group-hover:translate-x-1 transition-transform" size={18} />
				</Button>
			</Link>
		),
		ctaModal: (text: string, link: string) => <BrandModalOffer key={_key} buttonLabel={text} id={serviceId} />,
	};

	return CTAButtons[buttonType](text, link) || null;
};
