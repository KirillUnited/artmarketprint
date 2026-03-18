import {Button} from '@heroui/button';
import {ShoppingCartIcon} from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

import ProductSearchForm from '@/components/shared/product/ProductSearchForm';

export type SearchTopActionsProps = {
	className?: string;
};

export function SearchTopActions({className}: SearchTopActionsProps) {
	return (
		<div className={clsx('flex flex-col md:flex-row gap-2 w-full', className)}>
			<ProductSearchForm />
			<Link href="/products/categories/all">
				<Button className="border" radius="sm" variant="bordered">
					<ShoppingCartIcon size="18" />
					<span>Все товары</span>
				</Button>
			</Link>
		</div>
	);
}

