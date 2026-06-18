// components/CategoryFilter.tsx
import Link from 'next/link';
import {clsx} from 'clsx';
import Image from 'next/image';

import {urlFor} from '@/sanity/lib/image';

import styles from './styles.module.css';

export default function CategoryFilter({categories, active, baseUrl}: {categories: any[]; active: string; baseUrl: string}) {
	return (
		<div className={clsx(styles.CategoryFilter)}>
			{categories.map((cat) => {
				const imageUrl = cat.image?.asset ? urlFor(cat.image.asset).width(64).height(64).url() : cat.image;

				return (
					<Link
						key={cat.currentSlug || cat.title}
						className={clsx(active === cat.currentSlug ? 'font-bold' : '',
							'hover:bg-brand-gradient hover:text-fill-transparent bg-background rounded-small',
							styles.CategoryFilterItem
						)}
						href={`${baseUrl}/${cat.currentSlug}`}
						title={cat.title}>
						{imageUrl ? (
							<Image alt={cat.title} className="object-cover aspect-square rounded-sm w-10 h-10" height={40}
								quality={10} src={imageUrl} width={40}/>
						) : (
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-gray-100 text-sm font-semibold text-gray-500">
								{cat.title.slice(0, 1).toUpperCase()}
							</span>
						)}
						<span className={clsx(active === cat.currentSlug ? 'bg-brand-gradient text-fill-transparent active' : '', 'flex-1 text-sm line-clamp-2')}>{cat.title}</span>
					</Link>
				);
			})}
		</div>
	);
}
