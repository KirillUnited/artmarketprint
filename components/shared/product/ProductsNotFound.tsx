import { PackageIcon, PackageSearchIcon } from 'lucide-react'
import React from 'react'

export const ProductsNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] h-full bg-gray-50 rounded-lg">
            <PackageSearchIcon className="w-16 h-16 text-gray-300 mb-4" />
            <div className="text-3xl font-semibold text-gray-400 mb-4">
                Товары не найдены
            </div>
            <p className="text-gray-500 flex items-center gap-2">
                <PackageIcon className="w-5 h-5" />
                Попробуйте изменить параметры поиска или фильтрации
            </p>
        </div>
    )
}
