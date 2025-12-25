'use client';

import React from 'react';
import {getPrice} from '@/lib/getPrice';
import useBasketStore from '@/store/store';
import {CURRENCIES_SYMBOLS} from '@/lib/products/companies';

interface ProductPriceProps {
	price: string;
	productId: number;
}

/**
 * ProductPrice component displays the price of a product.
 * The price is adjusted based on the quantity of the product in the basket.
 *
 * @param {ProductPriceProps} props - The props for the component.
 * @returns {JSX.Element} The JSX element for the product price.
 */
const ProductPrice: React.FC<ProductPriceProps> = ({price, productId}) => {
	// Get the quantity of the product in the basket
	const quantity = useBasketStore((state) => state.getItemCount(productId.toString()));
	const [isClient, setIsClient] = React.useState(false);

	React.useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	// Calculate the price based on the quantity
	const calculatedPrice = getPrice(price, quantity ? quantity : 1);

	return <span className="text-3xl text-foreground font-bold">{` ${calculatedPrice} ${CURRENCIES_SYMBOLS['BYN'] || 'р'}`}</span>;
};

export default ProductPrice;
