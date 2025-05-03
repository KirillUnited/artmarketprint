import { PackageSearchIcon } from 'lucide-react'
import React from 'react'

export const ProductsNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[400px] bg-gray-50 rounded-small p-4">
            <PackageSearchIcon className="w-16 h-16 text-gray-300 mb-4" />
            <div className="text-3xl font-semibold text-gray-400 mb-4">
                Товары не найдены
            </div>
            <p className="text-gray-500 flex items-center gap-2">
                Попробуйте изменить параметры поиска или фильтрации
            </p>
        </div>
    )
}
