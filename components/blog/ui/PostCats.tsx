import { Chip } from '@heroui/chip'
import React from 'react'
import { Category } from '../lib/types'
import Link from 'next/link'

export default function PostCats({ categories }: { categories: Category[] }) {

    return (
        <div className={'flex flex-wrap gap-2'}>
            {
                categories?.map((category: Category) => (
                    <Chip as={Link} href={`/blog/category/${category.slug?.current || ''}`} key={category.slug?.current || ''} size='sm' variant='bordered' className='border-1'>{category.title}</Chip>
                )
                )
            }
        </div>
    )
}
