'use client';

import {Button} from '@heroui/button';
import {Calculator} from 'lucide-react';
import Link from 'next/link';
import {Tooltip} from '@heroui/tooltip';
import {useEffect, useState} from "react";

export function CalculatorButton() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<div className="fixed right-6 bottom-6 z-50 animate-pulse">
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
