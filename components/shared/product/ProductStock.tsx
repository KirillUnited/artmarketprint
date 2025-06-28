'use client';

import {useMemo} from "react";
import {useProductStore} from "@/store/product";

export const ProductStock = ({ items }: { items: any[] }) => {
	const { selectedColor } = useProductStore();

	// Calculate stock for the selected color
    const stockForSelectedColor = useMemo(() => {
        if (!selectedColor) return null;
        const selectedItem = items.find(item => item.color === selectedColor);

        return selectedItem?.stock ?? null;
    }, [selectedColor, items]);

    // Format stock display text
    const stockDisplayText = useMemo(() => {
		if (stockForSelectedColor === null) return '';
		if (stockForSelectedColor === 0) return <span className="text-red-600">Нет в наличии</span>;

		return <p className="text-sm text-gray-600">{`В наличии ${stockForSelectedColor} шт.`}</p>;
	}, [stockForSelectedColor]);

	return stockDisplayText;
};