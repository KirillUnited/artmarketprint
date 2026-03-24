import {Button} from '@heroui/button';
import {HomeIcon, ListIcon, PackageSearchIcon} from 'lucide-react';
import Link from 'next/link';
import React, {FC} from 'react';

export const ProductsNotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center py-12 px-4 text-center">
			<div className="mb-6 bg-gray-50 p-6 rounded-full">
				<PackageSearchIcon className="text-gray-400" size={64} />
			</div>
			<h2 className="text-2xl font-bold mb-2">Товары не найдены</h2>
			<p className="text-gray-500 mb-8 max-w-md">Попробуйте изменить параметры поиска или фильтрации</p>

			<ProductsNotFoundMenu />
		</div>
	);
};
export const ProductsNotFoundMenu: FC<{}> = () => {
	return (
		<div className="flex flex-wrap gap-4 justify-center mt-8">
			<Link href="/">
				<Button className="transition-transform hover:scale-105" color="default" radius="sm" startContent={<HomeIcon className="w-4 h-4" />} variant="flat">
					На главную
				</Button>
			</Link>
			<Link href="/products/categories/all">
				<Button className="transition-transform hover:scale-105" color="primary" radius="sm" startContent={<ListIcon className="w-4 h-4" />} variant="solid">
					Все товары
				</Button>
			</Link>
		</div>
	);
};
