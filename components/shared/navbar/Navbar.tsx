'use client';

import { Navbar as BaseNavbar } from '@heroui/navbar';
import { useCallback, useState } from 'react';

import { SalesBanner } from '@/components/shared/banner';
import useBasketStore from '@/store/store';

import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import type { NavbarProps } from './types';

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
					wrapper: 'max-w-full p-0 items-center h-auto',
				}}
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				onScrollPositionChange={closeMenu}
				shouldHideOnScroll
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
		</>
	);
}
