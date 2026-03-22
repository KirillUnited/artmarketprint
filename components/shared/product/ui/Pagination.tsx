'use client'
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import Pagination from '@/components/ui/Pagination';

export function ClientPagination({totalPages, pageNumber, basePath}: {totalPages: number; pageNumber: number; basePath: string}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());

		params.set('page', newPage.toString());

		// Scroll to top before navigation
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});

		router.push(`?${params.toString()}`);
	}

	return (
		<Pagination className='justify-center flex' page={pageNumber} total={totalPages} onChange={handlePageChange} />
	)
}

export default function Pagination2({current, total, basePath}: {current: number; total: number; basePath: string}) {
	return (
		<div className="flex flex-wrap justify-center gap-2 mt-8">
			{Array.from({length: total}, (_, i) => i + 1).map((page) => (
				<Link key={page} className={`px-3 py-1 border rounded ${page === current ? 'bg-black text-white' : ''}`} href={`${basePath}?page=${page}`}>
					{page}
				</Link>
			))}
		</div>
	);
}