'use client';

import {useEffect} from 'react';
import useBasketStore from "@/store/store";

export default function ViewCartEvent() {
	const cartItems = useBasketStore((state) => state.items);

	useEffect(() => {
		if (!Array.isArray(cartItems) || cartItems.length === 0) return;

		const totalValue = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

		const formattedItems = cartItems.map((item) => ({
			item_id: item.id,
			item_name: item.name,
			item_category: item.category || 'Без категории',
			item_category2: '',
			item_category3: '',
			item_category4: '',
			item_category5: '',
			price: item.price || 0,
			quantity: item.quantity || 1,
		}));

		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'view_cart',
			ecommerce: {
				currency: 'BYN',
				value: totalValue,
				items: formattedItems,
			},
		});
	}, [cartItems]);

	return null;
}
