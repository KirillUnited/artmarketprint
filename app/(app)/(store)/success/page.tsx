import { Button } from '@heroui/button'
import Link from 'next/link'
import React from 'react'

export default function SuccessPage() {

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-small shadow-lg p-8 text-center">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-16 w-16 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Спасибо за ваш заказ!
                </h1>
                <p className="text-gray-600 mb-8 text-balance">
                    Мы получили ваш заказ и скоро начнем его обработку. Мы свяжемся с Вами в ближайшее время.
                </p>
                <div className="flex flex-col gap-4">
                    <Button color='primary' as={Link} href={'/products'} size='md' radius='sm'>
                        Продолжить покупки
                    </Button>
                    <Button color='secondary' variant='bordered' as={Link} href={'/'} size='md' radius='sm'>
                        Вернуться на главную
                    </Button>
                </div>
            </div>
        </div>
    )
}
