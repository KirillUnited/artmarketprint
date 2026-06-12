'use client';
import React from 'react';
import { Navbar as BaseNavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import { Calculator, PhoneOutgoing, ShoppingBagIcon } from 'lucide-react';
import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';

import useBasketStore from '@/store/store';
import { NavbarDropdownMenu } from '@/components/ui/dropdown';
import { Socials } from '@/components/shared/socials';
import { FavoritesLink } from '@/components/shared/favorites/FavoritesLink';

import BrandLogo from '../../ui/BrandLogo';
import { HeroModalOffer } from '../../ui/BrandModalOffer';
import Drawer from '../../ui/Drawer';
import { SalesBanner } from '../banner';

import { ServiceSearch } from '@/components/ServiceSearch';
import { PhoneListDropdown } from '@/components/ui/PhoneListDropdown';

export const CartLinkButton = (itemsCount: number) => {
	return (
		<Link aria-label={`Shopping cart${itemsCount > 0 ? `, ${itemsCount} items` : ''}`} className="relative rounded-full bg-background border-2 p-2" href="/cart">
			<ShoppingBagIcon className="text-foreground" size={24} />
			{itemsCount > 0 && <span className="bg-secondary text-white rounded-full text-xs text-center px-1 py-1 truncate w-6 h-6 absolute -top-3 -right-3">{itemsCount}</span>}
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
					wrapper: 'max-w-full p-0 items-center h-auto',
				}}
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				onScrollPositionChange={() => setIsMenuOpen(false)}
			>
				<div className="container flex flex-col gap-4 py-4" >
					<div className='flex flex-row items-center gap-16 w-full'>
						<NavbarContent className="hidden xl:flex gap-4 flex-1 justify-between! w-full">
							<NavbarBrand as={Link} className="grow-0 basis-auto" href={'/'}>
								<BrandLogo alt={'ArtMarketPrint'} />
							</NavbarBrand>

							<ServiceSearch />
							{/* Algolia Search */}

							{/*Calculator page link*/}
							<Tooltip content="Калькулятор стоимости пакетов" placement="bottom">
								<Button
									variant="light"
									aria-label="Calculator"
									as={Link}
									className="border-2 border-primary text-primary font-semibold shadow-large hover:scale-105 hover:bg-brand-gradient hover:text-primary-foreground transition-transform duration-200 bg-brand-gradient text-fill-transparent"
									color="default"
									href="/calculator"
									size="md"
									radius='sm'
								>
									<Calculator size={18} className='text-primary' />
									Рассчитать стоимость
								</Button>
							</Tooltip>
						</NavbarContent>
						<div className="flex justify-center flex-wrap gap-6 items-center shrink-0">
							{/* <SearchIcon /> */}
							<div className="hidden md:flex gap-3">
								<Socials items={navSocials} />
								{/* <Link className="text-sm hover:text-primary" color={'primary'} href={`tel:${phones[0]?.link}`}>
									<PhoneOutgoing size={24} />
								</Link> */}
								<div className="flex flex-col border-l border-primary pl-3">
									{
										// phones.length > 0 && <PhoneListDropdown items={phones} />
										phones?.map((phone: any) => (
											<Link key={phone._key} className="text-sm text-foreground font-semibold hover:text-primary"  href={`tel:${phone.link}`}>
												{phone.number}
											</Link>
										))
									}
								</div>
							</div>


							<div className="hidden lg:block">
								<HeroModalOffer id="Заказать звонок" />
							</div>
						</div>

					</div>
					<div className='flex gap-12 items-center justify-between'>
						<div className='flex gap-12 items-center'>
							{navigation?.map((navItem: any) => {
								return navItem?.submenu ? (
									<NavbarDropdownMenu key={navItem.title} items={navItem.submenu} triggerLabel={navItem.title} triggerUrl={navItem.url} />
								) : (
									<NavbarItem key={navItem.title}>
										<Link
											aria-current="page"
											className={clsx('leading-normal font-semibold hover:underline hover:text-primary transition', {
												'font-bold text-primary': navItem.url === pathname,
												'flex gap-2 items-center bg-brand-gradient px-3 py-0.5 rounded-small text-white hover:text-white h-10': navItem.title === 'Каталог',
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
						</div>
						<div className='flex gap-5'>
							<FavoritesLink />
							{CartLinkButton(itemsCount)}
						</div>
						<Drawer className="xl:hidden h-6 w-auto min-w-min" navigation={navigation} siteSettings={siteSettings} />
					</div>


				</div>
			</BaseNavbar>
		</>
	);
}
