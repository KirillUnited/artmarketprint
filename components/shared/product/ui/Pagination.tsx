// components/Pagination.tsx
import Link from 'next/link';

export default function Pagination({current, total, basePath}: {current: number; total: number; basePath: string}) {
	return (
		<div className="flex flex-wrap justify-center gap-2 mt-8">
			{Array.from({length: total}, (_, i) => i + 1).map((page) => (
				<Link key={page} href={`${basePath}?page=${page}`} className={`px-3 py-1 border rounded ${page === current ? 'bg-black text-white' : ''}`}>
					{page}
				</Link>
			))}
		</div>
	);
}
