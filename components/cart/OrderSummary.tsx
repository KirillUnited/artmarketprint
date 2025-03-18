import React from 'react';
import { BasketItem } from '@/store/store';
import { Trash2 } from 'lucide-react';

interface OrderSummaryProps {
    items: BasketItem[];
    onRemoveItem: (id: string) => void;
}

export const formatPrice = (price: number): string => {
    return `${price.toFixed(2)} BYN`;
};

export const OrderSummary = ({ items, onRemoveItem }: OrderSummaryProps) => {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 5.00;
    const total = subtotal + shipping;

    return (
        <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Сводка заказа</h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <ul  className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                    src={item.image}
                                    alt={item.description}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">{formatPrice(item.price)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Количество {item.quantity}</p>

                                    <div className="flex">
                                        <button
                                            type="button"
                                            onClick={() => onRemoveItem(item.id)}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Подытог</p>
                        <p>{formatPrice(subtotal)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Доставка и обработка</p>
                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Доставка</p>
                            <p className="text-sm font-medium text-gray-900">{formatPrice(shipping)}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                        <p className="text-base font-medium text-gray-900">Итого</p>
                        <p className="text-base font-medium text-gray-900">{formatPrice(total)}</p>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                            Оформить заказ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}; 