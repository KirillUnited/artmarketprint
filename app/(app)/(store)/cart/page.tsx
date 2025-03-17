'use client';
import Section, { SectionHeading, SectionTitle } from '@/components/layout/Section';
import useBasketStore from '@/store/store';
import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';
import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';
import Loader from '@/components/ui/Loader';
import { QuantityControls } from '@/components/ui/AddToBasketButton';
import { CheckCircleIcon, ChevronDownIcon, TrashIcon } from 'lucide-react';
import { Radio, RadioGroup } from '@heroui/radio';

const CartPage = () => {
    const items = useBasketStore((state) => state.items);
    const removeItem = useBasketStore((state) => state.removeItem);
    const addItem = useBasketStore((state) => state.addItem);
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const deliveryMethods = [
        { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '$5.00' },
        { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
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

    console.log('BASKET CONTENT', items);

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

            {/* <div className='flex flex-col gap-4'>
                {
                    isLoading ? <Loader /> :
                        items.map((item) => (
                            <Card key={item.id} shadow='sm' radius='sm'>
                                <CardBody className='flex md:flex-row flex-col gap-4 items-center'>
                                    <Image as={NextImage} src={item.image} alt={item.name} width={64} height={64} />
                                    <div className="flex-1 flex flex-col gap-0">
                                        <h1 className="text-large font-bold">{item.name}</h1>
                                        <p className="text-small text-foreground/80 line-clamp-2">Цена: <span className='text-base text-primary font-bold'>{item.price} р.</span></p>
                                        <p className="text-small text-foreground/80 line-clamp-2">Количество: {item.quantity} шт.</p>
                                    </div>
                                    <div className='basis-20'>
                                        <QuantityControls
                                            itemCount={item.quantity}
                                            onDecrease={() => removeItem(item.id)}
                                            onIncrease={() => addItem(item)} />
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                }
            </div> */}
            <div className="bg-gray-50">
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
                                            autoComplete="email"
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                                autoComplete="given-name"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                                autoComplete="family-name"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                                autoComplete="street-address"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                                autoComplete="country-name"
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
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
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                                autoComplete="postal-code"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                                autoComplete="tel"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <fieldset>
                                    <legend className="text-lg font-medium text-gray-900">Способ доставки</legend>
                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        {deliveryMethods.map((deliveryMethod) => (
                                            <div key={deliveryMethod.id} className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none">
                                                <input
                                                    type="radio"
                                                    name="delivery-method"
                                                    value={deliveryMethod.id}
                                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                                    onChange={(e) => setSelectedDeliveryMethod(deliveryMethod)}
                                                    checked={selectedDeliveryMethod.id === deliveryMethod.id}
                                                />
                                                <span className="flex flex-1 ml-3">
                                                    <span className="flex flex-col">
                                                        <span className="block text-sm font-medium text-gray-900">{deliveryMethod.title}</span>
                                                        <span className="mt-1 flex items-center text-sm text-gray-500">
                                                            {deliveryMethod.turnaround}
                                                        </span>
                                                        <span className="mt-6 text-sm font-medium text-gray-900">{deliveryMethod.price}</span>
                                                    </span>
                                                </span>
                                                <CheckCircleIcon
                                                    aria-hidden="true"
                                                    className="size-5 text-indigo-600 hidden peer-checked:block"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>

                            {/* Payment */}
                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h2 className="text-lg font-medium text-gray-900">Оплата</h2>

                                <fieldset className="mt-4">
                                    <legend className="sr-only">Способ оплаты</legend>
                                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                        {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                                            <div key={paymentMethod.id} className="flex items-center">
                                                <input
                                                    defaultChecked={paymentMethodIdx === 0}
                                                    id={paymentMethod.id}
                                                    name="payment-type"
                                                    type="radio"
                                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                                />
                                                <label htmlFor={paymentMethod.id} className="ml-3 block text-sm/6 font-medium text-gray-700">
                                                    {paymentMethod.title}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>

                                <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                                    <div className="col-span-4">
                                        <label htmlFor="card-number" className="block text-sm/6 font-medium text-gray-700">
                                            Номер карты
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="card-number"
                                                name="card-number"
                                                type="text"
                                                autoComplete="cc-number"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <label htmlFor="name-on-card" className="block text-sm/6 font-medium text-gray-700">
                                            Имя на карте
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name-on-card"
                                                name="name-on-card"
                                                type="text"
                                                autoComplete="cc-name"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-3">
                                        <label htmlFor="expiration-date" className="block text-sm/6 font-medium text-gray-700">
                                            Срок действия (ММ/ГГ)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="expiration-date"
                                                name="expiration-date"
                                                type="text"
                                                autoComplete="cc-exp"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="cvc" className="block text-sm/6 font-medium text-gray-700">
                                            CVC
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="cvc"
                                                name="cvc"
                                                type="text"
                                                autoComplete="csc"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="mt-10 lg:mt-0">
                            <h2 className="text-lg font-medium text-gray-900">Сводка заказа</h2>

                            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                                <h3 className="sr-only">Товары в корзине</h3>
                                <ul role="list" className="divide-y divide-gray-200">
                                    {items.map((product) => (
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
                                                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                                    </div>

                                                    <div className="ml-4 flow-root shrink-0">
                                                        <button
                                                            type="button"
                                                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                                        >
                                                            <span className="sr-only">Remove</span>
                                                            <TrashIcon aria-hidden="true" className="size-5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-1 items-end justify-between pt-2">
                                                    <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>

                                                    <div className="ml-4">
                                                        <div className="grid grid-cols-1">
                                                            <select
                                                                id="quantity"
                                                                name="quantity"
                                                                aria-label="Quantity"
                                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                            >
                                                                <option value={1}>1</option>
                                                                <option value={2}>2</option>
                                                                <option value={3}>3</option>
                                                                <option value={4}>4</option>
                                                                <option value={5}>5</option>
                                                                <option value={6}>6</option>
                                                                <option value={7}>7</option>
                                                                <option value={8}>8</option>
                                                            </select>
                                                            <ChevronDownIcon
                                                                aria-hidden="true"
                                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm">Подытог</dt>
                                        <dd className="text-sm font-medium text-gray-900">$64.00</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm">Доставка</dt>
                                        <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm">Налоги</dt>
                                        <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                        <dt className="text-base font-medium">Итого</dt>
                                        <dd className="text-base font-medium text-gray-900">$75.52</dd>
                                    </div>
                                </dl>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <button
                                        type="submit"
                                        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                    >
                                        Подтвердить заказ
                                    </button>
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