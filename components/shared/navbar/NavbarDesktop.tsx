'use client';

import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Tooltip } from '@heroui/tooltip';
import { Calculator, LayoutGridIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';

import { ServiceSearch } from '@/components/ServiceSearch';
import { FavoritesLink } from '@/components/shared/favorites/FavoritesLink';
import { Socials } from '@/components/shared/socials';
import { NavbarDropdownMenu } from '@/components/ui/dropdown';

import BrandLogo from '../../ui/BrandLogo';
import { HeroModalOffer } from '../../ui/BrandModalOffer';
import { CartLinkButton } from './CartLinkButton';
import type { NavbarVariantProps } from './types';
import CalcLinkButton from './CalcLinkButton';

function NavbarDesktopImpl({ navigation, siteSettings, itemsCount }: NavbarVariantProps) {
	const pathname = usePathname();

	const phones = siteSettings?.siteContactInfo?.phones ?? [];
	const socials = useMemo(
		() =>
			(siteSettings?.siteContactInfo?.socialLinks ?? []).filter(
				(social) => social.showInNav === true,
			),
		[siteSettings],
	);

	return (
		<div className="hidden xl:flex flex-col gap-4 py-4 w-full">
			{/* Row 1: brand, search, calculator, socials, phones, callback */}
			<div className="flex flex-row items-center gap-16 w-full">
				<NavbarContent className="gap-4 flex-1 justify-between! w-full">
					{pathname === '/' ? (
						<NavbarBrand aria-current="page" className="grow-0 basis-auto cursor-default">
							<BrandLogo alt="ArtMarketPrint" />
						</NavbarBrand>
					) : (
						<NavbarBrand as={Link} className="grow-0 basis-auto" href="/">
							<BrandLogo alt="ArtMarketPrint" />
						</NavbarBrand>
					)}

					<ServiceSearch />

					<CalcLinkButton />
				</NavbarContent>

				<div className="flex justify-center flex-wrap gap-6 items-center shrink-0">
					<div className="hidden md:flex gap-3">
						<Socials items={socials} />
						<div className="flex flex-col border-l border-primary pl-3">
							{phones.map((phone) => (
								<Link
									key={phone._key}
									className="text-sm text-foreground font-semibold hover:text-primary"
									href={`tel:${phone.link}`}
								>
									{phone.number}
								</Link>
							))}
						</div>
					</div>

					<div className="hidden lg:block">
						<HeroModalOffer id="Заказать звонок" />
					</div>
				</div>
			</div>

			{/* Row 2: primary nav, favorites, cart */}
			<div className="flex gap-12 items-center justify-between">
				<ul className="flex gap-12 items-center list-none p-0 m-0">
					{navigation.map((navItem) => (
						<div key={navItem.title}>
							{navItem.submenu ? (
								<NavbarDropdownMenu
									key={navItem.title + navItem.url}
									items={navItem.submenu}
									triggerLabel={navItem.title}
									triggerUrl={navItem.url}
								/>
							) : (
								<NavbarItem key={navItem.title}>
									{navItem.url === pathname ? (
										<span
											aria-current="page"
											className={clsx(
												'leading-normal font-semibold transition',
												{
													'font-bold text-primary': true,
													'flex gap-2 items-center bg-brand-gradient px-3 py-0.5 rounded-small text-white h-10':
														navItem.title === 'Каталог',
												},
											)}
										>
											{navItem.title === 'Каталог' ? (
												<LayoutGridIcon size={16} />
											) : null}
											{navItem.title}
										</span>
									) : (
										<Link
											className={clsx(
												'leading-normal font-semibold hover:underline hover:text-primary transition',
												{
													'flex gap-2 items-center bg-brand-gradient px-3 py-0.5 rounded-small text-white hover:text-white h-10':
														navItem.title === 'Каталог',
												},
											)}
											color="foreground"
											href={navItem.url ?? '#'}
											size="sm"
										>
											{navItem.title === 'Каталог' ? (
												<LayoutGridIcon size={16} />
											) : null}
											{navItem.title}
										</Link>
									)}
								</NavbarItem>
							)}
						</div>
					))}
				</ul>

				<div className="flex gap-5">
					<FavoritesLink />
					<CartLinkButton itemsCount={itemsCount} />
				</div>
			</div>
		</div>
	);
}

export const NavbarDesktop = memo(NavbarDesktopImpl);
