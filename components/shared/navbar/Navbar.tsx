'use client';

import { Navbar as BaseNavbar } from '@heroui/navbar';
import { useCallback, useState } from 'react';

import { SalesBanner } from '@/components/shared/banner';
import useBasketStore from '@/store/store';

import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import type { NavbarProps } from './types';
import { ServiceSearch } from '@/components/ServiceSearch';
import { FavoritesLink } from '../favorites/FavoritesLink';
import { CartLinkButton } from './CartLinkButton';

/**
 * Top-level Navbar: a thin orchestrator that selects the desktop or mobile
 * variant via CSS breakpoints (no `useMediaQuery` to avoid hydration mismatch).
 *
 * Variant components receive the data they need; we keep the sales banner
 * outside the variants so both layouts can share the same DOM.
 */
export default function Navbar({ navigation, sales, siteSettings }: NavbarProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const itemsCount = useBasketStore((state) => state.items.length);

	// Stable callback so the BaseNavbar doesn't re-bind on every render.
	const closeMenu = useCallback(() => setIsMenuOpen(false), []);

	// `siteSettings` is a SanityDocument; pass it through to the mobile Drawer
	// (which expects the full document shape) and a narrow view to the desktop
	// variant.
	const siteSettingsView = siteSettings ?? null;

	return (
		<>
			{sales?.isActive ? <SalesBanner {...sales} /> : null}
			<BaseNavbar
				classNames={{
					base: 'shadow-medium',
					wrapper: 'max-w-full p-0 items-center h-auto static',
				}}
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				onScrollPositionChange={closeMenu}
				shouldHideOnScroll={false}
			>
				<div className="container">
					<NavbarDesktop
						itemsCount={itemsCount}
						navigation={navigation}
						siteSettings={siteSettingsView}
					/>
					<NavbarMobile
						itemsCount={itemsCount}
						navigation={navigation}
						siteSettings={siteSettingsView}
						siteSettingsDoc={siteSettingsView}
					/>
				</div>
			</BaseNavbar>
			{/* Row 2: search + favorites + cart */}
			<div className="flex xl:hidden gap-5 fixed bottom-0 left-0 right-0 z-100 w-full container py-2 bg-background">
				<ServiceSearch className="flex-1 max-w-full" />
				<div className="flex gap-2">
					<FavoritesLink />
					<CartLinkButton itemsCount={itemsCount} />
				</div>
			</div>
		</>
	);
}
