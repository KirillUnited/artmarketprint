'use client';

import {useMemo} from "react";
import {useProductStore} from "@/store/product";
import {getStockForSelectedColor} from "@/components/shared/product/lib";

export const ProductStock = ({ items }: { items: any[] }) => {
	const { selectedColor } = useProductStore();
	const stockForSelectedColor = useMemo(() => {
		return getStockForSelectedColor(selectedColor, items);
	}, [selectedColor, items]);
console.log(items);

    // Format stock display text
    const stockDisplayText = useMemo(() => {
		if (stockForSelectedColor === null) return '';
		if (stockForSelectedColor === 0) return <span className="text-red-600">Нет в наличии</span>;

		return <p className="text-sm text-gray-600">{`В наличии ${stockForSelectedColor} шт.`}</p>;
	}, [stockForSelectedColor]);

	return stockDisplayText;
};