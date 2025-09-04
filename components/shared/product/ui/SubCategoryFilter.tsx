import Link from 'next/link';
import {clsx} from "clsx";
import styles from './styles.module.css';
import {urlFor} from "@/sanity/lib/image";
import Image from "next/image";

export default function SubCategoryFilter({category, categorySlug, activeSubcategory, baseUrl}: {category: any; categorySlug: string; activeSubcategory: any; baseUrl: string}) {
	return (
		<div className="flex flex-col gap-2 md:sticky top-20 z-30">
			<p className="font-semibold text-lg">Категории</p>
			<ul>
				{
					category?.subcategories?.map((sub: any) => (
						<li key={sub.slug}>
							<Link
								className={clsx(
									'hover:underline hover:text-primary text-sm',
									{'font-bold text-primary': activeSubcategory?.slug === sub.slug}
								)}
								href={`${baseUrl}/${categorySlug}?sub=${sub.slug}`}>{sub.title}</Link>
						</li>
					))
				}
			</ul>
		</div>
	);
}
