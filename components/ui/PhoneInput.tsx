import 'react-international-phone/style.css';
import { Input } from '@heroui/input';
import React, { useState } from 'react'
import {
    PhoneInput,
    defaultCountries,
    FlagImage,
    parseCountry,
    usePhoneInput,
} from 'react-international-phone';

export const BasePhoneInput = () => {
    const [phone, setPhone] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
    // const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    //     usePhoneInput({
    //         defaultCountry: 'by',
    //         value,
    //         countries: defaultCountries,
    //         onChange: (data) => {
    //             onChange(data.phone);
    //         },
    //     });

	return (
		<Input
			id="user_phone"
			name="user_phone"
			isRequired
			errorMessage="Пожалуйста, введите действительный номер телефона"
			label="Телефон"
			placeholder="+375 (99) 999-99-99"
			type="tel"
			variant="bordered"
			color='primary'
			inputMode="tel"
		>
            <PhoneInput
                inputProps={{ required: true, id: 'user_phone', name: 'user_phone', onChange: handleChange }}
                defaultCountry="by"
                value={phone}
                inputClassName='w-full'
            />
            </Input>
	)
};
