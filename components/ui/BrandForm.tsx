import { Form } from '@heroui/form'
import { Input, Textarea } from '@heroui/input'
import React from 'react'
import BrandButton from './BrandButton'
import clsx from 'clsx'

export default function BrandForm({ className }: { className?: string }): JSX.Element {
    return (
        <Form validationBehavior="native" className={clsx('gap-6', className)}>
            <h3 className="text-2xl md:text-3xl leading-[120%] font-bold">
                Оставить заявку
            </h3>
            <div className="w-full flex flex-col gap-4">
                <Input
                    isRequired
                    errorMessage="Пожалуйста, введите Ваше имя"
                    label="Имя"
                    placeholder="Напишите Ваше имя"
                    variant="bordered"
                    radius='sm'
                    className='bg-background'
                />
                <Input
                    isRequired
                    errorMessage="Пожалуйста, введите действительный номер телефона"
                    label="Телефон"
                    placeholder="Введите Ваш телефон"
                    type="tel"
                    variant="bordered"
                    radius='sm'
                    className='bg-background'
                />
                <Textarea
                    label="Комментарий"
                    placeholder="Введите Ваш комментарий"
                    variant="bordered"
                    radius='sm'
                    className='bg-background'
                />
            </div>
            <div className="w-full">

                <BrandButton className='flex-1 basis-32' state='primary' type="submit">ЗАКАЗАТЬ</BrandButton>
            </div>

        </Form>
    )
}
