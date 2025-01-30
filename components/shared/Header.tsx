'use client';
import React from 'react';
import { Button } from '@heroui/button';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/navbar';
import { Link } from '@heroui/link';

import { PhoneIcon, SearchIcon, TelegramIcon, ViberIcon } from '../icons';
import BrandLogo from '../ui/BrandLogo';

import { siteConfig } from '@/config/site';
import Socials from './Socials';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { ChevronDownIcon } from 'lucide-react';

type HeaderDropdownMenuProps = {
	triggerLabel: string,
	items: { label: string, href?: string, description?: string }[]
}

const HeaderDropdownMenu = ({ triggerLabel, items }: HeaderDropdownMenuProps) => {
	return (
		<Dropdown
			classNames={{
				content: 'rounded-md',
			}}>
			<NavbarItem>
				<DropdownTrigger>
					<Button
						disableRipple
						className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base leading-normal font-semibold hover:underline hover:text-primary transition gap-1"
						endContent={<ChevronDownIcon size={20} className="text-primary" />}
						radius="sm"
						variant="light"
					>
						{triggerLabel}
					</Button>
				</DropdownTrigger>
			</NavbarItem>
			<DropdownMenu
				aria-label="Услуги"
				className="w-[340px]"
				itemClasses={{
					base: "gap-4 rounded-md data-[hover=true]:bg-brand-gradient data-[hover=true]:text-fill-transparent",
					title: "font-semibold",
				}}
			>
				{
					items.map((item) => (
						<DropdownItem
							key={item.label}
							href={item.href}
							description={item.description}
						>
							{item.label}
						</DropdownItem>
					))
				}
			</DropdownMenu>
		</Dropdown>
	)
}

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<Navbar
			shouldHideOnScroll
			classNames={{
				base: 'border-solid border-gray-100 border-b',
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
					{siteConfig?.navItems?.map((navItem, index) => {
						return (
							navItem?.menuItems ?
								(
									<HeaderDropdownMenu key={index + 1} triggerLabel={navItem.label} items={navItem.menuItems} />
								) : (
									<NavbarItem key={navItem.label} isActive={index === 0}>
										<Link aria-current="page" className="text-base leading-normal font-semibold hover:underline hover:text-primary transition" color={'foreground'} href={navItem.href}>
											{navItem.label}
										</Link>
									</NavbarItem>
								)
						)
					})}
				</NavbarContent>
				<div className="flex flex-row gap-8 items-center shrink-0">
					<SearchIcon />
					<div className="hidden md:flex gap-2">
						<Link
							href={`https://t.me/${siteConfig?.contacts?.[0]?.list?.[0]?.href}`}
							target="_blank"
							className="flex flex-row gap-4 items-center justify-start self-stretch shrink-0 relative"
						>
							<TelegramIcon />
						</Link>
						<Link href={`https://msng.link/o?${siteConfig?.contacts?.[0].list?.[0]?.href}=vi`} target="_blank">
							<ViberIcon />
						</Link>
					</div>
					<Button className="leading-normal font-semibold hidden lg:flex" color="primary" href={`tel:${siteConfig?.contacts?.[0].list?.[0]?.href}`} variant="solid">
						<PhoneIcon />
						<span>{siteConfig?.contacts?.[0].text?.[0]}</span>
						<span>ЗАКАЗАТЬ ЗВОНОК</span>
					</Button>
					<Link className="lg:hidden text-primary" href={`tel:${siteConfig?.contacts?.[0].list?.[0]?.href}`}>
						<PhoneIcon />
					</Link>
					<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="xl:hidden h-6" />
				</div>
			</div>
			<NavbarMenu className="gap-4 px-4 py-6">
				{siteConfig?.navItems.map((navItem, index) => (
					<NavbarMenuItem key={`${navItem}-${index}`}>
						<Link className="w-full" color="foreground" href={navItem.href} size="lg" >
							{navItem.label}
						</Link>
					</NavbarMenuItem>
				))}
				<div className="flex flex-col gap-4 mt-6">
					{siteConfig?.contacts?.[0]?.list?.map((item) => (
						<Link key={item.href} href={`tel:${item.href}` || '#'} className="font-bold text-left flex items-center gap-2">
							<PhoneIcon size={20} />
							{item.label}
						</Link>
					))}
					<Socials />
				</div>
			</NavbarMenu>
		</Navbar>
	);
}
