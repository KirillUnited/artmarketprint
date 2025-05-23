import { HomeIcon, ListIcon, PackageSearchIcon, TagsIcon } from 'lucide-react'
import Link from 'next/link'
import React, { FC } from 'react'

export const ProductsNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[400px] bg-gray-50 rounded-small p-4">
            <PackageSearchIcon className="w-16 h-16 text-gray-300 mb-4" />
            <div className="text-3xl font-semibold text-gray-800 mb-4">
                Товары не найдены
            </div>
            <p className="text-gray-600 flex items-center gap-2">
                Попробуйте изменить параметры поиска или фильтрации
            </p>
            <ProductsNotFoundMenu />
        </div>
    )
}
export const ProductsNotFoundMenu: FC<{}> = () => {
    return (
        <ul className="mt-6 flex flex-col md:flex-row flex-wrap gap-4">
            <li>
                <Link href="/" className="flex items-center text-primary-600 hover:text-primary-700 hover:underline gap-1">
                    <HomeIcon className="w-4 h-4" />
                    Главная страница
                </Link>
            </li>
            <li>
                <Link href="/products" className="flex items-center text-primary-600 hover:text-primary-700 hover:underline gap-1">
                    <ListIcon className="w-4 h-4" />
                    Каталог
                </Link>
            </li>
            <li>
                <Link href="/categories" className="flex items-center text-primary-600 hover:text-primary-700 hover:underline gap-1">
                    <TagsIcon className="w-4 h-4" />
                    Категории
                </Link>
            </li>
        </ul>
    )
}