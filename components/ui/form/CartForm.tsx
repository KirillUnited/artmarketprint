'use client';

import NextImage from 'next/image';
import {TrashIcon} from 'lucide-react';
import {Button} from '@heroui/button';
import {Form} from '@heroui/form';
import {Image} from '@heroui/image';
import {useEffect, useState} from 'react';

import FormContactFields from './FormContactFields';
import FormPaymentFields from './FormPaymentFields';

import useBasketStore from '@/store/store';
import {useCartForm} from '@/hooks/useCartForm';
import {QuantityControls} from '@/components/ui/AddToBasketButton';
import Loader from '@/components/ui/Loader';
import {ProductsNotFoundMenu} from '@/components/shared/product/ProductsNotFound';
import {CURRENCIES_SYMBOLS} from '@/lib/products/companies';

const deliveryMethods = [
	{id: 1, name: 'Самовывоз', title: 'Самовывоз', turnaround: 'Бесплатно', price: 0},
	{id: 2, name: 'Доставка', title: 'Доставка', turnaround: '1–5 дней', price: 10.0},
];

export default function CartForm() {
	const items = useBasketStore((state) => state.items);
	const removeItem = useBasketStore((state) => state.removeItem);
	const removeItemCompletely = useBasketStore((state) => state.removeItemCompletely);
	const addItem = useBasketStore((state) => state.addItem);
	const getTotalPrice = useBasketStore((state) => state.getTotalPrice);
	const [isClient, setIsClient] = useState(false);
	const [phoneValid, setPhoneValid] = useState(false);
	const {isLoading, setIsLoading, isPending, handleFileChange, handleSubmit, fileUploaded, fileUploadedName} = useCartForm();
	const [orderSubmitted, setOrderSubmitted] = useState(false);
	const totalItems = items.map((item) => ({
		item_id: item.id,
		item_name: item.name,
		item_category: item.category || 'Без категории',
		item_category3: '',
		item_category4: '',
		item_category5: '',
		price: item.price || 0,
		quantity: item.quantity || 1,
	}));
	const purchaseData = {
		event: 'purchase',
		value: getTotalPrice().toFixed(2),
		items: items.map((item) => ({
			id: item.id,
			google_business_vertical: 'retail',
		})),
		ecommerce: {
			transaction_id: `T_${Date.now()}`,
			value: getTotalPrice().toFixed(2),
			currency: 'BYN',
			items: totalItems,
		},
	};

	// This is a workaround to prevent the component from rendering on the server
	useEffect(() => {
		setIsClient(true);
		setIsLoading(false);
	}, []);

	if (!isClient) return <Loader label="Загрузка корзины..." />;

	if (items.length === 0) {
		return (
			<div className="min-h-[50vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-6 text-center">
					<div className="flex flex-col items-center space-y-4">
						<svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
						</svg>
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Корзина пуста</h2>
							<p className="text-base text-gray-500 sm:text-lg">Добавьте товары в корзину</p>
						</div>
						<ProductsNotFoundMenu />
					</div>
				</div>
			</div>
		);
	}

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// GTM push: purchase
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push(purchaseData);
			await handleSubmit(e as React.FormEvent<HTMLFormElement>);
			// If form submission is successful, set orderSubmitted to true
			setOrderSubmitted(true);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<Form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" validationBehavior="native" onSubmit={handleFormSubmit}>
			{isPending && (
				<div className="z-50 fixed top-0 left-0 w-full h-full bg-background">
					<Loader label="Отправка заказа..." />
				</div>
			)}
			<div className="w-full">
				{/* Contact information */}
				<FormContactFields setPhoneValid={setPhoneValid} />

				{/* Payment */}
				<div className="mt-10 border-t border-gray-200 pt-10">
					<FormPaymentFields fileUploaded={fileUploaded} fileUploadedName={fileUploadedName} handleFileChange={handleFileChange} />
				</div>
			</div>

			{/* Order summary */}
			<div className="mt-10 lg:mt-0 sticky top-20 self-start">
				<h2 className="text-lg font-medium text-gray-900">Заказ</h2>

				<div className="mt-4 rounded-small border border-gray-200 bg-white shadow-sm">
					<h3 className="sr-only">Товары в корзине</h3>
					<ul className="divide-y divide-gray-200">
						{isLoading ? (
							<Loader />
						) : (
							items.map((product: any) => (
								<li key={product.id} className="flex flex-wrap gap-4 px-4 py-6 sm:px-6">
									<div className="w-16">
										<Image alt={product.name} as={NextImage} className="object-contain" fallbackSrc={'/images/empty-product.jpg'} height={64} src={product.image} width={64} />
									</div>

									<div className="flex flex-col flex-1 ">
										<div className="flex gap-2">
											<div className="min-w-0 flex-1">
												<h4 className="text-sm">
													<div className="font-medium text-gray-700 hover:text-gray-800">{product.name}</div>
												</h4>
												<p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
												{product.selectedSize && <p className="mt-1 text-sm text-gray-500">Размер: {product.selectedSize}</p>}
												{product.selectedColor && <p className="mt-1 text-sm text-gray-500">Цвет: {product.selectedColor}</p>}
											</div>

											<div className="flow-root shrink-0">
												<Button isIconOnly className="text-gray-400" color="default" size="sm" type="button" variant="light" onPress={() => removeItemCompletely(product.id)}>
													<span className="sr-only">Удалить</span>
													<TrashIcon aria-hidden="true" size={18} />
												</Button>
											</div>
										</div>

										<div className="flex flex-wrap gap-2 flex-1 items-end justify-between pt-2">
											<p className="mt-1 text-sm font-medium text-gray-900">
												{product.price} ${CURRENCIES_SYMBOLS['BYN'] || 'р'}
											</p>

											<div className="basis-20">
												<QuantityControls itemCount={product.quantity} onDecrease={() => removeItem(product.id)} onIncrease={() => addItem(product)} />
											</div>
										</div>
									</div>
								</li>
							))
						)}
					</ul>
					<dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
						<div className="flex items-center justify-between">
							<dt className="text-sm">Сумма</dt>
							<dd className="text-sm font-medium text-gray-900">
								{getTotalPrice().toFixed(2)} ${CURRENCIES_SYMBOLS['BYN'] || 'р'}
							</dd>
						</div>
						<div className="flex items-center justify-between border-t border-gray-200 pt-6">
							<dt className="text-lg font-bold">Итого</dt>
							<dd className="text-lg font-bold text-gray-900">
								{getTotalPrice().toFixed(2)} ${CURRENCIES_SYMBOLS['BYN'] || 'р'}
							</dd>
						</div>
					</dl>

					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
						<Button
							className="w-full bg-brand-gradient font-semibold disabled:cursor-not-allowed pointer-events-auto"
							color="primary"
							isDisabled={!phoneValid || isPending}
							isLoading={isPending}
							radius="sm"
							size="lg"
							type="submit"
						>
							{isPending ? 'Отправка...' : 'Подтвердить заказ'}
						</Button>
					</div>
				</div>
			</div>
		</Form>
	);
}
