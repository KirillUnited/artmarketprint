'use client';

import { Link } from '@heroui/link';
import { memo } from 'react';
import type { SanityDocument } from 'next-sanity';
import { usePathname } from 'next/navigation';

import { ServiceSearch } from '@/components/ServiceSearch';
import { FavoritesLink } from '@/components/shared/favorites/FavoritesLink';
import Drawer from '@/components/ui/Drawer';

import BrandLogo from '../../ui/BrandLogo';
import { CartLinkButton } from './CartLinkButton';
import type { NavbarVariantProps, SiteSettings } from './types';
import CalcLinkButton from '../сalculator/ui/CalcLinkButton';

interface NavbarMobileProps extends NavbarVariantProps {
	// Drawer expects the full Sanity document shape; we type it loosely here
	// and trust the parent's runtime contract.
	siteSettingsDoc: SanityDocument<SiteSettings> | null;
}

function NavbarMobileImpl({
	navigation,
	siteSettingsDoc,
	itemsCount,
}: NavbarMobileProps) {
	const pathname = usePathname();

	return (
		<div className="flex xl:hidden flex-col gap-3 py-3 w-full">
			{/* Row 1: brand + menu trigger */}
			<div className="flex items-center justify-between">
				<CalcLinkButton />
				{pathname === '/' ? (
					<span aria-current="page" className="cursor-default">
						<BrandLogo alt="ArtMarketPrint" height={32} width={32} />
					</span>
				) : (
					<Link href="/">
						<BrandLogo alt="ArtMarketPrint" height={32} width={32} />
					</Link>
				)}
				<Drawer
					className="min-w-min"
					navigation={navigation}
					siteSettings={siteSettingsDoc as never}
				/>
			</div>

			{/* Row 2: search + favorites + cart */}
			<div className="flex gap-5">
				<ServiceSearch className="flex-1 max-w-full" />
				<div className="flex gap-2">
					<FavoritesLink />
					<CartLinkButton itemsCount={itemsCount} />
				</div>
			</div>
		</div>
	);
}

export const NavbarMobile = memo(NavbarMobileImpl);
