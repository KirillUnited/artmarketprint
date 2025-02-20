import Link from 'next/link';
import {Button} from '@heroui/button';
import {ArrowUpRightIcon} from 'lucide-react';
import React from 'react';

import BrandButton from '@/components/ui/BrandButton';

const CTAButtons = {
	'cta': (text, link) => (
		<BrandButton as={Link} href={link} state="primary" className="uppercase">
			{text}
		</BrandButton>
	),
	'secondary': (text, link) => (
		<Button
            as={Link}
            className="bg-brand-gradient text-fill-transparent font-semibold uppercase"
            color="secondary"
            href={link}
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

export const HeroContentCTA = ({buttonList}) => {
	return (
		<ul className="flex flex-col md:flex-row gap-2 md:gap-4">
			{buttonList?.map(({_key, buttonType, text, link}) => {
				return (
					<li key={_key}>
						{
							CTAButtons[buttonType](text, link)
						}
                	</li>
				)
			})}
		</ul>
	);
};
