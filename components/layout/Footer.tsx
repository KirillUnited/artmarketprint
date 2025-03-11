import React from 'react'
import Link from 'next/link'

import BrandLogo from '../ui/BrandLogo'

import Socials from '@/components/shared/Socials';
import ContactsList from '@/components/shared/ContactsList';
import { siteConfig } from '@/config/site';

export default function Footer() {
    return (
        <footer
            className="bg-foreground"
        >
            <div className="container">
                <div
                    className="flex flex-row flex-wrap gap-16 items-start justify-between py-10 md:py-20"
                >
                    <div
                        className="flex flex-col gap-8"
                    >
                        <div className='self-start'><BrandLogo alt="ArtMarketPrint" /></div>
                        <ContactsList className='text-[#eeeeee]' />
                    </div>
                    <div className="flex flex-col gap-8 divide-y divide-background">
                        <Socials />

                        <ul className="flex flex-col gap-1 pt-8">
                            {
                                siteConfig?.navItems?.map((link) => (
                                    <li key={link.href}>
                                        <Link className="text-[#eeeeee] text-left font-text-small-link-font-family text-text-small-link-font-size leading-text-small-link-line-height font-text-small-link-font-weight relative self-stretch hover:text-primary transition" href={link.href}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container">
                <div
                    className="flex flex-col gap-8 items-start justify-start self-stretch shrink-0 relative"
                >
                    <div
                        className="bg-[#eeeeee] border-solid border-[#eeeeee] border self-stretch shrink-0 h-px relative"
                    />
                    <div
                        className="flex flex-row items-start justify-between self-stretch shrink-0 relative"
                    >
                        <div
                            className="text-[#eeeeee] text-left font-text-small-normal-font-family text-text-small-normal-font-size leading-text-small-normal-line-height font-text-small-normal-font-weight relative"
                        >
                            © {new Date().getFullYear()}. Все права защищены.
                        </div>
                    </div>
                </div>А
            </div>
        </footer>

    )
}
