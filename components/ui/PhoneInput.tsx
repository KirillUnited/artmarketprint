import { Input } from '@heroui/input';
import React, { forwardRef, useState } from 'react'
import ReactInputMask from 'react-input-mask';

export const PhoneInput = forwardRef((props, ref)=> {
    const [phone, setPhone] = useState<string>(""); 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
    return (
        <Input {...props} placeholder="+375 (99) 999-99-99" pattern='\+375 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}' onChange={handleChange} value={phone} />
    )
})
