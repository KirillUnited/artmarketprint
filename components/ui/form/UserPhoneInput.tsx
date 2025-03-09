'use client';
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { CountryData, FlagImage, parseCountry } from "react-international-phone";
import { useRef, useState } from 'react';
import { IMaskInput, useIMask } from 'react-imask';
import { forwardRef } from "@heroui/system";
import { isPhoneValid } from "@/hooks/useForm";

export const UserPhoneInput = ({ ...props }) => {
    const inputRef = useRef(null);
    // const belarusPhoneRegex = /^\+375\s\((17|25|29|33|44)\)\s\d{3}-\d{2}-\d{2}$/;
    const [errorMessage, setErrorMessage] = useState("");

    const handlePhoneChange = (value: string, unmaskedValue: any) => {
        setErrorMessage(isPhoneValid(unmaskedValue._value) ? "" : "Введите корректный номер в формате +375 (XX) XXX-XX-XX");
        // props.setIsValidPhone(isPhoneValid(unmaskedValue._value));
    };
    return (
        <div className="flex flex-col gap-1">
            <label className="origin-top-left flex-shrink-0 rtl:origin-top-right subpixel-antialiased block after:content-['*'] after:text-danger after:ms-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] text-primary group-data-[filled-within=true]:pointer-events-auto pb-0 z-20 group-data-[filled-within=true]:start-0 start-3 end-auto text-small group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)] pe-2 max-w-full text-ellipsis overflow-hidden" id="react-aria-:Rmcuv6lt7H1:" htmlFor="user_phone">Телефон</label>
            <IMaskInput
                mask={'+375 (00) 000-00-00'}
                unmask={true}
                radix="."
                label="Телефон"
                name='user_phone'
                id='user_phone'
                onAccept={handlePhoneChange}
                placeholder='+375 (__) ___-__-__'
                lazy={false}
                // value={props.inputValue}
                inputRef={inputRef}           
                // className="w-full border-2 border-gray-200 rounded-small py-2 px-3 text-sm leading-tight text-gray-900 focus:border-primary focus-ring-primary focus-visible:border-primary"
                className={`w-full border-2 rounded-small py-2 px-3 text-sm leading-tight ${errorMessage ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
            />
            {errorMessage && <span className="text-red-500 text-xs">{errorMessage}</span>}
        </div>

    );
    return (
        <Input
            value={props.inputValue}
            onChange={props.handlePhoneValueChange}
            type="tel"
            ref={props.inputRef}
            aria-label={'Телефон'}
            isRequired
            color="primary"
            errorMessage="Пожалуйста, введите действительный номер телефона"
            id='user_phone'
            label="Телефон"
            labelPlacement='outside'
            name='user_phone'
            radius='sm'
            variant="bordered"
            validate={(value) => {
                if (!props.validPhone) return 'Пожалуйста, введите корректный номер в формате +375 XX XXX-XX-XX';
            }}
            placeholder='+375 (__) ___-__-__'
            inputMode="tel"
            startContent={
                <Select
                    selectedKeys={[props.country.iso2]}
                    onChange={(e) => props.setCountry(e.target.value)}
                    className="w-16"
                    startContent={<FlagImage iso2={props.country.iso2} />}
                    aria-label="Select country"
                    classNames={{
                        popoverContent: 'w-60',
                        value: 'hidden',
                        listbox: 'w-60',
                        trigger: 'bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0',
                    }}
                >
                    {props.countries.map((c: CountryData) => {
                        const country = parseCountry(c);

                        return (
                            <SelectItem
                                key={country.iso2}
                                textValue={country.name}
                            >
                                <div className="flex items-center gap-2">
                                    <FlagImage iso2={country.iso2} />
                                    <span>{country.name}</span>
                                    <span className='font-light text-gray-600'>+{country.dialCode}</span>
                                </div>
                            </SelectItem>
                        );
                    })}
                </Select>
            }
        />
    )
};