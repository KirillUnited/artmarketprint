import FormInput from './FormInput';
import FileUploadInput from './FileUploadInput';

const FormPaymentFields = ({ handleFileChange, fileUploaded, fileUploadedName }: { handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void ,
    fileUploaded: boolean,
    fileUploadedName: string
}) => {
    return (
        <fieldset className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <legend className="text-lg font-medium text-gray-900">Оплата</legend>
            <div className="sm:col-span-2 mt-4">
                <FormInput
                    isRequired
                    errorMessage="Пожалуйста, напишите название компании или реквизиты"
                    id="requisites"
                    label='Реквизиты'
                    name="requisites"
                    placeholder='Напишите название компании или реквизиты'
                    type="text"
                />
            </div>
            <div className="sm:col-span-2">
                <FileUploadInput fileUploaded={fileUploaded} fileUploadedName={fileUploadedName} handleFileChange={handleFileChange} />
            </div>
            <div className="sm:col-span-2">
                <FormInput
                    isRequired
                    errorMessage="Пожалуйста, введите Вашу почту"
                    id="email"
                    label='Почта'
                    name="email"
                    placeholder='Напишите Вашу почту'
                    type="email"
                />
            </div>
            <div className="sm:col-span-2">
                <FormInput
                    id="comment"
                    label="Комментарий"
                    name="comment"
                    placeholder='Напишите комментарий к заказу'
                    rows={5}
                />
            </div>

        </fieldset>
    )
};

export default FormPaymentFields;