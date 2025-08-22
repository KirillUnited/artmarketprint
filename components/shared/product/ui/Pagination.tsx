'use client'
import Link from 'next/link';
import Pagination from '@/components/ui/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination2({current, total, basePath}: {current: number; total: number; basePath: string}) {
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
export function ClientPagination({totalPages, pageNumber, basePath}: {totalPages: number; pageNumber: number; basePath: string}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', newPage.toString());

		router.push(`?${params.toString()}`);
	}

	return (
		<Pagination className='justify-center flex' total={totalPages} page={pageNumber} onChange={handlePageChange} />
	)
}
