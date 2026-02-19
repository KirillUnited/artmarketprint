'use client';
import React from 'react';
import { Navbar as BaseNavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import { Calculator, PhoneOutgoing, ShoppingBagIcon } from 'lucide-react';
import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';
import BrandLogo from '../../ui/BrandLogo';
import { HeroModalOffer } from '../../ui/BrandModalOffer';
import Drawer from '../../ui/Drawer';
import { SalesBanner } from '../banner';

import useBasketStore from '@/store/store';
import { NavbarDropdownMenu } from '@/components/ui/dropdown';
import { PhoneIcon } from '@/components/icons';
import Socials from '../Socials';

export const CartLinkButton = (itemsCount: number) => {
	return (
		<Link aria-label={`Shopping cart${itemsCount > 0 ? `, ${itemsCount} items` : ''}`} className="relative" href="/cart" target="_blank">
			<ShoppingBagIcon className="text-primary" size={24} />
			{itemsCount > 0 && <span className="bg-danger text-white rounded-full text-xs text-center px-1 py-1 truncate w-6 h-6 absolute -top-3 -right-3">{itemsCount}</span>}
		</Link>
	);
};

export default function Navbar({ navigation, sales, siteSettings }: any) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const itemsCount = useBasketStore((state) => state.items.length);
	const pathname = usePathname();
	const phones = siteSettings?.siteContactInfo?.phones ?? [];
	const socials = siteSettings?.siteContactInfo?.socialLinks ?? [];
	const navSocials = socials.filter((social: any) => social.showInNav === true);

	return (
		<>
			{sales?.isActive && <SalesBanner {...sales} />}
			<BaseNavbar
				shouldHideOnScroll
				classNames={{
					base: 'shadow-medium',
					wrapper: 'max-w-full p-0 items-center',
				}}
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				onScrollPositionChange={() => setIsMenuOpen(false)}
			>
				<div className="container flex flex-row items-center justify-between gap-4">
					<NavbarBrand as={Link} className="grow-0 basis-auto" href={'/'}>
						<BrandLogo alt={'ArtMarketPrint'} />
					</NavbarBrand>
					<NavbarContent className="hidden xl:flex gap-4" justify="center">
						{navigation?.map((navItem: any) => {
							return navItem?.submenu ? (
								<NavbarDropdownMenu key={navItem.title} items={navItem.submenu} triggerLabel={navItem.title} triggerUrl={navItem.url} />
							) : (
								<NavbarItem key={navItem.title}>
									<Link
										aria-current="page"
										className={clsx('leading-normal font-semibold hover:underline hover:text-primary transition', {
											'font-bold text-primary': navItem.url === pathname,
											'flex gap-2 items-center bg-brand-gradient px-2 py-0.5 rounded-small text-white hover:text-white': navItem.title === 'Каталог',
										})}
										color={'foreground'}
										href={navItem.url}
										size="sm"
									>
										{navItem.title === 'Каталог' && <ShoppingBagIcon size={16} />}
										{navItem.title}
									</Link>
								</NavbarItem>
							);
						})}
					</NavbarContent>
					<div className="flex flex-row gap-8 items-center shrink-0">
						{/*Calculator page link*/}
						<Tooltip content="Калькулятор стоимости пакетов" placement="bottom">
							<Button
								isIconOnly
								aria-label="Calculator"
								as={Link}
								className="bg-brand-gradient rounded-full shadow-large hover:scale-105 transition-transform duration-200"
								color="primary"
								href="/calculator"
								size="sm"
							>
								<Calculator size={18} />
							</Button>
						</Tooltip>
						{/* <SearchIcon /> */}
						<div className="hidden md:flex gap-3">
							<Socials items={navSocials} />
							<Link className="text-sm hover:text-primary" color={'primary'} href={`tel:${phones[0]?.link}`}>
								<PhoneOutgoing size={24} />
							</Link>
						</div>
						{/* {
							phones.length > 0 && <PhoneListDropdown items={phones} />
						} */}
						{CartLinkButton(itemsCount)}

						<div className="hidden lg:block">
							<HeroModalOffer id="Консультация" />
						</div>
						<Drawer className="xl:hidden h-6 w-auto min-w-min" navigation={navigation} siteSettings={siteSettings} />
					</div>
				</div>
			</BaseNavbar>
		</>
	);
}
