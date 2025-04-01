import CartFormInput from "./CartFormInput";

const FormPaymentFields = ({ handleFileChange }: { handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <fieldset className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <legend className="text-lg font-medium text-gray-900">Оплата</legend>
            <div className="sm:col-span-2 mt-4">
                <CartFormInput
                    isRequired
                    errorMessage="Пожалуйста, напишите название компании или реквизиты"
                    label='Реквизиты'
                    id="requisites"
                    name="requisites"
                    type="text"
                    placeholder='Напишите название компании или реквизиты'
                />
            </div>
            <div className="sm:col-span-2">
                <CartFormInput
                    isRequired
                    errorMessage="Пожалуйста, загрузите файл с реквизитами"
                    label='Реквизиты (PDF)'
                    id="requisites-pdf"
                    name="requisites-pdf"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                />
                <p className="mt-1 text-sm text-gray-500">
                    Загрузите файл с реквизитами в формате PDF (не более 5MB)
                </p>
            </div>
            <div className="sm:col-span-2">
                <CartFormInput
                    label='Почта'
                    id="email"
                    name="email"
                    type="email"
                    isRequired
                    errorMessage="Пожалуйста, введите Вашу почту"
                    placeholder='Напишите Вашу почту'
                />
            </div>
            <div className="sm:col-span-2">
                <CartFormInput
                    placeholder='Напишите комментарий к заказу'
                    id="comment"
                    name="comment"
                    rows={5}
                    label="Комментарий"
                />
            </div>

        </fieldset>
    )
};

export default FormPaymentFields;