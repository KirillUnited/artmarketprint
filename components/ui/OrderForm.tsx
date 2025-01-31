import { Form } from '@heroui/form'
import { Input, Textarea } from '@heroui/input'
import React from 'react'
import BrandButton from './BrandButton'
import clsx from 'clsx'
import {sendOrder} from "@/lib/actions/order.actions";

export default function OrderForm({ className }: { className?: string }): JSX.Element {
    return (
        <Form
            action={sendOrder}
            className={clsx('gap-6', className)} 
            validationBehavior="native">
            <h3 className="text-2xl md:text-3xl leading-[120%] font-bold">
                Оставить заявку
            </h3>
            <div className="w-full flex flex-col gap-4">
                <Input
                    isRequired
                    id='user_name'
                    name='user_name'
                    color="primary"
                    errorMessage="Пожалуйста, введите Ваше имя"
                    label="Имя"
                    placeholder="Напишите Ваше имя"
                    radius='sm'
                    variant="bordered"
                />
                <Input
                    isRequired
                    id='user_phone'
                    name='user_phone'
                    color="primary"
                    errorMessage="Пожалуйста, введите действительный номер телефона"
                    label="Телефон"
                    placeholder="Введите Ваш телефон"
                    radius='sm'
                    type="tel"
                    variant="bordered"
                />
                <Textarea
                    id='comment'
                    name='user_comment'
                    color="primary"
                    label="Комментарий"
                    placeholder="Введите Ваш комментарий"
                    radius='sm'
                    variant="bordered"
                />
            </div>
            <div className="w-full flex flex-wrap">

                <BrandButton className='flex-1 basis-32' state='primary' type="submit">ОТПРАВИТЬ</BrandButton>
            </div>

        </Form>
    )
}
