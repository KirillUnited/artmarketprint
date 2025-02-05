import React from 'react'
import clsx from 'clsx';

import {SectionProps} from '@/types';

export default function Section({className, containerFluid, children}: SectionProps) {
    return (
		<section className={clsx(className)}>
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
