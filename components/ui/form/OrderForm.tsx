'use client';
import { Form } from '@heroui/form'
import React from 'react'
import clsx from 'clsx'
import { Alert } from '@heroui/alert';
import BrandButton from '@/components/ui/BrandButton';
import "react-international-phone/style.css";
import useForm from '@/hooks/useForm';
import { UsernameInput } from './UsernameInput';
import { UserPhoneInput } from './UserPhoneInput';
import { UserTextareaInput } from './UserTextareaInput';

export default function OrderForm({ className, onClose }: { className?: string, onClose?: () => void }): JSX.Element {
    const {
        isPending,
        inputValue,
        handlePhoneValueChange,
        inputRef,
        country,
        setCountry,
        countries,
        validPhone,
        handleSubmit,
    } = useForm(onClose || (() => { }));

    return (
        <Form
            id='orderForm'
            className={clsx('gap-6', className)}
            validationBehavior="native"
            onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-4">
                <UsernameInput />

                <UserPhoneInput inputValue={inputValue} handlePhoneValueChange={handlePhoneValueChange} inputRef={inputRef} country={country} setCountry={setCountry} countries={countries} validPhone={validPhone} />

                <UserTextareaInput />
            </div>
            <div className="w-full flex flex-wrap">

                <BrandButton className='flex-1 basis-32 uppercase' isDisabled={isPending} isLoading={isPending} state='primary' type="submit" size='md'>
                    {isPending ? 'Отправка...' : 'ОТПРАВИТЬ'}
                </BrandButton>
            </div>

        </Form>
    )
}