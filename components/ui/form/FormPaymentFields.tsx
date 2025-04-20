import FormInput from "./FormInput";
import FileUploadInput from "./FileUploadInput";

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
                    label='Реквизиты'
                    id="requisites"
                    name="requisites"
                    type="text"
                    placeholder='Напишите название компании или реквизиты'
                />
            </div>
            <div className="sm:col-span-2">
                <FileUploadInput handleFileChange={handleFileChange} fileUploaded={fileUploaded} fileUploadedName={fileUploadedName} />
            </div>
            <div className="sm:col-span-2">
                <FormInput
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
                <FormInput
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