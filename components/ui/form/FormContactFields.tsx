import { Select, SelectItem } from "@heroui/select";
import FormInput from "./FormInput";
import { UserPhoneInput } from "./UserPhoneInput";

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
                    name='first-name'
                    placeholder="Напишите Ваше имя"
                    label="Имя"
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
                        label='Город'
                        id="city"
                        name="city"
                        type="text"
                        placeholder='Напишите город'
                    />
                </div>

                <div>
                    <Select
                        color="primary"
                        labelPlacement='outside'
                        radius='sm'
                        variant="bordered"
                        classNames={{
                            trigger: 'border-1 bg-background',
                        }}
                        label="Страна"
                        id="country"
                        name="country"
                        placeholder='Выберите страну'
                        defaultSelectedKeys={['by']}
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