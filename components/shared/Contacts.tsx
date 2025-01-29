import { siteConfig } from '@/config/site'
import Link from 'next/link'
import React from 'react'
import Socials from './Socials'
import BrandForm from '../ui/BrandForm'
import { MailIcon, MapIcon, PhoneIcon, TimerIcon } from 'lucide-react'
import ContactsList from './ContactsList'

export default function Contacts() {
    return (
        <section id='contacts' className='bg-[#F1F4FA]'>
            <div className="py-10 md:py-20 flex flex-col gap-10">
                <div className="container">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="flex flex-col gap-4 max-w-[652px]">
                            <h2 className="text-4xl md:text-5xl leading-[120%] font-bold">Наши контакты</h2>
                            <p className="text-base md:text-lg leading-normal font-normal text-foreground/70">
                                Мы всегда готовы помочь вам! Если у вас есть вопросы, предложения или хотите связаться с нами, используйте любой удобный способ:
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="flex flex-wrap gap-10 justify-between">
                        <div className='flex flex-col gap-10'>
                            <ContactsList className='' />
                            <Socials />
                            <p>Ждем вас в любое удобное время!</p>
                        </div>
                        <BrandForm className='w-full lg:w-1/2'/>
                    </div>


                </div>
                <div className='flex justify-center'>
                    <div className='w-full' style={{ position: 'relative', overflow: 'hidden' }}><a href="https://yandex.by/navi/org/art_market_print/100202069960/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 0 }}>Арт Маркет Принт</a><a href="https://yandex.by/navi/157/minsk/category/printing_services/184107124/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 14 }}>Полиграфические услуги в Минске</a><a href="https://yandex.by/navi/157/minsk/category/printing_on_t_shirts/179539030136/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: 12, position: 'absolute', top: 28 }}>Печать на ткани в Минске</a><iframe src="https://yandex.by/map-widget/v1/org/art_market_print/100202069960/?ll=27.508390%2C53.918763&z=17" width={'100%'} height={400} title='ArtMarketPrint' allowFullScreen style={{ position: 'relative' }} /></div>
                </div>
            </div>

        </section>
    )
}
