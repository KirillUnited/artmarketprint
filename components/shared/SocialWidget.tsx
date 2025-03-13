import Link from 'next/link'
import React from 'react'

import SocialCard from '../ui/SocialCard'

import { siteConfig } from '@/config/site'

export default function SocialWidget() {
    return (
        <section>
            <div className='container'>
                <div className='py-10 md:py-20 flex flex-col gap-10'>
                    <h2 className='text-2xl text-center font-bold flex flex-col gap-2'>
                        <span>Подпишитесь на нас</span>
                        <Link className='bg-brand-gradient text-fill-transparent' href={'https://www.instagram.com/artmarketprint_by/'} target='_blank'>
                            {siteConfig?.contacts?.[4]?.title}
                        </Link>
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {
                            siteConfig?.contacts?.[4]?.items?.map((item, index) => <SocialCard key={index} alt={item.title} href={item.href} index={index + 1} src={item.thumbnail} />)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
