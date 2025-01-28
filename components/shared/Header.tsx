'use client';
import React from 'react';
import { Button } from '@heroui/button';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/navbar';
import { Link } from '@heroui/link';

import { PhoneIcon, SearchIcon } from '../icons';
import BrandLogo from '../ui/BrandLogo';

import { siteConfig } from '@/config/site';
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
        <Navbar shouldHideOnScroll classNames={
            {
                base: 'border-solid border-gray-100 border-b',
                wrapper: 'max-w-full p-0 items-center',
            }}>
            <div className='container flex flex-row items-center justify-between gap-4'>
                <NavbarBrand as={Link} className='grow-0 basis-auto' href={'/'}>
                    <BrandLogo alt={'ArtMarketPrint'} />
                </NavbarBrand>
                <NavbarContent className="hidden xl:flex gap-8" justify="center">
                    {
                        siteConfig?.navItems?.map((navItem, index) => (
                            <NavbarItem key={index} isActive={index === 0}>
                                <Link aria-current="page" className="text-base leading-normal font-semibold hover:underline hover:text-primary transition" color={'foreground'} href={navItem.href}>
                                    {navItem.label}
                                </Link>
                            </NavbarItem>
                        ))
                    }
                </NavbarContent>
                <div className="flex flex-row gap-8 items-center shrink-0">
                    <SearchIcon />
                    <Button as={Link} className="leading-normal font-semibold hidden lg:flex" color="primary" href={siteConfig?.contacts?.[0].href} variant="solid">
                        <PhoneIcon />
                        <span>{siteConfig?.contacts?.[0].text}</span>
                    </Button>
                    <Link
                        className="lg:hidden text-primary"
                        href={siteConfig?.contacts?.[0].href}
                    >
                        <PhoneIcon />
                    </Link>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className="xl:hidden h-6"
                    />
                </div>
            </div>
            <NavbarMenu className='items-center gap-4 py-6'>
                {siteConfig?.navItems.map((navItem, index) => (
                    <NavbarMenuItem key={`${navItem}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? 'primary' : 'foreground'
                            }
                            href="#"
                            size="lg"
                        >
                            {navItem.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                <div className="flex flex-col items-center gap-4 mt-6">
                    <Link href={`tel:${siteConfig?.contacts?.[0]?.href}`} target='_blank' className='text-lg bg-brand-gradient text-fill-transparent font-bold'>
                        {siteConfig?.contacts?.[0]?.href}
                    </Link>
                    <Socials />
                </div>
            </NavbarMenu>
        </Navbar>
    );
}
