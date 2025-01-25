import React from 'react'
import Image from 'next/image';
import { Button } from '@heroui/button';
import Link from 'next/link';

import BrandModalOffer from './BrandModalOffer';

import { BrandCardProps } from '@/types';

export default function BrandCard({ title, price, description, image, href }: BrandCardProps) {
    return (
        <div className="overflow-hidden rounded-md shadow-small hover:shadow-large transition-all flex flex-col">
            <Image alt="Card background" className="object-cover w-full aspect-video max-h-48" height={180} src={`${image}`} width={270} />
            <div className="p-4 md:p-6 bg-background flex flex-col flex-1 gap-4">
                <div className="flex flex-col gap-4 grow">
                    <h3 className='text-xl md:text-2xl leading-[120%] font-bold'>
                        {title}
                        <br />
                        <span className='text-primary font-light underline'>{price}</span>
                    </h3>
                    <p className="text-sm md:text-base text-foreground/90 leading-normal font-light line-clamp-3">{description}</p>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-center border-t-1 border-foreground/20 pt-6 overflow-hidden">
                    <BrandModalOffer />
                    <Button as={Link} className="flex flex-row gap-2 items-center font-semibold text-base px-2 h-auto self-center" color="primary" href={href} variant="light">
                        <span>Подробнее</span>
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.70697 16.9496L15.414 11.2426L9.70697 5.53564L8.29297 6.94964L12.586 11.2426L8.29297 15.5356L9.70697 16.9496Z" fill="currentColor" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    )
}