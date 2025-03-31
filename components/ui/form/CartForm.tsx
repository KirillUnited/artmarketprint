'use client';

import NextImage from 'next/image';
import Loader from '@/components/ui/Loader';
import { QuantityControls } from '@/components/ui/AddToBasketButton';
import { TrashIcon } from 'lucide-react';
import { Button } from '@heroui/button';
import { createProductCheckoutOrder, sendProductCheckoutFile } from '@/lib/actions/order.actions';
import { toast } from 'sonner';
import { Form } from '@heroui/form';
import { Image } from '@heroui/image';
import { FormEvent, useEffect, useState } from 'react';
import useBasketStore from '@/store/store';
import CartFormInput from './CartFormInput';
import { Select, SelectItem } from '@heroui/select';
import { UserPhoneInput } from './UserPhoneInput';
import { useRouter } from 'next/navigation';

const deliveryMethods = [
    { id: 1, name: 'Самовывоз', title: 'Самовывоз', turnaround: 'Бесплатно', price: 0 },
    { id: 2, name: 'Доставка', title: 'Доставка', turnaround: '1–5 дней', price: 10.00 },
]

const countryOptions = [
    { key: 'by', value: 'Республика Беларусь' },
    { key: 'ru', value: 'Россия' },
]

export default function CartForm() {
    const router = useRouter();
    const items = useBasketStore((state) => state.items);
    const removeItem = useBasketStore((state) => state.removeItem);
    const removeItemCompletely = useBasketStore((state) => state.removeItemCompletely);
    const addItem = useBasketStore((state) => state.addItem);
    const getTotalPrice = useBasketStore((state) => state.getTotalPrice);
    const clearBasket = useBasketStore((state) => state.clearBasket);
    const [isClient, setIsClient] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [phoneValid, setPhoneValid] = useState(false);

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
                clearBasket();
                router.push('/success');
            }
        } catch (error) {
            console.error(error);
            toast.warning('Ошибка отправки заказа', {
                description: 'Пожалуйста, попробуйте еще раз позже.',
            });
        } finally {
            setIsPending(false);
        }

        try {
            const sendAttach = await sendProductCheckoutFile(formData);
        } catch (error) {
            console.error(error);
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
            {
                isPending && <div className='z-50 fixed top-0 left-0 w-full h-full bg-white/50'>
                    <Loader />
                </div>
            }
            <div className='w-full'>
                <fieldset>
                    <legend className="text-lg font-medium text-gray-900">Контактная информация</legend>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <CartFormInput
                            isRequired
                            errorMessage="Пожалуйста, введите Ваше имя"
                            id='first-name'
                            name='first-name'
                            placeholder="Напишите Ваше имя"
                            label="Имя"
                        />
                        <CartFormInput
                            id='last-name'
                            label="Фамилия"
                            name='last-name'
                            placeholder='Напишите Вашу фамилию'
                        />

                        <div className="sm:col-span-2">
                            <CartFormInput
                                label="Компания"
                                id="company"
                                name="company"
                                type="text"
                                placeholder='Напишите название компании'
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <CartFormInput
                                label='Адрес'
                                id="address"
                                name="address"
                                type="text"
                                placeholder='Напишите адрес'
                            />
                        </div>

                        <div className="sm:col-span-2">

                            <CartFormInput
                                label='Квартира, офис и т.д.'
                                id="apartment"
                                name="apartment"
                                type="text"
                                placeholder='Напишите номер квартиры, офиса и т.д.'
                            />
                        </div>

                        <div>
                            <CartFormInput
                                isRequired
                                label='Город'
                                id="city"
                                name="city"
                                type="text"
                                placeholder='Напишите город'
                            />
                        </div>

                        <div>
                            <Select
                                color="primary"
                                labelPlacement='outside'
                                radius='sm'
                                variant="bordered"
                                classNames={{
                                    trigger: 'border-1 bg-background',
                                }}
                                label="Страна"
                                id="country"
                                name="country"
                                placeholder='Выберите страну'
                                defaultSelectedKeys={['by']}
                            >
                                {
                                    countryOptions.map((option) => (
                                        <SelectItem key={option.key} textValue={option.value}>{option.value}</SelectItem>
                                    ))
                                }
                            </Select>
                        </div>

                        <div className="sm:col-span-2">
                            <UserPhoneInput validPhone={setPhoneValid} />
                        </div>

                    </div>
                </fieldset>

                {/* Payment */}
                <div className="mt-10 border-t border-gray-200 pt-10">
                    <fieldset className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <legend className="text-lg font-medium text-gray-900">Оплата</legend>
                        <div className="sm:col-span-2 mt-4">
                            <CartFormInput
                                isRequired
                                errorMessage="Пожалуйста, напишите название компании или реквизиты"
                                label='Реквизиты'
                                id="requisites"
                                name="requisites"
                                type="text"
                                placeholder='Напишите название компании или реквизиты'
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <CartFormInput
                                isRequired
                                errorMessage="Пожалуйста, загрузите файл с реквизитами"
                                label='Реквизиты (PDF)'
                                id="requisites-pdf"
                                name="requisites-pdf"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Загрузите файл с реквизитами в формате PDF (не более 5MB)
                            </p>
                        </div>
                        <div className="sm:col-span-2">
                            <CartFormInput
                                label='Почта'
                                id="email"
                                name="email"
                                type="email"
                                isRequired
                                errorMessage="Пожалуйста, введите Вашу почту"
                                placeholder='Напишите Вашу почту'
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <CartFormInput
                                placeholder='Напишите комментарий к заказу'
                                id="comment"
                                name="comment"
                                rows={5}
                                label="Комментарий"
                            />
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
