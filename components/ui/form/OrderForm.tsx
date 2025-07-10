'use client';
import { Form } from '@heroui/form'
import React, {JSX} from 'react'
import clsx from 'clsx'

import BrandButton from '@/components/ui/BrandButton';

import 'react-international-phone/style.css';
import { UsernameInput } from './UsernameInput';
import { UserPhoneInput } from './UserPhoneInput';
import { UserTextareaInput } from './UserTextareaInput';

import useForm from '@/hooks/useForm';

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
    const [phoneValid, setPhoneValid] = React.useState(false);

    return (
        <Form
            className={clsx('gap-6', className)}
            id='orderForm'
            validationBehavior="native"
            onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-4">
                <UsernameInput />

                <UserPhoneInput countries={countries} country={country} handlePhoneValueChange={handlePhoneValueChange} inputRef={inputRef} inputValue={inputValue} setCountry={setCountry} validPhone={setPhoneValid} />

                <UserTextareaInput />
            </div>
            <div className="w-full flex flex-wrap">

                <BrandButton className='flex-1 basis-32 uppercase disabled:cursor-not-allowed pointer-events-auto' isDisabled={!phoneValid || isPending} isLoading={isPending} size='md' state='primary' type="submit">
                    {isPending ? 'Отправка...' : 'ОТПРАВИТЬ'}
                </BrandButton>
            </div>

        </Form>
    )
}