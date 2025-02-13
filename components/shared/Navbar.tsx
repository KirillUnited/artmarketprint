'use client';
import React from 'react';
import {Button} from '@heroui/button';
import {Navbar as BaseNavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from '@heroui/navbar';
import {Link} from '@heroui/link';
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@heroui/dropdown';
import {ChevronDownIcon} from 'lucide-react';

import {PhoneIcon, SearchIcon, TelegramIcon, ViberIcon} from '../icons';
import BrandLogo from '../ui/BrandLogo';
import {HeroModalOffer} from '../ui/BrandModalOffer';

import Socials from './Socials';

import {siteConfig} from '@/config/site';
import {PhoneListDropdown} from '@/components/ui/PhoneListDropdown';

type HeaderDropdownMenuProps = {
	triggerLabel: string;
	items: {title: string; url?: string; description?: string;
		services?: any;}[];
};

export default function Navbar({navigation}: any) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
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
					<SearchIcon />
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

					<PhoneListDropdown />
					<div className="hidden lg:block">
						<HeroModalOffer />
					</div>
					<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="xl:hidden h-6" />
				</div>
			</div>
			<NavbarMenu className="gap-6 px-4 py-6">
				<div className="flex flex-col gap-4">
					{siteConfig?.navItems.map((navItem, index) => (
						<NavbarMenuItem key={`${navItem}-${index}`}>
							<Link className="w-full" color="foreground" href={navItem.href} size="lg">
								{navItem.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
				<HeroModalOffer />
				<div className="flex flex-col gap-4">
					{siteConfig?.contacts?.[0]?.list?.map((item) => (
						<Link key={item.href} className="font-bold text-left flex items-center gap-2" href={`tel:${item.href}` || '#'}>
							<PhoneIcon size={20} />
							{item.label}
						</Link>
					))}
				</div>
				<Socials />
			</NavbarMenu>
		</BaseNavbar>
	);
}

const NavbarDropdownMenu = ({triggerLabel, items}: HeaderDropdownMenuProps) => {
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
				<DropdownItem key={items[0].title} classNames={{
					title: 'font-light'
				}} href={items[0].url}>
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
