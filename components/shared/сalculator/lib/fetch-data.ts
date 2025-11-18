import {MATERIAL_MATRIX_BY_MATERIAL_ID} from './queries';

import {sanityFetch} from '@/sanity/lib/sanityFetch';

export async function getMaterialMatrixByMaterialId(materialId: string) {
	try {
		const matrix = await sanityFetch({
			query: MATERIAL_MATRIX_BY_MATERIAL_ID,
			params: {materialId},
		});

		return matrix ?? [];
	} catch (error) {
		console.error('Error fetching material matrix:', error);

		return [];
	}
}
