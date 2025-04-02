import React from 'react'
import FormInput from './FormInput'

export default function FileUploadInput({ handleFileChange }: { handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="relative">
            <FormInput
                isRequired
                errorMessage="Пожалуйста, загрузите файл с реквизитами"
                id="requisites-pdf"
                name="requisites-pdf"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                classNames={{ base: 'peer hidden' }}
            />
            <p className="peer-data-[invalid=true]:text-danger hidden text-tiny peer-data-[invalid=true]:block p-1">Пожалуйста, загрузите файл с реквизитами</p>
            <label aria-describedby="requisites-pdf" aria-label="Пожалуйста, загрузите файл с реквизитами" title="Пожалуйста, загрузите файл с реквизитами" htmlFor="requisites-pdf" className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed hover:border-gray-400 transition-colors cursor-pointer rounded-small focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 peer-data-[invalid=true]:border-danger">
                <div className="space-y-1 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <p

                            className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500 peer-data-[invalid=true]:text-danger"
                        >
                            <span>Загрузить файл c реквизитами</span>
                        </p>
                    </div>
                    <p className="text-xs text-gray-500">PDF до 5MB</p>
                </div>
            </label>
        </div>
    )
}
