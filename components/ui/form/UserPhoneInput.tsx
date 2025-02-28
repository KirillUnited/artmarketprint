import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { CountryData, FlagImage, parseCountry } from "react-international-phone";

export const UserPhoneInput = ({ ...props }) => (
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
);