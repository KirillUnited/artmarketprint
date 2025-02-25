import React from 'react';

import {getCTAButton} from '@/components/ui/BrandButton';


export const HeroContentCTA = ({buttonList}: {buttonList: any[] | null | undefined}) => {
	if (!Array.isArray(buttonList)) return null;

	return (
		<footer className="flex flex-col md:flex-row gap-2 md:gap-4">
			{buttonList.map(({_key, buttonType, text, link}) => {
				return (
					getCTAButton(_key ,buttonType, text, link)
				)
			})}
		</footer>
	);
};
