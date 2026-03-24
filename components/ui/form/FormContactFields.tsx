import { Select, SelectItem } from '@heroui/select';

import FormInput from './FormInput';
import { UserPhoneInput } from './UserPhoneInput';

const countryOptions = [
    { key: 'by', value: 'Республика Беларусь' },
    { key: 'ru', value: 'Россия' },
]
const FormContactFields = ({ setPhoneValid }: { setPhoneValid: (valid: boolean) => void }) => {
    return (
        <fieldset>
            <legend className="text-lg font-medium text-gray-900">Контактная информация</legend>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <FormInput
                    isRequired
                    errorMessage="Пожалуйста, введите Ваше имя"
                    id='first-name'
                    label="Имя"
                    name='first-name'
                    placeholder="Напишите Ваше имя"
                />
                <FormInput
                    id='last-name'
                    label="Фамилия"
                    name='last-name'
                    placeholder='Напишите Вашу фамилию'
                />
                <div>
                    <FormInput
                        isRequired
                        id="city"
                        label='Город'
                        name="city"
                        placeholder='Напишите город'
                        type="text"
                    />
                </div>

                <div>
                    <Select
                        classNames={{
                            trigger: 'border bg-background',
                        }}
                        color="primary"
                        defaultSelectedKeys={['by']}
                        id="country"
                        label="Страна"
                        labelPlacement='outside'
                        name="country"
                        placeholder='Выберите страну'
                        radius='sm'
                        variant="bordered"
                    >
                        {
                            countryOptions.map((option) => (
                                <SelectItem key={option.key} textValue={option.value}>{option.value}</SelectItem>
                            ))
                        }
                    </Select>
                </div>

                <div className="sm:col-span-2">
                    <UserPhoneInput validPhone={setPhoneValid} />
                </div>

            </div>
        </fieldset>
    )
};

export default FormContactFields;