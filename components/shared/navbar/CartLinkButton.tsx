'use client';

import { Link } from '@heroui/link';
import { ShoppingBagIcon } from 'lucide-react';
import { memo } from 'react';

interface CartLinkButtonProps {
	itemsCount: number;
}

/**
 * Rounded icon button linking to the cart with an optional badge for the
 * current item count. Memoized so unrelated navbar re-renders don't
 * re-render the badge.
 */
function CartLinkButtonImpl({ itemsCount }: CartLinkButtonProps) {
	const hasItems = itemsCount > 0;
	const ariaLabel = hasItems
		? `Shopping cart, ${itemsCount} items`
		: 'Shopping cart';

	return (
		<Link
			aria-label={ariaLabel}
			className="relative rounded-full bg-background border-2 p-2 group"
			href="/cart"
		>
			<ShoppingBagIcon
				className="text-foreground group-hover:text-secondary transition-color duration-200"
				size={24}
			/>
			{hasItems ? (
				<span className="bg-secondary text-white rounded-full text-xs text-center px-1 py-1 truncate w-6 h-6 absolute -top-3 -right-3">
					{itemsCount}
				</span>
			) : null}
		</Link>
	);
}

export const CartLinkButton = memo(CartLinkButtonImpl);
