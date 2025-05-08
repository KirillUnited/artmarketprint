'use client';

import NextImage from 'next/image';
import Loader from '@/components/ui/Loader';
import { QuantityControls } from '@/components/ui/AddToBasketButton';
import { TrashIcon } from 'lucide-react';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Image } from '@heroui/image';
import { useEffect, useState } from 'react';
import useBasketStore from '@/store/store';
import { useCartForm } from '@/hooks/useCartForm';
import FormContactFields from './FormContactFields';
import FormPaymentFields from './FormPaymentFields';

const deliveryMethods = [
    { id: 1, name: 'Самовывоз', title: 'Самовывоз', turnaround: 'Бесплатно', price: 0 },
    { id: 2, name: 'Доставка', title: 'Доставка', turnaround: '1–5 дней', price: 10.00 },
]

export default function CartForm() {
    const items = useBasketStore((state) => state.items);
    const removeItem = useBasketStore((state) => state.removeItem);
    const removeItemCompletely = useBasketStore((state) => state.removeItemCompletely);
    const addItem = useBasketStore((state) => state.addItem);
    const getTotalPrice = useBasketStore((state) => state.getTotalPrice);
    const [isClient, setIsClient] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);
    const { isLoading, setIsLoading, isPending, handleFileChange, handleSubmit, fileUploaded, fileUploadedName } = useCartForm();

    // This is a workaround to prevent the component from rendering on the server
    useEffect(() => {
        setIsClient(true);
        setIsLoading(false);
    }, []);

    if (!isClient) return null;

    if (items.length === 0) {
        return (
            <div className='flex flex-col gap-4 items-center justify-center h-full'>
                <p className='text-large font-medium'>Корзина пуста</p>
                <p className='text-small text-foreground/80'>Добавьте товары в корзину</p>
            </div>
        )
    } 

    return (
        <Form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
            onSubmit={handleSubmit}
            validationBehavior='native'
        >
            {
                isPending && <div className='z-50 fixed top-0 left-0 w-full h-full bg-background'>
                    <Loader label='Отправка заказа...' />
                </div>
            }
            <div className='w-full'>
                {/* Contact information */}
                <FormContactFields setPhoneValid={setPhoneValid} />

                {/* Payment */}
                <div className="mt-10 border-t border-gray-200 pt-10">
                    <FormPaymentFields handleFileChange={handleFileChange} fileUploaded={fileUploaded} fileUploadedName={fileUploadedName} />
                </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0 sticky top-20 self-start">
                <h2 className="text-lg font-medium text-gray-900">Заказ</h2>

                <div className="mt-4 rounded-small border border-gray-200 bg-white shadow-sm">
                    <h3 className="sr-only">Товары в корзине</h3>
                    <ul className="divide-y divide-gray-200">
                        {isLoading ? <Loader /> : items.map((product: any) => (
                            <li key={product.id} className="flex flex-wrap gap-4 px-4 py-6 sm:px-6">
                                <div className="w-16">
                                    <Image as={NextImage} className='object-contain' src={product.image} alt={product.name} width={64} height={64} fallbackSrc={`/images/empty-product.jpg`} />
                                </div>

                                <div className="flex flex-col flex-1 ">
                                    <div className="flex gap-2">
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-sm">
                                                <div className="font-medium text-gray-700 hover:text-gray-800">
                                                    {product.name}
                                                </div>
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                            {product.selectedSize && (
                                                <p className="mt-1 text-sm text-gray-500">Размер: {product.selectedSize}</p>
                                            )}
                                            {product.selectedColor && (
                                                <p className="mt-1 text-sm text-gray-500">Цвет: {product.selectedColor}</p>
                                            )}
                                        </div>

                                        <div className="flow-root shrink-0">
                                            <Button
                                                type="button"
                                                onPress={() => removeItemCompletely(product.id)}
                                                isIconOnly
                                                size="sm"
                                                variant='light'
                                                color='default'
                                                className='text-gray-400'
                                            >
                                                <span className="sr-only">Удалить</span>
                                                <TrashIcon aria-hidden="true" size={18} />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 flex-1 items-end justify-between pt-2">
                                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price} р.</p>

                                        <div className='basis-20'>
                                            <QuantityControls
                                                itemCount={product.quantity}
                                                onDecrease={() => removeItem(product.id)}
                                                onIncrease={() => addItem(product)} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                            <dt className="text-sm">Сумма</dt>
                            <dd className="text-sm font-medium text-gray-900">{getTotalPrice().toFixed(2)} р.</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                            <dt className="text-lg font-bold">Итого</dt>
                            <dd className="text-lg font-bold text-gray-900">
                                {getTotalPrice().toFixed(2)} р.
                            </dd>
                        </div>
                    </dl>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <Button
                            type="submit"
                            className="w-full bg-brand-gradient font-semibold disabled:cursor-not-allowed pointer-events-auto"
                            radius="sm"
                            size="lg"
                            color="primary"
                            isDisabled={!phoneValid || isPending}
                            isLoading={isPending}
                        >
                            {isPending ? 'Отправка...' : 'Подтвердить заказ'}
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    )
}

