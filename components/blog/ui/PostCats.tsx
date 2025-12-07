'use client';
import {Chip} from '@heroui/chip';
import React from 'react';
import Link from 'next/link';

import {Category} from '../lib/types';

export default function PostCats({categories}: {categories: Category[]}) {
	return (
		<div className={'flex flex-wrap gap-2'}>
			{categories?.map((category: Category) => (
				<Chip key={category.slug?.current || ''} as={Link} className="border-1" href={`/blog/categories/${category.slug?.current || ''}`} size="sm" variant="bordered">
					{category.title}
				</Chip>
			))}
		</div>
	);
}
