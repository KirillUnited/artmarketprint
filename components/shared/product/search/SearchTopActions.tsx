import clsx from 'clsx';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { getAllProductColorsQuery, getAllProductMaterials } from '../lib/queries';
import { ProductFilter } from '@/components/shared/product';

export type SearchTopActionsProps = {
	className?: string;
};

export async function SearchTopActions({ className }: SearchTopActionsProps) {
	const [allProductMaterials, allProductColors] = await Promise.all([
		sanityFetch({ query: getAllProductMaterials }),
		sanityFetch({ query: getAllProductColorsQuery(null, null) }),
	]);
	return (
		<div className={clsx('flex flex-col gap-5 w-full items-start', className)}>
			<ProductFilter allProductMaterials={allProductMaterials} allProductColors={allProductColors} className='w-full' />
		</div>
	);
}

