'use client';
import { Form } from '@heroui/form'
import { Input, Textarea } from '@heroui/input'
import React, { useState } from 'react'
import clsx from 'clsx'
import { Alert } from '@heroui/alert';
import { Select, SelectItem } from "@heroui/select";
import BrandButton from '@/components/ui/BrandButton';

import { sendOrder } from '@/lib/actions/order.actions';

import { PhoneNumberUtil } from "google-libphonenumber";
import { defaultCountries, FlagImage, parseCountry, usePhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['by', 'ru'].includes(iso2);
});
const phoneUtil = PhoneNumberUtil.getInstance();
const isPhoneValid = (phone: string) => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};

export default function OrderForm({ className }: { className?: string }): JSX.Element {
    const [isPending, setIsPending] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    // const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const validPhone = isPhoneValid(phone);
    const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput(
        {
            defaultCountry: "by",
            value: phone,
            countries: countries,
            defaultMask: '+375 (12) 345-67-89',
            onChange: (data) => {
                setPhone(data.phone);
            },

        }
    );

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        event.currentTarget.reset();
        setPhone('');
        setIsPending(true);

        try {
            const result = await sendOrder(formData);

            if (result.ok) {
                setIsPending(false);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form
            id='orderForm'
            className={clsx('gap-6', className)}
            validationBehavior="native"
            onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-4">
                {
                    showAlert && <Alert
                        className="w-full text-white/80"
                        color='success'
                        description="Спасибо за заявку! Мы свяжемся с Вами в ближайшее время."
                        title="Заявка отправлена"
                        variant='solid'
                        onClose={() => setShowAlert(false)}
                    />}
                <Input
                    isRequired
                    color="primary"
                    errorMessage="Пожалуйста, введите Ваше имя"
                    id='user_name'
                    label="Имя"
                    labelPlacement='outside'
                    name='user_name'
                    placeholder="Напишите Ваше имя"
                    radius='sm'
                    variant="bordered"
                />
                <Input
                    value={inputValue}
                    onChange={handlePhoneValueChange}
                    type="tel"
                    ref={inputRef}
                    aria-label={'Телефон'}
                    isRequired
                    color="primary"
                    errorMessage="Пожалуйста, введите действительный номер телефона"
                    id='user_phone'
                    label="Телефон"
                    labelPlacement='outside'
                    name='user_phone'
                    radius='sm'
                    variant="bordered"
                    validate={(value) => {
                        if (!validPhone) return 'Пожалуйста, введите корректный номер в формате +375 XX XXX-XX-XX';
                    }}
                    placeholder='+375 (__) ___-__-__'
                    startContent={
                        <Select
                            selectedKeys={[country.iso2]}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-16"
                            startContent={<FlagImage iso2={country.iso2} />}
                            aria-label="Select country"
                            classNames={{
                                popoverContent: 'w-60',
                                value: 'hidden',
                                listbox: 'w-60',
                                trigger: 'bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0',
                            }}
                        >
                            {countries.map((c) => {
                                const country = parseCountry(c);

                                return (
                                    <SelectItem
                                        key={country.iso2}
                                        textValue={country.name}
                                    >
                                        <div className="flex items-center gap-2">
                                            <FlagImage iso2={country.iso2} />
                                            <span>{country.name}</span>
                                            <span className='font-light text-gray-600'>+{country.dialCode}</span>
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </Select>
                    }
                />
                <Textarea
                    color="primary"
                    id='comment'
                    label="Комментарий"
                    labelPlacement='outside'
                    name='user_comment'
                    placeholder="Введите Ваш комментарий"
                    radius='sm'
                    variant="bordered"
                />
            </div>
            <div className="w-full flex flex-wrap">

                <BrandButton className='flex-1 basis-32 uppercase' isDisabled={isPending} isLoading={isPending} state='primary' type="submit" size='md'>
                    {isPending ? 'Отправка...' : 'ОТПРАВИТЬ'}
                </BrandButton>
            </div>

        </Form>
    )
}
