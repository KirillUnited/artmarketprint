'use client';
import { Form } from '@heroui/form'
import { Input, Textarea } from '@heroui/input'
import React, { useState } from 'react'
import clsx from 'clsx'
import { Alert } from '@heroui/alert';
import { Select, SelectItem } from "@heroui/select";
import BrandButton from '../BrandButton'

import { sendOrder } from '@/lib/actions/order.actions';


import { defaultCountries, FlagImage, parseCountry, usePhoneInput } from "react-international-phone";
import "react-international-phone/style.css";


export default function OrderForm({ className }: { className?: string }): JSX.Element {
    const [isPending, setIsPending] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [phone, setPhone] = useState("");
    const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
        usePhoneInput({
            defaultCountry: "by",
            value: phone,
            countries: defaultCountries,
            onChange: (data) => setPhone(data.phone),
        });

    const phoneRegex = /^\+375[-\s]?\(?\d{2}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

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
            <div className='flex flex-col gap-2'>
                <h3 className="text-2xl md:text-3xl leading-[120%] font-bold">
                    Оставить заявку
                </h3>
                <p>Оставьте заявку и мы свяжемся с Вами в ближайшее время</p>
            </div>
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
                {/* <Input
                    isRequired
                    color="primary"
                    errorMessage="Пожалуйста, введите действительный номер телефона"
                    id='user_phone'
                    label="Телефон"
                    name='user_phone'
                    placeholder="+375 (99) 999-99-99"
                    radius='sm'
                    type="tel"
                    validate={(value) => {
                        if (!value.match(phoneRegex)) return 'Пожалуйста, введите корректный номер в формате +375 XX XXX-XX-XX';
                    }}
                    variant="bordered"
                /> */}
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
                            {defaultCountries.map((c) => {
                                const country = parseCountry(c);

                                return (
                                    <SelectItem
                                        key={country.iso2}
                                        textValue={country.name}
                                    >
                                        <div className="flex items-center gap-2">
                                            <FlagImage iso2={country.iso2} />
                                            <span>{country.name}</span>
                                            <span>+{country.dialCode}</span>
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

                <BrandButton className='flex-1 basis-32 uppercase' isDisabled={isPending} isLoading={isPending} state='primary' type="submit">
                    {isPending ? 'Отправка...' : 'ОТПРАВИТЬ'}
                </BrandButton>
            </div>

        </Form>
    )
}
