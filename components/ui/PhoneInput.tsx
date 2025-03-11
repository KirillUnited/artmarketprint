import 'react-international-phone/style.css';
import { Input } from '@heroui/input';
import React, { useState } from 'react'
import {
    PhoneInput,
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
			isRequired
			color='primary'
			errorMessage="Пожалуйста, введите действительный номер телефона"
			id="user_phone"
			inputMode="tel"
			label="Телефон"
			name="user_phone"
			placeholder="+375 (99) 999-99-99"
			type="tel"
			variant="bordered"
		>
            <PhoneInput
                defaultCountry="by"
                inputClassName='w-full'
                inputProps={{ required: true, id: 'user_phone', name: 'user_phone', onChange: handleChange }}
                value={phone}
            />
            </Input>
	)
};
