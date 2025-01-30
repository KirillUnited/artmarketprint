'use client';
import React from 'react';
import {Button} from '@heroui/button';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from '@heroui/navbar';
import {Link} from '@heroui/link';

import {PhoneIcon, SearchIcon} from '../icons';
import BrandLogo from '../ui/BrandLogo';

import {siteConfig} from '@/config/site';
import Socials from './Socials';

// const HeaderDropdown = () => {
//     return (
//         <Dropdown>
//           <NavbarItem>
//             <DropdownTrigger>
//               <Button
//                 disableRipple
//                 className="p-0 bg-transparent data-[hover=true]:bg-transparent"
//                 endContent={icons.chevron}
//                 radius="sm"
//                 variant="light"
//               >
//                 Features
//               </Button>
//             </DropdownTrigger>
//           </NavbarItem>
//           <DropdownMenu
//             aria-label="ACME features"
//             className="w-[340px]"
//             itemClasses={{
//               base: "gap-4",
//             }}
//           >
//             <DropdownItem
//               key="autoscaling"
//               description="ACME scales apps to meet user demand, automagically, based on load."
//               startContent={icons.scale}
//             >
//               Autoscaling
//             </DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//     )
// }

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
					{siteConfig?.navItems?.map((navItem, index) => (
						<NavbarItem key={index} isActive={index === 0}>
							<Link aria-current="page" className="text-base leading-normal font-semibold hover:underline hover:text-primary transition" color={'foreground'} href={navItem.href}>
								{navItem.label}
							</Link>
						</NavbarItem>
					))}
				</NavbarContent>
				<div className="flex flex-row gap-8 items-center shrink-0">
					<SearchIcon />
					<div className="hidden md:flex gap-2">
						<Link
							href={`https://t.me/${siteConfig?.contacts?.[0]?.list?.[0]?.href}`}
							target="_blank"
							className="flex flex-row gap-4 items-center justify-start self-stretch shrink-0 relative"
						>
							<svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_1294_403)">
									<path
										d="M8 0C5.87875 0 3.8425 0.843375 2.34375 2.34313C0.843465 3.84348 0.000429311 5.87823 0 8C0 10.1209 0.84375 12.1571 2.34375 13.6569C3.8425 15.1566 5.87875 16 8 16C10.1212 16 12.1575 15.1566 13.6562 13.6569C15.1562 12.1571 16 10.1209 16 8C16 5.87913 15.1562 3.84288 13.6562 2.34313C12.1575 0.843375 10.1212 0 8 0Z"
										fill="url(#paint0_linear_1294_403)"
									/>
									<path
										d="M3.62131 7.91553C5.95381 6.89953 7.50881 6.22969 8.28631 5.90603C10.5088 4.9819 10.9701 4.8214 11.2713 4.81597C11.3376 4.8149 11.4851 4.83128 11.5813 4.90909C11.6613 4.97472 11.6838 5.06347 11.6951 5.12578C11.7051 5.18803 11.7188 5.3299 11.7076 5.44065C11.5876 6.70565 11.0663 9.7754 10.8013 11.1923C10.6901 11.7918 10.4688 11.9928 10.2551 12.0124C9.79006 12.0552 9.43756 11.7054 8.98756 11.4105C8.28381 10.9489 7.88631 10.6617 7.20256 10.2113C6.41256 9.69078 6.92506 9.40465 7.37506 8.93715C7.49256 8.81478 9.54006 6.9529 9.57881 6.78403C9.58381 6.7629 9.58881 6.68415 9.54131 6.64265C9.49506 6.60103 9.42631 6.61528 9.37631 6.62653C9.30506 6.64253 8.18131 7.38603 6.00131 8.8569C5.68256 9.07615 5.39381 9.18303 5.13381 9.1774C4.84881 9.17128 4.29881 9.0159 3.89006 8.88315C3.39006 8.72028 2.99131 8.63415 3.02631 8.35753C3.04381 8.21353 3.24256 8.06615 3.62131 7.91553Z"
										fill="white"
									/>
								</g>
								<defs>
									<linearGradient id="paint0_linear_1294_403" x1="800" y1="0" x2="800" y2="1600" gradientUnits="userSpaceOnUse">
										<stop stopColor="#2AABEE" />
										<stop offset="1" stopColor="#229ED9" />
									</linearGradient>
									<clipPath id="clip0_1294_403">
										<rect width="16" height="16" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</Link>
						<Link href={`https://msng.link/o?${siteConfig?.contacts?.[0].list?.[0]?.href}=vi`} target="_blank">
							<svg width="24" height="24" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.84996 0C5.89996 0 3.54996 0.0999999 2.29996 1.3C1.39996 2.15 1.04996 3.45 0.99996 5C0.89996 7.45 1.44996 9 2.34996 9.8C2.54996 9.95 3.04996 10.35 3.99996 10.65V11.9C3.99996 11.9 3.99996 12.4 4.29996 12.5C4.34996 12.5 4.39996 12.55 4.44996 12.55C4.74996 12.55 4.99996 12.2 5.34996 11.85C5.64996 11.5 5.89996 11.25 6.04996 11H7.14996C8.09996 11 10.45 10.9 11.7 9.7C12.6 8.8 12.95 7.5 12.95 5.85C13 5.6 13 5.3 13 5C12.95 3.15 12.4 1.9 11.65 1.2C11.35 0.95 10.05 0 7.24996 0H6.84996ZM6.74996 0.95H7.19996C9.84996 0.95 10.85 1.8 10.95 1.9C11.55 2.4 11.9 3.5 11.95 4.95V5.15C12 5.45 12 5.7 12 5.85C11.95 7.35 11.65 8.35 11.05 9C9.99996 9.95 7.79996 10 7.19996 10H6.24996L5.44996 10.9L4.94996 11.45L4.84996 11.6C4.74996 11.7 4.59996 11.9 4.49996 11.95V9.7C3.49996 9.45 3.09996 9.1 2.99996 9C2.29996 8.4 1.89996 6.95 1.99996 5V4.5C2.09996 3.3 2.39996 2.5 2.89996 1.95C3.94996 1 6.14996 0.95 6.74996 0.95ZM6.69996 2.05C6.44996 2.05 6.44996 2.4 6.69996 2.4C8.54996 2.4 10.15 3.65 10.15 6C10.15 6.25 10.5 6.25 10.5 6C10.5 3.45 8.79996 2 6.69996 2.05ZM4.71846 2.5125C4.60519 2.49919 4.49118 2.53038 4.40046 2.5995C3.90046 2.8495 3.39996 3.3505 3.54996 3.9005C3.54996 3.9005 3.64996 4.35 4.19996 5.3C4.49996 5.75 4.74996 6.15 4.99996 6.45C5.24996 6.8 5.64996 7.2 6.04996 7.5C6.84996 8.15 8.09996 8.8 8.64996 8.95C9.14996 9.1 9.69996 8.6 9.94996 8.1C10.05 7.9 9.99996 7.65 9.79996 7.5C9.49996 7.2 8.99996 6.85 8.64996 6.65C8.39996 6.5 8.09996 6.6 7.99996 6.75L7.74996 7.05C7.64996 7.2 7.39996 7.2 7.39996 7.2C5.74996 6.75 5.29996 5.05 5.29996 5.05C5.29996 5.05 5.29996 4.85 5.44996 4.7L5.74996 4.45C5.89996 4.35 5.99996 4.05 5.84996 3.8C5.74996 3.65 5.59996 3.35 5.44996 3.2C5.29996 3 4.99996 2.65 4.99996 2.65C4.92415 2.57397 4.82503 2.52556 4.71846 2.5125ZM7.04996 3.05C6.79996 3 6.74996 3.4 6.99996 3.4C8.39996 3.5 9.19996 4.45 9.14996 5.65C9.09996 5.9 9.49996 5.9 9.49996 5.65C9.54996 4.25 8.64996 3.1 7.04996 3.05ZM7.19996 4C6.94996 3.95 6.94996 4.35 7.19996 4.35C7.79996 4.35 8.09996 4.7 8.09996 5.3C8.14996 5.55 8.49996 5.55 8.49996 5.3C8.44996 4.5 7.99996 4 7.19996 4Z"
									fill="#9747FF"
								/>
							</svg>
						</Link>
					</div>
					<Button as={Link} className="leading-normal font-semibold hidden lg:flex" color="primary" href={`tel:${siteConfig?.contacts?.[0].list?.[0]?.href}`} variant="solid">
						<PhoneIcon />
						{/* <span>{siteConfig?.contacts?.[0].text?.[0]}</span> */}
						<span>Позвонить</span>
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
