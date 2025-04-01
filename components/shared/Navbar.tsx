'use client';
import React from 'react';
import { Button } from '@heroui/button';
import { Navbar as BaseNavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { ChevronDownIcon, Settings, ShoppingBagIcon, TagsIcon } from 'lucide-react';

import { TelegramIcon, ViberIcon } from '../icons';
import BrandLogo from '../ui/BrandLogo';
import { HeroModalOffer } from '../ui/BrandModalOffer';
import Drawer from '../ui/Drawer';

import { SalesBanner } from './banner';

import { siteConfig } from '@/config/site';
import { PhoneListDropdown } from '@/components/ui/PhoneListDropdown';
import useBasketStore from '@/store/store';

type HeaderDropdownMenuProps = {
	triggerLabel: string;
	items: {
		title: string; url?: string; description?: string;
		services?: any;
	}[];
};

export const CartLinkButton = (itemsCount: number) => {
	return (
		<Link href='/cart' target='_blank' className='relative'>
			<ShoppingBagIcon size={22} className='text-primary' />
			{
				itemsCount > 0 && (
					<span className='bg-danger text-white rounded-full text-xs text-center px-1 py-1 truncate w-6 h-6 absolute -top-3 -right-3'>{itemsCount}</span>
				)
			}
		</Link>
	)
}

export default function Navbar({ navigation, sales, siteSettings }: any) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const itemsCount = useBasketStore((state) => state.items.length);
	const phones = siteSettings?.siteContactInfo?.phones ?? [];

	return (
		<>
			<SalesBanner {...sales} />
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
					<NavbarContent className="hidden xl:flex gap-8" justify="center">
						{navigation?.map((navItem: any) => {
							return navItem?.submenu ? (
								<NavbarDropdownMenu key={navItem.title} items={navItem.submenu} triggerLabel={navItem.title} />
							) : (
								<NavbarItem key={navItem.title}>
									<Link aria-current="page" className="leading-normal font-semibold hover:underline hover:text-primary transition" color={'foreground'} href={navItem.url} size="sm">
										{navItem.title}
									</Link>
								</NavbarItem>
							);
						})}
					</NavbarContent>
					<div className="flex flex-row gap-8 items-center shrink-0">
						{/* <SearchIcon /> */}
						<div className="hidden md:flex gap-2">
							<Link
								className="flex flex-row gap-4 items-center justify-start self-stretch shrink-0 relative"
								href={`https://t.me/${siteConfig?.contacts?.[0]?.list?.[0]?.href}`}
								target="_blank"
							>
								<TelegramIcon />
							</Link>
							<Link href={`https://msng.link/o?${siteConfig?.contacts?.[0].list?.[0]?.href}=vi`} target="_blank">
								<ViberIcon />
							</Link>
						</div>
						{
							phones.length > 0 && <PhoneListDropdown items={phones} />
						}
						{CartLinkButton(itemsCount)}

						<div className="hidden lg:block">
							<HeroModalOffer />
						</div>
						<Drawer className="xl:hidden h-6 w-auto min-w-min" navigation={navigation} />
					</div>
				</div>
			</BaseNavbar>
		</>
	);
}

const NavbarDropdownMenu = ({ triggerLabel, items }: HeaderDropdownMenuProps) => {
	return (
		<Dropdown
			classNames={{
				content: 'rounded-md',
			}}
		>
			<NavbarItem>
				<DropdownTrigger>
					<Button
						disableRipple
						className="p-0 bg-transparent data-[hover=true]:bg-transparent leading-normal font-semibold hover:underline hover:text-primary transition gap-1"
						endContent={<ChevronDownIcon className="text-primary" size={20} />}
						radius="sm"
						size="md"
						variant="light"
					>
						{triggerLabel}
					</Button>
				</DropdownTrigger>
			</NavbarItem>
			<DropdownMenu
				aria-label="Услуги"
				className="w-[320px]"
				itemClasses={{
					base: 'gap-4 rounded-md data-[hover=true]:bg-brand-gradient data-[hover=true]:text-fill-transparent',
					title: 'font-semibold truncate max-w-full',
				}}
			>
				<DropdownItem
					key={items[0].title}
					classNames={{
						title: 'font-light'
					}} href={items[0].url} startContent={triggerLabel === 'Услуги' ? <Settings /> : <TagsIcon />}>
					{items[0].title}
				</DropdownItem>
				{items[0]?.services?.map((item: any) => (
					<DropdownItem
						key={item.title}
						description={item.description}
						href={`${items[0].url}/${item.url}`}
					>
						{item.title}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};
