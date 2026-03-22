import {Button} from '@heroui/button';
import Link from 'next/link';
import React from 'react';

import Section from '@/components/layout/Section';

export default function SuccessPage() {
	return (
		<Section className="bg-gray-50" innerClassname="items-center justify-center">
			<div className="max-w-md w-full bg-white rounded-small shadow-lg p-8 text-center">
				<div className="mb-6">
					<svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
					</svg>
				</div>
				<h1 className="text-3xl font-bold text-gray-900 mb-4">Спасибо за ваш заказ!</h1>
				<p className="text-gray-600 mb-8 text-balance">Мы получили ваш заказ и скоро начнем его обработку. Мы свяжемся с Вами в ближайшее время.</p>
				<div className="flex flex-col gap-4">
					<Link href={'/products/categories/all'}>
						<Button color="primary" radius="sm" size="md">
							Продолжить покупки
						</Button>
					</Link>
					<Link href={'/'}>
						<Button color="secondary" radius="sm" size="md" variant="bordered">
							Вернуться на главную
						</Button>
					</Link>
				</div>
			</div>
		</Section>
	);
}
