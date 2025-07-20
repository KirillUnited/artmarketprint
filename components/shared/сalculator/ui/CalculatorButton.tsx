'use client';

import {Button} from '@heroui/button';
import {Calculator} from 'lucide-react';
import Link from 'next/link';
import {Tooltip} from '@heroui/tooltip';

export function CalculatorButton() {
	return (
		<div className="fixed right-3 bottom-3 lg:right-auto lg:bottom-auto lg:left-3 lg:top-1/2 z-50 animate-pulse">
			<Link href="/calculator" passHref>
				<Tooltip content="Калькулятор стоимости пакетов" placement="left">
					<Button isIconOnly color='primary' size="lg" className="bg-brand-gradient rounded-full shadow-large hover:scale-105 transition-transform duration-200" aria-label="Calculator">
						<Calculator className="h-6 w-6" />
					</Button>
				</Tooltip>
			</Link>
		</div>
	);
}
