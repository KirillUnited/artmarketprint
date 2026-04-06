// components/CategoryFilter.tsx
import Link from 'next/link';
import {clsx} from 'clsx';
import Image from 'next/image';

import {urlFor} from '@/sanity/lib/image';

import styles from './styles.module.css';

export default function CategoryFilter({categories, active, baseUrl}: {categories: any[]; active: string; baseUrl: string}) {
	return (
		<div className={clsx(styles.CategoryFilter)}>
			{/*<Link href="/products/categories/all" className={active === 'all' ? 'font-bold' : ''}>*/}
			{/*	ВСЕ*/}
			{/*</Link>*/}
			{categories.map((cat) => (
				<Link
					key={cat._id}
					className={clsx(active === cat.currentSlug ? 'font-bold' : '',
						'hover:bg-brand-gradient hover:text-fill-transparent bg-background rounded-small',
						styles.CategoryFilterItem
					)}
					href={`${baseUrl}/${cat.currentSlug}`}
					title={cat.title}>
					<Image alt={cat.title} className="object-cover aspect-square rounded-sm w-10 h-10" height={40}
						   quality={10} src={urlFor(cat.image?.asset).width(64).height(64).url()} width={40}/>
					<span className={clsx(active === cat.currentSlug ? 'bg-brand-gradient text-fill-transparent active' : '', 'flex-1 text-sm line-clamp-2')}>{cat.title}</span>
				</Link>
			))}
		</div>
	);
}
