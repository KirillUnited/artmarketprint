import Link from 'next/link';
import {Button} from '@heroui/button';
import {ArrowUpRightIcon} from 'lucide-react';
import React from 'react';

import BrandButton from '@/components/ui/BrandButton';

const getCTAButton = (_key: string, buttonType: 'cta' | 'secondary', text: string, link: string)=>{
	const CTAButtons = {
		'cta': (text: any, link: any) => (
			<BrandButton key={_key} as={Link} href={link} state="primary" className="uppercase">
				{text}
			</BrandButton>
		),
		'secondary': (text: any, link: any) => (
			<Button
				key={_key}
				as={Link}
				className="bg-brand-gradient text-fill-transparent font-semibold uppercase"
				color="secondary"
				href={link || ''}
				radius="sm"
				size="lg"
				target="_blank"
				variant="bordered"
			>
				<span className="leading-none">{text}</span>
				<ArrowUpRightIcon className="text-secondary" size={18} />
			</Button>
		),
	};

	return CTAButtons[buttonType](text, link) || null;
}

export const HeroContentCTA = ({buttonList}: {buttonList: any[] | null | undefined}) => {
	if (!buttonList || buttonList.length === 0) return null;

	return (
		<div className="flex flex-col md:flex-row gap-2 md:gap-4">
			{buttonList.map(({_key, buttonType, text, link}) => {
				return (
					getCTAButton(_key ,buttonType, text, link)
				)
			})}
		</div>
	);
};
