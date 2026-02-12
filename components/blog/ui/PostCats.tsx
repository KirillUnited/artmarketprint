'use client';
import { Chip } from '@heroui/chip';
import Link from 'next/link';

import { Category } from '../lib/types';

export default function PostCatsFilter({ categories, currentSlug }: { categories: Category[]; currentSlug?: string }) {
	return (
		<div className={'flex flex-wrap gap-2'}>
			<Chip as={Link} className="border-1" href={`/blog`} size="sm" variant={currentSlug === '' ? 'solid' : 'bordered'}>
				Все категории
			</Chip>
			{categories?.map((category: Category) => (
				<Chip key={category.slug?.current || ''} as={Link} className="border-1" href={`/blog/categories/${category.slug?.current || ''}`} size="sm" variant={category.slug?.current === currentSlug ? 'solid' : 'bordered'}>
					{category.title}
				</Chip>
			))}
		</div>
	);
}
