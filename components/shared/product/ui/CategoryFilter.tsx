// components/CategoryFilter.tsx
import Link from 'next/link';
import {clsx} from "clsx";
import styles from './styles.module.css';
import {urlFor} from "@/sanity/lib/image";
import Image from "next/image";

export default function CategoryFilter({categories, active, baseUrl}: {categories: any[]; active: string; baseUrl: string}) {
	return (
		<div className={clsx(styles.CategoryFilter)}>
			{/*<Link href="/products/categories/all" className={active === 'all' ? 'font-bold' : ''}>*/}
			{/*	ВСЕ*/}
			{/*</Link>*/}
			{categories.map((cat) => (
				<Link
					key={cat._id}
					href={`${baseUrl}/${cat.currentSlug}`}
					className={clsx(active === cat.currentSlug ? 'font-bold' : '',
						'hover:bg-brand-gradient hover:text-fill-transparent',
						styles.CategoryFilterItem
					)}>
					<Image alt={cat.title} className="object-cover aspect-square rounded-small w-10 h-10" width={40} height={40} quality={10} src={urlFor(cat.image?.asset).width(64).height(64).url()} />
					<span className='flex-1 text-sm py-1'>{cat.title}</span>
				</Link>
			))}
		</div>
	);
}
