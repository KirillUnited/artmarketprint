'use client';

import {Button} from '@heroui/button';
import {Calculator} from 'lucide-react';
import Link from 'next/link';
import {Tooltip} from '@heroui/tooltip';

export function CalculatorButton() {
	return (
		<div className="fixed bottom-6 right-6 z-50">
			<Link href="/calculator" passHref>
				<Tooltip content="Калькулятор стоимости пакетов" placement="left">
					<Button size="lg" className="rounded-full h-14 w-14 p-0 shadow-lg hover:scale-105 transition-transform duration-200" aria-label="Calculator">
						<Calculator className="h-6 w-6" />
					</Button>
				</Tooltip>
			</Link>
		</div>
	);
}
