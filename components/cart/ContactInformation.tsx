import React from 'react';

interface ContactInformationProps {
    email: string;
    onChange: (email: string) => void;
}

export const ContactInformation = ({ email, onChange }: ContactInformationProps) => {
    return (
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
                        value={email}
                        onChange={(e) => onChange(e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>
        </div>
    );
}; 