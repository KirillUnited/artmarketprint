'use client';
import { useState, FormEvent } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { CountryData, defaultCountries, parseCountry, usePhoneInput } from 'react-international-phone';
import { sendOrder } from '@/lib/actions/order.actions';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string): boolean => {
    try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
        return false;
    }
};

interface UseFormReturn {
    isPending: boolean;
    showAlert: boolean;
    inputValue: string;
    handlePhoneValueChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => string;
    inputRef: React.RefObject<HTMLInputElement>;
    country: { iso2: string };
    setCountry: (value: string) => void;
    countries: CountryData[];
    validPhone: boolean;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    setShowAlert: (value: boolean) => void;
}

const useForm = (onClose: () => void): UseFormReturn => {
    const [isPending, setIsPending] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [phone, setPhone] = useState('');
    const validPhone = isPhoneValid(phone);

    const countries = defaultCountries.filter((country) => {
        const { iso2, name, dialCode } = parseCountry(country);
        return ['by', 'ru'].includes(iso2);
    });

    const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
        defaultCountry: 'by',
        value: phone,
        countries,
        defaultMask: '+375 (12) 345-67-89',
        onChange: (data) => setPhone(data.phone),
    });

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
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
                    typeof onClose === 'function' && onClose();
                    setShowAlert(false)
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        isPending,
        showAlert,
        inputValue,
        handlePhoneValueChange,
        inputRef,
        country,
        setCountry,
        countries,
        validPhone,
        handleSubmit,
        setShowAlert,
    };
};

export default useForm;
