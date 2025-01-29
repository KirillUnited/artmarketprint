import React from 'react'

import BrandLogo from '../ui/BrandLogo'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import Socials from './Socials'

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
                        <div
                            className="flex flex-col gap-6"
                        >
                            <div
                                className="flex flex-col gap-1"
                            >
                                <div
                                    className="text-[#eeeeee] text-text-small-semi-bold-font-size leading-text-small-semi-bold-line-height font-text-small-semi-bold-font-weight relative self-stretch"
                                >
                                    Адрес:
                                </div>
                                <div
                                    className="text-[#eeeeee] text-left font-text-small-normal-font-family text-text-small-normal-font-size leading-text-small-normal-line-height font-text-small-normal-font-weight relative self-stretch"
                                >
                                    {siteConfig?.contacts?.[2]?.text}
                                </div>
                            </div>
                            <div
                                className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative"
                            >
                                <div
                                    className="text-[#eeeeee] text-left font-text-small-semi-bold-font-family text-text-small-semi-bold-font-size leading-text-small-semi-bold-line-height font-text-small-semi-bold-font-weight relative self-stretch"
                                >
                                    Контакты:
                                </div>
                                <div
                                    className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
                                >
                                    <Link href={`tel:${siteConfig?.contacts?.[0]?.href}` || '#'}
                                        className="text-[#eeeeee] text-left font-text-small-link-font-family text-text-small-link-font-size leading-text-small-link-line-height font-text-small-link-font-weight relative self-stretch"
                                    >
                                        {siteConfig?.contacts?.[0]?.text}
                                    </Link>
                                    <Link href={siteConfig?.contacts?.[1]?.href || '#'}
                                        className="text-[#eeeeee] text-left font-text-small-link-font-family text-text-small-link-font-size leading-text-small-link-line-height font-text-small-link-font-weight relative self-stretch"
                                    >
                                        {siteConfig?.contacts?.[1]?.text}
                                    </Link>
                                </div>
                            </div>

                            <div
                                className="text-[#eeeeee] text-left font-text-small-semi-bold-font-family text-text-small-semi-bold-font-size leading-text-small-semi-bold-line-height font-text-small-semi-bold-font-weight relative self-stretch"
                            >
                                Время работы:

                                <div
                                    className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative text-[#eeeeee]"
                                >
                                    {siteConfig?.contacts?.[3]?.text}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 divide-y divide-background">
                        <Socials />

                        <ul className="flex flex-col gap-1 pt-8">
                            {
                                siteConfig?.navItems?.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-[#eeeeee] text-left font-text-small-link-font-family text-text-small-link-font-size leading-text-small-link-line-height font-text-small-link-font-weight relative self-stretch hover:text-primary transition">
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
