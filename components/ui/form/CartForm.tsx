'use client';

import NextImage from 'next/image';
import Loader from '@/components/ui/Loader';
import { QuantityControls } from '@/components/ui/AddToBasketButton';
import { ChevronDownIcon, TrashIcon } from 'lucide-react';
import { Button } from '@heroui/button';
import { createProductCheckoutOrder } from '@/lib/actions/order.actions';
import { toast } from 'sonner';
import { Form } from '@heroui/form';
import { Image } from '@heroui/image';
import { FormEvent, useEffect, useState } from 'react';
import useBasketStore from '@/store/store';

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
    const clearBasket = useBasketStore((state) => state.clearBasket);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0]);
    const [isClient, setIsClient] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // This is a workaround to prevent the component from rendering on the server
    useEffect(() => {
        setIsClient(true);
        setIsLoading(false);
    }, []);

    if (!isClient) return null;

    // Handle PDF file upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true); // Show loading UI

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Ошибка загрузки файла', {
                    description: 'Размер файла не должен превышать 5MB',
                });
                setIsLoading(false); // Hide loading UI
                return;
            }
            if (file.type !== 'application/pdf') {
                toast.error('Ошибка загрузки файла', {
                    description: 'Поддерживается только формат PDF',
                });
                setIsLoading(false); // Hide loading UI
                return;
            }

            // Simulate file upload process
            setTimeout(() => {
                setIsLoading(false); // Hide loading UI after upload
                toast.success('Файл успешно загружен');
            }, 2000); // Simulate 2 seconds upload time
        }
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        // Add cart items to form data
        const cartItems = items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
        }));
        formData.append('items', JSON.stringify(cartItems));

        setIsPending(true);

        try {
            const result = await createProductCheckoutOrder(formData);

            if (result.ok) {
                form.reset();
                toast.success('Заявка отправлена', {
                    description: `Заказ от ${new Date().toLocaleString()}. Спасибо за заявку! Мы свяжемся с Вами в ближайшее время.`,
                })
                clearBasket();
            }
        } catch (error) {
            console.error(error);
            toast.error('Ошибка отправки заказа', {
                description: 'Пожалуйста, попробуйте еще раз позже.',
            });
        } finally {
            setIsPending(false);
        }
    }

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
            <div className='w-full'>
                <fieldset>
                    <legend className="text-lg font-medium text-gray-900">Контактная информация</legend>

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
                                    required
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
                                    required
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
                                    required
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

                        <div className="sm:col-span-2">
                            <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-700">
                                Телефон
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    required
                                    className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                    </div>
                </fieldset>

                {/* Payment */}
                <div className="mt-10 border-t border-gray-200 pt-10">
                    <fieldset>
                        <legend className="text-lg font-medium text-gray-900">Оплата</legend>
                        <div className="sm:col-span-2 mt-4">
                            <label htmlFor="requisites" className="block text-sm/6 font-medium text-gray-700">
                                Реквизиты
                            </label>
                            <div className="mt-2">
                                <input
                                    id="requisites"
                                    name="requisites"
                                    type="text"
                                    className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2 mt-4">
                            <label htmlFor="requisites-pdf" className="block text-sm/6 font-medium text-gray-700">
                                Реквизиты (PDF)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="requisites-pdf"
                                    name="requisites-pdf"
                                    type="file"
                                    accept=".pdf"
                                    required
                                    onChange={handleFileChange}
                                    className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                Загрузите файл с реквизитами в формате PDF (не более 5MB)
                            </p>
                        </div>
                        <div className="sm:col-span-2 mt-4">
                            <label htmlFor="email-address" className="block text-sm/6 font-medium text-gray-700">
                                Электронная почта
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email-address"
                                    name="email-address"
                                    type="email"
                                    required
                                    className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2 mt-4">
                            <label htmlFor="comment" className="block text-sm/6 font-medium text-gray-700">
                                Комментарий
                            </label>
                            <div className="mt-2">
                                <textarea
                                    placeholder='Напишите комментарий к заказу'
                                    id="comment"
                                    name="comment"
                                    rows={5}
                                    className="block w-full rounded-small bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>

                        </div>

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
                            <li key={product.id} className="flex gap-4 px-4 py-6 sm:px-6">
                                <div className="shrink-0">
                                    <Image as={NextImage} src={product.image} alt={product.name} width={64} height={64} />
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <div className="flex gap-2">
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-sm">
                                                <div className="font-medium text-gray-700 hover:text-gray-800">
                                                    {product.name}
                                                </div>
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                        </div>

                                        <div className="flow-root">
                                            <button
                                                type="button"
                                                className="flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
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
                            disabled={isPending}
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
