'use client';

import {Button} from '@heroui/button';
import {Calculator} from 'lucide-react';
import Link from 'next/link';
import {Tooltip} from '@heroui/tooltip';

export function CalculatorButton() {
	return (
		<div className="fixed right-6 bottom-6 lg:right-auto lg:bottom-auto lg:left-6 lg:top-1/2 z-50 animate-pulse">
			<Link href="/calculator" passHref>
				<Tooltip content="Калькулятор стоимости пакетов" placement="left">
					<Button isIconOnly color='primary' size="lg" className="h-16 w-16 bg-brand-gradient rounded-full shadow-large hover:scale-105 transition-transform duration-200" aria-label="Calculator">
						<Calculator className="h-10 w-10" />
					</Button>
				</Tooltip>
			</Link>
		</div>
	);
}
