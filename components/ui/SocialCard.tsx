import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SocialCard({ href, thumbnail, alt, width = 240, height = 240, index }: any) {
    return (
        <Link href={`${href}`} target='_blank' className='overflow-hidden rounded-md shadow-small hover:shadow-large transition-all flex flex-col group'>
            <Image alt={alt} height={height} src={`/images/social-${index}.jpg`} width={width} className='w-full aspect-square object-cover group-hover:scale-110 transition-all duration-400' />
        </Link>
    )
}
