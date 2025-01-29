import { siteConfig } from '@/config/site'
import clsx from 'clsx'
import { MailIcon, MapIcon, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ContactsList({ className }: React.AllHTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={clsx("flex flex-col gap-6",
                className
            )}
        >
            <div
                className="flex flex-col gap-1"
            >
                <div
                    className=" text-text-small-semi-bold-font-size leading-text-small-semi-bold-line-height font-text-small-semi-bold-font-weight relative self-stretch"
                >
                    Адрес:
                </div>
                <div
                    className="font-bold text-left flex items-center gap-2 relative self-stretch"
                >
                    <MapIcon size={20} />
                    {siteConfig?.contacts?.[2]?.text}
                </div>
            </div>
            <div
                className="flex flex-col gap-1 items-start justify-start self-stretch shrink-0 relative"
            >
                <div
                    className=" text-left font-text-small-semi-bold-font-family text-text-small-semi-bold-font-size leading-text-small-semi-bold-line-height font-text-small-semi-bold-font-weight relative self-stretch"
                >
                    Контакты:
                </div>
                <div
                    className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative"
                >
                    {
                        siteConfig?.contacts?.[0]?.list?.map((item) => (
                            <Link key={item.href} href={`tel:${item.href}` || '#'}
                                className="font-bold text-left flex items-center gap-2"
                            >
                                <PhoneIcon size={20} />
                                {item.label}
                            </Link>
                        ))
                    }

                    <Link href={`${siteConfig?.contacts?.[1]?.href}` || '#'}
                        className="font-bold text-left flex items-center gap-2"
                    >
                        <MailIcon size={20} />
                        {siteConfig?.contacts?.[1]?.text}
                    </Link>
                </div>
            </div>

            <div
                className=" text-left font-text-small-semi-bold-font-family text-text-small-semi-bold-font-size leading-text-small-semi-bold-line-height font-text-small-semi-bold-font-weight relative self-stretch"
            >
                Время работы:

                <div
                    className="font-bold flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative "
                >
                    {siteConfig?.contacts?.[3]?.text}
                </div>
            </div>
        </div>
    )
}
