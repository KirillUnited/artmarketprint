'use client';
import { Form } from '@heroui/form'
import { Input, Textarea } from '@heroui/input'
import React, { useState } from 'react'
import clsx from 'clsx'
import { Alert } from '@heroui/alert';

import BrandButton from './BrandButton'

import { sendOrder } from '@/lib/actions/order.actions';


export default function OrderForm({ className }: { className?: string }): JSX.Element {
    const [isPending, setIsPending] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const phoneRegex = /^\+375[-\s]?\(?\d{2}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        event.currentTarget.reset();

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
                    name='user_name'
                    placeholder="Напишите Ваше имя"
                    radius='sm'
                    variant="bordered"
                />
                <Input
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
                />
                <Textarea
                    color="primary"
                    id='comment'
                    label="Комментарий"
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
