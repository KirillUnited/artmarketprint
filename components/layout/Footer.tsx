import React from 'react'
import Link from 'next/link'

import BrandLogo from '../ui/BrandLogo'

import Socials from '@/components/shared/Socials';
import ContactsList from '@/components/shared/ContactsList';
import { siteConfig } from '@/config/site';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries/site.query';

export default async function Footer() {
    const siteSettings: any = await getSanityDocuments(SITE_SETTINGS_QUERY);
    const contacts = siteSettings?.siteContactInfo || {};
    const socials = siteSettings?.siteContactInfo?.socialLinks ?? [];

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
                        <ContactsList items={contacts} className='text-[#eeeeee]' />
                    </div>
                    <div className="flex flex-col gap-8">
                        <Socials items={socials} />

                        <div className="flex flex-col gap-2">
                            <p className='text-[#eeeeee] font-light'>Карта сайта</p>

                            <ul className="flex flex-col gap-1">
                                {
                                    siteConfig?.navItems?.map((link) => (
                                        <li key={link.href}>
                                            <Link className="text-[#eeeeee] text-left font-medium self-stretch hover:text-primary transition" href={link.href}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className='text-[#eeeeee] font-light'>Информация</p>

                            <ul className="flex flex-col gap-1">
                                <li>
                                    <Link className="text-[#eeeeee] text-left font-medium self-stretch hover:text-primary transition" href={'/posts/privacy'}>
                                        Политика конфиденциальности
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div
                    className="flex flex-col gap-8"
                >
                    <div
                        className="bg-[#eeeeee] border-solid border-[#eeeeee] border self-stretch shrink-0 h-px relative"
                    />
                    <p
                        className="text-[#eeeeee] text-center"
                    >
                        © {new Date().getFullYear()}. Все права защищены. УНП 193816889. Инспекция МНС по Фрунзенскому району г. Минска № 2
                    </p>
                </div>А
            </div>
        </footer>

    )
}
