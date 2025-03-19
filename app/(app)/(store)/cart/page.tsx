'use client';
import Section, { SectionHeading, SectionTitle } from '@/components/layout/Section';
import useBasketStore from '@/store/store';
import { Image } from '@heroui/image';
import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';
import Loader from '@/components/ui/Loader';
import { QuantityControls } from '@/components/ui/AddToBasketButton';
import { ChevronDownIcon, TrashIcon } from 'lucide-react';
import { Button } from '@heroui/button';
import { RadioGroup } from '@heroui/radio';
import CustomRadio from '@/components/ui/form/CustomRadio';

const CartPage = () => {
    const items = useBasketStore((state) => state.items);
    const removeItem = useBasketStore((state) => state.removeItem);
    const removeItemCompletely = useBasketStore((state) => state.removeItemCompletely);
    const addItem = useBasketStore((state) => state.addItem);
    const getTotalPrice = useBasketStore((state) => state.getTotalPrice);
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const deliveryMethods = [
        { id: 1, title: 'Самовывоз', turnaround: 'Бесплатно', price: 0 },
        { id: 2, title: 'Доставка', turnaround: '1–5 дней', price: 10.00 },
    ]
    const paymentMethods = [
        { id: 'credit-card', title: 'Credit card' },
        { id: 'paypal', title: 'PayPal' },
        { id: 'etransfer', title: 'eTransfer' },
    ]

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])

    // This is a workaround to prevent the component from rendering on the server
    useEffect(() => {
        setIsClient(true);
        setIsLoading(false);
    }, []);

    if (!isClient) return null;

    if (items.length === 0) {
        return (
            <Section>
                <SectionHeading>
                    <SectionTitle>Корзина</SectionTitle>
                </SectionHeading>

                <div className='flex flex-col gap-4 items-center justify-center h-full'>
                    <p className='text-large font-medium'>Корзина пуста</p>
                    <p className='text-small text-foreground/80'>Добавьте товары в корзину</p>
                </div>
            </Section>
        )
    }
    return (
        <Section>
            <SectionHeading>
                <SectionTitle>Корзина</SectionTitle>
            </SectionHeading>

            <div className="bg-gray-50 rounded-small outline -outline-offset-1 outline-1 outline-gray-200">
                <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Оформление заказа</h2>

                    <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                        <div>
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Контактная информация</h2>

                                <div className="mt-4">
                                    <label htmlFor="email-address" className="block text-sm/6 font-medium text-gray-700">
                                        Электронная почта
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email-address"
                                            name="email-address"
                                            type="email"
                                            className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h2 className="text-lg font-medium text-gray-900">Информация о доставке</h2>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-700">
                                            Имя
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="first-name"
                                                name="first-name"
                                                type="text"
                                                className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-700">
                                            Фамилия
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="last-name"
                                                name="last-name"
                                                type="text"
                                                className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="company" className="block text-sm/6 font-medium text-gray-700">
                                            Компания
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="company"
                                                name="company"
                                                type="text"
                                                className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="address" className="block text-sm/6 font-medium text-gray-700">
                                            Адрес
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="address"
                                                name="address"
                                                type="text"
                                                className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="apartment" className="block text-sm/6 font-medium text-gray-700">
                                            Квартира, офис и т.д.
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="apartment"
                                                name="apartment"
                                                type="text"
                                                className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-700">
                                            Город
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-700">
                                            Страна
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select
                                                id="country"
                                                name="country"
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-small bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            >
                                                <option>Республика Беларусь</option>
                                                <option>Россия</option>
                                            </select>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="region" className="block text-sm/6 font-medium text-gray-700">
                                            Область / Регион
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="region"
                                                name="region"
                                                type="text"
                                                className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-700">
                                            Почтовый индекс
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="postal-code"
                                                name="postal-code"
                                                type="text"
                                                className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-700">
                                            Телефон
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery */}
                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <fieldset>
                                    <legend className="text-lg font-medium text-gray-900">Способ доставки</legend>
                                    <RadioGroup
                                        onChange={(e) => {
                                            const method = deliveryMethods.find(method => method.id.toString() === e.target.value);
                                            if (method) setSelectedDeliveryMethod(method);
                                        }}
                                        value={selectedDeliveryMethod.id.toString()}
                                        orientation='horizontal' className='mt-4'
                                        name='delivery-method'
                                        >
                                        {deliveryMethods.map((deliveryMethod, deliveryMethodIdx) => (
                                            <CustomRadio key={deliveryMethod.id} description={deliveryMethod.turnaround} value={deliveryMethod.id.toString()}>
                                                <div className='flex flex-col gap-1'>
                                                    <span className="text-sm font-semibold text-gray-900">{deliveryMethod.title}</span>
                                                    <span className="text-sm font-semibold text-gray-900">{deliveryMethod.price} р.</span>
                                                </div>
                                            </CustomRadio>
                                        ))}
                                    </RadioGroup>
                                </fieldset>
                            </div>

                            {/* Payment */}
                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h2 className="text-lg font-medium text-gray-900">Оплата</h2>

                                <fieldset className="mt-4">
                                    <legend className="sr-only">Способ оплаты</legend>
                                    <RadioGroup orientation='horizontal' className='gap-4'>
                                        {paymentMethods.map((paymentMethod) => (
                                            <CustomRadio key={paymentMethod.id} value={paymentMethod.id}>
                                                <span className="text-sm font-medium text-gray-900">{paymentMethod.title}</span>
                                            </CustomRadio>
                                        ))}
                                    </RadioGroup>
                                </fieldset>
                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="mt-10 lg:mt-0 sticky top-20 self-start">
                            <h2 className="text-lg font-medium text-gray-900">Заказ</h2>

                            <div className="mt-4 rounded-small border border-gray-200 bg-white shadow-sm">
                                <h3 className="sr-only">Товары в корзине</h3>
                                <ul className="divide-y divide-gray-200">
                                    {isLoading ? <Loader /> : items.map((product) => (
                                        <li key={product.id} className="flex px-4 py-6 sm:px-6">
                                            <div className="shrink-0">
                                                <Image as={NextImage} src={product.image} alt={product.name} width={64} height={64} />
                                            </div>

                                            <div className="ml-6 flex flex-1 flex-col">
                                                <div className="flex">
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="text-sm">
                                                            <div className="font-medium text-gray-700 hover:text-gray-800">
                                                                {product.name}
                                                            </div>
                                                        </h4>
                                                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                                    </div>

                                                    <div className="ml-4 flow-root shrink-0">
                                                        <button
                                                            type="button"
                                                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                                            onClick={() => removeItemCompletely(product.id)}
                                                        >
                                                            <span className="sr-only">Удалить</span>
                                                            <TrashIcon aria-hidden="true" className="size-5" />
                                                        </button>
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
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm">Доставка</dt>
                                        <dd className="text-sm font-medium text-gray-900">{selectedDeliveryMethod.price.toFixed(2)} р.</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                        <dt className="text-lg font-bold">Итого</dt>
                                        <dd className="text-lg font-bold text-gray-900">
                                            {(getTotalPrice() + selectedDeliveryMethod.price).toFixed(2)} р.
                                        </dd>
                                    </div>
                                </dl>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <Button
                                        type="submit"
                                        className="w-full bg-brand-gradient font-semibold"
                                        radius="sm"
                                        size="lg"
                                        color="primary"
                                    >
                                        Подтвердить заказ
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        </Section>
    );
};

export default CartPage;