import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SocialCard({ href, thumbnail, alt, width = 240, height = 240, index }: any) {
    return (
        <Link href={`${href}`} target='_blank'>
            <Image alt={alt} height={height} src={`/images/social-${index}.jpg`} width={width} className='w-full aspect-square object-cover' />
        </Link>
    )
}
