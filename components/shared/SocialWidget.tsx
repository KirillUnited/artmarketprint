import { siteConfig } from '@/config/site'
import Link from 'next/link'
import React from 'react'
import SocialCard from '../ui/SocialCard'

export default function SocialWidget() {
    return (
        <section className='bg-[#F1F4FA]'>
            <div className='container'>
                <div className='py-10 md:py-20 flex flex-col gap-10'>
                    <h2 className='text-2xl text-center font-bold '>
                        <Link href={'https://www.instagram.com/artmarketprint_by/'} target='_blank' className='bg-brand-gradient text-fill-transparent'>
                            {siteConfig?.contacts?.[4]?.title}
                        </Link>
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {
                            siteConfig?.contacts?.[4]?.items?.map((item, index) => <SocialCard alt={item.title} key={index} src={item.thumbnail} href={item.href} index={index + 1} />)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
