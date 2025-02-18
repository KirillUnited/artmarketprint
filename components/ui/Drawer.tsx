'use client';
import { Button } from '@heroui/button';
import { Drawer as BaseDrawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerProps } from '@heroui/drawer';
import { useDisclosure } from '@heroui/modal';
import { MenuIcon, PhoneIcon } from 'lucide-react';
import React from 'react';
import Socials from '../shared/Socials';
import { HeroModalOffer } from './BrandModalOffer';
import { NavbarItem } from '@heroui/navbar';
import { Link } from '@heroui/link';
import BrandLogo from './BrandLogo';
import { siteConfig } from '@/config/site';

export default function Drawer({ navigation, className, children }: { navigation: any, className?: string, children?: React.ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} variant="light" isIconOnly className={className}><MenuIcon /></Button>

            <BaseDrawer
                backdrop='blur'
                radius='sm'
                isOpen={isOpen}
                motionProps={{
                    variants: {
                        enter: {
                            opacity: 1,
                            x: 0,
                        },
                        exit: {
                            x: 100,
                            opacity: 0,
                        },
                    },
                }}
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col items-start gap-1">
                                <BrandLogo alt={'ArtMarketPrint'} />
                            </DrawerHeader>
                            <DrawerBody className='gap-6'>
                                <ul className="flex flex-col gap-4">
                                    {navigation?.map((navItem: any) => (
                                        <NavbarItem key={navItem.title}>
                                            <Link onPress={onClose} aria-current="page" className="leading-normal font-semibold hover:underline hover:text-primary transition" color={'foreground'} href={navItem.url} size="sm">
                                                {navItem.title}
                                            </Link>
                                        </NavbarItem>
                                    ))}
                                </ul>
                                <div className='grow'><HeroModalOffer /></div>
                                <div className="flex flex-col gap-2">
                                    {siteConfig?.contacts?.[0]?.list?.map((item) => (
                                        <Link key={item.href} className="font-bold text-left flex items-center gap-2" href={`tel:${item.href}` || '#'}>
                                            <PhoneIcon size={20} />
                                            {item.label}
                                        </Link>
                                    ))}
                                    
                                    <div className='mt-6'><Socials /></div>
                                </div>
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </BaseDrawer>
        </>
    );
}
