import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface ShippingInformationProps {
    formData: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        country: string;
        postalCode: string;
        phone: string;
    };
    onChange: (field: string, value: string) => void;
}

export const ShippingInformation = ({ formData, onChange }: ShippingInformationProps) => {
    return (
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
                            value={formData.firstName}
                            onChange={(e) => onChange('firstName', e.target.value)}
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
                            value={formData.lastName}
                            onChange={(e) => onChange('lastName', e.target.value)}
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
                            value={formData.address}
                            onChange={(e) => onChange('address', e.target.value)}
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
                            value={formData.city}
                            onChange={(e) => onChange('city', e.target.value)}
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
                            value={formData.country}
                            onChange={(e) => onChange('country', e.target.value)}
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="belarus">Республика Беларусь</option>
                            <option value="russia">Россия</option>
                        </select>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
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
                            value={formData.postalCode}
                            onChange={(e) => onChange('postalCode', e.target.value)}
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
                            value={formData.phone}
                            onChange={(e) => onChange('phone', e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}; 