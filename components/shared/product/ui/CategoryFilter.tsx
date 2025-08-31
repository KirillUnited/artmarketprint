// components/CategoryFilter.tsx
import Link from 'next/link';

export default function CategoryFilter({categories, active}: {categories: any[]; active: string}) {
	return (
		<div className="flex gap-4 overflow-x-auto">
			{/* <Link href="/products/categories/all" className={active === 'all' ? 'font-bold' : ''}>
				ВСЕ
			</Link> */}
			{categories.map((cat) => (
				<Link key={cat._id} href={`/products/categories/${cat.currentSlug}`} className={active === cat.currentSlug ? 'font-bold' : ''}>
					{cat.title}
				</Link>
			))}
		</div>
	);
}
